'use server';

import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

import { Catalog, Column, NLQResponseEvent, NLQUpdateEvent } from '@/lib/types';
import { NlqStatus } from '@/lib/constants';
import { exampleCatalog } from '../../catalog';
import { z } from 'zod';
import { getDbUrl } from './metadata';
import { Client } from 'pg';

const relevantTablesPrompt = (catalog: Catalog) => `
You are a seasoned POSTGRESQL Expert with over 10 years of experience.
        Your role is to analyze user queries and identify all the relevant tables in a database catalog that might be related or can provide the required data.
        The catalog contains metadata about databases, including descriptions, table names, and column names.

        Return the names of ALL the SQL tables that MIGHT be relevant to the user question.

        ALWAYS try to keep the number of tables in the output to a minimum.
        ALWAYS try to keep the query simple and avoid using complex joins, subqueries, CTEs, etc.
        ALWAYS try to avoid using multiple schemas, if possible.
        ONLY use multiple schemas if there are no other options.

        <catalog>
        ${JSON.stringify(catalog, null, 2)}
        </catalog>

        Remember to include ALL POTENTIALLY RELEVANT tables, even if you're not sure that they're needed.
`;

const queryGenerationPrompt = (
  relevantRecords: {
    schema: string;
    table: string;
    columns: Column[];
  }[]
) => `
You are a seasoned SQL Expert with over 10 years of experience with POSTGRESQL dialect. Your job is to help the user write a SQL query to retrieve the data they need.
        Your task is to create SQL queries based on the given user query.
        You will be provided with relevantRecords which contains the schema, table and columns names and descriptions that are relevant to the user query.

        ONLY SELECT queries are allowed. You can't generate any query that will modify database in any way. You can't use INSERT, UPDATE, DELETE, etc. You can only generate queries that will only read data from the database.

        The following types of queries are not allowed:
            - Queries with wildcard stars.
            - Queries that don't have a table name for a column.
            - SQL Functions that are user defined. Inbuilt functions like SUM, AVG, COUNT, etc are allowed.

        Only retrieval queries are allowed.
        For things like string fields, use the ILIKE operator, as we are using case insensitive search don't use LOWER() function. For example: industry ILIKE '%search_term%'.

        ALWAYS try to avoid filtering with "=", expect for primary keys and user defined types like enums, instead use LIKE operator or ILIKE operator with % prefix and suffix. THIS IS VERY IMPORTANT.
        ALWAYS USE "=" for filtering with user defined types like enums and ids. THIS IS VERY IMPORTANT. THIS HAS TO BE FOLLOWED AT ALL COSTS. OR ELSE THE QUERY WILL FAIL.

        USERS ARE NOT VERY GOOD AT SQL, SO DON'T EXPECT TOO MUCH FROM THEM.

        \`\`\`sql
            <!-- Queries with wildcard stars are not allowed -->
        SELECT * FROM employees

        select employees.name from employees where employees.salary > 1000 <!--This Query is allowed -->
        select employees.name from employees where salary > 1000 <!--This Query is not allowed -->
        select name from employees where employees.salary > 1000 <!--This Query is not allowed -->
        select name from employees where salary > 1000 <!--This Query is not allowed -->
    \`\`\`
        Guidelines:
        1. Leverage the Relevant Records: Use the metadata to align your queries with the correct database, tables, and columns.
        3. Column Prefixing: Ensure that all columns are prefixed with the table name to avoid ambiguity.
        Ensure that your generated queries are precise, efficient, and easy to understand, showcasing your extensive experience.

        <relevantRecords>
        ${JSON.stringify(relevantRecords, null, 2)}
        </relevantRecords>
`;

const responseGenerationPrompt = (data: any[]) => `
You are an AI assistant that analyzes SQL query results and generates natural language responses. 

- If the query result is an empty array or contains no meaningful data, explicitly state: "There is no data available."
- If the query result is a non-empty array or contains valid data:
  - Summarize the data clearly.
  - Handle any null or missing values gracefully by excluding them from the response.
  - Use proper grammar and formatting to make the response easy to understand.

The data may contain various types, such as arrays of objects, single objects, strings, or numbers. Always rely on the provided data and do not fabricate information.

Here is the query result:
<QUERYRESULT>
${JSON.stringify(data, null, 2)}
</QUERYRESULT>

Now, generate the appropriate response based on the above instructions.

`;

export async function nlqChat(query: string) {
  console.log(`Started streaming SQL responses for query: ${query}`);

  const stream = nlqSseWrapper(query);
  console.log('Streaming response successfully started.');
  return stream;
}

async function* nlqSseWrapper(
  query: string
): AsyncIterable<NLQUpdateEvent | NLQResponseEvent> {
  for await (const event of doNlq(query)) {
    yield event; // Serialize event to JSON string
  }
}

async function* doNlq(
  query: string
): AsyncGenerator<NLQUpdateEvent | NLQResponseEvent> {
  console.log(`Started processing query: ${query}`);
  // have to figure out the intent of user, if its related to database and query then only pass it, also fix any typo that the query might have
  yield { kind: 'UPDATE', status: NlqStatus.RELEVANT_TABLES };
  const { relevantRecords: records } = await relevantRecords(query);

  const relevantData = records
    .map((record) => {
      const schema = exampleCatalog.schemas.find(
        (s) => s.name === record.schema
      );
      const data = record.tables.map((tableName) => {
        const table = schema?.tables.find((t) => t.name === tableName);
        return {
          schema: record.schema,
          table: tableName,
          columns: table?.columns || [],
        };
      });
      return data;
    })
    .flat();

  yield { kind: 'UPDATE', status: NlqStatus.GENERATING_QUERIES };
  const generatedQuery = await generateQueries(query, relevantData);

  yield { kind: 'UPDATE', status: NlqStatus.EXECUTING_QUERIES };
  const executionResult = await executeQueries(generatedQuery);

  yield { kind: 'UPDATE', status: NlqStatus.GENERATING_RESPONSE };
  const response = await generateResponse(query, executionResult);

  yield {
    kind: 'RESPONSE',
    type: 'TEXT',
    payload: response,
  };
}

async function relevantRecords(
  query: string
): Promise<{ relevantRecords: { schema: string; tables: string[] }[] }> {
  console.log(`Getting relevant records for query: ${query}`);
  const modifiedCatalog: Catalog = {
    schemas: exampleCatalog.schemas.map((schema) => ({
      name: schema.name,
      description: schema.description,
      tables: schema.tables.map((table) => ({
        name: table.name,
        description: table.description,
      })),
    })),
  };

  try {
    const response = await generateObject({
      model: openai('gpt-4o-mini'),
      system: relevantTablesPrompt(modifiedCatalog),
      prompt: `Retrieve the names of all the tables that might be relevant to the user query: ${query}`,
      schema: z.object({
        relevantRecords: z.array(
          z.object({
            schema: z.string(),
            tables: z.array(z.string()),
          })
        ),
      }),
    });
    console.log(response.object);
    return response.object;
  } catch (error) {
    console.log(`Error getting relevant records for query: ${query}`);
    console.error('Error getting relevant records:', error);
    return { relevantRecords: [] };
  }
}

async function generateQueries(
  query: string,
  relevantRecords: { schema: string; table: string; columns: Column[] }[]
): Promise<any> {
  console.log(`Generating queries for query: ${query}`);
  try {
    const response = await generateObject({
      model: openai('gpt-4o-mini'),
      system: queryGenerationPrompt(relevantRecords),
      prompt: `Generate the query necessary to retrieve the data the user wants: ${query}`,
      schema: z.object({
        query: z.string(),
      }),
    });
    return response.object.query;
  } catch (error) {
    console.log(`Error generating queries for query: ${query}`);
    console.error('Error generating queries:', error);
    return '';
  }
}

async function executeQueries(sqlQuery: string) {
  console.log(`Executing query: ${sqlQuery}`);
  if (!sqlQuery.trim().toLowerCase().startsWith('select')) {
    return 'You are only allowed to execute SELECT queries.';
  }

  const dbUrl = await getDbUrl();
  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const data = await client.query(sqlQuery);
    console.log(data.rows);
    return data.rows;
  } catch (e: any) {
    console.log(`Error executing query: ${sqlQuery}`);
    console.error(e.message);
    return 'An error occurred while executing the query.';
  } finally {
    await client.end();
  }
}

async function generateResponse(
  query: string,
  data: any[] | string
): Promise<string> {
  console.log(`Generating response for query: ${query}`);
  if (typeof data === 'string') {
    return data;
  }

  try {
    const response = await generateText({
      model: openai('gpt-4o-mini'),
      system: responseGenerationPrompt(data),
      messages: [
        {
          role: 'user',
          content: `Generate a response to the user query: ${query}`,
        },
      ],
    });
    return response.text;
  } catch (error) {
    console.log(`Error generating response for query: ${query}`);
    console.error('Error generating response:', error);
    return 'An error occurred while generating the response.';
  }
}

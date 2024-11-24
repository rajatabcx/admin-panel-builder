'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

import { NLQAgentState, NLQResponseEvent, NLQUpdateEvent } from '@/lib/types';
import { NlqStatus } from '@/lib/constants';

const analyzeIntentPrompt = `
  You are a SQL and Technology Expert tasked with understanding user queries and generating informative responses.
  Your role is to carefully analyze the user's input, which will be in natural language, to identify the underlying intent and provide a detailed response that addresses their needs.
  Requirements for your response:
    1. Intent Analysis: Accurately determine what the user is asking for or trying to achieve.
    2. Comprehensive Explanation: Deliver a clear and thorough natural language explanation that elaborates on the user's query, including any necessary context or background information.
    3. Insightful Guidance: If applicable, offer additional insights, best practices, or recommendations related to SQL or technology to enhance user understanding.
    4. Clarity and Relevance: Ensure your response is easy to understand and directly relevant to the user's intent.
`;

const relevantCatalogsPrompt = `
You are a highly experienced SQL Expert with over 10 years of expertise. You are provided with a catalog containing metadata about various databases, including descriptions, table names, and column names. Your task is to analyze user queries to understand their intent and determine whether the required data can be retrieved from a single database or if multiple databases are needed.
        Response Requirements:
        1. Intent Analysis: Carefully assess the user's query and cross-reference it with the catalog metadata to identify the database or databases involved.
        2. Categorization:
            If the data can be fetched from a single database, return True and include the name of the database.
            If the data must be retrieved from multiple databases, return False.
        3. Output Format:
            For single-database queries: True, Database Name
            For multi-database queries: False
  Ensure that your analysis is thorough, leveraging your extensive experience to provide precise and contextually accurate responses.
`;

const relevantTablesPrompt = `
You are a seasoned SQL Expert with over 10 years of experience.
        Your role is to analyze user queries and identify all the relevant tables in a database catalog that might be related or can provide the required data.
        The catalog contains metadata about databases, including descriptions, table names, and column names.
        
`;

const queryGenerationPrompt = `
You are a seasoned SQL Expert with over 10 years of experience with {provider} dialect.
        Your task is to create SQL queries based on the given user intent, using metadata from a provided database catalog.
        The catalog includes database descriptions, table names, column names, and other relevant metadata to guide your query generation.

        The following types of queries are not allowed:
            - Queries with wildcard stars.
            - Queries that don't have a table name for a column.
            - Queries that have subqueries that are in where clasues, joins, group by, order by, etc.
            - SQL Functions that are user defined. Inbuilt functions like SUM, AVG, COUNT, etc are allowed.

        \`\`\`sql
            <!-- Queries with wildcard stars are not allowed -->
        SELECT * FROM employees

        select employees.name from employees where employees.salary > 1000 <!--This Query is allowed -->
        select employees.name from employees where salary > 1000 <!--This Query is not allowed -->
        select name from employees where employees.salary > 1000 <!--This Query is not allowed -->
        select name from employees where salary > 1000 <!--This Query is not allowed -->
    \`\`\`
        Guidelines:
        1. Leverage the Catalog: Use the metadata to align your queries with the correct database, tables, and columns.
        2. Output: Create multiple simple queries to address the user intent comprehensively and efficiently.
        3. Column Prefixing: Ensure that all columns are prefixed with the table name to avoid ambiguity.
        Ensure that your generated queries are precise, efficient, and easy to understand, showcasing your extensive experience.
        
`;

const queryAggregatePrompt = `
You are a SQL Expert with over 10 years of experience. Your task is to consolidate multiple provided queries into an optimal single SQL query or the minimum number of queries needed to achieve the desired result. You will be provided with a json containing queries and sample responses from them.

            Task Requirements:
            1. Analyze Provided Queries: Carefully review the given individual queries to understand the data they retrieve and their intended outcomes.
            2. Aggregate Query Construction: Combine and refactor the individual queries into one comprehensive SQL query that can deliver the same result set. You can convert these provided queries in CTEs (With clasuses), subqueries or joings to achieve this.
            3. Ensure that the final query is optimized for performance and adheres to SQL best practices.

            Guidelines:
            1. Efficiency and Performance: Design the aggregated query to minimize computation time and resource usage.
            2. Simplicity and Clarity: Strive for clear and maintainable SQL code, even when aggregating complex logic.
            3. Output Format: Return the complete aggregated query and, if necessary, include brief comments explaining non-standard operations or logic.
    Ensure that the final result is accurate, optimized, and reflects your expertise in SQL.
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
  const state: NLQAgentState = {
    query,
  };
  console.log(`Started processing query: ${query}`);
  // Simulate processing steps
  yield { kind: 'UPDATE', status: NlqStatus.ANALYZING_INTENT };
  const intent = await analyzeIntent(query);
  console.log('Intent:', intent);
  state.intent = intent;
  yield { kind: 'UPDATE', status: NlqStatus.GENERATING_QUERIES };
  await new Promise((resolve) => setTimeout(resolve, 1500));

  yield { kind: 'UPDATE', status: NlqStatus.EXECUTING_QUERIES };
  await new Promise((resolve) => setTimeout(resolve, 1200));

  yield { kind: 'UPDATE', status: NlqStatus.REFINING_QUERY };
  await new Promise((resolve) => setTimeout(resolve, 2000));

  yield { kind: 'UPDATE', status: NlqStatus.EXECUTE_REFINED_QUERY };
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a response
  yield {
    kind: 'RESPONSE',
    type: 'TEXT',
    payload:
      'This is a mock response. In a real implementation, this would contain actual query results.',
  };
}

async function analyzeIntent(query: string) {
  try {
    const response = await generateText({
      model: openai('gpt-3.5-turbo'),
      system: analyzeIntentPrompt,
      messages: [{ role: 'user', content: query }],
    });
    return response.text;
  } catch (error) {
    console.error('Error analyzing intent:', error);
    return '';
  }
}
// function cataloging() {}
// function relevantTables() {}
// function generateQueries() {}
// function executeQueries() {}
// function refineQueries() {}
// function executeRefinedQueries() {}

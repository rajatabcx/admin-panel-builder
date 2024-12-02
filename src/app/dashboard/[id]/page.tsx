'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { useProject } from '@/hooks/project.hooks';
import { Bot, DatabaseZap, Layers, Table2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useProject(id, !!id);

  return (
    <div className='p-4 w-full h-full'>
      <h1 className='text-2xl font-bold'>{project?.name}</h1>
      <p className='text-sm text-muted-foreground'>{project?.description}</p>
      <div className='mt-4'>
        <h1 className='text-xl font-bold'>Things to learn, YAY?</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-6'>
          <Card className='bg-muted/20'>
            <CardHeader>
              <Layers className='size-6 mb-2' />
              <CardTitle>
                Understand why creating a catalog is important
              </CardTitle>
              <CardDescription>
                A postgres database have a lot of schemas and each schema can
                have a lot of tables, sending all this information to the ai is
                not a good idea, it might break the context window of the ai and
                our bank. So we need to create a catalog that will be a data
                structure that will contain all the information we need to send
                to the ai. Which is smaller and more manageable.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-muted/20'>
            <CardHeader>
              <DatabaseZap className='size-6 mb-2' />
              <CardTitle>
                Understanding the importance of Database view
              </CardTitle>
              <CardDescription>
                A database view is an interactive diagram that illustrates
                relationships between tables in a schema, making it easier to
                understand database structures. Developers often struggle to
                convey these relationships clearly, especially to non-technical
                teams, as code or raw schemas can be challenging to interpret.
                Tools like dbdiagram.io simplify this with DBML, but manually
                defining diagrams can be tedious. Instead, leveraging existing
                schemas or database connection URLs can streamline the process,
                allowing product and design teams to easily visualize and
                understand the data without delving into code.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-muted/20'>
            <CardHeader>
              <Table2 className='size-6 mb-2' />
              <CardTitle>Understanding the table view</CardTitle>
              <CardDescription>
                While AI can fetch data efficiently, it has its limitations.
                That&apos;s why we created a smart table view with powerful
                filtering and sorting features, and a grid view coming soon. For
                advanced users, there&apos;s an engineering mode with SQL
                support, while beginners can easily filter data using a simple
                dropdown interface. Currently, we offer sorting and universal
                search, which scans all columns for matches and highlights
                results for easy reference.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-muted/20'>
            <CardHeader>
              <Bot className='size-6 mb-2' />
              <CardTitle>Understanding the AI</CardTitle>
              <CardDescription>
                Our AI efficiently fetches data from your database but relies on
                a well-structured catalog to avoid errors or hallucinations. It
                exclusively handles SQL-based <b>SELECT</b> queries and ensures
                no table mutations occur. Results are presented in a structured,
                readable format. For enhanced accuracy, you can manually add
                descriptions while setting up the catalog.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

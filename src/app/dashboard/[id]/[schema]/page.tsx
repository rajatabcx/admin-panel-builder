import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string; schema: string }>;
}) {
  const { id, schema } = await params;
  return (
    <div className='w-full h-screen overflow-hidden flex justify-center items-center'>
      <Card className='w-full max-w-md bg-secondary border border-muted-foreground rounded-lg'>
        <CardHeader>
          <CardTitle>Schema</CardTitle>
          <CardDescription>
            Select database or a table from the navigation panel on the left to
            view its data, or create a new one.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href={`/dashboard/${id}/${schema}/database`}
            className={cn(buttonVariants({}))}
          >
            View Database
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

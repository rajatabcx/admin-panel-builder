import { ShineBorder } from '@/components/magic-ui/shine-border';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string; schema: string }>;
}) {
  const { id, schema } = await params;
  return (
    <div className='w-full h-full overflow-hidden flex justify-center items-center'>
      <ShineBorder
        className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl bg-card/60 backdrop-blur-sm'
        color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
      >
        <Card className='rounded-lg border-none bg-transparent'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold'>Schema</CardTitle>
            <CardDescription className='text-muted-foreground'>
              Select database or a table from the navigation panel on the left{' '}
              to view its data, or create a new one.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href={`/dashboard/${id}/${schema}/database`}
              className={cn(buttonVariants({}), 'group')}
            >
              View Database
              <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </CardFooter>
        </Card>
      </ShineBorder>
    </div>
  );
}

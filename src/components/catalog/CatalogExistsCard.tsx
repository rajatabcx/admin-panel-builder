import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { ShineBorder } from '@/components/magic-ui/shine-border';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CatalogExistsCard({ id }: { id: string }) {
  return (
    <ShineBorder
      className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl bg-card/60 backdrop-blur-sm'
      color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
    >
      <Card className='rounded-lg border-none bg-transparent'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            Catalog already exists
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            You can start chatting with the database or update the catalog.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-end gap-2'>
          <Link
            href={`/dashboard/${id}/chat`}
            className={cn(buttonVariants({}), 'group')}
          >
            Chat
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          </Link>
          <Link
            href={`/dashboard/${id}/catalog/generate`}
            className={cn(buttonVariants({}), 'group')}
          >
            Update
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </CardFooter>
      </Card>
    </ShineBorder>
  );
}

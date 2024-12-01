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

export function NoCatalogCard({ id }: { id: string }) {
  return (
    <ShineBorder
      className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl bg-card/60 backdrop-blur-sm'
      color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
    >
      <Card className='rounded-lg border-none bg-transparent'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            No catalog found
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            You have to generate a catalog to chat with the database.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href={`/dashboard/${id}/catalog/generate`}
            className={cn(buttonVariants({}), 'group')}
          >
            Create catalog
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </CardFooter>
      </Card>
    </ShineBorder>
  );
}

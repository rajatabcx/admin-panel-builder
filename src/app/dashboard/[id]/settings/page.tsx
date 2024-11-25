import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import ShineBorder from '@/components/magic-ui/shine-border';

export default function SettingsPage() {
  return (
    <div className='w-full h-screen overflow-hidden flex justify-center items-center'>
      <ShineBorder
        className='relative w-full max-w-xl flex flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl bg-card/60 backdrop-blur-sm'
        color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
      >
        <Card className='rounded-lg border-none bg-transparent'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold mb-5'>
              Schema
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              Select database or a table from the navigation panel on the left
              to view its data, or create a new one.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href={`/dashboard/demo/chat`}
              className={cn(buttonVariants({}), 'group')}
            >
              Chat With AI
              <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </CardFooter>
        </Card>
      </ShineBorder>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import React from 'react';

export default function page() {
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
          <Button>View Database</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

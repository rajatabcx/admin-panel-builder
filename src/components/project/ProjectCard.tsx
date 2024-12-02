import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { ChevronRight } from 'lucide-react';

export default function ProjectCard({
  id,
  name,
  description,
}: {
  id: string;
  name: string | null;
  description: string | null;
}) {
  return (
    <Card className='bg-muted/20 flex flex-col justify-between'>
      <CardHeader className='flex-1'>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        <Link
          href={`/dashboard/${id}`}
          className={cn(buttonVariants(), 'group')}
        >
          View Project
          <ChevronRight className='size-4 group-hover:translate-x-1 transition-all' />
        </Link>
      </CardFooter>
    </Card>
  );
}

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
    <Card className='bg-muted/20'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        <Link href={`/dashboard/${id}`} className={cn(buttonVariants())}>
          View Project
        </Link>
      </CardFooter>
    </Card>
  );
}

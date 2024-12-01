import React from 'react';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createProjectSchema } from '@/lib/validationSchema';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/form/TextInput';

export default function CreateProject() {
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      connectionString: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createProjectSchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Project <Plus className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to start tracking your data.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput
              control={form.control}
              name='name'
              placeholder='Project Name'
              label='Project Name'
            />
            <TextInput
              control={form.control}
              name='connectionString'
              placeholder='postgresql://username:password@host:port/database'
              info='This will be encrypted before being stored, so we will not be able to see it.'
              label='Database Connection String'
            />
            <TextInput
              control={form.control}
              name='description'
              placeholder='Project Description'
              isTextarea
              label='Project Description'
            />
            <div className='flex justify-end mt-2'>
              <Button type='submit'>Create Project</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

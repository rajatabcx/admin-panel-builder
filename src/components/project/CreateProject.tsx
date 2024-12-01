import React, { useState } from 'react';
import { Loader, Plus } from 'lucide-react';
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
import { useCreateProject, useTestConnection } from '@/hooks/project.hooks';
import { useRouter } from 'next/navigation';
import { ResponseType } from '@/lib/constants';

export default function CreateProject() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [tested, setTested] = useState(false);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      connectionString: '',
    },
  });

  const { mutateAsync, isPending } = useCreateProject();
  const { mutateAsync: testConnection, isPending: isTesting } =
    useTestConnection();

  const onSubmit = async (data: z.infer<typeof createProjectSchema>) => {
    try {
      const res = await mutateAsync(data);
      if (res.type === ResponseType.SUCCESS) {
        form.reset();
        router.push(`/dashboard/${res.projectId}`);
        setOpen(false);
      }
    } catch (error) {}
  };

  const handleTestConnection = async () => {
    try {
      const res = await testConnection(form.getValues('connectionString'));
      setTested(res.type === ResponseType.SUCCESS);
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <div className='flex justify-end mt-2 gap-2'>
              <Button
                type='button'
                onClick={handleTestConnection}
                disabled={isPending}
              >
                Test Connection
                {isTesting ? (
                  <Loader className='w-4 h-4 ml-2 animate-spin' />
                ) : (
                  ''
                )}
              </Button>
              <Button type='submit' disabled={isPending || !tested}>
                Create Project
                {isPending ? (
                  <Loader className='w-4 h-4 ml-2 animate-spin' />
                ) : (
                  ''
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

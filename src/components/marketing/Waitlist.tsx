'use client';

import React from 'react';
import { ChevronRight, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/form/TextInput';
import { Button } from '@/components/ui/button';
import { waitlistSchema } from '@/lib/validationSchema';
import { useWaitlist } from '@/hooks/waitlist.hooks';
import { ResponseType } from '@/lib/constants';

export default function Waitlist() {
  const form = useForm({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutateAsync: addToWaitlist, isPending } = useWaitlist();

  const onSubmit = async (data: z.infer<typeof waitlistSchema>) => {
    const res = await addToWaitlist(data.email);
    if (res.type === ResponseType.SUCCESS) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto z-20'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex-1'>
          <TextInput
            control={form.control}
            name='email'
            type='email'
            placeholder='Enter your email'
          />
        </div>
        <Button type='submit' className='group w-fit' disabled={isPending}>
          Join Waitlist
          {isPending ? (
            <Loader className='size-4 animate-spin' />
          ) : (
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          )}
        </Button>
      </form>
    </Form>
  );
}

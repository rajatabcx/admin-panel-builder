'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/chat.hooks';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { TextInput } from '@/components/form/TextInput';

const schema = z.object({
  query: z.string(),
});

export default function ChatPage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      query: '',
    },
  });

  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string | Record<string, any>[]>('');
  const { mutateAsync, isPending } = useChat();

  const handleQuery = async (data: z.infer<typeof schema>) => {
    try {
      setMessage('');
      form.reset();
      const stream = await mutateAsync(data.query);
      for await (const event of stream) {
        if (event.kind === 'UPDATE') {
          setStatus(event.status);
        } else if (event.kind === 'RESPONSE') {
          setStatus('');
          setMessage(event.payload);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your query.');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col p-4'>
      <div className='flex-1 overflow-auto'>
        {status ? (
          <div className='inline-flex items-center animate-pulse'>
            <span>✨ {status}...</span>
          </div>
        ) : null}
        {message ? <p>{JSON.stringify(message, null, 2)}</p> : null}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleQuery)}
          className='flex items-center gap-2'
        >
          <div className='flex-1'>
            <TextInput
              name='query'
              placeholder='Ask a question...'
              control={form.control}
            />
          </div>
          <Button
            className='flex items-center gap-2'
            variant='outline'
            type='submit'
            // disabled={isPending}
            disabled
          >
            {isPending ? 'Sending' : 'Send'}
            {isPending ? <Loader className='size-4 animate-spin' /> : null}
          </Button>
        </form>
      </Form>
    </div>
  );
}

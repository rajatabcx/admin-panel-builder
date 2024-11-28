'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Loader, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/chat.hooks';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { TextInput } from '@/components/form/TextInput';
import { cn } from '@/lib/utils';

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
  const [messages, setMessages] = useState<
    { message: string; type: 'user' | 'bot' }[]
  >([
    {
      message: 'Hello! How can I assist you today?',
      type: 'bot',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutateAsync, isPending } = useChat();

  const handleQuery = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setMessages((prev) => [...prev, { message: data.query, type: 'user' }]);
      form.reset();
      const stream = await mutateAsync(data.query);
      for await (const event of stream) {
        if (event.kind === 'UPDATE') {
          setStatus(event.status);
        } else if (event.kind === 'RESPONSE') {
          setStatus('');
          setMessages((prev) => [
            ...prev,
            { message: event.payload, type: 'bot' },
          ]);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your query.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='w-full h-screen flex flex-col py-4'>
      <div className='flex-1 overflow-auto space-y-4 fancy-scrollbar px-4 pb-6'>
        {messages.map((message, index) => (
          <p
            key={index}
            className={cn(
              'max-w-[75%] w-max px-3 py-2 rounded-lg',
              message.type === 'bot'
                ? 'bg-sidebar text-primary'
                : 'bg-secondary-foreground text-secondary ml-auto'
            )}
          >
            {message.message}
          </p>
        ))}
        {status ? (
          <div className='inline-flex items-center animate-pulse'>
            <span>✨ {status}...</span>
          </div>
        ) : null}
        <div ref={scrollRef} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleQuery)}
          className='flex items-center gap-2 px-4'
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
            // disabled={isPending || loading}
            disabled
          >
            {isPending || loading ? 'Sending' : 'Send'}
            {isPending || loading ? (
              <Loader className='size-4 animate-spin' />
            ) : (
              <SendHorizonal className='size-4' />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

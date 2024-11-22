'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/chat.hooks';
import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';

export default function ChatPage() {
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string | Record<string, any>[]>('');
  const { mutateAsync } = useChat();

  const handleQuery = async (query: string) => {
    setMessage('');
    const stream = await mutateAsync(query);
    for await (const event of stream) {
      if (event.kind === 'UPDATE') {
        setStatus(event.status);
      } else if (event.kind === 'RESPONSE') {
        setStatus('');
        setMessage(event.payload);
      }
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
      <div className='flex items-center gap-2'>
        <Input placeholder='Ask a question...' />
        <Button
          className='flex items-center gap-2'
          variant='outline'
          onClick={() => handleQuery('Hello')}
        >
          Send <SendHorizonal className='size-4' />
        </Button>
      </div>
    </div>
  );
}

import React from 'react';
import { cva } from 'class-variance-authority';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';
import { ResponseType } from '@/lib/constants';

const chatVariants = cva(
  'max-w-[75%] w-max px-3 py-2 rounded-lg text-sm whitespace-pre-wrap',
  {
    variants: {
      variant: {
        [ResponseType.SUCCESS]: 'bg-sidebar text-primary',
        [ResponseType.INFO]: 'bg-sidebar text-primary',
        [ResponseType.ERROR]:
          'border border-destructive text-destructive bg-destructive/20',
      },
      type: {
        bot: 'text-primary',
        user: 'bg-secondary-foreground text-secondary ml-auto',
      },
    },
    defaultVariants: {
      variant: ResponseType.SUCCESS,
    },
  }
);

export function ChatBubble({
  message,
  variant,
  type,
}: {
  message: string;
  variant: ResponseType;
  type: 'bot' | 'user';
}) {
  return (
    <div className={cn(chatVariants({ variant, type }), 'markdown')}>
      <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
    </div>
  );
}

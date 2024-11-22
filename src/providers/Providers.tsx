'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from './QueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </QueryProvider>
  );
}

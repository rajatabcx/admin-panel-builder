'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute='class'>
        <TooltipProvider delayDuration={0}>
          {children}
          <Toaster richColors />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

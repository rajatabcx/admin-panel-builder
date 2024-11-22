'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

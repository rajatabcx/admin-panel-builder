import React from 'react';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowToUse } from '@/components/marketing/HowToUse';
import { Security } from '@/components/marketing/Security';
import { ProblemStatement } from '@/components/marketing/ProblemStatement';
import { Solutions } from '@/components/marketing/Solution';

export default function page() {
  return (
    <main className='min-h-screen bg-background'>
      <Hero />
      <ProblemStatement />
      <Features />
      <Solutions />
      <HowToUse />
      <Security />
    </main>
  );
}

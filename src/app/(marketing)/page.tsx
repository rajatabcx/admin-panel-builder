'use client';
import React from 'react';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowToUse } from '@/components/marketing/HowToUse';
import { Security } from '@/components/marketing/Security';

export default function page() {
  return (
    <main className='min-h-screen bg-background'>
      <Hero />
      <Features />
      <HowToUse />
      <Security />
    </main>
  );
}

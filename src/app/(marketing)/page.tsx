'use client';
import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowToUse } from '@/components/marketing/HowToUse';
import { Security } from '@/components/marketing/Security';

// export default function page() {
//   return (
//     <div className='flex flex-col gap-4'>
//       <h1>Marketing</h1>
//       <Link href='/dashboard'>Dashboard</Link>
//     </div>
//   );
// }

export default function page() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowToUse />
      <Security />
    </main>
  )
}



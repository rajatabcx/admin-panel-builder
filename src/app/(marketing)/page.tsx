'use client';
import React from 'react';
import Link from 'next/link';

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
      <h1>Marketing</h1>
      <Link href='/dashboard'>Dashboard</Link>
    </div>
  );
}

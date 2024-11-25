'use client';
import React from 'react';
import Link from 'next/link';

import { debug } from '@/actions/debug';
import { Button } from '@/components/ui/button';

export default function page() {
  const handleClick = async () => {
    const res = await debug();
    console.log(res);
  };
  return (
    <div>
      <h1>Marketing</h1>
      <Link href='/dashboard/demo'>Dashboard</Link>
      <Button onClick={handleClick}>Debug</Button>
    </div>
  );
}

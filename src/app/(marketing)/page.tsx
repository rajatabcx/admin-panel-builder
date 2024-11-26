'use client';
import React from 'react';
import Link from 'next/link';

import { debug, mainData } from '@/actions/debug';
import { Button } from '@/components/ui/button';

export default function page() {
  const handleClick = async () => {
    const res = await debug();
    console.log(res);
  };
  const handleMainData = async () => {
    const res = await mainData();
    console.log(res);
  };
  return (
    <div className='flex flex-col gap-4'>
      <h1>Marketing</h1>
      <Link href='/dashboard/demo'>Dashboard</Link>
      <Button onClick={handleClick}>Debug</Button>
      <Button onClick={handleMainData}>Main Data</Button>
    </div>
  );
}

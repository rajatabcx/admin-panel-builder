'use client';
import React from 'react';
import Link from 'next/link';

import { testConnection } from '@/actions/debug';
import { Button } from '@/components/ui/button';
import { handleResponse } from '@/lib/handleResponse';

export default function page() {
  const handleClick = async () => {
    const res = await testConnection();
    handleResponse(res);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1>Marketing</h1>
      <Link href='/dashboard/demo'>Dashboard</Link>
      <Button onClick={handleClick} className='w-fit'>
        Debug
      </Button>
      {/* <Button onClick={handleMainData}>Main Data</Button> */}
    </div>
  );
}

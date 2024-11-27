'use client';
import React from 'react';
import Link from 'next/link';

import { mainData, testConnection } from '@/actions/debug';
import { Button } from '@/components/ui/button';
import { handleResponse } from '@/lib/handleResponse';
import { exampleCatalog } from '../../../catalog';

export default function page() {
  const handleClick = async () => {
    const res = await testConnection();
    handleResponse(res);
  };

  const handleMainData = async () => {
    const res = await mainData();
    console.log(res);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1>Marketing</h1>
      <Link href='/dashboard/demo'>Dashboard</Link>
      <Button onClick={handleClick} className='w-fit'>
        Debug
      </Button>
      <Button onClick={handleMainData} className='w-fit'>
        Main Data
      </Button>
    </div>
  );
}

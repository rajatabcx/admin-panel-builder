import React from 'react';
import Link from 'next/link';
export default function page() {
  return (
    <div>
      <h1>Marketing</h1>
      <Link href='/dashboard/demo'>Dashboard</Link>
    </div>
  );
}

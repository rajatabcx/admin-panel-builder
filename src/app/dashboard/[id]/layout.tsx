import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string; schema: string }>;
}) {
  const { id } = await params;
  return (
    <SidebarProvider>
      <AppSidebar id={id} />
      <main className='w-full h-screen overflow-x-hidden'>
        <SidebarTrigger className='block md:hidden' />
        {children}
      </main>
    </SidebarProvider>
  );
}

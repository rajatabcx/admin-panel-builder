import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Header } from '@/components/sidebar/header';
import { SidebarProvider } from '@/components/ui/sidebar';
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
      <div className='overflow-hidden w-full h-screen'>
        <Header />
        <main className='w-full h-[calc(100vh-4rem)] overflow-x-hidden'>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

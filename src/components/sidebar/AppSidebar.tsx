import { Command } from 'lucide-react';

import { NavDB } from '@/components/sidebar/nav-db';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavViews } from './nav-views';

export async function AppSidebar({ id }: { id: string }) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex items-center gap-2 flex-row py-4'>
        <Command className='size-5' />
        <p className='text-base font-semibold'>Admin Panel Builder</p>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {/* <NavViews id={id} /> */}
        <NavDB />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

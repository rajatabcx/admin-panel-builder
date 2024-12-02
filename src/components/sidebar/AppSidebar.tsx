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
import { currentUser } from '@/actions/user';

export async function AppSidebar({ id }: { id: string }) {
  const user = await currentUser();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex items-center group-data-[collapsible=icon]:justify-center flex-row py-4 gap-2'>
        <Command className='size-5' />
        <p className='text-base font-semibold group-data-[collapsible=icon]:hidden'>
          Admin Panel Builder
        </p>
      </SidebarHeader>
      <SidebarContent>
        <NavMain id={id} />
        {/* <NavViews id={id} /> */}
        <NavDB id={id} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

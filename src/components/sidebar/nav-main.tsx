'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ScrollText, Settings, Sparkles } from 'lucide-react';

const navMainData = [
  {
    name: 'Ask AI',
    url: '/dashboard/demo/chat',
    icon: Sparkles,
  },
  {
    name: 'Manage Catalog',
    url: '/dashboard/demo/catalog',
    icon: ScrollText,
  },
  {
    name: 'Settings',
    url: '/dashboard/demo/settings',
    icon: Settings,
  },
];

export function NavMain() {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarMenu>
        {navMainData.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className='size-5' />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

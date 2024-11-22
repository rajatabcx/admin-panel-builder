'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Database, Settings, Sparkles } from 'lucide-react';

const navMainData = [
  {
    name: 'Ask AI',
    url: '#',
    icon: Sparkles,
  },
  {
    name: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    name: 'Database',
    url: '#',
    icon: Database,
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

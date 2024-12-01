'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ScrollText, Settings, Sparkles } from 'lucide-react';

const navMainData = (id: string) => [
  {
    name: 'Ask AI',
    url: `/dashboard/${id}/chat`,
    icon: Sparkles,
  },
  {
    name: 'Manage Catalog',
    url: `/dashboard/${id}/catalog`,
    icon: ScrollText,
  },
  {
    name: 'Settings',
    url: `/dashboard/${id}/settings`,
    icon: Settings,
  },
];

export function NavMain({ id }: { id: string }) {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarMenu>
        {navMainData(id).map((item) => (
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

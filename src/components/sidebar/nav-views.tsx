import { LayoutDashboard, Plus } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const viewsData = {
  title: 'Views',
  url: '#',
  icon: LayoutDashboard,
  isActive: true,
  items: [
    {
      title: 'View 1',
      url: '#',
    },
    {
      title: 'View 2',
      url: '#',
    },
    {
      title: 'View 3',
      url: '#',
    },
  ],
};

export function NavViews({}: { id: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          key={viewsData.title}
          asChild
          open={true}
          className='group/collapsible'
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={viewsData.title}
                className='hover:!bg-sidebar'
              >
                {viewsData.icon && <viewsData.icon className='size-5' />}
                <span>{viewsData.title}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon' className='ml-auto'>
                      <Plus className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right'>Add View</TooltipContent>
                </Tooltip>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {viewsData.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url}>
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}

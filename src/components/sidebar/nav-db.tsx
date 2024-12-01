import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';

import { getSchemas } from '@/actions/metadata';
import { Schema } from './schema';

export async function NavDB({ id }: { id: string }) {
  const { schemas } = await getSchemas(id);
  const selectedSchema =
    schemas.find((schema) => schema === 'public') || schemas[0] || '';

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dataset</SidebarGroupLabel>
      <SidebarMenu>
        <Schema schemas={schemas} defaultSchema={selectedSchema} />
      </SidebarMenu>
    </SidebarGroup>
  );
}

'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionResponse, Project } from '@/lib/types';
import { encrypt } from './encryption';
import { ResponseType } from '@/lib/constants';

export async function createProject(
  project: Project
): Promise<ActionResponse & { projectId: string }> {
  const encryptedConnectionString = await encrypt(project.connectionString);
  const supabase = await createClient();
  const { error, data } = await supabase
    .from('projects')
    .insert({
      name: project.name,
      description: project.description,
      connection_string: encryptedConnectionString,
    })
    .select('id')
    .single();

  if (error || !data) {
    return {
      message: error?.message || 'Failed to create project',
      type: ResponseType.ERROR,
      projectId: '',
    };
  }

  return {
    message: 'Project created successfully',
    type: ResponseType.SUCCESS,
    projectId: data.id,
  };
}

export async function getProjects(): Promise<{
  projects: {
    id: string;
    name: string | null;
    description: string | null;
    created_at: string;
  }[];
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id,name,description,created_at')
    .order('created_at', { ascending: false });

  if (error || !data) {
    return {
      projects: [],
    };
  }

  return {
    projects: data,
  };
}

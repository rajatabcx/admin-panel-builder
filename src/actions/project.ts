'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionResponse, Project } from '@/lib/types';
import { encrypt } from './encryption';
import { ResponseType } from '@/lib/constants';
import { currentUser } from './user';

export async function createProject(
  project: Project
): Promise<ActionResponse & { projectId: string }> {
  const user = await currentUser();
  if (!user) {
    return {
      message: 'You must be logged in to create a project',
      type: ResponseType.ERROR,
      projectId: '',
    };
  }
  const encryptedConnectionString = await encrypt(project.connectionString);

  if (!encryptedConnectionString) {
    return {
      message: 'Failed to encrypt connection string',
      type: ResponseType.ERROR,
      projectId: '',
    };
  }
  const supabase = await createClient();
  const { error, data } = await supabase
    .from('projects')
    .insert({
      name: project.name,
      description: project.description,
      dbConnectionString: encryptedConnectionString,
      user_id: user.id,
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
  const user = await currentUser();
  if (!user) {
    return {
      projects: [],
    };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id,name,description,created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  console.log(data);

  if (error || !data) {
    return {
      projects: [],
    };
  }

  return {
    projects: data,
  };
}

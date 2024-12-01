'use server';

import { createClient } from '@/lib/supabase/server';
import { User } from '@/lib/types';

export const currentUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata.name!,
  };
};

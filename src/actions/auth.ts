'use server';

import { ResponseType } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { ActionResponse } from '@/lib/types';

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    console.log(error);
    return { message: error.message, type: ResponseType.ERROR };
  }

  return { message: 'User created successfully', type: ResponseType.SUCCESS };
}

export async function signIn(
  email: string,
  password: string
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { message: error.message, type: ResponseType.ERROR };
  }

  return { message: 'User signed in successfully', type: ResponseType.SUCCESS };
}

export const signOut = async (): Promise<ActionResponse> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return { message: error.message, type: ResponseType.ERROR };
  }
  return {
    message: 'User signed out successfully',
    type: ResponseType.SUCCESS,
  };
};

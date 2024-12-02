'use server';
import { ResponseType } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { ActionResponse } from '@/lib/types';

export const addToWaitlist = async (email: string): Promise<ActionResponse> => {
  const supabase = await createClient();

  const { error } = await supabase.from('waitlists').insert({ email });

  if (error) {
    return {
      type: ResponseType.ERROR,
      message:
        error.code === '23505'
          ? 'Email already exists'
          : error.message || 'Failed to add to waitlist',
    };
  }

  return {
    type: ResponseType.SUCCESS,
    message: 'Added to waitlist',
  };
};

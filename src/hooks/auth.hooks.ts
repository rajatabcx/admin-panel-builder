import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { signIn, signOut, signUp } from '@/actions/auth';
import { signinSchema, signupSchema } from '@/lib/validationSchema';
import { handleResponse } from '@/lib/handleResponse';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const res = await signUp(data.name, data.email, data.password);
      handleResponse(res);
      return res;
    },
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof signinSchema>) => {
      const res = await signIn(data.email, data.password);
      handleResponse(res);
      return res;
    },
  });
};

export const useSignout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await signOut();
      handleResponse(res);
      return res;
    },
  });
};

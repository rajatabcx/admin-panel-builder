import { addToWaitlist } from '@/actions/waitlist';
import { handleResponse } from '@/lib/handleResponse';
import { useMutation } from '@tanstack/react-query';

export const useWaitlist = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await addToWaitlist(email);
      handleResponse(res);
      return res;
    },
  });
};

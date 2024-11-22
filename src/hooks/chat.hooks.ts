import { nlqChat } from '@/actions/nlqChat';
import { useMutation } from '@tanstack/react-query';

export function useChat() {
  return useMutation({
    mutationFn: async (query: string) => {
      const stream = await nlqChat(query);
      return stream;
    },
  });
}

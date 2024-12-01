import { nlqChat } from '@/actions/nlqChat';
import { useMutation } from '@tanstack/react-query';

export function useChat() {
  return useMutation({
    mutationFn: async ({ id, query }: { id: string; query: string }) => {
      const stream = await nlqChat(id, query);
      return stream;
    },
  });
}

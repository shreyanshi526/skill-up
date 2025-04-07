import { useQuery } from "@tanstack/react-query";
import coreApi from "../utils/CoreApiInstance";

export const useGetChatsRecords = () => {
    return useQuery({
      queryKey: ['chat-records'],
      queryFn: async () => {
        const { data } = await coreApi.post('/v1/getChatRecords');
        return data?.chatRecords;
      },
    });
  };
  
  export const useGetAllMessages = (chatId: string) => {
    return useQuery({
      queryKey: ['see-all-messages', chatId],
      queryFn: async () => {
        const { data } = await coreApi.post('/v1/seeMessages', { chatId });
        return data?.chatRecords;
      },
      enabled: !!chatId,
    });
  };
  
  export const useGetAllMentors = (id: string) => {
    return useQuery({
      queryKey: ['see-all-Mentors', id],
      queryFn: async () => {
        const { data } = await coreApi.post('/v1/see-all-Mentors', { id });
        return data.users;
      },
      enabled: !!id,
    });
  };
  
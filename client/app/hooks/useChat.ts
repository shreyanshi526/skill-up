import { useQuery } from '@tanstack/react-query';
import coreApi from '../utils/CoreApiInstance';

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
}

export const useChat = () => {

    const getChatsRecords = (id:string) => {
        return useQuery({
            queryKey:['chat-records',id],
            queryFn: async () => {
                const {data} = await coreApi.post('/v1/getChatRecords',{'userId':id});
                return data?.chatRecords;
            },
            enabled: !!id,
        })
    };

    const getAllMessages = (chatId:string) => {
        return useQuery({
            queryKey:['see-all-messages',chatId],
            queryFn: async () => {
                const {data} = await coreApi.post('/v1/seeMessages',{chatId});
                return data?.chatRecords;
            },
            enabled: !!chatId,
        })
    };

    const useGetAllMentors = (id: string) => {
        return useQuery({
            queryKey: ['see-all-Mentors', id],
            queryFn: async () => {
                const { data } = await coreApi.post('/v1/see-all-Mentors', { id });
                return data.users;
            },
            enabled: !!id,
        });
    };

    return {
        getChatsRecords,
        getAllMessages,
        useGetAllMentors,
    };
};
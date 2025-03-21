import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import coreApi from '../utils/CoreApiInstance';

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
}

export const useChat = () => {
    const queryClient = useQueryClient();

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
                const {data} = await coreApi.post('/v1/getChatRecords',{chatId});
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

    const sendMessage = useMutation({
        mutationFn: async (content: string) => {
            const { data } = await coreApi.post('/api/chat', {
                content,
                sender: 'currentUser',
            });
            return data;
        },
        onSuccess: (newMessage) => {
            queryClient.setQueryData<Message[]>(['chat-messages'], 
                (old = []) => [...old, newMessage]
            );
        },
    });

    return {
        getChatsRecords,
        getAllMessages,
        useGetAllMentors,
        sendMessage: sendMessage.mutate,
        isSending: sendMessage.isPending,
    };
};
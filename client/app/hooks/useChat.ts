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

    const { data: messages, isLoading } = useQuery({
        queryKey: ['see-all-Mentors'],
        queryFn: async () => {
            const { data } = await coreApi.post('/v1/chatsee-all-Mentors');
            return data.messages;
        }
    });

    const sendMessage = useMutation({
        mutationFn: async (content: string) => {
            const { data } = await coreApi.post('/api/chat', {
                content,
                sender: 'currentUser', // Replace with actual user management
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
        messages,
        isLoading,
        sendMessage: sendMessage.mutate,
        isSending: sendMessage.isPending,
    };
};
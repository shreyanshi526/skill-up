import { Server, Socket } from 'socket.io';
import Message from '../Models/message.model';
import Chat from '../Models/chat.model';

export const chatHandler = (io: Server, socket: Socket) => {

    socket.on('join_room', (chatId: string) => {
        socket.join(chatId);
        console.log(`User joined room: ${chatId}`);
    });

    // We keep the socket event handler as the primary way to handle messages
    // This provides real-time capabilities and handles database operations
    socket.on('send_message', async (data) => {
        try {
            const { senderId, chatId, message } = data;
            const timestamp = new Date().toISOString();

            // First store message in database
            const newMessage = await Message.create({
                senderId,
                chatId,
                content: message,
                timestamp
            });

            // Update chat with new message
            await Chat.findByIdAndUpdate(chatId, {
                $push: { messages: newMessage._id }
            });

            // Then emit to all users in the room
            socket.to(chatId).emit('receive_message', {
                senderId,
                message,
                timestamp, 
                messageId: newMessage._id
            });

        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('message_error', { error: 'Failed to send message' });
        }
    });

};

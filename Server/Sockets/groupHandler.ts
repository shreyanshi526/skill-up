import { Server, Socket } from 'socket.io';
import Message from '../Models/message.model';
import Chat from '../Models/chat.model';

export const groupHandler = (io: Server, socket: Socket) => {
    socket.on('join_group', ({ groupId }) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on('send_group_message', async ({ groupId, senderId, message }) => {
        try {
            const timestamp = new Date().toISOString();

            const newMessage = await Message.create({
                senderId,
                chatId: groupId, // Using chatId for group messages too
                content: message,
                timestamp
            });

            // Update chat/group with new message
            await Chat.findByIdAndUpdate(groupId, {
                $push: { messages: newMessage._id }
            });

            // Emit to all users in the group
            socket.to(groupId).emit('receive_group_message', {
                senderId,
                message,
                timestamp,
                messageId: newMessage._id
            });

        } catch (error) {
            console.error('Error sending group message:', error);
            socket.emit('message_error', { error: 'Failed to send group message' });
        }
    });
}
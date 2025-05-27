import { Server, Socket } from 'socket.io';
import Message from '../Models/message.model';
import Chat from '../Models/chat.model';

export const chatHandler = (io: Server, socket: Socket) => {

    socket.on('join_room', (chatId: string) => {
        socket.join(chatId);
    });

    socket.on('send_message', async (data) => {

        try {
            const { senderId, senderName, chatId, message } = data;
            const timestamp = new Date().toISOString();

            // First store message in database
            const newMessage = await Message.create({
                senderId,
                senderName,
                chatId,
                message,
                timestamp
            });
            console.log(newMessage, "MEssage")
            // Update chat with new message
            const result = await Chat.findOneAndUpdate(
                { chatId: chatId },
                { $push: { messages: newMessage._id } }
            );
            console.log("Result>>>>>>",result)
            console.log(timestamp, "timestamp")
            // Then emit to all users in the room
            if (result) {
                socket.to(chatId).emit('receive_message', {
                    newMessage
                });
            }

        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('message_error', { error: 'Failed to send message' });
        }
    });

};

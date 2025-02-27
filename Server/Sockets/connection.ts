import { Server, Socket } from 'socket.io';
import { chatHandler } from './chatHandler';
import { groupHandler } from './groupHandler';

export const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {

        // Listen for initial connection type
        socket.on('initialize', (type: 'chat' | 'group') => {
            if (type === 'chat') {
                chatHandler(io, socket);
            } else if (type === 'group') {
                groupHandler(io, socket);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};



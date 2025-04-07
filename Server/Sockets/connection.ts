import { Server, Socket } from 'socket.io';
import { chatHandler } from './chatHandler';
import { groupHandler } from './groupHandler';
import { isAuthenticated } from '../midlleware/auth';

export const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

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



import { io, Socket } from 'socket.io-client';

class SocketClient {
    private readonly socket: Socket;

    constructor(serverUrl: string = 'http://localhost:7001', type: 'chat' | 'group') {
        this.socket = io(serverUrl, {
            transports: ['websocket'],
        });

        // Emit 'initialize' event with type 'chat' or 'group'
        this.socket.emit('initialize', type);

        // Handle connection errors
        this.socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });
    }

    // Join a chat room by chatId
    joinRoom(chatId: string) {
        this.socket.emit('join_room', chatId);
    }

    // Send a message to the server
    sendMessage(data: any) {
        this.socket.emit('send_message', data);
    }

    // Listen for incoming messages
    onReceiveMessage(callback: (data: any) => void) {
        this.socket.on('receive_message', (data: string) => {
            callback(data);
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export default SocketClient;

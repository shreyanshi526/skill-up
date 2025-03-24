import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import SocketClient from '../utils/socketClient';

// Define the shape of the context value
interface SocketContextProps {
  socketClient: SocketClient | null;
}

// Create the context
const SocketContext = createContext<SocketContextProps>({ socketClient: null });

// Define the type of props that SocketProvider will receive
interface SocketProviderProps {
  children: ReactNode;  // This tells TypeScript that "children" must be passed as a prop
}

// Create a provider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socketClient, setSocketClient] = useState<SocketClient | null>(null);

  useEffect(() => {
    const client = new SocketClient('http://localhost:7000','chat');  // Create a SocketClient instance
    setSocketClient(client);

    return () => client.disconnect();  // Disconnect socket when component unmounts
  }, []);

  return (
    <SocketContext.Provider value={{ socketClient }}>
      {children}  {/* Render the children inside the provider */}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

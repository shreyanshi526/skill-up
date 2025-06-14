"use client";
import React, { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useGetChatsRecords, useGetAllMessages } from "../hooks/useChat";
import { useSocket } from "../context/SocketContext"; // Using the SocketContext
import { useAuth } from "../hooks/auth/useAuth";



type Props = Record<string, never>;

const Page: FC<Props> = () => {
  const { socketClient } = useSocket(); // Get the socketClient from context
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [currentOpenChatId, setCurrentOpenChatId] = useState<string>("");
  const [currentOpenChatDetails, setCurrentOpenChatDetails] = useState<any[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat data from API using userId
  const { data: mentors, isLoading } = useGetChatsRecords();
  const { data: messageDetails } = useGetAllMessages(currentOpenChatId);

  
  const handleChatClick = (chatId: string) => {
    setCurrentOpenChatId(chatId);
    setCurrentOpenChatDetails(messageDetails);
    socketClient?.joinRoom(chatId);
  };

  const {user} = useAuth();
  const userId = user?._id

  useEffect(() => {
    if (mentors?.chats?.length && userId && currentOpenChatId === "") {
      const firstChatId = mentors?.chats?.[0]?.chatId;
      setCurrentOpenChatId(firstChatId);
    }
  }, [mentors, currentOpenChatId, userId]);

  useEffect(() => {
    if (socketClient) {
      // Listen for real-time incoming messages
      socketClient.onReceiveMessage((incomingMessage) => {
        setCurrentOpenChatDetails((prevMessages) => [
          ...prevMessages,
          incomingMessage,
        ]);
      });

      // Clean up socket connection when component unmounts
      return () => {
        socketClient.disconnect();
      };
    }
  }, [socketClient]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMessageObj = {
      senderId: userId,
      senderName:user.name,
      chatId: currentOpenChatId,
      message: newMessage,
    };

    // Emit the new message via socket to the server
    socketClient?.sendMessage(newMessageObj);

    // Optimistically update UI with the sent message
    setCurrentOpenChatDetails((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        senderId: { _id: userId, username: "You" },
        message: newMessage,
        timestamp: new Date().toISOString(),
      },
    ]);

    setNewMessage("");
  };

  // Helper function to determine if the message is from the current user
  const isCurrentUser = (message: any, userId: string) => {
    if (typeof message.senderId === "string") {
      return message.senderId === userId;
    } else if (typeof message.senderId === "object") {
      return message.senderId?._id === userId;
    }
    return false;
  };

  // Helper function to get the username
  const getUsername = (message: any, userId: string) => {
    if (typeof message.senderId === "string") {
      // WebSocket message structure
      return message.senderId === userId ? "You" : "Other"; // Return 'You' only if it's the current user
    } else if (typeof message.senderId === "object") {
      const yes = isCurrentUser(message, userId)
      return yes
        ? "You"
        : message.senderId?.name || message.senderName;
    }
    return "Unknown";
  };

  return (
    <div className="h-screen flex flex-col">
      <Heading
        title="Elearning"
        description="Learn Your Way!"
        keywords="MERN,MEAN,REDUX"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <div className="flex-1 flex bg-gray-100 dark:bg-gray-800">
        {/* Sidebar */}
        <div className="w-[300px] border-2 border-red-600 bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <input
                type="text"
                value={user.name} // Displaying the name instead of entering the ID
                readOnly
                className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none"
              />
            </div>

          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : mentors?.chats?.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              {mentors?.chats?.map((chat: any, index: number) => {
                const participant = chat.participants?.find(
                  (p: any) => p._id !== userId
                );
                return (
                  <div
                    key={index}
                    onClick={() => handleChatClick(chat.chatId)}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {participant?.name?.charAt(0) || ""}
                        </span>
                      </div>
                      <div className="flex justify-between w-52">
                        <div>
                          <h3 className="font-medium dark:text-white">
                            {participant?.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {chat?.messages?.[0]?.message || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No chats available.</p>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col border-yellow-400 border-2 h-full max-h-screen">
          {/* Sticky Chat Header */}
          <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
            <h2 className="text-xl font-semibold dark:text-white">
              {mentors?.chats
                ?.find((chat: any) => chat.chatId === currentOpenChatId)
                ?.participants?.find((p: any) => p._id !== userId)?.name || "Select a chat"}
            </h2>
          </div>

          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentOpenChatDetails?.map((message: any, index: number) => (
              <div
                key={index}
                className={`flex ${isCurrentUser(message, userId) ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`w-auto ${isCurrentUser(message, userId)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                    } rounded-lg p-3`}
                >
                  <span className="text-sm font-semibold">
                    {getUsername(message, userId)}
                  </span>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Bottom Input */}
          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

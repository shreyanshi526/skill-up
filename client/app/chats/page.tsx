"use client";
import React, { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useChat } from "../hooks/useChat";

type Props = Record<string, never>;

const Page: FC<Props> = () => {
    const { getChatsRecords, getAllMessages } = useChat();
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const [userId, setUserId] = useState<string>("");
    const [currentOpenChatId, setCurrentOpenChatId] = useState<string>("");
    const [currentOpenChatDetails, setCurrentOpenChatDetails] = useState("");
    const [newMessage, setNewMessage] = useState("");

    // Fetch mentors based on userId
    const { data: mentors, isLoading } = getChatsRecords(userId);
    const { data: messageDetails } = getAllMessages(currentOpenChatId);
    

    const handleChatClick = (chatId: string) => {
        setCurrentOpenChatId(chatId);
        setCurrentOpenChatDetails(messageDetails);
    };

    useEffect(() => {
        if (mentors?.chats?.length && userId && currentOpenChatId === "") {
            const firstChatId = mentors?.chats?.[0]?.chatId;
            setCurrentOpenChatId(firstChatId);
        }
    }, [mentors, currentOpenChatId, userId]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const newMessageObj = {
            _id: Date.now().toString(),
            chatId: currentOpenChatId,
            senderId: {
                _id: userId,
                username: "You"
            },
            message: newMessage,
            messageType: "text",
            timestamp: new Date().toISOString(),
        };

        // Add the new message to the end of existing messages
        if (messageDetails) {
            messageDetails.push(newMessageObj);
        }
        setNewMessage("");
    };

    return (
        <div className="h-screen flex flex-col">
            <Heading title="Elearning" description="Learn Your Way!" keywords="MERN,MEAN,REDUX" />
            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />

            <div className="flex-1 flex bg-gray-100 dark:bg-gray-800">
                {/* Sidebar */}
                <div className="w-[300px] bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b dark:border-gray-700">
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : mentors?.chats?.length > 0 ? (
                        <div className="flex-1 overflow-y-auto">
                            {mentors?.chats?.map((chat: any, index: number) => {
                                const participant = chat.participants?.find((p: any) => p._id !== userId);
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleChatClick(chat.chatId)}
                                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                                <span className="text-white font-bold">
                                                    {participant?.username?.charAt(0) || ""}
                                                </span>
                                            </div>
                                            <div className="flex justify-between w-52">
                                                <div>
                                                    <h3 className="font-medium dark:text-white">{participant?.username}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                        {chat?.messages?.[0]?.message || "No messages yet"}
                                                    </p>
                                                </div>
                                                <div>o</div>
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
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
                        <h2 className="text-xl font-semibold dark:text-white">
                            {mentors?.chats?.find((chat: any) => chat.chatId === currentOpenChatId)?.participants?.find((p: any) => p._id !== userId)?.username || "Select a chat"}
                        </h2>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messageDetails?.length > 0 ? (
                            messageDetails.map((message: any, index: number) => (
                                <div
                                    key={index}
                                    className={`flex ${message.senderId._id === userId ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`w-auto ${message.senderId._id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} rounded-lg p-3`}>
                                        <div className="flex justify-end items-center mb-2 gap-x-10 ">
                                            <span className="text-sm font-semibold">
                                                {message.senderId._id === userId ? 'You' : message.senderId.username}
                                            </span>
                                            <span className="text-xs opacity-70">
                                                {new Date(message.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="break-words">
                                            {message.message}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    No messages yet. Start a conversation! 👋
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

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

    // Fetch mentors based on userId
    const { data: mentors, isLoading } = getChatsRecords(userId);

    const handleChatClick = (chatId: string) => {
        setCurrentOpenChatId(chatId);
        const { data } = getAllMessages(chatId);
        setCurrentOpenChatDetails(data);
    };

    const getChatData = (firstChatId:string) => {
        const { data } = getAllMessages(firstChatId);
        return data;
    }

    useEffect(() => {
        if (mentors?.chats?.length && userId && currentOpenChatId === "") {
            const firstChatId = mentors?.chats?.[0]?.chatId;
            setCurrentOpenChatId(firstChatId);
            const data = getChatData(firstChatId);
            setCurrentOpenChatDetails(data);
        }
    }, [mentors, currentOpenChatId, userId]);

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
                    {/* Chat header and messages remain unchanged */}
                </div>
            </div>
        </div>
    );
};

export default Page;

"use client";
import React, { FC, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useChat } from "../hooks/useChat";

type Props = Record<string, never>;

const Page: FC<Props> = () => {
    const {
        useGetAllMentors,
    } = useChat();
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const [userId, setUserId] = useState<string>("");

    // Fetch mentors based on userId
    const { data: mentors, isLoading } = useGetAllMentors(userId);

    const handleChatClick = (mentor: any) => {
    }
    const yes = 1
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
                <div className="w-[300px] bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col">
                    {/* User ID Input */}
                    <div className="p-4 border-b dark:border-gray-700">
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    {/* Mentors List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        {'M'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium dark:text-white">{'MIA'}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 flex items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold">JD</span>
                            </div>
                            <div>
                                <h2 className="font-semibold dark:text-white">Chat Room</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-start">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[70%]">
                                    <p className="text-gray-800 dark:text-gray-200">Hey, how are you?</p>
                                    <span className="text-xs text-gray-500 mt-1">10:00 AM</span>
                                </div>
                            </div>
                            <div className="flex items-start justify-end">
                                <div className="bg-blue-500 rounded-lg p-3 max-w-[70%]">
                                    <p className="text-white">I'm doing great, thanks! How about you?</p>
                                    <span className="text-xs text-blue-100 mt-1">10:02 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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

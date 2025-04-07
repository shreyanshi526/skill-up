import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/Errorhandler";
import { CatchAsyncError } from "../midlleware/catchAsyncError";
import { getRecommendedMentors, startChat,createMessage, getChatRecords, GetAllMessages } from "../Services/chat.service";
import { io } from "../server";


export const ListRecommendedMentors = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUserId = req.user?._id;

        if (!currentUserId) {
            return res.status(400).json({ message: "User Id is required." });
        }

        const recommendedMentors = await getRecommendedMentors(currentUserId,res);

        res.status(200).json({
            success: true,
            users: recommendedMentors
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const Chats = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user?._id;
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Both senderId and receiverId are required." });
        }
        const data = {senderId,receiverId};
        const chat = await startChat(data, res);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const onGetChatsRecords = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(400).json({ message: "UserID is required." });
        }
        const chatRecords = await getChatRecords(userId, res);
        res.status(201).json({
            success : "true",
            message:"Chat Records fetched successfully",
            chatRecords
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const onGetAllMessages = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatId } = req.body;
        if (!chatId) {
            return res.status(400).json({ message: "chatID is required." });
        }
        const chatRecords = await GetAllMessages(chatId, res);
        res.status(201).json({
            success : "true",
            chatRecords
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const onSendMessage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatId,receiverId,message  } = req.body;
        const senderId = req.user?._id;
        console.log('im here')
        if (!senderId || !chatId || !message) {
            return res.status(400).json({ message: "Required all fields." });
        }
        const data = {chatId,senderId,message};
        const chat = await createMessage(data, res);

        io.to(receiverId).emit("receive_message", {
            senderId,
            message,
            timestamp: new Date().toISOString(),
        });

        res.status(201).json({
            success : "true",
            chat
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});



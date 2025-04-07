import  express  from "express";
import { ListRecommendedMentors,Chats, onSendMessage, onGetChatsRecords,onGetAllMessages } from "../controllers/chat.controller";
import { isAuthenticated } from "../midlleware/auth";

const chatRouter = express.Router();

chatRouter.post("/see-all-Mentors",isAuthenticated,ListRecommendedMentors);
chatRouter.post("/getChatRecords",isAuthenticated,onGetChatsRecords);
chatRouter.post("/chats",isAuthenticated,Chats);
chatRouter.post("/sendMessage",isAuthenticated,onSendMessage);
chatRouter.post('/seeMessages',isAuthenticated,onGetAllMessages);

export default chatRouter;
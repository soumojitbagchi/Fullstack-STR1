import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import AiChatController from "../controller/aiChat.controller.js";

const chatRouter = express.Router();

chatRouter.get("/send", authMiddleware, AiChatController.sendMessage);

export default chatRouter;
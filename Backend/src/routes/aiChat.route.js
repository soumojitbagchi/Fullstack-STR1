import express from "express";
import { authmiddleware } from "./middleware/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/aiChat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/send/:id", authmiddleware, sendMessage);
chatRouter.get("/get/:id", authmiddleware, getMessages);

export default chatRouter;
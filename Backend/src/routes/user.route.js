import express from "express";
const userRoutes = express.Router();

import authMiddleware from "../middleware/auth.middleware.js";
import userController from "../controller/user.controller.js";

userRoutes.get("/getme", authMiddleware, userController.getMeController);
export default userRoutes;

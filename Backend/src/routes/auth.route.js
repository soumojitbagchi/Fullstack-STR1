import express from "express";
const authRoutes = express.Router();
import authController from '../controller/auth.controller.js';

authRoutes.post("/register",authController.registerController);
authRoutes.post("/login",authController.loginController);
export default authRoutes;

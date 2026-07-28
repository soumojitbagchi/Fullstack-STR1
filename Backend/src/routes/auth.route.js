import express from "express";
const authRoutes = express.Router();
import authController from '../controller/auth.controller.js';
import { loginValidation, registerValidation } from "../validation/auth.validation.js";

authRoutes.post("/register", registerValidation, authController.registerController);
authRoutes.post("/login", loginValidation, authController.loginController);
export default authRoutes;

import express from "express";
const userRoutes = express.Router();

import authMiddleware from "../middleware/auth.middleware.js";
import userController from "../controller/user.controller.js";
import productController from "../controller/product.controller.js";

userRoutes.get("/getme", authMiddleware, userController.getMeController);
userRoutes.get("/cart", authMiddleware, productController.getCart);
userRoutes.post("/cart/:productId", authMiddleware, productController.addProductToCart);
userRoutes.delete("/cart/:productId", authMiddleware, productController.removeFromCart);
export default userRoutes;

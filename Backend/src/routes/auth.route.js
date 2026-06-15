const express = require("express");
const authRoutes = express.Router();
const authController = require('../controller/auth.controller')

authRoutes.post("/register",authController.registerController);
authRoutes.post("/login",authController.loginController);
module.exports = authRoutes;

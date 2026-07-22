const express = require("express");
const userRoutes = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controller/user.controller");

userRoutes.get("/getme", authMiddleware, userController.getMeController);
module.exports = userRoutes;

const express = require("express");
const userRoutes = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controller/user.controller");

userRoutes.post("/getme", authMiddleware, userController.getMeController);
module.exports = userRoutes;

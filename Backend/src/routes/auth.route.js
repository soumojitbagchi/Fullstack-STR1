const express = require("express");
const authRoutes = express.Router();
const userData = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const crypto = require("crypto");

authRoutes.post("/register", async (req, res) => {
  const { user, email, password } = req.body;
  const isUserExists = await userData.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");
  const data = await userData.create({
    user,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: data._id,
      user: data.user,
    },
    process.env.JWT_KEY,{expiresIn:'3h'}
  );
  res.cookie("login-credential", token);
  res.status(201).json({ message: "User registered successfully", token });
});
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await userData.findOne({ email });
  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordMatch =
    data.password ===
    crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      id: data._id,
      email: data.email,
    },
    process.env.JWT_KEY,{expiresIn:'3h'}
  );
  res.cookie("login-credential", token);
  res.status(201).json({ message: "Login successful", token });
});
module.exports = authRoutes;

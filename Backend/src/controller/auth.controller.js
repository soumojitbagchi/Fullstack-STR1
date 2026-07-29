import userData from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/email.service.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    const isUserExists = await userData.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const data = await userData.create({
      user,
      email,
      password: hash,
    });
      await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })
    const token = jwt.sign(
      {
        id: data._id,
        email: data.email,
        user: data.user,
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" },
    );
    res.cookie("token", token);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password, user } = req.body;
    const data = await userData.findOne({
      $or: [{ email: email }, { user: user }],
    });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: data._id,
        email: data.email,
        user: data.user,
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" },
    );
    res.cookie("token", token);
    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { registerController, loginController };

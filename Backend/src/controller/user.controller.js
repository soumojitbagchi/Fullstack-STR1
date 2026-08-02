import user from "../models/user.model.js";
import jwt from "jsonwebtoken";

const getMeController = async (req, res) => {
    const decoded = req.user.id;
    try {
        const userDetails = await user.findById(decoded);
        res.status(200).json({
            username: userDetails.user,
            email: userDetails.email
        });
    } catch (error) {
        res.status(500).json({
            message: "unable to fetch"
        });
    }
};

const updateProfileController = async (req, res) => {
    const userId = req.user.id;
    const { username, name, email } = req.body;
    const newUsername = username || name;

    try {
        const updateData = {};
        if (newUsername) updateData.user = newUsername;
        if (email) updateData.email = email;

        if (email) {
            const existingUser = await user.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use by another account" });
            }
        }

        const updatedUser = await user.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign(
            {
                id: updatedUser._id,
                email: updatedUser.email,
                user: updatedUser.user,
            },
            process.env.JWT_KEY,
            { expiresIn: "3h" }
        );

        res.cookie("token", token);
        res.status(200).json({
            message: "Profile updated successfully",
            token,
            user: {
                id: updatedUser._id,
                name: updatedUser.user,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: error.message || "Failed to update profile" });
    }
};

export default { getMeController, updateProfileController };
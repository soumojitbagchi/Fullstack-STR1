import { chatWithAI } from "../services/aiChat.service.js";

const sendMessage = async (req, res) => {
    const { message } = req.query;
    try {
        const response = await chatWithAI(message);
        res.status(200).json({
            data: response,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to send message"
        });
    }
};

export default { sendMessage };
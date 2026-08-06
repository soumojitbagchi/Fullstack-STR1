import { ChatGoogle } from "@langchain/google";
import {
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
const model = new ChatGoogle({
  model: "gemini-3.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  maxRetries: 3,
});
const messages = [];
export const chatWithAI = async (UserInput) => {
  try {
    messages.push(new HumanMessage(UserInput));

    const response = await model.invoke(messages);
    messages.push(new AIMessage(response.text));
    console.log(response.content);
  } catch (error) {
    console.error("Error during AI chat:", error.stack);
  }
};
chatWithAI("What is the capital of France?");

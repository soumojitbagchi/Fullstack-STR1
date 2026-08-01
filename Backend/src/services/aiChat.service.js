// import { ChatGoogle } from "@langchain/google";
// import  {humanMessage, systemMessage } from "@langchain/cors/messages";
// const model = new ChatGoogle({
//   model: "gemini-2.5-flash",
//   apiKey: process.env.Gemini_API_KEY,
//   retry: 3,
// });
// export const chatWithAI = async () => {
//     const messages = [
//     systemMessage("You are a helpful assistant."),
//     humanMessage("Hello, how are you?")
//   ];
//   model.invoke(messages).then((response) => {
//     console.log(response.text);
//   });
// };
// //dropped for now
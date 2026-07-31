import {ChatGoogle} from '@langchain/google'
const model = new ChatGoogle({model: 'gemini-2.5-flash',apiKey: process.env.Gemini_API_KEY,})
model.invoke('Hello, how are you?').then((response) => {
  console.log(response)
})
import "dotenv/config";
import app from "./src/app.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
const port = 8080;
import connectToDB from "./src/config/database.js";
connectToDB();
const httpServer = createServer(app)
const io = new Server(httpServer,()=>{
  
})
io.on('connection',(socket)=>{
  console.log('new connection established')
  socket.on('sync',(msg)=>{
    console.log(msg)
  })
})
// httpServer.listen(port, () => {
//   console.log("connect to 8080"); 
// });
app.listen(port,()=>{
  console.log("connect to the port")
})

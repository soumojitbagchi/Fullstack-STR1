import "dotenv/config";
import app from "./src/app.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
const port = 8080;
import connectToDB from "./src/config/database.js";
connectToDB();
// const httpServer = createServer(app)
// const io = new Server(httpServer,()=>{

// })
// io.on('connection',(socket)=>{
//   console.log('new connection established')
//   socket.on('sync',(msg)=>{
//     console.log(msg)
//   })
// })
// httpServer.listen(port, () => {
//   console.log("connect to 8080"); 
// });
const server = app.listen(port, () => {
  console.log("connect to the port")
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use!`);
    process.exit(1);
  }
  throw err;
});
process.on('SIGINT', () => server.close(() => process.exit(0)));
process.once('SIGUSR2', () => server.close(() => process.kill(process.pid, 'SIGUSR2')));

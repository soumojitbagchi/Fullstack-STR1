require("dotenv").config();
const app = require("./src/app");
const {createServer} = require('http')
const {Server} = require('socket.io')
const port =8080
const connectToDB = require("./src/config/database");
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

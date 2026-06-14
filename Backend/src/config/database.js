const mongoose = require("mongoose")
const connectToDB=()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("connected")
  })
  .catch((err)=>{
    console.log("Database connection error:", err.message)
  })
}
module.exports=connectToDB
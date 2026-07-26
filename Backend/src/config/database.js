import mongoose from "mongoose";
const connectToDB=()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("connected")
  })
  .catch((err)=>{
    console.log("Database connection error:", err.message)
  })
}
export default connectToDB;
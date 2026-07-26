import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
  user:String,
  password:String,
  email:{
    type:String,
    unique:true
    
  }
})
const userData= mongoose.model('users',userSchema)
export default userData;
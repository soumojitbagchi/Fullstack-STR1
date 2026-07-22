
const userData = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bcrypt = require('bcryptjs')

const registerController =  async (req, res) => {
  const { user, email, password } = req.body;
  const isUserExists = await userData.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = await bcrypt.hash(password,10)
  const data = await userData.create({
    user,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: data._id,
      email:data.email,
      user: data.user,
    },
    process.env.JWT_KEY,{expiresIn:'3h'}
  );
  res.cookie("token", token);
  res.status(201).json({ message: "User registered successfully", token });
}

const loginController = async (req, res) => {
  const { email, password ,user} = req.body;
  const data = await userData.findOne({$or:[ {email:email},{user:user} ]});
  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(password,data.password)
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      id: data._id,
      email: data.email,
      user:data.user
    },
    process.env.JWT_KEY,{expiresIn:'3h'}
  );
  res.cookie("token", token);
  res.status(201).json({ message: "Login successful", token });
}


module.exports = {registerController,loginController}
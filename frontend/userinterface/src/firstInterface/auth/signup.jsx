import React from "react";
import BackButton from "../components/BackButton";
import SignupThreeBackground from "../background/SignupThreeBackground";
import { motion } from "framer-motion";
import "../Container.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const signup = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const submitHandeler =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register",
        {user,email,password}
      )
      authLogin(response.data.token);  // saves to localStorage + updates context
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
    }
  };
  const previewChanger = (e) => {
    setShowPassword((prev) => !prev);
    e.preventDefault()
  };
  return (
    <div>
      <SignupThreeBackground />
      <BackButton />
      <form
        action=""
        onSubmit={submitHandeler}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="main-input">
          <input
            type="text"
            className="logIn-input"
            name="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="enter your user  "
          />
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
          />
          <div className="logIn-input flex justify-between">
            <input
              className=" text-center justify-center w-[43vw] outline-0"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
            ></input>
            <motion.button onClick={previewChanger} type="button" className=" text-3xl">
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </motion.button>
          </div>
        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "green" }}
          onSubmit={submitHandeler}
          type="submit"
        >
          SignUp
        </motion.button>
      </form>
    </div>
  );
};

export default signup;

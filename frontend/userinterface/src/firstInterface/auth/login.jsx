import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThreeBackground from "../background/ThreeBackground";
import { motion } from "framer-motion";
import "../Container.css";
import axios from "axios";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useAuth } from "../auth/hooks/useAuth";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const previewChanger = (e) => {
    setShowPassword((prev) => !prev);
    e.preventDefault();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser({ email, password });
    navigate("/dashboard");
    setEmail("");
    setPassword("");
  };
  
    return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <ThreeBackground />
      <form
        action=""
        onSubmit={submitHandler}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="main-input">
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your registered email"
          />
          <div className="logIn-input relative flex items-center justify-center">
            <input
              className="w-full h-full bg-transparent text-center outline-none text-white px-10"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <motion.button
              onClick={previewChanger}
              type="button"
              className="absolute right-3 text-2xl text-gray-300 hover:text-white flex items-center justify-center border-none bg-transparent cursor-pointer"
            >
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </motion.button>
          </div>
          <p className="auth-redirect-text">
            Haven't registered yet? <Link to="/signup">Register here</Link>
          </p>

        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "green" }}
          type="submit"
        >
          LogIn
        </motion.button>
      </form>
    </div>
  );
};

export default login;

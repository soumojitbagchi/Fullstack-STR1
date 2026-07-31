import React from "react";
import BackButton from "../components/BackButton";
import SignupThreeBackground from "../background/SignupThreeBackground";
import { motion } from "framer-motion";
import "../Container.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/hooks/useAuth";

const signup = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser({ user, email, password });
    navigate("/dashboard");
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
        onSubmit={submitHandler}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="main-input">
          <input
            type="text"
            className="logIn-input"
            name="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
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
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "green" }}
          onSubmit={submitHandler}
          type="submit"
        >
          SignUp
        </motion.button>
      </form>
    </div>
  );
};

export default signup;

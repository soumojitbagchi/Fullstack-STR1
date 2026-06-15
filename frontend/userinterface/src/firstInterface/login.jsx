import React from "react";
import { useState } from "react";
import ThreeBackground from "./components/ThreeBackground";
import { motion } from "framer-motion";
import "./Container.css";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandeler = (e) => {
    e.preventDefault();
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
        onSubmit={submitHandeler}
        style={{ position: "relative", zIndex: 1,}}
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
          <input
            type="password"
            className="logIn-input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{backgroundColor:'green'}}
          onSubmit={submitHandeler}
        >LogIn</motion.button>
      </form>
    </div>
  );
};

export default login;

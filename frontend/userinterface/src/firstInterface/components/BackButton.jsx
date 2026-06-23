import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import "../Container.css";
import { motion, scale } from "framer-motion";
import { NavLink } from "react-router-dom";

const BackButton = () => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
      <motion.div className="backbutton">
        <motion.button
          onHoverStart={() => {
            setisHovered(true);
          }}
          onHoverEnd={() => {
            setisHovered(false);
          }}
          className={`${isHovered ? "active" : ""}`}
          whileTap={{ scale: 0.9 }}
          animate={{}}
        >
          <FaArrowLeft />
          <h2>back</h2>
        </motion.button>
      </motion.div>
    </NavLink>
  );
};

export default BackButton;

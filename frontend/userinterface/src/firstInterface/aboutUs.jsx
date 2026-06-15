import React from "react";
import { motion } from "framer-motion";

const aboutUs = () => {
  return (
    <div>
      aboutUs
      <motion.button
        transition={{
          backgroundColor: ["white", "black"],
          color: ["black", "white"],
          duration: 3,
          repeat: Infinity,
        }}
        whileHover={{ scale: 0.95 ,
          backgroundColor: ["black"],
          color: ["white"],
        }}
      >
        hello
      </motion.button>
    </div>
  );
};

export default aboutUs;

import React from "react";
import { motion } from "framer-motion";
import "../Container.css";



const values = [
  {
    icon: "🎯",
    title: "Quality First",
    desc: "Every product is hand-picked and quality-checked before it reaches you.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Lightning-fast shipping so you get your favorites without the wait.",
  },
  {
    icon: "💎",
    title: "Best Prices",
    desc: "Competitive pricing without compromising on quality or experience.",
  },
  {
    icon: "🤝",
    title: "Customer Love",
    desc: "Your satisfaction is our top priority — always here to help.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const AboutUs = () => {
  return (
    <div className="bg-black min-h-screen text-white px-6 py-16 md:px-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          We're a passionate team building the future of online shopping.
          Founded with one simple goal — to make great products accessible to
          everyone, everywhere.
        </p>
      </motion.div>



      {/* Story Section with Images */}
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold mb-5">Our Story</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            What started as a small idea in 2020 has grown into a thriving
            e-commerce platform serving thousands of customers worldwide. We
            believe shopping should be simple, enjoyable, and rewarding.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Our team works tirelessly to curate the best products, offer
            unbeatable prices, and deliver an experience that keeps you coming
            back. Every decision we make starts with you — our customer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 flex flex-col gap-4"
        >
          <img
            src="https://images.unsplash.com/photo-1780445333334-31c3017e6e84?w=500&auto=format&fit=crop&q=60"
            alt="Team working together"
            className="rounded-2xl w-full h-48 object-cover border border-gray-800"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1673860367181-2f5d4e27add4?w=500&auto=format&fit=crop&q=60"
            alt="Our workspace"
            className="rounded-2xl w-full h-48 object-cover border border-gray-800"
          />
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-3xl mx-auto mb-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-6">What We Stand For</h2>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          {values.map((v) => (
            <span key={v.title} className="text-lg">
              {v.icon} {v.title}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;

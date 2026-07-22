import React, { useState } from "react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    title: "Email Us",
    detail: "support@shopwave.com",
    sub: "We reply within 24 hours",
  },
  {
    title: "Call Us",
    detail: "+91 (555) 123-4567",
    sub: "Mon–Fri, 9 AM – 6 PM",
  },
  {
    title: "Visit Us",
    detail: "Barasat, WB 700124",
    sub: "Walk-ins welcome",
  },
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5–7 business days. Express shipping is available at checkout for 2–3 day delivery.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy on all unused items in original packaging.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 50 countries. Shipping rates are calculated at checkout.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-16 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-gray-400 text-lg max-w-2xl m-5 mx-auto">
          Have a question or just want to say hello? We'd love to hear from you.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
        {contactInfo.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, borderColor: "rgba(217,169,78,0.5)" }}
            className="border border-gray-800 rounded-2xl p-8 text-center bg-gray-950 transition-colors"
          >
            <span className="text-4xl block mb-4">{item.icon}</span>
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-amber-400 font-medium">{item.detail}</p>
            <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl mx-auto mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center"
          >
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col  gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl pt-3 px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-amber-500 transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-amber-500 transition-colors resize-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-4 rounded-xl cursor-pointer transition-shadow hover:shadow-lg hover:shadow-amber-500/25"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="group border border-gray-800 rounded-xl bg-gray-950 overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-5 text-lg font-medium flex items-center justify-between list-none">
                {faq.q}
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
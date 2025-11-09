"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-center">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent_70%)]"></div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to <span className="text-white">Start Your Journey?</span>
        </h2>

        <p className="text-lg mb-10 text-gray-800">
          Take your first step into the world of <strong>VLSI excellence</strong>.
          Join our community and accelerate your learning today!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-gray-900 transition duration-300"
        >
          🚀 Join / Get Started
        </motion.button>

        <div className="mt-12 text-sm text-gray-900">
          <p className="flex justify-center items-center gap-2">
            <Mail className="w-4 h-4" /> contact@vlsidojo.com
          </p>
          <p className="mt-2 text-gray-800">© 2025 VLSI Dojo — All rights reserved.</p>
        </div>
      </motion.div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-black/10 rounded-full blur-3xl"></div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface CalloutProps {
  title: string;
  content: string;
}

const CalloutBox: React.FC<CalloutProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6">
      {/* Blinking Caution Circle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-12 h-12 bg-yellow-200 rounded-full text-2xl cursor-pointer shadow-md hover:shadow-lg border border-yellow-400 transition-colors"
      >
        ⚠️
      </motion.button>

      {/* Expanded Info Box */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow-md relative"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          <h4 className="font-semibold text-lg mb-2">{title}</h4>
          <p className="text-gray-700">{content}</p>
        </motion.div>
      )}
    </div>
  );
};

export default CalloutBox;

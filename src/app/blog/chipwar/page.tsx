"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LoginButtons from "@/components/LoginButtons"; // ✅ adjust path if needed
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* ✅ Top Navigation Bar (same as main site) */}
      <Navbar showBorder={false} />

      {/* Main Blog Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 relative mt-24">
        {/* Back to Blogs button */}
        <a
          href="/#blogs"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200 mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blogs
        </a>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-black tracking-tight">
          The Calculator War That Gave Us the Modern CPU
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          The Story of the Intel 4004
        </h2>

        {/* Image placeholder */}
        <motion.div
          className="w-full h-100 rounded-lg overflow-hidden mb-8 flex items-center justify-center border-4 border-gray-200 bg-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <img
            src="/images/intel.png"
            alt="The Intel 4004 microprocessor"
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/800x600/ddd/333?text=Intel+4004+Image+Unavailable";
            }}
          />
        </motion.div>

        <p className="mb-4 leading-relaxed text-gray-700">
          The origin of the microprocessor isn't a clean, linear path. It's a messy story of business competition and technical genius. In the late 1960s, the digital world was a cluttered mess. If a company wanted to create an electronic calculator, a new computer, or really any digital device, they had to design a unique set of custom-made circuits for that specific product. This was the landscape of <strong>Very Large Scale Integration (VLSI)</strong> at the time, where complexity was built from the ground up, one custom circuit at a time.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Busicom's Big Order
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          The story begins with **Busicom**, a Japanese calculator company that approached a fledgling American semiconductor firm called **Intel** in 1969. Busicom had a big order for a new line of high-performance desktop calculators. Their request? A set of twelve specialized chips, each one custom-built to perform a specific function for their calculator.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          The Intel Team's Better Idea
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          This was a major opportunity for Intel, but one of its engineers, **Marcian "Ted" Hoff**, saw a fundamental problem with the request. Intel was a small company, and designing and manufacturing so many custom chips for just one client would be a massive undertaking. It went against the company's core mission of creating standardized, universal products.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          Rather than building a new set of chips for every new calculator, what if they could build **one universal chip** that could be programmed to do different things? Hoff, along with his team, including **Federico Faggin** and **Stanley Mazor**, proposed an audacious solution: a single, programmable "brain" chip. This concept of **programmable logic** was the birth of the **microprocessor**.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          The Birth of the Intel 4004
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          After a period of intense development, the team created the **Intel 4004**, the world's first commercially available microprocessor, in 1971. This tiny chip, barely larger than a fingernail, contained 2,300 transistors and had the processing power of the ENIAC, a room-sized computer from 1946.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          Busicom eventually agreed to relinquish its exclusive rights to the chip in exchange for a lower price, and Intel was free to market the 4004 to a wider audience. The impact was nothing short of revolutionary. The 4004 shifted the entire semiconductor industry. The VLSI landscape went from creating vast, static circuits to designing smaller, more powerful, and most importantly, **programmable** ones. The true genius of the microprocessor was the power of **abstraction**—using a single, complex chip instead of many simpler ones.
        </p>

        <p className="mb-4 leading-relaxed text-gray-700">
          The little calculator war between Busicom and Intel didn't just give us the first microprocessor—it laid the foundation for every computer, smartphone, and smart device we use today. It showed that the future of technology wasn't in building bigger, more specialized machines, but in creating a single, versatile brain that could adapt to any task.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2024 VLSI Dojo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

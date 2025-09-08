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
          The Chip That Said 'Hello World'
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          The Story of the First Integrated Circuit
        </h2>

        {/* Image placeholder */}
        <motion.div
          className="w-full h-80 rounded-lg overflow-hidden mb-8 flex items-center justify-center border-4 border-gray-200 bg-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <img
            src="/images/ic.png"
            alt="The First Integrated Circuit"
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/800x600/ddd/333?text=IC+Image+Unavailable";
            }}
          />
        </motion.div>

        <p className="mb-4 leading-relaxed text-gray-700">
          We all know the names <strong>Jack Kilby</strong> and{" "}
          <strong>Robert Noyce</strong>, the giants of the semiconductor world.
          They're credited with inventing the integrated circuit (IC), the tiny
          brain of every modern gadget. But the story of how that first chip
          came to be is a fascinating tale of a forced summer of isolation, a
          little bit of luck, and a whole lot of genius. It's a story that laid
          the foundation for the complex world of Very-Large-Scale Integration
          (VLSI) that we know today.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          A Summer of No-Vacation
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          The year was 1958. Jack Kilby, a new engineer at Texas Instruments
          (TI), had a problem—his boss had a strict "no-vacation" policy. While
          his colleagues enjoyed their summer breaks, Kilby was left alone in
          the lab. This isolation, however, turned out to be a blessing in
          disguise. With time and space to think, he started to ponder a
          fundamental problem in electronics: the "tyranny of numbers." As
          circuits became more complex, they required more and more discrete
          components—transistors, resistors, capacitors—all of which had to be
          individually wired together. This was not only time-consuming and
          expensive but also made circuits unreliable and prone to failure.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          The Eureka Moment: From Separate Parts to a Single Whole
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Kilby's breakthrough was elegantly simple yet profoundly
          revolutionary. He realized that since all circuit components could be
          made from the same semiconductor material—silicon or, in his case,{" "}
          <strong>germanium</strong>—why not fabricate them all on a single
          piece of that material? This would eliminate the need for individual
          wiring, miniaturize the circuit, and make it more reliable. It was a
          radical idea that went against the conventional wisdom of the time.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          On September 12, 1958, Kilby demonstrated his creation: a small piece
          of germanium with a transistor and resistor integrated on it. He
          showed his boss that the circuit, a simple phase-shift oscillator,
          worked perfectly. This wasn't just a miniaturized circuit; it was the
          world's first integrated circuit. While Kilby's design was rudimentary,
          it proved the concept was viable. It was a monumental leap from
          assembling discrete components to creating a complete functional
          circuit on a single chip.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          From Kilby's Crude Chip to Modern VLSI
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Kilby's initial IC was a crude, handmade device. The components were
          wired together with tiny gold wires, and the design was a far cry from
          the photolithography and etching processes used today. Yet, this
          simple chip was the first step on a journey that would lead to VLSI.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          The technical limitations of the time were immense. Kilby's invention
          was made of germanium and had only a few components. Modern VLSI
          chips, by contrast, are made from silicon and contain billions of
          transistors. The evolution from Kilby's chip to today's processors is
          a story of continuous innovation in materials science, manufacturing
          techniques, and design methodologies. The principles Kilby
          pioneered—integration, miniaturization, and mass production—are the
          same ones that make today's powerful microchips possible.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          So, the next time you use your smartphone, laptop, or any other
          electronic device, remember the story of Jack Kilby and his solitary
          summer in the lab. His ingenuity, sparked by a strict vacation policy,
          laid the groundwork for the digital age, proving that sometimes, the
          most significant breakthroughs happen when you're forced to work a
          little bit of magic on your own.
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

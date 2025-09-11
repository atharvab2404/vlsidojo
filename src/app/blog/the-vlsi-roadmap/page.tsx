"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* ✅ Top Navigation Bar */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </a>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-black tracking-tight">
          The Chip That Said 'Hello World'
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          The Story of the First Integrated Circuit
        </h2>

        {/* Hero Image */}
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
              target.src = "https://placehold.co/800x600/ddd/333?text=IC+Image+Unavailable";
            }}
          />
        </motion.div>

        {/* Quote Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded shadow">
          <p className="italic text-gray-800">
            “The only thing new in the world is the history you don’t know.” – Jack Kilby
          </p>
        </div>

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
          individually wired together.
        </p>

        {/* Vintage Image */}
        <motion.img
          src="/images/kilby-lab.png"
          alt="Jack Kilby in Texas Instruments Lab"
          className="w-full rounded-lg shadow-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onError={(e: any) => {
            e.target.src = "https://placehold.co/800x500/ddd/333?text=TI+Lab+1958";
          }}
        />

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          The Eureka Moment: From Separate Parts to a Single Whole
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Kilby's breakthrough was elegantly simple yet profoundly revolutionary.
          He realized that since all circuit components could be made from the
          same semiconductor material—silicon or, in his case,{" "}
          <strong>germanium</strong>—why not fabricate them all on a single
          piece of that material? This would eliminate the need for individual
          wiring, miniaturize the circuit, and make it more reliable.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          On September 12, 1958, Kilby demonstrated his creation: a small piece
          of germanium with a transistor and resistor integrated on it. He
          showed his boss that the circuit, a simple phase-shift oscillator,
          worked perfectly. This wasn't just a miniaturized circuit; it was the
          world's first integrated circuit.
        </p>

        {/* Fun Fact Box */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
          <p className="font-semibold">💡 Did You Know?</p>
          <p className="text-sm">
            Jack Kilby won the <strong>2000 Nobel Prize in Physics</strong> for
            his invention of the IC—over 40 years after his summer project at TI!
          </p>
        </div>

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
          Modern VLSI chips contain billions of transistors. The principles
          Kilby pioneered—integration, miniaturization, and mass production—are
          the same ones that power our smartphones, laptops, and data centers
          today.
        </p>

        {/* Timeline Section */}
        <div className="bg-gray-50 rounded-lg shadow p-6 mt-10 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            📜 Timeline of the Integrated Circuit
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>1958 – Jack Kilby demonstrates first working IC at TI</li>
            <li>1959 – Robert Noyce (Fairchild) patents the planar IC</li>
            <li>1961 – First commercial ICs released</li>
            <li>1970s – ICs enable microprocessors & memory chips</li>
            <li>1980s → Today – Rise of VLSI with billions of transistors</li>
          </ul>
        </div>

        {/* Closing Legacy Section */}
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mt-10">
          <h3 className="text-xl font-bold text-green-800 mb-2">🌍 Legacy</h3>
          <p className="text-gray-700">
            From a lonely summer experiment to the foundation of the digital
            world, Kilby’s chip was the spark that lit the fire of modern
            computing. Every device you touch today traces its roots back to
            that little piece of germanium in 1958.
          </p>
        </div>
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

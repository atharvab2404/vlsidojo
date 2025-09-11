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
          From Concept to Silicon: The Intricate Journey of Making a Microchip
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          A Detailed Look at the Chip Design and Manufacturing Process
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
            src="/images/chip-flow.png" // Placeholder image for a chip design flow
            alt="An illustration of the chip design and manufacturing flow"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/800x600/ddd/333?text=Chip+Manufacturing+Flow+Image";
            }}
          />
        </motion.div>

        <p className="mb-4 leading-relaxed text-gray-700">
          Ever marveled at the tiny processor inside your smartphone or laptop? It's a miniature city of billions of transistors, but its creation is an immense, multi-stage process that begins long before a single piece of silicon is touched. The journey of a microchip is a fascinating blend of brilliant engineering, complex software, and precision manufacturing.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 1: The Blueprint (Design & Verification)
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          The process starts with a blank slate. Architects first decide the chip's core purpose and capabilities. This is the **Architectural Design** phase, where they plan things like the number of processing cores, cache memory, and overall performance goals. Once the high-level plan is set, engineers write the chip's logical blueprint in a language called **RTL (Register-Transfer Level)**. This code describes the chip's digital logic and how data will flow. This is also where **verification** happens—a crucial step where the design is rigorously tested with simulations to find and fix bugs before any physical work begins.
        </p>
        
        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 2: The Physical Transformation
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          With the logical design complete, it's time to create a physical layout. This is where the magic of **Logic Synthesis** begins. Software translates the RTL code into a netlist—a list of standard digital logic gates and their connections. Next, in the **Physical Design** phase, these gates are arranged on a virtual silicon die. This involves a series of complex steps:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li><strong>Floorplanning:</strong> Deciding the overall layout of major functional blocks.</li>
          <li><strong>Placement:</strong> Arranging the logic gates onto the die.</li>
          <li><strong>Routing:</strong> Connecting all the gates with intricate, multi-layered metal wires.</li>
          <li><strong>Design Rule Check (DRC):</strong> Final checks to ensure the layout follows all manufacturing rules.</li>
        </ul>
        <p className="mb-4 leading-relaxed text-gray-700">
          The output of this entire phase is a set of **GDSII files**, the definitive blueprints for fabrication.
        </p>

        {/* ✅ Fun Fact Box */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
          <p className="font-semibold">💡 Did You Know?</p>
          <p className="text-sm">
            Modern high-end chips can have over 100 billion transistors, and the entire physical design process is handled by highly specialized software that can take weeks to complete on a supercomputer.
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 3: The Fabrication (Fab)
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          This is where the physical creation of the chip occurs in a highly controlled **cleanroom** environment. The blueprints (GDSII files) are used to create **photomasks**, which are like stencils. A pure **silicon wafer** is the canvas, and a process called **photolithography** uses the masks to expose a pattern onto the wafer with UV light. 
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          This step is repeated layer by layer, with **etching** to remove material, **doping** to change the electrical properties of the silicon (creating transistors), and **deposition** to add new layers of material. This incredible process builds the chip from the ground up, one microscopic layer at a time.
        </p>

        {/* ✅ Timeline Highlights */}
        <div className="bg-gray-50 rounded-lg shadow p-6 mt-10 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Key Steps in the Chipmaking Flow 🚀
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Architectural Design:</strong> Defining the chip's purpose.</li>
            <li><strong>RTL Design:</strong> Writing the logical blueprint.</li>
            <li><strong>Logic Synthesis & Layout:</strong> Creating the physical floorplan.</li>
            <li><strong>Mask Creation:</strong> Making the stencils for fabrication.</li>
            <li><strong>Wafer Fabrication:</strong> Building the chip on a silicon wafer in a cleanroom.</li>
            <li><strong>Testing & Packaging:</strong> Cutting, packaging, and final testing of the finished product.</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 4: The Final Product
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          After fabrication, the wafer is tested to find and discard any faulty chips. The good ones, now called "dies," are separated and prepared for their final form. Each die is attached to a substrate, and fine wires are bonded to connect it to the package's pins.  The die is then sealed in a protective plastic or ceramic casing. The final, packaged chips undergo one last round of comprehensive testing before they are ready to be shipped and integrated into the devices we use every day.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mt-10">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            🌍 The Scale of Innovation
          </h3>
          <p className="text-gray-700">
            From an abstract idea to a complex physical object, the journey of a chip is a testament to human ingenuity. It's a process that has transformed the world and continues to push the boundaries of what is possible, enabling technologies that were once confined to the realm of science fiction.
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

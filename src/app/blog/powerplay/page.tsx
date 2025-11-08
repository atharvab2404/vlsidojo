"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { BlockMath } from 'react-katex';
// import Navbar from "@/components/Navbar"; // ✅ Adjust path if needed
// import Link from "next/link"; // If you need internal links

// Mock components for compilation without your specific project setup
const Navbar = ({ showBorder }: { showBorder: boolean }) => (
  <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
    <div className="max-w-7xl mx-auto font-bold text-lg text-blue-600">
      VLSI Power Strategies
    </div>
  </header>
);

export default function PowerGatingClockGatingBlog() {
  const tableData = [
    {
      feature: "Primary Target",
      clockGating: "Dynamic Power ($\\alpha$)",
      powerGating: "Static ($I_{leak}$) & Dynamic Power",
      color: "bg-blue-50 text-blue-800",
    },
    {
      feature: "Mechanism",
      clockGating: "Stops the clock signal",
      powerGating: "Cuts the power supply ($V_{DD}$ or GND)",
      color: "bg-white",
    },
    {
      feature: "Power Savings",
      clockGating: "Moderate (based on switching activity)",
      powerGating: "High (Near-zero power)",
      color: "bg-blue-50 text-blue-800",
    },
    {
      feature: "Wake-up Time",
      clockGating: "Instantaneous",
      powerGating: "Slow (Requires power-up sequence and state restore)",
      color: "bg-white",
    },
    {
      feature: "Overhead",
      clockGating: "Low (Integrated Clock Gating - ICG cells)",
      powerGating: "High (Power Switches, Isolation, Retention logic)",
      color: "bg-blue-50 text-blue-800",
    },
    {
      feature: "Typical Use Case",
      clockGating:
        "Blocks with short, frequent idle periods (e.g., small arithmetic units)",
      powerGating:
        "Blocks with long, sustained idle periods (e.g., communication modems, large peripherals)",
      color: "bg-white",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Top Navigation Bar */}
      <Navbar showBorder={false} />

      {/* Main Blog Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 relative mt-24">
        {/* Back to Blogs button */}
        <a
          href="/#blogs"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 mb-8"
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
          Back to Low Power Design
        </a>

        {/* Title Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-black tracking-tight">
          VLSI Power Dual: Clock Gating vs. Power Gating
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          The Two Essential Tactics for Energy-Efficient Chip Design 🔋
        </h2>

        {/* Image placeholder with Framer Motion animation */}
        <motion.div
          className="w-full h-80 rounded-xl overflow-hidden mb-10 flex items-center justify-center shadow-xl border-4 border-blue-100 bg-blue-50"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Placeholder for an image illustrating power domains */}
          <img
            src="/images/power-gating-clock-gating-diagram.png"
            alt="Conceptual diagram showing a chip block with clock and power gating mechanisms"
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/800x320/e0f2fe/1e40af?text=VLSI+Power+Gating+Diagram";
            }}
          />
        </motion.div>

        <p className="mb-8 leading-relaxed text-lg text-gray-700">
          **Power management** is a survival necessity for modern VLSI, especially for devices where battery life is king. Engineers must fight two "power enemies": **Dynamic Power** (when the chip is working) and **Static Power** (when it's seemingly idle). Our two main weapons against this consumption are **Clock Gating** and **Power Gating**.
        </p>

        {/* --- Section 1: Understanding the Power Enemies --- */}
        <h3 className="text-3xl font-bold mt-10 mb-4 border-b-2 border-blue-400 pb-2 text-black">
          1. Understanding the Power Enemies ⚡️
        </h3>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          {/* Dynamic Power Card - FIX APPLIED HERE */}
          <div className="p-5 border border-red-200 bg-red-50 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-red-700 mb-3">
              Dynamic Power ({'$'}P_{dyn}{'$'})
            </h4>
            <p className="text-gray-700 mb-2">
              This is the energy consumed when transistors actively **switch** their state (charge/discharge the load).
            </p>
            <p className="font-mono text-sm bg-red-100 p-2 rounded">
              $$P_{dyn} \propto \alpha \cdot C \cdot V^2 \cdot f$$
            </p>
            <p className="text-sm mt-3 italic text-red-600">
              **The $V^2$ factor** makes supply voltage ($V$) the most critical target for reduction.
            </p>
          </div>

          {/* Static Power Card - FIX APPLIED HERE */}
          <div className="p-5 border border-green-200 bg-green-50 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-green-700 mb-3">
              Static Power (<InlineMath math="P_{static}" />)
            </h4>
            <p className="text-gray-700 mb-2">
              This is the power consumed due to **leakage current** flowing through an "off" transistor.
            </p>
            <p className="font-mono text-sm bg-green-100 p-2 rounded">
              <BlockMath math="P_{static} = V \cdot I_{leak}" />
            </p>
            <p className="text-sm mt-3 italic text-green-600">
              This problem **gets worse exponentially** as feature sizes shrink (sub-nanometer nodes).
            </p>
          </div>
        </div>

        {/* --- Section 2: Clock Gating --- */}
        <h3 className="text-3xl font-bold mt-10 mb-4 border-b-2 border-blue-400 pb-2 text-black">
          2. Tactic 1: Clock Gating (The Dynamic Saver) ⏱️
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          **Clock Gating** targets **Dynamic Power** by reducing the **Activity Factor ($\\alpha$)** of idle circuits. Think of it as putting an unused factory floor on pause—the workers (transistors) stop moving.
        </p>

        <h4 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
          The Mechanism
        </h4>
        <p className="mb-4 leading-relaxed text-gray-700">
          Instead of letting the clock reach every flip-flop, a special logic gate is inserted to **conditionally stop the clock**. If a block isn't needed in the current cycle, its clock is halted, preventing all switching activity within that block.
        </p>

        {/* Fun Fact Box about ICG */}
        <motion.div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="font-semibold flex items-center">
            <span className="text-2xl mr-2">💡</span> The Glitch Guard: ICG Cells
          </p>
          <p className="text-sm">
            Simple logic gates (like an AND gate) can create clock **glitches**—spurious, narrow pulses—which cause functional failures. To prevent this, designers use an **Integrated Clock Gating (ICG) cell**. This specialized cell uses a **latch** to ensure the clock is only enabled or disabled when the clock itself is safely low, guaranteeing a clean, glitch-free clock transition.
          </p>
        </motion.div>

        <p className="mb-4 leading-relaxed text-gray-700">
          **Trade-offs:**
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
            <li>**Pros:** Highly effective for dynamic power; fast, **instantaneous wake-up time**.</li>
            <li>**Cons:** Does NOT eliminate static (leakage) power; introduces a small, manageable delay in the clock path.</li>
          </ul>
        </p>

        {/* --- Section 3: Power Gating --- */}
        <h3 className="text-3xl font-bold mt-10 mb-4 border-b-2 border-blue-400 pb-2 text-black">
          3. Tactic 2: Power Gating (The Total Shut-Down) 🔌
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          **Power Gating** is the heavy artillery. It aims to eliminate **both Dynamic and Static Power** by completely isolating a block from the main power grid. This is like pulling the plug on the factory—zero power consumption.
        </p>

        <h4 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
          The Mechanism & Supporting Logic
        </h4>
        <p className="mb-4 leading-relaxed text-gray-700">
          A large transistor, called a **Power Switch**, is inserted between the main power rail and the circuit block (the "power island").
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6 bg-gray-50 p-4 rounded-lg">
          <li>
            **Header Switch (PMOS):** Placed on the $V_{DD}$ path.
          </li>
          <li>
            **Footer Switch (NMOS):** Placed on the Ground ($GND$) path.
          </li>
          <li>
            **Isolation Cells:** Mandatory buffers that clamp the powered-down block's outputs to a known $0$ or $1$ to prevent floating voltages from corrupting active blocks.
          </li>
          <li>
            **Retention Registers:** Special flip-flops that hold critical state data on a small, separate, always-on power supply ($V_{keep}$) while the main block is off.
          </li>
        </ul>

        <p className="mb-4 leading-relaxed text-gray-700">
          **Trade-offs:**
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
            <li>**Pros:** Achieves the **deepest power savings** (near-zero).</li>
            <li>**Cons:** **Significant area overhead** (large switches, boundary logic); **slow wake-up time** due to power rail stabilization and data restore; requires complex control from a **Power Management Unit (PMU)**.</li>
          </ul>
        </p>

        {/* --- Section 4: Comparison Table --- */}
        <h3 className="text-3xl font-bold mt-10 mb-4 border-b-2 border-blue-400 pb-2 text-black">
          4. Head-to-Head: Clock Gating vs. Power Gating
        </h3>

        <motion.div
          className="overflow-x-auto shadow-2xl rounded-lg my-8"
          initial={{ scaleY: 0.8, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Clock Gating
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Power Gating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr
                  key={row.feature}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.clockGating}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.powerGating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* --- Final Summary --- */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mt-10">
          <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
            🎯 Conclusion: A Unified Strategy
          </h3>
          <p className="text-gray-700">
            In modern **System-on-Chips (SoCs)**, designers don't choose one over the other; they employ a **hybrid approach**. Clock Gating handles blocks with frequent, short idle periods (like a CPU's arithmetic unit), providing quick energy savings. Power Gating is reserved for massive blocks that stay off for long, sustained periods (like a Wi-Fi modem or camera peripheral), achieving the deepest sleep state. This dynamic optimization is orchestrated by a centralized **Power Management Unit (PMU)**, ensuring peak efficiency for every workload.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2024 VLSI Design Insights. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
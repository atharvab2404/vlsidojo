// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import LoginButtons from "@/components/LoginButtons"; // ✅ adjust path if needed
// import { useCartStore } from "@/store/cartStore";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";

// export default function BlogPage() {
//   return (
//     <div className="bg-white min-h-screen font-sans text-gray-800">
//       {/* ✅ Top Navigation Bar (same as main site) */}
//       <Navbar showBorder={false} />

//       {/* Main Blog Content */}
//       <main className="max-w-4xl mx-auto py-12 px-4 relative mt-24">
//         {/* Back to Blogs button */}
//         <a
//           href="/#blogs"
//           className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200 mb-8"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-1"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           Back to Blogs
//         </a>

//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-black tracking-tight">
//           From Idea to Silicon: The Journey of an ASIC Chip
//         </h1>
//         <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
//           Understanding the ASIC Design Flow
//         </h2>

//         {/* Image placeholder for the main blog topic */}
//         <motion.div
//           className="w-full h-80 rounded-lg overflow-hidden mb-8 flex items-center justify-center border-4 border-gray-200 bg-gray-100"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.5 }}
//           whileHover={{ scale: 1.05, rotate: 1 }}
//         >
//           <img
//             src="/images/asic-design-flow.png"
//             alt="An illustration of the ASIC design flow from concept to physical chip"
//             className="w-full h-full object-cover"
//             onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//               const target = e.target as HTMLImageElement;
//               target.onerror = null;
//               target.src =
//                 "https://placehold.co/800x600/ddd/333?text=ASIC+Design+Flow";
//             }}
//           />
//         </motion.div>

//         <p className="mb-4 leading-relaxed text-gray-700">
//           Have you ever wondered what it takes to create a chip for your phone or computer? It's a complex, multi-stage process known as the <strong>ASIC (Application-Specific Integrated Circuit) Design Flow</strong>. It’s like building a high-tech city, starting with a blueprint and ending with a bustling metropolis on a tiny piece of silicon. This journey is broken down into two main phases: <strong>Front-End Design (the brain)</strong> and <strong>Back-End Design (the body)</strong>.
//         </p>

//         {/* Phase 1: Front-End Design */}
//         <h2 className="text-3xl font-bold mt-12 mb-4 border-b-2 border-gray-300 pb-2 text-black">
//           Phase 1: The Front-End (Logical Design) 🧠
//         </h2>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           This is where your idea takes shape. Think of this phase as creating the architectural plans for your silicon city.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           1. The Blueprint: Architecture and Specification
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           Every great project starts with a plan. In this stage, we define what the chip must do: its speed, power consumption, and all its functions. System architects create a high-level diagram showing the main blocks of the chip (like a processor core, memory, or communication interfaces) and how they will interact. This is the master plan that guides the entire design.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           2. The Language of Silicon: RTL Design
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           With the blueprint in hand, designers write the chip's "source code" using a Hardware Description Language (HDL) like Verilog or VHDL. This code describes the chip's behavior at the <strong>Register Transfer Level (RTL)</strong>. It doesn’t specify every wire and gate; it describes the data flow between storage elements (registers) and the logical operations performed on that data. It's like writing a detailed instruction manual for a robot.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           3. Catching Bugs: Functional Verification
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           This is the longest and most critical step. Verification engineers use a sophisticated "testbench" to simulate every possible scenario and ensure the RTL code works exactly as intended. They are detectives hunting for bugs before the chip is even built. Finding a bug here is cheap; finding one after the chip is manufactured can cost millions of dollars. This stage often consumes over 70% of the total design time.
//         </p>

//         {/* Phase 2: Back-End Design */}
//         <h2 className="text-3xl font-bold mt-12 mb-4 border-b-2 border-gray-300 pb-2 text-black">
//           Phase 2: The Back-End (Physical Design) 🏗️
//         </h2>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           Once the design is logically sound, it's time to build it. This phase takes the abstract logical design and turns it into a physical layout ready for manufacturing.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           4. From Code to Gates: Logic Synthesis
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           This is the magical bridge between the two phases. A synthesis tool takes the RTL code and translates it into a <strong>gate-level netlist</strong>—a massive list of basic logic gates (like AND, OR, and XOR gates) and their connections. This is the first time the design begins to look like a physical circuit.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           5. Building the City: Floorplanning & Placement
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           Before placing anything, we must decide where things go. <strong>Floorplanning</strong> is like zoning a city: we define the overall die size, place major blocks like memory and I/O pads, and plan for power and ground lines. Then, in the <strong>Placement</strong> step, the gates from the netlist are arranged on the chip. The goal is to place them close to each other to minimize the wire length needed to connect them, which is crucial for speed.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           6. The Heartbeat: Clock Tree Synthesis (CTS)
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           Every digital chip has a heartbeat—the clock signal. It synchronizes all the operations. <strong>CTS</strong> is a specialized step that builds a carefully balanced network of buffers to distribute the clock signal to every single gate at exactly the same time. If the clock signal arrives even slightly late at one gate compared to another (clock skew), the whole chip can fail.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           7. Connecting Everything: Routing
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           With the gates placed, the <strong>Routing</strong> tool draws the actual "streets" and "highways" (metal wires) that connect all the gates according to the netlist. This is a complex routing puzzle that must follow strict manufacturing rules to avoid short circuits and other electrical problems.
//         </p>

//         <h3 className="text-2xl font-bold mt-8 mb-4 text-black">
//           8. Final Checks: Physical Verification
//         </h3>
//         <p className="mb-4 leading-relaxed text-gray-700">
//           Just before sending the design to a manufacturing facility (a "fab"), engineers run a battery of final checks. <strong>Design Rule Check (DRC)</strong> verifies that the layout follows all the foundry's rules for wire spacing, size, etc. <strong>Layout Versus Schematic (LVS)</strong> confirms that the physical layout perfectly matches the original gate-level netlist. Once all checks pass, the design is "taped out"—sent to the foundry for fabrication.
//         </p>

//         <p className="mb-4 leading-relaxed text-gray-700">
//           This entire process, from a simple idea to a finished, functional chip, is a testament to the incredible collaboration, precision, and innovation that defines the world of VLSI.
//         </p>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
//           © 2024 VLSI Dojo. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
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
          From Concept to Silicon: The Epic Journey of a Microchip
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-600">
          How a simple idea becomes billions of transistors dancing in harmony
        </h2>

        {/* Image placeholder */}
        <motion.div
          className="w-full h-96 rounded-lg overflow-hidden mb-8 flex items-center justify-center border-4 border-gray-200 bg-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <img
            src="/images/chip-flow.png"
            alt="Illustration of the chip design and manufacturing flow"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/800x600/ddd/333?text=Chip+Flow+Image";
            }}
          />
        </motion.div>

        <p className="mb-4 leading-relaxed text-gray-700">
          Think of a microchip as a **miniature city**—streets, skyscrapers,
          power lines, and traffic lights, all running on a wafer the size of
          your fingernail. Now imagine designing that city from scratch,
          ensuring that not a single "traffic jam" (bug) breaks the flow. That’s
          the journey of a chip: part science, part art, and part pure wizardry.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 1: Drawing the Blueprint 📝
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          The story begins with **architects of silicon**. They decide what the
          chip should do: crunch numbers, process images, or maybe power an AI.
          Once the big picture is ready, engineers write its DNA in **RTL
          (Register-Transfer Level)** code. Think of it as the script for a
          blockbuster movie—every actor (logic block) knows their role.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          Before shooting begins, though, the script is tested endlessly in
          **simulations**. This stage is like rehearsals—fix the flaws here,
          because mistakes later could cost millions in silicon.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 2: From Code to Concrete 🏗️
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Once the logic is solid, it’s time to **build the city on silicon**.
          Software translates RTL into a **netlist** (a giant shopping list of
          gates). Then begins the magic of **Physical Design**:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>
            <strong>Floorplanning:</strong> Where the "downtown" (CPU) and
            "suburbs" (memory, I/O) will sit.
          </li>
          <li>
            <strong>Placement:</strong> Dropping billions of transistors onto
            the die, like assigning every house in a mega-city.
          </li>
          <li>
            <strong>Routing:</strong> Drawing microscopic highways so data can
            zoom around without collisions.
          </li>
          <li>
            <strong>DRC Checks:</strong> The final city inspection before
            construction begins.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed text-gray-700">
          The final product of this phase is the legendary **GDSII file**—the
          holy grail blueprint that fabs will use to carve reality.
        </p>

        {/* Fun Fact */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
          <p className="font-semibold">💡 Did You Know?</p>
          <p className="text-sm">
            If you zoomed into a modern chip, its wires are thinner than a
            strand of DNA. The city metaphor isn’t far off—except this city fits
            inside your pocket.
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 3: Into the Fab 🚪
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Now the designs leave the digital world and step into the cleanroom,
          where humans wear bunny suits and robots rule. Using **photolithography**,
          lasers print your blueprint layer by layer on a **silicon wafer**.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          It’s like making a cosmic **layer cake**: deposit chocolate (metal),
          etch out the frosting (oxide), sprinkle some magic dust (doping), and
          repeat—hundreds of times—until you’ve baked billions of transistors
          into existence.
        </p>

        <div className="bg-gray-50 rounded-lg shadow p-6 mt-10 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Quick Journey Recap 🚀
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>🎯 Decide what the chip should do (Architecture)</li>
            <li>🖋️ Write its DNA (RTL)</li>
            <li>🏙️ Build the city map (Physical Design)</li>
            <li>🔦 Print it with lasers (Fabrication)</li>
            <li>📦 Wrap & ship (Packaging)</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2 text-black">
          Phase 4: Birth of a Chip 🎉
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          After fabrication, wafers are tested, and only the healthiest "babies"
          survive. These tiny dies are packaged—wired, sealed, and dressed up in
          black ceramic suits. Finally, the chip is ready to conquer the world,
          whether in a smartphone, spacecraft, or your toaster.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mt-10">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            🌍 Why It Matters
          </h3>
          <p className="text-gray-700">
            Every app you swipe, every AI model that thinks, every rocket that
            launches—runs on the shoulders of this invisible silicon journey.
            Chips aren’t just electronics, they’re the **engines of modern
            civilization**.
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

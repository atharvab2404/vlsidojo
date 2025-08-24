// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";
// import MCQBlock from "./MCQBlock";

// export default function Module2({ readModules, handleCheckboxChange, setModule }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       {/* Execution / Core */}
//       <section className="space-y-4 mb-10">
//         <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
//           Execution (The Core)
//         </h2>
//         <p className="leading-7 inter-body">
//           Our goal is to build a conceptual 4-bit ALU: it takes two 4-bit inputs
//           and an opcode, and produces a 4-bit result with status flags.
//         </p>

//         <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
//           1. The ALU&apos;s Interface and Operations
//         </h3>
//         <p className="leading-7 inter-body">Operations covered:</p>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>
//             <span className="inter-subheading">Addition (A + B):</span>{" "}
//             <span className="inter-body">Standard binary addition.</span>
//           </li>
//           <li>
//             <span className="inter-subheading">Subtraction (A - B):</span>{" "}
//             <button
//               onClick={() => setOpen(true)}
//               className="cursor-pointer inline-block px-2 py-0.5 rounded-xl bg-gray-100 border border-gray-300 shadow-sm hover:bg-gray-200 transition"
//             >
//               Two’s-complement <span className="ml-1">💡</span>
//             </button>{" "}
//             via A + (~B) + 1.
//           </li>
//           <li>
//             <span className="inter-subheading">AND (A &amp; B)</span>
//           </li>
//           <li>
//             <span className="inter-subheading">OR (A | B)</span>
//           </li>
//           <li>
//             <span className="inter-subheading">XOR (A ^ B)</span>
//           </li>
//         </ul>

//         {/* Popup */}
//         {open && (
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
//             <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full relative flex items-start gap-6">
//               {/* Close button */}
//               <button
//                 onClick={() => setOpen(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//               >
//                 <X size={20} />
//               </button>

//               {/* Mascot Image */}
//               <div className="w-28 h-28 flex-shrink-0">
//                 <img
//                   src="/images/explain.png"
//                   alt="Website Mascot"
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Text Content */}
//               <div className="flex-1">
//                 <h4 className="text-lg inter-subheading mb-2">
//                   LLAMA explains…
//                 </h4>
//                 <p className="text-gray-700">
//                   Two’s-complement is a mathematical operation on binary
//                   numbers, widely used to represent signed integers. It allows
//                   binary addition and subtraction to be performed uniformly
//                   without special handling of negative numbers.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
//           2. Conceptual Design Strategy
//         </h3>
//         <p className="leading-7 inter-body">
//           Build separate functional blocks (Adder/Subtractor, AND, OR, XOR) and
//           use a multiplexer (controlled by
//           <span className="inter-body"> opcode</span>) to select which block’s
//           output drives the result.
//         </p>

//         {/* === Pseudo-code Practice Section === */}
//         <div className="pseudo-code">
//           <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
//             {/* Fake terminal header */}
//             <div className="flex items-center space-x-2 mb-3">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
//                 Terminal
//               </span>
//             </div>

//             {/* Title */}
//             <h4 className="text-lg inter-subheading text-green-400 mb-2">
//               ✍️ Pseudo-code Practice
//             </h4>
//             <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
//               Write down the expected behavior in simple pseudo-code before
//               looking at the solution.
//             </p>

//             {/* User Notepad */}
//             <textarea
//               className="w-full h-40 p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body"
//               placeholder="Write your pseudo-code here..."
//             />

//             {/* Collapsible Solution */}
//             <details className="mt-4">
//               <summary className="cursor-pointer text-green-400 font-medium hover:underline">
//                 💡 Show Solution
//               </summary>
//               <pre className="mt-2 p-4 bg-black text-green-300 rounded-lg text-sm overflow-x-auto border border-green-600 shadow-inner fira-code-body">
// {`if opcode == 00:
//     result = A + B
// elif opcode == 01:
//     result = A - B
// elif opcode == 10:
//     result = A & B
// elif opcode == 11:
//     result = A | B`}
//               </pre>
//             </details>
//           </div>
//         </div>
//         {/* === End of Pseudo-code Section === */}

//         <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
//           A. Arithmetic Unit (Add/Subtract Logic)
//         </h4>
//         <p className="leading-7 inter-body">
//           Addition uses four chained 1-bit full adders. Subtraction reuses the
//           adder by inverting B and setting Cin=1 (two’s-complement). The MSB
//           carry-out is <span className="inter-body">Cout</span>.
//         </p>

//         <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
//           B. Logical Units
//         </h4>
//         <p className="leading-7 inter-body">
//           Four 2-input gates in parallel for each operation: AND, OR, XOR — one
//           per bit.
//         </p>

//         <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
//           C. The Multiplexer (Mux)
//         </h4>
//         <p className="leading-7 inter-body">
//           A 4-bit-wide mux selects the active unit’s output based on the opcode
//           (e.g., 000=ADD, 001=SUB, 010=AND, …).
//         </p>

//         <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
//           D. Status Flags
//         </h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>
//             <span className="inter-subheading">Cout:</span>{" "}
//             <span className="inter-body">
//               Carry-out from arithmetic ops; 0 for logical ops.
//             </span>
//           </li>
//           <li>
//             <span className="inter-subheading">Zf:</span>{" "}
//             <span className="inter-body">
//               NOR of all result bits (1 if result == 0).
//             </span>
//           </li>
//         </ul>

//         <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
//           Conceptual Flow
//         </h4>
//         <ol className="list-decimal pl-6 space-y-2">
//           <li>
//             <span className="inter-body">
//               Arithmetic and logical units compute in parallel.
//             </span>
//           </li>
//           <li>
//             <span className="inter-body">opcode</span>{" "}
//             <span className="inter-body">
//               selects one result via the mux.
//             </span>
//           </li>
//           <li>
//             <span className="inter-body">Flags are produced accordingly</span>{" "}
//             (<span className="inter-body">Cout</span>{" "}
//             <span className="inter-body">from adder</span>,{" "}
//             <span className="inter-body">Zf</span>{" "}
//             <span className="inter-body">from result check</span>).
//           </li>
//         </ol>

//         <MCQBlock />
//       </section>

//       {/* Checkbox & Navigation Buttons */}
//       <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
//         {/* Left side - Previous button */}
//         <div className="flex justify-start">
//           <button
//             disabled={!readModules[1]}
//             onClick={() => setModule(1)}
//             className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
//               readModules[1]
//                 ? "bg-gray-500 hover:bg-gray-600 text-white"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             ← Previous Module
//           </button>
//         </div>

//         {/* Center - Checkbox */}
//         <div className="flex justify-center">
//           <label htmlFor="read2" className="flex items-center space-x-2 text-slate-700">
//             <input
//               type="checkbox"
//               id="read2"
//               checked={readModules[1]}          
//               onChange={() => handleCheckboxChange(1)}
//               className="h-4 w-4 accent-blue-600 rounded"
//             />
//             <span>I have read this module</span>
//           </label>
//         </div>

//         {/* Right side - Next button */}
//         <div className="flex justify-end">
//           <button
//             disabled={!readModules[1]}          
//             onClick={() => setModule(3)}        
//             className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
//               readModules[1]
//                 ? "bg-blue-600 hover:bg-blue-700 text-white"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Next Module →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module2({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Execution (The Core)
        </h2>
        <p className="leading-7 inter-body">
          Our goal is to build a conceptual 4-bit ALU: it takes two 4-bit inputs
          and an opcode, and produces a 4-bit result with status flags.
        </p>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. The ALU&apos;s Interface and Operations
        </h3>
        <p className="leading-7 inter-body">Operations covered:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="inter-subheading">Addition (A + B):</span>{" "}
            <span className="inter-body">Standard binary addition.</span>
          </li>
          <li>
            <span className="inter-subheading">Subtraction (A - B):</span>{" "}
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer inline-block px-2 py-0.5 rounded-xl bg-gray-100 border border-gray-300 shadow-sm hover:bg-gray-200 transition"
            >
              Two’s-complement <span className="ml-1">💡</span>
            </button>{" "}
            via A + (~B) + 1.
          </li>
          <li>
            <span className="inter-subheading">AND (A &amp; B)</span>
          </li>
          <li>
            <span className="inter-subheading">OR (A | B)</span>
          </li>
          <li>
            <span className="inter-subheading">XOR (A ^ B)</span>
          </li>
        </ul>

        {/* Popup */}
        {open && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full relative flex items-start gap-6">
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>

              {/* Mascot Image */}
              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src="/images/explain.png"
                  alt="Website Mascot"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h4 className="text-lg inter-subheading mb-2">
                  LLAMA explains…
                </h4>
                <p className="text-gray-700">
                  Two’s-complement is a mathematical operation on binary
                  numbers, widely used to represent signed integers. It allows
                  binary addition and subtraction to be performed uniformly
                  without special handling of negative numbers.
                </p>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. Conceptual Design Strategy
        </h3>
        <p className="leading-7 inter-body">
          Build separate functional blocks (Adder/Subtractor, AND, OR, XOR) and
          use a multiplexer (controlled by
          <span className="inter-body"> opcode</span>) to select which block’s
          output drives the result.
        </p>

        {/* === Pseudo-code Practice Section === */}
        <div className="pseudo-code">
          <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
            {/* Fake terminal header */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
                Terminal
              </span>
            </div>

            {/* Title */}
            <h4 className="text-lg inter-subheading text-green-400 mb-2">
              ✍️ Pseudo-code Practice
            </h4>
            <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
              Write down the expected behavior in simple pseudo-code before
              looking at the solution.
            </p>

            {/* User Notepad */}
            <textarea
              className="w-full h-40 p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body"
              placeholder="Write your pseudo-code here..."
            />

            {/* Collapsible Solution */}
            <details className="mt-4">
              <summary className="cursor-pointer text-green-400 font-medium hover:underline">
                💡 Show Solution
              </summary>
              <pre className="mt-2 p-4 bg-black text-green-300 rounded-lg text-sm overflow-x-auto border border-green-600 shadow-inner fira-code-body">
{`if opcode == 00:
    result = A + B
elif opcode == 01:
    result = A - B
elif opcode == 10:
    result = A & B
elif opcode == 11:
    result = A | B`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
          A. Arithmetic Unit (Add/Subtract Logic)
        </h4>
        <p className="leading-7 inter-body">
          Addition uses four chained 1-bit full adders. Subtraction reuses the
          adder by inverting B and setting Cin=1 (two’s-complement). The MSB
          carry-out is <span className="inter-body">Cout</span>.
        </p>

        <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
          B. Logical Units
        </h4>
        <p className="leading-7 inter-body">
          Four 2-input gates in parallel for each operation: AND, OR, XOR — one
          per bit.
        </p>

        <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
          C. The Multiplexer (Mux)
        </h4>
        <p className="leading-7 inter-body">
          A 4-bit-wide mux selects the active unit’s output based on the opcode
          (e.g., 000=ADD, 001=SUB, 010=AND, …).
        </p>

        <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
          D. Status Flags
        </h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="inter-subheading">Cout:</span>{" "}
            <span className="inter-body">
              Carry-out from arithmetic ops; 0 for logical ops.
            </span>
          </li>
          <li>
            <span className="inter-subheading">Zf:</span>{" "}
            <span className="inter-body">
              NOR of all result bits (1 if result == 0).
            </span>
          </li>
        </ul>

        <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mt-4">
          Conceptual Flow
        </h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <span className="inter-body">
              Arithmetic and logical units compute in parallel.
            </span>
          </li>
          <li>
            <span className="inter-body">opcode</span>{" "}
            <span className="inter-body">
              selects one result via the mux.
            </span>
          </li>
          <li>
            <span className="inter-body">Flags are produced accordingly</span>{" "}
            (<span className="inter-body">Cout</span>{" "}
            <span className="inter-body">from adder</span>,{" "}
            <span className="inter-body">Zf</span>{" "}
            <span className="inter-body">from result check</span>).
          </li>
        </ol>

        <MCQBlock />
      </section>

      {/* Checkbox & Navigation Buttons */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Left side - Previous button (always active, blue) */}
        <div className="flex justify-start">
          <button
            onClick={() => setModule(1)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ←  Module 1
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read2" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read2"
              checked={readModules[1]}          
              onChange={() => handleCheckboxChange(1)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Next button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[1]}          
            onClick={() => setModule(3)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[1]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
             Module 3 →
          </button>
        </div>
      </div>
    </div>
  );
}

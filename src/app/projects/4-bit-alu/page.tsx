"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function Page() {
  const [module, setModule] = useState(1); // current module: 1,2,3
  const [readModules, setReadModules] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (mod: number) => {
    setReadModules({ ...readModules, [mod]: !readModules[mod] });
  };
  useEffect(() => {
    // Disable text selection & copying
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);
  return (
    <section className="bg-white min-h-screen py-12 px-4">
      <div className="mx-auto max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-black">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">4-bit ALU: Conceptual Design &amp; Verification Dojo</h1>
          <Link href="/#projects" className="text-black underline underline-offset-4">
            ← Back to Projects
          </Link>
        </div>

        {/* Module 1 */}
        {module === 1 && (
            <div>
                {/* Introduction */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p className="leading-7">
                    At the very heart of every computer processor lies the Arithmetic Logic Unit (ALU). This essential digital
                    circuit is the unsung hero that performs all the mathematical calculations and logical comparisons that make
                    a computer &quot;compute.&quot; Imagine trying to run a spreadsheet, play a game, or even browse the web
                    without a component capable of adding numbers, checking conditions, or manipulating data bits. That&apos;s
                    the critical problem the ALU solves!
                </p>
                <p className="leading-7">
                    This Dojo will guide you through the conceptual design of a simple 4-bit ALU, helping you grasp the
                    fundamental principles of how arithmetic and logical operations are carried out in hardware. Understanding
                    the ALU&apos;s architecture and operation is a cornerstone for anyone interested in how microprocessors
                    function, providing invaluable insight into the core of digital systems.
                </p>
                </section>

                {/* Prerequisites */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Prerequisites</h2>
                <p className="leading-7">To engage with the conceptual ideas in this Dojo, it helps to know:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-semibold">Basic Logic Gates:</span> AND, OR, XOR, NOT.</li>
                    <li><span className="font-semibold">Combinational Logic:</span> Output depends only on current inputs.</li>
                    <li><span className="font-semibold">Binary Numbers:</span> Representation and basic arithmetic.</li>
                    <li><span className="font-semibold">Multiplexers (Muxes):</span> Select one of many inputs using control signals.</li>
                    <li><span className="font-semibold">System Clock &amp; Reset (Conceptual):</span> Timing and initialization ideas.</li>
                </ul>

                <p className="leading-7">If you implement these concepts, typical open-source tools include:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                    <span className="font-semibold">Icarus Verilog:</span> Compiler/simulator for HDL.
                    <span className="ml-2">Installation Guide (search official docs).</span>
                    </li>
                    <li>
                    <span className="font-semibold">GTKWave:</span> Waveform viewer.
                    <span className="ml-2">Installation Guide (search official docs).</span>
                    </li>
                    <li>
                    <span className="font-semibold">Yosys (Optional):</span> Synthesis to a gate-level netlist.
                    <span className="ml-2">Installation Guide (search official docs).</span>
                    </li>
                </ul>
                </section>

                {/* Signals & Ports Table */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">ALU Interface (Signals &amp; Ports)</h2>
                <p className="leading-7">
                    The 4-bit ALU accepts two operands and an opcode, and produces a result with status flags.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left">Signal</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Direction</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Width</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">A</td>
                        <td className="border border-gray-300 px-3 py-2">Input</td>
                        <td className="border border-gray-300 px-3 py-2">[3:0]</td>
                        <td className="border border-gray-300 px-3 py-2">Operand A</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">B</td>
                        <td className="border border-gray-300 px-3 py-2">Input</td>
                        <td className="border border-gray-300 px-3 py-2">[3:0]</td>
                        <td className="border border-gray-300 px-3 py-2">Operand B</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">opcode</td>
                        <td className="border border-gray-300 px-3 py-2">Input</td>
                        <td className="border border-gray-300 px-3 py-2">[2:0]</td>
                        <td className="border border-gray-300 px-3 py-2">Selects ALU operation</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">Cin</td>
                        <td className="border border-gray-300 px-3 py-2">Input</td>
                        <td className="border border-gray-300 px-3 py-2">1</td>
                        <td className="border border-gray-300 px-3 py-2">Carry-in for addition / two’s complement</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">Result</td>
                        <td className="border border-gray-300 px-3 py-2">Output</td>
                        <td className="border border-gray-300 px-3 py-2">[3:0]</td>
                        <td className="border border-gray-300 px-3 py-2">Operation result</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">Cout</td>
                        <td className="border border-gray-300 px-3 py-2">Output</td>
                        <td className="border border-gray-300 px-3 py-2">1</td>
                        <td className="border border-gray-300 px-3 py-2">Carry-out (for add/sub)</td>
                        </tr>
                        <tr>
                        <td className="border border-gray-300 px-3 py-2">Zf</td>
                        <td className="border border-gray-300 px-3 py-2">Output</td>
                        <td className="border border-gray-300 px-3 py-2">1</td>
                        <td className="border border-gray-300 px-3 py-2">Zero flag (Result == 0)</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </section>
                {/* Checkbox & Next Button */}
                <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="read1"
                    checked={readModules[1]}
                    onChange={() => handleCheckboxChange(1)}
                    className="mr-2"
                />
                <label htmlFor="read1">I have read this module</label>
                </div>
                <button
                disabled={!readModules[1]}
                onClick={() => setModule(2)}
                className={`mt-4 px-4 py-2 rounded text-white ${readModules[1] ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                Move to Module 2
                </button>
            </div>
        )}

        
        {/* Module 2 */}
        {module === 2 && (
            <div>
                {/* Execution / Core */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Execution (The Core)</h2>
                <p className="leading-7">
                    Our goal is to build a conceptual 4-bit ALU: it takes two 4-bit inputs and an opcode, and produces a 4-bit
                    result with status flags.
                </p>

                <h3 className="text-xl font-semibold mt-6">1. The ALU&apos;s Interface and Operations</h3>
                <p className="leading-7">Operations covered:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-semibold">Addition (A + B):</span> Standard binary addition.</li>
                    <li><span className="font-semibold">Subtraction (A - B):</span>{" "}
                        <button
                            onClick={() => setOpen(true)}
                            className="cursor-pointer inline-block px-2 py-0.3 rounded-xl bg-gray-100 border border-gray-300 shadow-sm hover:bg-gray-200 transition"
                        >
                        Two’s-complement <span className="ml-1">💡</span>
                        </button>{" "}
                        via A + (~B) + 1.
                    </li>
                    <li><span className="font-semibold">AND (A &amp; B)</span></li>
                    <li><span className="font-semibold">OR (A | B)</span></li>
                    <li><span className="font-semibold">XOR (A ^ B)</span></li>
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
                        src="/images/explain.png" // <-- replace with your mascot path
                        alt="Website Mascot"
                        className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">LLAMA explains… </h4>
                        <p className="text-gray-700">
                        Two’s-complement is a mathematical operation on binary numbers,
                        widely used to represent signed integers. It allows binary addition
                        and subtraction to be performed uniformly without special handling
                        of negative numbers.
                        </p>
                    </div>
                    </div>
                </div>
                )}


                <h3 className="text-xl font-semibold mt-6">2. Conceptual Design Strategy</h3>
                <p className="leading-7">
                    Build separate functional blocks (Adder/Subtractor, AND, OR, XOR) and use a multiplexer (controlled by
                    <span className="font-mono"> opcode</span>) to select which block’s output drives the result.
                </p>

                <h4 className="text-lg font-semibold mt-4">A. Arithmetic Unit (Add/Subtract Logic)</h4>
                <p className="leading-7">
                    Addition uses four chained 1-bit full adders. Subtraction reuses the adder by inverting B and setting Cin=1
                    (two’s-complement). The MSB carry-out is <span className="font-mono">Cout</span>.
                </p>

                <h4 className="text-lg font-semibold mt-4">B. Logical Units</h4>
                <p className="leading-7">
                    Four 2-input gates in parallel for each operation: AND, OR, XOR — one per bit.
                </p>

                <h4 className="text-lg font-semibold mt-4">C. The Multiplexer (Mux)</h4>
                <p className="leading-7">
                    A 4-bit-wide mux selects the active unit’s output based on the opcode (e.g., 000=ADD, 001=SUB, 010=AND, …).
                </p>

                <h4 className="text-lg font-semibold mt-4">D. Status Flags</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-semibold">Cout:</span> Carry-out from arithmetic ops; 0 for logical ops.</li>
                    <li><span className="font-semibold">Zf:</span> NOR of all result bits (1 if result == 0).</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4">Conceptual Flow</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Arithmetic and logical units compute in parallel.</li>
                    <li><span className="font-mono">opcode</span> selects one result via the mux.</li>
                    <li>Flags are produced accordingly (<span className="font-mono">Cout</span> from adder, <span className="font-mono">Zf</span> from result check).</li>
                </ol>
                </section>
                {/* Checkbox & Next Button */}
                <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="read1"
                    checked={readModules[1]}
                    onChange={() => handleCheckboxChange(1)}
                    className="mr-2"
                />
                <label htmlFor="read1">I have read this module</label>
                </div>
                <button
                    onClick={() => setModule(1)}
                    className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                >
                    Back to Module 1
                </button>
                <button
                disabled={!readModules[1]}
                onClick={() => setModule(3)}
                className={`mt-4 px-4 py-2 rounded text-white ${readModules[1] ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                Move to Module 3
                </button>
            </div>
        )}


        {module === 3 && (
            <div>
                {/* Verification & Validation */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Verification &amp; Validation</h2>
                <p className="leading-7">
                    Conceptually verify by instantiating the ALU, applying inputs, observing outputs, and comparing to expected
                    results.
                </p>

                <h3 className="text-xl font-semibold mt-4">Test Scenarios</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ADD: A=0001, B=0010 → 0011, Cout=0, Zf=0</li>
                    <li>ADD: A=1111, B=0001 → 0000, Cout=1, Zf=1</li>
                    <li>SUB: A=0101, B=0010 → 0011, Cout=1, Zf=0</li>
                    <li>SUB: A=0010, B=0101 → 1101, Cout=0, Zf=0</li>
                    <li>AND: A=1010, B=0110 → 0010, Cout=0, Zf=0</li>
                    <li>XOR: A=1010, B=0110 → 1100, Cout=0, Zf=0</li>
                    <li>OR:  A=0000, B=0000 → 0000, Cout=0, Zf=1</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">Waveform Analysis (Conceptual)</h3>
                <p className="leading-7">
                    Use a waveform viewer to ensure signal transitions match expectations after input changes.
                </p>
                </section>

                {/* Optional Synthesis */}
                <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Optional: Synthesis</h2>
                <p className="leading-7">
                    Synthesis converts your HDL into a gate-level netlist, checks implementability, and optimizes for area/speed.
                    It provides early performance insights for hardware targets (FPGA/ASIC).
                </p>
                </section>

                {/* Conclusion */}
                <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Conclusion &amp; Next Steps</h2>
                <p className="leading-7">
                    You’ve conceptually designed a 4-bit ALU, explored verification ideas, and seen how synthesis connects
                    concepts to gates. Consider expanding width (8/16-bit), adding operations (shifts, comparisons), exploring
                    pipelining, or venturing into floating-point arithmetic.
                </p>
                </section>
                {/* Checkbox & Next Button */}
                <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="read1"
                    checked={readModules[1]}
                    onChange={() => handleCheckboxChange(1)}
                    className="mr-2"
                />
                <label htmlFor="read1">I have read this module</label>
                </div>
                <button
                    onClick={() => setModule(2)}
                    className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                >
                    Back to Module 2
                </button>
                <button
                disabled={!readModules[1]}
                onClick={() => setModule(3)}
                className={`mt-4 px-4 py-2 rounded text-white ${readModules[1] ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                Finish Dojo
                </button>
            </div>
        )}
      </div>
    </section>
  );
}

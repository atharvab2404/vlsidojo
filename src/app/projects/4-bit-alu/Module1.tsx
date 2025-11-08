"use client";

import { ChangeEvent } from "react";

type Module1Props = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // move to next module
};

export default function Module1({
  readModules = [false], // default to avoid undefined
  handleCheckboxChange = () => {}, // noop if not passed
  setModule = () => {}, // noop if not passed
}: Module1Props) {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Introduction
        </h2>
        <p className="leading-7 inter-body">
          At the very heart of every computer processor lies the Arithmetic Logic
          Unit (ALU). This essential digital circuit is the unsung hero that
          performs all the mathematical calculations and logical comparisons that
          make a computer &quot;compute.&quot;
        </p>
        <p className="leading-7 inter-body">
          This Dojo will guide you through the conceptual design of a simple 4-bit
          ALU, helping you grasp the fundamental principles of how arithmetic and
          logical operations are carried out in hardware.
        </p>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Prerequisites */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Basic Logic Gates: AND, OR, XOR, NOT.</li>
          <li>Combinational Logic: Output depends only on current inputs.</li>
          <li>Binary Numbers: Representation and basic arithmetic.</li>
          <li>Multiplexers (Muxes): Select inputs using control signals.</li>
          <li>System Clock &amp; Reset (conceptual).</li>
        </ul>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Signals & Ports */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          ALU Interface (Signals &amp; Ports)
        </h2>
        <p className="leading-7 inter-body">
          The 4-bit ALU accepts two operands and an opcode, and produces a result
          with status flags.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-2 text-left">Signal</th>
                <th className="px-3 py-2 text-left">Direction</th>
                <th className="px-3 py-2 text-left">Width</th>
                <th className="px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2">A</td><td>Input</td><td>[3:0]</td><td>Operand A</td></tr>
              <tr><td className="px-3 py-2">B</td><td>Input</td><td>[3:0]</td><td>Operand B</td></tr>
              <tr><td className="px-3 py-2">opcode</td><td>Input</td><td>[2:0]</td><td>Selects operation</td></tr>
              <tr><td className="px-3 py-2">Cin</td><td>Input</td><td>1</td><td>Carry-in</td></tr>
              <tr><td className="px-3 py-2">Result</td><td>Output</td><td>[3:0]</td><td>Operation result</td></tr>
              <tr><td className="px-3 py-2">Cout</td><td>Output</td><td>1</td><td>Carry-out</td></tr>
              <tr><td className="px-3 py-2">Zf</td><td>Output</td><td>1</td><td>Zero flag</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="max-w-xl w-full">
            <img
              src="/images/alu.png"
              alt="4-bit ALU Block Diagram"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Checkbox & Navigation Buttons */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        <div></div>

        <div className="flex justify-center">
          <label htmlFor="read1" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read1"
              checked={readModules[0]}          
              onChange={() => handleCheckboxChange(0)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            disabled={!readModules[0]}          
            onClick={() => setModule(2)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[0]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Move to Module 2 →
          </button>
        </div>
      </div>
    </div>
  );
}

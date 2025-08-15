import React from "react";

export default function FpgaVsAsicPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">FPGA vs ASIC: A Detailed Comparison</h1>

      <p className="mb-4">
        In the semiconductor and digital design world, **FPGAs** (Field Programmable Gate Arrays) and **ASICs**
        (Application Specific Integrated Circuits) are two major hardware implementation approaches.  
        While they both execute digital logic, their architectures, performance, flexibility, and cost
        profiles differ significantly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. What is an FPGA?</h2>
      <p className="mb-4">
        An FPGA is a reconfigurable integrated circuit made up of configurable logic blocks (CLBs), interconnects,
        and I/O blocks. Designers can program FPGAs using hardware description languages like Verilog or VHDL.
        They are ideal for prototyping, hardware acceleration, and applications requiring frequent updates.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. What is an ASIC?</h2>
      <p className="mb-4">
        An ASIC is a custom-manufactured chip designed for a specific task. Once fabricated, its functionality
        cannot be changed. ASICs offer **higher performance** and **lower power consumption** compared to FPGAs
        but have a **high upfront development cost**.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Key Differences</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Feature</th>
            <th className="border border-gray-400 px-4 py-2">FPGA</th>
            <th className="border border-gray-400 px-4 py-2">ASIC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">Flexibility</td>
            <td className="border border-gray-400 px-4 py-2">Reprogrammable anytime</td>
            <td className="border border-gray-400 px-4 py-2">Fixed functionality after fabrication</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">Performance</td>
            <td className="border border-gray-400 px-4 py-2">Lower than ASIC</td>
            <td className="border border-gray-400 px-4 py-2">Very high, optimized for specific task</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">Cost</td>
            <td className="border border-gray-400 px-4 py-2">Low initial, higher per unit</td>
            <td className="border border-gray-400 px-4 py-2">High initial, low per unit at scale</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">Time to Market</td>
            <td className="border border-gray-400 px-4 py-2">Faster</td>
            <td className="border border-gray-400 px-4 py-2">Slower (fabrication time)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. When to Use Which?</h2>
      <p className="mb-4">
        - Use an **FPGA** when you need flexibility, frequent updates, or are in the prototyping stage.  
        - Use an **ASIC** when performance, power efficiency, and cost at scale are critical.
      </p>

      <p className="mt-8 italic text-gray-600">
        Both FPGAs and ASICs have their place in modern electronics — the right choice depends on your project’s
        goals, budget, and timeline.
      </p>
    </main>
  );
}

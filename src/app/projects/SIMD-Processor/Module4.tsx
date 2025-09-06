"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module4({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
      <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          The SIMD Multiplier
        </h3>
        <p className="leading-7 inter-body">
          This module, named SIMDmultiply, is the dedicated functional unit for all multiplication operations. Unlike a simple single-line multiplication, this design is highly optimized for hardware and is an excellent example of a custom digital circuit designed for parallel data processing.
        </p>

        <p className="leading-7 inter-body"><strong>Segmented Shift-and-Add Multiplication</strong></p>

        <p className="leading-7 inter-body">Instead of using a simple * operator, this module implements a classic shift-and-add algorithm in a parallel, segmented fashion. The core idea is that multiplication is just a series of additions and bit shifts. For a binary number A * B, you can multiply A by each bit of B and then add the results, shifting them for their correct position
            <ol className="list-disc pl-6 space-y-2">
              <li><strong>16-bit Mode (H):</strong> When the H flag is active, the circuit performs a full 16-bit by 16-bit multiplication. The sel signals (sel0 to sel3) are all set to 16'hFFFF, effectively selecting the full mulinputa for each partial product calculation.</li>
              <li><strong>8-bit Mode (O):</strong> With the O flag, the module operates on two independent 8-bit sections. The sel signals act as masks, isolating the lower 8 bits (16'h00FF) for the first 8-bit multiplication and the upper 8 bits (16'hFF00) for the second. This allows two 8-bit multiplications to happen at the same time.</li>
              <li><strong>4-bit Mode (Q):</strong>In this mode, the module performs four parallel 4-bit multiplications. The sel signals are set to masks like 16'h000F and 16'h00F0 to isolate each 4-bit segment, allowing for maximum parallelism.</li>
            
            </ol>
        

        </p>
        <p className="leading-7 inter-body">The final output is constructed by selecting and concatenating the correct intermediate results based on the H, O, and Q flags.</p>


       
        <p className="leading-7 inter-body">
          <strong>SIMDmultiply Pseudocode</strong> 
            <p> Your mission is to write the pseudocode for the SIMDmultiply module. This is a purely combinational block. The pseudocode should reflect how the control flags dynamically change the data paths for the different operation widths.</p>

        </p>











        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this!!
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
{`// SIMDmultiply Pseudocode

Inputs:
  mulinputa (16-bit vector)
  mulinputb (16-bit vector)
  H, O, Q (control flags for data type)

Output:
  muloutput (16-bit result)

Begin Combinational Logic:
  // Step 1: Define the segmentation masks
  if H is true:
    sel_mask_0 = 16'hFFFF
    sel_mask_1 = 16'hFFFF
    sel_mask_2 = 16'hFFFF
    sel_mask_3 = 16'hFFFF
  else if O is true:
    sel_mask_0 = 16'h00FF
    sel_mask_1 = 16'h00FF
    sel_mask_2 = 16'hFF00
    sel_mask_3 = 16'hFF00
  else if Q is true:
    sel_mask_0 = 16'h000F
    sel_mask_1 = 16'h00F0
    sel_mask_2 = 16'h0F00
    sel_mask_3 = 16'hF000

  // Step 2: Generate all partial products for a 16-bit input
  // (This part is independent of the H, O, Q flags)
  // For each bit 'i' in mulinputb (from 0 to 15):
  //   Let 'a_i' = (mulinputb[i] ? mulinputa : 16'h0000)

  // Step 3: Combine partial products in a shift-and-add tree
  // First level of additions for 4-bit segments
  tmp0 = (a0 shifted left by 0) + (a1 shifted left by 1) + (a2 shifted left by 2) + (a3 shifted left by 3)
  // ... and so on for tmp1, tmp2, tmp3

  // Second level of additions
  tmp00 = tmp0 + (tmp1 shifted left by 4)
  tmp11 = tmp2 + (tmp3 shifted left by 4)

  // Final addition for a full 16-bit product
  tmp000 = tmp00 + (tmp11 shifted left by 8)

  // Step 4: Select the final output segments based on the control flags
  assign muloutput[3:0] to bits [3:0] of tmp0
  
  if H is true:
    assign muloutput[15:4] to bits [15:4] of tmp000
  else if O is true:
    assign muloutput[7:4] to bits [7:4] of tmp00
    assign muloutput[15:8] to bits [15:8] of tmp11
  else if Q is true:
    assign muloutput[7:4] to bits [7:4] of tmp1
    assign muloutput[11:8] to bits [11:8] of tmp2
    assign muloutput[15:12] to bits [15:12] of tmp3`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}




            <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          The SIMD Shifter
        </h3>
        <p className="leading-7 inter-body">
          The SIMDshifter module performs logical bit shifts to the left or right, a fundamental operation for many computational tasks. Its key feature is the ability to shift multiple independent data segments in parallel, thanks to the SIMD design.</p>
        <p>This design is a highly optimized, combinational circuit. It directly manipulates the bit positions of the input vector based on the shift direction and data type. It doesn't rely on a clocked process or a loop, making it incredibly fast.</p>

        <p className="leading-7 inter-body"><strong>Parallel Bit Shifting</strong></p>

        <p className="leading-7 inter-body">Your SIMDshifter module uses a clever technique to implement all the required shifts in a single block of code. It pre-calculates the results for a generic left and right shift and then uses control signals to select the correct output bits.
            <ol className="list-disc pl-6 space-y-2">
              <li><strong>Pre-calculation:</strong>The shiftoutput_tmp wire is the core. It computes a one-bit logical left shift {"({left_shift, 1'b0}) or a one-bit logical right shift ({1'b0, right_shift})"}s of the entire 16-bit input. The left signal chooses between these two pre-shifted versions.</li>
              <li><strong>Segmented Output:</strong>The final shiftoutput is constructed by taking slices from the shiftoutput_tmp and conditionally including bits that cross the segment boundaries. This is where the H, O, and Q flags come into play.
                <ol className="list-disc pl-6 space-y-2">
                  
                    <li><strong>16-bit Mode (H):</strong> The bits shift seamlessly across the entire 16-bit word.</li>
                    <li><strong>8-bit Mode (O):</strong> The bits shift within the two 8-bit segments. The bit that would shift out of the lower 8 bits is discarded, and the upper 8-bit segment shifts independently.</li>
                    <li><strong>4-bit Mode (Q):</strong>Each 4-bit segment shifts entirely on its own. The bit that shifts out of one segment is discarded and doesn't affect the next.</li>
                </ol>  
              
              </li>
            </ol>
        

        </p>
        <p className="leading-7 inter-body">This intricate bit-manipulation logic allows the single shifter to handle all data types and shift directions, making it a powerful and reusable component.</p>
       
        <p className="leading-7 inter-body">
          <strong>SIMDshifter Pseudocode</strong> 
            <p>Your mission is to write the pseudocode for the SIMDshifter module. Focus on the conditional logic that controls how the bits from the temporary shifted vector are mapped to the final output based on the H, O, Q, and left signals. </p>
        </p>











        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this!!
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
{`// SIMDshifter Pseudocode

Inputs:
  shiftinput (16-bit vector)
  H (control flag for 16-bit mode)
  O (control flag for 8-bit mode)
  Q (control flag for 4-bit mode)
  left (control flag for shift direction)

Output:
  shiftoutput (16-bit result)

Begin Combinational Logic:
  // Step 1: Pre-calculate a one-bit left shift and a one-bit right shift
  if left is true:
    // This is the logical left-shift temporary result
    tmp_result = concatenate(shiftinput[14:0], 1'b0)
  else:
    // This is the logical right-shift temporary result
    tmp_result = concatenate(1'b0, shiftinput[15:1])

  // Step 2: Assemble the final output based on control signals
  // Segment 0 (bits 3:0):
  // The highest bit of the segment (bit 3) is taken from tmp_result[3] if left, H, or O is true.
  shiftoutput[3:0] = concatenate((left or H or O) and tmp_result[3], tmp_result[2:0])

  // Segment 1 (bits 7:4):
  // The highest bit (bit 7) is from a left-shift if left or H is true.
  // The lowest bit (bit 4) is from a right-shift if not left, H, or O is true.
  shiftoutput[7:4] = concatenate(
    (left or H) and tmp_result[7], 
    tmp_result[6:5], 
    (not left or H or O) and tmp_result[4]
  )

  // Segment 2 (bits 11:8):
  // The highest bit (bit 11) is from a left-shift if left, H, or O is true.
  // The lowest bit (bit 8) is from a right-shift if not left or H is true.
  shiftoutput[11:8] = concatenate(
    (left or H or O) and tmp_result[11], 
    tmp_result[10:9], 
    (not left or H) and tmp_result[8]
  )
  
  // Segment 3 (bits 15:12):
  // The highest bit (bit 15) is from a left-shift if left or H is true.
  // The lowest bit (bit 12) is from a right-shift if not left, H, or O is true.
  shiftoutput[15:12] = concatenate(
    (left or H) and tmp_result[15], 
    tmp_result[14:13], 
    (not left or H or O) and tmp_result[12]
  )
End Combinational Logic`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      </section>
      {/* Navigation Controls */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Left side - Previous button (always active, blue) */}
        <div className="flex justify-start">
          <button
            onClick={() => setModule(3)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 3
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read3" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read3"
              checked={readModules[3]}          
              onChange={() => handleCheckboxChange(3)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Finish button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[3]}          
            onClick={() => setModule(5)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[3]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
             Module 5 →
          </button>
        </div>
      </div>
      
      
    </div>
  );
}

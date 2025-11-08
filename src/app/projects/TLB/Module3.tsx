"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module3({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong>The Replacement Policy - PLRU</strong>
        </h2>
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
         3.1 How PLRU Works
        </h2>
        <p className="leading-7 inter-body">
       When you get a TLB miss, you need to bring the new translation in. But what if the set is full? You have to evict an old entry. The PLRU policy is an approximation of the ideal "Least Recently Used" (LRU) policy.
        </p>
        <p className="leading-7 inter-body">
          Imagine a binary tree with each leaf node representing one of the 8 ways. The internal nodes are single bits that point to either the left or right child. A '0' might mean "least recently used is on the left," and a '1' means "least recently used is on the right."
        </p>
        <p className="leading-7 inter-body">
          Whenever you access a way, you "walk" up the tree from the leaf to the root, flipping the bits along the way to point away from the path you just took. To find the next victim, you just "walk" down the tree from the root, always following the bit that points to the least recently used path.
        </p>
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
        3.2 Pseudocode Challenge: PLRU Update
        </h2>
        <p className="leading-7 inter-body">
           The provided code has a helper function new_plru that does the heavy lifting. But the core logic is in the state_req block.
        </p>
          
          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
           Focus on a single way, say way 0. Write the pseudocode for how the PLRU bits <em>(plru[req_set])</em> are updated when way 0 is accessed. Reference the binary tree image to visualize this. The key is to flip the bits on the path from the root to the accessed leaf.</p>

        



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
{`// Pseudocode for PLRU Update on a Hit
// Let's use a 7-bit PLRU register for an 8-way cache.
// Bit 0: root, points to left (0) or right (1) half (ways 0-3 vs 4-7)
// Bit 1: left half, ways 0-1 vs 2-3
// Bit 2: right half, ways 4-5 vs 6-7
// ... and so on

if (hit on way 0) then
  // Accessing way 0, so flip the root bit to point to the other half
  plru[req_set].bit_0 = 1;
  // Flip the bit for the left-left sub-tree
  plru[req_set].bit_1 = 1;
  // Flip the bit for the ways 0-1 group
  plru[req_set].bit_3 = 1;
end`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

       <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
        3.3 Pseudocode Challenge: PLRU Insertion
        </h2>
        <p className="leading-7 inter-body">
           When we have a miss, we need to find the victim to replace. This is done by traversing the PLRU tree.</p>
          
          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
          Write pseudocode that, on an insertion (state == state_insert), finds the least recently used way in a set and updates the entry.
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
{`// Pseudocode for PLRU Insertion
always @(posedge clk) begin
  if (state == state_insert) begin
    // Start at the root of the PLRU tree
    victim_way = 0;
    
    if (plru[insert_set].bit_0 == 0) begin // Check the root bit
      if (plru[insert_set].bit_1 == 0) begin // Check the next level
        if (plru[insert_set].bit_3 == 0) begin
          victim_way = 0;
        end else begin
          victim_way = 1;
        end
      end else begin // Left-right sub-tree
        // ...and so on for the other ways
      end
    end else begin // Right half
      // ...and so on
    end
    
    // Once the victim is found, insert the new entry
    entries[insert_set][victim_way].tag = insert_tag;
    entries[insert_set][victim_way].pcid = insert_pcid;
    entries[insert_set][victim_way].pa = insert_pa[SADDR-1:SPAGE];
    
    // Then, update the PLRU bits for the new entry
  end
end`}
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
            onClick={() => setModule(2)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 2
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read3" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read3"
              checked={readModules[2]}          
              onChange={() => handleCheckboxChange(2)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Finish button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[2]}          
            onClick={() => setModule(4)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[2]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Module 4 →
          </button>
        </div>
      </div>
      
      
    </div>
  );
}

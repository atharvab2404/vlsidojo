"use client";

type ModuleProps = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module1({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: ModuleProps) {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong>Introduction</strong>
        </h2>
        <p className="leading-7 inter-body">
          Imagine your CPU as a diligent worker who needs to find a specific file (data) on a 
          massive shelf (main memory). To do this, the worker uses a large, detailed index (the page table) 
          that tells them where each file is physically located. The problem? This index is also on the 
          shelf, so every time the worker needs a file, they first have to find the index. This is slow!
        </p>
        <p className="leading-7 inter-body">
          A <strong>Translation Lookaside Buffer (TLB)</strong> is like a tiny, super-fast notepad the worker keeps in their 
          pocket. It stores the locations of the most frequently used files, so they can bypass the slow 
          index lookup and go straight to the file they need. This makes memory access much faster.
        </p>
        {/* define */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
          <p className="font-semibold">💡 Definition</p>
          <p className="text-sm">
            A Translation lookaside buffer (TLB) is a small, high-speed memory cache on a computer's central processing unit (CPU). Its job is to speed up the translation of virtual memory addresses to physical memory addresses. Think of it as a shortcut for a translator.
          </p>
        </div>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Prerequisites */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          The TLB's Structure
        </h2>
        <p className="leading-7 inter-body">
          Our TLB is a cache with a specific structure:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Size:</strong> 64 entries</li>
          <li><strong>Associativity: 8-way set-associative.</strong> This means the 64 entries are divided into 8 sets, with 8 entries (or "ways") in each set. A given virtual address can only map to one specific set.</li>
          <li><strong>Replacement Policy: Pseudo-Least Recently Used (PLRU).</strong> When the TLB is full and needs to store a new entry, PLRU helps it decide which old entry to throw out.</li>
        </ul>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Signals & Ports */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Module Interface (Signals &amp; Ports)
        </h2>
        <p className="leading-7 inter-body">
          Before we start coding, let's define the interface for our TLB module. This is how our module will communicate with the rest of the system.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-2 text-left">Port name</th>
                <th className="px-3 py-2 text-left">Direction</th>
                <th className="px-3 py-2 text-left">Size (parameter)</th>
                <th className="px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2">clk</td><td>Input</td><td>1</td><td>system clock</td></tr>
              <tr><td className="px-3 py-2">state</td><td>Input</td><td>STATE_RANGE</td><td>Controls the module's behavior (e.g., request, insert).</td></tr>
              <tr><td className="px-3 py-2">req_va</td><td>Input</td><td>SADDR</td><td>The virtual address to be translated.</td></tr>
              <tr><td className="px-3 py-2">req_pcid</td><td>Input</td><td>SPCID</td><td>The Process Context ID for req_va.</td></tr>
              <tr><td className="px-3 py-2">inster_va</td><td>Input</td><td>SADDR</td><td>Virtual address for a new entry to be inserted.</td></tr>
              <tr><td className="px-3 py-2">inster_pa</td><td>Input</td><td>SADDR</td><td>Physical address for a new entry to be inserted.</td></tr>
              <tr><td className="px-3 py-2">insert_pcid</td><td>Input</td><td>SPCID</td><td>PCID for the new entry.</td></tr>
              <tr><td className="px-3 py-2">req_ta</td><td>Output</td><td>SADDR</td><td>The translated physical address.</td></tr>
              <tr><td className="px-3 py-2">hit</td><td>Output</td><td>1</td><td>High when a translation is found.</td></tr>
              <tr><td className="px-3 py-2">miss</td><td>Output</td><td>1</td><td>High when a translation is not found.</td></tr>
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
        <p className="leading-7 inter-body">
          The first step for any set-associative cache is to break down the input address. A virtual address is split into three parts:
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Offset:</strong> This part of the address remains unchanged and is directly copied to the translated physical address.</li>
          <li><strong>Set Index:</strong> This determines which set within the cache to search.</li>
          <li><strong>Tag:</strong> This is the unique identifier for an entry within a set.</li>
        
        </ul>
        
        
        </p>
          <p className="leading-7 inter-body">
          <strong>Your task:</strong> 
           : Based on the module parameters, write pseudocode to show how you would calculate these three parts from an input virtual address <em>(req_va)</em>.
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
                {`// Given SADDR (address size), SPAGE (page size), NSET (number of sets)

// 1. Calculate the size of the Set Index
index_size = log2(NSET)

// 2. Calculate the size of the Tag
tag_size = SADDR - SPAGE - index_size

// 3. Decompose the virtual address (req_va)
offset = req_va[SPAGE-1 : 0]
set_index = req_va[SPAGE + index_size - 1 : SPAGE]
tag = req_va[SADDR - 1 : SPAGE + index_size]
`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      </section>

      {/* Navigation Controls */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        
        {/* Checkbox */}
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

        {/* Finish button */}
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
            Finish Dojo →
          </button>
        </div>
      </div>
    </div>
  );
}

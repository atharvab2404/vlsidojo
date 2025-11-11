// src/app/interview-prep/digital-design/curriculum.ts
export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export const digitalDesignCurriculum = [
  {
    hub: "Digital Logic Fundamentals",
    subtopics: [
      "What is a Digital vs. Analog Signal?",
      "Number Systems Explained: Binary, Octal, and Hexadecimal",
      "How to Convert Between Binary, Decimal, and Hexadecimal",
      "Signed Number Representation: 1's Complement and 2's Complement",
      "Binary Coded Decimal (BCD) Explained",
      "Boolean Algebra: Key Postulates and Theorems",
      "Digital Logic Gates: AND, OR, NOT, XOR, XNOR",
      "What are Universal Gates? (NAND and NOR)",
      "De Morgan's Theorem: How to Use it for Logic Simplification",
      "Canonical Forms: Sum-of-Products (SOP) and Product-of-Sums (POS)",
      "What is a Karnaugh Map (K-Map)? A Step-by-Step Guide",
      "Logic Minimization using K-Maps (with Don't Care Conditions)",
      "Advanced: Quine-McCluskey (Tabular Method) for Minimization",
    ],
  },
  {
    hub: "Combinational Logic Circuits",
    subtopics: [
      "What is a Combinational Circuit? (vs. Sequential)",
      "How to Design a Multiplexer (Mux)",
      "How to Implement any Boolean Function using a Mux",
      "How to Build a 4:1 Mux from 2:1 Muxes (Common Interview Question)",
      "What is a Decoder? (and How it Differs from a Demultiplexer)",
      "What is an Encoder? (Priority Encoder vs. Binary Encoder)",
      "Half-Adder and Full-Adder Explained (with Truth Table & Logic)",
      "What is a Ripple-Carry Adder? (Advantages & Disadvantages)",
      "The Carry-Lookahead Adder (CLA): A Fast Adder Explained",
      "How to Build a Full Subtractor using a Full Adder",
      "Designing a 4-bit Magnitude Comparator",
      "What is an Array Multiplier?",
    ],
  },
  {
    hub: "Sequential Logic Design",
    subtopics: [
      "Latch vs. Flip-Flop: The Ultimate Interview Guide",
      "The SR Latch: (NAND vs. NOR implementation)",
      "The D Latch (Gated Latch) and its Transparent Problem",
      "What is an Edge-Triggered D Flip-Flop? (Master-Slave Explained)",
      "D vs. T vs. JK Flip-Flops (with Characteristic Equations)",
      "The JK Flip-Flop Race-Around Condition",
      "Flip-Flop Timing: Asynchronous Preset and Clear Inputs",
      "What is a Shift Register? (SISO, SIPO, PISO, PIPO)",
      "How to Design a Universal Shift Register",
      "Synchronous vs. Asynchronous (Ripple) Counters",
      "How to Design a Synchronous Counter with Parallel Load",
      "Special Counters: Ring Counter and Johnson Counter",
      "What is Reset Synchronization? (Synchronous vs. Asynchronous Reset)",
    ],
  },
];

// ✅ flatten structure for automatic prev/next navigation
export const flatDigitalDesignTopics = digitalDesignCurriculum
  .flatMap(hub =>
    hub.subtopics.map(sub => ({
      title: sub,
      slug: slugify(sub),
    }))
  );
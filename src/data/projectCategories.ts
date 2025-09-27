// src/data/projectCategories.ts

export const categories = [
  {
    title: "Basic Projects",
    subtitle: "Build Your Foundational Skillset",
    description:
      "A selection of beginner-friendly projects to help you master the core concepts of digital design and HDL coding.",
    projects: [
      {
        id: "alu-4bit",
        label: "Beginner-Friendly",
        name: "4-bit ALU Design",
        image: "/projects/alu.png",
        description:
          "Design a mini Arithmetic Logic Unit to learn digital circuit design, logic gates, and modular HDL design.",
        link: "/projects/4-bit-alu",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
      {
        id: "round-robin-arbiter",
        label: "Real-World Relevance",
        name: "Round Robin Arbiter",
        image: "/images/arbiter.png",
        description:
          "Simulate a real-world traffic light system using a finite state machine, teaching you timing control and FSM modeling.",
        link: "/projects/param-round-robin-arbiter",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
      {
        id: "pattern-detector",
        label: "Hands-on Hardware",
        name: "Universal Pattern Detector",
        image: "/projects/alu.png",
        description:
          "Implement a real-time digital clock on an FPGA, perfect for practicing counters, clock dividers, and HDL logic.",
        link: "/projects/pattern-detector",
        price: 499,
        intro: "This project guides you through designing a high-performance, configurable pattern detector in SystemVerilog. You will build a core digital component used in high-speed applications like network packet inspection and data storage to locate specific bit sequences within a parallel data stream.",
        skills: ["System Verilog", "Digital Design Concepts", "Behavioral RTL modelling", "Verification and Debugging", "Paramterised Design"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
    ],
  },
  {
    title: "Intermediate Projects",
    subtitle: "Expand Your Digital Design Skills",
    description:
      "Challenging projects to strengthen your understanding of digital systems and prepare you for advanced design concepts.",
    projects: [
      {
        id: "simd-processor",
        label: "Complex Logic",
        name: "SIMD-Processor",
        image: "/images/proc.png",
        description:
          "Build an 8-bit CPU with registers and an ALU to learn more about processor design and instruction execution.",
        link: "/projects/SIMD-Processor",
        price: 499,
      },
      {
        id: "uart-protocol",
        label: "Real Applications",
        name: "UART Communication Module",
        image: "/images/uart-placeholder.png",
        description:
          "Implement a UART module for serial communication and understand asynchronous data transfer protocols.",
        link: "#",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
      {
        id: "pwm-controller",
        label: "FPGA Experience",
        name: "PWM Motor Controller",
        image: "/images/pwm-placeholder.png",
        description:
          "Create a pulse-width modulation motor controller to interface with hardware and understand signal modulation.",
        link: "#",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
    ],
  },
  {
    title: "Advanced Projects",
    subtitle: "Master VLSI and Digital Design",
    description:
      "Expert-level projects to push your skills, involving complex systems, SoC design, and hardware-software integration.",
    projects: [
      {
        id: "riscv-core",
        label: "High Performance",
        name: "RISC-V Processor Core",
        image: "/images/riscv-placeholder.png",
        description:
          "Design a full RISC-V 32-bit processor core, implementing instruction sets and pipelining concepts for SoC integration.",
        link: "#",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
      {
        id: "image-processing",
        label: "Hardware Acceleration",
        name: "FPGA Image Processing",
        image: "/images/image-processing-placeholder.png",
        description:
          "Accelerate image processing algorithms on FPGA, improving latency and performance over software-only implementations.",
        link: "#",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
      {
        id: "fpu-unit",
        label: "Advanced SoC",
        name: "Custom Floating-Point Unit",
        image: "/images/fpu-placeholder.png",
        description:
          "Design and integrate a high-performance FPU as a co-processor, exploring floating-point arithmetic and precision control.",
        link: "#",
        price: 499,
        intro: "Short intro shown at top of modal (optional)",
        skills: ["Verilog", "FPGA flow", "Timing closure"],
        knowledge: ["Pipelining", "Hazard handling"],
        features: ["Step-by-step guide", "Testbenches", "Resume README"],
      },
    ],
  },
];

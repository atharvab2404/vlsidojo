export default function ProjectCategories() {
  const categories = [
    {
      title: "Basic Projects",
      subtitle: "Build Your Foundational Skillset",
      description:
        "A selection of beginner-friendly projects to help you master the core concepts of digital design and HDL coding.",
      projects: [
        {
          label: "Beginner-Friendly",
          name: "4-bit ALU Design",
          image: "/images/alu-placeholder.png",
          description:
            "Design a mini Arithmetic Logic Unit to learn digital circuit design, logic gates, and modular HDL design.",
          link: "#",
        },
        {
          label: "Real-World Relevance",
          name: "Traffic Light Controller",
          image: "/images/traffic-light-placeholder.png",
          description:
            "Simulate a real-world traffic light system using a finite state machine, teaching you timing control and FSM modeling.",
          link: "#",
        },
        {
          label: "Hands-on Hardware",
          name: "Digital Clock on FPGA",
          image: "/images/clock-placeholder.png",
          description:
            "Implement a real-time digital clock on an FPGA, perfect for practicing counters, clock dividers, and HDL logic.",
          link: "#",
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
          label: "Complex Logic",
          name: "8-bit CPU Design",
          image: "/images/cpu-placeholder.png",
          description:
            "Build an 8-bit CPU with registers and an ALU to learn more about processor design and instruction execution.",
          link: "#",
        },
        {
          label: "Real Applications",
          name: "UART Communication Module",
          image: "/images/uart-placeholder.png",
          description:
            "Implement a UART module for serial communication and understand asynchronous data transfer protocols.",
          link: "#",
        },
        {
          label: "FPGA Experience",
          name: "PWM Motor Controller",
          image: "/images/pwm-placeholder.png",
          description:
            "Create a pulse-width modulation motor controller to interface with hardware and understand signal modulation.",
          link: "#",
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
          label: "High Performance",
          name: "RISC-V Processor Core",
          image: "/images/riscv-placeholder.png",
          description:
            "Design a full RISC-V 32-bit processor core, implementing instruction sets and pipelining concepts for SoC integration.",
          link: "#",
        },
        {
          label: "Hardware Acceleration",
          name: "FPGA Image Processing",
          image: "/images/image-processing-placeholder.png",
          description:
            "Accelerate image processing algorithms on FPGA, improving latency and performance over software-only implementations.",
          link: "#",
        },
        {
          label: "Advanced SoC",
          name: "Custom Floating-Point Unit",
          image: "/images/fpu-placeholder.png",
          description:
            "Design and integrate a high-performance FPU as a co-processor, exploring floating-point arithmetic and precision control.",
          link: "#",
        },
      ],
    },
  ];

  return (
    <section id="projects" className="bg-gray-100 py-16 px-8">
      <h2
        className="text-2xl font-bold text-black text-center mb-12"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Project Categories: Your Path to VLSI Mastery
      </h2>

      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="p-6 rounded-xl bg-white shadow"
          >
            <h3
              className="text-xl font-semibold mb-2 text-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {cat.subtitle}
            </h3>
            <p
              className="mb-6 text-gray-700 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {cat.description}
            </p>

            <div className="flex gap-6 overflow-x-auto py-2">
              {cat.projects.map((proj) => (
                <a
                  key={proj.name}
                  href={proj.link}
                  className="flex-shrink-0 w-80 h-96 bg-white rounded-xl p-5 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    boxShadow: "0 0 10px 0 rgba(128, 0, 255, 0.3)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <div className="mb-3">
                    <span
                      className="text-xs font-medium text-blue-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {proj.label}
                    </span>
                  </div>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4
                    className="text-base font-semibold mb-2 text-black"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {proj.name}
                  </h4>
                  <p
                    className="text-gray-700 text-xs"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {proj.description}
                  </p>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    View Project Dojo
                  </button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

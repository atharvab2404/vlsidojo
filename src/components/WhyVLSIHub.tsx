import React from "react";
import { Cpu, Sparkles, Rocket } from "lucide-react";

export default function VLSIHub() {
  const sections = [
    {
      title: "The Problem with Today’s VLSI Education",
      icon: <Cpu className="w-8 h-8 text-white drop-shadow-md" />,
      points: [
        "College coursework feels too basic for industry needs.",
        "Students struggle to showcase practical projects.",
        "Industry-grade tools & concepts rarely taught in classrooms."
      ],
      gradient: "from-red-500 to-orange-400"
    },
    {
      title: "The VLSI Dojo Difference",
      icon: <Sparkles className="w-8 h-8 text-white drop-shadow-md" />,
      points: [
        "Learn by building — not just theory.",
        "Step-by-step, resume-ready projects.",
        "Real-world skills: critical thinking, collaboration."
      ],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "From Projects to Placements",
      icon: <Rocket className="w-10 h-10 text-white drop-shadow-md" />, // Larger & white for visibility
      points: [
        "Gain Verilog, SystemVerilog, EDA tools expertise.",
        "Targeted job roles: VLSI Design, Verification, FPGA.",
        "Stand out with advanced design projects."
      ],
      gradient: "from-pink-500 to-red-400"
    }
  ];

  return (
    <section className="w-full py-12 px-6 bg-gradient-to-b from-gray-50 to-gray-100 font-[Poppins]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${sec.gradient} mb-4`}
            >
              {sec.icon}
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              {sec.title}
            </h2>
            <ul className="space-y-2 text-gray-600 text-sm leading-relaxed">
              {sec.points.map((p, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 mt-1" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

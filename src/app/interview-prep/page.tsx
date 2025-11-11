"use client";

import Link from "next/link";
import { Cpu, BookOpen, Activity, CircuitBoard } from "lucide-react";

const subjects = [
  {
    id: "digital-design",
    title: "Digital Design",
    desc: "Logic design, timing, FSMs & more.",
    icon: <CircuitBoard className="w-12 h-12 text-amber-500" />,
  },
  {
    id: "computer-architecture",
    title: "Computer Architecture",
    desc: "Pipelines, caches, ISAs.",
    icon: <Cpu className="w-12 h-12 text-blue-500" />,
  },
  {
    id: "vlsi",
    title: "VLSI Design",
    desc: "CMOS, layouts, STA & fabrication.",
    icon: <BookOpen className="w-12 h-12 text-rose-500" />,
  },
  {
    id: "signals-systems",
    title: "Signals & Systems",
    desc: "LTI, Fourier, sampling.",
    icon: <Activity className="w-12 h-12 text-emerald-500" />,
  },
];

export default function InterviewPrepMain() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-amber-100 py-20 font-sans">
      <div className="max-w-[90rem] mx-auto px-8 lg:px-16">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight">
            <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
              Interview Preparation
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore curated topic hierarchies and structured explanations — designed to help you ace your next technical interview.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-12 justify-items-center">
          {subjects.map((s) => (
            <Link
              key={s.id}
              href={`/interview-prep/${s.id}`}
              className="group relative block w-full max-w-sm bg-white rounded-3xl p-10 border border-amber-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-300/10 to-pink-300/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

              {/* Icon */}
              <div className="flex justify-center mb-8">{s.icon}</div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-3 group-hover:text-amber-600 transition">
                {s.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-center text-base lg:text-lg leading-snug">
                {s.desc}
              </p>

              {/* Button */}
              <div className="mt-8 flex justify-center">
                <span className="text-amber-600 font-semibold text-lg group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

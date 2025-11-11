// src/app/interview-prep/page.tsx
import Link from "next/link";

const subjects = [
  { id: "digital-design", title: "Digital Design", desc: "Logic design, timing, FSMs & more." },
  { id: "computer-architecture", title: "Computer Architecture", desc: "Pipelines, caches, ISAs." },
  { id: "vlsi", title: "VLSI Design", desc: "CMOS, layouts, STA & fabrication." },
  { id: "signals-systems", title: "Signals & Systems", desc: "LTI, Fourier, sampling." },
];

export default function InterviewPrepMain() {
  return (
    <div className="w-full min-h-screen bg-[#f9f5f0] py-16">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Interview Preparation
        </h1>
        
        <p className="text-center text-gray-600 mb-12 text-lg">
          Explore subjects, curated topic hierarchies, and carefully structured explanations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((s) => (
            <Link
              key={s.id}
              href={`/interview-prep/${s.id}`}
              className="block p-6 bg-white rounded-2xl shadow-md border border-amber-300 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {s.title}
              </h2>
              <p className="text-gray-600">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

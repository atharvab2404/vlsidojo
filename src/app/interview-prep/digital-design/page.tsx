import Link from "next/link";
import { digitalDesignCurriculum, slugify } from "./curriculum";

export default function DigitalDesignMainPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Digital Design — Complete Curriculum
      </h1>

      <p className="text-gray-700 text-lg mb-10 leading-relaxed">
        This section covers everything from basic Boolean logic to advanced sequential design.
        Explore topics below or use the sidebar to quickly jump between subtopics.
      </p>

      {/* Curriculum List */}
      <div className="space-y-12">
        {digitalDesignCurriculum.map((hub) => (
          <div key={hub.hub}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {hub.hub}
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hub.subtopics.map((topic) => {
                const link = slugify(topic);
                return (
                  <li key={topic}>
                    <Link
                      href={`/interview-prep/digital-design/${link}`}
                      className="text-gray-700 hover:text-amber-700 transition"
                    >
                      • {topic}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* End section card */}
      <div className="mt-16 bg-gradient-to-r from-amber-100/80 to-pink-100/70 border border-amber-200 rounded-2xl shadow-md p-8 transition-all hover:shadow-lg">
        <p className="text-gray-800 text-lg font-semibold mb-2">
          💡 Pro Tip:
        </p>
        <p className="text-gray-700 text-[16px]">
          Visualize logic transitions and simulate timing early — your
          waveform intuition often reveals more than formulas ever could.
        </p>
      </div>
    </div>
  );
}

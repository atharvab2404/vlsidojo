import Link from "next/link";
import { computerArchitectureCurriculum, slugify } from "./curriculum";

export default function ComputerArchitectureMainPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Computer Architecture — Complete Curriculum
            </h1>

            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
                This section covers everything from instruction set architectures to advanced pipelining and memory hierarchies.
                Explore topics below or use the sidebar to quickly jump between subtopics.
            </p>

            {/* Curriculum List */}
            <div className="space-y-12">
                {computerArchitectureCurriculum.map((hub) => (
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
                                            href={`/interview-prep/computer-architecture/${link}`}
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
                    Always think about the Power/Performance/Area (PPA) trade-offs.
                    There is rarely a "perfect" architecture only the right one for a specific workload.
                </p>
            </div>
        </div>
    );
}

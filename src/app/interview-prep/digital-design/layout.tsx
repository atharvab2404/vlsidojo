import Link from "next/link";
import Navbar from "@/components/Navbar";
import { digitalDesignCurriculum, slugify } from "./curriculum";

export default function DigitalDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fdfaf7] flex flex-col">
      {/* ✅ Navbar Always Visible */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 border-r border-amber-300 bg-white p-6 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Digital Design</h2>

          <nav className="space-y-6">
            {digitalDesignCurriculum.map((hub) => (
              <div key={hub.hub}>
                <p className="text-gray-700 font-semibold text-lg">{hub.hub}</p>

                <ul className="pl-4 mt-2 space-y-1">
                  {hub.subtopics.map((st) => {
                    const link = slugify(st);
                    return (
                      <li key={st}>
                        <Link
                          href={`/interview-prep/digital-design/${link}`}
                          className="text-gray-600 hover:text-amber-600"
                        >
                          • {st}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-12">{children}</main>
      </div>
    </div>
  );
}

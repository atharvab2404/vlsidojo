import Sidebar from "./Sidebar";
import Navbar from "@/components/Navbar";
import MermaidInit from "@/components/MermaidInit";

export default function DigitalDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fffaf2] to-[#fff6e9] flex flex-col font-sans relative overflow-hidden">
      <MermaidInit />
      {/* Navbar */}
      <Navbar />

      {/* Decorative animated background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,220,150,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,180,200,0.2),_transparent_40%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-[0.05] pointer-events-none"></div>

      <div className="flex flex-1 pt-20 relative z-10">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 ml-80 p-10 lg:p-16 bg-gradient-to-br from-white/70 via-amber-50/40 to-pink-50/40 backdrop-blur-[2px] relative overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Heading section */}
            <div className="mb-12 pb-6 border-b border-amber-300/50">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Topic Overview
              </h1>
              <p className="text-gray-700 text-lg max-w-2xl">
                Deep dive into each digital concept with clarity and intuition.
              </p>
            </div>

            {/* Main content body */}
            <div className="prose prose-amber max-w-none text-gray-800 leading-relaxed text-[17px]">
              {children}
            </div>

            {/* End section card */}

          </div>
        </main>
      </div>
    </div>
  );
}

// import React from "react";
// import { Cpu, Sparkles, Rocket } from "lucide-react";

// export default function WhyVLSIDojo() {
//   const sections = [
//     {
//       title: "The Problem With VLSI Education",
//       desc: "Most students spend years learning theory but never touch real chip design workflows. Skills like verification, RTL debugging, synthesis, and STA are rarely taught with industry depth.",
//       highlight: "The academic → industry gap is wider than ever.",
//       icon: Cpu,
//       accent: "from-red-500/40 to-orange-500/40",

//       // ✅ NEW TECH-FUTURISTIC IMAGE (loads everywhere)
//       image:
//         "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=800&random=29342"

//     },
//     {
//       title: "VLSI Dojo Changes Everything",
//       desc: "We teach VLSI the way engineers actually work in companies — through hands-on RTL design, debugging, simulations, EDA toolflows, and real silicon-grade projects.",
//       highlight: "A dojo where you train like a real engineer.",
//       icon: Sparkles,
//       accent: "from-indigo-500/40 to-purple-500/40",
//       image:
//         "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
//     },
//     {
//       title: "A Path From Learning → Offers",
//       desc: "You build strong projects, master debugging, create a unique portfolio, and develop clarity of thought — standing out among thousands of candidates.",
//       highlight: "Skill → Portfolio → Interview → Offer.",
//       icon: Rocket,
//       accent: "from-pink-500/40 to-red-500/40",
//       image:
//         "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
//     }
//   ];

//   return (
//     <section
//       id="why-dojo"
//       className="relative w-full py-28 px-6 overflow-hidden bg-black"
//     >
//       {/* ✅ Animated Tech Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute top-40 -right-20 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[130px] animate-pulse"></div>
//         <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>

//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
//       </div>

//       {/* ✅ HERO TEXT */}
//       <div className="max-w-4xl mx-auto text-center relative z-10 mb-24">
//         <h1
//           className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
//           style={{ fontFamily: "'Montserrat', sans-serif" }}
//         >
//           Why <span className="text-indigo-400">VLSI Dojo</span> Exists
//         </h1>

//         <p
//           className="text-gray-300 text-sm md:text-lg mt-4 max-w-2xl mx-auto"
//           style={{ fontFamily: "'Inter', sans-serif" }}
//         >
//           A next-generation training space built for VLSI learners who want to
//           break the barrier between college learning and real chip-engineering.
//         </p>
//       </div>

//       {/* ✅ SECTIONS */}
//       <div className="relative z-10 space-y-32">
//         {sections.map((sec, i) => {
//           const Icon = sec.icon;

//           return (
//             <div
//               key={i}
//               className={`flex flex-col md:flex-row items-center gap-16 md:gap-20 ${
//                 i % 2 === 1 ? "md:flex-row-reverse" : ""
//               }`}
//             >
//               {/* ✅ TEXT */}
//               <div className="flex-1">
//                 <div className="relative">
//                   <div
//                     className={`absolute -top-6 -left-6 w-28 h-28 rounded-full bg-gradient-to-br ${sec.accent} blur-2xl opacity-50`}
//                   ></div>

//                   <Icon className="w-16 h-16 text-indigo-300 mb-6 relative z-10 drop-shadow-lg" />
//                 </div>

//                 <h2
//                   className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug"
//                   style={{ fontFamily: "'Montserrat', sans-serif" }}
//                 >
//                   {sec.title}
//                 </h2>

//                 <p
//                   className="text-gray-300 text-sm md:text-base leading-relaxed mb-4"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   {sec.desc}
//                 </p>

//                 <p
//                   className="text-indigo-300 font-semibold text-sm md:text-lg"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   {sec.highlight}
//                 </p>
//               </div>

//               {/* ✅ ILLUSTRATION WITH IMAGE */}
//               <div className="flex-1 relative">
//                 <div
//                   className={`
//                     absolute inset-0 
//                     bg-gradient-to-br ${sec.accent}
//                     blur-3xl opacity-50
//                   `}
//                 ></div>

//                 <div
//                   className="
//                     relative backdrop-blur-xl bg-white/5 
//                     rounded-3xl border border-white/10
//                     h-72 md:h-80 shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]
//                     overflow-hidden
//                   "
//                 >
//                   <img
//                     src={sec.image}
//                     alt={sec.title}
//                     className="w-full h-full object-cover opacity-80"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

//                   {/* Animated sheen */}
//                   <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
import React from "react";
import { Cpu, Sparkles, Rocket } from "lucide-react";

export default function WhyVLSIDojo() {
  const sections = [
    {
      title: "The Problem With VLSI Education",
      desc: "Most students spend years learning theory but never touch real chip design workflows. Skills like verification, RTL debugging, synthesis, and STA are rarely taught with industry depth.",
      highlight: "The academic → industry gap is wider than ever.",
      icon: Cpu,
      accent: "from-red-500/40 to-orange-500/40",
      image:
        "https://images.pexels.com/photos/25665871/pexels-photo-25665871.jpeg?auto=compress&cs=tinysrgb&h=800"
    },
    {
      title: "VLSI Dojo Changes Everything",
      desc: "We teach VLSI the way engineers actually work in companies — through hands-on RTL design, debugging, simulations, EDA toolflows, and real silicon-grade projects.",
      highlight: "A dojo where you train like a real engineer.",
      icon: Sparkles,
      accent: "from-indigo-500/40 to-purple-500/40",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "A Path From Learning → Offers",
      desc: "You build strong projects, master debugging, create a unique portfolio, and develop clarity of thought — standing out among thousands of candidates.",
      highlight: "Skill → Portfolio → Interview → Offer.",
      icon: Rocket,
      accent: "from-pink-500/40 to-red-500/40",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <section
      id="why-dojo"
      className="relative w-full py-28 px-6 overflow-hidden bg-black"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-purple-600/25 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-48 -right-32 w-[550px] h-[550px] bg-indigo-600/25 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-blue-500/25 rounded-full blur-[130px] animate-pulse"></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:60px_60px] opacity-25"></div>
      </div>

      {/* HERO TEXT */}
      <div className="max-w-4xl mx-auto text-center relative z-10 mb-24">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Why choose <span className="text-indigo-400">VLSI Dojo</span> 
        </h1>

        <p
          className="text-gray-300 text-sm md:text-lg mt-4 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A next-generation training space built for VLSI learners who want to
          break the barrier between college learning and real chip-engineering.
        </p>
      </div>

      {/* SECTION CARDS */}
      <div className="relative z-10 space-y-32">
        {sections.map((sec, i) => {
          const Icon = sec.icon;

          return (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-16 md:gap-20 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* =========================== */}
              {/* ✅ TEXT WITH PURPLE GLOW */}
              {/* =========================== */}
              <div className="flex-1 relative p-6 rounded-3xl">
                <div className="absolute inset-0 -z-10 bg-purple-500/10 blur-2xl rounded-3xl"></div>

                <div className="relative">
                  <div
                    className={`absolute -top-6 -left-6 w-28 h-28 rounded-full bg-gradient-to-br ${sec.accent} blur-2xl opacity-50`}
                  ></div>

                  <Icon className="w-16 h-16 text-indigo-300 mb-6 relative z-10 drop-shadow-lg" />
                </div>

                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {sec.title}
                </h2>

                <p
                  className="text-gray-300 text-sm md:text-base leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {sec.desc}
                </p>

                <p
                  className="text-indigo-300 font-semibold text-sm md:text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {sec.highlight}
                </p>
              </div>

              {/* IMAGE */}
              <div className="flex-1 relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sec.accent} blur-[90px] opacity-60`}
                ></div>

                <div
                  className="
                    relative backdrop-blur-xl bg-white/5 
                    rounded-3xl border border-white/10
                    h-72 md:h-80 shadow-[0_0_45px_-10px_rgba(0,0,0,0.9)]
                    overflow-hidden
                  "
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="w-full h-full object-cover opacity-85"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] animate-pulse"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

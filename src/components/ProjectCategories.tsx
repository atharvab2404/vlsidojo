// src/components/ProjectCategories.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { categories } from "@/data/projectCategories";


/** convert "**bold**" into <strong> for controlled data */
function renderBoldMarkdown(s: string) {
  const escaped = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/* Icons (inline SVGs) */
const IconCheck = ({ className = "text-green-400" }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLightbulb = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 18h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M10 22h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M12 2a6 6 0 00-4 10c0 1.7.8 3.2 2 4l0 0V18h4v-2l0 0c1.2-.8 2-2.3 2-4a6 6 0 00-4-10z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconTerminal = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    <circle cx="7.5" cy="9.5" r="0.9" fill="#ef4444" />
    <circle cx="11.5" cy="9.5" r="0.9" fill="#f59e0b" />
    <circle cx="15.5" cy="9.5" r="0.9" fill="#10b981" />
    <path d="M7 15h10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

const IconQuiz = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" fill="none" />
    <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2 2-2 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCaution = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l9 16H3L12 3z" stroke="currentColor" strokeWidth="1.25" fill="none" />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconInfo = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    <path d="M11.5 10h1v6h-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 8h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconWarning = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M12 9v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconProTips = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 12a3 3 0 116 0c0 2-3 4-3 4s-3-2-3-4z" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M12 2v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconEDA = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.1" fill="none" />
    <path d="M7 9h10M7 12h10M7 15h6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const IconFiles = ({ className = "text-fuchsia-400" }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 4h5l2 2h9v12H4z" stroke="currentColor" strokeWidth="1.25" fill="none" />
    <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

/**
 * DojoIntroModal
 */
function DojoIntroModal({
  proj,
  onClose,
  isPurchased,
  purchasedDojos,
}: {
  proj: any;
  onClose: () => void;
  isPurchased: boolean;
  purchasedDojos: string[];
}) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

  if (!proj) return null;

  const projId = proj.id ?? proj.name;
  const isAdded = items.some((i) => i.id === projId);

  const title = proj.name;
  const tagline = proj.tagline ?? proj.subtitle ?? proj.intro ?? "";
  const skills: string[] = proj.skills ?? [];

  // static learning toolkit (same for all dojos)
  const toolkit = [
    { title: "Explanation for key terms", icon: <IconLightbulb className="text-fuchsia-400" /> },
    { title: "Pseudocode practice section", icon: <IconTerminal className="text-fuchsia-400" /> },
    { title: "Quiz Section", icon: <IconQuiz className="text-fuchsia-400" /> },
    { title: "Common Pitfall warning section", icon: <IconCaution className="text-fuchsia-400" /> },
    { title: "Interesting facts", icon: <IconInfo className="text-fuchsia-400" /> },
    { title: "Design Warnings", icon: <IconWarning className="text-fuchsia-400" /> },
    { title: "Pro Tips", icon: <IconProTips className="text-fuchsia-400" /> },
    { title: "EDA playground environment with commercial tools", icon: <IconEDA className="text-fuchsia-400" /> },
    { title: "Complete project files along with solution", icon: <IconFiles className="text-fuchsia-400" /> },
  ];

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-[800px] rounded-xl shadow-2xl bg-slate-800 text-slate-300 overflow-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-slate-700 relative">
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 rounded-md p-1 text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            ✕
          </button>

          <h1 className="text-3xl font-bold text-slate-50">{title}</h1>
          <p className="italic text-slate-400 mt-2">{tagline}</p>
        </header>

        {/* Skills */}
        <section className="px-8 py-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold text-slate-50 mb-4">Skills &amp; Knowledge You Will Master</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <IconCheck />
                  </span>
                  <div className="text-sm text-slate-300">
                    <span dangerouslySetInnerHTML={{ __html: renderBoldMarkdown(skill) }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                Practical HDL and hardware design skills, testbenches, simulation flows, and resume-ready deliverables.
              </p>
            )}
          </div>
        </section>

        {/* Toolkit */}
        <section className="px-8 py-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold text-slate-50 mb-6">Your Learning Toolkit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkit.map((t, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg p-4 flex flex-col gap-3 min-h-[120px]">
                <div className="w-12 h-12 flex items-center justify-center mb-1">{t.icon}</div>
                <h4 className="text-sm font-semibold text-slate-50">{t.title}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Short practical content to help you learn {t.title.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="sticky bottom-0 p-6 border-t border-slate-700 bg-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-lg text-slate-300">Price</div>
            <div className="text-2xl font-bold text-slate-50">
              {proj.price ? `₹${proj.price}` : "Free / TBD"}
              {proj.originalPrice && <span className="ml-3 text-sm text-slate-500 line-through">₹{proj.originalPrice}</span>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isPurchased ? (
              <a
                href={proj.link}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-sky-500 to-sky-400 text-slate-900 font-semibold hover:brightness-105 transition"
              >
                🚀 Start Dojo
              </a>
            ) : isAdded ? (
              <Link
                href="/cart"
                className="px-5 py-3 rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 transition"
              >
                View Cart
              </Link>
            ) : (
              <button
                onClick={() =>
                  addItem(
                    {
                      id: projId,
                      title: proj.name,
                      price: proj.price ?? 499,
                      thumbnail: proj.image ?? "",
                      quantity: 1,
                    },
                    purchasedDojos
                  )
                }
                className="px-6 py-3 rounded-md bg-gradient-to-r from-sky-500 to-sky-400 text-slate-900 font-semibold hover:brightness-105 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * ProjectCategories
 */
export default function ProjectCategories() {
  const [purchasedDojos, setPurchasedDojos] = useState<string[]>([]);
  const [selectedProj, setSelectedProj] = useState<any | null>(null);

  const getProjId = (proj: any) => proj.id ?? proj.name;

  useEffect(() => {
    async function fetchPurchasedDojos() {
      try {
        const res = await fetch("/api/purchased-dojos");
        if (res.ok) {
          const data = await res.json();
          setPurchasedDojos(data?.purchased || []);
        }
      } catch (err) {
        console.error("Failed to fetch purchased dojos", err);
      }
    }
    fetchPurchasedDojos();
  }, []);

  return (
    <section id="projects" className="bg-gray-100 py-16 px-8">
      <h2 className="text-2xl font-bold text-black text-center mb-12" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Project Categories: Your Path to VLSI Mastery
      </h2>

      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="p-6 rounded-xl bg-white shadow">
            <h3 className="text-xl font-semibold mb-2 text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {cat.subtitle}
            </h3>
            <p className="mb-6 text-gray-700 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              {cat.description}
            </p>

            <div className="flex gap-6 overflow-x-auto py-2">
              {cat.projects.map((proj) => {
                const projId = getProjId(proj);

                return (
                  <div
                    key={projId}
                    className="flex-shrink-0 w-80 bg-white rounded-xl p-5 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{ boxShadow: "0 0 10px 0 rgba(128, 0, 255, 0.12)", fontFamily: "Inter, sans-serif" }}
                  >
                    <img src={proj.image} alt={proj.name} className="w-full h-50 object-cover rounded-md mb-3" />
                    <h4 className="text-base font-semibold mb-2 text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {proj.name}
                    </h4>
                    <p className="text-gray-700 text-xs mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                      {proj.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      {/* Always show View Dojo (even if purchased) */}
                      <button
                        onClick={() => setSelectedProj({ ...proj, id: projId })}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
                      >
                        View Dojo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProj && (
        <DojoIntroModal
          proj={selectedProj}
          onClose={() => setSelectedProj(null)}
          isPurchased={purchasedDojos.includes(selectedProj.id)}
          purchasedDojos={purchasedDojos}
        />
      )}
    </section>
  );
}
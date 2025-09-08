// src/components/ProjectCategories.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { categories } from "@/data/projectCategories";

/**
 * DojoIntroModal
 * Modal shows all details for a Dojo.
 * - If purchased → only "Start Dojo"
 * - If not purchased → "Add to Cart" + "Go to Cart"
 */
function DojoIntroModal({
  proj,
  onClose,
  isPurchased,
}: {
  proj: any;
  onClose: () => void;
  isPurchased: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

  if (!proj) return null;

  const projId = proj.id ?? proj.name;
  const isAdded = items.some((i) => i.id === projId);

  const intro = proj.intro ?? proj.description ?? "";
  const skills: string[] = proj.skills ?? [];
  const knowledge: string[] = proj.knowledge ?? [];
  const features: string[] = proj.features ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            {proj.name}
          </h2>

          {/* Intro */}
          <p className="text-sm text-slate-700 mb-4">{intro}</p>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-slate-800">
                Skills you'll gain
              </h3>
              {skills.length ? (
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  Practical HDL & hardware design skills (details in curriculum).
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-slate-800">
                Knowledge gain
              </h3>
              {knowledge.length ? (
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {knowledge.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  Theory and practical trade-offs you'll learn during this Dojo.
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-slate-800">
                Features
              </h3>
              {features.length ? (
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  Step-by-step guide, testbenches, and a resume-ready deliverable.
                </p>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-6 border-t pt-4 flex flex-col md:flex-row items-stretch gap-3">
            <div className="flex-1">
              <p className="text-sm text-slate-600 mb-1">Price</p>
              <p className="text-lg font-semibold">
                {proj.price ? `₹${proj.price}` : "Free / TBD"}
              </p>
            </div>

            {/* Conditional actions */}
            <div className="flex gap-3">
              {!isPurchased ? (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      addItem({
                        id: projId,
                        title: proj.name,
                        price: proj.price ?? 499,
                        thumbnail: proj.image ?? "",
                        quantity: 1,
                      })
                    }
                    disabled={isAdded}
                    className={`px-4 py-2 rounded-md text-white font-medium transition ${
                      isAdded
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isAdded
                      ? "✅ Added to Cart"
                      : `Add to Cart — ₹${proj.price ?? 499}`}
                  </button>

                  <Link
                    href="/cart"
                    className="px-4 py-2 rounded-md bg-white border text-slate-700 flex items-center"
                  >
                    Go to Cart
                  </Link>
                </div>
              ) : (
                <a
                  href={proj.link}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  🚀 Start Dojo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ProjectCategories
 * - Cards stay the same visually
 * - Only one button on cards: always "View Dojo"
 * - Popup modal handles Add to Cart / Start Dojo
 */
export default function ProjectCategories() {
  const [purchasedDojos] = useState<string[]>([]); // replace with backend data later
  const [selectedProj, setSelectedProj] = useState<any | null>(null);

  const getProjId = (proj: any) => proj.id ?? proj.name;

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
          <div key={cat.title} className="p-6 rounded-xl bg-white shadow">
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
              {cat.projects.map((proj) => {
                const projId = getProjId(proj);

                return (
                  <div
                    key={projId}
                    className="flex-shrink-0 w-80 bg-white rounded-xl p-5 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{
                      boxShadow: "0 0 10px 0 rgba(128, 0, 255, 0.12)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
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
                      className="text-gray-700 text-xs mb-3"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {proj.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() =>
                          setSelectedProj({ ...proj, id: projId })
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
                        style={{ fontFamily: "Inter, sans-serif" }}
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

      {/* Popup Modal */}
      {selectedProj && (
        <DojoIntroModal
          proj={selectedProj}
          onClose={() => setSelectedProj(null)}
          isPurchased={purchasedDojos.includes(selectedProj.id)}
        />
      )}
    </section>
  );
}

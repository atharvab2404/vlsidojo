"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { categories } from "../data/projectCategories"; // ✅ Import categories

export default function ProjectCategories() {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

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
                const projId = proj.id ?? proj.name;
                const isAdded = items.some((i) => i.id === projId);

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
                      {/* View button (Link) */}
                      <Link
                        href={proj.link}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        View Project Dojo
                      </Link>

                      {/* Inline Add-to-Cart button */}
                      <button
                        onClick={() =>
                          addItem({
                            id: projId,
                            title: proj.name,
                            price: proj.price ?? 499,
                            thumbnail: proj.image,
                            quantity: 1,
                          })
                        }
                        disabled={isAdded}
                        className={`px-4 py-2 rounded text-sm transition ${
                          isAdded
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {isAdded ? "✅ Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

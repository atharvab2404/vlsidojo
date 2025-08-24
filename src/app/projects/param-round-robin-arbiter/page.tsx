"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";

export default function Page() {
  const [module, setModule] = useState(1); // current module: 1,2,3
  const [readModules, setReadModules] = useState<boolean[]>([false, false, false]);

  const handleCheckboxChange = (index: number) => {
    const updated = [...readModules];
    updated[index] = !updated[index];
    setReadModules(updated);
  };

  useEffect(() => {
    // Disable text selection & copying (except inside .pseudo-code)
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".pseudo-code")) return;
      e.preventDefault();
    };
    const handleCopy = (e: ClipboardEvent) => {
      if ((e.target as HTMLElement).closest(".pseudo-code")) return;
      e.preventDefault();
    };
    const handleCut = (e: ClipboardEvent) => {
      if ((e.target as HTMLElement).closest(".pseudo-code")) return;
      e.preventDefault();
    };
    const handlePaste = (e: ClipboardEvent) => {
      if ((e.target as HTMLElement).closest(".pseudo-code")) return;
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <section className="bg-[#D1FAE5] min-h-screen py-12 px-4">
      <div className="mx-auto max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl inter-heading text-slate-900 tracking-tight">
            Parametrized Round-Robin Arbiter: Conceptual Design &amp; Verification Dojo
          </h1>
          <Link
            href="/#projects"
            className="text-black underline underline-offset-4"
          >
            ← Back to Projects
          </Link>
        </div>

        {/* Module 1 */}
        {module === 1 && (
          <Module1
            readModules={readModules}
            handleCheckboxChange={handleCheckboxChange}
            setModule={setModule}
          />
        )}

        {/* Module 2 */}
        {module === 2 && (
            <Module2
            readModules={readModules}
            handleCheckboxChange={handleCheckboxChange}
            setModule={setModule}
            />
        )}

        {/* Module 3 */}
        {module === 3 && (
            <Module3
            readModules={readModules}
            handleCheckboxChange={handleCheckboxChange}
            setModule={setModule}
            />
        )}
      </div>
    </section>
  );
}

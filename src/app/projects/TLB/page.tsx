"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";
import Module4 from "./Module4";
import FinalModule from "./FinalModule";

export default function Page() {
  const [module, setModule] = useState(1); // current module: 1,2,3,4
  const [readModules, setReadModules] = useState<boolean[]>([false, false, false]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCheckboxChange = (index: number) => {
    const updated = [...readModules];
    updated[index] = !updated[index];
    setReadModules(updated);
  };

  // ✅ Scroll to top whenever module changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [module]);

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
    <section className="bg-[#D1FAE5] min-h-screen py-12 px-4 flex relative">
      {/* Sidebar (separate & collapsible) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-52`} 
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-slate-800">Modules</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>
        <ul className="p-4 space-y-3">
          <li
            onClick={() => {
              setModule(1);
              setSidebarOpen(false);
            }}
            className={`cursor-pointer flex justify-between items-center p-2 rounded-md ${
              module === 1 ? "bg-emerald-100 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-black">Module 1</span>
            <span>{readModules[0] ? "✅" : "⬜"}</span>
          </li>
          <li
            onClick={() => {
              setModule(2);
              setSidebarOpen(false);
            }}
            className={`cursor-pointer flex justify-between items-center p-2 rounded-md ${
              module === 2 ? "bg-emerald-100 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-black">Module 2</span>
            <span>{readModules[1] ? "✅" : "⬜"}</span>
          </li>
          <li
            onClick={() => {
              setModule(3);
              setSidebarOpen(false);
            }}
            className={`cursor-pointer flex justify-between items-center p-2 rounded-md ${
              module === 3 ? "bg-emerald-100 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-black">Module 3</span>
            <span>{readModules[2] ? "✅" : "⬜"}</span>
          </li>
          <li
            onClick={() => {
              setModule(4);
              setSidebarOpen(false);
            }}
            className={`cursor-pointer flex justify-between items-center p-2 rounded-md ${
              module === 4 ? "bg-emerald-100 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-black">Module 4</span>
            <span>{readModules[3] ? "✅" : "⬜"}</span>
          </li>

        </ul>
      </div>

      {/* Sidebar Toggle Button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-20 bg-emerald-500 text-white px-3 py-2 rounded-md shadow-md"
        >
          ☰ Modules
        </button>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-slate-700 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl inter-heading text-slate-900 tracking-tight">
           Simple Transition Lookaside Buffer in verilog
          </h1>
          <Link
            href="/#projects"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
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
        {/* Module 4 */}
        {module === 4 && (
          <Module4
            readModules={readModules}
            handleCheckboxChange={handleCheckboxChange}
            setModule={setModule}
          />
        )}
        {/* Final Module (not in sidebar) */}
        {module === 5 && (
          <FinalModule
            readModules={readModules}
            setModule={setModule}
          />
        )}
      </div>
    </section>
  );
}
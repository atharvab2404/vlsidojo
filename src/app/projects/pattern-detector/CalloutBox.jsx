"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info, AlertTriangle, Lightbulb } from "lucide-react";

export default function CalloutBox({ type = "info", title, children }) {
  const [open, setOpen] = useState(false);

  // Styling per type
  const styles = {
    info: {
      border: "border-blue-400",
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    warning: {
      border: "border-yellow-400",
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    tip: {
      border: "border-green-400",
      bg: "bg-green-50",
      text: "text-green-800",
      icon: <Lightbulb className="w-5 h-5 text-green-500" />,
    },
  };

  const { border, bg, text, icon } = styles[type] || styles.info;

  return (
    <div className={`my-4 p-4 rounded-xl shadow-md border ${border} ${bg}`}>
      {/* Header (clickable) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className={`flex items-center gap-2 font-medium ${text}`}>
          {icon}
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* Expandable content */}
      {open && (
        <div className="mt-3 text-slate-700 leading-6">
          {children}
        </div>
      )}
    </div>
  );
}

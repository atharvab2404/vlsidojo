// src/app/components/SubtopicNav.tsx
"use client";

import Link from "next/link";

export default function SubtopicNav({ prev, next }) {
  return (
    <div className="flex justify-between mt-12 pt-8 border-t border-amber-300">
      {prev ? (
        <Link
          href={prev.href}
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-gray-800"
        >
          ← {prev.title}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-gray-800"
        >
          {next.title} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

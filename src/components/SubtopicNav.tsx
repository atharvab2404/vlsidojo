"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NavItem = {
  title: string;
  href: string;
} | null;

interface SubtopicNavProps {
  prev: NavItem;
  next: NavItem;
}

export default function SubtopicNav({ prev, next }: SubtopicNavProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-6 border-t border-gray-200">
      {/* Previous Button */}
      {prev ? (
        <Link
          href={prev.href}
          className="relative z-10 group flex items-center justify-start gap-3 px-6 py-4 w-full h-full rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
          <div className="text-left">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-amber-600/80 mb-0.5">Previous Topic</span>
            <span className="block text-base font-bold text-gray-800 group-hover:text-gray-900 line-clamp-1">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div aria-hidden="true" className="hidden md:block" />
      )}

      {/* Next Button */}
      {next ? (
        <Link
          href={next.href}
          className="relative z-10 group flex items-center justify-end gap-3 px-6 py-4 w-full h-full rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 text-right active:scale-[0.98]"
        >
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600/80 mb-0.5">Next Topic</span>
            <span className="block text-base font-bold text-gray-800 group-hover:text-gray-900 line-clamp-1">
              {next.title}
            </span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>
      ) : (
        <div aria-hidden="true" className="hidden md:block" />
      )}
    </div>
  );
}

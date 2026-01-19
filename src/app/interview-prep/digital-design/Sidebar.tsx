"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { digitalDesignCurriculum, slugify } from "./curriculum";
import { Cpu, ChevronDown, ChevronRight, Hash } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    // State to track open/closed hubs.
    // We initialize all to TRUE so users see the content, but they can collapse headers to declutter.
    const [openHubs, setOpenHubs] = useState<Record<string, boolean>>({});

    // Initialize state on mount to avoid hydration mismatch, or just set initial state carefully.
    // A cleaner approach for Client Components is to default open or closed.
    // Let's default to the hub containing the ACTIVE page being open, others closed? 
    // User asked to reduce clutter. So auto-expanding active hub is smart.
    useEffect(() => {
        const newOpenState: Record<string, boolean> = {};
        digitalDesignCurriculum.forEach((hub) => {
            // Check if this hub contains the active topic
            const hasActive = hub.subtopics.some(sub => pathname === `/interview-prep/digital-design/${slugify(sub)}`);
            // If active, open it. If not, keeping it closed reduces clutter as requested.
            // However, we should probably keep the FIRST one open by default if nothing is selected (Overview page).
            if (hasActive) {
                newOpenState[hub.hub] = true;
            } else {
                // For cleanliness, everything else closed unless it's the very first visit?
                // Let's default "Digital Logic Fundamentals" to open if pathname is just the root.
                if (pathname === '/interview-prep/digital-design' && hub.hub === "Digital Logic Fundamentals") {
                    newOpenState[hub.hub] = true;
                }
            }
        });
        // If user manually toggled, we shouldn't overwrite? For now let's just set initial.
        // Actually, simple "Start with all OPEN" is often preferred for visibility, but user said Cluttered.
        // Let's go with: Open Active Hub, others closed.
        if (Object.keys(newOpenState).length > 0) {
            setOpenHubs(prev => ({ ...prev, ...newOpenState }));
        } else {
            // Fallback: Open all if uncertain, or just the first.
            const initial = {};
            // digitalDesignCurriculum.forEach(h => initial[h.hub] = true);
            // setOpenHubs(initial);
        }
    }, [pathname]);

    const toggleHub = (hubName: string) => {
        setOpenHubs((prev) => ({ ...prev, [hubName]: !prev[hubName] }));
    };

    return (
        <aside className="w-80 bg-white border-r border-gray-100 flex flex-col fixed top-20 left-0 bottom-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50">
            {/* Header */}
            <div className="p-6 pb-2 shrink-0 bg-white/95 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                        <Cpu className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                            Digital Design
                        </h2>
                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide uppercase">
                            Curriculum
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <nav className="flex-1 overflow-y-auto px-4 pb-10 custom-scrollbar">
                <div className="space-y-1">
                    {digitalDesignCurriculum.map((hub) => {
                        const isOpen = openHubs[hub.hub];
                        // Check if any child is active to highlight the parent slightly or keep it open
                        const isActiveParent = hub.subtopics.some(sub => pathname === `/interview-prep/digital-design/${slugify(sub)}`);

                        return (
                            <div key={hub.hub} className="mb-2">
                                {/* Hub Header (Collapsible) */}
                                <button
                                    onClick={() => toggleHub(hub.hub)}
                                    className={`flex items-center justify-between w-full text-left px-3 py-3 rounded-lg transition-all duration-200 group
                    ${isActiveParent ? 'bg-amber-50/50' : 'hover:bg-gray-50'}
                  `}
                                >
                                    <span className={`text-sm font-bold tracking-tight transition-colors ${isActiveParent ? 'text-amber-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                        {hub.hub}
                                    </span>
                                    <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                </button>

                                {/* Subtopics List */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <ul className="min-h-0 space-y-0.5 ml-3 pl-3 border-l border-gray-100">
                                        {hub.subtopics.map((st) => {
                                            const link = slugify(st);
                                            const href = `/interview-prep/digital-design/${link}`;
                                            const isActive = pathname === href;

                                            return (
                                                <li key={st}>
                                                    <Link
                                                        href={href}
                                                        className={`
                                flex items-start gap-2 py-2 px-3 rounded-md text-[13px] leading-relaxed transition-all duration-200
                                ${isActive
                                                                ? 'bg-amber-100 text-amber-900 font-semibold shadow-sm translate-x-1'
                                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                                            }
                            `}
                                                    >
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-amber-500' : 'bg-gray-300'}`} />
                                                        {st}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Footer / Gradient fade */}
            <div className="h-12 bg-gradient-to-t from-white to-transparent pointer-events-none absolute bottom-0 left-0 right-0" />

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
        }
      `}</style>
        </aside>
    );
}

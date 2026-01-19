"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { computerArchitectureCurriculum, slugify } from "./curriculum";
import { Server, ChevronDown } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    // State to track open/closed hubs.
    const [openHubs, setOpenHubs] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const newOpenState: Record<string, boolean> = {};
        computerArchitectureCurriculum.forEach((hub) => {
            // Check if this hub contains the active topic
            const hasActive = hub.subtopics.some(sub => pathname === `/interview-prep/computer-architecture/${slugify(sub)}`);

            if (hasActive) {
                newOpenState[hub.hub] = true;
            } else {
                if (pathname === '/interview-prep/computer-architecture' && hub.hub === "Foundations of Computer Architecture") {
                    newOpenState[hub.hub] = true;
                }
            }
        });

        if (Object.keys(newOpenState).length > 0) {
            setOpenHubs(prev => ({ ...prev, ...newOpenState }));
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
                        <Server className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                            Computer Arch
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
                    {computerArchitectureCurriculum.map((hub) => {
                        const isOpen = openHubs[hub.hub];
                        const isActiveParent = hub.subtopics.some(sub => pathname === `/interview-prep/computer-architecture/${slugify(sub)}`);

                        return (
                            <div key={hub.hub} className="mb-2">
                                {/* Hub Header */}
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
                                            const href = `/interview-prep/computer-architecture/${link}`;
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

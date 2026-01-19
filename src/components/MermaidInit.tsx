"use client";

import { useEffect } from "react";
import mermaid from "mermaid";
import { usePathname } from "next/navigation";

export default function MermaidInit() {
    const pathname = usePathname();

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: "neutral",
            securityLevel: "loose",
            fontFamily: "inherit",
        });
    }, []);

    useEffect(() => {
        // Re-render diagrams when the route changes
        const timeout = setTimeout(() => {
            mermaid.contentLoaded();
        }, 100);
        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}

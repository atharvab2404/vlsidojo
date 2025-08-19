// components/Navbar.tsx
"use client"; // ← make entire Navbar client-side

import Image from "next/image";
import LoginButtons from "./LoginButtons";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-[#1a1a2e]/90 backdrop-blur-sm flex items-center justify-between px-8 py-4 border-b border-[#00a8ff]/20">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/logo.png" alt="VLSI Dojo" width={64} height={64} />
        <span
          className="text-2xl font-bold text-[#00a8ff]"
          style={{ fontFamily: "MyCustomFont" }}
        >
          VLSI Dojo
        </span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex space-x-8 font-medium">
        <li>
          <a href="#projects" className="hover:text-[#00a8ff] cursor-pointer">
            Projects
          </a>
        </li>
        <li>
          <a href="#why-dojo" className="hover:text-[#00a8ff] cursor-pointer">
            Why Dojo?
          </a>
        </li>
        <li>
          <a href="#blog" className="hover:text-[#00a8ff] cursor-pointer">
            Blog
          </a>
        </li>
      </ul>

      {/* Auth + Cart */}
      <div className="flex space-x-6 text-sm items-center">
        <button className="hover:text-[#00a8ff]">View Cart</button>
        <LoginButtons />
      </div>
    </nav>
  );
}

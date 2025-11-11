// "use client";

// import Image from "next/image";
// import LoginButtons from "./LoginButtons";
// import { useCartStore } from "@/store/cartStore";
// import Link from "next/link";

// interface NavbarProps {
//   showBorder?: boolean;
// }

// export default function Navbar({ showBorder = true }: NavbarProps) {
//   const { items } = useCartStore();
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-20 bg-[#1a1a2e]/90 backdrop-blur-sm 
//         flex items-center justify-between px-8 py-4 
//         ${showBorder ? "border-b border-[#00a8ff]/20" : ""} text-gray-200`}
//     >
//       {/* ✅ Logo → links to home */}
//       <Link href="/" className="flex items-center space-x-3 cursor-pointer">
//         <Image src="/logo.png" alt="VLSI Dojo" width={64} height={64} />
//         <span
//           className="text-2xl font-bold text-[#00a8ff]"
//           style={{ fontFamily: "MyCustomFont" }}
//         >
//           VLSI Dojo
//         </span>
//       </Link>

//       {/* Links */}
//       <ul className="hidden md:flex space-x-8 font-medium">
//         <li>
//           <a href="/#projects" className="hover:text-[#00a8ff] cursor-pointer">
//             Projects
//           </a>
//         </li>
//         <li>
//           <a href="/#why-dojo" className="hover:text-[#00a8ff] cursor-pointer">
//             Why Dojo?
//           </a>
//         </li>
//         <li>
//           <a href="/#blog" className="hover:text-[#00a8ff] cursor-pointer">
//             Blog
//           </a>
//         </li>
//       </ul>

//       {/* Auth + Cart */}
//       <div className="flex space-x-6 text-sm items-center">
//         <Link href="/cart" className="relative hover:text-[#00a8ff]">
//           View Cart
//           {itemCount > 0 && (
//             <span className="ml-1 bg-[#00a8ff] text-white rounded-full px-2 py-0.5 text-xs">
//               {itemCount}
//             </span>
//           )}
//         </Link>
//         <LoginButtons />
//       </div>
//     </nav>
//   );
// }
"use client";

import Image from "next/image";
import LoginButtons from "./LoginButtons";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

interface NavbarProps {
  showBorder?: boolean;
}

export default function Navbar({ showBorder = true }: NavbarProps) {
  const { items } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-30 
        flex items-center justify-between px-8 py-4
        bg-black/70 backdrop-blur-xl
        text-gray-200
        ${showBorder ? "border-b border-white/10" : ""}
      `}
    >

      {/* ✅ Background Glow Behind Navbar */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

        {/* Purple Glow */}
        <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-purple-600/25 rounded-full blur-[120px] animate-pulse"></div>

        {/* Indigo Glow */}
        <div className="absolute -top-10 right-10 w-[320px] h-[320px] bg-indigo-600/25 rounded-full blur-[140px] animate-pulse"></div>

        {/* Blue Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[240px] bg-blue-500/20 rounded-full blur-[110px] animate-pulse"></div>

        {/* Light Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      </div>

      {/* ✅ Logo → links to home */}
      <Link href="/" className="flex items-center space-x-3 cursor-pointer">
        <Image src="/logo.png" alt="VLSI Dojo" width={64} height={64} />
        <span
          className="text-2xl font-bold text-[#00a8ff]"
          style={{ fontFamily: "MyCustomFont" }}
        >
          VLSI Dojo
        </span>
      </Link>

      {/* ✅ Links */}
      <ul className="hidden md:flex space-x-8 font-medium">
        <li>
          <a href="/#projects" className="hover:text-[#00a8ff] cursor-pointer">
            Projects
          </a>
        </li>
        <li>
          <a href="/#why-dojo" className="hover:text-[#00a8ff] cursor-pointer">
            Why VLSI Dojo?
          </a>
        </li>
        <li>
          <a href="/#blog" className="hover:text-[#00a8ff] cursor-pointer">
            Interview Prep
          </a>
        </li>
        <li>
          <a href="/#blog" className="hover:text-[#00a8ff] cursor-pointer">
            1-1 Mentorship
          </a>
        </li>
        <li>
          <a href="/#blog" className="hover:text-[#00a8ff] cursor-pointer">
            Blog
          </a>
        </li>
      </ul>

      {/* ✅ Auth + Cart */}
      <div className="flex space-x-6 text-sm items-center">
        <Link href="/cart" className="relative hover:text-[#00a8ff]">
          View Cart
          {itemCount > 0 && (
            <span className="ml-1 bg-indigo-500 text-white rounded-full px-2 py-0.5 text-xs">
              {itemCount}
            </span>
          )}
        </Link>
        <LoginButtons />
      </div>
    </nav>
  );
}

import React from "react";

export default function Hero() {
  return (
    <section className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center relative">
      {/* Top Navigation */}
      <div className="absolute top-0 w-full flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">VLSI Dojo</div>
        {/* Nav Links */}
        <nav className="flex gap-6 text-lg">
          <a href="#why" className="hover:text-yellow-400">Why VLSI Dojo</a>
          <a href="#projects" className="hover:text-yellow-400">Projects</a>
          <a href="#blog" className="hover:text-yellow-400">Blog</a>
          <a href="#cart" className="hover:text-yellow-400">Cart</a>
          <a href="#login" className="hover:text-yellow-400">Login</a>
        </nav>
      </div>

      {/* Center Content */}
      <h1 className="text-5xl font-bold text-center mb-4">
        The Launchpad for your VLSI career
      </h1>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold text-lg">
        Browse Projects
      </button>
    </section>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#1a1a2e] text-[#f0f0f0] font-inter min-h-screen flex flex-col overflow-hidden">
      {/* Background Animation Layer */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="w-full h-full animate-circuit"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="circuitPattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 H70 V70 H10 Z M40 10 V70 M10 40 H70"
                stroke="#00a8ff"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>

      {/* Overlay Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/60 to-[#1a1a2e] z-0" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-[#1a1a2e]/90 backdrop-blur-sm flex items-center justify-between px-8 py-4 border-b border-[#00a8ff]/20">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="VLSI Dojo" width={64} height={64} />
          <span className="text-2xl font-bold text-[#00a8ff]" style={{ fontFamily: 'MyCustomFont' }}>
            VLSI Dojo
          </span>
        </div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li className="hover:text-[#00a8ff] cursor-pointer">Projects</li>
          <li className="hover:text-[#00a8ff] cursor-pointer">Why Dojo?</li>
          <li className="hover:text-[#00a8ff] cursor-pointer">Blog</li>
        </ul>

        <div className="flex space-x-6 text-sm">
          <button className="hover:text-[#00a8ff]">View Cart</button>
          <button className="hover:text-[#00a8ff]">Sign In</button>
          <button className="hover:text-[#00a8ff]">Log In</button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center pt-24 px-8 lg:px-20 gap-12">
        {/* Left Column */}
        <div className="flex-1 max-w-xl">
          <h1 className="font-montserrat text-2xl md:text-4xl font-bold text-[#00a8ff] leading-snug">
            Stop Wondering What Hardware Project to Build.  
            Start Building Your Future.
          </h1>
          <h2 className="mt-4 text-lg md:text-xl text-[#f0f0f0] leading-snug">
            Build Your Career-Defining VLSI Portfolio. Go from Blank Page to Resume-Ready Project.
          </h2>
          <p className="mt-6 text-base md:text-lg text-[#d0d0d0] leading-relaxed">
            VLSI Dojo provides meticulously crafted, text-based guides for complex hardware projects. Master hardware design with our end-to-end guides and build the resume that gets you hired by top tech companies.
          </p>

          <div className="mt-8">
            <button className="bg-[#00a8ff] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#0090dd] transition-all">
              Explore Projects
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-[36rem] h-[36rem] relative overflow-hidden">
            <Image
              src="/img1.png"
              alt="Processor Render"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}

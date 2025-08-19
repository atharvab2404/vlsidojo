"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, easeOut } from "framer-motion";

// ✅ Import fonts
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "700" }); // bold
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] }); // regular/medium

const BlogSection = () => {
  const blogs = [
    { id: 1, title: "Mastering VLSI Design", description: "A beginner-friendly guide.", image: "/blogs/fpga-vs-asic.png", slug: "mastering-vlsi-design" },
    { id: 2, title: "FPGA vs ASIC", description: "Understand the key differences.", image: "/blogs/fpga-vs-asic.png", slug: "fpga-vs-asic" },
    { id: 3, title: "Timing Analysis Demystified", description: "Break down timing analysis.", image: "/blogs/fpga-vs-asic.png", slug: "timing-analysis-demystified" },
    { id: 4, title: "Power Optimization Techniques", description: "Reduce power consumption.", image: "/blogs/fpga-vs-asic.png", slug: "power-optimization-techniques" },
    { id: 5, title: "RTL Design Best Practices", description: "Tips to write efficient RTL code.", image: "/blogs/fpga-vs-asic.png", slug: "rtl-design-best-practices" },
    { id: 6, title: "Clock Tree Synthesis", description: "Deep dive into clock trees.", image: "/blogs/fpga-vs-asic.png", slug: "clock-tree-synthesis" },
    { id: 7, title: "Verilog for Beginners", description: "Intro to Verilog programming.", image: "/blogs/fpga-vs-asic.png", slug: "verilog-for-beginners" },
    { id: 8, title: "Physical Design Flow", description: "Complete physical design flow.", image: "/blogs/fpga-vs-asic.png", slug: "physical-design-flow" },
    { id: 9, title: "Blog 9", description: "Description 9.", image: "/blogs/fpga-vs-asic.png", slug: "blog-9" },
    { id: 10, title: "Blog 10", description: "Description 10.", image: "/blogs/fpga-vs-asic.png", slug: "blog-10" },
    { id: 11, title: "Blog 11", description: "Description 11.", image: "/blogs/fpga-vs-asic.png", slug: "blog-11" },
    { id: 12, title: "Blog 12", description: "Description 12.", image: "/blogs/fpga-vs-asic.png", slug: "blog-12" },
    { id: 13, title: "Blog 13", description: "Description 13.", image: "/blogs/fpga-vs-asic.png", slug: "blog-13" },
  ];

  const [visibleCount, setVisibleCount] = useState(8);

  const showMore = () => {
    setVisibleCount(blogs.length);
  };

  // ✅ Variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    // ✅ Added id for Navbar scroll
    <section id="blog" className="px-8 lg:px-20 py-16 bg-[#1a1a2e]">
      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`text-3xl mb-8 text-[#00a8ff] font-bold ${montserrat.className}`}
      >
        Latest Blogs
      </motion.h2>

      {/* Initial 8 blogs */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {blogs.slice(0, 8).map((blog) => (
          <div key={blog.id}>
            <motion.div variants={cardVariants}>
              <Link href={`/blog/${blog.slug}`}>
                <div className="bg-[#2e2e4d] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
                  <div className="relative w-full h-48">
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg text-white font-bold ${montserrat.className}`}>
                      {blog.title}
                    </h3>
                    <p className={`text-sm text-gray-300 mt-2 ${inter.className}`}>
                      {blog.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Show more blogs */}
      {visibleCount > 8 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {blogs.slice(8, visibleCount).map((blog) => (
            <div key={blog.id}>
              <motion.div variants={cardVariants}>
                <Link href={`/blog/${blog.slug}`}>
                  <div className="bg-[#2e2e4d] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
                    <div className="relative w-full h-48">
                      <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className={`text-lg text-white font-bold ${montserrat.className}`}>
                        {blog.title}
                      </h3>
                      <p className={`text-sm text-gray-300 mt-2 ${inter.className}`}>
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Show More Button */}
      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className={`bg-[#00a8ff] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0090dd] transition-all ${inter.className}`}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogSection;

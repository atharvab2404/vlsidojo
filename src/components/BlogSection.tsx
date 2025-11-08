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
    { id: 1, title: "The Chip that said 'Hello World'", description: "Story of the first Integrated Circuit", image: "/blogs/kilby.png", slug: "the-vlsi-roadmap" },
    { id: 2, title: "The Calculator War That Gave Us the Modern CPU ", description: "The Story of the Intel 4004", image: "/blogs/intel4.png", slug: "chipwar" },
    { id: 3, title: "From Idea to Silicon: The Journey of a MicroChip", description: "Understanding the ASIC Design Flow.", image: "/blogs/vlsi.png", slug: "asic" },
    { id: 4, title: "Low Power Design in VLSI: Clock Gating vs. Power Gating", description: "Clock Gating vs. Power Gating: The VLSI battle against power.", image: "/blogs/vlsi.png", slug: "powerplay" },
 
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
                  <div className="relative w-full h-65">
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

import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// Montserrat for headings
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"], // Bold for hero headings
});

// Inter for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"], // Normal + medium for body and subheadings
});

export const metadata: Metadata = {
  title: "VLSI Dojo",
  description: "Build resume-worthy VLSI projects for your career.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#1a1a2e] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}

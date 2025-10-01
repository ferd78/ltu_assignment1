"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const bgClass = mounted
    ? theme === "dark"
      ? "bg-lighterblue"
      : "bg-tealzero"
    : "bg-tealzero"; 

  return (
    <div>
      {/* Top Row */}
      <div className="flex justify-between pt-5 px-6 pb-5">
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          <div className="flex items-center justify-center gap-2">
            {/* ✅ use Next.js <Image /> instead of <img /> */}
            <Image src="/la-trobe.png" width={20} height={20} alt="La Trobe Logo" />
            <p>LTU Assignment 1</p>
          </div>
        </h2>
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          Student: 22586555
        </h2>
      </div>

      {/* Nav Links */}
      <div className="flex justify-center pb-4">
        <div
          className={`${bgClass} transition-all duration-200 w-98/100 h-18 rounded-xl flex items-center gap-14 px-4 text-white font-semibold text-md`}
        >
          <Link href="/" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Tabs
          </Link>
          <Link href="/prelabquestions" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Pre-Lab Questions
          </Link>
          <Link href="/escaperoom" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Escape Room
          </Link>
          <Link href="/codingraces" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Coding Races
          </Link>

          <div className="ml-auto px-1 flex items-center gap-4">
            <Link href="/about" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
              About
            </Link>
            <RxHamburgerMenu size={30} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

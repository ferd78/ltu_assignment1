"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import NavBar from "./NavBar";
import ToggleButton from "./ToggleButton";
import Footer from "./Footer";

export default function ThemedLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const bgClass = mounted
    ? theme === "dark"
    ? "bg-darkblue"
    : "bg-teal"
    : "bg-teal";

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${bgClass}`}>
      <NavBar />
      <ToggleButton />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

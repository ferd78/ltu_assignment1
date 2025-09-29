"use client";

import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="bg-amber-500 h-10 w-24 ml-auto mr-5 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ease-in-out" />
    );
  }

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-amber-500"
      } h-10 w-24 ml-auto mr-5 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ease-in-out`}
    >
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <>
            <IoMoonSharp size={18} color="grey" />
            <h2 className="font-semibold text-gray-400">Dark</h2>
          </>
        ) : (
          <>
            <IoSunnySharp size={18} color="gold" />
            <h2 className="font-semibold text-amber-300">Light</h2>
          </>
        )}
      </button>
    </div>
  );
}

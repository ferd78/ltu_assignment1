'use client';
import NavBar from "./NavBar"
import ToggleButton from "./ToggleButton"
import { useTheme } from "next-themes"
import Footer from "./Footer";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`h-screen ${theme === "dark" ? "bg-darkblue" : "bg-teal" } transition-all duration-300`}>
      <NavBar />
      <ToggleButton />
      <Footer/>
    </div>
  )
}

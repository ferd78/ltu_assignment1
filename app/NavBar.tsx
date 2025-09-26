import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function NavBar() {
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex justify-between pt-5 px-6 pb-5">
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          <div className="flex items-center justify-center gap-2">
            <img src={"/la-trobe.png"} width={20} height={20}></img>
            <p> LTU Assignment 1</p>
          </div>
          
        </h2>
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          Student: 22586555
        </h2>
      </div>

      <div className="flex justify-center pb-4">
        <div className={`${theme === "dark" ? "bg-lighterblue" : "bg-tealzero"} transition-all duration-200 w-98/100 h-18 rounded-xl flex items-center gap-14 px-4 text-white font-semibold text-md`}>
          <h2 className="hover:underline underline-offset-4 duration-500 transition-all cursor-pointer">
            Tabs
          </h2>
          <h2 className="hover:underline underline-offset-4 duration-500 transition-all cursor-pointer">
            Pre-Lab Questions
          </h2>
          <h2 className="hover:underline underline-offset-4 duration-500 transition-all cursor-pointer">
            Escape Room
          </h2>
          <h2 className="hover:underline underline-offset-4 duration-500 transition-all cursor-pointer">
            Coding Races
          </h2>
          <div className="ml-auto px-1 flex items-center gap-4">
            <h2 className="hover:underline underline-offset-4 duration-500 transition-all cursor-pointer">
              About
            </h2>
            <RxHamburgerMenu size={30} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

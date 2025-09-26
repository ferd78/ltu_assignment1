import { useTheme } from "next-themes"


export default function Footer() {
    const {theme} = useTheme();
    const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center mb-4">
      <div className={`${theme === "dark" ? "bg-lighterblue" : "bg-tealzero"} h-6 w-98/100 rounded-md flex items-center justify-around gap-84`}>
        <p className="text-sm text-white font-semibold">© La Trobe University 2025</p>
        <p className="text-sm text-white font-semibold"> Student ID: 22586555</p>
        <p className="text-sm text-white font-semibold"> Date: {currentDate}</p>
      </div>
    </div>
  )
}

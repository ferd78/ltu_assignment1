import type { Metadata } from "next"
import { SUSE } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const suse = SUSE({
  subsets: ["latin"],
  weight: ["200"],
})

export const metadata: Metadata = {
  title: "LTU Assignment 1",
  description: "Generated for Assignment 1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${suse.className}`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

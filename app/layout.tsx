import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "ZHUJIAN | 主见 - 万物有主，心光自现",
  description: "创建你的个性化水晶手链，基于你的出生细节和个人喜好。",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen`}>
        <div className="bg-[#333333] text-white py-2 text-center text-sm">小红书用户内测中✨ ｜ 感恩遇见</div>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'
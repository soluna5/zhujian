"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#eeeeee]">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center md:w-1/3">
          <button className="md:hidden mr-4" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm uppercase tracking-wider hover:text-[#999999]">
              首页
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-wider hover:text-[#999999]">
              关于我们
            </Link>
          </nav>
        </div>

        <div className="md:w-1/3 flex justify-center">
          <Link href="/" className="text-2xl font-playfair tracking-widest">
            ZHUJIAN
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 space-x-4">
          <button aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href="/" className="text-xl uppercase tracking-wider" onClick={() => setMenuOpen(false)}>
              首页
            </Link>
            <Link href="/about" className="text-xl uppercase tracking-wider" onClick={() => setMenuOpen(false)}>
              关于我们
            </Link>
            <Link href="/create" className="text-xl uppercase tracking-wider" onClick={() => setMenuOpen(false)}>
              创建你的手链
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}


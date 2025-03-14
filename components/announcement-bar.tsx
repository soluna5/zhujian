"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[#333333] text-white py-2 relative">
      <div className="container mx-auto text-center text-xs px-8">
        <p>全场订单满¥500包邮 | 每一款手链都经过能量净化</p>
      </div>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  )
}


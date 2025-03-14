"use client"

import type React from "react"
import { useEffect, useState } from "react"

const MagicAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
        <div className="text-white text-2xl font-playfair mb-4">正在生成你的魔法手链</div>
        <div className="w-64 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-white mt-2">{progress}%</div>
        <div className="text-white text-lg mt-4 animate-pulse">✨ 连接宇宙能量 ✨</div>
      </div>
    </div>
  )
}

export default MagicAnimation


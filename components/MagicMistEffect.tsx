"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface MagicMistEffectProps {
  children: React.ReactNode
}

const MagicMistEffect: React.FC<MagicMistEffectProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty("--mouse-x", `${x}px`)
      container.style.setProperty("--mouse-y", `${y}px`)
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="magic-mist-container">
      <div className="magic-mist"></div>
      {children}
    </div>
  )
}

export default MagicMistEffect


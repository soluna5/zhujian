"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Crystal {
  name: string
  color: string
}

interface DetailedBraceletViewProps {
  crystals: Crystal[]
}

const DetailedBraceletView: React.FC<DetailedBraceletViewProps> = ({ crystals }) => {
  // Assuming a standard bracelet has 21 beads
  const standardBeadCount = 21
  const beads = [...crystals, ...Array(standardBeadCount - crystals.length).fill({ name: "Spacer", color: "#d1d5db" })]

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">详细手链视图</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {beads.map((crystal, index) => (
          <motion.div
            key={index}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium text-white"
            style={{ backgroundColor: crystal.color }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={crystal.name}
          >
            {index + 1}
          </motion.div>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        <p>标准手链：约 {standardBeadCount} 颗珠子</p>
        <p>初始珠子位置：1号位（靠近搭扣处）</p>
      </div>
    </div>
  )
}

export default DetailedBraceletView


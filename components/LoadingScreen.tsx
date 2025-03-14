"use client"

import { Crystal } from "@/lib/crystalData"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  selectedCrystal: Crystal
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ selectedCrystal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-48 h-48 mx-auto relative"
        >
          <img 
            src={selectedCrystal.images.raw} 
            alt={selectedCrystal.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
        <h3 className="mt-6 text-xl font-medium text-gray-800">{selectedCrystal.name}</h3>
        <p className="mt-2 text-gray-500">正在为您生成手链...</p>
      </div>
    </div>
  )
} 
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Crystal {
  name: string
  color: string
  rawImage?: string
}

interface ComplexMagicAnimationProps {
  selectedCrystals: Crystal[]
}

const ComplexMagicAnimation: React.FC<ComplexMagicAnimationProps> = ({ selectedCrystals }) => {
  const [progress, setProgress] = useState(0)
  const [showZodiac, setShowZodiac] = useState(false)
  const [visibleCrystals, setVisibleCrystals] = useState<number[]>([])
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // 进度条动画
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prevProgress + 0.5 // 减慢进度条速度
      })
    }, 50)

    // 星盘显示动画
    const zodiacTimer = setTimeout(() => setShowZodiac(true), 1000)

    // 计算每个水晶应该在什么进度值时出现
    const crystalProgressPoints = selectedCrystals.map((_, index) => 
      Math.floor(20 + (60 * index / (selectedCrystals.length - 1)))
    )

    // 水晶显示动画 - 根据进度控制
    const crystalTimer = setInterval(() => {
      setProgress(currentProgress => {
        setVisibleCrystals(prev => {
          const nextCrystalIndex = crystalProgressPoints.findIndex(point => 
            point <= currentProgress && !prev.includes(crystalProgressPoints.indexOf(point))
          )
          if (nextCrystalIndex !== -1 && !prev.includes(nextCrystalIndex)) {
            return [...prev, nextCrystalIndex]
          }
          return prev
        })
        return currentProgress
      })
    }, 100)

    // 动画阶段控制
    const phaseTimer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 3000)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(zodiacTimer)
      clearInterval(crystalTimer)
      clearInterval(phaseTimer)
    }
  }, [selectedCrystals.length])

  const getPhaseText = () => {
    switch (animationPhase) {
      case 0:
        return "“我接受命运的馈赠”"
      case 1:
        return "“我感受到自然的力量”"
      case 2:
        return "“我看见心目中的美好生活”"
      case 3:
        return "“我成功清理了负能量”"
      default:
        return "万物有主，心光自现"
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
      <div className="text-center p-12 rounded-2xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg border border-white/20">
        <div className="relative w-[400px] h-[400px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showZodiac ? 1 : 0, scale: showZodiac ? 1 : 0.8 }}
            transition={{ duration: 1 }}
            className="w-full h-full rounded-full"
            style={{
              animation: showZodiac ? "spin 60s linear infinite" : "none",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-red-500/30 animate-pulse" />
          </motion.div>
          <AnimatePresence>
            {visibleCrystals.map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 50 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="absolute"
                style={{
                  top: `${50 + 40 * Math.sin((index * 2 * Math.PI) / selectedCrystals.length)}%`,
                  left: `${50 + 40 * Math.cos((index * 2 * Math.PI) / selectedCrystals.length)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  className="relative w-16 h-16"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {selectedCrystals[index].rawImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedCrystals[index].rawImage}
                        alt={selectedCrystals[index].name}
                        width={64}
                        height={64}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                    </div>
                  ) : (
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: selectedCrystals[index].color }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ 
                      background: `radial-gradient(circle, ${selectedCrystals[index].color}40 0%, transparent 70%)`,
                      border: `2px solid ${selectedCrystals[index].color}40`
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 px-4 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  {selectedCrystals[index].name}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          className="text-white text-2xl font-playfair mb-8"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          主见·璇玑为您选石
        </motion.div>
        <div className="relative w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden backdrop-blur-md border border-white/20 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 blur-sm"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/90 via-pink-500/90 to-red-500/90 rounded-full progress-indicator"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            data-progress={Math.round(progress)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20"></div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        </div>
        <div className="text-white/90 text-base font-bold mt-2">
          {Math.round(progress)}%
        </div>
        <motion.div
          className="text-white/90 text-lg mt-8 font-medium"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {getPhaseText()}
        </motion.div>
      </div>
    </div>
  )
}

export default ComplexMagicAnimation


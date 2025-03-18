"use client"

import React from "react"
import Image from "next/image"
import { Crystal } from "@/lib/crystalData"
import { generateBeadLayout } from "@/lib/braceletUtils"

export interface Bead {
  position: number
  type: "destiny" | "function" | "correction"
  shape: "round" | "spacer"
  code: string
  imageUrl: string
}

interface BraceletViewer3DProps {
  size: "large" | "medium" | "small"
  destinyStones: Crystal[]
  functionalStones: Crystal[]
  correctiveStones: Crystal[]
  layout?: Bead[]
  onLayoutGenerated?: (layout: Bead[]) => void
}

const BraceletViewer = ({ size, beads }: { size: string, beads: Bead[] }) => {
  // 根据尺寸设置珠子大小，移动端尺寸稍小
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const beadSize = size === "large" 
    ? (isMobile ? 28 : 34) 
    : size === "medium" 
    ? (isMobile ? 24 : 28) 
    : (isMobile ? 18 : 20);
  
  // 对珠子按位置排序，但对于粗手链，把功能石垫片放在最后渲染（置于顶层）
  const sortedBeads = [...beads].sort((a, b) => {
    if (size === "large") {
      if (a.type === "function" && a.shape === "spacer") return 1;
      if (b.type === "function" && b.shape === "spacer") return -1;
    }
    return a.position - b.position;
  });
  
  // 根据设备类型调整容器尺寸
  const containerSize = isMobile ? 280 : 300;
  const radius = size === "large" 
    ? (isMobile ? 90 : 103) 
    : size === "medium" 
    ? (isMobile ? 105 : 120) 
    : (isMobile ? 115 : 130);
  
  return (
    <div className="relative w-full aspect-square bg-[#f8f5f0] rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative w-[${containerSize}px] h-[${containerSize}px]`}>
          {sortedBeads.map((bead, index) => {
            // 计算珠子在圆形上的位置
            const angle = (index / sortedBeads.length) * Math.PI * 2;
            
            // 计算珠子尺寸和位置
            const isRound = bead.shape === "round";
            // 中等手链的功能石设置为一个正常尺寸，一个小尺寸
            let currentBeadSize = beadSize;
            if (size === "medium" && bead.type === "function" && bead.shape === "round") {
              const funcStones = sortedBeads.filter(b => b.type === "function" && b.shape === "round");
              const isFirstFuncStone = funcStones[0].position === bead.position;
              currentBeadSize = isFirstFuncStone 
                ? (isMobile ? 24 : 28) 
                : (isMobile ? 20 : 22);
            }
            
            let containerWidth = isRound ? currentBeadSize : currentBeadSize / 2.5;
            const containerHeight = currentBeadSize;
            
            let rotation = 0;
            let adjustedLeft = Math.cos(angle) * radius + (containerSize/2) - containerWidth/2;
            let adjustedTop = Math.sin(angle) * radius + (containerSize/2) - containerHeight/2;
            
            if (bead.shape === "spacer" && index > 0) {
              // 计算前一个珠子的位置
              const prevAngle = ((index - 1) / sortedBeads.length) * Math.PI * 2;
              const prevLeft = Math.cos(prevAngle) * radius + (containerSize/2);
              const prevTop = Math.sin(prevAngle) * radius + (containerSize/2);
              
              // 计算后一个珠子的位置
              const nextAngle = ((index + 1) % sortedBeads.length) / sortedBeads.length * Math.PI * 2;
              const nextLeft = Math.cos(nextAngle) * radius + (containerSize/2);
              const nextTop = Math.sin(nextAngle) * radius + (containerSize/2);
              
              // 计算两个圆珠之间的方向向量
              const dx = nextLeft - prevLeft;
              const dy = nextTop - prevTop;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // 计算垫片的宽度
              const beadRadius = currentBeadSize / 2;
              const gapDistance = distance - beadRadius * 2;
              const idealWidth = gapDistance * (isMobile ? 0.7 : 0.8); // 移动端垫片稍窄
              
              // 计算两个圆珠的中点
              const centerX = (prevLeft + nextLeft) / 2;
              const centerY = (prevTop + nextTop) / 2;
              
              adjustedLeft = centerX - idealWidth/2;
              adjustedTop = centerY - containerHeight/2;
              
              const tangentAngle = Math.atan2(dy, dx) * (180/Math.PI);
              const extraRotation = (size === "large" && bead.type === "function") ? 90 : 0;
              rotation = tangentAngle + extraRotation;
              
              if (rotation > 360) rotation -= 360;
              containerWidth = idealWidth;
            }

            return (
              <div
                key={`${bead.code}-${index}`}
                className={`absolute ${isRound ? 'rounded-full' : 'rounded-[40%]'} overflow-hidden`}
                style={{
                  left: `${adjustedLeft}px`,
                  top: `${adjustedTop}px`,
                  width: `${containerWidth}px`,
                  height: `${containerHeight}px`,
                  transform: bead.shape === "spacer" ? `rotate(${rotation}deg)` : '',
                }}
              >
                <Image
                  src={bead.imageUrl}
                  alt={`${bead.type} stone`}
                  width={currentBeadSize}
                  height={currentBeadSize}
                  className={`${isRound ? 'rounded-full' : 'rounded-[40%]'} object-cover w-full h-full`}
                  priority={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BraceletViewer3D: React.FC<BraceletViewer3DProps> = (props) => {
  const { size, destinyStones, functionalStones, correctiveStones, layout, onLayoutGenerated } = props;
  
  // 如果已有布局就使用现有布局，否则生成新布局
  const beads = layout || (() => {
    const newLayout = generateBeadLayout({
      size,
      destinyStones,
      functionalStones,
      correctiveStones
    });
    // 通知父组件新生成的布局
    onLayoutGenerated?.(newLayout);
    return newLayout;
  })();
  
  return <BraceletViewer size={size} beads={beads} />;
};

export default BraceletViewer3D;


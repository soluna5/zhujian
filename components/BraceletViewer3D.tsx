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
  // 根据尺寸设置珠子大小
  const beadSize = size === "large" ? 34 : size === "medium" ? 28 : 20;
  
  // 对珠子按位置排序，但对于粗手链，把功能石垫片放在最后渲染（置于顶层）
  const sortedBeads = [...beads].sort((a, b) => {
    if (size === "large") {
      if (a.type === "function" && a.shape === "spacer") return 1;
      if (b.type === "function" && b.shape === "spacer") return -1;
    }
    return a.position - b.position;
  });
  
  return (
    <div className="relative w-full h-[400px] bg-[#f8f5f0] rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[300px] h-[300px]">
          {sortedBeads.map((bead, index) => {
            // 计算珠子在圆形上的位置
            const angle = (index / sortedBeads.length) * Math.PI * 2;
            // 根据手链尺寸调整半径，粗手链和中等手链更紧凑
            const radius = size === "large" ? 103 : size === "medium" ? 120 : 130;
            
            // 计算珠子尺寸和位置
            const isRound = bead.shape === "round";
            // 中等手链的功能石设置为一个正常尺寸，一个小尺寸
            let currentBeadSize = beadSize;
            if (size === "medium" && bead.type === "function" && bead.shape === "round") {
              // 第一个功能石正常尺寸，第二个功能石小一些
              const funcStones = sortedBeads.filter(b => b.type === "function" && b.shape === "round");
              const isFirstFuncStone = funcStones[0].position === bead.position;
              currentBeadSize = isFirstFuncStone ? 28 : 22; // 第一个28px，第二个22px
            }
            
            let containerWidth = isRound ? currentBeadSize : currentBeadSize / 2.5;
            const containerHeight = currentBeadSize;
            
            let rotation = 0;
            let adjustedLeft = Math.cos(angle) * radius + 150 - containerWidth/2;
            let adjustedTop = Math.sin(angle) * radius + 150 - containerHeight/2;
            
            if (bead.shape === "spacer" && index > 0) {
              // 计算前一个珠子的位置
              const prevAngle = ((index - 1) / sortedBeads.length) * Math.PI * 2;
              const prevLeft = Math.cos(prevAngle) * radius + 150;
              const prevTop = Math.sin(prevAngle) * radius + 150;
              
              // 计算后一个珠子的位置
              const nextAngle = ((index + 1) % sortedBeads.length) / sortedBeads.length * Math.PI * 2;
              const nextLeft = Math.cos(nextAngle) * radius + 150;
              const nextTop = Math.sin(nextAngle) * radius + 150;
              
              // 计算两个圆珠之间的方向向量
              const dx = nextLeft - prevLeft;
              const dy = nextTop - prevTop;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // 计算垫片的宽度应该是多少才能刚好填充两个圆珠之间的间隙
              // 考虑圆珠的半径和垫片的宽度
              const beadRadius = currentBeadSize / 2;
              const gapDistance = distance - beadRadius * 2; // 两个圆珠之间的实际间隙
              
              // 调整垫片的宽度，使其更好地填充间隙，但保持窄一些
              const idealWidth = gapDistance * 0.8; // 填充80%的间隙
              
              // 计算两个圆珠的中点
              const centerX = (prevLeft + nextLeft) / 2;
              const centerY = (prevTop + nextTop) / 2;
              
              // 直接将垫片放在中点位置
              adjustedLeft = centerX - idealWidth/2;
              adjustedTop = centerY - containerHeight/2;
              
              // 计算切线角度（垂直于半径方向）
              const tangentAngle = Math.atan2(dy, dx) * (180/Math.PI);
              
              // 根据手链尺寸和垫片类型决定旋转方向
              // 对于粗手链的功能石垫片，我们需要垂直于切线方向（额外旋转90度）
              const extraRotation = (size === "large" && bead.type === "function") ? 90 : 0;
              rotation = tangentAngle + extraRotation;
              
              // 确保角度在合理范围内
              if (rotation > 360) rotation -= 360;
              
              // 更新容器宽度
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


import { Crystal } from "./crystalData"
import { Bead } from "@/components/BraceletViewer3D"
import { crystalData } from './crystalData'
import { calculateBaZi, BaZiResult } from './bazi'
import { PrimaryNeed, CommonSituation, Impression, Potential, HealthIssue } from './questionnaire'
import { selectCrystals } from './crystals'

// 导入或定义所需类型
type BraceletSize = "small" | "medium" | "large"

interface Bracelet {
  crystals: Crystal[]
  properties: Array<{
    title: string
    description: string
  }>
  imageUrl: string
  size: BraceletSize
  crystalImages: string[]
}

interface BraceletConfig {
  size: BraceletSize
  destinyStones: Crystal[]
  functionalStones: Crystal[]
  correctiveStones: Crystal[]
}

interface GenerateBeadLayoutProps {
  size: "large" | "medium" | "small"
  destinyStones: Crystal[]
  functionalStones: Crystal[]
  correctiveStones: Crystal[]
}

// 辅助函数：生成随机位置
const getRandomPosition = (availablePositions: number[]): number => {
  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomIndex];
};

// 辅助函数：从数组中移除指定位置
const removePosition = (positions: number[], position: number): void => {
  const index = positions.indexOf(position);
  if (index > -1) {
    positions.splice(index, 1);
  }
};

// 辅助函数：获取不能使用的相邻位置
const getAdjacentPositions = (position: number, totalPositions: number): number[] => {
  const adjacent = [(position - 1 + totalPositions) % totalPositions, (position + 1) % totalPositions];
  return adjacent;
};

// 辅助函数：从数组中随机选择一个元素
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// 辅助函数：生成一组随机排列的功能石和命运石
const generateGroupPattern = (groupSize: number, functionalStone: Crystal, destinyStone: Crystal, startPosition: number): Bead[] => {
  // 创建位置数组
  const positions = Array.from({ length: groupSize }, (_, i) => startPosition + i);
  
  // 随机选择前半部分位置作为功能石位置
  const shuffledPositions = [...positions];
  for (let i = shuffledPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPositions[i], shuffledPositions[j]] = [shuffledPositions[j], shuffledPositions[i]];
  }
  
  // 前半部分为功能石，后半部分为命运石
  const functionalPositions = new Set(shuffledPositions.slice(0, groupSize / 2));
  
  // 生成珠子
  return positions.map(pos => {
    if (functionalPositions.has(pos)) {
      return {
        position: pos,
        type: "function",
        shape: "round",
        code: functionalStone.id,
        imageUrl: functionalStone.images.round
      };
    } else {
      return {
        position: pos,
        type: "destiny",
        shape: "round",
        code: destinyStone.id,
        imageUrl: destinyStone.images.round
      };
    }
  });
};

export const generateBeadLayout = ({ size, destinyStones, functionalStones, correctiveStones }: GenerateBeadLayoutProps): Bead[] => {
  if (!destinyStones.length || !correctiveStones.length || (size !== "large" && !functionalStones.length)) {
    throw new Error("Missing required stones for bracelet generation");
  }

  // 使用用户选择的第一个水晶
  const destinyStone = destinyStones[0];
  const functionalStone = functionalStones[0];
  const correctiveStone = correctiveStones[0];

  switch (size) {
    case "large": {
      // 粗手链：21颗珠子，1功能石垫片，1修正石垫片，19命运石
      const totalBeads = 21;
      const beads: Bead[] = [];
      const availablePositions = Array.from({ length: totalBeads }, (_, i) => i);
      
      // 添加功能石垫片
      const funcSpacerPos = getRandomPosition(availablePositions);
      beads.push({
        position: funcSpacerPos,
        type: "function",
        shape: "spacer",
        code: functionalStone.id,
        imageUrl: functionalStone.images.round
      });
      removePosition(availablePositions, funcSpacerPos);
      
      // 移除功能石垫片相邻的位置（用于放置修正石垫片）
      const adjacentToFuncSpacer = getAdjacentPositions(funcSpacerPos, totalBeads);
      const availableForCorrective = availablePositions.filter(pos => !adjacentToFuncSpacer.includes(pos));
      
      // 添加修正石垫片
      const corrSpacerPos = availableForCorrective[Math.floor(Math.random() * availableForCorrective.length)];
      beads.push({
        position: corrSpacerPos,
        type: "correction",
        shape: "spacer",
        code: correctiveStone.id,
        imageUrl: correctiveStone.images.round
      });
      removePosition(availablePositions, corrSpacerPos);
      
      // 填充命运石
      availablePositions.forEach(pos => {
        beads.push({
          position: pos,
          type: "destiny",
          shape: "round",
          code: destinyStone.id,
          imageUrl: destinyStone.images.round
        });
      });
      
      return beads;
    }
    
    case "medium": {
      // 中等手链：28颗珠子，1功能石，1功能石（原垫片位置），1修正石垫片，25命运石
      const totalBeads = 28;
      const beads: Bead[] = [];
      const availablePositions = Array.from({ length: totalBeads }, (_, i) => i);
      
      // 添加第一个功能石
      const funcStonePos = getRandomPosition(availablePositions);
      beads.push({
        position: funcStonePos,
        type: "function",
        shape: "round",
        code: functionalStone.id,
        imageUrl: functionalStone.images.round
      });
      removePosition(availablePositions, funcStonePos);
      
      // 移除第一个功能石相邻的位置，确保第二个功能石不会紧挨着
      const adjacentToFirstFunc = getAdjacentPositions(funcStonePos, totalBeads);
      const availableForSecondFunc = availablePositions.filter(pos => !adjacentToFirstFunc.includes(pos));
      
      // 添加第二个功能石（在非相邻位置）
      const funcStonePos2 = availableForSecondFunc[Math.floor(Math.random() * availableForSecondFunc.length)];
      beads.push({
        position: funcStonePos2,
        type: "function",
        shape: "round",
        code: functionalStone.id,
        imageUrl: functionalStone.images.round
      });
      removePosition(availablePositions, funcStonePos2);
      
      // 移除第二个功能石相邻的位置（用于放置修正石垫片）
      const adjacentToFuncStone = getAdjacentPositions(funcStonePos2, totalBeads);
      const availableForCorrective = availablePositions.filter(pos => !adjacentToFuncStone.includes(pos));
      
      // 添加修正石垫片
      const corrSpacerPos = availableForCorrective[Math.floor(Math.random() * availableForCorrective.length)];
      beads.push({
        position: corrSpacerPos,
        type: "correction",
        shape: "spacer",
        code: correctiveStone.id,
        imageUrl: correctiveStone.images.round
      });
      removePosition(availablePositions, corrSpacerPos);
      
      // 填充命运石
      availablePositions.forEach(pos => {
        beads.push({
          position: pos,
          type: "destiny",
          shape: "round",
          code: destinyStone.id,
          imageUrl: destinyStone.images.round
        });
      });
      
      return beads;
    }
    
    case "small": {
      // 细手链：45颗珠子，1修正石垫片，22功能石，22命运石（分两组）
      const totalBeads = 45;
      const groupSize = 22; // 每组22颗珠子
      
      // 修正石垫片固定在两组珠子中间
      const corrSpacerPos = groupSize;
      
      // 生成基础随机模式（11功能石 + 11命运石）
      const basePattern = generateGroupPattern(groupSize, functionalStone, destinyStone, 0);
      
      // 创建最终的珠子数组
      const beads: Bead[] = [];
      
      // 添加第一组珠子（反向顺序：从外到内）
      for (let i = groupSize - 1; i >= 0; i--) {
        beads.push({
          ...basePattern[i],
          position: groupSize - 1 - i
        });
      }
      
      // 添加修正石垫片在中间位置
      beads.push({
        position: corrSpacerPos,
        type: "correction",
        shape: "spacer",
        code: correctiveStone.id,
        imageUrl: correctiveStone.images.round
      });
      
      // 添加第二组珠子（反向顺序：从内到外）
      for (let i = 0; i < groupSize; i++) {
        beads.push({
          ...basePattern[i],
          position: corrSpacerPos + 1 + i
        });
      }
      
      return beads;
    }
    
    default:
      throw new Error(`Invalid bracelet size: ${size}`);
  }
};
import { PrimaryNeed, CommonSituation, Impression, Potential, HealthIssue } from './questionnaire';
import { crystalData, filterCrystalsByPrimaryNeed, filterCrystalsByCorrectiveSituation, Crystal } from './crystalData';

// 水晶优选打分系统
function scoreCrystal(
  crystal: Crystal,
  {
    mainElement,
    favorableElements,
    unfavorableElements,
    primaryNeed,
    situation,
    desiredImpression,
    desiredPotential,
    healthIssue,
    selectedCrystals = []
  }: {
    mainElement: string;
    favorableElements: string[];
    unfavorableElements: string[];
    primaryNeed: PrimaryNeed;
    situation: CommonSituation;
    desiredImpression: Impression;
    desiredPotential: Potential;
    healthIssue: HealthIssue;
    selectedCrystals?: Crystal[];
  }
): { score: number; details: Record<string, number> } {
  const details: Record<string, number> = {};
  let totalScore = 0;

  // 1. 命理相关分数（基于五行属性的匹配度）
  let destinyScore = 0;
  // 支持喜用神
  favorableElements.forEach(element => {
    if (crystal.destinyAttributes.supportiveElements.includes(element)) {
      destinyScore += 8;
    }
  });
  // 不支持忌用神
  unfavorableElements.forEach(element => {
    if (!crystal.destinyAttributes.supportiveElements.includes(element)) {
      destinyScore += 6;
    }
  });
  details['命理分数'] = destinyScore;
  totalScore += destinyScore;

  // 2. 功能属性分数（基于主要功能和初印象的匹配度）
  let functionalScore = 0;
  if (crystal.functionalAttributes.primaryPurposes[primaryNeed]) {
    functionalScore += 30; // 主要功能匹配
  }
  if (crystal.functionalAttributes.impressions?.[desiredImpression]) {
    functionalScore += 10; // 初印象匹配
  }
  details['功能分数'] = functionalScore;
  totalScore += functionalScore;

  // 3. 修正属性分数（基于修正属性、潜能和健康问题的匹配度）
  let correctiveScore = 0;
  if (crystal.correctiveAttributes.correctiveProperties[situation]) {
    correctiveScore += 15; // 修正属性匹配
  }
  if (crystal.correctiveAttributes.potentials?.[desiredPotential]) {
    correctiveScore += 8; // 内在潜能匹配
  }
  if (crystal.correctiveAttributes.healthIssues?.[healthIssue]) {
    correctiveScore += 7; // 健康问题匹配
  }
  details['修正分数'] = correctiveScore;
  totalScore += correctiveScore;

  // 4. 协同效应分数（基于与已选水晶的互补性）
  let synergyScore = 0;
  selectedCrystals.forEach(selected => {
    // 检查元素相性
    const commonElements = crystal.destinyAttributes.supportiveElements
      .filter(element => selected.destinyAttributes.supportiveElements.includes(element));
    synergyScore += commonElements.length * 3; // 共同元素加分

    // 检查功能互补性
    if (crystal.functionalAttributes.primaryPurposes[primaryNeed] !== 
        selected.functionalAttributes.primaryPurposes[primaryNeed]) {
      synergyScore += 7; // 功能互补加分
    }

    // 检查修正属性互补性
    if (crystal.correctiveAttributes.correctiveProperties[situation] !==
        selected.correctiveAttributes.correctiveProperties[situation]) {
      synergyScore += 5; // 修正属性互补加分
    }
  });
  synergyScore = Math.min(synergyScore, 20); // 限制协同效应的影响
  details['协同分数'] = synergyScore;
  totalScore += synergyScore;

  // 5. 惩罚项（基于不兼容性和属性冲突）
  let penaltyScore = 0;
  // 检查不兼容性
  selectedCrystals.forEach(selected => {
    if (crystal.incompatibleWith.includes(selected.id) ||
        selected.incompatibleWith.includes(crystal.id)) {
      penaltyScore -= 60; // 不兼容惩罚
    }
  });
  // 检查与忌用神的冲突
  unfavorableElements.forEach(element => {
    if (crystal.destinyAttributes.unsupportiveElements.includes(element)) {
      penaltyScore -= 40; // 属性冲突惩罚
    }
  });

  details['惩罚分数'] = penaltyScore;
  totalScore += penaltyScore;

  return { score: totalScore, details };
}

// 命运石专用打分系统
function scoreDestinyCrystal(
  crystal: Crystal,
  {
    mainElement,
    favorableElements,
    unfavorableElements
  }: {
    mainElement: string;
    favorableElements: string[];
    unfavorableElements: string[];
  }
): { score: number; details: Record<string, number> } {
  const details: Record<string, number> = {};
  let totalScore = 0;

  // 1. 主元素匹配度
  let mainElementScore = 0;
  if (crystal.destinyAttributes.supportiveElements.includes(mainElement)) {
    mainElementScore = 35; // 主元素完全匹配
  } else if (crystal.destinyAttributes.supportiveElements.some(element => 
    isElementCompatible(element, mainElement))) {
    mainElementScore = 20; // 主元素相生
  }
  details['主元素分数'] = mainElementScore;
  totalScore += mainElementScore;
  
  // 2. 喜用神匹配度
  let favorableScore = 0;
  let matchedFavorables = 0;
  favorableElements.forEach((element, index) => {
    if (crystal.destinyAttributes.supportiveElements.includes(element)) {
      favorableScore += 25;
      matchedFavorables++;
      // 根据喜用神的顺序添加微小差异
      favorableScore += (favorableElements.length - index) * 0.1;
    } else if (crystal.destinyAttributes.supportiveElements.some(supportive => 
      isElementCompatible(supportive, element))) {
      favorableScore += 15; // 相生关系加分
      // 根据喜用神的顺序添加微小差异
      favorableScore += (favorableElements.length - index) * 0.05;
    }
  });
  // 匹配喜用神数量的额外奖励
  if (matchedFavorables > 1) {
    favorableScore += matchedFavorables * 5; // 每多匹配一个喜用神额外加分
  }
  details['喜用神分数'] = favorableScore;
  totalScore += favorableScore;

  // 3. 忌用神规避度
  let unfavorableScore = 0;
  unfavorableElements.forEach((element, index) => {
    if (!crystal.destinyAttributes.supportiveElements.includes(element)) {
      unfavorableScore += 20; // 基础规避分
      // 根据忌用神的顺序添加微小差异
      unfavorableScore += (unfavorableElements.length - index) * 0.1;
      
      // 检查是否与忌用神相克
      if (crystal.destinyAttributes.supportiveElements.some(supportive => 
        isElementRestraining(supportive, element))) {
        unfavorableScore += 10; // 相克加分
        // 根据忌用神的顺序添加微小差异
        unfavorableScore += (unfavorableElements.length - index) * 0.05;
      }
    }
  });
  details['忌用神规避分数'] = unfavorableScore;
  totalScore += unfavorableScore;

  // 4. 五行平衡度
  const elementBalance = calculateElementBalance(crystal.destinyAttributes.supportiveElements);
  // 添加基于水晶特性的微小差异
  const uniqueBalanceModifier = getUniqueBalanceModifier(crystal);
  const finalElementBalance = elementBalance + uniqueBalanceModifier;
  details['五行平衡分数'] = finalElementBalance;
  totalScore += finalElementBalance;

  // 5. 惩罚项
  let penaltyScore = 0;
  // 检查与忌用神的直接冲突
  unfavorableElements.forEach((element, index) => {
    if (crystal.destinyAttributes.unsupportiveElements.includes(element)) {
      penaltyScore -= 50; // 直接冲突严重惩罚
      // 根据忌用神的顺序添加微小差异
      penaltyScore -= (unfavorableElements.length - index) * 0.1;
    } else if (crystal.destinyAttributes.supportiveElements.some(supportive => 
      isElementRestrained(supportive, element))) {
      penaltyScore -= 30; // 被克制惩罚
      // 根据忌用神的顺序添加微小差异
      penaltyScore -= (unfavorableElements.length - index) * 0.05;
    }
  });
  details['惩罚分数'] = penaltyScore;
  totalScore += penaltyScore;

  // 6. 水晶独特性分数（新增）
  const uniqueScore = calculateUniqueScore(crystal);
  details['独特性分数'] = uniqueScore;
  totalScore += uniqueScore;

  return { score: totalScore, details };
}

// 辅助函数：判断两个五行元素是否相生
function isElementCompatible(element1: string, element2: string): boolean {
  const generationCycles: Record<string, string> = {
    '木': '火',
    '火': '土',
    '土': '金',
    '金': '水',
    '水': '木'
  };
  return generationCycles[element1] === element2;
}

// 辅助函数：判断element1是否克制element2
function isElementRestraining(element1: string, element2: string): boolean {
  const restrainingCycles: Record<string, string> = {
    '木': '土',
    '土': '水',
    '水': '火',
    '火': '金',
    '金': '木'
  };
  return restrainingCycles[element1] === element2;
}

// 辅助函数：判断element1是否被element2克制
function isElementRestrained(element1: string, element2: string): boolean {
  return isElementRestraining(element2, element1);
}

// 辅助函数：计算五行平衡度
function calculateElementBalance(elements: string[]): number {
  const elementCounts: Record<string, number> = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0
  };

  elements.forEach(element => {
    elementCounts[element]++;
  });

  // 计算平衡度
  const totalElements = elements.length;
  const idealCount = totalElements / 5; // 理想情况下每个元素的数量
  let balanceScore = 15; // 基础分

  Object.values(elementCounts).forEach(count => {
    const deviation = Math.abs(count - idealCount);
    balanceScore -= deviation * 3; // 每偏离理想值一次扣3分
  });

  return Math.max(balanceScore, 0); // 确保不会出现负分
}

// 辅助函数：计算水晶的独特性分数
function calculateUniqueScore(crystal: Crystal): number {
  let uniqueScore = 0;
  
  // 基于水晶ID生成一个稳定但微小的分数调整
  const hashCode = crystal.id.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // 将hashCode转换为0.1到0.9之间的小数
  uniqueScore = (Math.abs(hashCode) % 9 + 1) / 10;
  
  // 考虑水晶的功能属性数量
  const functionalCount = Object.values(crystal.functionalAttributes.primaryPurposes)
    .filter(Boolean).length;
  uniqueScore += functionalCount * 0.1;
  
  // 考虑水晶的修正属性数量
  const correctiveCount = Object.values(crystal.correctiveAttributes.correctiveProperties)
    .filter(Boolean).length;
  uniqueScore += correctiveCount * 0.1;
  
  return uniqueScore;
}

// 辅助函数：获取基于水晶特性的平衡度修正值
function getUniqueBalanceModifier(crystal: Crystal): number {
  // 基于水晶的supportiveElements数量生成微小的修正值
  const elementsCount = crystal.destinyAttributes.supportiveElements.length;
  const modifier = (elementsCount * 0.1) + (crystal.id.length * 0.01);
  return modifier;
}

// 更新选择命运石的逻辑
export function selectDestinyCrystal(
  mainElement: string,
  favorableElements: string[],
  unfavorableElements: string[],
  birthDateTime: string // 新增出生日期时间参数
): Crystal {
  const scoredCrystals = crystalData.map(crystal => {
    const { score, details } = scoreDestinyCrystal(crystal, {
      mainElement,
      favorableElements,
      unfavorableElements
    });
    
    console.log(`命运石评分 - ${crystal.name}:`, details);
    return { crystal, score, details };
  });

  // 对分数相近的水晶进行分组
  const groupedCrystals = groupSimilarScores(scoredCrystals);
  
  // 从最高分组中基于出生日期时间确定性地选择一个水晶
  const topGroup = groupedCrystals[0];
  const seed = generateSeedFromDateTime(birthDateTime);
  const selectedIndex = seed % topGroup.length;
  const selected = topGroup[selectedIndex];

  console.log("命运石候选排名:", scoredCrystals.map(c => `${c.crystal.name}(${c.score})`).join(', '));
  console.log("选中的命运石:", selected.crystal.name, "分数:", selected.score);

  if (selected.score < 0) {
    throw new Error("没有找到与命理匹配度足够高的命运石");
  }

  return selected.crystal;
}

// 辅助函数：从出生日期时间生成确定性的随机种子
function generateSeedFromDateTime(dateTime: string): number {
  // 移除所有非数字字符，只保留数字
  const numericValue = dateTime.replace(/\D/g, '');
  
  // 使用简单的哈希算法生成种子
  let seed = 0;
  for (let i = 0; i < numericValue.length; i++) {
    seed = ((seed << 5) - seed) + parseInt(numericValue[i]);
    seed = seed & seed; // 转换为32位整数
  }
  
  // 确保种子为正数
  return Math.abs(seed);
}

// 辅助函数：将分数相近的水晶分组
function groupSimilarScores(scoredCrystals: Array<{crystal: Crystal; score: number; details: Record<string, number>}>): Array<Array<{crystal: Crystal; score: number; details: Record<string, number>}>> {
  // 首先按分数降序排序
  scoredCrystals.sort((a, b) => b.score - a.score);
  
  const groups: Array<Array<{crystal: Crystal; score: number; details: Record<string, number>}>> = [];
  let currentGroup: Array<{crystal: Crystal; score: number; details: Record<string, number>}> = [];
  const SCORE_THRESHOLD = 5; // 分数差异阈值
  
  scoredCrystals.forEach((scored, index) => {
    if (index === 0) {
      currentGroup.push(scored);
    } else {
      const prevScore = scoredCrystals[index - 1].score;
      if (Math.abs(prevScore - scored.score) <= SCORE_THRESHOLD) {
        currentGroup.push(scored);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [scored];
      }
    }
  });
  
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  
  return groups;
}

// 更新选择功能石的逻辑
export function selectFunctionalCrystal(
  primaryNeed: PrimaryNeed,
  desiredImpression: Impression,
  excludedCrystals: Crystal[] = []
): Crystal {
  const scoredCrystals = crystalData
    .filter(crystal => !excludedCrystals.some(excluded => excluded.id === crystal.id))
    .map(crystal => {
      const { score, details } = scoreCrystal(crystal, {
        mainElement: "", // 不考虑命理
        favorableElements: [],
        unfavorableElements: [],
        primaryNeed,
        situation: CommonSituation.FATIGUE, // 默认值
        desiredImpression,
        desiredPotential: Potential.EMPATHY, // 默认值
        healthIssue: HealthIssue.STRESS, // 默认值
        selectedCrystals: excludedCrystals
      });
      
      console.log(`评分详情 - ${crystal.name}:`, details);
      return { crystal, score, details };
    });

  scoredCrystals.sort((a, b) => b.score - a.score);
  console.log("功能石候选排名:", scoredCrystals.map(c => `${c.crystal.name}(${c.score})`).join(', '));

  if (scoredCrystals.length === 0) {
    throw new Error("找不到合适的功能石");
  }

  return scoredCrystals[0].crystal;
}

// 更新选择修正石的逻辑
export function selectCorrectiveCrystal(
  situation: CommonSituation,
  desiredPotential: Potential,
  healthIssue: HealthIssue,
  excludedCrystals: Crystal[] = []
): Crystal {
  const scoredCrystals = crystalData
    .filter(crystal => !excludedCrystals.some(excluded => excluded.id === crystal.id))
    .map(crystal => {
      const { score, details } = scoreCrystal(crystal, {
        mainElement: "", // 不考虑命理
        favorableElements: [],
        unfavorableElements: [],
        primaryNeed: PrimaryNeed.BALANCE, // 默认值
        situation,
        desiredImpression: Impression.WARM, // 默认值
        desiredPotential,
        healthIssue,
        selectedCrystals: excludedCrystals
      });
      
      console.log(`评分详情 - ${crystal.name}:`, details);
      return { crystal, score, details };
    });

  scoredCrystals.sort((a, b) => b.score - a.score);
  console.log("修正石候选排名:", scoredCrystals.map(c => `${c.crystal.name}(${c.score})`).join(', '));

  if (scoredCrystals.length === 0) {
    throw new Error("找不到合适的修正石");
  }

  return scoredCrystals[0].crystal;
}

// 检查选中的水晶组合是否兼容
export function checkCrystalCompatibility(crystals: Crystal[]): boolean {
  for (let i = 0; i < crystals.length; i++) {
    for (let j = i + 1; j < crystals.length; j++) {
      if (
        crystals[i].incompatibleWith.includes(crystals[j].id) ||
        crystals[j].incompatibleWith.includes(crystals[i].id)
      ) {
        return false;
      }
    }
  }
  return true;
}

// 更新主选石函数
export function selectCrystals(
  mainElement: string,
  favorableElements: string[],
  unfavorableElements: string[],
  primaryNeed: PrimaryNeed,
  situation: CommonSituation,
  desiredImpression: Impression,
  desiredPotential: Potential,
  healthIssue: HealthIssue,
  birthDateTime: string, // 新增出生日期时间参数
  excludedTypes: string[] = []
): {
  destinyCrystal: Crystal;
  functionalCrystal: Crystal;
  correctiveCrystal: Crystal;
} {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    try {
      // 选择命运石（传入出生日期时间）
      const destinyCrystal = selectDestinyCrystal(
        mainElement,
        favorableElements,
        unfavorableElements,
        birthDateTime
      );

      if (excludedTypes.includes(destinyCrystal.id)) {
        attempts++;
        continue;
      }

      // 选择功能石（加入初印象考虑）
      const functionalCrystal = selectFunctionalCrystal(
        primaryNeed,
        desiredImpression,
        [destinyCrystal]
      );

      if (excludedTypes.includes(functionalCrystal.id)) {
        attempts++;
        continue;
      }

      // 选择修正石（加入内在潜能和健康问题考虑）
      const correctiveCrystal = selectCorrectiveCrystal(
        situation,
        desiredPotential,
        healthIssue,
        [destinyCrystal, functionalCrystal]
      );

      if (excludedTypes.includes(correctiveCrystal.id)) {
        attempts++;
        continue;
      }

      // 检查三颗石头的兼容性
      if (checkCrystalCompatibility([destinyCrystal, functionalCrystal, correctiveCrystal])) {
        return {
          destinyCrystal,
          functionalCrystal,
          correctiveCrystal
        };
      }
    } catch (error) {
      attempts++;
      continue;
    }

    attempts++;
  }

  throw new Error("无法找到合适的水晶组合，请尝试调整选择条件");
}

// 获取所有可用的功能选项
export function getAvailablePurposes(): string[] {
  const purposes = new Set<string>();
  crystalData.forEach(crystal => {
    const primaryPurposes = crystal.functionalAttributes.primaryPurposes;
    if (primaryPurposes.relationship) purposes.add('relationship');
    if (primaryPurposes.wealth) purposes.add('wealth');
    if (primaryPurposes.protection) purposes.add('protection');
    if (primaryPurposes.balance) purposes.add('balance');
    if (primaryPurposes.career) purposes.add('career');
  });
  return Array.from(purposes);
}

// 获取所有可用的修正选项
export function getAvailableCorrections(): string[] {
  const corrections = new Set<string>();
  crystalData.forEach(crystal => {
    const correctiveProperties = crystal.correctiveAttributes.correctiveProperties;
    if (correctiveProperties.indecisive) corrections.add('indecisive');
    if (correctiveProperties.fatigue) corrections.add('fatigue');
    if (correctiveProperties.socialDrain) corrections.add('socialDrain');
    if (correctiveProperties.energySensitive) corrections.add('energySensitive');
  });
  return Array.from(corrections);
}

// 获取所有水晶的基本信息
export function getAllCrystals(): Array<{id: string, name: string, description: string}> {
  return crystalData.map(crystal => ({
    id: crystal.id,
    name: crystal.name,
    description: crystal.description
  }));
}

// 获取石头的支持元素
function getSupportiveElements(stone: Crystal): string[] {
  return stone.destinyAttributes?.supportiveElements || [];
}

// 获取石头的益处
function getBenefits(stone: Crystal): string[] {
  const primaryPurposes = stone.functionalAttributes?.primaryPurposes || {};
  const benefits = [];
  if (primaryPurposes.relationship) benefits.push('relationship');
  if (primaryPurposes.wealth) benefits.push('wealth');
  if (primaryPurposes.protection) benefits.push('protection');
  if (primaryPurposes.balance) benefits.push('balance');
  if (primaryPurposes.career) benefits.push('career');
  return benefits;
}

// 获取石头的修正功能
function getCorrections(stone: Crystal): string[] {
  const correctiveProperties = stone.correctiveAttributes?.correctiveProperties || {};
  const corrections = [];
  if (correctiveProperties.indecisive) corrections.push('indecisive');
  if (correctiveProperties.fatigue) corrections.push('fatigue');
  if (correctiveProperties.socialDrain) corrections.push('socialDrain');
  if (correctiveProperties.energySensitive) corrections.push('energySensitive');
  return corrections;
} 
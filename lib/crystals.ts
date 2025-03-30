import { PrimaryNeed, CommonSituation, Impression, Potential, HealthIssue } from './questionnaire';
import { crystalData, filterCrystalsByPrimaryNeed, filterCrystalsByCorrectiveSituation, Crystal } from './crystalData';

// 水晶优选打分系统
function scoreCrystal(
  crystal: Crystal,
  {
    favorableElements,
    unfavorableElements,
    primaryNeed,
    situation,
    desiredImpression,
    desiredPotential,
    healthIssue,
    selectedCrystals = [],
    isCorrective = false
  }: {
    favorableElements: string[];
    unfavorableElements: string[];
    primaryNeed: PrimaryNeed;
    situation: CommonSituation;
    desiredImpression: Impression;
    desiredPotential: Potential;
    healthIssue: HealthIssue;
    selectedCrystals?: Crystal[];
    isCorrective?: boolean;
  }
): { score: number; details: Record<string, number> } {
  const details: Record<string, number> = {};
  let totalScore = 0;

  console.log(`\n检查水晶 ${crystal.name} 的评分：`);
  console.log('用户选择：', {
    primaryNeed,
    desiredImpression,
    desiredPotential,
    situation,
    healthIssue
  });

  // 1. 命理相关分数（基于五行属性的完全匹配）- 只在非修正石时计算
  if (!isCorrective) {
    let destinyScore = 0;
    // 检查水晶的支持元素是否匹配喜用神
    const crystalElements = crystal.destinyAttributes.supportiveElements;
    
    // 过滤掉 undefined 值，只保留有效的喜用神
    const validFavorableElements = favorableElements.filter(element => element !== 'undefined');
    
    // 当喜用神只有一个时，只要包含这个喜用神就符合要求
    if (validFavorableElements.length === 1) {
      if (crystalElements.includes(validFavorableElements[0])) {
        console.log(`水晶 ${crystal.name} 包含喜用神 ${validFavorableElements[0]}，给予1000分`);
        destinyScore = 1000;
        details['命理分数'] = destinyScore;
        totalScore += destinyScore;
      } else {
        console.log(`水晶 ${crystal.name} 不包含喜用神 ${validFavorableElements[0]}，直接排除`);
        return { score: -1000, details: { '命理分数': -1000 } };
      }
    } else {
      // 多个喜用神时，需要完全匹配
      const hasAllFavorableElements = validFavorableElements.every(element => 
        crystalElements.includes(element)
      );
      
      if (!hasAllFavorableElements) {
        // 如果是功能石且包含主用神（喜用神的第一个元素），给予500分
        if (!isCorrective && crystalElements.includes(validFavorableElements[0])) {
          console.log(`功能石 ${crystal.name} 包含主用神 ${validFavorableElements[0]}，加500分`);
          destinyScore = 500;
          details['命理分数'] = destinyScore;
          totalScore += destinyScore;
          return { score: totalScore, details };
        }
        
        console.log(`水晶 ${crystal.name} 不完全匹配喜用神，直接排除`);
        return { score: -1000, details: { '命理分数': -1000 } };
      }
      
      destinyScore = 1000; // 完全匹配给予1000分
      details['命理分数'] = destinyScore;
      totalScore += destinyScore;
    }
  }

  // 2. 功能属性分数（只有在完全匹配命理且不是修正石的情况下才考虑）
  if (!isCorrective) {
    let functionalScore = 0;
    if (crystal.functionalAttributes.primaryPurposes[primaryNeed]) {
      functionalScore += 30;
      console.log(`匹配主要需求 ${primaryNeed}，加30分`);
    }
    if (crystal.functionalAttributes.impressions?.[desiredImpression]) {
      functionalScore += 20;
      console.log(`匹配印象属性 ${desiredImpression}，加20分`);
    }
    if (crystal.correctiveAttributes.potentials?.[desiredPotential]) {
      functionalScore += 20;
      console.log(`匹配潜能属性 ${desiredPotential}，加20分`);
    }
    details['功能分数'] = functionalScore;
    totalScore += functionalScore;

    // 功能石需要检查修正属性来增加协同分数
    let synergyScore = 0;
    if (crystal.correctiveAttributes.correctiveProperties[situation]) {
      synergyScore += 5;
      console.log(`匹配修正特性 ${situation}，加5分`);
    }
    if (crystal.correctiveAttributes.healthIssues?.[healthIssue]) {
      synergyScore += 5;
      console.log(`匹配健康问题 ${healthIssue}，加5分`);
    }
    details['协同分数'] = synergyScore;
    totalScore += synergyScore;
  }

  // 3. 修正属性分数（只有在完全匹配命理且是修正石的情况下才考虑）
  if (isCorrective) {
    console.log(`\n检查修正石 ${crystal.name} 的评分：`);
    console.log('用户选择：', {
      primaryNeed,
      desiredImpression,
      desiredPotential,
      situation,
      healthIssue
    });
    console.log('功能属性:', JSON.stringify(crystal.functionalAttributes, null, 2));
    console.log('修正属性:', JSON.stringify(crystal.correctiveAttributes, null, 2));
    
    // 修正分数计算
    let correctiveScore = 0;
    if (crystal.correctiveAttributes.correctiveProperties[situation]) {
      correctiveScore += 30;
      console.log(`匹配修正特性 ${situation}，加30分`);
    }
    if (crystal.correctiveAttributes.healthIssues?.[healthIssue]) {
      correctiveScore += 20;
      console.log(`匹配健康问题 ${healthIssue}，加20分`);
    }
    console.log(`修正分数: ${correctiveScore}`);
    
    // 协同分数计算 - 修正石需要检查功能属性
    let synergyScore = 0;
    if (crystal.functionalAttributes.primaryPurposes[primaryNeed]) {
      synergyScore += 5;
      console.log(`匹配主要需求 ${primaryNeed}，加5分`);
    }
    if (crystal.functionalAttributes.impressions?.[desiredImpression]) {
      synergyScore += 5;
      console.log(`匹配印象属性 ${desiredImpression}，加5分`);
    }
    if (crystal.correctiveAttributes.potentials?.[desiredPotential]) {
      synergyScore += 5;
      console.log(`匹配潜能属性 ${desiredPotential}，加5分`);
    }
    console.log(`协同分数: ${synergyScore}`);
    console.log(`总分: ${correctiveScore + synergyScore}\n`);
    
    details['修正分数'] = correctiveScore;
    details['协同分数'] = synergyScore;
    totalScore = correctiveScore + synergyScore;
  }

  return { score: totalScore, details };
}

// 命运石专用打分系统
function scoreDestinyCrystal(
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

  // 检查水晶的支持元素是否匹配喜用神
  const crystalElements = crystal.destinyAttributes.supportiveElements;
  
  // 过滤掉 undefined 值，只保留有效的喜用神
  const validFavorableElements = favorableElements.filter(element => element !== 'undefined');
  
  // 当喜用神只有一个时，只要包含这个喜用神就符合要求
  if (validFavorableElements.length === 1) {
    if (!crystalElements.includes(validFavorableElements[0])) {
      console.log(`命运石 ${crystal.name} 不包含喜用神 ${validFavorableElements[0]}，直接排除`);
      return { score: -1000, details: { '命理分数': -1000 } };
    }
  } else {
    // 多个喜用神时，需要完全匹配
    const hasAllFavorableElements = validFavorableElements.every(element => 
      crystalElements.includes(element)
    );

    if (!hasAllFavorableElements) {
      console.log(`命运石 ${crystal.name} 不完全匹配喜用神，直接排除`);
      return { score: -1000, details: { '命理分数': -1000 } };
    }
  }

  // 1. 主元素匹配度（在匹配喜用神的基础上）
  let mainElementScore = 0;
  if (crystal.destinyAttributes.supportiveElements.includes(mainElement)) {
    mainElementScore = 5;
  }
  details['主元素分数'] = mainElementScore;
  totalScore += mainElementScore;
  
  // 2. 喜用神匹配度（已确保匹配）
  const favorableScore = 100; // 给予固定的高分
  details['喜用神分数'] = favorableScore;
  totalScore += favorableScore;

  // 3. 协同效应分数（直接基于用户需求计算）
  let synergyScore = 0;
  // 检查功能属性
  if (crystal.functionalAttributes.primaryPurposes[primaryNeed]) {
    synergyScore += 10;  // 拥有对应功能属性加10分
    console.log(`命运石 ${crystal.name} 匹配功能属性 ${primaryNeed}，加10分`);
  }
  if (crystal.functionalAttributes.impressions?.[desiredImpression]) {
    synergyScore += 5;   // 拥有对应印象属性加5分
    console.log(`命运石 ${crystal.name} 匹配印象属性 ${desiredImpression}，加5分`);
  }
  // 检查修正属性
  if (crystal.correctiveAttributes.correctiveProperties[situation]) {
    synergyScore += 10;  // 拥有对应修正特性加10分
    console.log(`命运石 ${crystal.name} 匹配修正特性 ${situation}，加10分`);
  }
  if (crystal.correctiveAttributes.healthIssues?.[healthIssue]) {
    synergyScore += 5;   // 拥有对应健康问题修正加5分
    console.log(`命运石 ${crystal.name} 匹配健康问题 ${healthIssue}，加5分`);
  }
  // 检查潜能属性
  if (crystal.correctiveAttributes.potentials?.[desiredPotential]) {
    synergyScore += 5;  // 拥有对应潜能属性加5分
    console.log(`命运石 ${crystal.name} 匹配潜能属性 ${desiredPotential}，加5分`);
  }
  synergyScore = Math.min(synergyScore, 20);  // 保持最高20分的限制
  details['协同分数'] = synergyScore;
  totalScore += synergyScore;

  console.log(`命运石 ${crystal.name} 最终得分：`, {
    主元素分数: mainElementScore,
    喜用神分数: favorableScore,
    协同分数: synergyScore,
    总分: totalScore
  });

  return { score: totalScore, details };
}

// 辅助函数：生成基于日期时间的种子值
function generateSeedFromDateTime(dateTimeStr: string): number {
  const date = new Date(dateTimeStr);
  const timestamp = date.getTime();
  const seed = timestamp % 1000000; // 使用时间戳的后6位作为种子
  return Math.abs(seed);
}

// 更新选择命运石的逻辑
export function selectDestinyCrystal(
  mainElement: string,
  favorableElements: string[],
  unfavorableElements: string[],
  birthDateTime: string,
  primaryNeed: PrimaryNeed,
  situation: CommonSituation,
  desiredImpression: Impression,
  desiredPotential: Potential,
  healthIssue: HealthIssue,
  selectedCrystals: Crystal[] = []
): Crystal {
  const scoredCrystals = crystalData.map(crystal => {
    const { score, details } = scoreDestinyCrystal(crystal, {
      mainElement,
      favorableElements,
      unfavorableElements,
      primaryNeed,
      situation,
      desiredImpression,
      desiredPotential,
      healthIssue,
      selectedCrystals
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

// 辅助函数：将分数相近的水晶分组
function groupSimilarScores(scoredCrystals: Array<{crystal: Crystal; score: number; details: Record<string, number>}>): Array<Array<{crystal: Crystal; score: number; details: Record<string, number>}>> {
  // 按分数降序排序
  const sortedCrystals = [...scoredCrystals].sort((a, b) => b.score - a.score);
  
  const groups: Array<Array<{crystal: Crystal; score: number; details: Record<string, number>}>> = [];
  let currentGroup: Array<{crystal: Crystal; score: number; details: Record<string, number>}> = [];
  
  sortedCrystals.forEach((item, index) => {
    if (index === 0) {
      currentGroup.push(item);
    } else {
      const prevScore = sortedCrystals[index - 1].score;
      const scoreDiff = prevScore - item.score;
      
      // 如果分数差异大于2，开始新的分组
      if (scoreDiff > 2) {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [item];
      } else {
        currentGroup.push(item);
      }
    }
  });
  
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  
  return groups;
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
  birthDateTime: string,
  excludedTypes: string[] = []
): {
  destinyCrystal: Crystal;
  functionalCrystal: Crystal;
  correctiveCrystal: Crystal;
} {
  console.log("\n=== 开始水晶匹配 ===");
  console.log("用户信息：", {
    主元素: mainElement,
    喜用神: favorableElements,
    忌用神: unfavorableElements,
    主要需求: primaryNeed,
    当前状况: situation,
    期望印象: desiredImpression,
    期望潜能: desiredPotential,
    健康问题: healthIssue,
    排除类型: excludedTypes
  });

  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    try {
      console.log(`\n尝试第 ${attempts + 1} 次匹配...`);
      
      // 先选择命运石
      const destinyCrystal = selectDestinyCrystal(
        mainElement,
        favorableElements,
        unfavorableElements,
        birthDateTime,
        primaryNeed,
        situation,
        desiredImpression,
        desiredPotential,
        healthIssue,
        []  // 初始选择时没有已选水晶
      );

      console.log(`\n选中的命运石: ${destinyCrystal.name}`);
      console.log("命运石属性:", {
        支持元素: destinyCrystal.destinyAttributes.supportiveElements,
        不支持元素: destinyCrystal.destinyAttributes.unsupportiveElements,
        主要功能: Object.entries(destinyCrystal.functionalAttributes.primaryPurposes)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      });

      if (excludedTypes.includes(destinyCrystal.id)) {
        console.log(`命运石 ${destinyCrystal.name} 在排除列表中，跳过`);
        attempts++;
        continue;
      }

      // 选择功能石
      const functionalScoredCrystals = crystalData
        .filter(crystal => !excludedTypes.includes(crystal.id) && crystal.id !== destinyCrystal.id)
        .map(crystal => {
          const { score, details } = scoreCrystal(crystal, {
            favorableElements,
            unfavorableElements,
            primaryNeed,
            situation,
            desiredImpression,
            desiredPotential,
            healthIssue,
            selectedCrystals: [destinyCrystal],
            isCorrective: false
          });
          
          return { crystal, score, details };
        });

      functionalScoredCrystals.sort((a, b) => b.score - a.score);
      console.log("\n功能石候选排名:", functionalScoredCrystals.map(c => 
        `${c.crystal.name}(${c.score}) - 支持元素: ${c.crystal.destinyAttributes.supportiveElements.join(',')}`
      ).join('\n'));

      if (functionalScoredCrystals.length === 0) {
        console.log("没有找到合适的功能石");
        attempts++;
        continue;
      }

      const functionalCrystal = functionalScoredCrystals[0].crystal;
      console.log(`\n选中的功能石: ${functionalCrystal.name}`);
      console.log("功能石属性:", {
        支持元素: functionalCrystal.destinyAttributes.supportiveElements,
        不支持元素: functionalCrystal.destinyAttributes.unsupportiveElements,
        主要功能: Object.entries(functionalCrystal.functionalAttributes.primaryPurposes)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      });

      // 选择修正石
      const allowedCorrectiveCrystalIds = [
        "zishuijing",    // 紫水晶
        "fenjing",       // 粉晶
        "citrine",       // 黄水晶
        "dongling_jade", // 东陵玉
        "kyanite",       // 蓝晶石
        "kunzite",       // 紫锂辉
        "smoky_quartz",  // 茶晶
        "strawberry_quartz", // 草莓晶
        "green_strawberry_quartz" // 绿草莓晶
      ];

      const correctiveScoredCrystals = crystalData
        .filter(crystal => 
          !excludedTypes.includes(crystal.id) && 
          crystal.id !== destinyCrystal.id && 
          crystal.id !== functionalCrystal.id &&
          allowedCorrectiveCrystalIds.includes(crystal.id)
        )
        .map(crystal => {
          const { score, details } = scoreCrystal(crystal, {
            favorableElements,
            unfavorableElements,
            primaryNeed,
            situation,
            desiredImpression,
            desiredPotential,
            healthIssue,
            selectedCrystals: [destinyCrystal, functionalCrystal],
            isCorrective: true
          });
          
          return { crystal, score, details };
        });

      correctiveScoredCrystals.sort((a, b) => b.score - a.score);
      console.log("\n修正石候选排名:", correctiveScoredCrystals.map(c => 
        `${c.crystal.name}(${c.score}) - 支持元素: ${c.crystal.destinyAttributes.supportiveElements.join(',')}`
      ).join('\n'));

      if (correctiveScoredCrystals.length === 0) {
        console.log("没有找到合适的修正石");
        attempts++;
        continue;
      }

      const correctiveCrystal = correctiveScoredCrystals[0].crystal;
      console.log(`\n选中的修正石: ${correctiveCrystal.name}`);
      console.log("修正石属性:", {
        支持元素: correctiveCrystal.destinyAttributes.supportiveElements,
        不支持元素: correctiveCrystal.destinyAttributes.unsupportiveElements,
        主要功能: Object.entries(correctiveCrystal.functionalAttributes.primaryPurposes)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      });

      // 检查水晶组合是否兼容
      const isCompatible = [destinyCrystal, functionalCrystal, correctiveCrystal].every((crystal, i, crystals) => {
        return crystals.every((otherCrystal, j) => {
          if (i === j) return true;
          const incompatible = !crystal.incompatibleWith.includes(otherCrystal.id) && 
                             !otherCrystal.incompatibleWith.includes(crystal.id);
          if (!incompatible) {
            console.log(`\n水晶组合不兼容: ${crystal.name} 与 ${otherCrystal.name} 不兼容`);
          }
          return incompatible;
        });
      });

      if (isCompatible) {
        console.log("\n=== 水晶匹配成功 ===");
        return {
          destinyCrystal,
          functionalCrystal,
          correctiveCrystal
        };
      } else {
        console.log("\n水晶组合不兼容，继续尝试...");
      }
    } catch (error: any) {
      console.log(`\n匹配过程出错: ${error.message}`);
      attempts++;
      continue;
    }

    attempts++;
  }

  console.log("\n=== 水晶匹配失败 ===");
  console.log("失败原因：");
  console.log("1. 用户喜用神：", favorableElements);
  console.log("2. 尝试次数：", attempts);
  console.log("3. 可能的原因：");
  console.log("   - 水晶与喜用神不匹配");
  console.log("   - 水晶组合之间存在不兼容关系");
  console.log("   - 修正石选择范围受限");
  console.log("   - 功能需求与水晶属性不匹配");
  
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
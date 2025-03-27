import { Solar } from 'lunar-typescript';

// 天干
const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const
type HeavenlyStem = typeof HEAVENLY_STEMS[number]

// 地支
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const
type EarthlyBranch = typeof EARTHLY_BRANCHES[number]

// 时辰对应表
const HOUR_TO_BRANCH: Record<number, EarthlyBranch> = {
  23: "子", 0: "子", 1: "丑",
  2: "丑", 3: "寅", 4: "寅",
  5: "卯", 6: "卯", 7: "辰",
  8: "辰", 9: "巳", 10: "巳",
  11: "午", 12: "午", 13: "未",
  14: "未", 15: "申", 16: "申",
  17: "酉", 18: "酉", 19: "戌",
  20: "戌", 21: "亥", 22: "亥"
} as const;

// 月支对应表（寅月为正月）
const MONTH_TO_BRANCH: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, EarthlyBranch> = {
  1: "寅", 2: "卯", 3: "辰",
  4: "巳", 5: "午", 6: "未",
  7: "申", 8: "酉", 9: "戌",
  10: "亥", 11: "子", 12: "丑"
} as const;

// 五行
const FIVE_ELEMENTS = {
  甲: "木", 乙: "木",
  丙: "火", 丁: "火",
  戊: "土", 己: "土",
  庚: "金", 辛: "金",
  壬: "水", 癸: "水",
  子: "水", 丑: "土",
  寅: "木", 卯: "木",
  辰: "土", 巳: "火",
  午: "火", 未: "土",
  申: "金", 酉: "金",
  戌: "土", 亥: "水"
} as const

type FiveElement = typeof FIVE_ELEMENTS[HeavenlyStem | EarthlyBranch]

// 五行生克关系
const FIVE_ELEMENTS_RELATIONS = {
  木: { 生: "火", 克: "土", 被生: "水", 被克: "金" },
  火: { 生: "土", 克: "金", 被生: "木", 被克: "水" },
  土: { 生: "金", 克: "水", 被生: "火", 被克: "木" },
  金: { 生: "水", 克: "木", 被生: "土", 被克: "火" },
  水: { 生: "木", 克: "火", 被生: "金", 被克: "土" }
} as const

// 水晶与五行对应关系
const CRYSTAL_ELEMENTS: Record<string, FiveElement> = {
  "玫瑰石英": "土",
  "紫水晶": "土",
  "白水晶": "水",
  "黑曜石": "水",
  "月光石": "水",
  "海蓝宝": "水",
  "蓝晶石": "水",
  "青金石": "水",
  "蛋白石": "水",
  "绿松石": "木",
  "孔雀石": "木",
  "翡翠": "木",
  "橄榄石": "木",
  "碧玺": "木",
  "红纹石": "火",
  "石榴石": "火",
  "红宝石": "火",
  "太阳石": "火",
  "黄水晶": "土",
  "茶晶": "土",
  "虎眼石": "土",
  "黄玉": "土"
}

// 根据年干获取月干起始
const YEAR_STEM_TO_MONTH_STEM_START: Record<HeavenlyStem, number> = {
  甲: 2, // 丙
  乙: 4, // 戊
  丙: 6, // 庚
  丁: 8, // 壬
  戊: 0, // 甲
  己: 2, // 丙
  庚: 4, // 戊
  辛: 6, // 庚
  壬: 8, // 壬
  癸: 0  // 甲
}

// 天干五行生克关系
const STEM_RELATIONS = {
  甲: { 生: ["丙"], 克: ["庚"], 被生: ["壬"], 被克: ["戊"] },
  乙: { 生: ["丁"], 克: ["辛"], 被生: ["癸"], 被克: ["己"] },
  丙: { 生: ["戊"], 克: ["壬"], 被生: ["甲"], 被克: ["庚"] },
  丁: { 生: ["己"], 克: ["癸"], 被生: ["乙"], 被克: ["辛"] },
  戊: { 生: ["庚"], 克: ["甲"], 被生: ["丙"], 被克: ["壬"] },
  己: { 生: ["辛"], 克: ["乙"], 被生: ["丁"], 被克: ["癸"] },
  庚: { 生: ["壬"], 克: ["丙"], 被生: ["戊"], 被克: ["甲"] },
  辛: { 生: ["癸"], 克: ["丁"], 被生: ["己"], 被克: ["乙"] },
  壬: { 生: ["甲"], 克: ["戊"], 被生: ["庚"], 被克: ["丙"] },
  癸: { 生: ["乙"], 克: ["己"], 被生: ["辛"], 被克: ["丁"] }
} as const;

// 地支藏干表
export const BRANCH_HIDDEN_STEMS = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"]
} as const;

// 新增：计算身强身弱分数
function calculateStrengthScore(
  yearStem: HeavenlyStem,
  yearBranch: EarthlyBranch,
  monthStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  dayStem: HeavenlyStem,
  dayBranch: EarthlyBranch,
  hourStem: HeavenlyStem,
  hourBranch: EarthlyBranch
): { 
  score: number; 
  status: string[]; 
  strengthLevel: string; 
  specialPattern?: string;
  seasonalAdjustment?: string;
  conflictingElements?: string;
  recommendedElements?: string;
} {
  const dayMasterElement = FIVE_ELEMENTS[dayStem];
  let score = 0;
  const status: string[] = [];

  // 1. 检查月令
  const monthBranchElement = FIVE_ELEMENTS[monthBranch];
  if (monthBranchElement === dayMasterElement || 
      FIVE_ELEMENTS_RELATIONS[monthBranchElement].生 === dayMasterElement) {
    score += 40;
    status.push("得月令");
  }

  // 2. 检查其他天干
  if (FIVE_ELEMENTS[yearStem] === dayMasterElement) {
    score += 8;
    status.push("得势");
  }
  if (FIVE_ELEMENTS[monthStem] === dayMasterElement) {
    score += 12;
    status.push("得势");
  }
  if (FIVE_ELEMENTS[hourStem] === dayMasterElement) {
    score += 12;
    status.push("得势");
  }

  // 3. 检查藏干（除月令外）
  // 年支藏干
  const yearHiddenStems = BRANCH_HIDDEN_STEMS[yearBranch];
  if (yearHiddenStems.length > 0) {
    if (FIVE_ELEMENTS[yearHiddenStems[0]] === dayMasterElement) score += 4;  // 本气根
    if (yearHiddenStems[1] && FIVE_ELEMENTS[yearHiddenStems[1]] === dayMasterElement) score += 2;  // 中气根
    if (yearHiddenStems[2] && FIVE_ELEMENTS[yearHiddenStems[2]] === dayMasterElement) score += 1;  // 余气根
    if (score > 0) status.push("得地");
  }

  // 月支藏干（月令本气根不加分，因为月令已加过分）
  const monthHiddenStems = BRANCH_HIDDEN_STEMS[monthBranch];
  if (monthHiddenStems.length > 0) {
    // 月令本气根不加分
    if (monthHiddenStems[1] && FIVE_ELEMENTS[monthHiddenStems[1]] === dayMasterElement) score += 20;  // 中气根
    if (monthHiddenStems[2] && FIVE_ELEMENTS[monthHiddenStems[2]] === dayMasterElement) score += 12;  // 余气根
    if (score > 0) status.push("得地");
  }

  // 日支藏干
  const dayHiddenStems = BRANCH_HIDDEN_STEMS[dayBranch];
  if (dayHiddenStems.length > 0) {
    if (FIVE_ELEMENTS[dayHiddenStems[0]] === dayMasterElement) score += 12;  // 本气根
    if (dayHiddenStems[1] && FIVE_ELEMENTS[dayHiddenStems[1]] === dayMasterElement) score += 7;   // 中气根
    if (dayHiddenStems[2] && FIVE_ELEMENTS[dayHiddenStems[2]] === dayMasterElement) score += 4;   // 余气根
    if (score > 0) status.push("得地");
  }

  // 时支藏干
  const hourHiddenStems = BRANCH_HIDDEN_STEMS[hourBranch];
  if (hourHiddenStems.length > 0) {
    if (FIVE_ELEMENTS[hourHiddenStems[0]] === dayMasterElement) score += 12;  // 本气根
    if (hourHiddenStems[1] && FIVE_ELEMENTS[hourHiddenStems[1]] === dayMasterElement) score += 7;   // 中气根
    if (hourHiddenStems[2] && FIVE_ELEMENTS[hourHiddenStems[2]] === dayMasterElement) score += 4;   // 余气根
    if (score > 0) status.push("得地");
  }

  // 4. 判断身强身弱等级和特殊格局
  let strengthLevel = "";
  let specialPattern: string | undefined;
  let seasonalAdjustment: string | undefined;

  if (score <= 20) {
    strengthLevel = "极弱，需进一步验证特殊格局";
    // 检查从格
    const elementCounts: Record<FiveElement, number> = {
      木: 0, 火: 0, 土: 0, 金: 0, 水: 0
    };
    
    // 计算各元素出现次数
    [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
      elementCounts[FIVE_ELEMENTS[stem]]++;
    });
    [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
      elementCounts[FIVE_ELEMENTS[branch]]++;
      // 计算藏干的元素
      BRANCH_HIDDEN_STEMS[branch].forEach(hiddenStem => {
        elementCounts[FIVE_ELEMENTS[hiddenStem]]++;
      });
    });

    // 检查是否有元素出现>=4次
    for (const [element, count] of Object.entries(elementCounts)) {
      if (count >= 4) {
        const generatingElement = Object.entries(FIVE_ELEMENTS_RELATIONS).find(
          ([_, relations]) => relations.生 === element
        )?.[0] as FiveElement;
        specialPattern = `从格，喜${element}、${generatingElement}`;
        break;
      }
    }
  } else if (score > 80) {
    strengthLevel = "极强，需进一步验证特殊格局";
    // 检查专旺格
    const hasRestraining = [yearStem, monthStem, hourStem, yearBranch, monthBranch, dayBranch, hourBranch].some(char => {
      const element = FIVE_ELEMENTS[char];
      return FIVE_ELEMENTS_RELATIONS[element].克 === dayMasterElement;
    });
    
    if (!hasRestraining) {
      const generatingElement = FIVE_ELEMENTS_RELATIONS[dayMasterElement].被生;
      specialPattern = `专旺格，喜${dayMasterElement}、${generatingElement}`;
    }
  } else if (score > 60) {
    const relations = FIVE_ELEMENTS_RELATIONS[dayMasterElement];
    strengthLevel = `身强，喜${relations.生}、${relations.克}`;
  } else if (score > 40) {
    strengthLevel = "平衡，无特殊扶抑用神需求";
  } else {
    const relations = FIVE_ELEMENTS_RELATIONS[dayMasterElement];
    strengthLevel = `身弱，喜${relations.被生}、${dayMasterElement}`;
  }

  // 如果没有特殊格局，检查调侯需求
  if (!specialPattern) {
    // 定义冬季和夏季的地支
    const WINTER_BRANCHES = ["亥", "子", "丑"];
    const SUMMER_BRANCHES = ["巳", "午", "未"];
    
    // 获取所有天干和藏干的五行
    const allElements = new Set<FiveElement>();
    // 添加天干的五行
    [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
      allElements.add(FIVE_ELEMENTS[stem]);
    });
    // 添加藏干的五行
    [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
      BRANCH_HIDDEN_STEMS[branch].forEach(hiddenStem => {
        allElements.add(FIVE_ELEMENTS[hiddenStem]);
      });
    });
    
    // 获取所有地支的五行
    const branchElements = new Set<FiveElement>();
    [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
      branchElements.add(FIVE_ELEMENTS[branch]);
    });

    // 检查冬季调侯
    if (WINTER_BRANCHES.includes(monthBranch)) {
      const hasFireElement = allElements.has("火");
      
      // 检查火元素是否得地（本气根）
      const hasFireRoot = [yearBranch, monthBranch, dayBranch, hourBranch].some(branch => {
        const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        return hiddenStems.length > 0 && FIVE_ELEMENTS[hiddenStems[0]] === "火";
      });

      // 检查火元素是否得势（有生火或同火）
      const hasFireSupport = [...allElements].some(element => 
        FIVE_ELEMENTS_RELATIONS[element].生 === "火" || element === "火"
      );

      // 计算火的力量
      let fireStrength = 0;
      // 天干中的火
      [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
        if (FIVE_ELEMENTS[stem] === "火") fireStrength += 10;
      });
      // 地支藏干中的火
      [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
        const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        if (hiddenStems[0] && FIVE_ELEMENTS[hiddenStems[0]] === "火") fireStrength += 6;  // 本气根
        if (hiddenStems[1] && FIVE_ELEMENTS[hiddenStems[1]] === "火") fireStrength += 4;  // 中气根
        if (hiddenStems[2] && FIVE_ELEMENTS[hiddenStems[2]] === "火") fireStrength += 2;  // 余气根
      });

      // 计算克火（水）的力量
      let waterStrength = 0;
      // 天干中的水
      [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
        if (FIVE_ELEMENTS[stem] === "水") waterStrength += 10;
      });
      // 地支藏干中的水
      [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
        const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        if (hiddenStems[0] && FIVE_ELEMENTS[hiddenStems[0]] === "水") waterStrength += 6;  // 本气根
        if (hiddenStems[1] && FIVE_ELEMENTS[hiddenStems[1]] === "水") waterStrength += 4;  // 中气根
        if (hiddenStems[2] && FIVE_ELEMENTS[hiddenStems[2]] === "水") waterStrength += 2;  // 余气根
      });

      // 火被克的判断：水的力量超过火的力量
      const hasFireConflict = waterStrength > fireStrength;

      if (!hasFireElement || (!hasFireRoot && !hasFireSupport) || hasFireConflict) {
        seasonalAdjustment = "有寒性调侯需求，喜火/木";
      } else {
        seasonalAdjustment = "无需调侯";
      }
    }
    
    // 检查夏季调侯
    if (SUMMER_BRANCHES.includes(monthBranch)) {
      const hasWaterElement = allElements.has("水");
      
      // 检查水元素是否得地（本气根）
      const hasWaterRoot = [yearBranch, monthBranch, dayBranch, hourBranch].some(branch => {
        const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        return hiddenStems.length > 0 && FIVE_ELEMENTS[hiddenStems[0]] === "水";
      });

      // 检查水元素是否得势（有生水或同水）
      const hasWaterSupport = [...allElements].some(element => 
        FIVE_ELEMENTS_RELATIONS[element].生 === "水" || element === "水"
      );

      // 计算水的力量
      let waterStrength = 0;
      // 天干中的水
      [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
        if (FIVE_ELEMENTS[stem] === "水") waterStrength += 10;
      });
      // 地支藏干中的水
      [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
        const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        if (hiddenStems[0] && FIVE_ELEMENTS[hiddenStems[0]] === "水") waterStrength += 6;  // 本气根
        if (hiddenStems[1] && FIVE_ELEMENTS[hiddenStems[1]] === "水") waterStrength += 4;  // 中气根
        if (hiddenStems[2] && FIVE_ELEMENTS[hiddenStems[2]] === "水") waterStrength += 2;  // 余气根
      });

      // 计算克水（土）的力量
      let earthStrength = 0;
      // 天干中的土
      [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
        if (FIVE_ELEMENTS[stem] === "土") earthStrength += 10;
      });
      // 地支藏干中的土
      [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
    const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
        if (hiddenStems[0] && FIVE_ELEMENTS[hiddenStems[0]] === "土") earthStrength += 6;  // 本气根
        if (hiddenStems[1] && FIVE_ELEMENTS[hiddenStems[1]] === "土") earthStrength += 4;  // 中气根
        if (hiddenStems[2] && FIVE_ELEMENTS[hiddenStems[2]] === "土") earthStrength += 2;  // 余气根
      });

      // 水被克的判断：土的力量超过水的力量
      const hasWaterConflict = earthStrength > waterStrength;

      if (!hasWaterElement || (!hasWaterRoot && !hasWaterSupport) || hasWaterConflict) {
        seasonalAdjustment = "有热性调侯需求，喜水";
      } else {
        seasonalAdjustment = "无需调侯";
      }
    }
  }

  // 计算通关用神
  let conflictingElements: string | undefined;
  
  // 统计五行出现次数
  const elementCounts: Record<FiveElement, number> = {
    木: 0, 火: 0, 土: 0, 金: 0, 水: 0
  };

  // 统计天干中的五行
  [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
    elementCounts[FIVE_ELEMENTS[stem]]++;
  });

  // 统计地支中的五行
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
    elementCounts[FIVE_ELEMENTS[branch]]++;
  });

  // 检查相克的五行对
  const conflictPairs = [
    ["金", "木"],
    ["木", "土"],
    ["土", "水"],
    ["水", "火"],
    ["火", "金"]
  ] as const;

  for (const [elem1, elem2] of conflictPairs) {
    if (elementCounts[elem1] >= 3 && elementCounts[elem2] >= 3) {
      // 找出这对相克元素之间的调和元素
      let mediator: FiveElement;
      if (FIVE_ELEMENTS_RELATIONS[elem1].克 === elem2) {
        // elem1克elem2，需要生elem2的元素
        mediator = FIVE_ELEMENTS_RELATIONS[elem2].被生;
      } else {
        // elem2克elem1，需要生elem1的元素
        mediator = FIVE_ELEMENTS_RELATIONS[elem1].被生;
      }
      conflictingElements = `${elem1}与${elem2}相冲，需${mediator}通关`;
      break;
    }
  }

  if (!conflictingElements) {
    conflictingElements = "无通关用神需求";
  }

  // 计算最终建议用神
  let recommendedElements = "";
  let primaryGod: string | undefined;
  let secondaryGod: string | undefined;

  // 1. 特殊格局优先
  if (specialPattern) {
    const match = specialPattern.match(/喜(.)、(.)/);
    if (match) {
      primaryGod = match[1];
      secondaryGod = match[2];
    }
  } 
  
  // 2. 如果没有特殊格局，按照调侯、通关、扶抑的优先级选择用神
  if (!primaryGod || !secondaryGod) {
    // 检查调侯用神
    if (seasonalAdjustment && !seasonalAdjustment.includes("无需")) {
      if (seasonalAdjustment.includes("寒性")) {
        primaryGod = primaryGod || "火";
      } else if (seasonalAdjustment.includes("热性")) {
        primaryGod = primaryGod || "水";
      }
    }

    // 如果没有调侯需求，检查通关用神
    if ((!primaryGod || !secondaryGod) && conflictingElements && !conflictingElements.includes("无")) {
      const match = conflictingElements.match(/需(.)通关/);
      if (match && match[1]) {
        const conflictGod = match[1] as FiveElement;
        // 检查通关用神是否与现有用神相克
        const hasConflict = primaryGod && (
          FIVE_ELEMENTS_RELATIONS[conflictGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(primaryGod) || 
          FIVE_ELEMENTS_RELATIONS[primaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(conflictGod)
        );

        if (!hasConflict) {
          if (!primaryGod) {
            primaryGod = conflictGod;
          } else if (!secondaryGod && conflictGod !== primaryGod) {
            secondaryGod = conflictGod;
          }
        }
        // 如果有相克，直接跳过通关用神，进入扶抑用神的选择
      }
    }

    // 如果还没有确定用神，使用扶抑用神
    if (!primaryGod || !secondaryGod) {
      const relations = FIVE_ELEMENTS_RELATIONS[dayMasterElement];
      if (score > 60) {
        // 身强用泄气和耗气
        if (!primaryGod) {
          primaryGod = relations.生;  // 泄气
        }
        if (!secondaryGod) {
          // 身强时优先级：泄、克、耗
          const potentialSecondaryGods: FiveElement[] = [relations.生, relations.克];
          // 检查每个潜在的次用神是否与主用神相克
          for (const potential of potentialSecondaryGods) {
            if (potential !== primaryGod && 
                !FIVE_ELEMENTS_RELATIONS[potential as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(primaryGod) && 
                !FIVE_ELEMENTS_RELATIONS[primaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(potential)) {
              secondaryGod = potential;
              break;
            }
          }
        }
      } else if (score < 40) {
        // 身弱用生我和同我
        if (!primaryGod) {
          primaryGod = relations.被生;  // 生我
        }
        if (!secondaryGod) {
          // 身弱时优先级：生我、同我
          const potentialSecondaryGods: FiveElement[] = [relations.被生, dayMasterElement];
          // 检查每个潜在的次用神是否与主用神相克
          for (const potential of potentialSecondaryGods) {
            if (potential !== primaryGod && 
                !FIVE_ELEMENTS_RELATIONS[potential as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(primaryGod) && 
                !FIVE_ELEMENTS_RELATIONS[primaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(potential)) {
              secondaryGod = potential;
              break;
            }
          }
        }
      } else {
        // 平衡格局
        if (!primaryGod) {
          primaryGod = relations.被生;  // 生我
        }
        if (!secondaryGod) {
          // 平衡时优先级：生我、同我
          const potentialSecondaryGods: FiveElement[] = [relations.被生, dayMasterElement];
          // 检查每个潜在的次用神是否与主用神相克
          for (const potential of potentialSecondaryGods) {
            if (potential !== primaryGod && 
                !FIVE_ELEMENTS_RELATIONS[potential as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(primaryGod) && 
                !FIVE_ELEMENTS_RELATIONS[primaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(potential)) {
              secondaryGod = potential;
              break;
            }
          }
        }
      }
    }
  }

  // 最后检查主次用神是否相克，如果相克则去掉次用神
  if (secondaryGod && (
      FIVE_ELEMENTS_RELATIONS[secondaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(primaryGod) || 
      FIVE_ELEMENTS_RELATIONS[primaryGod as keyof typeof FIVE_ELEMENTS_RELATIONS].克.includes(secondaryGod)
  )) {
    secondaryGod = undefined;
  }

  // 构建最终用神说明
  if (specialPattern) {
    recommendedElements = specialPattern;
  } else if (seasonalAdjustment && !seasonalAdjustment.includes("无需")) {
    recommendedElements = seasonalAdjustment;
  } else if (conflictingElements && !conflictingElements.includes("无")) {
    recommendedElements = conflictingElements;
  } else if (score > 60) {
    recommendedElements = "身强格局";
  } else if (score < 40) {
    recommendedElements = "身弱格局";
  } else {
    recommendedElements = "平衡格局";
  }

  // 添加主次用神说明
  recommendedElements = `${recommendedElements}（主用神：${primaryGod}，次用神：${secondaryGod}）`;

  return { 
    score, 
    status: [...new Set(status)], 
    strengthLevel, 
    specialPattern, 
    seasonalAdjustment,
    conflictingElements,
    recommendedElements
  };
}

// 修改原有的 determineStrength 函数
function determineStrength(
  dayMasterElement: FiveElement,
  yearStem: HeavenlyStem,
  yearBranch: EarthlyBranch,
  monthStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  dayStem: HeavenlyStem,
  dayBranch: EarthlyBranch,
  hourStem: HeavenlyStem,
  hourBranch: EarthlyBranch
): { 
  strength: "强" | "弱", 
  score: number, 
  status: string[], 
  strengthLevel: string, 
  specialPattern?: string,
  seasonalAdjustment?: string,
  conflictingElements?: string,
  recommendedElements?: string
} {
  const result = calculateStrengthScore(
    yearStem, yearBranch,
    monthStem, monthBranch,
    dayStem, dayBranch,
    hourStem, hourBranch
  );
  
    return {
    strength: result.score > 40 ? "强" : "弱",
    score: result.score,
    status: result.status,
    strengthLevel: result.strengthLevel,
    specialPattern: result.specialPattern,
    seasonalAdjustment: result.seasonalAdjustment,
    conflictingElements: result.conflictingElements,
    recommendedElements: result.recommendedElements
  };
}

export interface BaZiResult {
  yearPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  monthPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  dayPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  hourPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  fiveElements: FiveElement[]
  dayMaster: FiveElement
  strength: "强" | "弱"
  strengthScore: number
  strengthStatus: string[]
  strengthLevel: string
  specialPattern?: string
  seasonalAdjustment?: string
  conflictingElements?: string
  recommendedElements?: string
}

interface LunarDate {
  year: number
  month: number
  day: number
  hour: number
}

// 这里需要添加一个农历转换库的依赖，暂时使用模拟数据
function convertToLunar(date: Date): LunarDate {
  // TODO: 集成农历转换库
  // 这里应该使用农历转换库进行实际转换
  // 目前返回模拟数据
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours()
  }
}

// 根据年干获取正月的天干
function getFirstMonthStem(yearStem: HeavenlyStem): HeavenlyStem {
  switch (yearStem) {
    case "甲":
    case "己":
      return "丙";
    case "乙":
    case "庚":
      return "戊";
    case "丙":
    case "辛":
      return "庚";
    case "丁":
    case "壬":
      return "壬";
    case "戊":
    case "癸":
      return "甲";
    default:
      throw new Error(`Invalid year stem: ${yearStem}`);
  }
}

export function calculateBaZi(birthTime: string): BaZiResult {
  // Convert ISO string to Date object
  const gregorianDate = new Date(birthTime);
  
  // Convert to lunar date using lunar-typescript
  const solar = Solar.fromDate(gregorianDate);
  const lunar = solar.getLunar();
  
  // Get lunar year
  const lunarYear = lunar.getYear();
  
  console.log('=== Debug Info ===');
  console.log('Solar date:', solar.toString());
  console.log('Lunar date:', lunar.toString());
  
  // Calculate year pillar
  const yearStem = HEAVENLY_STEMS[(lunarYear - 4) % 10];
  const yearBranch = EARTHLY_BRANCHES[(lunarYear - 4) % 12];
  
  console.log('Year stem:', yearStem);
  console.log('Year branch:', yearBranch);

  // Calculate month pillar based on solar terms
  // 节气月份对应表（节气开始日期为每月的第几天）
  const SOLAR_TERMS_DAYS: Record<string, [number, number]> = {
    "1": [6, 20],   // 小寒、大寒
    "2": [4, 19],   // 立春、雨水
    "3": [6, 21],   // 惊蛰、春分
    "4": [5, 20],   // 清明、谷雨
    "5": [6, 21],   // 立夏、小满
    "6": [6, 21],   // 芒种、夏至
    "7": [7, 23],   // 小暑、大暑
    "8": [8, 23],   // 立秋、处暑
    "9": [8, 23],   // 白露、秋分
    "10": [8, 24],  // 寒露、霜降
    "11": [7, 22],  // 立冬、小雪
    "12": [7, 22]   // 大雪、冬至
  };

  // 获取月份并确保在1-12范围内
  const rawMonth = solar.getMonth(); // 0-based
  const month = ((rawMonth % 12) + 12) % 12; // 确保月份在0-11范围内
  const day = solar.getDay();
  
  console.log('Raw month:', rawMonth);
  console.log('Normalized month:', month);
  
  // 确定节气月
  const monthKey = String(month + 1);
  if (!SOLAR_TERMS_DAYS[monthKey]) {
    console.error('Invalid month:', month + 1);
    throw new Error(`Invalid month: ${month + 1}`);
  }
  const monthStartDay = SOLAR_TERMS_DAYS[monthKey][0];
  
  // 计算节气月份（从寅月开始，寅月为0）
  let solarTermMonth;
  if (month === 11) {
    // 12月特殊处理
    if (day < monthStartDay) {
      solarTermMonth = 9; // 11月对应的节气月（从寅月开始数）
    } else {
      solarTermMonth = 10; // 12月对应的节气月（从寅月开始数）
    }
  } else {
    // 其他月份
    if (day < monthStartDay) {
      solarTermMonth = ((month - 1 + 12) % 12 - 2 + 12) % 12;
    } else {
      solarTermMonth = ((month + 12) % 12 - 2 + 12) % 12;
    }
  }
  
  // 计算月支
  const monthBranch = EARTHLY_BRANCHES[(solarTermMonth + 2) % 12];

  // 计算月干
  // 根据年干获取正月的天干起始
  const monthStemStart = YEAR_STEM_TO_MONTH_STEM_START[yearStem];
  // 计算当前月干的索引
  const monthStemIndex = (monthStemStart + solarTermMonth) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];

  console.log('=== Month Pillar Calculation ===');
  console.log('Solar Month:', month + 1);
  console.log('Solar Day:', day);
  console.log('Month Start Day:', monthStartDay);
  console.log('Solar Term Month (0 = 寅):', solarTermMonth);
  console.log('Month Stem Start:', HEAVENLY_STEMS[monthStemStart]);
  console.log('Month Stem Index:', monthStemIndex);
  console.log('Month Stem:', monthStem);
  console.log('Month Branch:', monthBranch);

  // Calculate day pillar using lunar-typescript's built-in method
  const dayGanZhi = lunar.getDayInGanZhi();
  const dayStem = dayGanZhi[0] as HeavenlyStem; // 第一个字符是天干
  const dayBranch = dayGanZhi[1] as EarthlyBranch; // 第二个字符是地支

  console.log('=== Day Pillar ===');
  console.log('Day GanZhi:', dayGanZhi);
  console.log('Day stem:', dayStem);
  console.log('Day branch:', dayBranch);

  // Calculate hour pillar
  // 时辰地支
  const hour = gregorianDate.getHours();
  const hourBranch = HOUR_TO_BRANCH[hour] || "子";
  // 时干根据日干推算
  const hourStemIndex = (HEAVENLY_STEMS.indexOf(dayStem) * 2 + Math.floor((hour + 1) / 2)) % 10;
  const hourStem = HEAVENLY_STEMS[hourStemIndex];

  console.log('=== Hour Pillar ===');
  console.log('Hour stem calculation:', `(${HEAVENLY_STEMS.indexOf(dayStem)} * 2 + ${Math.floor((hour + 1) / 2)}) % 10 = ${hourStemIndex}`);
  console.log('Hour stem:', hourStem);
  console.log('Hour branch:', hourBranch);

  // Get day master element
  const dayMasterElement = FIVE_ELEMENTS[dayStem];

  // Calculate strength
  const strengthResult = determineStrength(
    dayMasterElement,
    yearStem, yearBranch,
    monthStem, monthBranch,
    dayStem, dayBranch,
    hourStem, hourBranch
  );

  return {
    yearPillar: { stem: yearStem, branch: yearBranch },
    monthPillar: { stem: monthStem, branch: monthBranch },
    dayPillar: { stem: dayStem, branch: dayBranch },
    hourPillar: { stem: hourStem, branch: hourBranch },
    fiveElements: [
      FIVE_ELEMENTS[yearStem], FIVE_ELEMENTS[monthStem],
      FIVE_ELEMENTS[dayStem], FIVE_ELEMENTS[hourStem]
    ],
    dayMaster: dayMasterElement,
    strength: strengthResult.strength,
    strengthScore: strengthResult.score,
    strengthStatus: strengthResult.status,
    strengthLevel: strengthResult.strengthLevel,
    specialPattern: strengthResult.specialPattern,
    seasonalAdjustment: strengthResult.seasonalAdjustment,
    conflictingElements: strengthResult.conflictingElements,
    recommendedElements: strengthResult.recommendedElements
  };
} 
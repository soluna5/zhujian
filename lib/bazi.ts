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
}

// 月支对应表（寅月为正月）
const MONTH_TO_BRANCH: Record<number, EarthlyBranch> = {
  1: "寅", 2: "卯", 3: "辰",
  4: "巳", 5: "午", 6: "未",
  7: "申", 8: "酉", 9: "戌",
  10: "亥", 11: "子", 12: "丑"
}

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
const BRANCH_HIDDEN_STEMS = {
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

// 季节旺衰表
const SEASON_STRENGTH = {
  春: { 木: 1.2, 火: 1, 土: 0.8, 金: 0.6, 水: 0.8 },
  夏: { 木: 0.8, 火: 1.2, 土: 1, 金: 0.8, 水: 0.6 },
  秋: { 木: 0.6, 火: 0.8, 土: 0.8, 金: 1.2, 水: 1 },
  冬: { 木: 0.8, 火: 0.6, 土: 0.8, 金: 1, 水: 1.2 }
} as const;

// 根据月份获取季节
function getSeason(month: number): keyof typeof SEASON_STRENGTH {
  if (month >= 2 && month <= 4) return "春";
  if (month >= 5 && month <= 7) return "夏";
  if (month >= 8 && month <= 10) return "秋";
  return "冬";
}

// 计算五行强度
function calculateElementStrength(
  yearStem: HeavenlyStem,
  yearBranch: EarthlyBranch,
  monthStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  dayStem: HeavenlyStem,
  dayBranch: EarthlyBranch,
  hourStem: HeavenlyStem,
  hourBranch: EarthlyBranch,
  lunarMonth: number
): Record<FiveElement, number> {
  const strength: Record<FiveElement, number> = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0
  };

  console.log('=== Element Strength Calculation ===');
  console.log('Stems:', { yearStem, monthStem, dayStem, hourStem });
  console.log('Branches:', { yearBranch, monthBranch, dayBranch, hourBranch });

  // 获取季节强度系数
  const season = getSeason(lunarMonth);
  const seasonStrength = SEASON_STRENGTH[season];

  console.log('Season:', season);
  console.log('Season strength:', seasonStrength);

  // 计算天干的五行强度
  const stems = [yearStem, monthStem, dayStem, hourStem];
  stems.forEach(stem => {
    if (!FIVE_ELEMENTS[stem]) {
      console.error('Invalid stem:', stem);
      return;
    }
    const element = FIVE_ELEMENTS[stem];
    strength[element] += 1 * seasonStrength[element];
  });

  // 计算地支藏干的五行强度
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch];
  branches.forEach(branch => {
    if (!BRANCH_HIDDEN_STEMS[branch]) {
      console.error('Invalid branch:', branch);
      return;
    }
    const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
    hiddenStems.forEach(stem => {
      if (!FIVE_ELEMENTS[stem]) {
        console.error('Invalid hidden stem:', stem);
        return;
      }
      const element = FIVE_ELEMENTS[stem];
      strength[element] += 0.5 * seasonStrength[element];
    });
  });

  console.log('Final strength:', strength);
  return strength;
}

// 判断身强身弱
function determineStrength(
  dayMasterElement: FiveElement,
  elementStrengths: Record<FiveElement, number>
): "强" | "弱" {
  const dayMasterStrength = elementStrengths[dayMasterElement];
  const otherElementsAvg = (Object.values(elementStrengths).reduce((a, b) => a + b, 0) - dayMasterStrength) / 4;
  
  return dayMasterStrength > otherElementsAvg ? "强" : "弱";
}

// 根据身强身弱确定喜用神和忌用神
function determineFavorableElements(
  dayMasterElement: FiveElement,
  isStrong: boolean
): { favorable: FiveElement[]; unfavorable: FiveElement[] } {
  const relations = FIVE_ELEMENTS_RELATIONS[dayMasterElement];
  
  if (isStrong) {
    // 身强则喜克、泄、耗，忌生、助
    return {
      favorable: [relations.被克, relations.生, relations.克],  // 克：克我的，泄：我生的，耗：我克的
      unfavorable: [relations.被生, dayMasterElement] // 生：生我的，助：同我者
    };
  } else {
    // 身弱则喜生、助，忌克、泄、耗
    return {
      favorable: [relations.被生, dayMasterElement],  // 生：生我的，助：同我者
      unfavorable: [relations.被克, relations.生, relations.克] // 克：克我的，泄：我生的，耗：我克的
    };
  }
}

export interface BaZiResult {
  yearPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  monthPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  dayPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  hourPillar: { stem: HeavenlyStem; branch: EarthlyBranch }
  fiveElements: FiveElement[]
  favorable: FiveElement[]
  unfavorable: FiveElement[]
  recommendedCrystals: string[]
  dayMaster: FiveElement
  strength: "强" | "弱"
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

  // 计算五行强度
  const elementStrengths = calculateElementStrength(
    yearStem, yearBranch,
    monthStem, monthBranch,
    dayStem, dayBranch,
    hourStem, hourBranch,
    solar.getMonth()
  );

  // 获取日主五行
  const dayMasterElement = FIVE_ELEMENTS[dayStem];

  // 判断身强身弱
  const strength = determineStrength(dayMasterElement, elementStrengths);

  // 确定喜用神和忌用神
  const { favorable, unfavorable } = determineFavorableElements(dayMasterElement, strength === "强");

  // 计算所有出现的五行
  const fiveElements = calculateFiveElements(yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch);

  // 推荐水晶
  const recommendedCrystals = Object.entries(CRYSTAL_ELEMENTS)
    .filter(([, element]) => favorable.includes(element))
    .map(([crystal]) => crystal)
    .slice(0, 3);

  return {
    yearPillar: { stem: yearStem, branch: yearBranch },
    monthPillar: { stem: monthStem, branch: monthBranch },
    dayPillar: { stem: dayStem, branch: dayBranch },
    hourPillar: { stem: hourStem, branch: hourBranch },
    fiveElements,
    favorable,
    unfavorable,
    recommendedCrystals,
    dayMaster: dayMasterElement,
    strength
  };
}

// Helper functions for calculating five elements, favorable elements, etc.
function calculateFiveElements(yearStem: HeavenlyStem, yearBranch: EarthlyBranch, monthStem: HeavenlyStem, monthBranch: EarthlyBranch, dayStem: HeavenlyStem, dayBranch: EarthlyBranch, hourStem: HeavenlyStem, hourBranch: EarthlyBranch): FiveElement[] {
  const elements = new Set([
    FIVE_ELEMENTS[yearStem],
    FIVE_ELEMENTS[yearBranch],
    FIVE_ELEMENTS[monthStem],
    FIVE_ELEMENTS[monthBranch],
    FIVE_ELEMENTS[dayStem],
    FIVE_ELEMENTS[dayBranch],
    FIVE_ELEMENTS[hourStem],
    FIVE_ELEMENTS[hourBranch]
  ]);
  return Array.from(elements);
} 
import { Crystal, crystalData as allCrystals } from './crystalData';

// 主要需求枚举
export enum PrimaryNeed {
  RELATIONSHIP = 'relationship', // 情感关系
  WEALTH = 'wealth',           // 财富增长
  PROTECTION = 'protection',   // 能量防护
  BALANCE = 'balance',        // 身心平衡
  CAREER = 'career'           // 事业上升
}

// 常见情况枚举
export enum CommonSituation {
  INDECISIVE = 'indecisive',       // 决策犹豫
  FATIGUE = 'fatigue',             // 恢复能力差
  SOCIAL_DRAIN = 'socialDrain',    // 人际消耗大
  ENERGY_SENSITIVE = 'energySensitive' // 能量敏感
}

// 健康问题枚举
export enum HealthIssue {
  STRESS = 'stress',           // 长期压力/焦虑
  SLEEP = 'sleep',            // 睡眠质量不佳
  IMMUNITY = 'immunity',      // 免疫力低下
  CIRCULATION = 'circulation', // 血液循环不畅
  RESPIRATORY = 'respiratory', // 呼吸系统不适
  MOOD = 'mood',             // 情绪低落/缺乏活力
  HORMONAL = 'hormonal'      // 内分泌失调
}

// 初印象枚举
export enum Impression {
  WARM = 'warm',           // A如沐春风般的温暖亲和力
  RELIABLE = 'reliable',   // B沉稳可靠的专业权威感
  CHARMING = 'charming',   // C锋芒毕露的个人魅力值
  INSIGHTFUL = 'insightful', // D洞若观火的冷静洞察力
  MYSTERIOUS = 'mysterious'  // E摄人心魄的神秘吸引力
}

// 内在潜能枚举
export enum Potential {
  EMPATHY = 'empathy',     // A细腻共情力
  DECISION = 'decision',   // B理性决策力
  EXPRESSION = 'expression', // C卓越表达力
  INTUITION = 'intuition',   // D直觉敏锐度
  EFFICIENCY = 'efficiency'  // E高效行动力
}

// 问卷数据接口
export interface QuestionnaireData {
  birthChart: {
    mainElement: string;
    favorableElements: string[];
    unfavorableElements: string[];
  };
  questions: {
    primaryNeed: PrimaryNeed;
    commonSituation: CommonSituation;
    healthIssue: HealthIssue;
    desiredImpression: Impression;    // 新增：期望的初印象
    desiredPotential: Potential;      // 新增：期望的内在潜能
    excludedCrystals: string[];
  };
}

// 问题选项的详细信息
export const questionOptions = {
  primaryNeed: [
    {
      value: PrimaryNeed.RELATIONSHIP,
      label: 'a情感关系（桃花运/伴侣沟通）',
      description: '桃花运/伴侣沟通',
      relatedPurposes: ['爱情', '人际关系', '沟通', '自我接纳']
    },
    {
      value: PrimaryNeed.WEALTH,
      label: 'b财富增长（正财稳固/偏财机遇）',
      description: '正财稳固/偏财机遇',
      relatedPurposes: ['财运', '丰盛', '机遇', '稳定']
    },
    {
      value: PrimaryNeed.PROTECTION,
      label: 'c能量防护（屏蔽负能量/增强气场）',
      description: '屏蔽负能量/增强气场',
      relatedPurposes: ['保护', '净化', '能量提升', '防护']
    },
    {
      value: PrimaryNeed.BALANCE,
      label: 'd身心平衡（改善睡眠/缓解焦虑）',
      description: '改善睡眠/缓解焦虑',
      relatedPurposes: ['平静', '平衡', '放松', '治愈']
    },
    {
      value: PrimaryNeed.CAREER,
      label: 'E事业上升（项目顺利/升职加薪）',
      description: '项目顺利/升职加薪',
      relatedPurposes: ['事业', '领导力', '创造力', '决断力']
    }
  ],
  
  commonSituation: [
    {
      value: CommonSituation.INDECISIVE,
      label: 'a做重要决定时容易犹豫',
      relatedCorrections: ['优柔寡断', '意志不坚', '决策困难']
    },
    {
      value: CommonSituation.FATIGUE,
      label: 'b常感疲惫且恢复缓慢',
      relatedCorrections: ['能量不足', '精力不足', '生命力低']
    },
    {
      value: CommonSituation.SOCIAL_DRAIN,
      label: 'c人际关系消耗大量精力',
      relatedCorrections: ['人际阻碍', '能量漏失', '情感创伤']
    },
    {
      value: CommonSituation.ENERGY_SENSITIVE,
      label: 'd对环境能量异常敏感',
      relatedCorrections: ['能量干扰', '易受影响', '根轮不稳']
    }
  ],
  
  healthIssue: [
    {
      value: HealthIssue.STRESS,
      label: 'A. 长期压力 / 焦虑',
      relatedHealth: ['压力管理', '焦虑缓解', '心理平衡']
    },
    {
      value: HealthIssue.SLEEP,
      label: 'B. 睡眠质量不佳',
      relatedHealth: ['深度睡眠', '放松入眠', '梦境平静']
    },
    {
      value: HealthIssue.IMMUNITY,
      label: 'C. 免疫力低下',
      relatedHealth: ['免疫增强', '抵抗力提升', '生命力强化']
    },
    {
      value: HealthIssue.CIRCULATION,
      label: 'D. 血液循环不畅',
      relatedHealth: ['血液循环', '气血调和', '经络疏通']
    },
    {
      value: HealthIssue.RESPIRATORY,
      label: 'E. 呼吸系统不适',
      relatedHealth: ['呼吸顺畅', '肺部健康', '气息平稳']
    },
    {
      value: HealthIssue.MOOD,
      label: 'F. 情绪低落 / 缺乏活力',
      relatedHealth: ['情绪提升', '活力恢复', '积极心态']
    },
    {
      value: HealthIssue.HORMONAL,
      label: 'G. 内分泌失调',
      relatedHealth: ['荷尔蒙平衡', '内分泌调节', '代谢改善']
    }
  ]
};

// 根据问卷答案获取相关的功能需求
export function getPurposeFromPrimaryNeed(need: PrimaryNeed): string {
  const option = questionOptions.primaryNeed.find(opt => opt.value === need);
  if (!option) throw new Error('Invalid primary need');
  
  // 从相关功能中随机选择一个
  const purposes = option.relatedPurposes;
  return purposes[Math.floor(Math.random() * purposes.length)];
}

// 根据问卷答案获取相关的修正需求
export function getCorrectionFromSituation(situation: CommonSituation): string {
  const option = questionOptions.commonSituation.find(opt => opt.value === situation);
  if (!option) throw new Error('Invalid common situation');
  
  // 从相关修正中随机选择一个
  const corrections = option.relatedCorrections;
  return corrections[Math.floor(Math.random() * corrections.length)];
}

// 根据问卷答案获取相关的健康需求
export function getHealthFromIssue(issue: HealthIssue): string {
  const option = questionOptions.healthIssue.find(opt => opt.value === issue);
  if (!option) throw new Error('Invalid health issue');
  
  // 从相关健康需求中随机选择一个
  const healthNeeds = option.relatedHealth;
  return healthNeeds[Math.floor(Math.random() * healthNeeds.length)];
}

// 验证问卷数据
export function validateQuestionnaireData(data: QuestionnaireData): boolean {
  // 验证八字命理数据
  const elementOptions = ['金', '木', '水', '火', '土'];
  
  if (!elementOptions.includes(data.birthChart.mainElement)) {
    return false;
  }
  
  if (!data.birthChart.favorableElements.every(element => elementOptions.includes(element))) {
    return false;
  }
  
  if (!data.birthChart.unfavorableElements.every(element => elementOptions.includes(element))) {
    return false;
  }
  
  // 验证问卷答案
  if (!Object.values(PrimaryNeed).includes(data.questions.primaryNeed)) {
    return false;
  }
  
  if (!Object.values(CommonSituation).includes(data.questions.commonSituation)) {
    return false;
  }
  
  if (!Object.values(HealthIssue).includes(data.questions.healthIssue)) {
    return false;
  }
  
  // 验证排除的水晶
  const allCrystals = getAllCrystals();
  if (!data.questions.excludedCrystals.every(
    crystal => allCrystals.some(c => c.id === crystal)
  )) {
    return false;
  }
  
  return true;
}

// 处理问卷答案，返回水晶选择所需的参数
export function processQuestionnaireData(data: QuestionnaireData) {
  return {
    mainElement: data.birthChart.mainElement,
    favorableElements: data.birthChart.favorableElements,
    unfavorableElements: data.birthChart.unfavorableElements,
    desiredPurpose: getPurposeFromPrimaryNeed(data.questions.primaryNeed),
    desiredCorrection: getCorrectionFromSituation(data.questions.commonSituation),
    desiredHealth: getHealthFromIssue(data.questions.healthIssue),
    desiredImpression: data.questions.desiredImpression,
    desiredPotential: data.questions.desiredPotential,
    excludedTypes: data.questions.excludedCrystals
  };
}

export function getAllCrystals(): Crystal[] {
  return allCrystals.map((c: Crystal) => ({
    ...c,
    // 添加任何需要的转换
  }));
} 
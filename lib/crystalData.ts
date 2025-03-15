import { PrimaryNeed, CommonSituation } from './questionnaire';

// 更新水晶数据结构
export interface Crystal {
  id: string;
  name: string;
  description: string;
  images: {
    spacer: string;     // 垫片图
    round: string;      // 普通圆形珠子图
    raw: string;        // 原石图
  };
  destinyAttributes: {
    supportiveElements: string[];
    unsupportiveElements: string[];
  };
  functionalAttributes: {
    primaryPurposes: {
      relationship?: boolean;
      wealth?: boolean;
      protection?: boolean;
      balance?: boolean;
      career?: boolean;
    };
    impressions?: {      // 初印象属性
      warm?: boolean;    // A如沐春风般的温暖亲和力
      reliable?: boolean; // B沉稳可靠的专业权威感
      charming?: boolean; // C锋芒毕露的个人魅力值
      insightful?: boolean; // D洞若观火的冷静洞察力
      mysterious?: boolean; // E摄人心魄的神秘吸引力
    };
  };
  correctiveAttributes: {
    correctiveProperties: {
      indecisive?: boolean;
      fatigue?: boolean;
      socialDrain?: boolean;
      energySensitive?: boolean;
    };
    potentials?: {       // 内在潜能属性
      empathy?: boolean;  // A细腻共情力
      decision?: boolean; // B理性决策力
      expression?: boolean; // C卓越表达力
      intuition?: boolean;  // D直觉敏锐度
      efficiency?: boolean; // E高效行动力
    };
    healthIssues?: {     // 健康问题属性
      stress?: boolean;   // A长期压力/焦虑
      sleep?: boolean;    // B睡眠质量不佳
      immunity?: boolean; // C免疫力低下
      circulation?: boolean; // D血液循环不畅
      respiratory?: boolean; // E呼吸系统不适
      mood?: boolean;     // F情绪低落/缺乏活力
      hormonal?: boolean; // G内分泌失调
    };
  };
  incompatibleWith: string[];
}

// 这里是水晶数据数组和相关函数
// ... 其他代码保持不变 ...

export function filterCrystalsByPrimaryNeed(need: PrimaryNeed): Crystal[] {
  return crystalData.filter(crystal => 
    crystal.functionalAttributes.primaryPurposes[need]
  );
}

export function filterCrystalsByCorrectiveSituation(situation: CommonSituation): Crystal[] {
  return crystalData.filter(crystal => 
    crystal.correctiveAttributes.correctiveProperties[situation]
  );
}

export function getCrystalPrimaryPurposes(crystal: Crystal): string[] {
  // 实现代码
  return [];
}

export function getCrystalCorrectiveProperties(crystal: Crystal): string[] {
  // 实现代码
  return [];
}

export function getCrystalData(): Crystal[] {
  // 返回所有水晶数据
  return crystalData;
}

// 这里是水晶数据数组
export const crystalData: Crystal[] = [
  // 紫水晶 - 强化冥想和精神意识特性
  {
    id: "zishuijing",
    name: "紫水晶",
    description: "紫水晶是一种强大的保护石，能净化周围的负面能量场，显著增强直觉和灵性意识。紫水晶有助于深层冥想和内在成长，能改善睡眠质量，让心灵获得平静。",
    images: {
      spacer: "/images/crystals/amethyst/spacer.png",
      round: "/images/crystals/amethyst/round.png",
      raw: "/images/crystals/amethyst/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: true,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,  // D洞若观火的冷静洞察力
        warm: false,       // A如沐春风般的温暖亲和力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        fatigue: false,
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,   // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: true,       // B睡眠质量不佳
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  // 粉晶 - 强化情感和人际关系特性
  {
    id: "fenjing",
    name: "粉晶",
    description: "粉晶象征着爱与和谐的力量，能有效促进人际关系的和睦，增强自我接纳和理解。粉晶温和的能量可以打开心轮，帮助释放情感创伤，让人感受到温暖与关爱。",
    images: {
      spacer: "/images/crystals/fenjing/spacer.png",
      round: "/images/crystals/fenjing/round.png",
      raw: "/images/crystals/fenjing/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        charming: false,   // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        energySensitive: false,
        fatigue: false,
        indecisive: false
      },
      potentials: {
        empathy: true,     // A细腻共情力
        expression: false, // C卓越表达力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true,    // G内分泌失调
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false
      }
    },
    incompatibleWith: ["黑碧玺", "青金石"]
  },
  // 白水晶
  {
    id: "clear_quartz",
    name: "白水晶",
    description: "白水晶被誉为水晶之王，是最全能的能量放大器和转化器。白水晶具有极强的净化和编程能力，能帮助使用者厘清思绪，增强意志力，是修行和冥想的绝佳伴侣。",
    images: {
      spacer: "/images/crystals/clear_quartz/spacer.png",
      round: "/images/crystals/clear_quartz/round.png",
      raw: "/images/crystals/clear_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["金", "水", "木", "火", "土"],
      unsupportiveElements: []
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,   // 保留保护属性作为其核心特质
        balance: false,     // 改为false
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,  // 保留洞察力作为其核心特质
        reliable: false,   // 改为false
        warm: false,
        charming: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,  // 保留能量敏感作为其核心特质
        fatigue: false,         // 改为false
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,   // 保留直觉作为其核心特质
        decision: false,   // 改为false
        empathy: false,
        expression: false,
        efficiency: false
      },
    },
    incompatibleWith: []
  },
  // 黄水晶 - 强化财富和事业特性
  {
    id: "citrine",
    name: "黄水晶",
    description: "黄水晶是强大的财富之石，能带来丰盛和富足的能量。黄水晶可以激发创造力和积极性，注入充沛的活力，驱散负面情绪，是事业和财运的有力助手。",
    images: {
      spacer: "/images/crystals/citrine/spacer.png",
      round: "/images/crystals/citrine/round.png",
      raw: "/images/crystals/citrine/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "火"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        wealth: true,
        career: true,
        relationship: false,
        protection: false,
        balance: false
      },
      impressions: {
        charming: true,    // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        indecisive: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,  // E高效行动力
        decision: false,   // B理性决策力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        immunity: true,    // C免疫力低下
        mood: true,        // F情绪低落/缺乏活力
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false,
        hormonal: false
      }
    },
    incompatibleWith: ["紫水晶"]
  },
  // 黑曜石 - 强化保护和接地特性
  {
    id: "black_obsidian",
    name: "黑曜石",
    description: "黑曜石是一种强大的保护石，能有效隔绝外界的负面能量，为使用者提供坚实的精神屏障。黑曜石如同能量之镜，帮助使用者直面内在阴影，促进自我认知和成长。",
    images: {
      spacer: "/images/crystals/black_obsidian/spacer.png",
      round: "/images/crystals/black_obsidian/round.png",
      raw: "/images/crystals/black_obsidian/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火", "木"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        relationship: false,
        wealth: false,
        balance: false,
        career: false
      },
      impressions: {
        reliable: true,    // B沉稳可靠的专业权威感
        insightful: false, // D洞若观火的冷静洞察力
        warm: false,       // A如沐春风般的温暖亲和力
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        indecisive: false,
        fatigue: false,
        socialDrain: false
      },
      potentials: {
        decision: true,    // B理性决策力
        intuition: false,  // D直觉敏锐度
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["紫水晶", "月光石"]
  },
  // 月光石
  {
    id: "yuelongshi",
    name: "月光石",
    description: "月光石能显著增强直觉力，平衡情绪波动，是女性能量的完美象征。月光石柔和的光芒能安抚不安的心绪，增强敏感度，促进与高我的连接。",
    images: {
      spacer: "/images/crystals/moonstone/spacer.png",
      round: "/images/crystals/moonstone/round.png",
      raw: "/images/crystals/moonstone/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,    // 保留关系属性作为核心
        balance: false,        // 移除平衡属性
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,           // 保留温暖特质
        insightful: false,    // 移除洞察特质
        reliable: false,
        charming: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: false,     // 移除社交耗能
        energySensitive: true,  // 添加能量敏感
        fatigue: false,
        indecisive: false
      },
      potentials: {
        empathy: true,        // 保留共情力
        intuition: false,     // 移除直觉
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: false,
        sleep: true,         // 添加睡眠问题
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石", "太阳石"]
  },
  // 青金石 - 强化表达和智慧特性
  {
    id: "lapis_lazuli",
    name: "青金石",
    description: "青金石象征着智慧与真实的表达能力，能增强沟通能力和领导魅力。青金石可以开启第三眼轮和喉轮，增强精神洞察力，促进真理的探索。",
    images: {
      spacer: "/images/crystals/qingjinshi/spacer.png",
      round: "/images/crystals/qingjinshi/round.png",
      raw: "/images/crystals/qingjinshi/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        career: true,
        protection: false,
        relationship: false,
        wealth: false,
        balance: false
      },
      impressions: {
        charming: true,     // C锋芒毕露的个人魅力值
        insightful: false,  // D洞若观火的冷静洞察力
        warm: false,        // A如沐春风般的温暖亲和力
        reliable: false     // B沉稳可靠的专业权威感
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: false,
        indecisive: true,
        energySensitive: false,
        fatigue: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        intuition: false,  // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true, // E呼吸系统不适
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["粉晶", "绿松石"]
  },
  
  // 红玛瑙 - 强化勇气和活力特性
  {
    id: "red_agate",
    name: "红玛瑙",
    description: "红玛瑙是充满活力的保护石，能增强使用者的勇气和自信心。红玛瑙可以激发内在动力，改善血液循环，增强体质，是提升个人能量的理想选择。",
    images: {
      spacer: "/images/crystals/red_agate/spacer.png",
      round: "/images/crystals/red_agate/round.png",
      raw: "/images/crystals/red_agate/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        career: false,
        relationship: false,
        wealth: false,
        balance: false
      },
      impressions: {
        reliable: false,   // B沉稳可靠的专业权威感
        charming: true,    // C锋芒毕露的个人魅力值
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        indecisive: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,  // E高效行动力
        decision: false,   // B理性决策力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: true, // D血液循环不畅
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["月光石"]
  },
  
  // 茶晶（烟晶）- 强化接地和压力释放特性
  {
    id: "smoky_quartz",
    name: "茶晶",
    description: "茶晶是强大的净化石，能有效吸收周围的负面能量，消除压力和焦虑情绪。茶晶可以稳定情绪波动，帮助使用者保持冷静和理性，是现代人的必备能量工具。",
    images: {
      spacer: "/images/crystals/smoky_quartz/spacer.png",
      round: "/images/crystals/smoky_quartz/round.png",
      raw: "/images/crystals/smoky_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,    // 保留保护属性
        balance: false,      // 移除平衡属性
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        reliable: true,     // 保留可靠特质
        insightful: false,
        warm: false,
        charming: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,      // 保留疲劳特质
        energySensitive: false,
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        decision: true,     // 保留决策力
        intuition: false,
        empathy: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,       // 保留压力问题
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黄水晶"]
  },
  
  // 绿幽灵 - 强化创造力和繁荣特性
  {
    id: "green_phantom",
    name: "绿幽灵",
    description: "绿幽灵蕴含着神秘的生命能量，能促进个人的全方位成长和转变。绿幽灵可以增强直觉和创造力，带来繁荣和丰盛，是实现愿望的催化剂。",
    images: {
      spacer: "/images/crystals/green_phantom/spacer.png",
      round: "/images/crystals/green_phantom/round.png",
      raw: "/images/crystals/green_phantom/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        wealth: true,
        career: false,
        relationship: false,
        protection: false,
        balance: false
      },
      impressions: {
        insightful: true,  // D洞若观火的冷静洞察力
        charming: false,   // C锋芒毕露的个人魅力值
        warm: false,       // A如沐春风般的温暖亲和力
        reliable: false    // B沉稳可靠的专业权威感
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: false,
        energySensitive: true,
        fatigue: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,   // D直觉敏锐度
        expression: false, // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: true,    // C免疫力低下
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  // 海蓝宝
  {
    id: "aquamarine",
    name: "海蓝宝",
    description: "海蓝宝能净化心灵，增强勇气和沟通能力。海蓝宝石温和的能量可以安抚焦躁的情绪，增强表达能力和创造力，让人如沐春风。",
    images: {
      spacer: "/images/crystals/aquamarine/spacer.png",
      round: "/images/crystals/aquamarine/round.png",
      raw: "/images/crystals/aquamarine/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: true,  // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: false,
        indecisive: true,
        fatigue: false,
        energySensitive: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true, // E呼吸系统不适
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["红玛瑙"]
  },
  // 石榴石
  {
    id: "garnet",
    name: "石榴石",
    description: "石榴石充满强大的生命力能量，能激发使用者的热情和创造力。石榴石可以增强意志力和行动力，是事业和健康的守护石，能带来源源不断的动力。",
    images: {
      spacer: "/images/crystals/garnet/spacer.png",
      round: "/images/crystals/garnet/round.png",
      raw: "/images/crystals/garnet/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        career: true,
        relationship: false,
        wealth: false,
        balance: false
      },
      impressions: {
        charming: true,    // C锋芒毕露的个人魅力值
        reliable: true,    // B沉稳可靠的专业权威感
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        indecisive: true,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,  // E高效行动力
        decision: true,    // B理性决策力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: true, // D血液循环不畅
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: false
      }
    },
    incompatibleWith: ["月光石"]
  },
  // 红纹石
  {
    id: "red_rutilated_quartz",
    name: "红纹石",
    description: "红纹石是强大的能量激活石，能增强使用者的个人力量和决断力。红纹石可以加速愿望的实现，增强行动力，帮助突破困境，实现目标。",
    images: {
      spacer: "/images/crystals/red_rutilated_quartz/spacer.png",
      round: "/images/crystals/red_rutilated_quartz/round.png",
      raw: "/images/crystals/red_rutilated_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "金"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        career: true,
        protection: true,
        relationship: false,
        wealth: false,
        balance: false
      },
      impressions: {
        reliable: true,    // B沉稳可靠的专业权威感
        charming: true,    // C锋芒毕露的个人魅力值
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        fatigue: true,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        decision: true,    // B理性决策力
        efficiency: true,  // E高效行动力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: true, // D血液循环不畅
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  
  // 绿松石
  {
    id: "turquoise",
    name: "绿松石",
    description: "绿松石是古老的保护石，能为使用者带来好运和内心的平静。绿松石可以增强沟通和创造力，是旅行者的守护石，能在人生旅途中提供指引。",
    images: {
      spacer: "/images/crystals/turquoise/spacer.png",
      round: "/images/crystals/turquoise/round.png",
      raw: "/images/crystals/turquoise/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        relationship: true,
        wealth: false,
        balance: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        insightful: true,  // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        energySensitive: true,
        fatigue: false,
        indecisive: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        empathy: true,     // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true, // E呼吸系统不适
        mood: true,        // F情绪低落/缺乏活力
        hormonal: false
      }
    },
    incompatibleWith: ["青金石"]
  },
  // 东陵玉
  {
    id: "dongling_jade",
    name: "东陵玉",
    description: "东陵玉承载着东方古老的智慧精髓，能为使用者带来平衡和和谐。东陵玉可以安抚心神，帮助找到内在的中庸之道，是修身养性的上佳选择。",
    images: {
      spacer: "/images/crystals/dongling_jade/spacer.png",
      round: "/images/crystals/dongling_jade/round.png",
      raw: "/images/crystals/dongling_jade/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        balance: true,
        protection: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        reliable: true,    // B沉稳可靠的专业权威感
        insightful: false,  // D洞若观火的冷静洞察力
        warm: false,       // A如沐春风般的温暖亲和力
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        indecisive: false,
        socialDrain: false,
        fatigue: false
      },
      potentials: {
        intuition: false,   // D直觉敏锐度
        decision: true,    // B理性决策力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: false,       // B睡眠质量不佳
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false     // G内分泌失调
      }
    },
    incompatibleWith: ["黑碧玺"]
  },
  // 橄榄石
  {
    id: "peridot",
    name: "橄榄石",
    description: "橄榄石能带来丰盛和繁荣的能量，有效净化负面能量。橄榄石可以增强活力和创造力，吸引财富和机遇，是招财转运的有力助手。",
    images: {
      spacer: "/images/crystals/peridot/spacer.png",
      round: "/images/crystals/peridot/round.png",
      raw: "/images/crystals/peridot/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        wealth: true,
        balance: false,
        protection: false,
        relationship: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        charming: false,   // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        indecisive: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,  // E高效行动力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        immunity: true,    // C免疫力低下
        mood: true,        // F情绪低落/缺乏活力
        hormonal: false,   // G内分泌失调
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 蓝晶石
  {
    id: "kyanite",
    name: "蓝晶石",
    description: "蓝晶石是沟通的桥梁，能促进表达能力和灵性成长。蓝晶石可以增强冥想效果，帮助表达内心真实想法，促进与高维能量的连接。",
    images: {
      spacer: "/images/crystals/kyanite/spacer.png",
      round: "/images/crystals/kyanite/round.png",
      raw: "/images/crystals/kyanite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false, // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: true     // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: false,
        energySensitive: false,
        fatigue: false,
        indecisive: true
      },
      potentials: {
        expression: true,  // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["红纹石"]
  },
  // 葡萄石 - 强化直觉和冥想特性
  {
    id: "prehnite",
    name: "葡萄石",
    description: "葡萄石充满温和的治愈能量，能增强使用者的直觉和预知能力。葡萄石可以安抚心灵，帮助连接更高的指引，是灵性成长的重要伴侣。",
    images: {
      spacer: "/images/crystals/prehnite/spacer.png",
      round: "/images/crystals/prehnite/round.png",
      raw: "/images/crystals/prehnite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: true,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: false,        // A如沐春风般的温暖亲和力
        insightful: true,   // D洞若观火的冷静洞察力
        reliable: true,    // B沉稳可靠的专业权威感
        charming: false     // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        fatigue: false,
        indecisive: true,
        socialDrain: false
      },
      potentials: {
        intuition: true,   // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: true,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: true,       // B睡眠质量不佳
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  
  // 绿草莓晶 - 强化心灵成长和爱的能量特性
  {
    id: "green_strawberry_quartz",
    name: "绿草莓晶",
    description: "绿草莓晶能增强心灵成长和爱的能量，促进整体的平衡和和谐。绿草莓晶带来温和的治愈和保护力量，帮助打开心轮，接纳生命的美好。",
    images: {
      spacer: "/images/crystals/green_strawberry_quartz/spacer.png",
      round: "/images/crystals/green_strawberry_quartz/round.png",
      raw: "/images/crystals/green_strawberry_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        insightful: false, // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      }
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        fatigue: false,
        indecisive: false,
        energySensitive: false
      },
      potentials: {
        empathy: true,     // A细腻共情力
        intuition: false,  // D直觉敏锐度
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: true,    // C免疫力低下
        circulation: false,
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true     // G内分泌失调
      }
    },
    incompatibleWith: ["黑碧玺"]
  },
  // 蓝纹玛瑙 - 强化沟通和表达特性
  {
    id: "blue_lace_agate",
    name: "蓝纹玛瑙",
    description: "蓝纹玛瑙能促进有效的沟通和表达，为使用者带来深层的平静与宁静。蓝纹玛瑙可以增强冷静和清晰的思维能力，帮助在交流中保持优雅。",
    images: {
      spacer: "/images/crystals/blue_lace_agate/spacer.png",
      round: "/images/crystals/blue_lace_agate/round.png",
      raw: "/images/crystals/blue_lace_agate/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false, // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: true     // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        energySensitive: false,
        fatigue: false,
        indecisive: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true, // E呼吸系统不适
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["红玛瑙"]
  },
  // 蔷薇辉石 - 强化情感治愈和平衡特性
  {
    id: "rhodonite",
    name: "蔷薇辉石",
    description: "蔷薇辉石能促进爱与平衡的能量，增强情感的治愈和自我价值的认知。蔷薇辉石可以带来平静和勇气的能量，帮助释放情感创伤。",
    images: {
      spacer: "/images/crystals/rhodonite/spacer.png",
      round: "/images/crystals/rhodonite/round.png",
      raw: "/images/crystals/rhodonite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false,   // C锋芒毕露的个人魅力值
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        fatigue: false,
        indecisive: false,
        energySensitive: false
      },
      potentials: {
        empathy: true,     // A细腻共情力
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: true, // D血液循环不畅
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true     // G内分泌失调
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 天青石 - 强化精神意识和天使沟通特性
  {
    id: "celestite",
    name: "天青石",
    description: "天青石能增强精神意识和高维沟通的能力，为使用者带来深层的平静与智慧。天青石可以改善睡眠质量，净化心灵，是冥想和灵修的理想伴侣。",
    images: {
      spacer: "/images/crystals/celestite/spacer.png",
      round: "/images/crystals/celestite/round.png",
      raw: "/images/crystals/celestite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        balance: true,
        protection: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,  // D洞若观火的冷静洞察力
        warm: false,       // A如沐春风般的温暖亲和力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        socialDrain: false,
        fatigue: false,
        indecisive: false
      },
      potentials: {
        intuition: true,   // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,      // A长期压力/焦虑
        sleep: true,       // B睡眠质量不佳
        immunity: false,
        circulation: false,
        respiratory: true, // E呼吸系统不适
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["红玛瑙", "红碧玉"]
  },
  
  
  // 金发晶 - 强化财富和决断力特性
  {
    id: "golden_rutilated_quartz",
    name: "金发晶",
    description: "金发晶是强大的能量激活石，能促进财富和事业的蓬勃发展。金发晶可以增强个人魅力，带来好运和机遇，是事业腾飞的助推器。",
    images: {
      spacer: "/images/crystals/golden_rutilated_quartz/spacer.png",
      round: "/images/crystals/golden_rutilated_quartz/round.png",
      raw: "/images/crystals/golden_rutilated_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["金", "火"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        wealth: true,
        career: false,
        protection: false,
        relationship: false,
        balance: false
      },
      impressions: {
        charming: true,    // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: false,
        fatigue: true,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,  // E高效行动力
        decision: false,   // B理性决策力
        empathy: false,    // A细腻共情力
        expression: false, // C卓越表达力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: true,    // C免疫力低下
        circulation: true, // D血液循环不畅
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  
  // 草莓晶 - 强化爱的能量和情感治愈特性
  {
    id: "strawberry_quartz",
    name: "草莓晶",
    description: "草莓晶充满温暖的爱的能量，能促进深层的情感治愈。草莓晶可以打开心轮，帮助接纳和疗愈内在创伤，让心灵重获温暖与力量。",
    images: {
      spacer: "/images/crystals/strawberry_quartz/spacer.png",
      round: "/images/crystals/strawberry_quartz/round.png",
      raw: "/images/crystals/strawberry_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        charming: false,   // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        fatigue: false,
        indecisive: false,
        energySensitive: false
      },
      potentials: {
        empathy: true,     // A细腻共情力
        expression: false, // C卓越表达力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true     // G内分泌失调
      }
    },
    incompatibleWith: ["黑碧玺"]
  },
  // 蓝磷灰 - 强化沟通和创造力特性
  {
    id: "blue_apatite",
    name: "蓝磷灰",
    description: "蓝磷灰是创意与表达的有力催化剂，能显著增强沟通能力。蓝磷灰可以开启智慧之门，促进学习和记忆力的提升，是求知者的理想搭档。",
    images: {
      spacer: "/images/crystals/blue_apatite/spacer.png",
      round: "/images/crystals/blue_apatite/round.png",
      raw: "/images/crystals/blue_apatite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        career: true,
        balance: true,
        relationship: false,
        wealth: false,
        protection: false
      },
      impressions: {
        insightful: true,  // D洞若观火的冷静洞察力
        charming: true,   // C锋芒毕露的个人魅力值
        warm: false,       // A如沐春风般的温暖亲和力
        reliable: false    // B沉稳可靠的专业权威感
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        energySensitive: true,
        fatigue: false,
        socialDrain: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        intuition: true,  // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: true,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: true,
        mood: true,
        hormonal: false
      }
    },
    incompatibleWith: ["红玛瑙"]
  },
  
  // 黄方解石 - 强化自信和积极能量特性
  {
    id: "yellow_calcite",
    name: "黄方解石",
    description: "黄方解石散发着温暖的阳光能量，能增强自信和学习能力。黄方解石可以激活太阳轮，带来积极乐观的心态，提升个人能量场。",
    images: {
      spacer: "/images/crystals/yellow_calcite/spacer.png",
      round: "/images/crystals/yellow_calcite/round.png",
      raw: "/images/crystals/yellow_calcite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "火"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        wealth: true,
        career: true,
        relationship: false,
        protection: false,
        balance: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        charming: true,   // C锋芒毕露的个人魅力值
        reliable: false,   // B沉稳可靠的专业权威感
        insightful: false  // D洞若观火的冷静洞察力
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        indecisive: false,
        socialDrain: false,
        energySensitive: true
      },
      potentials: {
        efficiency: true,  // E高效行动力
        expression: true, // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false   // D直觉敏锐度
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: true,    // C免疫力低下
        circulation: false,
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true     // G内分泌失调
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 天河石 - 强化沟通和表达特性
  {
    id: "amazonite",
    name: "天河石",
    description: "天河石能促进有效的沟通和自我表达，增强使用者的勇气和自信心。天河石可以平衡情绪波动，带来和谐的人际关系，是社交场合的得力助手。",
    images: {
      spacer: "/images/crystals/amazonite/spacer.png",
      round: "/images/crystals/amazonite/round.png",
      raw: "/images/crystals/amazonite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: false,       // A如沐春风般的温暖亲和力
        insightful: false, // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: true     // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        energySensitive: false,
        fatigue: false,
        indecisive: false
      },
      potentials: {
        expression: true,  // C卓越表达力
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        intuition: false,  // D直觉敏锐度
        efficiency: false  // E高效行动力
      },
    },
    incompatibleWith: ["红玛瑙"]
  },
  
  // 绿荧石 - 强化心灵平衡和情感治愈特性
  {
    id: "green_fluorite",
    name: "绿荧石",
    description: "绿荧石是心灵平衡的守护石，能促进深层的情感治愈。绿荧石可以净化心轮，带来内在的平静与和谐，帮助找回内心的平衡。",
    images: {
      spacer: "/images/crystals/green_fluorite/spacer.png",
      round: "/images/crystals/green_fluorite/round.png",
      raw: "/images/crystals/green_fluorite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        balance: true,
        protection: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,  // D洞若观火的冷静洞察力
        warm: false,       // A如沐春风般的温暖亲和力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        indecisive: false,
        fatigue: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,   // D直觉敏锐度
        empathy: false,    // A细腻共情力
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
    },
    incompatibleWith: ["红玛瑙"]
  },
  
  // 绿草莓晶
  {
    id: "green_strawberry_quartz",
    name: "绿草莓晶",
    description: "绿草莓晶融合着爱与生机的能量，能促进全方位的心灵成长。绿草莓晶可以滋养心轮，增强与自然的连接，带来生命的活力与喜悦。",
    images: {
      spacer: "/images/crystals/green_strawberry_quartz/spacer.png",
      round: "/images/crystals/green_strawberry_quartz/round.png",
      raw: "/images/crystals/green_strawberry_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "水"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        balance: false,
        protection: false,
        wealth: false,
        career: false
      },
      impressions: {
        warm: true,        // A如沐春风般的温暖亲和力
        insightful: false, // D洞若观火的冷静洞察力
        reliable: false,   // B沉稳可靠的专业权威感
        charming: false    // C锋芒毕露的个人魅力值
      }
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        fatigue: false,
        indecisive: false,
        energySensitive: false
      },
      potentials: {
        empathy: true,     // A细腻共情力
        intuition: false,  // D直觉敏锐度
        decision: false,   // B理性决策力
        expression: false, // C卓越表达力
        efficiency: false  // E高效行动力
      },
      healthIssues: {
        stress: false,
        sleep: false,
        immunity: true,    // C免疫力低下
        circulation: false,
        respiratory: false,
        mood: true,        // F情绪低落/缺乏活力
        hormonal: true     // G内分泌失调
      }
    },
    incompatibleWith: ["黑碧玺"]
  }
]; 
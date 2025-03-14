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
    description: "强大的保护石，能净化能量场，增强直觉和灵性意识。有助于冥想和内在成长，改善睡眠质量。",
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
    description: "爱与和谐的象征，促进人际关系，增强自我接纳。温和的能量可以打开心轮，帮助释放情感创伤。",
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
    description: "水晶之王，最全能的能量放大器。具有极强的净化和编程能力，帮助厘清思绪，增强意志力。",
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
    description: "强大的财富石，带来富足和丰盛能量。激发创造力和积极性，注入活力，驱散负面情绪。",
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
    description: "强大的保护石，隔绝负面能量，提供精神屏障。如能量之镜，帮助直面内在阴影，促进自我认知。",
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
    description: "增强直觉，平衡情绪，是女性能量的象征。柔和的光芒安抚不安的心绪，增强敏感度。",
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
    description: "智慧与真实表达的象征，增强沟通能力和领导魅力。开启第三眼轮和喉轮，增强精神洞察力。",
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
    description: "充满活力的保护石，增强勇气和自信。激发内在动力，改善血液循环，增强体质。",
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
    description: "强大的净化石，吸收负面能量，消除压力和焦虑。稳定情绪，帮助保持冷静和理性。",
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
    description: "蕴含神秘生命能量，促进个人成长和转变。增强直觉和创造力，带来繁荣和丰盛。",
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
    description: "净化心灵，增强勇气和沟通能力。安抚焦躁情绪，增强表达能力和创造力。",
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
    description: "充满生命力的能量石，激发热情和创造力。增强意志力和行动力，是事业和健康的守护石。",
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
    description: "强大的能量激活石，增强个人力量和决断力。加速愿望实现，增强行动力。",
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
    description: "古老的保护石，带来好运和平静。增强沟通和创造力，是旅行者的守护石。",
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
    description: "承载东方古老智慧，带来平衡和和谐。安抚心神，帮助找到内在的中庸之道。",
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
    description: "带来丰盛和繁荣，净化负面能量。增强活力和创造力，吸引财富和机遇。",
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
    description: "沟通的桥梁，促进表达和灵性成长。增强冥想效果，帮助表达内心真实想法。",
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
    description: "充满治愈能量，增强直觉和预知能力。安抚心灵，帮助连接更高的指引。",
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
    description: "增强心灵成长和爱的能量，促进平衡和和谐。带来治愈和保护的力量。",
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
    description: "促进沟通和表达，带来平静和宁静。增强冷静和清晰的思维能力。",
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
    description: "促进爱与平衡，增强情感治愈和自我价值。带来平静和勇气的能量。",
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
    description: "增强精神意识和高维沟通，带来深层的平静与智慧。改善睡眠，净化心灵。",
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
    description: "强大的能量激活石，促进财富和事业发展。增强个人魅力，带来好运和机遇。",
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
    description: "充满温暖的爱的能量，促进情感治愈。打开心轮，帮助接纳和疗愈内在创伤。",
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
    description: "创意与表达的催化剂，增强沟通能力。开启智慧之门，促进学习和记忆。",
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
    description: "散发温暖阳光能量，增强自信和学习能力。激活太阳轮，带来积极乐观的心态。",
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
    description: "促进沟通和表达，增强勇气和自信心。平衡情绪，带来和谐的人际关系。",
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
    description: "心灵平衡的守护石，促进情感治愈。净化心轮，带来内在的平静与和谐。",
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
    description: "融合爱与生机的能量，促进心灵成长。滋养心轮，增强与自然的连接。",
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
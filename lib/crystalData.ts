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
    description: "紫水晶是一种强大的保护石，能净化周围的负面能量场，显著增强直觉和灵性意识。紫水晶有助于深层冥想和内在成长，能改善睡眠质量，让心灵获得平静。它还能增强记忆力和学习能力，帮助使用者保持清醒的头脑和专注力。",
    images: {
      spacer: "/images/crystals/amethyst/spacer.png",
      round: "/images/crystals/amethyst/round.png",
      raw: "/images/crystals/amethyst/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,
        warm: false,
        reliable: false,
        charming: false
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
        intuition: true,
        empathy: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,
        sleep: false,
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
    description: "粉晶象征着爱与和谐的力量，能有效促进人际关系的和睦，增强自我接纳和理解。粉晶温和的能量可以打开心轮，帮助释放情感创伤，让人感受到温暖与关爱。它还能增强同理心和包容度，帮助建立更深厚的人际关系。",
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
        warm: true,
        charming: false,
        reliable: false,
        insightful: false
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
        empathy: true,
        expression: false,
        decision: false,
        intuition: false,
        efficiency: false
      },
      healthIssues: {
        mood: true,
        hormonal: false,
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false
      }
    },
    incompatibleWith: ["黑碧玺"]
  },
  // 白水晶
  {
    id: "clear_quartz",
    name: "白水晶",
    description: "白水晶被誉为水晶之王，是最全能的能量放大器和转化器。白水晶具有极强的净化和编程能力，能帮助使用者厘清思绪，增强意志力，是修行和冥想的绝佳伴侣。它还能增强其他水晶的能量，是能量场净化和平衡的理想选择。",
    images: {
      spacer: "/images/crystals/clear_quartz/spacer.png",
      round: "/images/crystals/clear_quartz/round.png",
      raw: "/images/crystals/clear_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,
        reliable: false,
        warm: false,
        charming: false
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
        intuition: true,
        decision: false,
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
    description: "黄水晶是强大的财富之石，能带来丰盛和富足的能量。黄水晶可以激发创造力和积极性，注入充沛的活力，驱散负面情绪，是事业和财运的有力助手。它还能增强自信心和决断力，帮助使用者把握机遇，实现目标。",
    images: {
      spacer: "/images/crystals/citrine/spacer.png",
      round: "/images/crystals/citrine/round.png",
      raw: "/images/crystals/citrine/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
      unsupportiveElements: ["水"]
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
        charming: true,
        reliable: false,
        warm: false,
        insightful: false
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
        efficiency: true,
        decision: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        immunity: true,
        mood: false,
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false,
        hormonal: false
      }
    },
    incompatibleWith: ["紫水晶"]
  },
  
  // 月光石
  {
    id: "yuelongshi",
    name: "月光石",
    description: "月光石能显著增强直觉力，平衡情绪波动，是女性能量的完美象征。月光石柔和的光芒能安抚不安的心绪，增强敏感度，促进与高我的连接。它还能增强创造力和想象力，帮助使用者突破思维局限，激发灵感。",
    images: {
      spacer: "/images/crystals/moonstone/spacer.png",
      round: "/images/crystals/moonstone/round.png",
      raw: "/images/crystals/moonstone/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "金"],
      unsupportiveElements: ["木"]
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
        warm: true,
        insightful: false,
        reliable: false,
        charming: false
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
        empathy: true,
        intuition: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        sleep: true,
        stress: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  // 红玛瑙 - 强化勇气和活力特性
  {
    id: "red_agate",
    name: "红玛瑙",
    description: "红玛瑙是充满活力的保护石，能增强使用者的勇气和自信心。红玛瑙可以激发内在动力，改善血液循环，增强体质，是提升个人能量的理想选择。它还能增强意志力和行动力，帮助使用者克服困难，实现目标。",
    images: {
      spacer: "/images/crystals/red_agate/spacer.png",
      round: "/images/crystals/red_agate/round.png",
      raw: "/images/crystals/red_agate/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
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
        reliable: true,
        charming: false,
        warm: false,
        insightful: false
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
        efficiency: true,
        decision: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        circulation: true,
        stress: false,
        sleep: false,
        immunity: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: []
  },
  
  // 茶晶（烟晶）- 强化接地和压力释放特性
  {
    id: "smoky_quartz",
    name: "茶晶",
    description: "茶晶是强大的净化石，能有效吸收周围的负面能量，消除压力和焦虑情绪。茶晶可以稳定情绪波动，帮助使用者保持冷静和理性，是现代人的必备能量工具。它还能增强接地能力，帮助使用者保持现实感和平衡感。",
    images: {
      spacer: "/images/crystals/smoky_quartz/spacer.png",
      round: "/images/crystals/smoky_quartz/round.png",
      raw: "/images/crystals/smoky_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
      unsupportiveElements: ["水"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        reliable: true,
        insightful: false,
        warm: false,
        charming: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        fatigue: true,
        energySensitive: false,
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        decision: true,
        intuition: false,
        empathy: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: []
  },
  
  // 绿幽灵 - 强化创造力和繁荣特性
  {
    id: "green_phantom",
    name: "绿幽灵",
    description: "绿幽灵是强大的繁荣之石，能带来丰盛和成长的能量。绿幽灵可以激发创造力和积极性，增强直觉力，是事业和财运的有力助手。它还能增强与自然的连接，帮助使用者更好地理解和利用自然能量。",
    images: {
      spacer: "/images/crystals/green_phantom/spacer.png",
      round: "/images/crystals/green_phantom/round.png",
      raw: "/images/crystals/green_phantom/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "火"],
      unsupportiveElements: ["土"]
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
        insightful: true,
        charming: false,
        warm: false,
        reliable: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        energySensitive: false,
        fatigue: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,
        expression: false,
        empathy: false,
        decision: false,
        efficiency: false
      },
      healthIssues: {
        immunity: true,
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: []
  },
  // 海蓝宝
  {
    id: "aquamarine",
    name: "海蓝宝",
    description: "海蓝宝是沟通与表达之石，能增强语言表达能力和沟通技巧。海蓝宝可以开启喉轮，增强表达能力，促进人际关系的和谐。它还能增强创造力和想象力，帮助使用者更好地表达内心想法和情感。",
    images: {
      spacer: "/images/crystals/aquamarine/spacer.png",
      round: "/images/crystals/aquamarine/round.png",
      raw: "/images/crystals/aquamarine/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        relationship: true,
        career: false,
        protection: false,
        wealth: false,
        balance: false
      },
      impressions: {
        warm: true,
        insightful: false,
        reliable: false,
        charming: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        socialDrain: true,
        indecisive: false,
        fatigue: false,
        energySensitive: false
      },
      potentials: {
        expression: true,
        empathy: false,
        decision: false,
        intuition: false,
        efficiency: false
      },
      healthIssues: {
        respiratory: true,
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: []
  },
  // 石榴石
  {
    id: "garnet",
    name: "石榴石",
    description: "石榴石充满强大的生命力能量，能激发使用者的热情和创造力。石榴石可以增强意志力和行动力，是事业和健康的守护石，能带来源源不断的动力。它还能增强性能力和生育能力，是生命能量的重要守护者。",
    images: {
      spacer: "/images/crystals/garnet/spacer.png",
      round: "/images/crystals/garnet/round.png",
      raw: "/images/crystals/garnet/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
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
        charming: true,
        reliable: false,
        warm: false,
        insightful: false
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
        efficiency: true,
        decision: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        circulation: true,
        stress: false,
        sleep: false,
        immunity: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["月光石"]
  },
  // 红纹石
  {
    id: "red_rutilated_quartz",
    name: "红纹石",
    description: "红纹石是强大的能量激活石，能增强使用者的个人力量和决断力。红纹石可以加速愿望的实现，增强行动力，帮助突破困境，实现目标。它还能增强意志力和专注力，帮助使用者保持长期的目标导向。",
    images: {
      spacer: "/images/crystals/red_rutilated_quartz/spacer.png",
      round: "/images/crystals/red_rutilated_quartz/round.png",
      raw: "/images/crystals/red_rutilated_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["火", "土"],
      unsupportiveElements: ["金"]
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
        reliable: true,
        charming: false,
        warm: false,
        insightful: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        fatigue: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        decision: true,
        efficiency: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        circulation: true,
        stress: false,
        sleep: false,
        immunity: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 橄榄石
  {
    id: "peridot",
    name: "橄榄石",
    description: "橄榄石能带来丰盛和繁荣的能量，有效净化负面能量。橄榄石可以增强活力和创造力，吸引财富和机遇，是招财转运的有力助手。它还能增强自信和勇气，帮助使用者克服恐惧和犹豫。",
    images: {
      spacer: "/images/crystals/peridot/spacer.png",
      round: "/images/crystals/peridot/round.png",
      raw: "/images/crystals/peridot/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "火"],
      unsupportiveElements: ["土"]
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
        warm: true,
        charming: false,
        reliable: false,
        insightful: false
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
        efficiency: true,
        empathy: false,
        decision: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        immunity: true,
        mood: false,
        hormonal: false,
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
    description: "蓝晶石是沟通的桥梁，能促进表达能力和灵性成长。蓝晶石可以增强冥想效果，帮助表达内心真实想法，促进与高维能量的连接。它还能增强直觉和预知能力，帮助使用者更好地把握未来方向。",
    images: {
      spacer: "/images/crystals/kyanite/spacer.png",
      round: "/images/crystals/kyanite/round.png",
      raw: "/images/crystals/kyanite/raw.png"
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
        charming: true,
        warm: false,
        insightful: false,
        reliable: false
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
        expression: true,
        empathy: false,
        decision: false,
        intuition: false,
        efficiency: false
      },
    },
    incompatibleWith: ["红纹石"]
  },
  // 葡萄石 - 强化直觉和冥想特性
  {
    id: "prehnite",
    name: "葡萄石",
    description: "葡萄石充满温和的治愈能量，能增强使用者的直觉和预知能力。葡萄石可以安抚心灵，帮助连接更高的指引，是灵性成长的重要伴侣。它还能增强同理心和包容度，帮助使用者更好地理解和接纳他人。",
    images: {
      spacer: "/images/crystals/prehnite/spacer.png",
      round: "/images/crystals/prehnite/round.png",
      raw: "/images/crystals/prehnite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "火"],
      unsupportiveElements: ["土"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,
        warm: false,
        reliable: false,
        charming: false
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
        intuition: true,
        empathy: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,
        sleep: false,
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
    description: "绿草莓晶融合着爱与生机的能量，能促进全方位的心灵成长。绿草莓晶可以滋养心轮，增强与自然的连接，带来生命的活力与喜悦。它还能增强创造力和想象力，帮助使用者更好地表达内心想法。",
    images: {
      spacer: "/images/crystals/green_strawberry_quartz/spacer.png",
      round: "/images/crystals/green_strawberry_quartz/round.png",
      raw: "/images/crystals/green_strawberry_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "火"],
      unsupportiveElements: ["土"]
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
        warm: true,
        insightful: false,
        reliable: false,
        charming: false
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
        empathy: true,
        intuition: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        mood: true,
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑碧玺"]
  },
  // 蓝纹玛瑙 - 强化沟通和表达特性
  {
    id: "blue_lace_agate",
    name: "蓝纹玛瑙",
    description: "蓝纹玛瑙能促进有效的沟通和表达，为使用者带来深层的平静与宁静。蓝纹玛瑙可以增强冷静和清晰的思维能力，帮助在交流中保持优雅。它还能增强表达能力和说服力，帮助使用者更好地传达信息。",
    images: {
      spacer: "/images/crystals/blue_lace_agate/spacer.png",
      round: "/images/crystals/blue_lace_agate/round.png",
      raw: "/images/crystals/blue_lace_agate/raw.png"
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
        charming: true,
        warm: false,
        insightful: false,
        reliable: false
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
        expression: true,
        empathy: false,
        decision: false,
        intuition: false,
        efficiency: false
      },
      healthIssues: {
        respiratory: true,
        stress: false,
        sleep: false,
        immunity: false,
        circulation: false,
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
    description: "蔷薇辉石能促进爱与平衡的能量，增强情感的治愈和自我价值的认知。蔷薇辉石可以带来平静和勇气的能量，帮助释放情感创伤。它还能增强同理心和包容度，帮助使用者更好地理解和接纳自己。",
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
        warm: true,
        reliable: false,
        charming: false,
        insightful: false
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
        empathy: true,
        decision: false,
        expression: false,
        intuition: false,
        efficiency: false
      },
      healthIssues: {
        circulation: true,
        stress: false,
        sleep: false,
        immunity: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  
  // 金发晶 - 强化财富和决断力特性
  {
    id: "golden_rutilated_quartz",
    name: "金发晶",
    description: "金发晶是强大的能量激活石，能促进财富和事业的蓬勃发展。金发晶可以增强个人魅力，带来好运和机遇，是事业腾飞的助推器。它还能增强意志力和行动力，帮助使用者克服困难，实现目标。",
    images: {
      spacer: "/images/crystals/golden_rutilated_quartz/spacer.png",
      round: "/images/crystals/golden_rutilated_quartz/round.png",
      raw: "/images/crystals/golden_rutilated_quartz/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
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
        charming: true,
        reliable: false,
        warm: false,
        insightful: false
      },
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        fatigue: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        efficiency: true,
        decision: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        immunity: true,
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  
  // 黄方解石 - 强化自信和积极能量特性
  {
    id: "yellow_calcite",
    name: "黄方解石",
    description: "黄方解石散发着温暖的阳光能量，能增强自信和学习能力。黄方解石可以激活太阳轮，带来积极乐观的心态，提升个人能量场。它还能增强记忆力和学习能力，帮助使用者更好地掌握新知识。",
    images: {
      spacer: "/images/crystals/yellow_calcite/spacer.png",
      round: "/images/crystals/yellow_calcite/round.png",
      raw: "/images/crystals/yellow_calcite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
      unsupportiveElements: ["水"]
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
        warm: true,
        charming: false,
        reliable: false,
        insightful: false
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
        efficiency: true,
        expression: false,
        empathy: false,
        decision: false,
        intuition: false
      },
      healthIssues: {
        immunity: true,
        stress: false,
        sleep: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 天河石 - 强化沟通和表达特性
  {
    id: "amazonite",
    name: "天河石",
    description: "天河石能促进有效的沟通和自我表达，增强使用者的勇气和自信心。天河石可以平衡情绪波动，带来和谐的人际关系，是社交场合的得力助手。它还能增强表达能力和说服力，帮助使用者更好地传达信息。",
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
        warm: false,
        insightful: false,
        reliable: false,
        charming: true
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
        expression: true,
        empathy: false,
        decision: false,
        intuition: false,
        efficiency: false
      },
    },
    incompatibleWith: ["红玛瑙"]
  },
  
  // 绿荧石 - 强化心灵平衡和情感治愈特性
  {
    id: "green_fluorite",
    name: "绿荧石",
    description: "绿荧石是心灵平衡的守护石，能促进深层的情感治愈。绿荧石可以净化心轮，带来内在的平静与和谐，帮助找回内心的平衡。它还能增强智慧和洞察力，帮助使用者更好地理解人生哲理。",
    images: {
      spacer: "/images/crystals/green_fluorite/spacer.png",
      round: "/images/crystals/green_fluorite/round.png",
      raw: "/images/crystals/green_fluorite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["木", "火"],
      unsupportiveElements: ["土"]
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
        insightful: true,
        warm: false,
        reliable: false,
        charming: false
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
        intuition: true,
        empathy: false,
        decision: false,
        expression: false,
        efficiency: false
      },
    },
    incompatibleWith: ["红玛瑙"]
  },
  
  // 天使石
  {
    id: "angelite",
    name: "天使石",
    description: "天使石是连接天使界的高频水晶，能增强灵性感知和直觉能力。天使石可以促进与高维能量的沟通，带来平静与祥和，是冥想和灵性修习的理想伴侣。它还能增强同理心和包容度，帮助使用者更好地理解和接纳他人。",
    images: {
      spacer: "/images/crystals/angelite/spacer.png",
      round: "/images/crystals/angelite/round.png",
      raw: "/images/crystals/angelite/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["水", "木"],
      unsupportiveElements: ["火"]
    },
    functionalAttributes: {
      primaryPurposes: {
        protection: true,
        balance: false,
        relationship: false,
        wealth: false,
        career: false
      },
      impressions: {
        insightful: true,
        warm: false,
        reliable: false,
        charming: false
      }
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        fatigue: false,
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        intuition: true,
        empathy: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  },
  
  // 虎眼石
  {
    id: "tiger_eye",
    name: "虎眼石",
    description: "虎眼石是强大的保护石，能增强意志力和决断力。虎眼石可以带来勇气和自信，帮助克服恐惧和犹豫，是事业和财富的守护石。它还能增强意志力和行动力，帮助使用者克服困难，实现目标。",
    images: {
      spacer: "/images/crystals/tiger_eye/spacer.png",
      round: "/images/crystals/tiger_eye/round.png",
      raw: "/images/crystals/tiger_eye/raw.png"
    },
    destinyAttributes: {
      supportiveElements: ["土", "金"],
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
        reliable: true,
        charming: false,
        warm: false,
        insightful: false
      }
    },
    correctiveAttributes: {
      correctiveProperties: {
        indecisive: true,
        fatigue: false,
        socialDrain: false,
        energySensitive: false
      },
      potentials: {
        decision: true,
        efficiency: false,
        empathy: false,
        expression: false,
        intuition: false
      },
      healthIssues: {
        circulation: true,
        stress: false,
        sleep: false,
        immunity: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["月光石"]
  },

  // 紫锂辉
  {
    id: "kunzite",
    name: "紫锂辉",
    description: "紫锂辉是爱与治愈的高频水晶，能促进深层的情感疗愈和心灵成长。紫锂辉可以打开心轮，增强爱的感知能力，帮助释放情感创伤，带来内在的平静与和谐。它还能增强同理心和包容度，帮助使用者更好地理解和接纳自己。",
    images: {
      spacer: "/images/crystals/kunzite/spacer.png",
      round: "/images/crystals/kunzite/round.png",
      raw: "/images/crystals/kunzite/raw.png"
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
        warm: true,
        insightful: false,
        reliable: false,
        charming: false
      }
    },
    correctiveAttributes: {
      correctiveProperties: {
        energySensitive: true,
        fatigue: false,
        indecisive: false,
        socialDrain: false
      },
      potentials: {
        empathy: true,
        intuition: false,
        decision: false,
        expression: false,
        efficiency: false
      },
      healthIssues: {
        stress: true,
        sleep: false,
        immunity: false,
        circulation: false,
        respiratory: false,
        mood: false,
        hormonal: false
      }
    },
    incompatibleWith: ["黑曜石"]
  }
]; 
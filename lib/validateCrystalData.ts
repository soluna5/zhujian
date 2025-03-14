import { crystalData, Crystal } from './crystalData';

// 验证水晶数据的一致性
export function validateCrystalData() {
  // 直接使用 crystalData 数组，而不是调用 getCrystalData 函数
  
  // 基于属性分类石头，而不是使用type字段
  const destinyStones = crystalData.filter(crystal => 
    crystal.destinyAttributes && 
    crystal.destinyAttributes.supportiveElements && 
    crystal.destinyAttributes.supportiveElements.length > 0
  );
  
  const functionalStones = crystalData.filter(crystal => 
    crystal.functionalAttributes && 
    crystal.functionalAttributes.primaryPurposes && 
    Object.values(crystal.functionalAttributes.primaryPurposes).some(v => v === true)
  );
  
  const correctiveStones = crystalData.filter(crystal => 
    crystal.correctiveAttributes && 
    crystal.correctiveAttributes.correctiveProperties && 
    Object.values(crystal.correctiveAttributes.correctiveProperties).some(v => v === true)
  );
  
  console.log("=== Crystal Data Validation ===");
  console.log(`Total crystals: ${crystalData.length}`);
  console.log(`Destiny stones: ${destinyStones.length}`);
  console.log(`Functional stones: ${functionalStones.length}`);
  console.log(`Corrective stones: ${correctiveStones.length}`);
  
  // 检查元素覆盖
  const elements = ['金', '木', '水', '火', '土'];
  const elementCoverage: Record<string, string[]> = {
    '金': [],
    '木': [],
    '水': [],
    '火': [],
    '土': []
  };
  
  // 检查每个命运石的支持元素
  destinyStones.forEach(stone => {
    if (!stone.destinyAttributes?.supportiveElements || stone.destinyAttributes.supportiveElements.length === 0) {
      console.warn(`Warning: Destiny stone "${stone.name}" has no supportive elements`);
    } else {
      stone.destinyAttributes.supportiveElements.forEach(element => {
        if (elements.includes(element)) {
          elementCoverage[element].push(stone.name);
        } else {
          console.warn(`Warning: Unknown element "${element}" in stone "${stone.name}"`);
        }
      });
    }
  });
  
  // 检查元素覆盖情况
  elements.forEach(element => {
    console.log(`Element ${element} is covered by ${elementCoverage[element].length} stones: ${elementCoverage[element].join(', ')}`);
  });
  
  // 检查功能石的益处
  functionalStones.forEach(stone => {
    if (!stone.functionalAttributes?.primaryPurposes || 
        Object.values(stone.functionalAttributes.primaryPurposes).every(v => v !== true)) {
      console.warn(`Warning: Functional stone "${stone.name}" has no primary purposes`);
    }
  });
  
  // 检查修正石的修正功能
  correctiveStones.forEach(stone => {
    if (!stone.correctiveAttributes?.correctiveProperties || 
        Object.values(stone.correctiveAttributes.correctiveProperties).every(v => v !== true)) {
      console.warn(`Warning: Corrective stone "${stone.name}" has no corrective properties`);
    }
  });
  
  // 检查图片路径
  crystalData.forEach(stone => {
    if (!stone.images?.round) {
      console.warn(`Warning: Stone "${stone.name}" has no round image path`);
    }
  });
  
  console.log("=== Validation Complete ===");
  
  return {
    totalCrystals: crystalData.length,
    destinyStones: destinyStones.length,
    functionalStones: functionalStones.length,
    correctiveStones: correctiveStones.length,
    elementCoverage
  };
} 
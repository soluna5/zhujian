import fs from 'fs';
import path from 'path';
import { getCrystalData } from '../lib/crystalData';

const crystals = getCrystalData();
const imageTypes = ['raw', 'round', 'spacer', 'special'];
const baseDir = path.join(process.cwd(), 'public', 'images', 'crystals');

// 创建基础目录
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// 为每个水晶创建目录和图片
crystals.forEach(crystal => {
  const crystalDir = path.join(baseDir, crystal.id);
  
  // 创建水晶目录
  if (!fs.existsSync(crystalDir)) {
    fs.mkdirSync(crystalDir, { recursive: true });
  }

  // 为每种类型创建占位图片
  imageTypes.forEach(type => {
    const imagePath = path.join(crystalDir, `${type}.png`);
    if (!fs.existsSync(imagePath)) {
      // 复制占位图片
      fs.copyFileSync(
        path.join(process.cwd(), 'public', 'placeholder.png'),
        imagePath
      );
    }
  });
});

console.log('已完成所有水晶图片文件夹的创建'); 
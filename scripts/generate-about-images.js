const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 确保目录存在
const aboutDir = path.join(process.cwd(), 'public', 'images', 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}

// 生成品牌故事主图
const brandStoryCanvas = createCanvas(500, 600);
const brandStoryCtx = brandStoryCanvas.getContext('2d');
brandStoryCtx.fillStyle = '#f8f5f0';
brandStoryCtx.fillRect(0, 0, 500, 600);
brandStoryCtx.fillStyle = '#333333';
brandStoryCtx.font = 'bold 24px Arial';
brandStoryCtx.textAlign = 'center';
brandStoryCtx.fillText('品牌故事图片', 250, 300);
fs.writeFileSync(path.join(aboutDir, 'brand-story.png'), brandStoryCanvas.toBuffer());

// 生成日月星辰能量图标
const energyTypes = ['sun', 'moon', 'star'];
const energyNames = ['太阳能量', '月亮能量', '星辰能量'];

energyTypes.forEach((type, index) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // 背景
  ctx.fillStyle = '#f8f5f0';
  ctx.fillRect(0, 0, 200, 200);
  
  // 圆形
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 文字
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(energyNames[index], 100, 100);
  
  fs.writeFileSync(path.join(aboutDir, `${type}-energy.png`), canvas.toBuffer());
});

console.log('关于页面的图片已生成完成！'); 
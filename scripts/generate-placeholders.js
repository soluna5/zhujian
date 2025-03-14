const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 水晶列表及其颜色
const crystals = [
  { name: '紫水晶', color: '#9966CC', id: 'zishuijing' },
  { name: '粉晶', color: '#FFB6C1', id: 'fenjing' },
  { name: '白水晶', color: '#E6E6FA', id: 'baishuijing' },
  { name: '黄水晶', color: '#FFD700', id: 'huangshuijing' },
  { name: '黑曜石', color: '#2F4F4F', id: 'heiyaoshi' },
  { name: '月光石', color: '#F0F8FF', id: 'yuelongshi' },
  { name: '青金石', color: '#191970', id: 'qingjinshi' },
  { name: '海蓝宝', color: '#4169E1', id: 'hailan' },
  { name: '绿松石', color: '#40E0D0', id: 'lvsongsshi' },
  { name: '玫瑰石英', color: '#FFB6C1', id: 'meiguishi' }
];

// 创建目录
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// 生成占位图
function generatePlaceholder(width, height, bgColor, text, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 填充背景
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 添加文字
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 根据画布大小调整字体大小
  const fontSize = Math.min(width, height) / 10;
  ctx.font = `${fontSize}px Arial`;
  
  // 如果文本包含换行符，分行绘制
  const lines = text.split('\\n');
  const lineHeight = fontSize * 1.2;
  const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
  
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });

  // 保存图片
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
}

// 为每个水晶生成占位图
crystals.forEach(crystal => {
  const baseDir = path.join('public', 'images', 'crystals', crystal.id);
  ensureDirectoryExists(baseDir);

  // 生成四种类型的占位图
  generatePlaceholder(200, 200, crystal.color, `${crystal.name}\\n原石`, path.join(baseDir, 'raw.jpg'));
  generatePlaceholder(200, 200, crystal.color, `${crystal.name}\\n圆珠`, path.join(baseDir, 'round.jpg'));
  generatePlaceholder(200, 50, crystal.color, '垫片', path.join(baseDir, 'spacer.jpg'));
  generatePlaceholder(200, 200, crystal.color, `${crystal.name}\\n特殊款`, path.join(baseDir, 'special.jpg'));
});

console.log('占位图生成完成！'); 
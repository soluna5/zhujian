const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 确保目录存在
const homepageDir = path.join(process.cwd(), 'public', 'images', 'homepage');
if (!fs.existsSync(homepageDir)) {
  fs.mkdirSync(homepageDir, { recursive: true });
}

// 生成主图 (hero-bracelet.png)
const heroCanvas = createCanvas(1080, 960);
const heroCtx = heroCanvas.getContext('2d');
heroCtx.fillStyle = '#f8f5f0';
heroCtx.fillRect(0, 0, 1080, 960);
heroCtx.fillStyle = '#333333';
heroCtx.font = 'bold 48px Arial';
heroCtx.textAlign = 'center';
heroCtx.fillText('水晶手链展示图', 540, 480);
fs.writeFileSync(path.join(homepageDir, 'hero-bracelet.png'), heroCanvas.toBuffer());

// 生成品牌故事图 (sun-moon-energy.png)
const storyCanvas = createCanvas(500, 600);
const storyCtx = storyCanvas.getContext('2d');
storyCtx.fillStyle = '#f8f5f0';
storyCtx.fillRect(0, 0, 500, 600);
storyCtx.fillStyle = '#333333';
storyCtx.font = 'bold 24px Arial';
storyCtx.textAlign = 'center';
storyCtx.fillText('日月能量图', 250, 300);
fs.writeFileSync(path.join(homepageDir, 'sun-moon-energy.png'), storyCanvas.toBuffer());

// 生成水晶集合图 (crystal-collection.png)
const collectionCanvas = createCanvas(500, 600);
const collectionCtx = collectionCanvas.getContext('2d');
collectionCtx.fillStyle = '#f8f5f0';
collectionCtx.fillRect(0, 0, 500, 600);
collectionCtx.fillStyle = '#333333';
collectionCtx.font = 'bold 24px Arial';
collectionCtx.textAlign = 'center';
collectionCtx.fillText('水晶集合图', 250, 300);
fs.writeFileSync(path.join(homepageDir, 'crystal-collection.png'), collectionCanvas.toBuffer());

console.log('首页图片已生成完成！'); 
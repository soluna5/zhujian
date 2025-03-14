import fs from 'fs';
import path from 'path';

// 创建基础目录
const baseDir = path.join(process.cwd(), 'public', 'images', 'crystals');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// 根据 Crystal 接口创建图片结构
const crystals = [
  { id: 'zishuijing', name: '紫水晶' },
  { id: 'fenjing', name: '粉晶' },
  { id: 'yueliangshi', name: '月光石' },
  { id: 'baishiying', name: '白水晶' },
  { id: 'hupo', name: '琥珀' },
  { id: 'baimudan', name: '白牡丹' },
  { id: 'hongshiying', name: '红石英' },
  { id: 'lanbaoshi', name: '蓝宝石' },
  { id: 'lvbaoshi', name: '绿宝石' },
  { id: 'hongbaoshi', name: '红宝石' },
  { id: 'zumulv', name: '祖母绿' },
  { id: 'maoyanshi', name: '猫眼石' },
  { id: 'huangyushi', name: '黄玉石' },
  { id: 'lvyushi', name: '绿玉石' },
  { id: 'biyushi', name: '碧玉石' },
  { id: 'kunzishi', name: '坤子石' },
  { id: 'lanzuanshi', name: '蓝钻石' },
  { id: 'honglvshi', name: '红绿石' },
  { id: 'qingbaoshi', name: '青宝石' },
  { id: 'zitongshi', name: '紫铜石' },
  { id: 'manaoshi', name: '玛瑙石' },
  { id: 'shanhushi', name: '珊瑚石' },
  { id: 'zhenzhu', name: '珍珠' },
  { id: 'feicuishi', name: '翡翠石' },
  { id: 'shuijingshi', name: '水晶石' }
];

// 根据 Crystal.images 接口定义的图片类型
const imageTypes = [
  { id: 'spacer', desc: '垫片图' },
  { id: 'special', desc: '特殊款式图' },
  { id: 'round', desc: '普通圆形珠子图' },
  { id: 'raw', desc: '原石图' }
];

// 创建文件夹和占位图片
crystals.forEach(crystal => {
  const crystalDir = path.join(baseDir, crystal.id);
  
  // 创建水晶目录
  if (!fs.existsSync(crystalDir)) {
    fs.mkdirSync(crystalDir, { recursive: true });
  }

  // 为每种类型创建占位图片
  imageTypes.forEach(type => {
    const imagePath = path.join(crystalDir, `${type.id}.png`);
    if (!fs.existsSync(imagePath)) {
      // 创建一个空的占位图片文件
      fs.writeFileSync(imagePath, '');
    }
  });
});

console.log('所有水晶图片文件夹和占位图片已创建完成！'); 
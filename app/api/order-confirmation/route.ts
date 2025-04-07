import { NextResponse } from 'next/server'
import { saveOrderConfirmation } from '@/lib/saveOrderConfirmation'

// 水晶名称到目录名的映射
const crystalToDirectoryMap: Record<string, string> = {
  "紫水晶": "amethyst",
  "粉晶": "fenjing",
  "白水晶": "clear_quartz",
  "黑曜石": "black_obsidian",
  "月光石": "moonstone",
  "海蓝宝": "aquamarine",
  "青金石": "qingjinshi",
  "绿松石": "turquoise",
  "虎眼石": "tiger_eye",
  "紫锂辉": "kunzite"
};

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received order data:', data);

    const result = await saveOrderConfirmation(data)

    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(
        { error: result.error || '保存订单失败' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
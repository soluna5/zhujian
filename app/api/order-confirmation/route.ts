import { NextResponse } from 'next/server'
import { saveOrderConfirmation } from '@/lib/saveOrderConfirmation'

export async function POST(request: Request) {
  try {
    const data = await request.json()
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
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
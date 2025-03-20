import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BAIDU_API_KEY = process.env.BAIDU_API_KEY;
const BAIDU_APP_ID = "fe85d5ba-4199-4fbc-b842-90c09abe9fae";

export async function POST(req: NextRequest) {
  try {
    // 获取对话 ID
    const createConversationOptions = {
      method: 'POST',
      url: 'https://qianfan.baidubce.com/v2/app/conversation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BAIDU_API_KEY}`
      },
      data: JSON.stringify({
        app_id: BAIDU_APP_ID
      })
    };

    console.log('Creating conversation...');
    const conversationResponse = await axios(createConversationOptions);
    console.log('Conversation created:', conversationResponse.data);

    return NextResponse.json(conversationResponse.data);
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    return NextResponse.json(
      { error: '获取对话ID时出错', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
} 
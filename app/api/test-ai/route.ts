import { NextResponse } from 'next/server';
import axios from 'axios';

// Environment variables
const BAIDU_API_KEY = process.env.BAIDU_API_KEY;
const BAIDU_APP_ID = "fe85d5ba-4199-4fbc-b842-90c09abe9fae";

export async function GET() {
  try {
    console.log('正在尝试使用实际API生成描述...');
    
    // Call Baidu Qianfan API with custom app
    const response = await axios.post(
      'https://qianfan.baidubce.com/v2/app/conversation',
      {
        app_id: BAIDU_APP_ID
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BAIDU_API_KEY}`
        }
      }
    );

    console.log('API response:', response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
} 
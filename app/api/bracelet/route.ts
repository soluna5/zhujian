import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BAIDU_API_KEY = process.env.BAIDU_API_KEY;
const BAIDU_APP_ID = "fe85d5ba-4199-4fbc-b842-90c09abe9fae";

export async function POST(req: NextRequest) {
  try {
    const { crystals, primaryNeed, correctiveSituation } = await req.json();
    
    if (!crystals || !Array.isArray(crystals) || crystals.length === 0) {
      return NextResponse.json(
        { error: '需要提供手链的水晶信息（数组）' },
        { status: 400 }
      );
    }

    console.log('Request parameters:', { crystals, primaryNeed, correctiveSituation });

    // 首先获取会话ID
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
    const conversationData = conversationResponse.data as unknown as { conversation_id: string; request_id: string };
    console.log('Conversation created:', conversationData);

    const prompt = `水晶组合：${crystals.join("、")}
请不要再诗作中加入水晶名称
请按如下格式返回：
{
  "name": "『诗作名称』",
  "raw_response": "完整诗作内容（四句以内）"
}`;

    // 发送消息
    const sendMessageOptions = {
      method: 'POST',
      url: 'https://qianfan.baidubce.com/v2/app/conversation/runs',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BAIDU_API_KEY}`
      },
      data: {
        app_id: BAIDU_APP_ID,
        query: prompt,
        conversation_id: conversationData.conversation_id,
        stream: false,
        temperature: 0.95,
        top_p: 0.8
      }
    };

    console.log('Sending message...');
    const messageResponse = await axios(sendMessageOptions);
    
    let fullResponse = '';
    console.log('Processing response...');
    
    // 如果响应不是流式的，直接处理
    if (typeof messageResponse.data === 'object' && !Array.isArray(messageResponse.data)) {
      console.log('Non-streaming response:', messageResponse.data);
      const responseData = messageResponse.data as { answer?: string };
      if (responseData.answer) {
        fullResponse = responseData.answer;
      }
    }

    console.log('Full response:', fullResponse);

    // 解析 AI 返回的 JSON 格式
    let parsedResponse;
    try {
      // 尝试解析JSON格式的响应
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      // 如果解析失败，尝试从文本中提取名称和内容
      const nameMatch = fullResponse.match(/『(.*?)』/);
      const name = nameMatch ? nameMatch[1] : "灵石诗语";
      
      // 移除可能的JSON格式标记和注释
      const cleanedResponse = fullResponse
        .replace(/^\{|\}$/g, '') // 移除开头和结尾的大括号
        .replace(/\{|\}/g, '') // 移除所有大括号
        .replace(/"name":|"raw_response":/g, '') // 移除JSON键名
        .replace(/["""]/g, '') // 移除引号
        .replace(/[\[\]]/g, '') // 移除方括号
        .replace(/^[\s,]*|[\s,]*$/g, '') // 移除开头和结尾的空白和逗号
        .replace(/^json\s*$/im, '') // 移除可能的json标记
        .split('\n')
        .filter(line => {
          const trimmedLine = line.trim();
          return trimmedLine.length > 0 && 
                 !trimmedLine.startsWith('注：') &&
                 !trimmedLine.includes('name') &&
                 !trimmedLine.includes('raw_response') &&
                 !trimmedLine.match(/^\s*[\{\}]\s*$/); // 移除只包含大括号的行
        })
        .join('\n')
        .trim();
      
      parsedResponse = {
        name: `『${name}』`,
        raw_response: cleanedResponse
      };
    }

    // 进一步清理响应数据
    const cleanResponse = (text: string) => {
      return text
        .replace(/^\s*```.*?\n/g, '') // 移除开头的 ```json 等标记
        .replace(/\n```\s*$/g, '') // 移除结尾的 ``` 标记
        .replace(/^\{|\}$/g, '') // 移除JSON对象的大括号
        .replace(/\{|\}/g, '') // 移除所有大括号
        .replace(/[\[\]]/g, '') // 移除方括号
        .replace(/["""]/g, '') // 移除引号
        .replace(/"name":|"raw_response":/g, '') // 移除JSON键名
        .replace(/^[\s,]*|[\s,]*$/g, '') // 移除开头和结尾的空白和逗号
        .replace(/^json\s*$/im, '') // 移除可能的json标记
        .replace(/\\n/g, '\n') // 替换转义的换行符为实际换行符
        .split('\n')
        .filter(line => {
          const trimmedLine = line.trim();
          return trimmedLine.length > 0 && 
                 !trimmedLine.startsWith('注：') &&
                 !trimmedLine.includes('name') &&
                 !trimmedLine.includes('raw_response') &&
                 !trimmedLine.match(/^\s*[\{\}]\s*$/) && // 移除只包含大括号的行
                 !trimmedLine.match(/^\s*```.*$/) && // 移除任何包含```的行
                 !trimmedLine.match(/^\s*json\s*$/i); // 移除只包含json字样的行
        })
        .map(line => line.trim()) // 清理每行的空白字符
        .join('\n') // 使用实际换行符连接行
        .trim();
    };

    // 清理名称中的特殊字符
    const cleanName = (name: string) => {
      return name
        .replace(/[『』]/g, '') // 移除『』
        .replace(/["""]/g, '') // 移除引号
        .trim();
    };

    const result = {
      name: cleanName(parsedResponse.name || "灵石诗语"),
      raw_response: cleanResponse(parsedResponse.raw_response),
      description: cleanResponse(parsedResponse.raw_response)
    };
    
    console.log('Final result:', result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    return NextResponse.json(
      { error: '生成手链描述时出错', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
} 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmlswmelhqmokeeovrka.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbHN3bWVsaHFtb2tlZW92cmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4ODAwMDAsImV4cCI6MjA1NzQ1NjAwMH0.iOnNnXjewJNjEkHfb8B1H2Hh4ChP_0BF-uKFWQiyuvM'

const supabase = createClient(supabaseUrl, supabaseKey)

// 测试数据定义（保留但不自动运行）
const testData = {
  identity_key: 'test_key_' + Date.now(),
  order_number: 'test_order_' + Date.now(),
  wrist_size: 16.5,
  bracelet_design_url: 'test_url',
  bracelet_size: 'medium',
  destiny_crystal: '紫水晶',
  functional_crystal: '粉晶',
  corrective_crystal: '黑曜石'
}

// 测试函数（保留但不自动运行）
async function testDatabase() {
  console.log('开始数据库测试...')
  console.log('测试数据:', testData)
  
  try {
    // 测试插入
    console.log('尝试插入测试数据...')
    const { data: insertData, error: insertError } = await supabase
      .from('order_confirmations')
      .insert([testData])
      .select()
      .single()

    if (insertError) {
      console.error('插入测试数据失败:', insertError)
      console.error('错误详情:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
      return
    }

    console.log('测试数据插入成功:', insertData)

    // 测试查询
    console.log('尝试查询测试数据...')
    const { data: queryData, error: queryError } = await supabase
      .from('order_confirmations')
      .select('*')
      .eq('identity_key', testData.identity_key)
      .single()

    if (queryError) {
      console.error('查询测试数据失败:', queryError)
      console.error('错误详情:', {
        message: queryError.message,
        details: queryError.details,
        hint: queryError.hint
      })
      return
    }

    console.log('查询测试数据成功:', queryData)

    // 清理测试数据
    console.log('尝试清理测试数据...')
    const { error: deleteError } = await supabase
      .from('order_confirmations')
      .delete()
      .eq('identity_key', testData.identity_key)

    if (deleteError) {
      console.error('清理测试数据失败:', deleteError)
      console.error('错误详情:', {
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint
      })
      return
    }

    console.log('测试数据清理成功')
    console.log('数据库测试完成！')
  } catch (error) {
    console.error('测试过程出错:', error)
    if (error instanceof Error) {
      console.error('错误详情:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }
}

export { supabase, testDatabase }
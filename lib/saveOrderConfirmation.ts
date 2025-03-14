import { supabase } from './supabase'

interface OrderConfirmation {
  identity_key: string
  order_number: string
  wrist_size: number
  bracelet_size: 'small' | 'medium' | 'large'
  destiny_crystal: string    // 命运石名称
  functional_crystal: string // 功能石名称
  corrective_crystal: string // 修正石名称
  bracelet_layout: string   // 珠子排列JSON字符串
  bracelet_design_url: string // 手链设计图片URL
}

export async function saveOrderConfirmation(data: OrderConfirmation) {
  console.log('Attempting to save order confirmation:', data)
  
  try {
    // 验证数据
    if (!data.identity_key || !data.order_number || !data.wrist_size || !data.bracelet_size ||
        !data.destiny_crystal || !data.functional_crystal || !data.corrective_crystal) {
      console.error('Missing required fields:', {
        hasIdentityKey: !!data.identity_key,
        hasOrderNumber: !!data.order_number,
        hasWristSize: !!data.wrist_size,
        hasBraceletSize: !!data.bracelet_size,
        hasDestinyCrystal: !!data.destiny_crystal,
        hasFunctionalCrystal: !!data.functional_crystal,
        hasCorrectiveCrystal: !!data.corrective_crystal
      })
      return { 
        success: false, 
        error: '请填写所有必需信息' 
      }
    }

    // 尝试保存数据
    const { data: result, error } = await supabase
      .from('order_confirmations')
      .insert([{
        identity_key: data.identity_key,
        order_number: data.order_number,
        wrist_size: data.wrist_size,
        bracelet_size: data.bracelet_size,
        destiny_crystal: data.destiny_crystal,
        functional_crystal: data.functional_crystal,
        corrective_crystal: data.corrective_crystal,
        bracelet_layout: data.bracelet_layout || '',
        bracelet_design_url: data.bracelet_design_url || ''
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      // 处理特定错误类型
      if (error.code === '23505') {
        // 唯一约束冲突
        if (error.message.includes('identity_key')) {
          return { success: false, error: '此身份ID已被使用' }
        }
        if (error.message.includes('order_number')) {
          return { success: false, error: '此订单编号已被使用' }
        }
      }
      
      // 其他数据库错误
      return { 
        success: false, 
        error: '订单保存失败，请稍后重试'
      }
    }

    console.log('Order confirmation saved successfully:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error in saveOrderConfirmation:', error)
    return { 
      success: false, 
      error: '订单系统暂时无法使用，请稍后重试'
    }
  }
} 
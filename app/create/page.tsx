"use client"

import React, { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import ComplexMagicAnimation from "@/components/ComplexMagicAnimation"
import { beadConfigurations, type BeadConfig } from "@/config/beadConfigurations"
import dynamic from "next/dynamic"
import type { Bead } from "@/components/BraceletViewer3D"
import { BRANCH_HIDDEN_STEMS, calculateBaZi, type BaZiResult } from "@/lib/bazi"
import { Solar } from "lunar-typescript"
import { crystalData, Crystal } from "@/lib/crystalData"
import { validateCrystalData } from '@/lib/validateCrystalData'
import { selectCrystals } from "@/lib/crystals"
import { PrimaryNeed, CommonSituation, Impression, Potential, HealthIssue } from "@/lib/questionnaire"
import { useRouter } from "next/navigation"
import { validateAuthKey, markKeyAsUsed } from "@/lib/authKeys"
import { saveOrderConfirmation } from '@/lib/saveOrderConfirmation'
import html2canvas from 'html2canvas'
import ReactDOM from 'react-dom'

const BraceletViewer3D = dynamic(() => import("@/components/BraceletViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square bg-[#f8f5f0] rounded-lg overflow-hidden flex items-center justify-center">
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
    </div>
  )
})

type BeadInfo = {
  code: string
  type: string
  position: number
}

const steps = [
  { id: 1, name: "个人信息" },
  { id: 2, name: "问卷调查" },
  { id: 3, name: "你的手链" },
  { id: 4, name: "订单" },
]

type FormData = {
  name: string
  birthTime: string
  primaryNeed: string
  correctiveSituation: string
  impression: string
  potential: string
  healthIssue: string
}

type BraceletSize = "small" | "medium" | "large"

type Bracelet = {
  crystals: Crystal[]
  properties: Array<{
    title: string
    description: string
  }>
  imageUrl: string
  size: BraceletSize
  crystalImages: string[]
  name?: string
  description?: string
}

// 添加动画用的水晶类型
interface AnimationCrystal {
  name: string;
  color: string;
}

// 添加水晶颜色映射
const crystalColorMap: Record<string, string> = {
  "紫水晶": "#9B6B9E",
  "粉晶": "#FFB6C1",
  "白水晶": "#E6E6FA",
  "黄水晶": "#FFD700",
  "黑曜石": "#2F4F4F",
  "月光石": "#F0F8FF",
  "青金石": "#191970",
  "玫瑰石英": "#FFB6C1",
  "海蓝宝": "#4169E1",
  "绿松石": "#40E0D0",
  "虎眼石": "#B8860B",
  "紫锂辉": "#DDA0DD"
}

export default function CreatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthTime: "",
    primaryNeed: "",
    correctiveSituation: "",
    impression: "",
    potential: "",
    healthIssue: ""
  })

  const [bracelet, setBracelet] = useState<Bracelet | null>(null)
  type OrderStatus = "idle" | "loading" | "success" | "error"
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("idle")
  const [showAnimation, setShowAnimation] = useState(false)
  const [braceletSize, setBraceletSize] = useState<BraceletSize>("medium")
  const [wristSize, setWristSize] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [braceletLayouts, setBraceletLayouts] = useState<Record<BraceletSize, Bead[] | undefined>>({
    large: undefined,
    medium: undefined,
    small: undefined
  })
  const [isNextLoading, setIsNextLoading] = useState(false)

  useEffect(() => {
    // Check for verified auth key
    const verifiedAuthKey = localStorage.getItem("verifiedAuthKey")
    if (!verifiedAuthKey) {
      toast({
        title: "请先验证身份",
        description: "您需要先验证身份ID才能开始定制",
        variant: "destructive",
      })
      router.push("/verify-order")
    }
    validateCrystalData()
  }, [router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'birthTime') {
      // 验证日期格式
      const dateValue = e.target.value;
      if (!dateValue) return;
      
      try {
        // 尝试创建日期对象
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }
        
        // 如果日期有效，更新状态
        setFormData(prev => ({ ...prev, [e.target.name]: dateValue }));
      } catch (error) {
        console.error('Invalid date format:', error);
        // 可以在这里添加错误提示
        toast({
          title: "日期格式错误",
          description: "请输入有效的日期和时间",
          variant: "destructive",
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  }

  const handleSingleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.birthTime) {
          toast({
            title: "请填写完整信息",
            description: "请确保您已填写姓名和出生时间。",
            variant: "destructive",
          })
          return false
        }
        return true
      case 2:
        if (!formData.primaryNeed || !formData.correctiveSituation || !formData.impression || !formData.potential || !formData.healthIssue) {
          toast({
            title: "请回答所有问题",
            description: "请确保您已回答所有问题。",
            variant: "destructive",
          })
          return false
        }
        return true
      case 3:
        return true
      case 4:
        if (!wristSize) {
          toast({
            title: "请填写手围",
            description: "请确保您已填写手围尺寸。",
            variant: "destructive",
          })
          return false
        }
        return true
    }
    return true
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) return
    
    setIsNextLoading(true)
    
    try {
      if (currentStep === 2) {
        // 清除之前的手链数据和布局缓存
        setBracelet(null)
        setBraceletLayouts({
          large: undefined,
          medium: undefined,
          small: undefined
        })
        
        // 首先创建新的对话
        const conversationResponse = await fetch('/api/bracelet/conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!conversationResponse.ok) {
          throw new Error('创建对话失败');
        }
        
        // 生成手链数据
        const newBracelet = await generateBracelet(formData)
        
        // 设置手链数据并显示动画
        setBracelet(newBracelet)
        setShowAnimation(true)
        
        // 等待进度条达到100%
        await new Promise(resolve => {
          const checkProgress = setInterval(() => {
            const progressElement = document.querySelector('.progress-indicator')
            const progress = progressElement ? parseInt(progressElement.getAttribute('data-progress') || '0') : 0
            if (progress >= 100) {
              clearInterval(checkProgress)
              setTimeout(resolve, 1000) // 在100%后额外等待1秒
            }
          }, 100)
        })
        
        // 隐藏动画并进入下一步
        setShowAnimation(false)
        setCurrentStep(prev => prev + 1)
      } else {
        setCurrentStep(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error generating bracelet:', error)
      toast({
        title: "生成失败",
        description: "抱歉，生成手链时出现错误，请稍后重试。",
        variant: "destructive"
      })
      setShowAnimation(false)
    } finally {
      setIsNextLoading(false)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOrderStatus("loading")

    try {
      // 验证手围和订单编号
      if (!wristSize || !orderNumber || !bracelet) {
        toast({
          title: "请填写完整信息",
          description: "请确保您已填写手围和订单编号。",
          variant: "destructive",
        })
        setOrderStatus("idle")
        return
      }

      // 获取已验证的身份ID
      const verifiedAuthKey = localStorage.getItem("verifiedAuthKey")
      if (!verifiedAuthKey) {
        toast({
          title: "身份验证失败",
          description: "请重新验证身份ID。",
          variant: "destructive",
        })
        setOrderStatus("idle")
        router.push("/verify-order")
        return
      }

      // 获取手链预览图片
      const braceletPreview = document.querySelector('.bracelet-preview') as HTMLDivElement
      if (!braceletPreview) {
        throw new Error('无法找到手链预览元素')
      }

      // 使用html2canvas捕获预览图片
      const canvas = await html2canvas(braceletPreview, {
        backgroundColor: null,
        scale: window.devicePixelRatio || 1,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: braceletPreview.offsetWidth,
        height: braceletPreview.offsetHeight
      })

      // 将canvas转换为dataURL
      const imageUrl = canvas.toDataURL('image/png', 0.8)

      // 准备订单数据
      const orderData = {
        identity_key: verifiedAuthKey,
        order_number: orderNumber,
        wrist_size: parseFloat(wristSize),
        bracelet_size: braceletSize,
        destiny_crystal: bracelet.crystals[0]?.name || '',
        functional_crystal: bracelet.crystals[1]?.name || '',
        corrective_crystal: bracelet.crystals[2]?.name || '',
        bracelet_layout: JSON.stringify(braceletLayouts[braceletSize] || []),
        bracelet_design_url: imageUrl
      }

      // 保存订单
      const result = await saveOrderConfirmation(orderData)

      if (result && result.success) {
        setOrderStatus("success")
        toast({
          title: "订单提交成功",
          description: "感谢您的订购！",
          variant: "default",
        })
        
        // 清除密钥并跳转
        localStorage.removeItem("verifiedAuthKey")
        router.push("/thank-you")
      } else {
        throw new Error(result?.error ? String(result.error) : '订单确认失败，请稍后重试')
      }
    } catch (error: any) {
      setOrderStatus("error")
      toast({
        title: "提交失败",
        description: error?.message || "订单提交过程中出现错误，请稍后重试。如果问题持续存在，请联系客服。",
        variant: "destructive"
      })
    }
  }

  const handleSizeChange = (size: BraceletSize) => {
    setBraceletSize(size);
  };

  const generateBracelet = async (formData: FormData): Promise<Bracelet> => {
    const baZi: BaZiResult = calculateBaZi(formData.birthTime);
    
    // 将用户需求映射到 PrimaryNeed 枚举
    const primaryNeedMap: Record<string, PrimaryNeed> = {
      '情感关系': PrimaryNeed.RELATIONSHIP,
      '财富增长': PrimaryNeed.WEALTH,
      '能量防护': PrimaryNeed.PROTECTION,
      '身心平衡': PrimaryNeed.BALANCE,
      '事业上升': PrimaryNeed.CAREER,
      'career': PrimaryNeed.CAREER,
      'relationship': PrimaryNeed.RELATIONSHIP,
      'wealth': PrimaryNeed.WEALTH,
      'protection': PrimaryNeed.PROTECTION,
      'balance': PrimaryNeed.BALANCE
    };
    
    // 将修正需求映射到 CommonSituation 枚举
    const commonSituationMap: Record<string, CommonSituation> = {
      '改善决策犹豫': CommonSituation.INDECISIVE,
      '提升恢复能力': CommonSituation.FATIGUE,
      '减少人际消耗': CommonSituation.SOCIAL_DRAIN,
      '平衡能量敏感': CommonSituation.ENERGY_SENSITIVE,
      'indecisive': CommonSituation.INDECISIVE,
      'fatigue': CommonSituation.FATIGUE,
      'socialDrain': CommonSituation.SOCIAL_DRAIN,
      'energySensitive': CommonSituation.ENERGY_SENSITIVE
    };
    
    // 将初印象映射到 Impression 枚举
    const impressionMap: Record<string, Impression> = {
      'A如沐春风般的温暖亲和力': Impression.WARM,
      'B沉稳可靠的专业权威感': Impression.RELIABLE,
      'C锋芒毕露的个人魅力值': Impression.CHARMING,
      'D洞若观火的冷静洞察力': Impression.INSIGHTFUL,
      'warm': Impression.WARM,
      'reliable': Impression.RELIABLE,
      'charming': Impression.CHARMING,
      'insightful': Impression.INSIGHTFUL
    };
    
    // 将内在潜能映射到 Potential 枚举
    const potentialMap: Record<string, Potential> = {
      'A细腻共情力': Potential.EMPATHY,
      'B理性决策力': Potential.DECISION,
      'C卓越表达力': Potential.EXPRESSION,
      'D直觉敏锐度': Potential.INTUITION,
      'E高效行动力': Potential.EFFICIENCY,
      'empathy': Potential.EMPATHY,
      'decision': Potential.DECISION,
      'expression': Potential.EXPRESSION,
      'intuition': Potential.INTUITION,
      'efficiency': Potential.EFFICIENCY
    };
    
    // 将健康问题映射到 HealthIssue 枚举
    const healthIssueMap: Record<string, HealthIssue> = {
      'A. 长期压力 / 焦虑': HealthIssue.STRESS,
      'B. 睡眠质量不佳': HealthIssue.SLEEP,
      'C. 免疫力低下': HealthIssue.IMMUNITY,
      'D. 血液循环不畅': HealthIssue.CIRCULATION,
      'E. 呼吸系统不适': HealthIssue.RESPIRATORY,
      'F. 情绪低落 / 缺乏活力': HealthIssue.MOOD,
      'G. 内分泌失调': HealthIssue.HORMONAL,
      'stress': HealthIssue.STRESS,
      'sleep': HealthIssue.SLEEP,
      'immunity': HealthIssue.IMMUNITY,
      'circulation': HealthIssue.CIRCULATION,
      'respiratory': HealthIssue.RESPIRATORY,
      'mood': HealthIssue.MOOD,
      'hormonal': HealthIssue.HORMONAL
    };

    // 获取映射后的枚举值
    const primaryNeed = primaryNeedMap[formData.primaryNeed];
    const situation = commonSituationMap[formData.correctiveSituation];
    const desiredImpression = impressionMap[formData.impression];
    const desiredPotential = potentialMap[formData.potential];
    const healthIssue = healthIssueMap[formData.healthIssue];

    console.log('原始表单数据：', formData);
    console.log('映射后的参数：', {
      primaryNeed,
      situation,
      desiredImpression,
      desiredPotential,
      healthIssue
    });

    // 使用 selectCrystals 函数选择水晶
    const selectedCrystals = selectCrystals(
      baZi.dayMaster,
      [
        ...(baZi.recommendedElements?.match(/主用神：([^，]+)/)?.[1]?.split("、") || []),
        ...(baZi.recommendedElements?.match(/次用神：([^）]+)/)?.[1]?.split("、") || [])
      ],
      [], // 不再使用忌用神
      primaryNeed,
      situation,
      desiredImpression,
      desiredPotential,
      healthIssue,
      formData.birthTime,
      []
    );

    // 首先获取会话ID
    try {
      const conversationResponse = await fetch('/api/bracelet/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const conversationData = await conversationResponse.json();
      
      if (!conversationData.conversation_id) {
        throw new Error('获取会话ID失败');
      }

      // 然后生成手链描述
      const response = await fetch('/api/bracelet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crystals: selectedCrystals.destinyCrystal ? 
            [
              selectedCrystals.destinyCrystal.name,
              selectedCrystals.functionalCrystal?.name,
              selectedCrystals.correctiveCrystal?.name
            ].filter(Boolean) : [],
          primaryNeed: formData.primaryNeed,
          correctiveSituation: formData.correctiveSituation,
          conversationId: conversationData.conversation_id,
          instructions: "请创作一首意境优美的古风诗作：1. 以自然意象暗喻内在能量，不要出现任何佩戴、手链等直白词语 2. 每句4-7字，格律自然 3. 意境空灵，意蕴深远 4. 整体氛围清雅脱俗"
        }),
      });

      if (!response.ok) {
        throw new Error('生成手链描述失败');
      }

      const data = await response.json();
      
      if (!data.name || !data.raw_response) {
        throw new Error('API返回数据格式错误');
      }
      
      // Return bracelet data with name and poem
      return {
        crystals: [selectedCrystals.destinyCrystal, selectedCrystals.functionalCrystal, selectedCrystals.correctiveCrystal].filter(Boolean) as Crystal[],
        properties: [
          { title: "命运石", description: selectedCrystals.destinyCrystal?.description || "" },
          { title: "功能石", description: selectedCrystals.functionalCrystal?.description || "" },
          { title: "修正石", description: selectedCrystals.correctiveCrystal?.description || "" }
        ],
        imageUrl: "/images/bracelet-preview.jpg",
        size: braceletSize,
        crystalImages: [
          selectedCrystals.destinyCrystal?.images.raw || "",
          selectedCrystals.functionalCrystal?.images.raw || "",
          selectedCrystals.correctiveCrystal?.images.raw || ""
        ],
        name: data.name,
        description: data.raw_response
          .replace(/\\n/g, '\n') // 替换转义的换行符为实际换行符
          .split('\n')
          .filter((line: string) => {
            const trimmedLine = line.trim();
            return trimmedLine.length > 0 && 
                   !trimmedLine.startsWith('注：') &&
                   !trimmedLine.includes('name') &&
                   !trimmedLine.includes('raw_response') &&
                   !trimmedLine.match(/^\s*[\{\}]\s*$/) &&
                   !trimmedLine.match(/^\s*```.*$/) &&
                   !trimmedLine.match(/^\s*json\s*$/i);
          })
          .map((line: string) => {
            // 将每行转换为带有样式的 div，移除多余的符号
            const cleanedLine = line.trim()
              .replace(/[『』]/g, '')  // 移除『』
              .replace(/[\{\}]/g, '')  // 移除{}
              .replace(/[\[\]]/g, '')  // 移除[]
              .replace(/["""]/g, '')   // 移除引号
              .replace(/^[\s,]*|[\s,]*$/g, '') // 移除开头和结尾的空白和逗号
              .replace(/^json\s*$/im, '') // 移除可能的json标记
              .replace(/^\d+\.\s*/, '') // 移除行首的数字编号
              .replace(/^\s*```.*?\n/g, '') // 移除开头的 ```json 等标记
              .replace(/\n```\s*$/g, '') // 移除结尾的 ``` 标记
              .replace(/\\n/g, ''); // 移除转义的换行符
            return cleanedLine ? `<div class="poem-line leading-loose tracking-wider mb-2 text-base text-center">${cleanedLine}</div>` : '';
          })
          .filter(Boolean) // 移除空行
          .join('')
          .trim()
      };
    } catch (error) {
      console.error('Error generating bracelet:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen py-16">
      {showAnimation && bracelet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75">
          <ComplexMagicAnimation 
            selectedCrystals={bracelet.crystals.map(crystal => ({
              name: crystal.name,
              color: crystalColorMap[crystal.name] || "#9B6B9E",
              rawImage: crystal.images.raw
            }))}
          />
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="font-playfair text-3xl md:text-4xl text-center text-[#333333] mb-8">创建你的溯光水晶手链</h1>
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                      currentStep >= step.id
                        ? "bg-[#333333] text-white"
                        : "bg-white border border-[#cccccc] text-[#999999]"
                    )}
                  >
                    {step.id}
                  </div>
                  <span className={cn("text-sm", currentStep >= step.id ? "text-[#333333]" : "text-[#999999]")}>
                    {step.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("flex-1 h-px mx-2", currentStep > i + 1 ? "bg-[#333333]" : "bg-[#cccccc]")} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl text-[#333333] mb-6">个人信息</h2>
                <p className="text-[#666666] mb-8">请提供你的个人信息，帮助我们创建一款与你能量共鸣的手链。</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-[#333333] mb-2 block">
                      姓名
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-[#cccccc] rounded-md"
                      placeholder="请输入你的姓名"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthTime" className="text-sm font-medium text-[#333333] mb-2 block">
                      出生时间（公历）
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="birthTime"
                        name="birthTime"
                        type="datetime-local"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        className="border-[#cccccc] rounded-md"
                        pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                        required
                        max={new Date().toISOString().slice(0, 16)}
                      />
                      <p className="text-sm text-[#666666]">请填写公历出生时间，系统会自动转换为农历进行八字计算，若您不确定出生时间，请填写12:00，但可能影响结果</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl text-[#333333] mb-6">问卷调查</h2>
                <p className="text-[#666666] mb-8">请回答这些问题，帮助我们了解你的需求和状态。</p>

                <div className="space-y-8">
                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">问题1: 请选择最迫切需要改善的方面：</h3>
                    <RadioGroup
                      value={formData.primaryNeed}
                      onValueChange={(value) => handleSingleSelectChange('primaryNeed', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="情感关系" id="relationship" />
                        <Label htmlFor="relationship" className="flex-1 cursor-pointer">情感关系（桃花运/伴侣沟通）</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="财富增长" id="wealth" />
                        <Label htmlFor="wealth" className="flex-1 cursor-pointer">财富增长（正财稳固/偏财机遇）</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="能量防护" id="protection" />
                        <Label htmlFor="protection" className="flex-1 cursor-pointer">能量防护（屏蔽负能量/增强气场）</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="身心平衡" id="balance" />
                        <Label htmlFor="balance" className="flex-1 cursor-pointer">身心平衡（改善睡眠/缓解焦虑）</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="事业上升" id="career" />
                        <Label htmlFor="career" className="flex-1 cursor-pointer">事业上升（项目顺利/升职加薪）</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">问题2：您最近三个月常遇到以下哪项状况？</h3>
                    <RadioGroup
                      value={formData.correctiveSituation}
                      onValueChange={(value) => handleSingleSelectChange('correctiveSituation', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="改善决策犹豫" id="indecisive" />
                        <Label htmlFor="indecisive" className="flex-1 cursor-pointer">做重要决定时容易犹豫</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="提升恢复能力" id="fatigue" />
                        <Label htmlFor="fatigue" className="flex-1 cursor-pointer">常感疲惫且恢复缓慢</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="减少人际消耗" id="socialDrain" />
                        <Label htmlFor="socialDrain" className="flex-1 cursor-pointer">人际关系消耗大量精力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="平衡能量敏感" id="energySensitive" />
                        <Label htmlFor="energySensitive" className="flex-1 cursor-pointer">对环境能量异常敏感</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 第三题：初印象 */}
                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">问题3：您希望传递给世界的初印象是？</h3>
                    <RadioGroup
                      value={formData.impression}
                      onValueChange={(value) => handleSingleSelectChange('impression', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="A如沐春风般的温暖亲和力" id="impression-a" />
                        <Label htmlFor="impression-a" className="flex-1 cursor-pointer">如沐春风般的温暖亲和力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="B沉稳可靠的专业权威感" id="impression-b" />
                        <Label htmlFor="impression-b" className="flex-1 cursor-pointer">沉稳可靠的专业权威感</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="C锋芒毕露的个人魅力值" id="impression-c" />
                        <Label htmlFor="impression-c" className="flex-1 cursor-pointer">锋芒毕露的个人魅力值</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="D洞若观火的冷静洞察力" id="impression-d" />
                        <Label htmlFor="impression-d" className="flex-1 cursor-pointer">洞若观火的冷静洞察力</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 第四题：内在潜能 */}
                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">问题4：您一直渴望唤醒的内在潜能是？</h3>
                    <RadioGroup
                      value={formData.potential}
                      onValueChange={(value) => handleSingleSelectChange('potential', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="A细腻共情力" id="potential-a" />
                        <Label htmlFor="potential-a" className="flex-1 cursor-pointer">细腻共情力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="B理性决策力" id="potential-b" />
                        <Label htmlFor="potential-b" className="flex-1 cursor-pointer">理性决策力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="C卓越表达力" id="potential-c" />
                        <Label htmlFor="potential-c" className="flex-1 cursor-pointer">卓越表达力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="D直觉敏锐度" id="potential-d" />
                        <Label htmlFor="potential-d" className="flex-1 cursor-pointer">直觉敏锐度</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="E高效行动力" id="potential-e" />
                        <Label htmlFor="potential-e" className="flex-1 cursor-pointer">高效行动力</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 第五题：健康问题 */}
                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">问题5：您当前最关注的身体或情绪健康问题是？</h3>
                    <RadioGroup
                      value={formData.healthIssue}
                      onValueChange={(value) => handleSingleSelectChange('healthIssue', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="stress" id="health-a" />
                        <Label htmlFor="health-a" className="flex-1 cursor-pointer">长期压力 / 焦虑</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="sleep" id="health-b" />
                        <Label htmlFor="health-b" className="flex-1 cursor-pointer">睡眠质量不佳</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="immunity" id="health-c" />
                        <Label htmlFor="health-c" className="flex-1 cursor-pointer">免疫力低下</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="circulation" id="health-d" />
                        <Label htmlFor="health-d" className="flex-1 cursor-pointer">血液循环不畅</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="respiratory" id="health-e" />
                        <Label htmlFor="health-e" className="flex-1 cursor-pointer">呼吸系统不适</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="mood" id="health-f" />
                        <Label htmlFor="health-f" className="flex-1 cursor-pointer">情绪低落 / 缺乏活力</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="hormonal" id="health-g" />
                        <Label htmlFor="health-g" className="flex-1 cursor-pointer">内分泌失调</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {bracelet ? (
                  <>
                    <h2 className="font-playfair text-2xl text-[#333333] mb-6">你的灵石手链</h2>
                    <p className="text-[#666666] mb-8">
                      基于您的个人信息和现状，我们为您准备了完美的灵石组合并创建了专属手链，他们与此时此刻的你最为契合。
                    </p>

                    <div className="mb-8">
                      <div className="text-xl font-medium mb-4">你的八字分析</div>
                      {formData.birthTime ? (
                        (() => {
                          const baZiResult: BaZiResult = calculateBaZi(formData.birthTime);
                          const solar = Solar.fromDate(new Date(formData.birthTime));
                          const lunar = solar.getLunar();
                          const lunarDateStr = `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
                          return (
                            <div className="bg-white rounded-lg p-6 shadow-sm max-w-4xl mx-auto">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center">
                                  <span className="text-gray-600 w-24">公历日期：</span>
                                  <span className="text-gray-900 font-medium">{new Date(formData.birthTime).toLocaleDateString('zh-CN')}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-gray-600 w-24">农历日期：</span>
                                  <span className="text-gray-900 font-medium">{lunarDateStr}</span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-base font-medium text-gray-800 mb-2">四柱信息</h4>
                                <div className="grid grid-cols-4 gap-2">
                                  <div className="bg-gray-50 p-2 rounded">
                                    <div className="text-gray-600 mb-1">年柱</div>
                                    <div className="grid grid-cols-1 gap-1">
                                      <div>
                                        <div className="text-sm text-gray-500">天干</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.yearPillar.stem}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">地支</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.yearPillar.branch}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">藏干</div>
                                        <div className="text-sm text-gray-900">{BRANCH_HIDDEN_STEMS[baZiResult.yearPillar.branch as keyof typeof BRANCH_HIDDEN_STEMS].join('、')}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <div className="text-gray-600 mb-1">月柱</div>
                                    <div className="grid grid-cols-1 gap-1">
                                      <div>
                                        <div className="text-sm text-gray-500">天干</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.monthPillar.stem}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">地支</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.monthPillar.branch}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">藏干</div>
                                        <div className="text-sm text-gray-900">{BRANCH_HIDDEN_STEMS[baZiResult.monthPillar.branch as keyof typeof BRANCH_HIDDEN_STEMS].join('、')}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <div className="text-gray-600 mb-1">日柱</div>
                                    <div className="grid grid-cols-1 gap-1">
                                      <div>
                                        <div className="text-sm text-gray-500">天干</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.dayPillar.stem}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">地支</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.dayPillar.branch}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">藏干</div>
                                        <div className="text-sm text-gray-900">{BRANCH_HIDDEN_STEMS[baZiResult.dayPillar.branch as keyof typeof BRANCH_HIDDEN_STEMS].join('、')}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <div className="text-gray-600 mb-1">时柱</div>
                                    <div className="grid grid-cols-1 gap-1">
                                      <div>
                                        <div className="text-sm text-gray-500">天干</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.hourPillar.stem}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">地支</div>
                                        <div className="text-lg font-medium text-gray-900">{baZiResult.hourPillar.branch}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-500">藏干</div>
                                        <div className="text-sm text-gray-900">{BRANCH_HIDDEN_STEMS[baZiResult.hourPillar.branch as keyof typeof BRANCH_HIDDEN_STEMS].join('、')}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-base font-medium text-gray-800 mb-2">格局分析</h4>
                                <div className="bg-blue-50 p-3 rounded">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">日主：</span>
                                      <span className="text-gray-900 font-medium">{baZiResult.dayMaster}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">身强度：</span>
                                      <span className="text-gray-900 font-medium">{baZiResult.strengthScore}分</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">格局：</span>
                                      <span className="text-gray-900 font-medium">
                                        {baZiResult.specialPattern ? baZiResult.specialPattern.split('，')[0] : 
                                         baZiResult.strengthScore > 60 ? "身强" :
                                         baZiResult.strengthScore < 40 ? "身弱" : "平衡"}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">得势情况：</span>
                                      <span className="text-gray-900 font-medium">{baZiResult.strengthStatus.join('、')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-base font-medium text-gray-800 mb-2">用神分析</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center">
                                    <span className="text-gray-600 w-24">特殊格局：</span>
                                    <span className="text-gray-900 font-medium">{baZiResult.specialPattern?.match(/喜(.+)$/)?.[1] || '无'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-600 w-24">扶抑用神：</span>
                                    <span className="text-gray-900 font-medium">{baZiResult.specialPattern ? '无' : (baZiResult.strengthLevel?.match(/喜(.+)$/)?.[1] || '无特殊扶抑用神需求')}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-600 w-24">调侯用神：</span>
                                    <span className="text-gray-900 font-medium">{baZiResult.seasonalAdjustment || '无需调侯'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-600 w-24">通关用神：</span>
                                    <span className="text-gray-900 font-medium">{baZiResult.conflictingElements || '无'}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-base font-medium text-gray-800 mb-2">主见·璇玑建议</h4>
                                <div className="bg-blue-50 p-3 rounded">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">主用神：</span>
                                      <span className="text-gray-900 font-medium">{baZiResult.recommendedElements?.match(/主用神：([^，]+)/)?.[1] || '无'}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-gray-600 w-24">次用神：</span>
                                      <span className="text-gray-900 font-medium">{baZiResult.recommendedElements?.match(/次用神：([^）]+)/)?.[1] || '无'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : null}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="text-xl font-medium mb-4">手链预览</div>
                        <div className="relative bracelet-preview">
                          <Suspense fallback={
                            <div className="w-full aspect-square bg-[#f8f5f0] rounded-lg overflow-hidden flex items-center justify-center">
                              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
                            </div>
                          }>
                            <BraceletViewer3D
                              size={braceletSize}
                              destinyStones={[bracelet.crystals[0]]}
                              functionalStones={[bracelet.crystals[1]]}
                              correctiveStones={[bracelet.crystals[2]]}
                              layout={braceletLayouts[braceletSize]}
                              onLayoutGenerated={(layout) => {
                                setBraceletLayouts(prev => ({
                                  ...prev,
                                  [braceletSize]: layout
                                }));
                              }}
                            />
                          </Suspense>
                        </div>

                        <div className="mt-8 space-y-4 bg-[#f8f5f0] p-6 rounded-lg">
                          <h3 className="text-2xl font-medium text-center">{bracelet.name || "手链名称生成中..."}</h3>
                          <div 
                            className="text-[#666666] text-center italic [&_.poem-line]:mb-2 [&_.poem-line]:block text-base"
                            dangerouslySetInnerHTML={{ __html: bracelet.description || "简介生成中..." }}
                          />
                        </div>

                        <div className="mt-8 space-y-6">
                          <div>
                            <div className="text-xl font-medium mb-4">请选择珠子的大小</div>
                            <div className="grid grid-cols-3 gap-4">
                              <button
                                onClick={() => handleSizeChange("small")}
                                className={`px-4 py-2 rounded ${
                                  braceletSize === "small" ? "bg-[#333333] text-white" : "bg-gray-200 text-[#333333]"
                                }`}
                              >
                                小
                                <div>(～4mm)</div>
                              </button>
                              <button
                                onClick={() => handleSizeChange("medium")}
                                className={`px-4 py-2 rounded ${
                                  braceletSize === "medium" ? "bg-[#333333] text-white" : "bg-gray-200 text-[#333333]"
                                }`}
                              >
                                中
                                <div>(～6mm)</div>
                              </button>
                              <button
                                onClick={() => handleSizeChange("large")}
                                className={`px-4 py-2 rounded ${
                                  braceletSize === "large" ? "bg-[#333333] text-white" : "bg-gray-200 text-[#333333]"
                                }`}
                              >
                                大
                                <div>(～8mm)</div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xl font-medium mb-4">你的手链灵石组合</div>
                        <div className="space-y-6">
                          {bracelet.properties.map((prop, i) => (
                            <div key={i} className="bg-[#f8f5f0] p-4 rounded-lg">
                              <div className="flex items-center mb-3">
                                <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={bracelet.crystalImages[i] || "/crystal-placeholder.jpg"}
                                    alt={prop.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium text-lg">{prop.title}</h4>
                              </div>
                              <p className="text-[#666666]">{prop.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            )}

            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-playfair text-2xl text-[#333333] mb-6">完成您的订单</h2>
                <p className="text-[#666666] mb-8">请确认设计并提交您的订单信息，身份ID在订单提交后失效，我们将尽快为您制作。</p>

                {bracelet && (
                  <div className="mb-8 p-4 md:p-6 bg-[#f8f5f0] rounded-lg">
                    <div className="text-2xl md:text-3xl font-medium mb-4 text-center">{bracelet.name || "手链名称生成中..."}</div>
                    <div 
                      className="text-[#666666] text-center italic mb-6 [&_.poem-line]:mb-2 [&_.poem-line]:block text-base"
                      dangerouslySetInnerHTML={{ __html: bracelet.description || "简介生成中..." }}
                    />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                      <div>
                        <div className="text-xl font-medium mb-4">手链预览</div>
                        <div className="relative bracelet-preview">
                          <Suspense fallback={
                            <div className="w-full aspect-square bg-[#f8f5f0] rounded-lg overflow-hidden flex items-center justify-center">
                              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
                            </div>
                          }>
                            <BraceletViewer3D
                              size={braceletSize}
                              destinyStones={[bracelet.crystals[0]]}
                              functionalStones={[bracelet.crystals[1]]}
                              correctiveStones={[bracelet.crystals[2]]}
                              layout={braceletLayouts[braceletSize]}
                              onLayoutGenerated={(layout) => {
                                setBraceletLayouts(prev => ({
                                  ...prev,
                                  [braceletSize]: layout
                                }));
                              }}
                            />
                          </Suspense>
                        </div>
                        <div className="mt-4 text-center">
                          <span className="text-[#666666]">已选择尺寸：</span>
                          <span className="font-medium text-[#333333]">
                            {braceletSize === "small" ? "小 (～4mm)" : 
                             braceletSize === "medium" ? "中 (～6mm)" : 
                             "大 (～8mm)"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-medium mb-4">手链灵石组合</div>
                        <div className="space-y-4">
                          {bracelet.properties.map((prop, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={bracelet.crystalImages[i] || "/crystal-placeholder.jpg"}
                                    alt={prop.title}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium">{prop.title}</h4>
                              </div>
                              <p className="text-[#666666] text-sm">{prop.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">输入您的手围：</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={wristSize}
                        onChange={(e) => setWristSize(e.target.value)}
                        className="w-24 border-[#cccccc] rounded-md"
                        placeholder="手围"
                        required
                      />
                      <span className="text-[#666666]">厘米</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">输入订单编号：</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full border-[#cccccc] rounded-md"
                        placeholder="请输入您的订单编号"
                        required
                      />
                    </div>
                  </div>

                  {orderStatus === "success" && (
                    <div className="text-green-600 font-medium">谢谢您的订购！我们正在为您准备手链。</div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#333333] hover:bg-[#555555] text-white"
                    disabled={orderStatus === "loading" || orderStatus === "success"}
                  >
                    {orderStatus === "loading" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        正在提交...
                      </div>
                    ) : orderStatus === "success" ? (
                      "订单已提交"
                    ) : (
                      "提交订单"
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t border-[#eeeeee]">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-[#333333] text-[#333333] hover:bg-[#f8f5f0]"
                >
                  上一步
                </Button>
              )}
              {currentStep < steps.length && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto bg-[#333333] hover:bg-[#555555] text-white"
                  disabled={isNextLoading}
                >
                  {isNextLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      连接大模型...
                    </div>
                  ) : (
                    "下一步"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 
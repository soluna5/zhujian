import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <main className="bg-[#f8f5f0] min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-playfair text-3xl md:text-4xl text-[#333333] mb-6">谢谢您的订购</h1>
        <p className="text-[#666666] mb-8">我们正在为您精心准备独一无二的水晶手链。您的能量之旅即将开始！</p>
        <Link href="/">
          <Button className="bg-[#333333] hover:bg-[#555555] text-white">返回首页</Button>
        </Link>
      </div>
    </main>
  )
}


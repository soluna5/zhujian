import OrderVerification from "@/components/OrderVerification"

export default function VerifyOrderPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-playfair text-center text-[#333333] mb-8">马上开始</h1>
        <p className="text-center text-[#666666] mb-12 max-w-xl mx-auto">
          请输入您的身份ID以开始定制水晶手链。如果您还没有身份ID，请联系我们获取。
        </p>
        <OrderVerification />
      </div>
    </div>
  )
} 
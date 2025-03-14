export default function PreviewPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-8">水晶图片预览</h1>
      
      <div className="grid grid-cols-4 gap-8">
        <div className="space-y-2">
          <h2 className="font-bold">原石 (Raw)</h2>
          <img src="/images/crystals/zishuijing/raw.svg" alt="原石" className="w-32 h-32" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-bold">圆珠 (Round)</h2>
          <img src="/images/crystals/zishuijing/round.svg" alt="圆珠" className="w-32 h-32" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-bold">垫片 (Spacer)</h2>
          <img src="/images/crystals/zishuijing/spacer.svg" alt="垫片" className="w-32 h-32" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-bold">特殊款 (Special)</h2>
          <img src="/images/crystals/zishuijing/special.svg" alt="特殊款" className="w-32 h-32" />
        </div>
      </div>
    </div>
  )
} 
import Image from "next/image"
import Link from "next/link"
import { crystalData } from "@/lib/crystalData"

export default function CrystalDictionary() {
  return (
    <main className="bg-[#f8f5f0] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-playfair text-4xl md:text-5xl text-center text-[#333333] mb-4">灵石字典</h1>
        <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto">
          探索我们精心挑选的灵石系列，每一颗都蕴含独特的能量和特性。我们承诺使用天然水晶、玉石和玛瑙。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crystalData.map((crystal) => (
            <div key={crystal.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <Image
                  src={crystal.images.raw || "/placeholder.svg"}
                  alt={crystal.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-playfair text-2xl text-[#333333]">{crystal.name}</h2>
                <p className="text-[#666666] line-clamp-3">{crystal.description}</p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {crystal.functionalAttributes.primaryPurposes.protection && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">保护</span>
                  )}
                  {crystal.functionalAttributes.primaryPurposes.balance && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">平衡</span>
                  )}
                  {crystal.functionalAttributes.primaryPurposes.relationship && (
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">人际</span>
                  )}
                  {crystal.functionalAttributes.primaryPurposes.wealth && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">财富</span>
                  )}
                  {crystal.functionalAttributes.primaryPurposes.career && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">事业</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/create"
            className="inline-flex items-center border border-[#333333] text-[#333333] px-8 py-3 hover:bg-[#333333] hover:text-white transition-colors rounded-md"
          >
            开始定制你的手链
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}


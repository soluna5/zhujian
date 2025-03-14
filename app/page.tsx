import Link from "next/link"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-120px)]">
        <div className="relative">
          <Image
            src="/images/homepage/hero-bracelet.png"
            alt="Crystal bracelet on wrist"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-[#f8f5f0]">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[#333333] mb-6">ZHUJIAN</h1>
          <p className="text-xl md:text-2xl font-playfair text-[#666666] mb-6">主见——「万物有主，心光自现」</p>
          <p className="text-[#666666] max-w-md mb-8">
            创建你的个性化水晶手链，基于你的出生细节和个人喜好，让宇宙能量与你共鸣。
          </p>
          <div className="flex space-x-4">
            <Link
              href="/verify-order"
              className="inline-flex items-center border border-[#333333] text-[#333333] px-8 py-3 hover:bg-[#333333] hover:text-white transition-colors"
            >
              立即开始
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/crystal-dictionary"
              className="inline-flex items-center border border-[#666666] text-[#666666] px-8 py-3 hover:bg-[#666666] hover:text-white transition-colors"
            >
              灵石字典
            </Link>
          </div>
          <div className="mt-auto flex justify-center pt-12">
            <ArrowDown className="animate-bounce" size={24} />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl text-[#333333] mb-4">创建流程</h2>
            <p className="text-[#666666] max-w-xl mx-auto">
              我们的个性化水晶手链通过精心设计的流程创建，旨在与你的独特能量相连。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-xl">1</span>
              </div>
              <h3 className="font-playfair text-xl mb-2">个人信息</h3>
              <p className="text-[#666666]">输入你的姓名和出生日期，帮助我们了解你的起源。</p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-xl">2</span>
              </div>
              <h3 className="font-playfair text-xl mb-2">问卷调查</h3>
              <p className="text-[#666666]">回答几个简单的问题，帮助我们了解你的现状。</p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-xl">3</span>
              </div>
              <h3 className="font-playfair text-xl mb-2">你的手链</h3>
              <p className="text-[#666666]">收到你的个性化水晶手链设计并下单。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 bg-[#f8f5f0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl text-[#333333] mb-4">品牌故事</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/homepage/sun-moon-energy.png"
                alt="日月能量"
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xl font-playfair text-[#333333]">勘物而见己，心静而路明</p>
              <p className="text-[#666666]">我们相信，真正的力量从不向外求</p>
              <p className="text-[#666666]">主见用现代设计解读东方古老哲学</p>
              <p className="text-[#666666]">不做虚幻的许愿池，只提供看得见的改变公式</p>
              <p className="text-[#666666]">和您一起探索专属的璇玑器物，用内生力量显现理想之境</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 bg-[#f8f5f0]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/homepage/crystal-collection.png"
                alt="Crystal collection"
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#333333] mb-4">水晶能量连接</h2>
              <p className="text-[#666666] mb-6">
                每种水晶都拥有独特的属性和能量，可以增强你生活的不同方面。
                我们的算法将你与完美的天然灵石组合匹配，支持你的人生旅程。
              </p>
              <Link
                href="/verify-order"
                className="inline-flex items-center border border-[#333333] text-[#333333] px-8 py-3 hover:bg-[#333333] hover:text-white transition-colors"
              >
                开始你的旅程
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#333333] mb-6">发现你的灵石</h2>
          <p className="text-[#666666] mb-8 max-w-xl mx-auto">
            你的完美水晶手链正等待被创造。现在开始你的旅程，追溯东方宇宙能量。
          </p>
          <Link
            href="/verify-order"
            className="inline-flex items-center border border-[#333333] text-[#333333] px-8 py-3 hover:bg-[#333333] hover:text-white transition-colors"
          >
            创建你的手链
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}


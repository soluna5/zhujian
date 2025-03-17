import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl text-[#333333] mb-4">关于 ZHUJIAN</h1>
            <p className="text-xl font-playfair text-[#666666] mb-8">主见——「万物有主，心光自现」</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <Image
                src="/images/about/brand-story.png"
                alt="Solunar品牌故事"
                width={500}
                height={600}
                className="object-cover"
                priority
                quality={75}
                loading="eager"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl text-[#333333] mb-4">品牌故事</h2>
              <p className="text-lg font-playfair text-[#333333]">勘物而见己，心静而路明</p>
              <p className="text-[#666666]">
                我们相信，真正的力量从不向外求<br />
                主见用现代设计解读东方古老哲学<br />
                不做虚幻的许愿池，只提供看得见的改变公式<br />
                和您一起探索专属的璇玑器物，用内生力量显现理想之境
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/images/about/sun-energy.png"
                  alt="太阳能量"
                  width={80}
                  height={80}
                  className="object-cover rounded-full"
                  quality={75}
                  loading="eager"
                />
              </div>
              <h3 className="font-playfair text-xl mb-3">“天”</h3>
              <p className="text-[#666666]">
                天赐命格，主见设计了命运石，根据东方命理学调和阴阳偏倚，奠定稳定优质的个人能量基调。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/images/about/moon-energy.png"
                  alt="月亮能量"
                  width={80}
                  height={80}
                  className="object-cover rounded-full"
                  quality={75}
                  loading="eager"
                />
              </div>
              <h3 className="font-playfair text-xl mb-3">“地”</h3>
              <p className="text-[#666666]">
              地予根基，主见设计了修正石，融合西方水晶疗愈理论，认为负面情绪或环境干扰会扭曲能量场，需通过高频水晶修正。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-[#f8f5f0] w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/images/about/star-energy.png"
                  alt="星辰能量"
                  width={80}
                  height={80}
                  className="object-cover rounded-full"
                  quality={75}
                  loading="eager"
                />
              </div>
              <h3 className="font-playfair text-xl mb-3">“人”</h3>
              <p className="text-[#666666]">
                人赋选择，主见特别设计了功能石，旨在用器物连接意图、行动与现实，心念显化你想要的生活。
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/create"
              className="inline-flex items-center border border-[#333333] text-[#333333] px-8 py-3 hover:bg-[#333333] hover:text-white transition-colors"
            >
              创建你的专属手链
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


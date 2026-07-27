import { Leaf, ShieldCheck, Truck, Medal } from '@phosphor-icons/react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const iconMap = {
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  Medal: Medal,
}

/**
 * 特色功能区块组件
 * 展示品牌核心优势，采用不对称布局设计
 */
export default function Features({ features }) {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const leftImageRef = useScrollReveal({ x: -40, duration: 0.8, delay: 0.2 })
  const rightContentRef = useScrollReveal({ x: 40, duration: 0.8, delay: 0.3 })

  return (
    <section className="py-section bg-bone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区 */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-forest-600" />
            <span className="text-forest-700 font-medium tracking-widest text-xs uppercase">
              品牌优势
            </span>
            <span className="w-10 h-px bg-forest-600" />
          </div>
          <h2 className="text-heading-2 font-bold text-zinc-900 text-balance">
            为什么选择精美家居
          </h2>
        </div>

        {/* 主内容区 - 不对称布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 左侧大图 */}
          <div ref={leftImageRef} className="lg:col-span-5">
            <div className="relative rounded-card overflow-hidden shadow-large">
              <img
                src={features[0].image}
                alt={features[0].title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-500 text-white mb-3 sm:mb-4">
                  {(() => {
                    const Icon = iconMap[features[0].icon] || Leaf
                    return <Icon size={24} weight="duotone" className="sm:w-7 sm:h-7" />
                  })()}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 break-words line-clamp-2">{features[0].title}</h3>
                <p className="text-zinc-200 text-xs sm:text-sm break-words line-clamp-3">{features[0].description}</p>
              </div>
            </div>
          </div>

          {/* 右侧特色列表 */}
          <div ref={rightContentRef} className="lg:col-span-7 lg:pl-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.slice(1).map((feature, index) => {
                const Icon = iconMap[feature.icon] || Medal
                return (
                  <div
                    key={feature.id}
                    className="group p-6 bg-white rounded-card shadow-soft hover:shadow-medium transition-all duration-500 ease-expo hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4 group-hover:bg-forest-600 group-hover:text-white transition-all duration-300">
                      <Icon size={24} weight="duotone" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-forest-700 transition-colors break-words line-clamp-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed break-words line-clamp-3">
                      {feature.description}
                    </p>
                  </div>
                )
              })}

              {/* 额外的统计卡片 */}
              <div className="p-6 bg-forest-700 text-white rounded-card overflow-hidden">
                <div className="text-3xl sm:text-4xl font-bold mb-2 break-words">15<span className="text-amber-400">+</span></div>
                <div className="text-xs sm:text-sm text-forest-200 break-words">年行业深耕经验</div>
                <div className="mt-4 pt-4 border-t border-forest-600">
                  <div className="text-xl sm:text-2xl font-bold break-words">50000<span className="text-amber-400">+</span></div>
                  <div className="text-xs sm:text-sm text-forest-200 break-words">幸福家庭的选择</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { ArrowRight, Star } from '@phosphor-icons/react'
import Button from './Button.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 行动召唤区块组件
 * 全屏宽 CTA，引导用户采取下一步行动
 */
export default function CTASection() {
  const contentRef = useScrollReveal({ y: 40, duration: 0.8 })

  return (
    <section className="relative py-section-lg overflow-hidden">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20modern%20living%20room%2C%20cozy%20atmosphere%2C%20elegant%20furniture%2C%20warm%20lighting%2C%20green%20plants%2C%20luxury%20home%20interior%2C%20professional%20photography&image_size=landscape_16_9"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-900/80" />
      </div>

      {/* 装饰光点 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div ref={contentRef}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-8">
            <Star size={16} weight="duotone" />
            限时优惠进行中
          </div>

          <h2 className="text-display font-bold text-white mb-6 text-balance">
            打造您的梦想之家
            <br />
            <span className="text-amber-300">从现在开始</span>
          </h2>

          <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            全场家具低至 7 折起，免费上门测量设计，五年品质保障。
            立即咨询，为您量身定制专属家居方案。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/products" size="lg" className="group">
              立即选购
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/message"
              className="text-white border-white/50 hover:bg-white hover:text-forest-900"
            >
              免费咨询
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

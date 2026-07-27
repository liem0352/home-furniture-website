import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

/**
 * 品牌故事区块组件
 * 以图文并茂的方式展示品牌理念和故事
 */
export default function BrandStory() {
  const leftRef = useScrollReveal({ x: -40, duration: 0.8 })
  const rightRef = useScrollReveal({ x: 40, duration: 0.8, delay: 0.2 })

  return (
    <section className="py-section bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左侧图片区 */}
          <div ref={leftRef} className="relative">
            <div className="relative">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20furniture%20workshop%2C%20craftsman%20hands%20working%20on%20wood%2C%20natural%20oak%20wood%2C%20warm%20lighting%2C%20professional%20atmosphere%2C%20quality%20craftsmanship%2C%20minimalist%20workspace&image_size=portrait_4_3"
                alt="品牌故事"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-card shadow-large"
              />
              {/* 装饰小图 */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-card overflow-hidden shadow-large border-4 border-white hidden md:block">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wood%20texture%20close%20up%2C%20natural%20oak%20grain%2C%20warm%20lighting%2C%20premium%20furniture%20material%2C%20minimalist%20composition&image_size=square_hd"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 右侧文字区 */}
          <div ref={rightRef} className="lg:pl-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-amber-500" />
              <span className="text-amber-600 font-medium tracking-widest text-xs uppercase">
                关于我们
              </span>
            </div>

            <h2 className="text-heading-2 font-bold text-zinc-900 mb-6 text-balance break-words">
              匠心品质
              <br />
              打造温馨家居
            </h2>

            <p className="text-zinc-600 leading-relaxed mb-6 break-words text-pretty">
              精美家居成立于 2009 年，十五年来专注于高品质家居产品的设计与制造。
              我们坚信，好的家具不仅是实用的生活用品，更是生活品质的象征。
            </p>

            <p className="text-zinc-600 leading-relaxed mb-8 break-words text-pretty">
              从原材料甄选到工艺制作，每一个环节我们都精益求精。
              我们与全球优质供应商合作，采用环保材料，为您和家人打造健康舒适的居家环境。
            </p>

            {/* 特色列表 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {[
                '环保材料认证',
                '五年品质质保',
                '专业设计团队',
                '全国配送安装',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-forest-600 flex-shrink-0" />
                  <span className="text-sm text-zinc-700 break-words truncate">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-forest-700 font-medium hover:text-forest-800 transition-colors group"
            >
              了解更多品牌故事
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

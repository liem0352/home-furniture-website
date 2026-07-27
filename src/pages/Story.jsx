import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Heart,
  Star,
  Users,
  ArrowLeft,
} from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero.jsx'

gsap.registerPlugin(ScrollTrigger)

/**
 * 品牌故事页面
 * 展示品牌历史、设计理念、核心价值等
 */
export default function Story() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '品牌故事 | 精美家居'
  }, [])

  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)
  const craftRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector('.hero-content'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }

    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.querySelectorAll('.value-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-item'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
        }
      )
    }

    if (craftRef.current) {
      gsap.fromTo(
        craftRef.current.querySelectorAll('.craft-step'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: craftRef.current,
            start: 'top 75%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const values = [
    {
      icon: Leaf,
      title: '自然环保',
      description: '精选天然环保材料，每一件家具都经过严格的环保检测，为您和家人打造健康安全的居住空间。',
    },
    {
      icon: Heart,
      title: '匠心品质',
      description: '十五年匠心传承，每一道工序都精益求精，只为给您带来最优质的家居体验。',
    },
    {
      icon: Star,
      title: '设计美学',
      description: '融合北欧简约与东方美学，打造兼具功能性与艺术性的家居产品。',
    },
    {
      icon: Users,
      title: '用户至上',
      description: '始终以用户需求为核心，提供贴心的售前售后服务，让每一次购物都安心无忧。',
    },
  ]

  const timeline = [
    { year: '2009', title: '品牌创立', desc: '精美家居在杭州成立，以实木家具为起点，开启品质家居之旅。' },
    { year: '2013', title: '设计升级', desc: '成立独立设计工作室，融合北欧设计理念，推出首个原创系列。' },
    { year: '2017', title: '品类拓展', desc: '产品线从卧室扩展到客厅、餐厅、书房等全品类家居解决方案。' },
    { year: '2020', title: '品牌升级', desc: '开启新零售模式，线上线下融合，为用户提供沉浸式家居体验。' },
    { year: '2024', title: '持续创新', desc: '推出智能家居系列，以科技赋能美好生活，引领行业新风向。' },
  ]

  const craftSteps = [
    {
      step: '01',
      title: '精选原材料',
      description: '甄选全球优质木材、面料和五金配件，从源头把控品质。每一块木材都经过严格的干燥和防虫处理，确保经久耐用。',
    },
    {
      step: '02',
      title: '匠心工艺',
      description: '传承传统榫卯工艺，结合现代精密制造技术。经验丰富的工匠手工打磨每一处细节，让家具不仅是用品，更是艺术品。',
    },
    {
      step: '03',
      title: '严格品控',
      description: '建立23道品质检测工序，从原材料到成品全程追溯。通过ISO9001质量体系认证，确保每一件产品都达到最高标准。',
    },
    {
      step: '04',
      title: '贴心配送',
      description: '专业物流团队配送上门，经验丰富的安装师傅免费安装。五年质保，终身维护，让您购物无忧。',
    },
  ]

  return (
    <div ref={pageRef} className="min-h-screen bg-bone-50">
      <PageHero
        title="十五年匠心"
        subtitle="从一间小小的木工坊到知名家居品牌，我们始终坚持用匠心打造每一件家具，让品质与美好走进千万家庭。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=woodworking%20workshop%2C%20craftsman%20hands%20working%20on%20solid%20oak%20furniture%2C%20natural%20light%2C%20wood%20shavings%2C%20artisan%20workshop%2C%20warm%20tones%2C%20cinematic%20lighting%2C%20premium%20quality&image_size=landscape_16_9"
        tag="品牌故事"
        tagIcon={Star}
        variant="immersive"
      />

      {/* 品牌理念 */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center mb-6 group-hover:bg-forest-100 transition-colors">
                  <value.icon size={28} className="text-forest-600" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{value.title}</h3>
                <p className="text-zinc-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌历程 */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-3 block">
              发展历程
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              十五年，我们一路走来
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              从创立之初到现在，我们始终不忘初心，在品质家居的道路上不断前行
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            {/* 时间线 */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-forest-100 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* 左侧内容 */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                    <div className={`p-6 bg-bone-50 rounded-2xl max-w-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      <h3 className="text-xl font-bold text-forest-700 mb-2">{item.title}</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* 时间点 */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-forest-600 border-4 border-white shadow-soft" />
                    <div className="text-sm font-bold text-forest-700 mt-2 bg-white px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.year}
                    </div>
                  </div>

                  {/* 右侧内容 - 移动端显示 */}
                  <div className="flex-1 md:hidden pl-12">
                    <div className="text-sm font-bold text-forest-700 mb-2">{item.year}</div>
                    <div className="p-4 bg-bone-50 rounded-xl">
                      <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                      <p className="text-zinc-600 text-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* 右侧占位 - 桌面端 */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 匠心工艺 */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=master%20craftsman%20hand%20sanding%20wooden%20furniture%2C%20close%20up%20detail%2C%20workshop%20background%2C%20natural%20light%2C%20wood%20grain%2C%20artisan%20craftsmanship%2C%20warm%20ambiance&image_size=portrait_4_3"
                  alt="匠心工艺"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-forest-400/20 rounded-full blur-2xl" />
            </div>

            <div ref={craftRef}>
              <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-3 block">
                匠心工艺
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8">
                每一件家具，都是匠心之作
              </h2>

              <div className="space-y-8">
                {craftSteps.map((step, index) => (
                  <div key={index} className="craft-step flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-forest-700 flex items-center justify-center text-white">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">{step.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-section bg-forest-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Leaf size={48} className="text-amber-400 mx-auto mb-6" weight="duotone" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            开启您的品质家居之旅
          </h2>
          <p className="text-forest-100 text-lg mb-10 max-w-2xl mx-auto">
            十五年匠心沉淀，只为给您打造一个温馨舒适的家。
            现在选购，即享新人专属优惠。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-forest-900 font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
            >
              去逛逛
              <ArrowLeft size={18} className="rotate-180" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

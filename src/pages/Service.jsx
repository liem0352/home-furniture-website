import { useEffect } from 'react'
import { Truck, ShieldCheck, ArrowCounterClockwise, Headphones, Gift, CreditCard, Gear } from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 服务说明页面
 * 展示配送、售后、支付等服务信息
 */
export default function Service() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '服务说明 | 精美家居'
  }, [])

  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const contentRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })

  const services = [
    {
      icon: Truck,
      title: '配送服务',
      items: [
        '全国主要城市免费送货上门',
        '一般城市 3-7 个工作日送达',
        '偏远地区 7-15 个工作日送达',
        '大件家具专业团队预约送货',
        '配送前 24 小时电话确认',
      ],
    },
    {
      icon: ShieldCheck,
      title: '品质保证',
      items: [
        '五年超长质保服务',
        '终身维护保养指导',
        '正品保障，假一赔十',
        'E0 级环保板材认证',
        '严格品控，层层把关',
      ],
    },
    {
      icon: ArrowCounterClockwise,
      title: '退换货政策',
      items: [
        '7 天无理由退换货',
        '质量问题 30 天免费退换',
        '定制产品不支持无理由退换',
        '退回商品需保持原包装',
        '退款在收到退货后 3-7 个工作日到账',
      ],
    },
    {
      icon: Headphones,
      title: '售后服务',
      items: [
        '专业客服团队 7x12 小时在线',
        '24 小时内响应售后需求',
        '免费上门维修（质保期内）',
        '终身提供零配件更换服务',
        '定期回访，了解使用情况',
      ],
    },
    {
      icon: Gift,
      title: '会员权益',
      items: [
        '注册即送 100 积分',
        '消费 1 元积 1 分，积分可抵现',
        '生日当月享专属优惠',
        '新品优先体验资格',
        '会员专属折扣活动',
      ],
    },
    {
      icon: CreditCard,
      title: '支付方式',
      items: [
        '支持微信支付',
        '支持支付宝支付',
        '支持银行卡支付',
        '支持货到付款（部分地区）',
        '支持分期付款',
      ],
    },
  ]

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      <PageHero
        title="服务说明"
        subtitle="专业服务，安心购物。我们致力于为您提供最优质的购物体验，从选品到售后，每一个环节都用心服务。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20furniture%20delivery%20service%2C%20warehouse%20with%20packaged%20furniture%2C%20delivery%20truck%2C%20professional%20workers%2C%20modern%20logistics%20center%2C%20warm%20lighting%2C%20high%20end%20brand%20service%2C%20professional%20photography&image_size=landscape_16_9"
        tag="贴心服务"
        tagIcon={Gear}
        variant="immersive"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 标题 */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
            贴心服务
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            专业服务，安心购物
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            我们致力于为您提供最优质的购物体验，从选品到售后，每一个环节都用心服务
          </p>
        </div>

        {/* 服务卡片网格 */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-card p-8 shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center mb-6 group-hover:bg-forest-700 group-hover:text-white transition-all duration-300">
                  <Icon size={28} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* 底部 CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-600 mb-6">
            还有其他问题？欢迎联系我们的客服团队
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:400-200-500"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-colors"
            >
              <Headphones size={18} />
              客服热线 400-200-500
            </a>
            <a
              href="mailto:contact@jingmeijiaju.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-button hover:bg-zinc-50 transition-colors"
            >
              在线留言
            </a>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

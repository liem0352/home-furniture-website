import { useState, useEffect } from 'react'
import {
  CaretDown,
  Question,
  ShoppingCart,
  Truck,
  ArrowCounterClockwise,
  CreditCard,
  User,
  ShieldCheck,
  Warehouse,
  QuestionMark,
} from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * FAQ 常见问题页面
 * 展示用户常见问题及解答，采用手风琴折叠形式
 */
export default function FAQ() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '常见问题 | 精美家居'
  }, [])

  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const contentRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })
  const [openIndex, setOpenIndex] = useState(0)

  /**
   * 切换问题展开/收起
   */
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const categories = [
    {
      icon: ShoppingCart,
      title: '购买相关',
      questions: [
        {
          q: '如何下单购买？',
          a: '您可以通过以下方式下单：1. 在网站上直接选择商品加入购物车，然后结算；2. 拨打客服热线 400-888-9999 电话订购；3. 前往我们的线下门店体验并购买。',
        },
        {
          q: '商品价格包含哪些费用？',
          a: '商品价格为产品本身的价格，不包含运费、安装费等附加费用。具体运费和安装费用根据您所在地区和产品类型而定，结算页面会显示详细费用明细。',
        },
        {
          q: '促销活动如何参与？',
          a: '网站会不定期推出促销活动，您可以关注首页活动专区或订阅我们的邮件通知，及时获取最新优惠信息。促销活动期间下单，系统会自动计算优惠金额。',
        },
        {
          q: '可以开具发票吗？',
          a: '可以。我们提供正规增值税普通发票和增值税专用发票。请在下单时备注发票信息，包括发票抬头、税号等，发票将随商品一同寄出或在收货后 7 个工作日内单独寄出。',
        },
      ],
    },
    {
      icon: Truck,
      title: '配送物流',
      questions: [
        {
          q: '配送范围和时间是怎样的？',
          a: '我们支持全国配送，港澳台及海外地区暂不支持。一般城市 3-7 个工作日送达，偏远地区 7-15 个工作日送达。大件家具需要预约送货，具体时间以客服确认为准。',
        },
        {
          q: '送货上门吗？可以安装吗？',
          a: '全国主要城市提供免费送货上门服务，大件家具提供专业安装服务（部分城市需收取安装费）。安装服务包括上门安装、调试、清理包装垃圾等。',
        },
        {
          q: '可以修改收货地址吗？',
          a: '订单发货前可以修改收货地址，请及时联系客服处理。如果订单已发货，则无法修改地址，您可以联系快递网点协商转寄或拒收后重新下单。',
        },
        {
          q: '如何查询物流信息？',
          a: '订单发货后，您可以在"我的订单"中查看物流单号和实时物流轨迹，也可以通过物流单号在快递公司官网查询。如有疑问，可随时联系客服协助查询。',
        },
      ],
    },
    {
      icon: ArrowCounterClockwise,
      title: '退换售后',
      questions: [
        {
          q: '退换货政策是怎样的？',
          a: '我们提供 7 天无理由退换货服务（定制商品除外），质量问题 30 天免费退换。退回商品需保持原包装完好，不影响二次销售。质量问题退货运费由我们承担，无理由退换运费由买家承担。',
        },
        {
          q: '如何申请退换货？',
          a: '您可以在"我的订单"中点击"申请退换货"按钮，填写退换原因并上传相关照片，我们会在 24 小时内审核。审核通过后，请按照客服提供的地址寄回商品。',
        },
        {
          q: '退款多久能到账？',
          a: '我们收到退回商品并确认无误后，会在 3-7 个工作日内办理退款。退款将按照原支付路径返回，具体到账时间以支付银行或支付平台处理时间为准。',
        },
        {
          q: '保修期是多久？',
          a: '我们提供五年超长质保服务，涵盖主要结构和工艺问题。质保期内非人为损坏的维修费用由我们承担。此外，我们还提供终身维护保养指导服务。',
        },
      ],
    },
    {
      icon: CreditCard,
      title: '支付相关',
      questions: [
        {
          q: '支持哪些支付方式？',
          a: '我们支持多种支付方式：支付宝、微信支付、银联在线支付、各大银行网银支付、信用卡分期付款等。您可以根据自己的喜好选择合适的支付方式。',
        },
        {
          q: '支付安全吗？',
          a: '我们采用银行级加密技术保护您的支付信息安全，所有支付操作均通过正规支付通道完成，我们不会存储您的支付密码等敏感信息。请放心支付。',
        },
        {
          q: '可以分期付款吗？',
          a: '支持信用卡分期付款，合作银行包括工商银行、建设银行、招商银行等。分期期数有 3 期、6 期、12 期可选，具体分期手续费以银行规定为准。',
        },
        {
          q: '订单支付失败怎么办？',
          a: '支付失败可能是由于网络问题、余额不足、银行卡限额等原因。请检查支付环境后重试，或更换其他支付方式。如问题持续，请联系客服协助处理。',
        },
      ],
    },
    {
      icon: User,
      title: '账户相关',
      questions: [
        {
          q: '如何注册账号？',
          a: '点击页面右上角"注册"按钮，填写手机号、设置密码、输入验证码即可完成注册。注册成功后您可以享受会员专属优惠、订单管理、收藏夹等便捷服务。',
        },
        {
          q: '忘记密码怎么办？',
          a: '在登录页面点击"忘记密码"，输入注册手机号，通过手机验证码验证后即可重置密码。建议您定期更换密码，保障账户安全。',
        },
        {
          q: '如何修改个人信息？',
          a: '登录后进入"个人中心"，您可以修改头像、昵称、手机号、收货地址等个人信息。修改手机号需要验证新手机号，请确保手机畅通。',
        },
        {
          q: '可以注销账号吗？',
          a: '可以。如需注销账号，请联系客服提交注销申请，我们会在核实身份后为您处理。账号注销后，您的个人信息将被清除，且无法恢复，请谨慎操作。',
        },
      ],
    },
    {
      icon: ShieldCheck,
      title: '品质保障',
      questions: [
        {
          q: '产品质量有保障吗？',
          a: '我们的产品均通过严格的质量检测，符合国家相关标准。主要板材采用 E0 级环保材料，甲醛释放量远低于国家标准。我们承诺正品保障，假一赔十。',
        },
        {
          q: '环保标准是什么？',
          a: '我们使用的板材均达到 E0 级环保标准，甲醛释放量 ≤ 0.05mg/m³，远低于国家规定的 E1 级标准（≤ 0.124mg/m³），让您使用更放心。',
        },
        {
          q: '产品和图片一样吗？',
          a: '产品图片均为实物拍摄，但由于光线、显示器等原因，可能存在轻微色差，属于正常现象，请以实物为准。如有疑问，建议您前往线下门店实地体验。',
        },
        {
          q: '可以定制产品吗？',
          a: '支持全屋定制服务，您可以根据空间尺寸、材质喜好、颜色选择等个性化需求定制家具。定制产品不支持 7 天无理由退换，具体请咨询定制顾问。',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-bone-50">
      <PageHero
        title="FAQ · 常见问题"
        subtitle="这里收集了用户最常咨询的问题，希望能帮您快速找到答案。如未找到满意的解答，欢迎联系我们的客服团队。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=help%20desk%20support%20team%2C%20professional%20customer%20service%2C%20modern%20office%2C%20warm%20lighting%2C%20friendly%20atmosphere%2C%20minimalist%20interior%2C%20professional%20photography&image_size=landscape_16_9"
        tag="帮助中心"
        tagIcon={QuestionMark}
        variant="immersive"
      />

      {/* FAQ 内容区域 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto" ref={contentRef}>
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-forest-700 text-white flex items-center justify-center">
                  <category.icon size={24} weight="duotone" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const globalIndex = categoryIndex * 100 + qIndex
                  const isOpen = openIndex === globalIndex

                  return (
                    <div
                      key={qIndex}
                      className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-semibold text-zinc-900 pr-4">
                          {item.q}
                        </span>
                        <CaretDown
                          size={20}
                          className={`flex-shrink-0 text-zinc-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-forest-600' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 仍有疑问区域 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-zinc-50 to-bone-50 rounded-3xl p-12 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              仍有疑问？
            </h2>
            <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
              如果以上问题没有解决您的疑问，欢迎通过以下方式联系我们，
              我们的客服团队会尽快为您解答。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:400-888-9999"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-700 text-white font-medium rounded-xl hover:bg-forest-800 transition-colors"
              >
                <Warehouse size={20} />
                客服热线 400-888-9999
              </a>
              <a
                href="mailto:service@jingmei.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-700 font-medium rounded-xl border border-zinc-300 hover:border-forest-500 hover:text-forest-700 transition-colors"
              >
                <ShieldCheck size={20} />
                发送邮件
              </a>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  )
}

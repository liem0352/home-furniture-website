import { useState } from 'react'
import {
  User,
  Envelope,
  Phone,
  ChatText,
  CheckCircle,
  PaperPlaneRight,
  Clock,
  MapPin,
  Headset,
  ChatCircleText,
} from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { contactInfo } from '../data/nav.js'

/**
 * 在线留言页面
 * 用户可以提交留言，并查看常见问题
 */
export default function Message() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const formRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })
  const faqRef = useScrollReveal({ y: 40, duration: 0.8 })

  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      q: '如何查询我的订单状态？',
      a: '您可以登录账号后，在「我的订单」中查看实时订单状态，也可以拨打客服热线 400-200-500 咨询。',
    },
    {
      q: '产品配送需要多长时间？',
      a: '一般城市 3-7 个工作日送达，偏远地区 7-15 个工作日。大件家具会有专业团队预约送货上门时间。',
    },
    {
      q: '支持退换货吗？',
      a: '我们提供 7 天无理由退换货服务，产品质量问题 30 天内可免费退换。具体请参考退换货政策。',
    },
    {
      q: '可以定制家具吗？',
      a: '支持定制服务，您可以在线留言或到店咨询，我们的设计师会为您提供专属定制方案。',
    },
    {
      q: '如何申请售后维修？',
      a: '请拨打客服热线或在线留言说明问题，我们会在 24 小时内安排售后人员与您联系。',
    },
  ]

  /**
   * 处理表单输入变化
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /**
   * 表单验证
   */
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = '请输入您的姓名'
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号'
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!formData.subject.trim()) newErrors.subject = '请选择咨询类型'
    if (!formData.message.trim()) {
      newErrors.message = '请输入留言内容'
    } else if (formData.message.length < 10) {
      newErrors.message = '留言内容至少 10 个字'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      <PageHero
        title="在线留言"
        subtitle="有任何问题？我们随时为您解答"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20cozy%20customer%20service%20desk%20in%20elegant%20furniture%20showroom%2C%20soft%20natural%20lighting%2C%20professional%20modern%20interior%2C%20green%20plants%2C%20wooden%20desk%2C%20minimalist%20design%2C%20high%20end%20furniture%20store%2C%20warm%20ambient%20atmosphere%2C%20professional%20photography&image_size=landscape_16_9"
        tag="客户服务"
        tagIcon={ChatCircleText}
        variant="immersive"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 联系信息卡片 */}
        <div ref={titleRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 opacity-0">
          {[
            { icon: Phone, title: '客服热线', content: contactInfo.phone, sub: '工作日 9:00-21:00' },
            { icon: Envelope, title: '电子邮箱', content: contactInfo.email, sub: '24小时内回复' },
            { icon: MapPin, title: '门店地址', content: contactInfo.address, sub: '欢迎到店体验' },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-white rounded-card p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center mb-4">
                  <Icon size={24} weight="duotone" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-1">{item.title}</h3>
                <p className="text-forest-700 font-medium mb-1">{item.content}</p>
                <p className="text-sm text-zinc-500">{item.sub}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* 留言表单 */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-white rounded-card shadow-medium p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={40} className="text-green-600" weight="fill" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">留言提交成功</h3>
                  <p className="text-zinc-500 mb-8">
                    感谢您的留言，我们会在 24 小时内与您联系
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
                    }}
                    className="px-6 py-3 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-colors"
                  >
                    继续留言
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2">提交您的留言</h2>
                  <p className="text-zinc-500 mb-6">
                    填写以下信息，我们的客服团队会尽快与您联系
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                          姓名 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="请输入您的姓名"
                            className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                              errors.name ? 'border-red-400' : 'border-zinc-200'
                            }`}
                          />
                        </div>
                        {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                          手机号 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="请输入手机号"
                            className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                              errors.phone ? 'border-red-400' : 'border-zinc-200'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                        邮箱地址
                      </label>
                      <div className="relative">
                        <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="请输入邮箱地址（选填）"
                          className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                            errors.email ? 'border-red-400' : 'border-zinc-200'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                        咨询类型 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all ${
                          errors.subject ? 'border-red-400' : 'border-zinc-200'
                        }`}
                      >
                        <option value="">请选择咨询类型</option>
                        <option value="product">产品咨询</option>
                        <option value="order">订单问题</option>
                        <option value="after-sale">售后服务</option>
                        <option value="custom">定制服务</option>
                        <option value="cooperation">商务合作</option>
                        <option value="other">其他问题</option>
                      </select>
                      {errors.subject && <p className="mt-1.5 text-sm text-red-500">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                        留言内容 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <ChatText size={18} className="absolute left-4 top-4 text-zinc-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="请详细描述您的问题或需求..."
                          className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none ${
                            errors.message ? 'border-red-400' : 'border-zinc-200'
                          }`}
                        />
                      </div>
                      {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all duration-300 active:scale-[0.98] shadow-soft hover:shadow-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          提交中...
                        </>
                      ) : (
                        <>
                          <PaperPlaneRight size={18} />
                          提交留言
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* 常见问题 */}
          <div ref={faqRef} className="lg:col-span-2">
            <div className="bg-white rounded-card shadow-medium p-8 sticky top-24">
              <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Headset size={22} className="text-forest-600" weight="duotone" />
                常见问题
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg transition-all duration-300 ${
                      expandedFaq === index
                        ? 'border-forest-200 bg-forest-50/50'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-4 text-left flex items-start justify-between gap-4"
                    >
                      <span className="font-medium text-zinc-800 text-sm">{faq.q}</span>
                      <span
                        className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          expandedFaq === index
                            ? 'bg-forest-600 border-forest-600 text-white rotate-45'
                            : 'border-zinc-300 text-zinc-400'
                        }`}
                      >
                        <span className="text-sm leading-none">+</span>
                      </span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 text-sm text-zinc-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <Clock size={16} className="text-amber-500" />
                  <span>客服工作时间：{contactInfo.workHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

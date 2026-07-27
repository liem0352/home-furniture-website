import { useState, useEffect } from 'react'
import {
  Phone,
  Envelope,
  MapPin,
  Clock,
  Chat,
  Building,
  CaretRight,
  PaperPlaneRight,
  User,
  ChatCircleText,
} from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useToast } from '../store/AppContext.jsx'

/**
 * 联系我们页面
 * 展示联系方式、门店分布、在线留言等功能
 */
export default function Contact() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '联系我们 | 精美家居'
  }, [])

  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const contentRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })
  const formRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.3 })
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * 处理表单输入变化
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      showToast('请输入您的姓名', 'error')
      return
    }
    if (!formData.phone.trim()) {
      showToast('请输入您的电话', 'error')
      return
    }
    if (!formData.email.trim()) {
      showToast('请输入您的邮箱', 'error')
      return
    }
    if (!formData.message.trim()) {
      showToast('请输入留言内容', 'error')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    showToast('留言提交成功，我们会尽快与您联系！', 'success')
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
  }

  const stores = [
    {
      city: '广州',
      name: '广州总部旗舰店',
      address: '广州市番禺区家具创意产业园精美路 88 号',
      phone: '020-8888-9999',
      hours: '周一至周日 9:30-21:30',
    },
    {
      city: '深圳',
      name: '深圳旗舰店',
      address: '深圳市福田区深南大道 6008 号',
      phone: '0755-8888-6666',
      hours: '周一至周日 10:00-22:00',
    },
    {
      city: '上海',
      name: '上海旗舰店',
      address: '上海市静安区南京西路 1788 号',
      phone: '021-6666-8888',
      hours: '周一至周日 10:00-21:30',
    },
    {
      city: '北京',
      name: '北京体验店',
      address: '北京市朝阳区建国路 88 号',
      phone: '010-6666-9999',
      hours: '周一至周日 10:00-21:00',
    },
  ]

  return (
    <div className="min-h-screen bg-bone-50">
      <PageHero
        title="联系我们"
        subtitle="随时欢迎您的咨询与到访"
        background="from-forest-900 via-forest-800 to-forest-700"
      />

      {/* 联系方式卡片 */}
      <section className="py-16 px-6 -mt-8 relative z-10">
        <div ref={titleRef} className="max-w-7xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-4">
            <Chat size={16} />
            联系方式
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
            多种方式，随时联系
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            无论您有任何问题或建议，我们的客服团队随时为您服务
          </p>
        </div>

        <div ref={contentRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Phone, title: '客服热线', value: '400-888-9999', desc: '全国免费服务热线' },
            { icon: Envelope, title: '电子邮箱', value: 'service@jingmei.com', desc: '工作日24小时内回复' },
            { icon: MapPin, title: '公司地址', value: '广东·广州', desc: '番禺区家具创意产业园' },
            { icon: Clock, title: '服务时间', value: '9:00-21:00', desc: '全年无休，竭诚服务' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-medium hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-600 mb-4 group-hover:bg-forest-600 group-hover:text-white transition-colors duration-300">
                <item.icon size={24} weight="duotone" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
              <p className="text-lg font-bold text-forest-700 mb-1">{item.value}</p>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 门店分布 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              <Building size={16} />
              门店分布
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
              全国线下体验店
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              欢迎亲临门店，感受真实的家居质感与空间氛围
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((store, index) => (
              <div
                key={index}
                className="bg-bone-50 rounded-2xl p-6 border border-zinc-100 hover:border-forest-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-forest-100 text-forest-700 text-sm font-medium rounded-full mb-2">
                      {store.city}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900">{store.name}</h3>
                  </div>
                  <CaretRight size={24} className="text-zinc-300" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-600">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-forest-600" />
                    <span className="text-zinc-600">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-forest-600" />
                    <span className="text-zinc-600">{store.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 公司信息 + 留言表单 */}
      <section className="py-16 px-6 bg-bone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* 公司信息 */}
            <div ref={contentRef} className="lg:col-span-2">
              <div className="bg-forest-700 rounded-2xl p-8 text-white h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-amber-300 rounded-full text-sm font-medium mb-4">
                  <Building size={16} />
                  公司信息
                </div>
                <h2 className="text-2xl font-bold mb-6">
                  期待与您合作
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">公司地址</p>
                      <p className="text-zinc-600">广东省广州市番禺区家具创意产业园精美路 88 号</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">总机电话</p>
                      <p className="text-zinc-600">021-8888-9999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Envelope size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">商务邮箱</p>
                      <p className="text-zinc-600">business@jingmei.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">工作时间</p>
                      <p className="text-zinc-600">周一至周五 9:00-18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ChatCircleText size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">社交媒体</p>
                      <p className="text-zinc-600">微信 / 微博：@精美家居官方</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 留言表单 */}
            <div ref={formRef} className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-4">
                  <PaperPlaneRight size={16} />
                  在线留言
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  给我们留言
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        您的姓名 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="请输入姓名"
                          className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        联系电话 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="请输入手机号"
                          className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      电子邮箱 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="请输入邮箱地址"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      留言主题
                    </label>
                    <div className="relative">
                      <Chat size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">请选择主题</option>
                        <option value="product">产品咨询</option>
                        <option value="order">订单问题</option>
                        <option value="aftersale">售后服务</option>
                        <option value="cooperation">商务合作</option>
                        <option value="other">其他</option>
                      </select>
                      <CaretRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      留言内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="请详细描述您的问题或建议..."
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-forest-700 text-white font-medium rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      '提交中...'
                    ) : (
                      <>
                        <PaperPlaneRight size={18} />
                        提交留言
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  )
}

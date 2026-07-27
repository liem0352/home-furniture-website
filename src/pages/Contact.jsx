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
      showToast('请输入联系电话', 'error')
      return
    }
    if (!formData.message.trim()) {
      showToast('请输入留言内容', 'error')
      return
    }

    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    showToast('提交成功，我们会尽快与您联系', 'success')
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: '客服热线',
      content: '400-888-9999',
      subContent: '周一至周日 9:00-21:00',
      link: 'tel:400-888-9999',
    },
    {
      icon: Envelope,
      title: '电子邮箱',
      content: 'service@jingmei.com',
      subContent: '24小时内回复',
      link: 'mailto:service@jingmei.com',
    },
    {
      icon: Chat,
      title: '在线客服',
      content: '点击咨询',
      subContent: '工作日 9:00-18:00',
      link: '#',
    },
    {
      icon: Building,
      title: '企业合作',
      content: 'business@jingmei.com',
      subContent: '工程/采购/加盟',
      link: 'mailto:business@jingmei.com',
    },
  ]

  const stores = [
    {
      city: '上海',
      name: '上海旗舰店',
      address: '上海市静安区南京西路 1788 号',
      phone: '021-6888-9999',
      hours: '10:00 - 22:00',
    },
    {
      city: '北京',
      name: '北京旗舰店',
      address: '北京市朝阳区建国门外大街 1 号',
      phone: '010-6888-9999',
      hours: '10:00 - 22:00',
    },
    {
      city: '深圳',
      name: '深圳旗舰店',
      address: '深圳市福田区深南大道 6008 号',
      phone: '0755-6888-9999',
      hours: '10:00 - 22:00',
    },
    {
      city: '广州',
      name: '广州体验店',
      address: '广州市天河区天河路 385 号',
      phone: '020-6888-9999',
      hours: '10:00 - 22:00',
    },
    {
      city: '杭州',
      name: '杭州体验店',
      address: '杭州市西湖区延安路 508 号',
      phone: '0571-6888-9999',
      hours: '10:00 - 22:00',
    },
    {
      city: '成都',
      name: '成都体验店',
      address: '成都市锦江区春熙路 88 号',
      phone: '028-6888-9999',
      hours: '10:00 - 22:00',
    },
  ]

  return (
    <div className="min-h-screen bg-bone-50">
      <PageHero
        title="与我们取得联系"
        subtitle="我们随时准备为您提供专业的家居咨询服务，无论是产品咨询、订单问题还是合作洽谈。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20contact%20center%2C%20modern%20office%2C%20friendly%20atmosphere%2C%20green%20plants%2C%20warm%20lighting%2C%20minimalist%20interior%2C%20corporate%20photography&image_size=landscape_16_9"
        tag="联系我们"
        tagIcon={ChatCircleText}
        variant="immersive"
      />

      {/* 联系方式卡片区域 */}
      <section className="py-16 px-6 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto" ref={contentRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-forest-200 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4 group-hover:bg-forest-700 group-hover:text-white transition-colors">
                  <item.icon size={24} weight="duotone" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                <p className="text-forest-700 font-medium mb-1">{item.content}</p>
                <p className="text-sm text-zinc-500">{item.subContent}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 在线留言 + 公司信息 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={formRef}>
            {/* 在线留言表单 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-forest-700 text-white flex items-center justify-center">
                  <PaperPlaneRight size={24} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">在线留言</h2>
                  <p className="text-zinc-500 text-sm">我们会在 24 小时内回复您</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="请输入您的姓名"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      电话 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入联系电话"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入电子邮箱（选填）"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    主题
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  >
                    <option value="">请选择咨询主题</option>
                    <option value="product">产品咨询</option>
                    <option value="order">订单问题</option>
                    <option value="aftersale">售后服务</option>
                    <option value="custom">定制服务</option>
                    <option value="cooperation">商务合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    留言内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="请详细描述您的问题或需求..."
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-forest-700 text-white font-semibold rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>提交中...</>
                  ) : (
                    <>
                      <PaperPlaneRight size={18} />
                      提交留言
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* 公司信息 */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                  <Building size={28} className="text-forest-700" weight="duotone" />
                  公司信息
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
                      <p className="font-medium text-zinc-900">企业邮箱</p>
                      <p className="text-zinc-600">contact@jingmei.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-zinc-900">工作时间</p>
                      <p className="text-zinc-600">周一至周五 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-forest-700 to-forest-900 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">加入我们</h2>
                <p className="text-forest-100 mb-6">
                  精美家居正在招募优秀人才，如果你热爱家居设计，
                  欢迎加入我们的团队，一起创造美好的家居生活。
                </p>
                <a
                  href="mailto:hr@jingmei.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-800 font-semibold rounded-xl hover:bg-forest-50 transition-colors"
                >
                  <User size={18} />
                  查看职位
                  <CaretRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 门店分布 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-50 text-forest-700 rounded-full text-sm font-medium mb-4">
              <MapPin size={16} />
              线下门店
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              全国门店分布
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              我们在全国多个城市设有线下门店，欢迎您到店体验
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store, index) => (
              <div
                key={index}
                className="group bg-zinc-50 rounded-2xl p-6 border border-zinc-100 hover:border-forest-200 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-100 text-forest-700 flex items-center justify-center">
                      <MapPin size={20} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{store.city}</p>
                      <h3 className="font-semibold text-zinc-900">{store.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-zinc-600">
                    <span className="text-zinc-400">地址：</span>
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span className="text-zinc-400">电话：</span>
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span className="text-zinc-400">营业时间：</span>
                    <span>{store.hours}</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 text-sm font-medium text-forest-700 border border-forest-200 rounded-xl hover:bg-forest-50 transition-colors flex items-center justify-center gap-1">
                  查看导航
                  <CaretRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  )
}

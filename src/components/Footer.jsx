import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Envelope,
  MapPin,
  Clock,
  FacebookLogo,
  InstagramLogo,
  WechatLogo,
  ShareNetwork,
  PaperPlaneRight,
  Gift,
} from '@phosphor-icons/react'
import { footerLinks, contactInfo } from '../data/nav.js'
import { useToast } from '../store/AppContext.jsx'

/**
 * 页脚组件
 * 包含品牌信息、导航链接、联系方式、邮件订阅和版权信息
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { showToast } = useToast()

  /**
   * 处理邮件订阅
   */
  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      showToast('请输入邮箱地址', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast('请输入有效的邮箱地址', 'error')
      return
    }

    setIsSubscribing(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    showToast('订阅成功，感谢您的关注！', 'success')
    setEmail('')
    setIsSubscribing(false)
  }

  return (
    <footer className="bg-forest-900 text-zinc-300">
      <div className="border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-forest-800 to-forest-700 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/20 text-amber-300 rounded-full text-sm font-medium mb-4">
                  <Gift size={16} weight="duotone" />
                  订阅即享新人优惠
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  订阅我们的邮件
                </h3>
                <p className="text-forest-200">
                  第一时间获取新品资讯、专属优惠和家居灵感，订阅即享 100 元新人优惠券
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入您的邮箱地址"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3.5 bg-amber-500 text-forest-900 font-semibold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubscribing ? (
                    '订阅中...'
                  ) : (
                    <>
                      <PaperPlaneRight size={18} />
                      立即订阅
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-full bg-bone-100 flex items-center justify-center">
                <span className="text-forest-700 font-bold text-lg">精</span>
              </div>
              <span className="font-semibold text-lg text-white">精美家居</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 mb-5">
              专注高品质家居十五年，为您打造温馨舒适的生活空间。匠心品质，服务至上。
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-amber-400" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Envelope size={14} className="text-amber-400" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={14} className="text-amber-400" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              {[
                { icon: WechatLogo, label: '微信' },
                { icon: ShareNetwork, label: '微博' },
                { icon: InstagramLogo, label: 'Instagram' },
                { icon: FacebookLogo, label: 'Facebook' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-forest-700 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-3">产品中心</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">灵感资源</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">客户服务</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            Copyright © {currentYear} 精美家居 · liem. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">隐私政策</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">服务条款</Link>
            <Link to="/faq" className="hover:text-zinc-300 transition-colors">帮助中心</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

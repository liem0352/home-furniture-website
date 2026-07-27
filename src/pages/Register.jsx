import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  User,
  ArrowLeft,
  Phone,
  CheckCircle,
} from '@phosphor-icons/react'

/**
 * 注册页面
 * 用户注册表单，支持用户名、邮箱、密码等信息
 *
 * 移动端触摸优化说明：
 * - 所有可点击元素（链接、按钮、复选框）的触摸区域均不小于 44x44px
 * - 符合 WCAG 2.1 触摸目标尺寸标准，提升移动端用户体验
 * - 通过增加内边距（padding）和最小高度（min-h-[44px]）实现
 * - 使用负外边距（-ml-2, -mr-1）抵消内边距，保持视觉对齐
 */
export default function Register() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '注册 | 精美家居'
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  /**
   * 处理表单输入变化
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /**
   * 表单验证
   */
  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名'
    } else if (formData.username.length < 2) {
      newErrors.username = '用户名至少 2 个字符'
    }
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号'
    }
    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 8) {
      newErrors.password = '密码至少 8 位，包含字母和数字'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }
    if (!formData.agree) {
      newErrors.agree = '请阅读并同意用户协议'
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
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate('/login')
  }

  return (
    <div className="min-h-dvh flex">
      {/* 左侧表单区 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-bone-50 order-2 lg:order-1">
        <div className="w-full max-w-md">
          {/* 移动端返回按钮 */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 text-zinc-600 hover:text-forest-700 mb-8 transition-colors py-2 -ml-2 px-2 min-h-[44px]"
          >
            <ArrowLeft size={18} />
            <span>返回首页</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-forest-700 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">精</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">创建账号</h2>
            <p className="text-zinc-500 text-sm">
              已有账号？
              <Link to="/login" className="text-forest-700 font-medium hover:underline ml-1 py-2 px-1 inline-block min-h-[44px] align-middle">
                立即登录
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 用户名 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                用户名
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="请输入用户名"
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.username ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* 邮箱 */}
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
                  placeholder="请输入邮箱地址"
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* 手机号 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                手机号码
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="请输入手机号码"
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                设置密码
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请设置密码（至少 8 位）"
                  className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors w-11 h-11 flex items-center justify-center"
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                确认密码
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.confirmPassword ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors w-11 h-11 flex items-center justify-center"
                  aria-label={showConfirmPassword ? '隐藏确认密码' : '显示确认密码'}
                >
                  {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* 协议同意 */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer py-2 -ml-2 pl-2 min-h-[44px]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-forest-600 focus:ring-forest-500"
                />
                <span className="text-sm text-zinc-600 leading-relaxed">
                  我已阅读并同意
                  <a href="#" className="text-forest-700 hover:underline mx-0.5 py-1 px-0.5 inline-block">《用户协议》</a>
                  和
                  <a href="#" className="text-forest-700 hover:underline mx-0.5 py-1 px-0.5 inline-block">《隐私政策》</a>
                </span>
              </label>
              {errors.agree && (
                <p className="mt-1.5 text-sm text-red-500">{errors.agree}</p>
              )}
            </div>

            {/* 注册按钮 */}
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
                  注册中...
                </>
              ) : (
                '创建账号'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 右侧装饰区 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-forest-700 order-1 lg:order-2">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20modern%20living%20room%20with%20wooden%20furniture%2C%20scandinavian%20design%2C%20natural%20light%2C%20indoor%20plants%2C%20comfortable%20sofa%2C%20minimalist%20decor%2C%20warm%20lighting%2C%20high%20end%20interior%20design%2C%20professional%20photography&image_size=portrait_4_3"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-forest-800/90 to-forest-900/80" />

        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 text-white">
          <div className="ml-auto text-right">
            <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
              <span className="font-medium">返回首页</span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowLeft size={18} />
              </div>
            </Link>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-right">
            开启您的
            <br />
            <span className="text-amber-300">品质家居之旅</span>
          </h1>

          <p className="text-zinc-300 text-lg mb-12 max-w-md ml-auto leading-relaxed text-right">
            注册成为精美家居会员，立享新人大礼包、专属折扣和积分好礼。
          </p>

          <div className="space-y-4 ml-auto">
            {[
              '新用户专享 500 元礼包',
              '首单立减 100 元',
              '免费上门测量设计',
              '会员专属客服通道',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 justify-end">
                <span className="text-zinc-200">{item}</span>
                <CheckCircle size={20} className="text-amber-400 flex-shrink-0" weight="fill" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

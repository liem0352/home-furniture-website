import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  User,
  ArrowLeft,
  CheckCircle,
} from '@phosphor-icons/react'
import { useAuth } from '../store/AppContext.jsx'

/**
 * 登录页面
 * 用户登录表单，支持邮箱/手机号登录
 *
 * 移动端触摸优化说明：
 * - 所有可点击元素（链接、按钮、复选框）的触摸区域均不小于 44x44px
 * - 符合 WCAG 2.1 触摸目标尺寸标准，提升移动端用户体验
 * - 通过增加内边距（padding）和最小高度（min-h-[44px]）实现
 * - 使用负外边距（-ml-2, -mr-1）抵消内边距，保持视觉对齐
 */
export default function Login() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '登录 | 精美家居'
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

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
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱或手机号'
    }
    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少 6 位'
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
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)

    const userData = {
      id: Date.now(),
      username: formData.email.includes('@') ? formData.email.split('@')[0] : formData.email,
      email: formData.email.includes('@') ? formData.email : '',
      phone: !formData.email.includes('@') ? formData.email : '',
    }
    login(userData)
    navigate('/')
  }

  return (
    <div className="min-h-dvh flex">
      {/* 左侧装饰区 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-forest-700">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20modern%20bedroom%20interior%2C%20minimalist%20scandinavian%20design%2C%20oak%20wood%20furniture%2C%20large%20windows%2C%20natural%20light%2C%20green%20plants%2C%20cozy%20bed%2C%20warm%20ambient%20lighting%2C%20high%20end%20home%20decor%2C%20professional%20interior%20photography&image_size=portrait_4_3"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-800/90 to-forest-900/80" />

        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 text-white">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">返回首页</span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            欢迎回来
            <br />
            <span className="text-amber-300">继续您的品质生活</span>
          </h1>

          <p className="text-zinc-300 text-lg mb-12 max-w-md leading-relaxed">
            登录精美家居账号，探索更多精选家居好物，享受会员专属优惠与服务。
          </p>

          <div className="space-y-4">
            {[
              '会员专属折扣',
              '订单全程追踪',
              '专属客服服务',
              '积分兑换好礼',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-amber-400 flex-shrink-0" weight="fill" />
                <span className="text-zinc-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧表单区 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-bone-50">
        <div className="w-full max-w-md">
          {/* 移动端返回按钮 */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 text-zinc-600 hover:text-forest-700 mb-8 transition-colors py-2 -ml-2 px-2 min-h-[44px]"
          >
            <ArrowLeft size={18} />
            <span>返回首页</span>
          </Link>

          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-forest-700 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">精</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">登录账号</h2>
            <p className="text-zinc-500 text-sm">
              还没有账号？
              <Link to="/register" className="text-forest-700 font-medium hover:underline ml-1 py-2 px-1 inline-block min-h-[44px] align-middle">
                立即注册
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 邮箱/手机号 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                邮箱 / 手机号
              </label>
              <div className="relative">
                <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱或手机号"
                  className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-400' : 'border-zinc-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                密码
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                  className={`w-full pl-11 pr-12 py-3.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
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

            {/* 记住我 / 忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer py-2 -ml-2 pl-2 min-h-[44px]">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-zinc-300 text-forest-600 focus:ring-forest-500"
                />
                <span className="text-sm text-zinc-600">记住我</span>
              </label>
              <Link
                to="#"
                className="text-sm text-forest-700 font-medium hover:underline py-2 px-1 -mr-1 min-h-[44px]"
              >
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
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
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </button>
          </form>

          {/* 分隔线 */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-sm text-zinc-400">或使用以下方式登录</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* 第三方登录 */}
          <div className="grid grid-cols-3 gap-4">
            {['微信', 'QQ', '微博'].map((item) => (
              <button
                key={item}
                type="button"
                className="py-2.5 border border-zinc-200 rounded-lg text-sm text-zinc-600 hover:border-forest-300 hover:text-forest-700 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

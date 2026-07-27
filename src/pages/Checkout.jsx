import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Envelope,
  Building,
  CreditCard,
  Truck,
  ShieldCheck,
  Gift,
  CheckCircle,
} from '@phosphor-icons/react'
import { useCart, useOrders, useAuth, useToast } from '../store/AppContext.jsx'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 结算页面
 * 填写收货地址、选择支付方式、确认订单并提交
 */
export default function Checkout() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '结算 | 精美家居'
  }, [])

  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { user, isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.username || '',
    phone: user?.phone || '',
    email: user?.email || '',
    province: '',
    city: '',
    district: '',
    address: '',
    zipCode: '',
    company: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('wechat')
  const [errors, setErrors] = useState({})

  /**
   * 计算运费
   */
  const shipping = cartTotal >= 2000 ? 0 : 99

  /**
   * 计算优惠
   */
  const discount = cartTotal >= 5000 ? 500 : cartTotal >= 3000 ? 200 : 0

  /**
   * 计算最终价格
   */
  const finalTotal = Math.max(0, cartTotal + shipping - discount)

  /**
   * 处理输入变化
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /**
   * 表单验证
   */
  const validate = () => {
    const newErrors = {}
    if (!shippingInfo.name.trim()) {
      newErrors.name = '请输入收货人姓名'
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = '请输入手机号码'
    } else if (!/^1[3-9]\d{9}$/.test(shippingInfo.phone)) {
      newErrors.phone = '请输入有效的手机号'
    }
    if (!shippingInfo.province.trim()) {
      newErrors.province = '请输入省份'
    }
    if (!shippingInfo.city.trim()) {
      newErrors.city = '请输入城市'
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = '请输入详细地址'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 提交订单
   */
  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      showToast('请先登录', 'error')
      navigate('/login')
      return
    }

    if (!validate()) return

    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const orderData = {
      items: cart,
      totalAmount: cartTotal,
      shipping,
      discount,
      finalAmount: finalTotal,
      shippingInfo,
      paymentMethod,
    }

    placeOrder(orderData)
    clearCart()
    setIsSubmitting(false)

    navigate('/orders')
  }

  /**
   * 空购物车状态
   */
  if (cart.length === 0) {
    return (
      <div className="pt-30 pb-section bg-bone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-forest-50 flex items-center justify-center">
              <Truck size={40} className="text-forest-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">购物车是空的</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              快去挑选心仪的家具吧，品质生活从家开始
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
            >
              去购物
            </Link>
          </div>
        </div>
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="pt-30 pb-section bg-bone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="py-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-700 mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回购物车</span>
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900">
            确认订单
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧表单区 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 收货地址 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-forest-600" />
                收货地址
              </h2>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* 收货人 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      收货人 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        placeholder="请输入收货人姓名"
                        className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                          errors.name ? 'border-red-400' : 'border-zinc-200'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* 手机号 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      手机号码 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="请输入手机号码"
                        className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                          errors.phone ? 'border-red-400' : 'border-zinc-200'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* 省份 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      省份 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleInputChange}
                      placeholder="省份"
                      className={`w-full px-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                        errors.province ? 'border-red-400' : 'border-zinc-200'
                      }`}
                    />
                    {errors.province && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.province}</p>
                    )}
                  </div>

                  {/* 城市 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      城市 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      placeholder="城市"
                      className={`w-full px-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all ${
                        errors.city ? 'border-red-400' : 'border-zinc-200'
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  {/* 区县 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      区县
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={shippingInfo.district}
                      onChange={handleInputChange}
                      placeholder="区/县"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* 详细地址 */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    详细地址 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-4 text-zinc-400" />
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="请输入详细地址（街道、门牌号等）"
                      rows={3}
                      className={`w-full pl-11 pr-4 py-3 bg-zinc-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none ${
                        errors.address ? 'border-red-400' : 'border-zinc-200'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* 邮箱 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      电子邮箱
                    </label>
                    <div className="relative">
                      <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="请输入邮箱（选填）"
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* 公司名称 */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                      公司名称
                    </label>
                    <div className="relative">
                      <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        name="company"
                        value={shippingInfo.company}
                        onChange={handleInputChange}
                        placeholder="公司名称（选填）"
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* 支付方式 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-forest-600" />
                支付方式
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'wechat', name: '微信支付', desc: '推荐使用' },
                  { id: 'alipay', name: '支付宝', desc: '快捷支付' },
                  { id: 'bank', name: '银行卡', desc: '网银转账' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-5 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.id
                        ? 'border-forest-600 bg-forest-50'
                        : 'border-zinc-200 hover:border-forest-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-zinc-900">{method.name}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle size={20} className="text-forest-600" weight="fill" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{method.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 商品清单 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Truck size={20} className="text-forest-600" />
                商品清单
                <span className="text-sm font-normal text-zinc-500">共 {cartCount} 件</span>
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSpec}`}
                    className="flex gap-4 py-3 border-b border-zinc-100 last:border-b-0 last:pb-0"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-zinc-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-base font-medium text-zinc-900 hover:text-forest-700 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.selectedSpec && item.selectedSpec !== 'default' && (
                          <p className="text-sm text-zinc-500 mt-1">
                            规格：{item.selectedSpec}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500">x {item.quantity}</span>
                        <span className="text-base font-bold text-forest-700">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card shadow-soft p-6 sticky top-32">
              <h3 className="text-lg font-bold text-zinc-900 mb-6">订单摘要</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-zinc-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">商品小计</span>
                  <span className="text-zinc-900">¥{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">运费</span>
                  <span className={shipping === 0 ? 'text-forest-600' : 'text-zinc-900'}>
                    {shipping === 0 ? '免运费' : `¥${shipping}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">满减优惠</span>
                    <span className="text-amber-600">-¥{discount}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-base font-medium text-zinc-900">应付总额</span>
                <span className="text-2xl font-bold text-forest-700">
                  ¥{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* 提交订单按钮 */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full py-4 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft flex items-center justify-center gap-2 mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
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
                  '提交订单'
                )}
              </button>

              {/* 服务保障 */}
              <div className="pt-6 border-t border-zinc-100">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Truck, text: '免费配送' },
                    { icon: ShieldCheck, text: '正品保障' },
                    { icon: Gift, text: '无忧退换' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <item.icon size={20} className="text-forest-600 mb-1" />
                      <span className="text-xs text-zinc-500">{item.text}</span>
                    </div>
                  ))}
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

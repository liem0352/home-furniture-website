import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Gift,
} from '@phosphor-icons/react'
import { useCart } from '../store/AppContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 购物车页面
 * 展示购物车商品列表，支持数量调整、删除、结算等功能
 */
export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()
  const titleRef = useScrollReveal({ y: 30, duration: 0.6 })

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
   * 处理结算
   */
  const handleCheckout = () => {
    navigate('/checkout')
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
              <ShoppingBag size={40} className="text-forest-600" />
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
        <div ref={titleRef} className="py-8 opacity-0">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-700 mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>继续购物</span>
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900">
            购物车
            <span className="text-lg font-normal text-zinc-500 ml-3">
              共 {cartCount} 件商品
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧商品列表 */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSpec}`}
                className="bg-white rounded-card shadow-soft p-4 md:p-6 flex gap-4 md:gap-6"
              >
                {/* 商品图片 */}
                <Link
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-zinc-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* 商品信息 */}
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

                  <div className="flex items-center justify-between mt-4">
                    {/* 数量控制 */}
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity - 1)}
                        className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        aria-label="减少数量"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 md:w-12 text-center text-sm font-medium text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity + 1)}
                        className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        aria-label="增加数量"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* 价格和删除 */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-forest-700">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedSpec)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        aria-label="删除商品"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 清空购物车 */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
              >
                清空购物车
              </button>
            </div>
          </div>

          {/* 右侧结算栏 */}
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

              {/* 结算按钮 */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft flex items-center justify-center gap-2 mb-4"
              >
                <ShoppingCart size={18} />
                去结算
              </button>

              {/* 继续购物 */}
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="w-full py-3 bg-white text-forest-700 font-medium rounded-button border border-forest-200 hover:bg-forest-50 transition-all"
              >
                继续购物
              </button>

              {/* 服务保障 */}
              <div className="mt-6 pt-6 border-t border-zinc-100">
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

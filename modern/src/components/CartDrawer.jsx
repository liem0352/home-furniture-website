import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, ShoppingBag, Trash, Minus, Plus, ArrowRight } from '@phosphor-icons/react'
import { useCart } from '../store/AppContext.jsx'
import { gsap } from 'gsap'

/**
 * 购物车侧边抽屉组件
 * 点击导航栏购物车图标时滑出，展示购物车商品摘要
 */
export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()
  const drawerRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const navigate = useNavigate()

  /**
   * 打开/关闭动画
   */
  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      })
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      })
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      )
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        pointerEvents: 'none',
      })
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
      })
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /**
   * 处理结算按钮点击
   */
  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  /**
   * 处理查看购物车按钮点击
   */
  const handleViewCart = () => {
    onClose()
    navigate('/cart')
  }

  return (
    <>
      {/* 遮罩层 */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity"
      />

      {/* 抽屉 */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transform translate-x-full flex flex-col"
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
              <ShoppingBag size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900">购物车</h3>
              <p className="text-sm text-zinc-500">{cartCount} 件商品</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors text-zinc-500 hover:text-zinc-700"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* 内容区 */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-zinc-400" />
              </div>
              <h4 className="text-lg font-medium text-zinc-800 mb-2">购物车是空的</h4>
              <p className="text-zinc-500 text-sm mb-6">快去挑选心仪的家具吧</p>
              <button
                onClick={handleViewCart}
                className="px-6 py-2.5 bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors text-sm font-medium"
              >
                去逛逛
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors group"
                >
                  {/* 图片 */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={onClose}
                      className="text-sm font-medium text-zinc-800 hover:text-forest-700 transition-colors line-clamp-2 mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-forest-700 font-semibold text-sm mb-2">
                      ¥{item.price.toLocaleString()}
                    </p>

                    {/* 数量控制 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 rounded-md border border-zinc-200 flex items-center justify-center hover:bg-white hover:border-forest-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-zinc-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity + 1)}
                          className="w-6 h-6 rounded-md border border-zinc-200 flex items-center justify-center hover:bg-white hover:border-forest-300 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="删除"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部结算区 */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-100 p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-600">商品合计</span>
              <span className="text-xl font-bold text-zinc-900">
                ¥{cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-forest-700 text-white font-medium rounded-lg hover:bg-forest-800 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-soft hover:shadow-medium"
              >
                去结算
                <ArrowRight size={16} />
              </button>
              <button
                onClick={handleViewCart}
                className="w-full py-3 border border-zinc-200 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition-colors text-sm"
              >
                查看购物车
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

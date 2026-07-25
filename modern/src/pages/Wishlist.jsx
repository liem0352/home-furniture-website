import { Link } from 'react-router-dom'
import {
  Heart,
  ArrowLeft,
  ShoppingBag,
  Trash,
} from '@phosphor-icons/react'
import { useWishlist, useCart } from '../store/AppContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import ProductCard from '../components/ProductCard.jsx'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 收藏页面
 * 展示用户收藏的商品列表，支持移除和加入购物车
 */
export default function Wishlist() {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist()
  const { addToCart } = useCart()
  const titleRef = useScrollReveal({ y: 30, duration: 0.6 })

  /**
   * 处理全部加入购物车
   */
  const handleAddAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, 1, 'default')
    })
  }

  /**
   * 空收藏状态
   */
  if (wishlist.length === 0) {
    return (
      <div className="pt-30 pb-section bg-bone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={40} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">收藏夹是空的</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              快去发现心仪的好物，把它们加入收藏吧
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
            >
              去逛逛
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-zinc-900">
              我的收藏
              <span className="text-lg font-normal text-zinc-500 ml-3">
                共 {wishlistCount} 件商品
              </span>
            </h1>
            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-white text-sm font-medium rounded-button hover:bg-forest-800 transition-all"
              >
                <ShoppingBag size={16} />
                全部加入购物车
              </button>
            )}
          </div>
        </div>

        {/* 收藏商品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="relative group">
              <ProductCard product={item} />
              {/* 移除按钮 */}
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-zinc-400 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="移除收藏"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

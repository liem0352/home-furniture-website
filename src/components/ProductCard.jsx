import { Link } from 'react-router-dom'
import { ArrowRight, Heart, ShoppingCart, Columns, Eye } from '@phosphor-icons/react'
import { useState } from 'react'
import { useCart, useWishlist, useCompare } from '../store/AppContext.jsx'
import QuickView from './QuickView.jsx'

/**
 * 产品卡片组件
 * 展示产品图片、名称、价格和操作按钮
 * @param {Object} product - 产品数据对象
 * @param {boolean} showQuickView - 是否显示快速查看按钮
 */
export default function ProductCard({ product, showQuickView = true }) {
  const { id, name, price, originalPrice, image, isHot, isNew, category } = product
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { isInCompare, addToCompare, removeFromCompare } = useCompare()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discount = originalPrice && originalPrice > price && originalPrice > 0
    ? Math.round((1 - price / originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1, 'default')
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleToggleCompare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCompare(id)) {
      removeFromCompare(id)
    } else {
      addToCompare(product)
    }
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsQuickViewOpen(true)
  }

  return (
    <div
      className="group bg-white rounded-card overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 ease-expo hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 产品图片区 */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50">
        <Link to={`/product/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 ease-expo"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            loading="lazy"
          />
        </Link>

        {/* 图片遮罩层 */}
        <div
          className="absolute inset-0 bg-forest-900/0 transition-colors duration-500"
          style={{ backgroundColor: isHovered ? 'rgba(26, 52, 43, 0.08)' : 'transparent' }}
        />

        {/* 标签 */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isHot && (
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-button shadow-soft">
              热销
            </span>
          )}
          {isNew && (
            <span className="px-3 py-1 bg-forest-600 text-white text-xs font-medium rounded-button shadow-soft">
              新品
            </span>
          )}
        </div>

        {/* 收藏和对比按钮 */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ease-expo
              ${isInWishlist(id)
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-zinc-500 hover:bg-white hover:text-red-500 shadow-soft'
              }
            `}
            aria-label={isInWishlist(id) ? '取消收藏' : '添加收藏'}
          >
            <Heart size={16} weight={isInWishlist(id) ? 'fill' : 'regular'} />
          </button>
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ease-expo
              ${isInCompare(id)
                ? 'bg-forest-600 text-white'
                : 'bg-white/90 text-zinc-500 hover:bg-white hover:text-forest-600 shadow-soft'
              }
            `}
            aria-label={isInCompare(id) ? '取消对比' : '添加对比'}
          >
            <Columns size={16} weight={isInCompare(id) ? 'fill' : 'regular'} />
          </button>
        </div>

        {/* 折扣标签 */}
        {discount > 0 && (
          <div className="absolute top-24 right-3 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-medium">
            -{discount}%
          </div>
        )}

        {/* 悬浮操作层 */}
        <div
          className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ease-expo"
          style={{ transform: isHovered ? 'translateY(0)' : 'translateY(100%)', opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex gap-2">
            {showQuickView && (
              <button
                type="button"
                onClick={handleQuickView}
                aria-label="快速预览"
                className="p-2.5 bg-white text-zinc-700 rounded-button hover:bg-zinc-100 transition-all duration-200 shadow-medium hover:shadow-large active:scale-[0.95]"
              >
                <Eye size={16} />
              </button>
            )}
            <Link
              to={`/product/${id}`}
              className="flex-1 py-2.5 bg-white text-zinc-900 text-sm font-medium rounded-button hover:bg-zinc-100 transition-all duration-200 text-center shadow-medium hover:shadow-large active:scale-[0.98]"
            >
              查看详情
            </Link>
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label="加入购物车"
              className="p-2.5 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-all duration-200 shadow-medium hover:shadow-large active:scale-[0.95]"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 产品信息区 */}
      <div className="p-4">
        <div className="text-xs text-zinc-500 mb-1.5 capitalize font-medium">{category}</div>
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-zinc-900 mb-2 line-clamp-1 group-hover:text-forest-700 transition-colors duration-300">
            {name}
          </h3>
        </Link>

        {/* 价格 */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-forest-700">¥{price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-zinc-400 line-through">
              ¥{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="h-1 bg-gradient-to-r from-forest-500 via-amber-400 to-forest-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo" />

      {/* 快速预览弹窗 */}
      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  )
}

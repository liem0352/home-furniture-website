import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  ShoppingCart,
  Heart,
  Columns,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useCart, useWishlist, useCompare } from '../store/AppContext.jsx'
import gsap from 'gsap'

/**
 * 商品快速预览弹窗组件
 * 点击快速预览时显示商品的基本信息和快速购买选项
 */
export default function QuickView({ product, isOpen, onClose }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToCompare, isInCompare } = useCompare()
  const [quantity, setQuantity] = useState(1)
  const [selectedSpecs, setSelectedSpecs] = useState({})
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  /**
   * 获取规格字符串，用于加入购物车
   */
  const getSpecString = () => {
    if (!product?.specs || product.specs.length === 0) return 'default'
    return product.specs.map(s => selectedSpecs[s.name] || s.options[0]).join(' / ')
  }

  /**
   * 处理规格选择
   */
  const handleSpecSelect = (specName, option) => {
    setSelectedSpecs(prev => ({ ...prev, [specName]: option }))
  }

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden'

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        )
      }
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
      setSelectedSpec(product?.specs?.[0] || '默认')
    }
  }, [product, isOpen])

  /**
   * 处理加入购物车
   */
  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity, getSpecString())
    onClose()
  }

  /**
   * 处理收藏切换
   */
  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    if (!product) return
    toggleWishlist(product)
  }

  /**
   * 处理对比切换
   */
  const handleToggleCompare = (e) => {
    e.stopPropagation()
    if (!product) return
    if (!isInCompare(product.id)) {
      addToCompare(product)
    }
  }

  /**
   * 处理背景点击关闭
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !product) return null

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-white transition-all shadow-soft"
          aria-label="关闭"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* 左侧图片 */}
          <div className="relative aspect-square md:aspect-auto bg-zinc-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* 折扣标签 */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full">
                -{discount}%
              </div>
            )}
            {/* 操作按钮 */}
            <div className="absolute top-4 right-14 flex flex-col gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-zinc-500 hover:bg-white hover:text-red-500'
                }`}
                aria-label={isInWishlist(product.id) ? '取消收藏' : '添加收藏'}
              >
                <Heart size={18} weight={isInWishlist(product.id) ? 'fill' : 'regular'} />
              </button>
              <button
                onClick={handleToggleCompare}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isInCompare(product.id)
                    ? 'bg-forest-600 text-white'
                    : 'bg-white/90 text-zinc-500 hover:bg-white hover:text-forest-600'
                }`}
                aria-label={isInCompare(product.id) ? '取消对比' : '添加对比'}
              >
                <Columns size={18} weight={isInCompare(product.id) ? 'fill' : 'regular'} />
              </button>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* 分类和评分 */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-forest-600 font-medium">
                {product.categoryName || '家具'}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400" weight="fill" />
                <span className="text-sm text-zinc-600">{product.rating || 4.8}</span>
                <span className="text-sm text-zinc-400">({product.reviewCount || 128}条评价)</span>
              </div>
            </div>

            {/* 商品名称 */}
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
              {product.name}
            </h2>

            {/* 简短描述 */}
            <p className="text-zinc-600 text-sm mb-5 line-clamp-2">
              {product.description || '精选优质材料，匠心打造，为您的家增添温馨与格调。'}
            </p>

            {/* 价格 */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-amber-600">
                ¥{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-zinc-400 line-through">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* 规格选择 */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-6 space-y-4">
                {product.specs.map((spec) => (
                  <div key={spec.name}>
                    <div className="text-sm font-medium text-zinc-900 mb-2">{spec.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {spec.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSpecSelect(spec.name, option)}
                          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                            (selectedSpecs[spec.name] || spec.options[0]) === option
                              ? 'border-forest-600 bg-forest-50 text-forest-700 font-medium'
                              : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 数量选择 */}
            <div className="mb-6">
              <div className="text-sm font-medium text-zinc-900 mb-3">购买数量</div>
              <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="w-14 h-10 flex items-center justify-center font-medium text-zinc-900 border-x border-zinc-200">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="ml-3 text-sm text-zinc-500">库存充足</span>
            </div>

            {/* 服务保障 */}
            <div className="flex flex-wrap gap-4 mb-6 py-4 border-y border-zinc-100">
              <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                <Truck size={16} className="text-forest-600" />
                全国包邮
              </div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                <ShieldCheck size={16} className="text-forest-600" />
                五年质保
              </div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                <ArrowCounterClockwise size={16} className="text-forest-600" />
                七天无理由
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-forest-700 text-white rounded-full font-medium hover:bg-forest-800 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                加入购物车
              </button>
              <Link
                to={`/product/${product.id}`}
                className="flex-1 py-3 border border-forest-700 text-forest-700 rounded-full font-medium hover:bg-forest-50 transition-all duration-300 active:scale-95 flex items-center justify-center"
                onClick={onClose}
              >
                查看详情
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

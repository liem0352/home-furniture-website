import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  CaretLeft,
  Star,
  Truck,
  ShieldCheck,
  ArrowCounterClockwise,
  Check,
  ThumbsUp,
} from '@phosphor-icons/react'
import { getProductById, getRelatedProducts, productCategories } from '../data/products.js'
import { getReviewStats, getProductReviews } from '../data/reviews.js'
import { useCart, useWishlist, useRecentlyViewed } from '../store/AppContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import ProductCard from '../components/ProductCard.jsx'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 产品详情页
 * 展示产品详细信息、规格选择、数量调整、加入购物车等功能
 */
export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed()
  const relatedRef = useScrollReveal({ y: 30, duration: 0.6 })
  const recentlyRef = useScrollReveal({ y: 30, duration: 0.6, delay: 0.1 })

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSpecs, setSelectedSpecs] = useState({})
  const [activeTab, setActiveTab] = useState('description')
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewFilter, setReviewFilter] = useState('all')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setSelectedImage(0)
    setQuantity(1)
    setSelectedSpecs({})
    setActiveTab('description')
    setReviewPage(1)
    setReviewFilter('all')
  }, [id])

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed])

  if (!product) {
    return (
      <div className="pt-30 min-h-[60dvh] flex flex-col items-center justify-center px-6 text-center bg-bone-50">
        <div className="text-5xl font-bold text-forest-700 mb-4">产品不存在</div>
        <p className="text-zinc-600 mb-8">您查看的产品可能已下架或不存在。</p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-colors"
        >
          返回产品列表
        </Link>
      </div>
    )
  }

  const categoryName = productCategories.find(c => c.id === product.category)?.name || ''
  const relatedProducts = getRelatedProducts(product.id, product.category, 4)
  const filteredRecentlyViewed = recentlyViewed.filter(item => item.id !== product.id).slice(0, 4)
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const reviewStats = getReviewStats(product.id)
  const reviewData = getProductReviews(product.id, reviewPage, 5)

  /**
   * 处理规格选择
   */
  const handleSpecSelect = (specName, option) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [specName]: option,
    }))
  }

  /**
   * 获取规格描述字符串
   */
  const getSpecString = () => {
    if (!product.specs) return 'default'
    return product.specs.map(s => selectedSpecs[s.name] || s.options[0]).join(' / ')
  }

  /**
   * 处理加入购物车
   */
  const handleAddToCart = () => {
    addToCart(product, quantity, getSpecString())
  }

  /**
   * 处理立即购买
   */
  const handleBuyNow = () => {
    addToCart(product, quantity, getSpecString())
    navigate('/cart')
  }

  const services = [
    { icon: Truck, text: '免费配送上门' },
    { icon: ShieldCheck, text: '五年品质保障' },
    { icon: ArrowCounterClockwise, text: '七天无理由退换' },
  ]

  const tabs = [
    { id: 'description', label: '商品描述' },
    { id: 'details', label: '规格参数' },
    { id: 'reviews', label: `用户评价 (${reviewStats.total})` },
  ]

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      {/* 沉浸式顶部背景 */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-30"
          style={{ backgroundImage: `url(${product.images?.[0] || product.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-forest-900/20 to-bone-50" />
      </div>

      {/* 面包屑导航 */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 pb-4 relative z-10">
        <div className="flex items-center gap-2 text-sm text-white">
          <Link to="/" className="hover:text-amber-300 transition-colors">首页</Link>
          <CaretLeft size={14} className="rotate-180" />
          <Link to="/products" className="hover:text-amber-300 transition-colors">产品中心</Link>
          <CaretLeft size={14} className="rotate-180" />
          <Link to={`/products?category=${product.category}`} className="hover:text-amber-300 transition-colors">{categoryName}</Link>
          <CaretLeft size={14} className="rotate-180" />
          <span className="text-white font-medium">{product.name}</span>
        </div>
      </div>

      {/* 产品主信息区 */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧图片区 */}
          <div className="space-y-4">
            {/* 主图 */}
            <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-zinc-100 shadow-medium">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 right-4 bg-forest-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  新品
                </div>
              )}
            </div>

            {/* 缩略图列表 */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`
                      flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                      ${selectedImage === index
                        ? 'border-forest-700 ring-2 ring-forest-200'
                        : 'border-transparent hover:border-zinc-300'
                      }
                    `}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右侧信息区 */}
          <div className="flex flex-col">
            {/* 标签 */}
            <div className="flex items-center gap-2 mb-3">
              {product.isHot && (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded">
                  热销
                </span>
              )}
              {product.isNew && (
                <span className="px-2 py-0.5 bg-forest-50 text-forest-700 text-xs font-medium rounded">
                  新品
                </span>
              )}
              <span className="text-zinc-400 text-sm">
                已售 {product.sales || 0} 件
              </span>
            </div>

            {/* 标题 */}
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
              {product.name}
            </h1>

            {/* 简介 */}
            <p className="text-zinc-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 价格 */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-zinc-200">
              <span className="text-3xl md:text-4xl font-bold text-forest-700">
                ¥{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-zinc-400 line-through">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-sm font-medium rounded">
                  省 ¥{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* 规格选择 */}
            {product.specs && product.specs.map((spec) => (
              <div key={spec.name} className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-700">{spec.name}</span>
                  <span className="text-sm text-zinc-500">
                    已选：{selectedSpecs[spec.name] || spec.options[0]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {spec.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSpecSelect(spec.name, option)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${(selectedSpecs[spec.name] || spec.options[0]) === option
                          ? 'bg-forest-700 text-white shadow-soft'
                          : 'bg-white text-zinc-700 border border-zinc-200 hover:border-forest-400 hover:text-forest-700'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* 数量选择 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-zinc-700">数量</span>
                <span className="text-sm text-zinc-500">
                  库存 {product.stock || 999} 件
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                    aria-label="减少数量"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value)
                      if (!isNaN(val) && val > 0) {
                        setQuantity(Math.min(val, product.stock || 999))
                      }
                    }}
                    className="w-14 h-10 text-center border-x border-zinc-200 text-zinc-900 font-medium focus:outline-none"
                    min="1"
                    max={product.stock || 999}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(q + 1, product.stock || 999))}
                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                    aria-label="增加数量"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-white text-forest-700 font-medium rounded-button border-2 border-forest-700 hover:bg-forest-50 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                加入购物车
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
              >
                立即购买
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`
                  w-12 h-12 rounded-button flex items-center justify-center transition-all border-2
                  ${isInWishlist(product.id)
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-zinc-200 text-zinc-500 hover:border-red-300 hover:text-red-500'
                  }
                `}
                aria-label={isInWishlist(product.id) ? '取消收藏' : '添加收藏'}
              >
                <Heart size={20} weight={isInWishlist(product.id) ? 'fill' : 'regular'} />
              </button>
            </div>

            {/* 服务保障 */}
            <div className="flex flex-wrap gap-6 py-4 border-t border-b border-zinc-200">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-zinc-600">
                  <service.icon size={18} className="text-forest-600" />
                  <span>{service.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 详情标签页 */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* 标签头 */}
        <div className="flex border-b border-zinc-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-4 text-sm font-medium transition-all relative
                ${activeTab === tab.id
                  ? 'text-forest-700'
                  : 'text-zinc-500 hover:text-zinc-700'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-700" />
              )}
            </button>
          ))}
        </div>

        {/* 标签内容 */}
        <div className="min-h-[300px]">
          {activeTab === 'description' && (
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed text-base">
                {product.longDescription || product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-soft">
                      <Check size={18} className="text-forest-600 flex-shrink-0" weight="fill" />
                      <span className="text-sm text-zinc-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="bg-white rounded-card shadow-soft overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.details && product.details.map((detail, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-bone-50' : 'bg-white'}>
                      <td className="py-3 px-6 text-sm text-zinc-500 w-1/3 border-r border-zinc-100">
                        {detail.split('：')[0]}
                      </td>
                      <td className="py-3 px-6 text-sm text-zinc-700">
                        {detail.split('：')[1] || detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* 评价概览 */}
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* 综合评分 */}
                  <div className="text-center md:border-r md:border-zinc-100">
                    <div className="text-5xl font-bold text-forest-700 mb-2">
                      {reviewStats.averageRating || '5.0'}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          weight="fill"
                          className={star <= Math.round(reviewStats.averageRating) ? 'text-amber-400' : 'text-zinc-200'}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {reviewStats.total} 条评价
                    </div>
                    <div className="text-sm text-amber-600 mt-1">
                      好评率 {reviewStats.goodRate || 100}%
                    </div>
                  </div>

                  {/* 评分分布 */}
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviewStats.ratingDistribution[star - 1] || 0
                        const percent = reviewStats.total > 0 ? (count / reviewStats.total) * 100 : 0
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm text-zinc-600 w-4">{star}</span>
                              <Star size={14} weight="fill" className="text-amber-400" />
                            </div>
                            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <div className="text-sm text-zinc-500 w-10 text-right">
                              {count}条
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 筛选标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'all', label: '全部' },
                  { id: 'good', label: '好评' },
                  { id: 'mid', label: '中评' },
                  { id: 'bad', label: '差评' },
                  { id: 'pic', label: '有图' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setReviewFilter(filter.id)
                      setReviewPage(1)
                    }}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                      reviewFilter === filter.id
                        ? 'bg-forest-700 text-white'
                        : 'bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* 评价列表 */}
              {reviewData.list.length > 0 ? (
                <div className="space-y-6">
                  {reviewData.list.map((review) => (
                    <div key={review.id} className="bg-white rounded-card shadow-soft p-6">
                      <div className="flex items-start gap-4">
                        {/* 用户头像 */}
                        <img
                          src={review.avatar}
                          alt={review.username}
                          className="w-12 h-12 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          {/* 用户信息和评分 */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-zinc-900">{review.username}</span>
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    weight="fill"
                                    className={star <= review.rating ? 'text-amber-400' : 'text-zinc-200'}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-zinc-400">{review.createTime}</span>
                          </div>

                          {/* 规格信息 */}
                          {review.specs && (
                            <div className="text-xs text-zinc-400 mb-3">
                              规格：{review.specs}
                            </div>
                          )}

                          {/* 评价内容 */}
                          <p className="text-zinc-700 leading-relaxed mb-4">
                            {review.content}
                          </p>

                          {/* 图片 */}
                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                              {review.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`评价图片 ${idx + 1}`}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                              ))}
                            </div>
                          )}

                          {/* 有用按钮 */}
                          <div className="flex items-center gap-4 pt-3 border-t border-zinc-100">
                            <button className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-forest-600 transition-colors">
                              <ThumbsUp size={14} />
                              有用 ({review.useful})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-card shadow-soft">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
                    <Star size={28} className="text-zinc-400" />
                  </div>
                  <p className="text-zinc-500 mb-4">暂无该类型评价</p>
                </div>
              )}

              {/* 分页 */}
              {reviewData.total > 5 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setReviewPage(p => Math.max(1, p - 1))}
                    disabled={reviewPage === 1}
                    className="px-4 py-2 rounded-lg text-sm text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    上一页
                  </button>
                  {Array.from({ length: Math.ceil(reviewData.total / 5) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setReviewPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        reviewPage === page
                          ? 'bg-forest-700 text-white'
                          : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setReviewPage(p => Math.min(Math.ceil(reviewData.total / 5), p + 1))}
                    disabled={reviewPage === Math.ceil(reviewData.total / 5)}
                    className="px-4 py-2 rounded-lg text-sm text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    下一页
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 最近浏览 */}
      {filteredRecentlyViewed.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div ref={recentlyRef} className="opacity-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-2 block">
                  浏览记录
                </span>
                <h2 className="text-2xl font-bold text-zinc-900">
                  最近浏览
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1"
              >
                查看更多
                <CaretLeft size={16} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredRecentlyViewed.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 相关产品推荐 */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div ref={relatedRef} className="opacity-0">
            <div className="text-center mb-10">
              <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-2 block">
                相关推荐
              </span>
              <h2 className="text-3xl font-bold text-zinc-900">
                猜你喜欢
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  )
}

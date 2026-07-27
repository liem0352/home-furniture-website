import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Columns,
  Info,
  Ruler,
  Package,
  Leaf,
  Star,
  Truck,
  ShieldCheck,
} from '@phosphor-icons/react'
import { useCompare, useCart, useWishlist } from '../store/AppContext.jsx'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

/**
 * 产品对比页面
 * 对比多个产品的参数、价格、功能等
 */
export default function Compare() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '商品对比 | 精美家居'
  }, [])

  const { compare, removeFromCompare, clearCompare } = useCompare()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const pageRef = useScrollReveal()
  const tableRef = useStaggerReveal({ y: 20, stagger: 0.08, duration: 0.5 })

  /**
   * 处理加入购物车
   */
  const handleAddToCart = (product) => {
    addToCart(product, 1, 'default')
  }

  /**
   * 处理切换收藏
   */
  const handleToggleWishlist = (product) => {
    toggleWishlist(product)
  }

  /**
   * 对比属性列表
   */
  const compareAttributes = [
    { key: 'price', label: '价格', icon: Info, format: (v) => `¥${v?.toLocaleString()}` },
    { key: 'category', label: '分类', icon: Package, format: (v) => {
      const categories = {
        living: '客厅家具',
        bedroom: '卧室家具',
        dining: '餐厅家具',
        storage: '收纳家具',
        decor: '家居饰品',
      }
      return categories[v] || v
    }},
    { key: 'material', label: '材质', icon: Leaf, format: (v) => {
      const materials = {
        'solid-wood': '实木',
        'panel': '板式',
        'fabric': '布艺',
        'metal': '金属',
        'stone': '岩板/石材',
        'glass': '玻璃',
      }
      return materials[v] || v
    }},
    { key: 'style', label: '风格', icon: Star, format: (v) => {
      const styles = {
        'nordic': '北欧风格',
        'modern': '现代简约',
        'luxury': '轻奢风格',
        'japanese': '日式风格',
        'chinese': '新中式',
        'industrial': '工业风',
      }
      return styles[v] || v
    }},
    { key: 'dimensions', label: '尺寸', icon: Ruler, format: (v) => v || '-' },
    { key: 'weight', label: '重量', icon: Package, format: (v) => v ? `${v}kg` : '-' },
    { key: 'warranty', label: '质保', icon: ShieldCheck, format: (v) => v || '3年质保' },
    { key: 'delivery', label: '配送', icon: Truck, format: (v) => v || '全国包邮' },
  ]

  return (
    <div ref={pageRef} className="min-h-screen bg-bone-50">
      {/* 沉浸式顶部背景 */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-bone-50 via-transparent to-transparent" />
      </div>

      {/* 页面头部 */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-8">
        <div className="bg-white rounded-card shadow-medium p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              返回商品列表
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">商品对比</h1>
              <p className="text-zinc-500 text-sm">
                对比 {compare.length} 件商品的详细参数
              </p>
            </div>
            {compare.length > 0 && (
              <button
                onClick={clearCompare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 rounded-lg hover:bg-zinc-200 transition-colors text-sm"
              >
                <X size={16} />
                清空对比
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {compare.length === 0 ? (
          /* 空状态 */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Columns size={40} className="text-forest-600" weight="duotone" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">暂无对比商品</h2>
            <p className="text-zinc-600 mb-8 max-w-md mx-auto">
              您还没有添加任何商品到对比列表，去逛逛添加心仪的商品吧
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-700 text-white font-medium rounded-xl hover:bg-forest-800 transition-colors"
            >
              去逛逛
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        ) : (
          /* 对比表格 */
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              {/* 商品信息行 */}
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-4 px-4 font-medium text-zinc-600 text-sm w-32 sticky left-0 bg-bone-50 z-10">
                    商品
                  </th>
                  {compare.map((product) => (
                    <th key={product.id} className="py-4 px-4 text-center align-top w-56">
                      <div className="relative group">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 z-10 w-7 h-7 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 hover:border-red-200 transition-all shadow-sm opacity-0 group-hover:opacity-100"
                          aria-label="移除对比"
                        >
                          <X size={14} />
                        </button>
                        <Link to={`/product/${product.id}`} className="block">
                          <div className="aspect-square rounded-xl overflow-hidden bg-white mb-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-medium text-zinc-900 text-sm mb-2 line-clamp-2 h-10">
                            {product.name}
                          </h3>
                          <div className="text-amber-600 font-semibold text-lg">
                            ¥{product.price?.toLocaleString()}
                          </div>
                        </Link>
                        {/* 操作按钮 */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 py-2 bg-forest-700 text-white text-xs rounded-lg hover:bg-forest-800 transition-colors flex items-center justify-center gap-1"
                          >
                            <ShoppingCart size={14} />
                            加入购物车
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(product)}
                            className={`w-10 h-10 rounded-lg border transition-colors flex items-center justify-center ${
                              isInWishlist(product.id)
                                ? 'bg-red-50 border-red-200 text-red-500'
                                : 'bg-white border-zinc-200 text-zinc-500 hover:border-amber-300 hover:text-amber-500'
                            }`}
                            aria-label="收藏"
                          >
                            <Heart size={16} weight={isInWishlist(product.id) ? 'fill' : 'regular'} />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* 添加更多商品占位 */}
                  {compare.length < 4 && (
                    <th className="py-4 px-4 text-center align-top w-56">
                      <Link
                        to="/products"
                        className="block aspect-square rounded-xl border-2 border-dashed border-zinc-300 bg-white/50 flex flex-col items-center justify-center text-zinc-500 hover:border-forest-400 hover:text-forest-600 hover:bg-forest-50/50 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-2">
                          <span className="text-xl">+</span>
                        </div>
                        <span className="text-sm">添加商品</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              {/* 属性对比行 */}
              <tbody>
                {compareAttributes.map((attr, index) => (
                  <tr
                    key={attr.key}
                    className={`border-b border-zinc-100 ${
                      index % 2 === 0 ? 'bg-white/30' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-sm text-zinc-600 sticky left-0 bg-bone-50 z-10">
                      <div className="flex items-center gap-2">
                        <attr.icon size={16} className="text-forest-600" />
                        {attr.label}
                      </div>
                    </td>
                    {compare.map((product) => (
                      <td key={product.id} className="py-4 px-4 text-center text-sm text-zinc-800">
                        {attr.format(product[attr.key])}
                      </td>
                    ))}
                    {compare.length < 4 && (
                      <td className="py-4 px-4 text-center text-zinc-300">
                        -
                      </td>
                    )}
                  </tr>
                ))}
                {/* 描述行 */}
                <tr className="border-b border-zinc-100">
                  <td className="py-4 px-4 text-sm text-zinc-600 sticky left-0 bg-bone-50 z-10 align-top">
                    <div className="flex items-center gap-2">
                      <Info size={16} className="text-forest-600" />
                      简介
                    </div>
                  </td>
                  {compare.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-sm text-zinc-700 align-top">
                      <p className="text-left line-clamp-4">
                        {product.description || '-'}
                      </p>
                    </td>
                  ))}
                  {compare.length < 4 && (
                    <td className="py-4 px-4 text-center text-zinc-300">
                      -
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

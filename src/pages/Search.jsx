import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  MagnifyingGlass,
  SlidersHorizontal,
  SquaresFour,
  List,
  ArrowsVertical,
  X,
  TrendUp,
} from '@phosphor-icons/react'
import ProductCard from '../components/ProductCard.jsx'
import BackToTop from '../components/BackToTop.jsx'
import { products, productCategories } from '../data/products.js'

/**
 * 搜索结果页面
 * 展示搜索结果，支持分类筛选和排序
 */
export default function Search() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '搜索结果 | 精美家居'
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState('grid')

  /**
   * 热门搜索关键词
   */
  const hotKeywords = ['实木床', '沙发', '餐桌', '衣柜', '书桌', '椅子']

  /**
   * 搜索历史（模拟）
   */
  const searchHistory = ['北欧风', '简约', '实木', '卧室']

  /**
   * 筛选产品
   */
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // 搜索筛选
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    // 分类筛选
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // 排序
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'hot':
        result.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0))
        break
      case 'sales':
        result.sort((a, b) => (b.sales || 0) - (a.sales || 0))
        break
      default:
        break
    }

    return result
  }, [searchQuery, activeCategory, sortBy])

  /**
   * 处理搜索提交
   */
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery })
  }

  /**
   * 处理关键词点击
   */
  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword)
    setSearchParams({ q: keyword })
  }

  /**
   * 清除搜索
   */
  const clearSearch = () => {
    setSearchQuery('')
    setSearchParams({})
  }

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  return (
    <div className="pt-30 pb-section bg-bone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面头部 */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">搜索</h1>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <MagnifyingGlass size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索家具、品牌、风格..."
              className="w-full pl-14 pr-24 py-4 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all text-lg shadow-soft"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="清除搜索"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors font-medium"
            >
              搜索
            </button>
          </form>
        </div>

        {/* 无搜索词时显示热门搜索和历史 */}
        {!searchQuery && (
          <div className="space-y-8 mb-8">
            {/* 热门搜索 */}
            <div className="bg-white rounded-card shadow-soft p-6">
              <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <TrendUp size={20} className="text-amber-500" />
                热门搜索
              </h2>
              <div className="flex flex-wrap gap-3">
                {hotKeywords.map((keyword, index) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      index < 3
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {index < 3 && <span className="mr-1 font-bold">{index + 1}</span>}
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* 搜索历史 */}
            {searchHistory.length > 0 && (
              <div className="bg-white rounded-card shadow-soft p-6">
                <h2 className="text-lg font-bold text-zinc-900 mb-4">搜索历史</h2>
                <div className="flex flex-wrap gap-3">
                  {searchHistory.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordClick(keyword)}
                      className="px-4 py-2 bg-zinc-50 text-zinc-600 rounded-full text-sm hover:bg-forest-50 hover:text-forest-700 transition-all"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 搜索结果 */}
        {searchQuery && (
          <>
            {/* 结果统计 */}
            <div className="mb-6">
              <p className="text-zinc-600">
                搜索 "<span className="text-forest-700 font-medium">{searchQuery}</span>"
                共找到 <span className="text-forest-700 font-bold">{filteredProducts.length}</span> 件商品
              </p>
            </div>

            {/* 筛选栏 */}
            <div className="bg-white rounded-card shadow-soft p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* 分类筛选 */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {productCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                          activeCategory === cat.id
                            ? 'bg-forest-700 text-white'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 排序和视图切换 */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ArrowsVertical size={16} className="text-zinc-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    >
                      <option value="default">默认排序</option>
                      <option value="sales">销量优先</option>
                      <option value="price-asc">价格从低到高</option>
                      <option value="price-desc">价格从高到低</option>
                      <option value="newest">最新上架</option>
                      <option value="hot">最受欢迎</option>
                    </select>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white text-forest-700 shadow-sm'
                          : 'text-zinc-500 hover:text-zinc-700'
                      }`}
                      aria-label="网格视图"
                    >
                      <SquaresFour size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white text-forest-700 shadow-sm'
                          : 'text-zinc-500 hover:text-zinc-700'
                      }`}
                      aria-label="列表视图"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 产品列表 */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-card shadow-soft p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
                  <MagnifyingGlass size={32} className="text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">未找到相关产品</h3>
                <p className="text-zinc-500 mb-6">
                  没有找到与 "{searchQuery}" 相关的商品，试试其他关键词吧
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {hotKeywords.slice(0, 4).map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordClick(keyword)}
                      className="px-4 py-2 bg-forest-50 text-forest-700 rounded-full text-sm hover:bg-forest-100 transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-colors"
                  >
                    查看全部产品
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BackToTop />
    </div>
  )
}

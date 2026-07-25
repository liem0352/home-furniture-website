import { useState, useMemo } from 'react'
import { MagnifyingGlass, SlidersHorizontal, SquaresFour, List, ArrowsVertical, X, Package } from '@phosphor-icons/react'
import ProductCard from '../components/ProductCard.jsx'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { products, productCategories, filterOptions } from '../data/products.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 产品中心页面
 * 展示所有产品，支持分类筛选、高级筛选和排序
 */
export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)

  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })

  /**
   * 切换材质筛选
   */
  const toggleMaterial = (materialId) => {
    setSelectedMaterials(prev =>
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    )
  }

  /**
   * 切换风格筛选
   */
  const toggleStyle = (styleId) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    )
  }

  /**
   * 重置所有筛选条件
   */
  const resetFilters = () => {
    setSelectedMaterials([])
    setSelectedStyles([])
    setSelectedPriceRange(null)
    setActiveCategory('all')
    setSearchQuery('')
    setSortBy('default')
  }

  /**
   * 根据分类、搜索词和高级筛选条件筛选产品
   */
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // 分类筛选
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // 材质筛选
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material))
    }

    // 风格筛选
    if (selectedStyles.length > 0) {
      result = result.filter(p => selectedStyles.includes(p.style))
    }

    // 价格区间筛选
    if (selectedPriceRange) {
      const priceFilter = filterOptions.prices.find(p => p.id === selectedPriceRange)
      if (priceFilter) {
        result = result.filter(p => p.price >= priceFilter.min && p.price < priceFilter.max)
      }
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
        result.sort((a, b) => b.sales - a.sales)
        break
      default:
        break
    }

    return result
  }, [activeCategory, sortBy, searchQuery, selectedMaterials, selectedStyles, selectedPriceRange])

  /**
   * 计算已激活的筛选数量
   */
  const activeFilterCount =
    selectedMaterials.length +
    selectedStyles.length +
    (selectedPriceRange ? 1 : 0) +
    (activeCategory !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      <PageHero
        title="产品中心"
        subtitle="浏览精选家居产品，打造理想生活空间"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20furniture%20showroom%2C%20elegant%20display%20of%20high%20end%20home%20furniture%2C%20minimalist%20design%2C%20professional%20lighting%2C%20luxury%20retail%20space&image_size=landscape_16_9"
        tag="精选产品"
        tagIcon={Package}
        variant="immersive"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 筛选栏 */}
        <div className="bg-white rounded-card shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="搜索产品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

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
                  <option value="price-asc">价格从低到高</option>
                  <option value="price-desc">价格从高到低</option>
                  <option value="sales">销量优先</option>
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

          {/* 结果统计和高级筛选 */}
          <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-zinc-500">
                共找到 <span className="font-semibold text-forest-700">{filteredProducts.length}</span> 件商品
              </span>
              {activeFilterCount > 0 && (
                <span className="text-sm text-zinc-500">
                  （已选 <span className="font-semibold text-amber-600">{activeFilterCount}</span> 个筛选条件）
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-sm text-zinc-500 hover:text-forest-700 transition-colors"
                >
                  <X size={14} />
                  清除筛选
                </button>
              )}
              <button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  showAdvancedFilter
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-zinc-600 hover:text-forest-700 hover:bg-zinc-50'
                }`}
              >
                <SlidersHorizontal size={16} />
                高级筛选
              </button>
            </div>
          </div>

          {/* 高级筛选面板 */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              showAdvancedFilter ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-6 border-t border-zinc-100 space-y-6">
              {/* 价格区间 */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">价格区间</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.prices.map((price) => (
                    <button
                      key={price.id}
                      onClick={() => setSelectedPriceRange(selectedPriceRange === price.id ? null : price.id)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${
                        selectedPriceRange === price.id
                          ? 'bg-forest-700 text-white'
                          : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      {price.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 材质筛选 */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">材质</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${
                        selectedMaterials.includes(material.id)
                          ? 'bg-forest-700 text-white'
                          : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      {material.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 风格筛选 */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">风格</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => toggleStyle(style.id)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${
                        selectedStyles.includes(style.id)
                          ? 'bg-forest-700 text-white'
                          : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
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
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
              <MagnifyingGlass size={32} className="text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">未找到相关产品</h3>
            <p className="text-zinc-500 mb-6">试试其他关键词或筛选条件吧</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-colors"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </div>

      <BackToTop />
    </div>
  )
}

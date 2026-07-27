import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf as SofaIcon,
  ShoppingCart,
  Heart,
  Star,
  CaretRight,
  CheckCircle,
  Eye,
  House,
} from '@phosphor-icons/react'
import { useCart } from '../store/AppContext.jsx'
import { getProductsByIds } from '../data/products.js'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal.js'
import BackToTop from '../components/BackToTop.jsx'
import CTASection from '../components/CTASection.jsx'
import PageHero from '../components/PageHero.jsx'

const roomSets = [
  {
    id: 'nordic-living',
    name: '北欧客厅套装',
    style: '北欧风格',
    category: 'living',
    description: '简约自然的北欧风客厅，给您温馨舒适的居家体验',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bright%20scandinavian%20living%20room%2C%20light%20oak%20floor%2C%20white%20sofa%2C%20green%20plants%2C%20large%20windows%2C%20natural%20light%2C%20minimalist%20decor%2C%20cozy%20atmosphere%2C%20interior%20design%20photography&image_size=landscape_4_3',
    products: [2, 8, 6],
    originalPrice: 11497,
    setPrice: 9799,
    discount: 15,
    tag: '热销',
    tagColor: 'amber',
    highlights: ['设计师精选搭配', '整套立省17%', '免费送货安装', '五年品质质保'],
  },
  {
    id: 'luxury-bedroom',
    name: '轻奢卧室套装',
    style: '轻奢风格',
    category: 'bedroom',
    description: '精致优雅的轻奢卧室，打造高品质睡眠空间',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20master%20bedroom%2C%20upholstered%20bed%2C%20velvet%20headboard%2C%20gold%20accents%2C%20elegant%20chandelier%2C%20neutral%20tones%2C%20high%20end%20interior%2C%20soft%20lighting%2C%20professional%20photography&image_size=landscape_4_3',
    products: [1, 7, 5],
    originalPrice: 6297,
    setPrice: 5299,
    discount: 16,
    tag: '新品',
    tagColor: 'forest',
    highlights: ['精致轻奢设计', '环保材质', '静音床板', '免费配送安装'],
  },
  {
    id: 'modern-dining',
    name: '现代餐厅套装',
    style: '现代简约',
    category: 'dining',
    description: '简约大气的现代餐厅，享受温馨用餐时光',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20dining%20room%2C%20marble%20table%2C%20fabric%20chairs%2C%20pendant%20light%2C%20minimalist%20interior%2C%20natural%20light%2C%20elegant%20space%2C%20architectural%20digest&image_size=landscape_4_3',
    products: [3],
    originalPrice: 3599,
    setPrice: 2999,
    discount: 17,
    tag: '限时',
    tagColor: 'red',
    highlights: ['进口岩板台面', '防刮耐高温', '碳素钢框架', '限时特惠价'],
  },
  {
    id: 'cozy-bedroom',
    name: '温馨卧室套装',
    style: '北欧风格',
    category: 'bedroom',
    description: '温暖舒适的卧室空间，给您一夜好眠',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20scandinavian%20bedroom%2C%20oak%20bed%20frame%2C%20white%20bedding%2C%20wooden%20nightstands%2C%20warm%20lamp%20light%2C%20green%20plants%2C%20serene%20atmosphere%2C%20minimalist%20interior%20design&image_size=landscape_4_3',
    products: [1, 7, 4],
    originalPrice: 10797,
    setPrice: 8999,
    discount: 17,
    tag: '推荐',
    tagColor: 'forest',
    highlights: ['全实木材质', '环保水性漆', '大容量收纳', '五年质保'],
  },
  {
    id: 'living-room-set',
    name: '客厅家具套装',
    style: '现代简约',
    category: 'living',
    description: '一站式配齐客厅家具，打造舒适会客空间',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20modern%20living%20room%2C%20gray%20sofa%2C%20wooden%20coffee%20table%2C%20tv%20stand%2C%20floor%20lamp%2C%20abstract%20art%2C%20clean%20lines%2C%20neutral%20palette%2C%20bright%20space%2C%20design%20inspiration&image_size=landscape_4_3',
    products: [2, 8, 6],
    originalPrice: 11497,
    setPrice: 9599,
    discount: 17,
    tag: '热卖',
    tagColor: 'amber',
    highlights: ['科技布耐脏面料', '岩板耐磨台面', '大容量储物', '热销万件'],
  },
  {
    id: 'storage-set',
    name: '收纳整理套装',
    style: '北欧风格',
    category: 'storage',
    description: '大容量收纳解决方案，让家更整洁有序',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organized%20modern%20closet%2C%20wooden%20wardrobe%2C%20storage%20boxes%2C%20minimalist%20bedroom%2C%20natural%20light%2C%20clean%20and%20tidy%20space%2C%20scandinavian%20style%2C%20home%20organization&image_size=landscape_4_3',
    products: [4, 9],
    originalPrice: 5898,
    setPrice: 4899,
    discount: 17,
    tag: '经典',
    tagColor: 'forest',
    highlights: ['全实木衣柜', '分区收纳设计', '节省70%空间', '环保材质'],
  },
]

const categories = [
  { id: 'all', name: '全部方案' },
  { id: 'living', name: '客厅' },
  { id: 'bedroom', name: '卧室' },
  { id: 'dining', name: '餐厅' },
  { id: 'storage', name: '收纳' },
]

/**
 * 全屋搭配方案页面
 * 展示不同风格的整套家具搭配方案
 *
 * 修复说明：
 * 1. 修复了 useScrollReveal 误用问题：setsRef 原本错误地使用了 stagger 参数，
 *    但 useScrollReveal 不支持 stagger，应使用 useStaggerReveal
 * 2. 修复了 ref 位置错误：setsRef 原本被用在标题筛选栏上，
 *    实际应该用在方案网格上实现卡片交错动画
 * 3. 标题筛选栏现在正确使用 titleRef（useScrollReveal）
 * 4. 各区块间距保持合理设计：方案特色 py-10，搭配方案 py-12/md:py-16
 */
export default function RoomSets() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '全屋搭配 | 精美家居'
  }, [])

  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')
  const pageRef = useRef(null)
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const setsRef = useStaggerReveal({ y: 40, duration: 0.8, stagger: 0.08 })

  const filteredSets = activeCategory === 'all'
    ? roomSets
    : roomSets.filter(set => set.category === activeCategory)

  const tagColors = {
    amber: 'bg-amber-500',
    forest: 'bg-forest-600',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }

  /**
   * 添加整套到购物车
   */
  const handleAddSetToCart = (set) => {
    const products = getProductsByIds(set.products)
    products.forEach(product => {
      addToCart(product, 1, product.specs?.[0]?.options?.[0] || '默认')
    })
    alert(`已将 ${set.name} 添加到购物车`)
  }

  return (
    <div ref={pageRef} className="bg-bone-50 min-h-screen">
      <PageHero
        title="全屋搭配"
        subtitle="专业设计师精选搭配方案，让您省心省力打造理想家居"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20modern%20home%20interior%2C%20open%20plan%20living%20dining%20space%2C%20scandinavian%20design%2C%20natural%20light%2C%20elegant%20furniture%2C%20warm%20cozy%20atmosphere%2C%20professional%20photography%2C%20wide%20angle&image_size=landscape_16_9"
        tag="整屋方案"
        tagIcon={House}
        variant="immersive"
      />

      {/* 方案特色 */}
      <section className="py-10 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Star, title: '专业搭配', desc: '设计师精选方案' },
              { icon: Heart, title: '整屋优惠', desc: '套装最高立省20%' },
              { icon: ShoppingCart, title: '一键购买', desc: '省心又省力' },
              { icon: CheckCircle, title: '品质保证', desc: '五年超长质保' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">{item.title}</div>
                    <div className="text-xs text-zinc-500">{item.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* 标题和筛选 */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-amber-500" />
              <span className="text-amber-600 font-medium tracking-widest text-xs uppercase">
                搭配方案
              </span>
              <span className="w-8 h-px bg-amber-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
              精选全屋搭配方案
            </h2>
            <p className="text-zinc-600 text-sm max-w-xl">
              专业设计师精心搭配，多种风格任选，整套购买更优惠
            </p>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-forest-700 text-white shadow-soft'
                    : 'bg-white text-zinc-600 hover:bg-forest-50 hover:text-forest-700 border border-zinc-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 搭配方案网格 */}
        {filteredSets.length > 0 ? (
          <div ref={setsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set, index) => (
              <div
                key={set.id}
                className="group bg-white rounded-card overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 ease-expo hover:-translate-y-1"
              >
                {/* 图片区域 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={set.image}
                    alt={set.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* 标签 */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 text-white text-xs font-bold rounded-full ${tagColors[set.tagColor] || 'bg-amber-500'}`}>
                    {set.tag}
                  </div>
                  {/* 折扣标签 */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    省¥{(set.originalPrice - set.setPrice).toLocaleString()}
                  </div>
                  {/* 悬浮操作按钮 */}
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${set.products[0]}`}
                        className="w-10 h-10 rounded-full bg-white text-zinc-800 flex items-center justify-center hover:bg-forest-600 hover:text-white transition-all duration-300 shadow-lg"
                        title="查看详情"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        className="w-10 h-10 rounded-full bg-white text-zinc-800 flex items-center justify-center hover:bg-forest-600 hover:text-white transition-all duration-300 shadow-lg"
                        title="收藏"
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-5">
                  <div className="text-xs text-amber-600 font-medium mb-1.5">{set.style}</div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-forest-700 transition-colors">
                    {set.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                    {set.description}
                  </p>

                  {/* 亮点 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {set.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-zinc-600">
                        <CheckCircle size={12} className="text-forest-600 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* 价格和按钮 */}
                  <div className="flex items-end justify-between pt-4 border-t border-zinc-100">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-amber-600">
                          ¥{set.setPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-zinc-400 line-through">
                          ¥{set.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        包含 {set.products.length} 件商品
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddSetToCart(set)}
                      className="px-4 py-2 bg-forest-700 text-white text-sm rounded-button font-medium hover:bg-forest-800 transition-all duration-300 active:scale-[0.98] flex items-center gap-1.5"
                    >
                      <ShoppingCart size={14} />
                      加入购物车
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 空状态 */
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <SofaIcon size={32} className="text-forest-600" weight="duotone" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-2">暂无相关方案</h2>
            <p className="text-zinc-600 mb-6 max-w-md mx-auto text-sm">
              该分类下暂无搭配方案，看看其他分类吧
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-white text-sm rounded-button font-medium hover:bg-forest-800 transition-colors"
            >
              查看全部方案
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <CTASection />

      <BackToTop />
    </div>
  )
}

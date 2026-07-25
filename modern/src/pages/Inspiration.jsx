import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Eye,
  Star,
  BookmarkSimple,
} from '@phosphor-icons/react'
import { getProductById } from '../data/products.js'
import PageHero from '../components/PageHero.jsx'
import { useStaggerReveal } from '../hooks/useScrollReveal'

/**
 * 灵感图集页面
 * 展示家居搭配灵感、装修案例等
 */
export default function Inspiration() {
  const [activeCategory, setActiveCategory] = useState('all')
  const gridRef = useStaggerReveal({ y: 40, stagger: 0.12, duration: 0.7 })

  const categories = [
    { id: 'all', name: '全部灵感' },
    { id: 'livingroom', name: '客厅' },
    { id: 'bedroom', name: '卧室' },
    { id: 'dining', name: '餐厅' },
    { id: 'study', name: '书房' },
    { id: 'kitchen', name: '厨房' },
    { id: 'bathroom', name: '卫浴' },
  ]

  const inspirations = [
    {
      id: 1,
      title: '北欧简约客厅',
      category: 'livingroom',
      style: 'scandinavian',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scandinavian%20minimalist%20living%20room%2C%20light%20wood%20furniture%2C%20white%20walls%2C%20cozy%20textiles%2C%20natural%20light%2C%20plants%2C%20clean%20lines&image_size=landscape_4_3',
      views: 8920,
      likes: 342,
      description: '以白色和原木色为主调，营造明亮通透的北欧风格客厅。',
      products: [],
      featured: true,
    },
    {
      id: 2,
      title: '日式禅意卧室',
      category: 'bedroom',
      style: 'japanese',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20zen%20bedroom%2C%20low%20platform%20bed%2C%20tatami%20mats%2C%20paper%20lanterns%2C%20minimalist%20decor%2C%20serene%20atmosphere&image_size=portrait_4_3',
      views: 6540,
      likes: 289,
      description: '低矮床架搭配榻榻米元素，打造宁静致远的睡眠空间。',
      products: [],
      featured: false,
    },
    {
      id: 3,
      title: '现代轻奢餐厅',
      category: 'dining',
      style: 'modern',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20luxury%20dining%20room%2C%20marble%20table%2C%20brass%20accents%2C%20velvet%20chairs%2C%20crystal%20chandelier%2C%20elegant%20ambiance&image_size=landscape_4_3',
      views: 11200,
      likes: 567,
      description: '大理石餐桌搭配黄铜元素，展现现代轻奢质感。',
      products: [],
      featured: true,
    },
    {
      id: 4,
      title: '工业风书房',
      category: 'study',
      style: 'industrial',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20style%20study%20room%2C%20exposed%20brick%20wall%2C%20metal%20shelves%2C%20leather%20chair%2C%20warm%20lighting%2C%20vintage%20decor&image_size=landscape_4_3',
      views: 7830,
      likes: 412,
      description: '红砖墙与金属书架碰撞出独特的工业复古氛围。',
      products: [],
      featured: false,
    },
    {
      id: 5,
      title: '开放式厨房设计',
      category: 'kitchen',
      style: 'modern',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=open%20concept%20kitchen%2C%20white%20cabinets%2C%20island%20counter%2C%20pendant%20lights%2C%20modern%20appliances%2C%20bright%20and%20airy&image_size=landscape_4_3',
      views: 9450,
      likes: 478,
      description: '开放式布局让烹饪与社交无缝衔接。',
      products: [],
      featured: false,
    },
    {
      id: 6,
      title: '极简主义卫浴',
      category: 'bathroom',
      style: 'minimalist',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20bathroom%2C%20walk-in%20shower%2C%20floating%20vanity%2C%20large%20mirror%2C%20neutral%20tones%2C%20spa-like%20feeling&image_size=portrait_4_3',
      views: 5670,
      likes: 234,
      description: '简洁线条与中性色调打造酒店式卫浴体验。',
      products: [],
      featured: false,
    },
    {
      id: 7,
      title: '儿童房创意搭配',
      category: 'bedroom',
      style: 'playful',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20bedroom%2C%20creative%20storage%2C%20playful%20decor%2C%20safe%20materials%2C%20bright%20but%20soft%20colors&image_size=landscape_4_3',
      views: 4320,
      likes: 198,
      description: '安全环保材料搭配活泼色彩，为孩子打造梦幻空间。',
      products: [],
      featured: false,
    },
    {
      id: 8,
      title: '阳台休闲角',
      category: 'livingroom',
      style: 'cozy',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20balcony%20nook%2C%20rattan%20chair%2C%20string%20lights%2C%20potted%20plants%2C%20small%20side%20table%2C%20relaxing%20outdoor%20space&image_size=portrait_4_3',
      views: 6780,
      likes: 356,
      description: '小小的阳台也能成为最惬意的阅读角落。',
      products: [],
      featured: false,
    },
    {
      id: 9,
      title: '家庭办公区',
      category: 'study',
      style: 'functional',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=home%20office%20setup%2C%20standing%20desk%2C%20ergonomic%20chair%2C%20bookshelf%20wall%2C%20good%20lighting%2C%20productive%20environment&image_size=landscape_4_3',
      views: 10340,
      likes: 521,
      description: '在家打造一个高效的工作角，整洁有序的环境让工作更有动力。',
      products: [],
      featured: false,
    },
  ]

  const filteredInspirations = activeCategory === 'all'
    ? inspirations
    : inspirations.filter(item => item.category === activeCategory || item.style === activeCategory)

  return (
    <div className="min-h-screen bg-bone-50">
      <PageHero
        title="发现家居灵感"
        subtitle="浏览精选家居搭配案例，从北欧简约到日式禅意，从现代轻奢到工业复古，找到属于你的理想家居风格。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20interior%20design%20collage%2C%20various%20home%20styles%2C%20scandinavian%2C%20japanese%2C%20modern%20luxury%2C%20warm%20lighting%2C%20home%20inspiration%2C%20aesthetic%20mood%20board&image_size=landscape_16_9"
        tag="家居灵感"
        tagIcon={Star}
        variant="immersive"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 分类筛选 */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-forest-700 text-white shadow-soft'
                    : 'bg-white text-zinc-600 hover:bg-forest-50 hover:text-forest-700 border border-zinc-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 灵感瀑布流 */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredInspirations.map((item) => (
            <div
              key={item.id}
              className="inspiration-card break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 group"
            >
              {/* 图片区 */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                      精选
                    </span>
                  </div>
                )}
                {/* 悬浮操作按钮 */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-soft">
                    <BookmarkSimple size={16} className="text-zinc-700" />
                  </button>
                </div>
              </div>

              {/* 内容区 */}
              <div className="p-5">
                <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-forest-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {item.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {item.likes}
                    </span>
                  </div>
                  <Link
                    to={`/inspiration/${item.id}`}
                    className="flex items-center gap-1 text-forest-700 hover:text-forest-800 transition-colors"
                  >
                    查看详情
                    <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredInspirations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">暂无该分类的灵感内容</p>
          </div>
        )}
      </div>
    </div>
  )
}

import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'
import { useStaggerReveal, useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 产品展示区块组件
 * 展示精选产品，带有分类标签和查看全部按钮
 * @param {Array} products - 产品列表
 * @param {string} title - 区块标题
 * @param {string} subtitle - 区块副标题
 */
export default function ProductShowcase({ products, title = '精选产品', subtitle = '' }) {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const gridRef = useStaggerReveal({ y: 40, stagger: 0.1, duration: 0.6 })

  return (
    <section className="py-section bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区 */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {subtitle && (
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-amber-500" />
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase">
                  {subtitle}
                </span>
              </div>
            )}
            <h2 className="text-heading-2 font-bold text-zinc-900">{title}</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-forest-700 font-medium hover:text-forest-800 transition-colors group"
          >
            查看全部产品
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 产品网格 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import ProductShowcase from '../components/ProductShowcase.jsx'
import BrandStory from '../components/BrandStory.jsx'
import Testimonials from '../components/Testimonials.jsx'
import StatsSection from '../components/StatsSection.jsx'
import CTASection from '../components/CTASection.jsx'
import FlashSale from '../components/FlashSale.jsx'
import BackToTop from '../components/BackToTop.jsx'
import { features, testimonials } from '../data/home.js'
import { hotProducts, newProducts } from '../data/products.js'

/**
 * 首页组件
 * 组合所有首页区块，构成完整的落地页
 */
export default function Home() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '首页 | 精美家居'
  }, [])

  return (
    <div className="bg-bone-50">
      <Hero />
      <StatsSection />
      <Features features={features} />
      <FlashSale products={hotProducts} />
      <ProductShowcase
        products={hotProducts}
        title="热销爆款"
        subtitle="热门推荐"
      />
      <BrandStory />
      <ProductShowcase
        products={newProducts}
        title="新品上市"
        subtitle="新品首发"
      />
      <Testimonials testimonials={testimonials} />
      <CTASection />
      <BackToTop />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Lightning,
  ArrowRight,
  Clock,
} from '@phosphor-icons/react'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

/**
 * 限时促销组件
 * 展示限时折扣商品和倒计时
 */
export default function FlashSale({ products = [] }) {
  const sectionRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const productsRef = useStaggerReveal()
  const [timeLeft, setTimeLeft] = useState({
    hours: '02',
    minutes: '45',
    seconds: '30',
  })

  useEffect(() => {
    /**
     * 倒计时逻辑
     */
    const endTime = new Date()
    endTime.setHours(endTime.getHours() + 2)
    endTime.setMinutes(endTime.getMinutes() + 45)
    endTime.setSeconds(endTime.getSeconds() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const diff = endTime - now

      if (diff <= 0) {
        clearInterval(timer)
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' })
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const flashSaleProducts = products.slice(0, 4).map((product, index) => ({
    ...product,
    salePrice: Math.round(product.price * 0.75),
    discount: 25 + index * 2,
    sold: 60 + index * 10,
  }))

  return (
    <section ref={sectionRef} className="py-section bg-gradient-to-br from-amber-50 via-bone-50 to-bone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightning size={20} className="text-amber-500" weight="fill" />
              <span className="text-amber-600 font-medium">限时特惠</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
              限时秒杀
            </h2>
            <p className="text-zinc-500 max-w-md">
              精选爆款家具，限时折扣，数量有限，先到先得
            </p>
          </div>

          {/* 倒计时 */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Clock size={18} className="text-amber-500" weight="duotone" />
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-zinc-600">距结束</span>
              <div className="flex items-center gap-1">
                {['hours', 'minutes', 'seconds'].map((unit, index) => (
                  <div key={unit} className="flex items-center">
                    <div className="w-9 h-9 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-mono font-bold text-base">
                      {timeLeft[unit]}
                    </div>
                    {index < 2 && (
                      <span className="text-zinc-900 font-bold mx-0.5">:</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div ref={productsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {flashSaleProducts.map((product) => (
            <div
              key={product.id}
              className="product-card-wrapper group"
            >
              <Link
                to={`/product/${product.id}`}
                className="block bg-white rounded-card overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
              >
                {/* 商品图片 */}
                <div className="relative aspect-square overflow-hidden bg-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* 折扣标签 */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                    -{product.discount}%
                  </div>
                  {/* 进度条 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <div className="flex items-center justify-between text-white text-xs mb-1.5">
                      <span>已抢 {product.sold}%</span>
                      <span>仅剩 {100 - product.sold} 件</span>
                    </div>
                    <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${product.sold}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 商品信息 */}
                <div className="p-4">
                  <h3 className="font-medium text-zinc-900 mb-2 line-clamp-1 group-hover:text-forest-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-amber-600">
                      ¥{product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-zinc-400 line-through">
                      ¥{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 查看更多 */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all duration-300 active:scale-95"
          >
            查看全部优惠
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

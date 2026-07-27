import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { stats } from '../data/home.js'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Trophy, Users, Truck, Star } from '@phosphor-icons/react'

/**
 * 检测用户是否偏好减少动画
 * @returns {boolean} 是否偏好减少动画
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 数字滚动动画组件
 * 当元素进入视口时触发数字递增动画
 * @param {number} end - 目标数字
 * @param {string} suffix - 数字后缀
 * @param {number} duration - 动画持续时间
 */
function AnimatedNumber({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const ctx = gsap.context(() => {
              gsap.to({ value: 0 }, {
                value: end,
                duration,
                ease: 'power2.out',
                onUpdate: function() {
                  setCount(Math.floor(this.targets()[0].value))
                },
              })
            }, ref)
            return () => ctx.revert()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="inline-block">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/**
 * 数据统计区块组件
 * 展示品牌关键数据指标
 */
export default function StatsSection() {
  const ref = useScrollReveal({ y: 30, duration: 0.8 })

  const iconMap = {
    award: Trophy,
    users: Users,
    truck: Truck,
    star: Star,
  }

  return (
    <section className="py-20 bg-forest-700 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest-400 blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Trophy
            return (
              <div
                key={index}
                className="text-center group relative min-w-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* 图标 */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <Icon size={20} className="text-amber-400 sm:w-6 sm:h-6" />
                </div>

                {/* 数字 */}
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight break-words overflow-hidden">
                  <AnimatedNumber end={stat.value} suffix={stat.suffix || ''} />
                </div>

                {/* 标签 */}
                <div className="text-forest-200 text-xs sm:text-sm font-medium tracking-wide break-words line-clamp-2">
                  {stat.label}
                </div>

                {/* 装饰线 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, CaretLeft, CaretRight, Play } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { heroSlides } from '../data/home.js'
import Button from './Button.jsx'

/**
 * 首页 Hero 轮播组件
 * 大型全屏轮播，带有淡入淡出效果和视差滚动
 */
export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)

  /**
   * 切换到指定幻灯片
   * @param {number} index - 目标幻灯片索引
   */
  const goToSlide = (index) => {
    if (index === currentSlide) return
    setCurrentSlide(index)
  }

  /**
   * 切换到下一张幻灯片
   */
  const nextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length
    goToSlide(next)
  }

  /**
   * 切换到上一张幻灯片
   */
  const prevSlide = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length
    goToSlide(prev)
  }

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  // 入场动画 - 只在组件挂载时运行一次
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* 轮播图片 */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-expo ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-900/40 to-forest-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 to-transparent w-1/2" />
        </div>
      ))}

      {/* 内容区域 */}
      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-2xl ml-[8%]">
            {/* 副标题标签 */}
            <div ref={subtitleRef} className="inline-flex items-center gap-2 mb-6">
              <span className="w-10 h-px bg-amber-400" />
              <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">
                {heroSlides[currentSlide].subtitle}
              </span>
            </div>

            {/* 主标题 */}
            <h1
              ref={titleRef}
              className="text-display font-bold text-white mb-6 text-balance leading-[1.05]"
            >
              {heroSlides[currentSlide].title}
            </h1>

            {/* 描述文字 */}
            <p
              ref={descRef}
              className="text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed"
            >
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA 按钮 */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                to={heroSlides[currentSlide].ctaLink}
                size="lg"
                className="group"
              >
                {heroSlides[currentSlide].ctaText}
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/about"
                className="text-white border-white/50 hover:bg-white hover:text-forest-900"
              >
                <Play size={16} weight="fill" className="mr-2" />
                品牌故事
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 左右切换按钮 - 桌面端 */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
        aria-label="上一张"
      >
        <CaretLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
        aria-label="下一张"
      >
        <CaretRight size={24} />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-expo ${
              index === currentSlide
                ? 'w-10 bg-amber-400'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`切换到第 ${index + 1} 张`}
          />
        ))}
      </div>

    </section>
  )
}

import { Star, ChatCircle } from '@phosphor-icons/react'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal.js'

/**
 * 客户评价区块组件
 * 展示真实用户评价，采用卡片堆叠样式
 */
export default function Testimonials({ testimonials }) {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const cardsRef = useStaggerReveal({ y: 40, stagger: 0.15, duration: 0.7 })

  return (
    <section className="py-section bg-forest-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-forest-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 标题区 */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-forest-600" />
            <span className="text-forest-700 font-medium tracking-widest text-xs uppercase">
              客户评价
            </span>
            <span className="w-10 h-px bg-forest-600" />
          </div>
          <h2 className="text-heading-2 font-bold text-zinc-900 text-balance max-w-2xl mx-auto">
            听听他们怎么说
          </h2>
          <p className="mt-4 text-zinc-600 max-w-xl mx-auto">
            来自真实客户的真诚评价，是我们不断进步的动力
          </p>
        </div>

        {/* 评价卡片 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card relative bg-white rounded-card p-8 shadow-soft hover:shadow-medium transition-all duration-500 ease-expo hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* 引号装饰 */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center shadow-medium">
                <ChatCircle size={18} className="text-white" weight="fill" />
              </div>

              {/* 评分 */}
              <div className="flex items-center gap-1 mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    weight="fill"
                    className={i < testimonial.rating ? 'text-amber-400' : 'text-zinc-200'}
                  />
                ))}
              </div>

              {/* 评价内容 */}
              <p className="text-zinc-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* 用户信息 */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-forest-100"
                />
                <div>
                  <div className="font-semibold text-zinc-900">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

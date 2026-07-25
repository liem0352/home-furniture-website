/**
 * 统一页面 Hero 组件
 * 用于所有子页面的顶部 Banner 区域，确保设计风格一致
 * 支持两种变体：default（标准）和 immersive（沉浸式，适用于视觉型页面）
 */
export default function PageHero({ title, subtitle, image, tag, tagIcon: TagIcon, variant = 'default' }) {
  // 沉浸式变体：背景图更清晰，视觉冲击力更强，适用于灵感图集等视觉型页面
  if (variant === 'immersive') {
    return (
      <section className="relative h-[28rem] md:h-[34rem] overflow-hidden">
        {/* 背景图片：保留更高清晰度 */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover scale-105"
        />
        {/* 多层渐变叠加：保证文字可读性的同时保留图片质感 */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/50 to-forest-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 via-transparent to-forest-900/60" />

        {/* 内容区域 */}
        <div className="absolute inset-0 flex items-end justify-center text-center pb-16 md:pb-20 pt-20">
          <div className="max-w-5xl px-6">
            {tag && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 rounded-full text-sm font-medium mb-5">
                {TagIcon && <TagIcon size={16} weight="fill" />}
                {tag}
              </span>
            )}
            {/* 装饰性分隔线 */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-amber-300/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300/70" />
              <span className="h-px w-12 bg-amber-300/50" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-forest-50/90 max-w-4xl mx-auto leading-relaxed drop-shadow">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 底部渐变过渡，让Hero与下方内容自然衔接 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bone-50 to-transparent" />
      </section>
    )
  }

  // 标准变体：适用于普通页面
  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-900/60 to-forest-900/80" />
      <div className="absolute inset-0 flex items-center justify-center text-center pt-20">
        <div className="max-w-4xl px-6">
          {tag && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 text-amber-300 rounded-full text-sm font-medium mb-6">
              {TagIcon && <TagIcon size={16} />}
              {tag}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-forest-100 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

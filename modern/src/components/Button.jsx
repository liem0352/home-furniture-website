import { Link } from 'react-router-dom'

/**
 * 按钮组件
 * 支持多种变体和尺寸，可作为链接或按钮使用
 * @param {string} variant - 按钮变体：primary / secondary / outline / ghost
 * @param {string} size - 按钮尺寸：sm / md / lg
 * @param {string} to - 内部链接路径（设置则渲染为 Link）
 * @param {string} href - 外部链接地址（设置则渲染为 a 标签）
 * @param {React.ReactNode} children - 按钮内容
 * @param {string} className - 额外的类名
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  children,
  className = '',
  disabled = false,
  loading = false,
  iconRight,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-300 ease-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-forest-700 text-white hover:bg-forest-800 hover:shadow-medium active:scale-[0.98] active:shadow-soft shadow-soft',
    secondary: 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-medium active:scale-[0.98] active:shadow-soft shadow-soft',
    outline: 'border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white active:scale-[0.98]',
    ghost: 'text-zinc-700 hover:bg-zinc-100 active:scale-[0.98]',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-medium active:scale-[0.98] active:shadow-soft shadow-soft',
    amber: 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-medium active:scale-[0.98] active:shadow-soft shadow-soft',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            加载中
          </span>
        ) : (
          <>
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
          </>
        )}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            加载中
          </span>
        ) : (
          <>
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
          </>
        )}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          加载中
        </span>
      ) : (
        <>
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </button>
  )
}

import { PackageOpen, ShoppingBag, Search, FileText, RefreshCw, AlertCircle, ArrowRight } from '@phosphor-icons/react'
import Button from './Button.jsx'

/**
 * 空状态组件
 * 展示友好的空状态界面，引导用户下一步操作
 * @param {string} type - 空状态类型：cart / wishlist / search / orders / compare / products
 * @param {string} title - 自定义标题
 * @param {string} description - 自定义描述
 * @param {object} action - 操作按钮配置
 */
export function EmptyState({ type, title, description, action }) {
  const defaultConfigs = {
    cart: {
      icon: ShoppingBag,
      title: '购物车是空的',
      description: '快去挑选心仪的家具吧',
      action: { label: '去逛逛', to: '/products' },
    },
    wishlist: {
      icon: PackageOpen,
      title: '收藏夹是空的',
      description: '收藏喜欢的商品，方便下次查看',
      action: { label: '去浏览', to: '/products' },
    },
    search: {
      icon: Search,
      title: '未找到相关商品',
      description: '换个关键词试试，或浏览我们的精选产品',
      action: { label: '浏览全部', to: '/products' },
    },
    orders: {
      icon: FileText,
      title: '暂无订单',
      description: '开始购物，创建您的第一笔订单',
      action: { label: '去购物', to: '/products' },
    },
    compare: {
      icon: PackageOpen,
      title: '暂无对比商品',
      description: '选择商品加入对比，找出最适合您的家具',
      action: { label: '去选择', to: '/products' },
    },
    products: {
      icon: PackageOpen,
      title: '暂无产品',
      description: '该分类下暂无产品',
      action: { label: '返回首页', to: '/' },
    },
  }

  const config = defaultConfigs[type] || defaultConfigs.products
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-bone-50">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-forest-100 flex items-center justify-center">
          <Icon size={40} className="text-forest-600" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
          <ArrowRight size={16} className="text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title || config.title}</h3>
      <p className="text-zinc-500 text-center max-w-sm mb-8">{description || config.description}</p>
      {action || config.action ? (
        <Button to={action?.to || config.action.to}>
          {action?.label || config.action.label}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      ) : null}
    </div>
  )
}

/**
 * 加载状态组件
 * 展示优雅的加载动画
 * @param {string} text - 加载提示文字
 * @param {boolean} skeleton - 是否显示骨架屏模式
 */
export function LoadingState({ text = '加载中...', skeleton = false }) {
  if (skeleton) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-zinc-200 rounded w-32 mb-4" />
        <div className="h-4 bg-zinc-200 rounded w-full mb-2" />
        <div className="h-4 bg-zinc-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-zinc-200 rounded w-1/2" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-forest-200 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-forest-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-zinc-500 font-medium">{text}</p>
    </div>
  )
}

/**
 * 错误状态组件
 * 展示错误信息和重试选项
 * @param {string} title - 错误标题
 * @param {string} message - 错误详情
 * @param {function} onRetry - 重试回调函数
 */
export function ErrorState({ title = '出错了', message = '抱歉，出现了一些问题', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-bone-50">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>
      <p className="text-zinc-500 text-center max-w-sm mb-8">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw size={16} className="mr-2" />
          重新加载
        </Button>
      )}
    </div>
  )
}
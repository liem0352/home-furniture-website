import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info, Warning, X } from '@phosphor-icons/react'

/**
 * Toast 通知组件
 * 显示操作反馈信息，支持成功、错误、警告、信息四种类型
 */
export default function Toast({ toast, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (toast) {
      setIsVisible(true)
      setIsLeaving(false)
    }
  }, [toast])

  if (!toast) return null

  /**
   * 获取图标和样式
   */
  const getTypeConfig = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgClass: 'bg-emerald-50',
          borderClass: 'border-emerald-200',
          textClass: 'text-emerald-800',
          iconClass: 'text-emerald-500',
        }
      case 'error':
        return {
          icon: XCircle,
          bgClass: 'bg-red-50',
          borderClass: 'border-red-200',
          textClass: 'text-red-800',
          iconClass: 'text-red-500',
        }
      case 'warning':
        return {
          icon: Warning,
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-200',
          textClass: 'text-amber-800',
          iconClass: 'text-amber-500',
        }
      case 'info':
      default:
        return {
          icon: Info,
          bgClass: 'bg-forest-50',
          borderClass: 'border-forest-200',
          textClass: 'text-forest-800',
          iconClass: 'text-forest-500',
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none">
      <div
        className={`
          pointer-events-auto
          flex items-start gap-3
          px-4 py-3
          rounded-lg border
          shadow-lg
          ${config.bgClass}
          ${config.borderClass}
          transform transition-all duration-300
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{ minWidth: '280px', maxWidth: '400px' }}
      >
        <Icon size={20} className={`flex-shrink-0 mt-0.5 ${config.iconClass}`} weight="fill" />
        <p className={`flex-1 text-sm font-medium ${config.textClass}`}>
          {toast.message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className={`flex-shrink-0 ${config.textClass} opacity-60 hover:opacity-100 transition-opacity`}
          aria-label="关闭"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

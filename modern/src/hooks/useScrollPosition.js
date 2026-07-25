import { useEffect, useState } from 'react'

/**
 * 滚动位置 Hook
 * 获取当前页面滚动位置
 * @returns {Object} scrollY - 垂直滚动位置, scrollX - 水平滚动位置
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  })

  useEffect(() => {
    let lastY = 0
    let ticking = false

    const updatePosition = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    updatePosition()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

import { useEffect, useState } from 'react'
import { ArrowUp } from '@phosphor-icons/react'
import { useScrollPosition } from '../hooks/useScrollPosition.js'

/**
 * 回到顶部按钮组件
 * 滚动超过一定距离后显示，点击平滑滚动到顶部
 */
export default function BackToTop() {
  const { y: scrollY } = useScrollPosition()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsVisible(scrollY > 400)
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-forest-700 text-white shadow-large flex items-center justify-center transition-all duration-500 ease-expo hover:bg-forest-800 active:scale-90 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      aria-label="回到顶部"
    >
      <ArrowUp
        size={20}
        className={`transition-transform duration-300 ${
          isHovered ? '-translate-y-0.5' : ''
        }`}
      />
    </button>
  )
}

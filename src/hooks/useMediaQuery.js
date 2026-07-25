import { useEffect, useState } from 'react'

/**
 * 媒体查询 Hook
 * 响应式判断当前视口是否匹配指定媒体查询
 * @param {string} query - CSS 媒体查询字符串
 * @returns {boolean} 是否匹配
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // 初始化时同步当前匹配状态
    setMatches(media.matches)

    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

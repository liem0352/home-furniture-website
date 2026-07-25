import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 检测用户是否偏好减少动画
 * @returns {boolean} 是否偏好减少动画
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 丝滑缓动曲线 - expo out 变体，比 power3.out 更柔和
 * 入场时有明显的加速感，结束时缓慢减速，营造"滑入"质感
 */
const SILKY_EASE = 'power4.out'
const SILKY_EASE_INOUT = 'power3.inOut'

/**
 * 滚动揭示动画 Hook
 * 使用 GSAP ScrollTrigger 实现元素进入视口时的揭示动画
 * 支持双向动画：进入时淡入，离开时淡出，滚回时重新淡入
 * 使用 gsap.context 限制作用域，避免组件间动画互相干扰
 * @param {Object} options - 动画配置选项
 * @param {number} options.y - Y轴位移，默认40
 * @param {number} options.x - X轴位移，默认0
 * @param {number} options.opacity - 初始透明度，默认0
 * @param {number} options.duration - 动画时长，默认0.8
 * @param {number} options.delay - 延迟时间，默认0
 * @param {string} options.ease - 缓动函数，默认power4.out
 * @param {string} options.start - 触发位置，默认'top 85%'
 * @param {string} options.end - 结束位置，默认'bottom 15%'
 * @param {boolean} options.once - 是否只播放一次，默认false（支持双向）
 * @param {boolean} options.fadeOut - 离开视口时是否淡出，默认true
 * @returns {Object} ref - 元素引用
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    if (!ref.current) return

    // 尊重用户的减少动画偏好
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, y: 0, x: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const {
        y = 40,
        x = 0,
        opacity = 0,
        duration = 0.8,
        delay = 0,
        ease = SILKY_EASE,
        start = 'top 85%',
        end = 'bottom 15%',
        once = false,
        fadeOut = true,
      } = optionsRef.current

      const element = ref.current
      if (!element) return

      // 设置初始隐藏状态
      gsap.set(element, { y, x, opacity })

      if (once) {
        // 单次模式：只播放一次，不回退
        ScrollTrigger.create({
          trigger: element,
          start,
          once: true,
          onEnter: () => {
            gsap.to(element, {
              y: 0,
              x: 0,
              opacity: 1,
              duration,
              delay,
              ease,
            })
          },
        })
      } else {
        // 双向模式：进入时淡入，离开时淡出
        ScrollTrigger.create({
          trigger: element,
          start,
          end,
          onEnter: () => {
            gsap.to(element, {
              y: 0,
              x: 0,
              opacity: 1,
              duration,
              delay,
              ease,
            })
          },
          onLeave: () => {
            if (fadeOut) {
              gsap.to(element, {
                opacity: 0.1,
                y: -y * 0.4,
                duration: duration * 0.35,
                ease: SILKY_EASE_INOUT,
              })
            }
          },
          onEnterBack: () => {
            gsap.to(element, {
              y: 0,
              x: 0,
              opacity: 1,
              duration: duration * 0.8,
              ease,
            })
          },
          onLeaveBack: () => {
            if (fadeOut) {
              gsap.to(element, {
                opacity,
                y,
                x,
                duration: duration * 0.35,
                ease: SILKY_EASE_INOUT,
              })
            }
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * 子元素交错揭示动画 Hook
 * 用于列表/网格元素的交错进入动画
 * 支持双向动画，离开视口时交错淡出
 * @param {Object} options - 动画配置选项
 * @param {number} options.y - Y轴位移，默认30
 * @param {number} options.duration - 动画时长，默认0.6
 * @param {number} options.stagger - 交错间隔，默认0.1
 * @param {string} options.ease - 缓动函数，默认power4.out
 * @param {string} options.start - 触发位置，默认'top 85%'
 * @param {string} options.end - 结束位置，默认'bottom 15%'
 * @param {boolean} options.once - 是否只播放一次，默认false
 * @param {boolean} options.fadeOut - 离开时是否淡出，默认true
 * @returns {Object} ref - 容器元素引用
 */
export function useStaggerReveal(options = {}) {
  const ref = useRef(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    if (!ref.current) return

    // 尊重用户的减少动画偏好
    if (prefersReducedMotion()) {
      return
    }

    const ctx = gsap.context(() => {
      const {
        y = 30,
        duration = 0.6,
        stagger = 0.1,
        ease = SILKY_EASE,
        start = 'top 85%',
        end = 'bottom 15%',
        once = false,
        fadeOut = true,
      } = optionsRef.current

      const container = ref.current
      if (!container) return

      const children = Array.from(container.children)
      if (children.length === 0) return

      // 设置初始隐藏状态
      gsap.set(children, { y, opacity: 0 })

      if (once) {
        ScrollTrigger.create({
          trigger: container,
          start,
          once: true,
          onEnter: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration,
              stagger,
              ease,
            })
          },
        })
      } else {
        // 双向交错动画
        ScrollTrigger.create({
          trigger: container,
          start,
          end,
          onEnter: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration,
              stagger,
              ease,
            })
          },
          onLeave: () => {
            if (fadeOut) {
              gsap.to(children, {
                opacity: 0.1,
                y: -y * 0.4,
                duration: duration * 0.3,
                stagger: stagger * 0.3,
                ease: SILKY_EASE_INOUT,
              })
            }
          },
          onEnterBack: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: duration * 0.8,
              stagger: stagger * 0.7,
              ease,
            })
          },
          onLeaveBack: () => {
            if (fadeOut) {
              gsap.to(children, {
                opacity: 0,
                y,
                duration: duration * 0.3,
                stagger: stagger * 0.3,
                ease: SILKY_EASE_INOUT,
              })
            }
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return ref
}

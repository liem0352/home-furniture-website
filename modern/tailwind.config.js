/**
 * Tailwind CSS 配置文件
 * 定义设计系统令牌：颜色、字体、间距、动效等
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 森林深绿主题 - 冷调奢华
        forest: {
          50: '#f0f7f4',
          100: '#dcebe2',
          200: '#b9d7c6',
          300: '#8cbaa3',
          400: '#5e987e',
          500: '#3d7a62',
          600: '#2d614d',
          700: '#254e3f',
          800: '#1f3f33',
          900: '#1a342b',
          950: '#0d1d18',
        },
        // 骨白/米白
        bone: {
          50: '#faf9f6',
          100: '#f5f3ee',
          200: '#e8e4d9',
          300: '#d6cfbe',
          400: '#bfb49c',
          500: '#a89a7d',
        },
        // 琥珀点缀色
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // 中性色
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'heading-3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 10rem)',
        'section-lg': 'clamp(6rem, 14vw, 14rem)',
      },
      borderRadius: {
        'card': '16px',
        'button': '100px',
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(26, 52, 43, 0.15)',
        'medium': '0 8px 40px -12px rgba(26, 52, 43, 0.2)',
        'large': '0 20px 60px -20px rgba(26, 52, 43, 0.3)',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

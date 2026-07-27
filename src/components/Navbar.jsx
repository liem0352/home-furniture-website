import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  List,
  X,
  Phone,
  Envelope,
  ShoppingBag,
  User,
  Heart,
  ShoppingCart,
  SignOut,
  CaretDown,
  MagnifyingGlass,
  Package,
  Columns,
} from '@phosphor-icons/react'
import { navLinks, contactInfo } from '../data/nav.js'
import { useScrollPosition } from '../hooks/useScrollPosition.js'
import { useCart, useWishlist, useAuth, useCompare } from '../store/AppContext.jsx'
import CartDrawer from './CartDrawer.jsx'

/**
 * 导航栏组件
 * 包含顶部信息栏和主导航，支持滚动时的样式变化和移动端菜单
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { y: scrollY } = useScrollPosition()
  const location = useLocation()
  const navigate = useNavigate()
  const isScrolled = scrollY > 50
  const isHomePage = location.pathname === '/'
  const shouldUseDarkNavbar = isScrolled || isMenuOpen
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { compareCount } = useCompare()
  const { user, isLoggedIn, logout } = useAuth()
  const userMenuRef = useRef(null)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * 处理退出登录
   */
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  /**
   * 处理搜索提交
   */
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo ${
        shouldUseDarkNavbar
          ? 'bg-bone-50/90 backdrop-blur-lg shadow-soft border-b border-zinc-200/50'
          : 'bg-transparent'
      }`}
    >
      {/* 顶部信息栏 - 桌面端 */}
      <div
        className={`hidden lg:block transition-all duration-500 ease-expo overflow-hidden ${
          shouldUseDarkNavbar ? 'h-0 opacity-0' : 'h-10 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-white/80">
              <Phone size={14} weight="duotone" className="text-amber-400" />
              {contactInfo.phone}
            </span>
            <span className="flex items-center gap-2 text-white/80">
              <Envelope size={14} weight="duotone" className="text-amber-400" />
              {contactInfo.email}
            </span>
          </div>
          <div className="text-white/60">
            {contactInfo.workHours}
          </div>
        </div>
      </div>

      {/* 搜索展开框 */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full bg-white border-b border-zinc-100 shadow-soft transition-all duration-300 ease-expo overflow-hidden ${
          isSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索家具、品牌、风格..."
              className="w-full pl-12 pr-24 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors text-sm font-medium"
            >
              搜索
            </button>
          </form>
        </div>
      </div>

      {/* 主导航 */}
      <nav className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            shouldUseDarkNavbar ? 'bg-forest-700' : 'bg-white/15 backdrop-blur-md border border-white/25'
          }`}>
            <span className="text-white font-bold text-lg">精</span>
          </div>
          <span className={`font-semibold text-lg transition-colors duration-300 ${
            shouldUseDarkNavbar ? 'text-zinc-900' : 'text-white'
          }`}>
            精美家居
          </span>
        </Link>

        {/* 桌面端导航链接 */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? (shouldUseDarkNavbar ? 'text-forest-700' : 'text-white')
                      : (shouldUseDarkNavbar ? 'text-zinc-700 hover:text-forest-700' : 'text-white/85 hover:text-white')
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 transition-all duration-300 ease-expo ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 右侧操作区 - 桌面端 */}
        <div className="hidden md:flex items-center gap-2">
          {/* 搜索 */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              shouldUseDarkNavbar
                ? 'text-zinc-700 hover:text-forest-700 hover:bg-zinc-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-label="搜索"
          >
            <MagnifyingGlass size={20} />
          </button>

          {/* 收藏 */}
          <Link
            to="/wishlist"
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              shouldUseDarkNavbar
                ? 'text-zinc-700 hover:text-forest-700 hover:bg-zinc-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-label="我的收藏"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* 对比 */}
          <Link
            to="/compare"
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              shouldUseDarkNavbar
                ? 'text-zinc-700 hover:text-forest-700 hover:bg-zinc-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-label="商品对比"
          >
            <Columns size={20} />
            {compareCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-forest-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {compareCount > 99 ? '99+' : compareCount}
              </span>
            )}
          </Link>

          {/* 购物车 */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              shouldUseDarkNavbar
                ? 'text-zinc-700 hover:text-forest-700 hover:bg-zinc-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-label="购物车"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-forest-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* 用户菜单 */}
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  shouldUseDarkNavbar
                    ? 'text-zinc-700 hover:bg-zinc-100'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center text-white text-sm font-medium">
                  {user?.username?.charAt(0) || user?.email?.charAt(0) || '用'}
                </div>
                <CaretDown size={14} />
              </button>

              {/* 下拉菜单 */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-large border border-zinc-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-sm font-medium text-zinc-900">{user?.username || user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">会员用户</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/account')}
                    className="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
                  >
                    <User size={16} />
                    个人中心
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/orders')}
                    className="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
                  >
                    <Package size={16} />
                    我的订单
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/wishlist')}
                    className="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
                  >
                    <Heart size={16} />
                    我的收藏
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
                  >
                    <ShoppingBag size={16} />
                    购物车
                  </button>
                  <div className="border-t border-zinc-100 mt-2 pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <SignOut size={16} />
                      退出登录
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                shouldUseDarkNavbar
                  ? 'text-zinc-700 hover:text-forest-700'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <User size={18} />
              <span>登录</span>
            </Link>
          )}

          {/* 选购产品按钮 */}
          <Link
            to="/products"
            className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-white text-sm font-medium rounded-button hover:bg-forest-800 transition-all duration-300 shadow-soft hover:shadow-medium active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            选购产品
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden flex items-center gap-2">
          {/* 购物车 - 移动端 */}
          <Link
            to="/cart"
            className={`relative p-2 ${
              shouldUseDarkNavbar ? 'text-zinc-800' : 'text-white'
            }`}
            aria-label="购物车"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-forest-600 text-white text-xs font-bold rounded-full flex items-center justify-center text-[10px]">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 transition-colors ${
              shouldUseDarkNavbar ? 'text-zinc-800 hover:text-forest-700' : 'text-white hover:text-amber-400'
            }`}
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-bone-50 transition-transform duration-500 ease-expo ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col gap-1 overflow-y-auto h-full">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `py-3.5 px-4 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`
              }
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </NavLink>
          ))}

          {/* 移动端搜索框 */}
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative">
              <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索产品..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </form>

          <div className="mt-4 pt-4 border-t border-zinc-200 flex flex-col gap-2">
            {isLoggedIn && (
              <Link
                to="/account"
                className="flex items-center gap-3 py-3 px-4 text-base font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <User size={20} />
                个人中心
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to="/orders"
                className="flex items-center gap-3 py-3 px-4 text-base font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <Package size={20} />
                我的订单
              </Link>
            )}
            <Link
              to="/wishlist"
              className="flex items-center gap-3 py-3 px-4 text-base font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <Heart size={20} />
              我的收藏
              {wishlistCount > 0 && (
                <span className="ml-auto text-sm text-zinc-500">{wishlistCount}</span>
              )}
            </Link>
            <Link
              to="/compare"
              className="flex items-center gap-3 py-3 px-4 text-base font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <Columns size={20} />
              商品对比
              {compareCount > 0 && (
                <span className="ml-auto text-sm text-zinc-500">{compareCount}</span>
              )}
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-3 py-3 px-4 text-base font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <ShoppingCart size={20} />
              购物车
              {cartCount > 0 && (
                <span className="ml-auto text-sm text-zinc-500">{cartCount}</span>
              )}
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 py-3 px-4 bg-forest-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-white font-medium">
                    {user?.username?.charAt(0) || user?.email?.charAt(0) || '用'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{user?.username || user?.email}</p>
                    <p className="text-xs text-zinc-500">会员用户</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-3 px-4 text-center font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-3 px-4 text-center font-medium text-zinc-700 bg-white rounded-lg hover:bg-zinc-50 transition-colors border border-zinc-200"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="py-3 px-4 text-center font-medium text-white bg-forest-700 rounded-lg hover:bg-forest-800 transition-colors"
                >
                  注册账号
                </Link>
              </>
            )}
            <Link
              to="/products"
              className="py-3 px-4 text-center font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
            >
              选购产品
            </Link>
          </div>
        </div>
      </div>

      {/* 购物车抽屉 */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

import { Routes, Route, useLocation, Link, useOutlet } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import Message from './pages/Message.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import Account from './pages/Account.jsx'
import Search from './pages/Search.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Toast from './components/Toast.jsx'
import BackToTop from './components/BackToTop.jsx'
import { AppProvider, useToast } from './store/AppContext.jsx'
import Service from './pages/Service.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'
import Compare from './pages/Compare.jsx'
import Story from './pages/Story.jsx'
import Inspiration from './pages/Inspiration.jsx'
import CouponCenter from './pages/CouponCenter.jsx'
import RoomSets from './pages/RoomSets.jsx'

/**
 * 404 页面组件
 * 当路由不匹配时显示
 */
function NotFound() {
  return (
    <div className="pt-30 min-h-[60dvh] flex flex-col items-center justify-center px-6 text-center bg-bone-50">
      <div className="text-7xl font-bold text-forest-700 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-3">页面未找到</h1>
      <p className="text-zinc-600 mb-8 max-w-md">您访问的页面不存在或已被移除，请返回首页继续浏览。</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}

/**
 * Toast 容器组件
 * 用于在 App 内部使用 useToast Hook
 */
function ToastContainer() {
  const { toast, hideToast } = useToast()
  return <Toast toast={toast} onClose={hideToast} />
}

/**
 * 根组件内容
 */
function AppContent() {
  const location = useLocation()
  const mainRef = useRef(null)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  useEffect(() => {
    if (mainRef.current) {
      // 仅使用 opacity 进行页面过渡，避免 transform 破坏子元素的 fixed 定位
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-dvh flex flex-col bg-bone-50 overflow-x-hidden">
      <ScrollToTop />
      <ToastContainer />
      {!isAuthPage && <Navbar />}
      <main ref={mainRef} key={location.pathname} className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/message" element={<Message />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service" element={<Service />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/story" element={<Story />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/coupons" element={<CouponCenter />} />
          <Route path="/room-sets" element={<RoomSets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
        {!isAuthPage && <BackToTop />}
        {!isAuthPage && <Footer />}
    </div>
  )
}

/**
 * 根组件
 * 配置路由和全局布局
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App

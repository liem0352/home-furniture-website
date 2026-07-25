import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

/**
 * 应用全局状态 Context
 * 管理购物车、收藏、用户信息、Toast 通知等全局状态
 */
const AppContext = createContext(null)

/**
 * 初始状态
 */
const initialState = {
  cart: [],
  wishlist: [],
  compare: [],
  user: null,
  orders: [],
  coupons: [],
  toast: null,
  recentlyViewed: [],
}

/**
 * 从 localStorage 加载持久化数据
 */
const loadFromStorage = () => {
  try {
    const cart = localStorage.getItem('jm_cart')
    const wishlist = localStorage.getItem('jm_wishlist')
    const compare = localStorage.getItem('jm_compare')
    const user = localStorage.getItem('jm_user')
    const orders = localStorage.getItem('jm_orders')
    const coupons = localStorage.getItem('jm_coupons')
    const recentlyViewed = localStorage.getItem('jm_recently_viewed')
    return {
      cart: cart ? JSON.parse(cart) : [],
      wishlist: wishlist ? JSON.parse(wishlist) : [],
      compare: compare ? JSON.parse(compare) : [],
      user: user ? JSON.parse(user) : null,
      orders: orders ? JSON.parse(orders) : [],
      coupons: coupons ? JSON.parse(coupons) : [],
      toast: null,
      recentlyViewed: recentlyViewed ? JSON.parse(recentlyViewed) : [],
    }
  } catch {
    return initialState
  }
}

/**
 * Reducer 函数
 * 处理各种状态更新动作
 */
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id && item.selectedSpec === action.payload.selectedSpec
      )
      let newCart
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id && item.selectedSpec === action.payload.selectedSpec
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newCart = [...state.cart, { ...action.payload }]
      }
      localStorage.setItem('jm_cart', JSON.stringify(newCart))
      return { ...state, cart: newCart }
    }

    case 'UPDATE_CART_QUANTITY': {
      const newCart = state.cart.map(item =>
        item.id === action.payload.id && item.selectedSpec === action.payload.selectedSpec
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      localStorage.setItem('jm_cart', JSON.stringify(newCart))
      return { ...state, cart: newCart }
    }

    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(
        item => !(item.id === action.payload.id && item.selectedSpec === action.payload.selectedSpec)
      )
      localStorage.setItem('jm_cart', JSON.stringify(newCart))
      return { ...state, cart: newCart }
    }

    case 'CLEAR_CART': {
      localStorage.removeItem('jm_cart')
      return { ...state, cart: [] }
    }

    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.find(item => item.id === action.payload.id)
      if (exists) return state
      const newWishlist = [...state.wishlist, action.payload]
      localStorage.setItem('jm_wishlist', JSON.stringify(newWishlist))
      return { ...state, wishlist: newWishlist }
    }

    case 'REMOVE_FROM_WISHLIST': {
      const newWishlist = state.wishlist.filter(item => item.id !== action.payload.id)
      localStorage.setItem('jm_wishlist', JSON.stringify(newWishlist))
      return { ...state, wishlist: newWishlist }
    }

    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.find(item => item.id === action.payload.id)
      let newWishlist
      if (exists) {
        newWishlist = state.wishlist.filter(item => item.id !== action.payload.id)
      } else {
        newWishlist = [...state.wishlist, action.payload]
      }
      localStorage.setItem('jm_wishlist', JSON.stringify(newWishlist))
      return { ...state, wishlist: newWishlist }
    }

    case 'ADD_TO_COMPARE': {
      const exists = state.compare.find(item => item.id === action.payload.id)
      if (exists) return state
      if (state.compare.length >= 4) {
        return state
      }
      const newCompare = [...state.compare, action.payload]
      localStorage.setItem('jm_compare', JSON.stringify(newCompare))
      return { ...state, compare: newCompare }
    }

    case 'REMOVE_FROM_COMPARE': {
      const newCompare = state.compare.filter(item => item.id !== action.payload.id)
      localStorage.setItem('jm_compare', JSON.stringify(newCompare))
      return { ...state, compare: newCompare }
    }

    case 'CLEAR_COMPARE': {
      localStorage.removeItem('jm_compare')
      return { ...state, compare: [] }
    }

    case 'ADD_COUPON': {
      const exists = state.coupons.find(item => item.id === action.payload.id)
      if (exists) return state
      const newCoupons = [...state.coupons, action.payload]
      localStorage.setItem('jm_coupons', JSON.stringify(newCoupons))
      return { ...state, coupons: newCoupons }
    }

    case 'USE_COUPON': {
      const newCoupons = state.coupons.map(coupon =>
        coupon.id === action.payload.id
          ? { ...coupon, used: true, usedTime: new Date().toISOString() }
          : coupon
      )
      localStorage.setItem('jm_coupons', JSON.stringify(newCoupons))
      return { ...state, coupons: newCoupons }
    }

    case 'REMOVE_COUPON': {
      const newCoupons = state.coupons.filter(item => item.id !== action.payload.id)
      localStorage.setItem('jm_coupons', JSON.stringify(newCoupons))
      return { ...state, coupons: newCoupons }
    }

    case 'SET_USER': {
      if (action.payload) {
        localStorage.setItem('jm_user', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('jm_user')
      }
      return { ...state, user: action.payload }
    }

    case 'LOGOUT': {
      localStorage.removeItem('jm_user')
      return { ...state, user: null }
    }

    case 'PLACE_ORDER': {
      const newOrder = {
        id: Date.now(),
        orderNo: 'JM' + Date.now().toString().slice(-10),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        shipping: action.payload.shipping,
        discount: action.payload.discount,
        finalAmount: action.payload.finalAmount,
        shippingInfo: action.payload.shippingInfo,
        paymentMethod: action.payload.paymentMethod,
        status: 'pending',
        statusText: '待付款',
        createTime: new Date().toISOString(),
      }
      const newOrders = [newOrder, ...state.orders]
      localStorage.setItem('jm_orders', JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }

    case 'UPDATE_ORDER_STATUS': {
      const newOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status, statusText: action.payload.statusText }
          : order
      )
      localStorage.setItem('jm_orders', JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }

    case 'CANCEL_ORDER': {
      const newOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? { ...order, status: 'cancelled', statusText: '已取消' }
          : order
      )
      localStorage.setItem('jm_orders', JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }

    case 'SHOW_TOAST': {
      return {
        ...state,
        toast: {
          id: Date.now(),
          message: action.payload.message,
          type: action.payload.type || 'success',
          duration: action.payload.duration || 3000,
        },
      }
    }

    case 'HIDE_TOAST': {
      return { ...state, toast: null }
    }

    case 'ADD_RECENTLY_VIEWED': {
      const exists = state.recentlyViewed.find(item => item.id === action.payload.id)
      let newRecentlyViewed
      if (exists) {
        newRecentlyViewed = [
          action.payload,
          ...state.recentlyViewed.filter(item => item.id !== action.payload.id)
        ].slice(0, 20)
      } else {
        newRecentlyViewed = [action.payload, ...state.recentlyViewed].slice(0, 20)
      }
      localStorage.setItem('jm_recently_viewed', JSON.stringify(newRecentlyViewed))
      return { ...state, recentlyViewed: newRecentlyViewed }
    }

    case 'CLEAR_RECENTLY_VIEWED': {
      localStorage.removeItem('jm_recently_viewed')
      return { ...state, recentlyViewed: [] }
    }

    default:
      return state
  }
}

/**
 * AppProvider 组件
 * 包裹应用，提供全局状态
 */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, loadFromStorage)

  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' })
      }, state.toast.duration)
      return () => clearTimeout(timer)
    }
  }, [state.toast])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * useApp Hook
 * 获取全局状态和 dispatch 方法
 */
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

/**
 * useCart Hook
 * 购物车相关操作
 */
export function useCart() {
  const { state, dispatch } = useApp()

  const addToCart = (product, quantity = 1, selectedSpec = 'default') => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        selectedSpec,
      },
    })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已加入购物车', type: 'success' },
    })
  }

  const updateQuantity = (id, selectedSpec, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, selectedSpec, quantity } })
  }

  const removeFromCart = (id, selectedSpec) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, selectedSpec } })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已从购物车移除', type: 'info' },
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cart: state.cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  }
}

/**
 * useWishlist Hook
 * 收藏相关操作
 */
export function useWishlist() {
  const { state, dispatch } = useApp()

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已添加到收藏', type: 'success' },
    })
  }

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { id } })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已取消收藏', type: 'info' },
    })
  }

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product })
    const exists = state.wishlist.find(item => item.id === product.id)
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: exists ? '已取消收藏' : '已添加到收藏', type: 'success' },
    })
  }

  const isInWishlist = (id) => {
    return state.wishlist.some(item => item.id === id)
  }

  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: state.wishlist.length,
  }
}

/**
 * useCompare Hook
 * 产品对比相关操作
 */
export function useCompare() {
  const { state, dispatch } = useApp()

  const addToCompare = (product) => {
    if (state.compare.length >= 4) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: '最多只能对比 4 个商品', type: 'error' },
      })
      return false
    }
    const exists = state.compare.find(item => item.id === product.id)
    if (exists) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: '该商品已在对比列表中', type: 'info' },
      })
      return false
    }
    dispatch({ type: 'ADD_TO_COMPARE', payload: product })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已添加到对比列表', type: 'success' },
    })
    return true
  }

  const removeFromCompare = (id) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: { id } })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已从对比列表移除', type: 'info' },
    })
  }

  const clearCompare = () => {
    dispatch({ type: 'CLEAR_COMPARE' })
  }

  const isInCompare = (id) => {
    return state.compare.some(item => item.id === id)
  }

  return {
    compare: state.compare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: state.compare.length,
  }
}

/**
 * useCoupons Hook
 * 优惠券相关操作
 */
export function useCoupons() {
  const { state, dispatch } = useApp()

  const addCoupon = (coupon) => {
    dispatch({ type: 'ADD_COUPON', payload: coupon })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '优惠券领取成功', type: 'success' },
    })
  }

  const useCoupon = (id) => {
    dispatch({ type: 'USE_COUPON', payload: { id } })
  }

  const removeCoupon = (id) => {
    dispatch({ type: 'REMOVE_COUPON', payload: { id } })
  }

  const availableCoupons = state.coupons.filter(coupon => !coupon.used && new Date(coupon.expireTime) > new Date())
  const usedCoupons = state.coupons.filter(coupon => coupon.used)
  const expiredCoupons = state.coupons.filter(coupon => !coupon.used && new Date(coupon.expireTime) <= new Date())

  return {
    coupons: state.coupons,
    addCoupon,
    useCoupon,
    removeCoupon,
    availableCoupons,
    usedCoupons,
    expiredCoupons,
    couponCount: state.coupons.length,
    availableCount: availableCoupons.length,
  }
}

/**
 * useAuth Hook
 * 用户认证相关操作
 */
export function useAuth() {
  const { state, dispatch } = useApp()

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '登录成功', type: 'success' },
    })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '已退出登录', type: 'info' },
    })
  }

  const register = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '注册成功', type: 'success' },
    })
  }

  return {
    user: state.user,
    isLoggedIn: !!state.user,
    login,
    logout,
    register,
  }
}

/**
 * useToast Hook
 * Toast 通知相关操作
 */
export function useToast() {
  const { state, dispatch } = useApp()

  const showToast = (message, type = 'success', duration = 3000) => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, type, duration } })
  }

  const hideToast = () => {
    dispatch({ type: 'HIDE_TOAST' })
  }

  return {
    toast: state.toast,
    showToast,
    hideToast,
  }
}

/**
 * useOrders Hook
 * 订单相关操作
 */
export function useOrders() {
  const { state, dispatch } = useApp()

  const placeOrder = (orderData) => {
    dispatch({
      type: 'PLACE_ORDER',
      payload: orderData,
    })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '下单成功', type: 'success' },
    })
  }

  const updateOrderStatus = (id, status, statusText) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { id, status, statusText },
    })
  }

  const cancelOrder = (id) => {
    dispatch({
      type: 'CANCEL_ORDER',
      payload: { id },
    })
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message: '订单已取消', type: 'info' },
    })
  }

  const getOrderById = (id) => {
    return state.orders.find(order => order.id === parseInt(id) || order.orderNo === id)
  }

  const getOrdersByStatus = (status) => {
    if (status === 'all') return state.orders
    return state.orders.filter(order => order.status === status)
  }

  return {
    orders: state.orders,
    placeOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
    getOrdersByStatus,
    orderCount: state.orders.length,
  }
}

/**
 * useRecentlyViewed Hook
 * 最近浏览记录相关操作
 */
export function useRecentlyViewed() {
  const { state, dispatch } = useApp()

  const addToRecentlyViewed = useCallback((product) => {
    dispatch({
      type: 'ADD_RECENTLY_VIEWED',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    })
  }, [dispatch])

  const clearRecentlyViewed = () => {
    dispatch({ type: 'CLEAR_RECENTLY_VIEWED' })
  }

  return {
    recentlyViewed: state.recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    recentlyViewedCount: state.recentlyViewed.length,
  }
}

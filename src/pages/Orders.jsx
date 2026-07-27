import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  CaretRight,
  ShoppingBag,
} from '@phosphor-icons/react'
import { useOrders, useAuth } from '../store/AppContext.jsx'
import BackToTop from '../components/BackToTop.jsx'
import { useNavigate } from 'react-router-dom'

/**
 * 订单列表页面
 * 展示用户的所有订单，支持按状态筛选
 */
export default function Orders() {
  /**
   * 设置页面标题，提升SEO和用户体验
   */
  useEffect(() => {
    document.title = '我的订单 | 精美家居'
  }, [])

  const { orders, cancelOrder } = useOrders()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('all')

  /**
   * 订单状态标签配置
   */
  const statusTabs = [
    { id: 'all', name: '全部订单', icon: Package },
    { id: 'pending', name: '待付款', icon: Clock },
    { id: 'processing', name: '待发货', icon: Package },
    { id: 'shipped', name: '配送中', icon: Truck },
    { id: 'completed', name: '已完成', icon: CheckCircle },
    { id: 'cancelled', name: '已取消', icon: XCircle },
  ]

  /**
   * 筛选订单
   */
  const filteredOrders = activeStatus === 'all'
    ? orders
    : orders.filter(order => order.status === activeStatus)

  /**
   * 格式化日期
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * 获取订单状态对应的颜色
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-amber-600 bg-amber-50'
      case 'processing':
        return 'text-blue-600 bg-blue-50'
      case 'shipped':
        return 'text-purple-600 bg-purple-50'
      case 'completed':
        return 'text-forest-600 bg-forest-50'
      case 'cancelled':
        return 'text-zinc-500 bg-zinc-100'
      default:
        return 'text-zinc-600 bg-zinc-100'
    }
  }

  /**
   * 未登录状态
   */
  if (!isLoggedIn) {
    return (
      <div className="pt-30 pb-section bg-bone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-forest-50 flex items-center justify-center">
              <ShoppingBag size={40} className="text-forest-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">请先登录</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              登录后可查看您的订单记录
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
            >
              去登录
            </Link>
          </div>
        </div>
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="pt-30 pb-section bg-bone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">我的订单</h1>
          <p className="text-zinc-500">共 {orders.length} 个订单</p>
        </div>

        {/* 状态筛选 */}
        <div className="bg-white rounded-card shadow-soft p-4 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStatus(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeStatus === tab.id
                    ? 'bg-forest-700 text-white'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* 订单列表 */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-card shadow-soft overflow-hidden"
              >
                {/* 订单头部 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-zinc-100 bg-zinc-50/50">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-zinc-500">
                      订单号：
                      <span className="text-zinc-700 font-medium">{order.orderNo}</span>
                    </span>
                    <span className="text-zinc-400 hidden sm:inline">|</span>
                    <span className="text-zinc-500">
                      {formatDate(order.createTime)}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(order.status)}`}>
                    {order.statusText}
                  </span>
                </div>

                {/* 订单商品 */}
                <div className="p-5">
                  <div className="space-y-4">
                    {order.items.slice(0, 2).map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSpec}`}
                        className="flex gap-4"
                      >
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-zinc-100"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-base font-medium text-zinc-900 hover:text-forest-700 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-500">x {item.quantity}</span>
                            <span className="text-base font-bold text-forest-700">
                              ¥{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-zinc-500 text-center pt-2">
                        还有 {order.items.length - 2} 件商品...
                      </p>
                    )}
                  </div>
                </div>

                {/* 订单底部 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-t border-zinc-100 bg-zinc-50/30">
                  <div className="text-sm text-zinc-600">
                    共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品，
                    实付：
                    <span className="text-xl font-bold text-forest-700 ml-1">
                      ¥{order.finalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-4 py-2 text-sm text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                        >
                          取消订单
                        </button>
                        <button className="px-5 py-2 text-sm bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors">
                          立即付款
                        </button>
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <button className="px-5 py-2 text-sm bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors">
                        确认收货
                      </button>
                    )}
                    {order.status === 'completed' && (
                      <button className="px-4 py-2 text-sm text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                        评价晒单
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm text-forest-700 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors"
                    >
                      查看详情
                      <CaretRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card shadow-soft p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
              <Package size={32} className="text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">暂无订单</h3>
            <p className="text-zinc-500 mb-6">快去挑选心仪的家具吧</p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-colors"
            >
              去购物
            </Link>
          </div>
        )}
      </div>

      <BackToTop />
    </div>
  )
}

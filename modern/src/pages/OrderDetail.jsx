import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
  Receipt,
} from '@phosphor-icons/react'
import { useOrders } from '../store/AppContext.jsx'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 订单详情页面
 * 展示订单的详细信息，包括商品、收货地址、金额等
 */
export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOrderById, cancelOrder } = useOrders()

  const order = getOrderById(id)

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
      second: '2-digit',
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
   * 获取支付方式名称
   */
  const getPaymentMethodName = (method) => {
    const methods = {
      wechat: '微信支付',
      alipay: '支付宝',
      bank: '银行卡',
    }
    return methods[method] || method
  }

  /**
   * 订单不存在
   */
  if (!order) {
    return (
      <div className="pt-30 pb-section bg-bone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
              <Package size={40} className="text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">订单不存在</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              您查看的订单不存在或已被删除
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
            >
              返回订单列表
            </button>
          </div>
        </div>
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="pt-30 pb-section bg-bone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-700 mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-zinc-900">订单详情</h1>
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusColor(order.status)}`}>
              {order.statusText}
            </span>
          </div>
        </div>

        {/* 订单状态进度 */}
        <div className="bg-white rounded-card shadow-soft p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { status: 'pending', icon: Clock, label: '提交订单' },
              { status: 'processing', icon: Package, label: '备货中' },
              { status: 'shipped', icon: Truck, label: '配送中' },
              { status: 'completed', icon: CheckCircle, label: '已完成' },
            ].map((step, index) => {
              const statusOrder = ['pending', 'processing', 'shipped', 'completed']
              const currentIndex = statusOrder.indexOf(order.status)
              const stepIndex = statusOrder.indexOf(step.status)
              const isActive = stepIndex <= currentIndex && order.status !== 'cancelled'

              return (
                <div key={step.status} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isActive
                        ? 'bg-forest-600 text-white'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <step.icon size={22} />
                  </div>
                  <span className={`text-xs sm:text-sm ${isActive ? 'text-forest-700 font-medium' : 'text-zinc-400'}`}>
                    {step.label}
                  </span>
                  {index < 3 && (
                    <div
                      className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                        isActive && stepIndex < currentIndex
                          ? 'bg-forest-600'
                          : 'bg-zinc-200'
                      }`}
                      style={{ display: 'none' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 收货地址 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-forest-600" />
                收货地址
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-zinc-400" />
                  <span className="text-zinc-700">{order.shippingInfo.name}</span>
                  <span className="text-zinc-500">
                    <Phone size={14} className="inline mr-1" />
                    {order.shippingInfo.phone}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-zinc-400 mt-0.5" />
                  <p className="text-zinc-700">
                    {order.shippingInfo.province} {order.shippingInfo.city} {order.shippingInfo.district}
                    <br />
                    {order.shippingInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* 商品清单 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Package size={20} className="text-forest-600" />
                商品信息
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSpec}`}
                    className="flex gap-4 py-4 border-b border-zinc-100 last:border-b-0 last:pb-0"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-zinc-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-base font-medium text-zinc-900 hover:text-forest-700 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.selectedSpec && item.selectedSpec !== 'default' && (
                          <p className="text-sm text-zinc-500 mt-1">
                            规格：{item.selectedSpec}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500">x {item.quantity}</span>
                        <span className="text-base font-bold text-forest-700">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 订单信息 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Receipt size={20} className="text-forest-600" />
                订单信息
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-zinc-100">
                  <span className="text-zinc-500">订单编号</span>
                  <span className="text-zinc-900 font-medium">{order.orderNo}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-100">
                  <span className="text-zinc-500">下单时间</span>
                  <span className="text-zinc-900">{formatDate(order.createTime)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-100">
                  <span className="text-zinc-500">支付方式</span>
                  <span className="text-zinc-900 flex items-center gap-1">
                    <CreditCard size={14} />
                    {getPaymentMethodName(order.paymentMethod)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-100">
                  <span className="text-zinc-500">订单状态</span>
                  <span className="text-zinc-900">{order.statusText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card shadow-soft p-6 sticky top-32">
              <h3 className="text-lg font-bold text-zinc-900 mb-6">订单金额</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-zinc-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">商品总价</span>
                  <span className="text-zinc-900">¥{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">运费</span>
                  <span className={order.shipping === 0 ? 'text-forest-600' : 'text-zinc-900'}>
                    {order.shipping === 0 ? '免运费' : `¥${order.shipping}`}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">优惠</span>
                    <span className="text-amber-600">-¥{order.discount}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-base font-medium text-zinc-900">实付金额</span>
                <span className="text-2xl font-bold text-forest-700">
                  ¥{order.finalAmount.toLocaleString()}
                </span>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <>
                    <button className="w-full py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all">
                      立即付款
                    </button>
                    <button
                      onClick={() => {
                        cancelOrder(order.id)
                      }}
                      className="w-full py-3 bg-white text-zinc-700 font-medium rounded-button border border-zinc-200 hover:bg-zinc-50 transition-all"
                    >
                      取消订单
                    </button>
                  </>
                )}
                {order.status === 'shipped' && (
                  <button className="w-full py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all">
                    确认收货
                  </button>
                )}
                {order.status === 'completed' && (
                  <button className="w-full py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all">
                    评价晒单
                  </button>
                )}
                <button
                  onClick={() => navigate('/products')}
                  className="w-full py-3 bg-white text-forest-700 font-medium rounded-button border border-forest-200 hover:bg-forest-50 transition-all"
                >
                  继续购物
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Package,
  Heart,
  MapPin,
  Gear,
  CreditCard,
  Gift,
  Headphones,
  SignOut,
  CaretRight,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  Pencil,
  Envelope,
  Phone,
  Calendar,
} from '@phosphor-icons/react'
import { useAuth, useOrders, useWishlist, useCart, useCoupons } from '../store/AppContext.jsx'
import BackToTop from '../components/BackToTop.jsx'

/**
 * 用户中心页面
 * 展示用户信息、订单统计、收藏等个人中心内容
 */
export default function Account() {
  const { user, isLoggedIn, logout } = useAuth()
  const { orders, orderCount } = useOrders()
  const { wishlistCount } = useWishlist()
  const { cartCount } = useCart()
  const { availableCount } = useCoupons()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  /**
   * 侧边栏菜单
   */
  const menuItems = [
    { id: 'profile', name: '个人信息', icon: User },
    { id: 'orders', name: '我的订单', icon: Package, count: orderCount },
    { id: 'wishlist', name: '我的收藏', icon: Heart, count: wishlistCount, link: '/wishlist' },
    { id: 'cart', name: '购物车', icon: ShoppingBag, count: cartCount, link: '/cart' },
    { id: 'address', name: '收货地址', icon: MapPin },
    { id: 'coupon', name: '优惠券', icon: Gift, count: availableCount, link: '/coupons' },
    { id: 'settings', name: '账户设置', icon: Gear },
    { id: 'help', name: '帮助中心', icon: Headphones },
  ]

  /**
   * 订单状态快捷入口
   */
  const orderQuickLinks = [
    { status: 'pending', name: '待付款', icon: CreditCard, count: orders.filter(o => o.status === 'pending').length },
    { status: 'processing', name: '待发货', icon: Package, count: orders.filter(o => o.status === 'processing').length },
    { status: 'shipped', name: '待收货', icon: Truck, count: orders.filter(o => o.status === 'shipped').length },
    { status: 'completed', name: '待评价', icon: CheckCircle, count: orders.filter(o => o.status === 'completed').length },
  ]

  /**
   * 处理退出登录
   */
  const handleLogout = () => {
    logout()
    navigate('/')
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
              <User size={40} className="text-forest-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">请先登录</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              登录后可查看您的订单、收藏和个人信息
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-all shadow-soft"
              >
                立即登录
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-forest-700 font-medium rounded-button border border-forest-200 hover:bg-forest-50 transition-all"
              >
                注册账号
              </Link>
            </div>
          </div>
        </div>
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="pt-30 pb-section bg-bone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧菜单 */}
          <div className="lg:col-span-1">
            {/* 用户卡片 */}
            <div className="bg-white rounded-card shadow-soft p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.username?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">{user?.username}</h3>
                  <p className="text-sm text-zinc-500">普通会员</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2">
                  <div className="text-lg font-bold text-zinc-900">{orderCount}</div>
                  <div className="text-xs text-zinc-500">订单</div>
                </div>
                <div className="p-2">
                  <div className="text-lg font-bold text-zinc-900">{wishlistCount}</div>
                  <div className="text-xs text-zinc-500">收藏</div>
                </div>
                <div className="p-2">
                  <div className="text-lg font-bold text-zinc-900">{availableCount}</div>
                  <div className="text-xs text-zinc-500">优惠券</div>
                </div>
              </div>
            </div>

            {/* 菜单列表 */}
            <div className="bg-white rounded-card shadow-soft overflow-hidden">
              {menuItems.map((item) => (
                item.link ? (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="flex items-center justify-between px-6 py-4 text-zinc-700 hover:bg-forest-50 hover:text-forest-700 transition-colors border-b border-zinc-50 last:border-b-0"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.name}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.count > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <CaretRight size={16} className="text-zinc-400" />
                    </span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 transition-colors border-b border-zinc-50 last:border-b-0 text-left ${
                      activeTab === item.id
                        ? 'bg-forest-50 text-forest-700 font-medium'
                        : 'text-zinc-700 hover:bg-forest-50 hover:text-forest-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.name}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.count > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <CaretRight size={16} className="text-zinc-400" />
                    </span>
                  </button>
                )
              ))}

              {/* 退出登录 */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-6 py-4 text-red-500 hover:bg-red-50 transition-colors border-t border-zinc-100"
              >
                <span className="flex items-center gap-3">
                  <SignOut size={18} />
                  退出登录
                </span>
                <CaretRight size={16} className="text-red-300" />
              </button>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 订单快捷入口 */}
            <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Package size={20} className="text-forest-600" />
                  我的订单
                </h2>
                <Link
                  to="/orders"
                  className="text-sm text-forest-700 hover:underline flex items-center gap-1"
                >
                  查看全部
                  <CaretRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {orderQuickLinks.map((item) => (
                  <Link
                    key={item.status}
                    to="/orders"
                    className="flex flex-col items-center p-4 rounded-xl bg-zinc-50 hover:bg-forest-50 transition-colors group"
                  >
                    <div className="relative mb-3">
                      <item.icon size={28} className="text-zinc-500 group-hover:text-forest-600 transition-colors" />
                      {item.count > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-zinc-600 group-hover:text-forest-700 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 个人信息 */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <User size={20} className="text-forest-600" />
                  个人信息
                </h2>

                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center text-white text-4xl font-bold mb-4">
                      {user?.username?.charAt(0) || 'U'}
                    </div>
                    <button className="px-4 py-2 text-sm text-forest-700 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors flex items-center gap-2">
                      <Pencil size={14} />
                      更换头像
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-1.5">用户名</label>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-900 font-medium">{user?.username}</span>
                        <Pencil size={14} className="text-zinc-400 cursor-pointer hover:text-forest-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-1.5">
                        <Envelope size={14} className="inline mr-1" />
                        邮箱
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-900">{user?.email || '未设置'}</span>
                        <Pencil size={14} className="text-zinc-400 cursor-pointer hover:text-forest-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-1.5">
                        <Phone size={14} className="inline mr-1" />
                        手机号
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-900">{user?.phone || '未设置'}</span>
                        <Pencil size={14} className="text-zinc-400 cursor-pointer hover:text-forest-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-1.5">
                        <Calendar size={14} className="inline mr-1" />
                        注册时间
                      </label>
                      <span className="text-zinc-900">2024-01-15</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <h3 className="text-base font-semibold text-zinc-900 mb-4">账户安全</h3>
                  <div className="space-y-3">
                    {[
                      { name: '登录密码', desc: '建议定期更换密码，保证账户安全', action: '修改' },
                      { name: '支付密码', desc: '用于确认订单支付，保护资金安全', action: '设置' },
                      { name: '手机绑定', desc: '已绑定手机，可用于找回密码', action: '更换' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{item.name}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">{item.desc}</div>
                        </div>
                        <button className="px-4 py-1.5 text-sm text-forest-700 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors">
                          {item.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 我的订单 - Tab 内容 */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Package size={20} className="text-forest-600" />
                    全部订单
                  </h2>
                </div>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="border border-zinc-100 rounded-xl p-4 hover:border-forest-200 transition-colors cursor-pointer"
                        onClick={() => navigate(`/order/${order.id}`)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-zinc-500">订单号：{order.orderNo}</span>
                          <span className="text-sm text-forest-600 font-medium">{order.statusText}</span>
                        </div>
                        <div className="flex gap-4">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={`${item.id}-${item.selectedSpec}`}
                              className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          <div className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-zinc-700 line-clamp-1">
                              {order.items.map(i => i.name).join('、')}
                            </p>
                            <p className="text-sm font-bold text-forest-700">
                              共 {order.items.reduce((s, i) => s + i.quantity, 0)} 件 实付 ¥{order.finalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/orders"
                      className="block w-full py-3 text-center text-sm text-forest-700 bg-forest-50 rounded-xl hover:bg-forest-100 transition-colors"
                    >
                      查看全部订单
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Package size={28} className="text-zinc-400" />
                    </div>
                    <p className="text-zinc-500">暂无订单</p>
                  </div>
                )}
              </div>
            )}

            {/* 收货地址 */}
            {activeTab === 'address' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <MapPin size={20} className="text-forest-600" />
                    收货地址
                  </h2>
                  <button className="px-4 py-2 text-sm bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors">
                    新增地址
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: '张三', phone: '138****8888', address: '浙江省杭州市西湖区文三路 123 号 1 单元 101 室', isDefault: true },
                    { name: '李四', phone: '139****9999', address: '上海市浦东新区陆家嘴环路 456 号 2 单元 202 室', isDefault: false },
                  ].map((addr, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-xl border transition-colors cursor-pointer ${
                        addr.isDefault
                          ? 'border-forest-300 bg-forest-50/50'
                          : 'border-zinc-200 hover:border-forest-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-zinc-900">{addr.name}</span>
                          <span className="text-zinc-600">{addr.phone}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 text-xs bg-forest-600 text-white rounded">
                              默认
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="text-sm text-zinc-500 hover:text-forest-700 transition-colors">
                            编辑
                          </button>
                          <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
                            删除
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 优惠券 */}
            {activeTab === 'coupon' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <Gift size={20} className="text-forest-600" />
                  我的优惠券
                </h2>
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
                    <Gift size={32} className="text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-2">暂无可用优惠券</h3>
                  <p className="text-zinc-500 mb-6">关注活动，领取更多优惠</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-forest-700 text-white rounded-button hover:bg-forest-800 transition-colors"
                  >
                    去逛逛
                  </Link>
                </div>
              </div>
            )}

            {/* 账户设置 */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <Gear size={20} className="text-forest-600" />
                  账户设置
                </h2>
                <div className="space-y-3">
                  {[
                    { name: '消息通知', desc: '订单状态、优惠活动等消息提醒' },
                    { name: '隐私设置', desc: '管理您的个人信息和隐私偏好' },
                    { name: '地址管理', desc: '管理收货地址' },
                    { name: '关于我们', desc: '了解精美家居品牌故事' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <span className="text-zinc-900">{item.name}</span>
                      <CaretRight size={18} className="text-zinc-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 帮助中心 */}
            {activeTab === 'help' && (
              <div className="bg-white rounded-card shadow-soft p-6 md:p-8">
                <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <Headphones size={20} className="text-forest-600" />
                  帮助中心
                </h2>
                <div className="space-y-3">
                  {[
                    { name: '购物指南', desc: '购物流程、支付方式、配送说明' },
                    { name: '售后服务', desc: '退换货政策、维修服务' },
                    { name: '常见问题', desc: '订单、支付、配送常见问题' },
                    { name: '联系客服', desc: '在线客服、客服热线' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-forest-50 transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-zinc-900 font-medium group-hover:text-forest-700 transition-colors">{item.name}</div>
                        <div className="text-sm text-zinc-500 mt-0.5">{item.desc}</div>
                      </div>
                      <CaretRight size={18} className="text-zinc-400 group-hover:text-forest-600 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-forest-50 rounded-xl text-center">
                  <Headphones size={32} className="text-forest-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">客服热线</h3>
                  <p className="text-2xl font-bold text-forest-700">400-888-8888</p>
                  <p className="text-sm text-zinc-500 mt-1">工作时间：9:00 - 21:00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

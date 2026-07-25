import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Ticket,
  Check,
  Clock,
  X,
} from '@phosphor-icons/react'
import { useCoupons, useAuth } from '../store/AppContext.jsx'
import { availableCoupons, formatExpireDate, getDaysRemaining, generateCouponExpireDate } from '../data/coupons.js'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

/**
 * 优惠券中心页面
 * 展示可领取优惠券和用户已领取的优惠券
 */
export default function CouponCenter() {
  const { addCoupon, coupons, availableCoupons: myAvailableCoupons, usedCoupons, expiredCoupons } = useCoupons()
  const { isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState('available')
  const pageRef = useScrollReveal()
  const headerRef = useScrollReveal({ y: 20, duration: 0.6 })
  const couponListRef = useStaggerReveal({ y: 30, stagger: 0.1, duration: 0.6 })

  /**
   * 领取优惠券
   */
  const handleClaimCoupon = (coupon) => {
    if (!isLoggedIn) {
      alert('请先登录后再领取优惠券')
      return
    }

    const alreadyClaimed = coupons.find(c => c.id === coupon.id)
    if (alreadyClaimed) {
      alert('您已领取过该优惠券')
      return
    }

    const newCoupon = {
      ...coupon,
      claimTime: new Date().toISOString(),
      expireTime: generateCouponExpireDate(coupon.expireDays),
      used: false,
    }
    addCoupon(newCoupon)
    alert('领取成功！')
  }

  /**
   * 检查是否已领取
   */
  const isClaimed = (couponId) => {
    return coupons.some(c => c.id === couponId)
  }

  /**
   * 渲染优惠券卡片
   */
  const renderCouponCard = (coupon, type = 'available') => {
    const daysRemaining = coupon.expireTime ? getDaysRemaining(coupon.expireTime) : coupon.expireDays
    const isExpired = daysRemaining <= 0
    const isUsed = coupon.used

    return (
      <div
        key={coupon.id}
        className={`coupon-card relative overflow-hidden rounded-xl bg-white shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
          isExpired || isUsed ? 'opacity-60' : ''
        }`}
      >
        <div className="flex">
          {/* 左侧金额区 */}
          <div className="w-32 md:w-36 flex flex-col items-center justify-center py-6 px-4 bg-forest-600 text-white relative">
            <div className="text-xs opacity-80 mb-1">
              {coupon.type === 'shipping' ? '包邮' : '优惠券'}
            </div>
            <div className="flex items-baseline">
              {coupon.type === 'discount' && (
                <>
                  <span className="text-lg font-medium">¥</span>
                  <span className="text-4xl font-bold">{coupon.value}</span>
                </>
              )}
              {coupon.type === 'shipping' && (
                <span className="text-2xl font-bold">免邮</span>
              )}
            </div>
            <div className="text-xs opacity-80 mt-1">
              {coupon.minAmount > 0 ? `满${coupon.minAmount}元可用` : '无门槛'}
            </div>
            {/* 锯齿装饰 */}
            <div className="absolute top-0 right-0 w-3 h-full">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-forest-600 to-transparent">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute right-0 w-3 h-3 bg-bone-50 rounded-full"
                    style={{ top: `${i * 14 + 4}px`, transform: 'translateX(50%)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                  {coupon.tag}
                </span>
                {isUsed && (
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-xs font-medium rounded">
                    已使用
                  </span>
                )}
                {isExpired && !isUsed && (
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-xs font-medium rounded">
                    已过期
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-zinc-900 mb-1">{coupon.name}</h3>
              <p className="text-sm text-zinc-500">{coupon.description}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Clock size={12} />
                <span>
                  {coupon.expireTime
                    ? `有效期至 ${formatExpireDate(coupon.expireTime)}`
                    : `${coupon.expireDays}天内有效`
                  }
                </span>
              </div>

              {type === 'available' && (
                <button
                  onClick={() => handleClaimCoupon(coupon)}
                  disabled={isClaimed(coupon.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isClaimed(coupon.id)
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      : 'bg-forest-600 text-white hover:bg-forest-700 active:scale-95'
                  }`}
                >
                  {isClaimed(coupon.id) ? '已领取' : '立即领取'}
                </button>
              )}

              {type === 'mine' && !isUsed && !isExpired && (
                <Link
                  to="/products"
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-forest-600 text-white hover:bg-forest-700 transition-all duration-300 active:scale-95"
                >
                  去使用
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'available', label: '可领取', count: availableCoupons.length },
    { id: 'mine', label: '可使用', count: myAvailableCoupons.length },
    { id: 'used', label: '已使用', count: usedCoupons.length },
    { id: 'expired', label: '已过期', count: expiredCoupons.length },
  ]

  return (
    <div ref={pageRef} className="min-h-screen bg-bone-50">
      {/* 页面头部 */}
      <div className="bg-forest-700">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div ref={headerRef}>
            <div className="flex items-center gap-3 mb-4">
              <Link
                to="/account"
                className="inline-flex items-center gap-2 text-forest-200 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                返回用户中心
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-forest-600 flex items-center justify-center">
                <Ticket size={24} className="text-amber-400" weight="duotone" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">优惠券中心</h1>
                <p className="text-forest-200 text-sm mt-1">发现更多优惠，享受品质购物</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Tab 切换 */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-forest-600 text-white'
                  : 'text-zinc-600 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${
                activeTab === tab.id ? 'text-forest-100' : 'text-zinc-400'
              }`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* 优惠券列表 */}
        <div ref={couponListRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {activeTab === 'available' && (
            availableCoupons.length > 0 ? (
              availableCoupons.map((coupon) => renderCouponCard(coupon, 'available'))
            ) : (
              <div className="md:col-span-2 text-center py-20">
                <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ticket size={40} className="text-forest-600" weight="duotone" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">暂无可领取优惠券</h2>
                <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                  敬请期待更多优惠活动
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 active:scale-95"
                >
                  去逛逛
                </Link>
              </div>
            )
          )}

          {activeTab === 'mine' && (
            myAvailableCoupons.length > 0 ? (
              myAvailableCoupons.map((coupon) => renderCouponCard(coupon, 'mine'))
            ) : (
              <div className="md:col-span-2 text-center py-20">
                <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ticket size={40} className="text-forest-600" weight="duotone" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">暂无可用优惠券</h2>
                <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                  快去领取优惠券吧，超值优惠等你来拿
                </p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 active:scale-95"
                >
                  去领取
                </button>
              </div>
            )
          )}

          {activeTab === 'used' && (
            usedCoupons.length > 0 ? (
              usedCoupons.map((coupon) => renderCouponCard(coupon, 'mine'))
            ) : (
              <div className="md:col-span-2 text-center py-20">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-zinc-400" weight="duotone" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">暂无已使用优惠券</h2>
                <p className="text-zinc-500">使用过的优惠券会在这里显示</p>
              </div>
            )
          )}

          {activeTab === 'expired' && (
            expiredCoupons.length > 0 ? (
              expiredCoupons.map((coupon) => renderCouponCard(coupon, 'mine'))
            ) : (
              <div className="md:col-span-2 text-center py-20">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X size={40} className="text-zinc-400" weight="duotone" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">暂无已过期优惠券</h2>
                <p className="text-zinc-500">过期的优惠券会在这里显示</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

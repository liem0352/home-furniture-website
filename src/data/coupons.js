/**
 * 优惠券数据
 * 定义可领取的优惠券信息
 */

export const availableCoupons = [
  {
    id: 'new-user-100',
    name: '新人专享券',
    type: 'discount',
    value: 100,
    minAmount: 500,
    description: '满500元可用',
    expireDays: 30,
    tag: '新人专享',
  },
  {
    id: 'welcome-50',
    name: '欢迎优惠券',
    type: 'discount',
    value: 50,
    minAmount: 300,
    description: '满300元可用',
    expireDays: 15,
    tag: '限时领取',
  },
  {
    id: 'furniture-200',
    name: '家具品类券',
    type: 'discount',
    value: 200,
    minAmount: 2000,
    description: '满2000元可用',
    expireDays: 60,
    tag: '品类专享',
  },
  {
    id: 'vip-500',
    name: 'VIP专属券',
    type: 'discount',
    value: 500,
    minAmount: 5000,
    description: '满5000元可用',
    expireDays: 90,
    tag: '会员专享',
  },
  {
    id: 'free-shipping',
    name: '包邮券',
    type: 'shipping',
    value: 0,
    minAmount: 0,
    description: '全场包邮',
    expireDays: 7,
    tag: '包邮',
  },
]

/**
 * 生成优惠券有效期
 */
export function generateCouponExpireDate(expireDays) {
  const date = new Date()
  date.setDate(date.getDate() + expireDays)
  return date.toISOString()
}

/**
 * 格式化优惠券有效期
 */
export function formatExpireDate(expireTime) {
  const date = new Date(expireTime)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

/**
 * 计算剩余天数
 */
export function getDaysRemaining(expireTime) {
  const now = new Date()
  const expire = new Date(expireTime)
  const diff = expire - now
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

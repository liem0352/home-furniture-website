/**
 * 商品评价数据
 * 定义各产品的用户评价信息
 */

export const reviews = {
  1: [
    {
      id: 1,
      userId: 101,
      username: '张女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Zhang&backgroundColor=166534',
      rating: 5,
      content: '床的质量非常好，实木材质很结实，安装师傅也很专业。北欧风格很漂亮，和我家装修很搭，睡起来很舒服。',
      images: [],
      specs: '1.8米 / 原木色',
      createTime: '2024-01-15',
      useful: 128,
    },
    {
      id: 2,
      userId: 102,
      username: '李先生',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Li&backgroundColor=d97706',
      rating: 4,
      content: '整体不错，实木的质感很好，就是发货稍微慢了一点。客服态度很好，有问必答。推荐购买！',
      images: [],
      specs: '1.5米 / 胡桃色',
      createTime: '2024-01-10',
      useful: 86,
    },
    {
      id: 3,
      userId: 103,
      username: '王女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Wang&backgroundColor=0f766e',
      rating: 5,
      content: '第二次购买了，上次买了主卧的，这次买次卧的。质量一如既往的好，没有异味，环保材质用着放心。',
      images: [],
      specs: '1.5米 / 原木色',
      createTime: '2024-01-05',
      useful: 64,
    },
    {
      id: 4,
      userId: 104,
      username: '陈先生',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Chen&backgroundColor=7c3aed',
      rating: 5,
      content: '床架很稳固，翻身没有异响，静音效果很好。木纹很漂亮，是真正的实木，性价比很高。',
      images: [],
      specs: '2.0米 / 原木色',
      createTime: '2023-12-28',
      useful: 52,
    },
    {
      id: 5,
      userId: 105,
      username: '刘女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Liu&backgroundColor=db2777',
      rating: 4,
      content: '床的样式很好看，质量也不错。就是物流有点慢，等了快一周才到。不过好饭不怕晚，值得等待。',
      images: [],
      specs: '1.8米 / 白色',
      createTime: '2023-12-20',
      useful: 38,
    },
  ],
  2: [
    {
      id: 6,
      userId: 201,
      username: '赵女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Zhao&backgroundColor=166534',
      rating: 5,
      content: '沙发太舒服了！坐感软硬适中，科技布面料手感很好，而且耐脏。家里有小孩也不怕弄脏，一擦就干净。',
      images: [],
      specs: '四人位 / 浅灰色',
      createTime: '2024-01-18',
      useful: 156,
    },
    {
      id: 7,
      userId: 202,
      username: '孙先生',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sun&backgroundColor=d97706',
      rating: 5,
      content: '轻奢风格很大气，放在客厅瞬间提升档次。做工精细，缝线很整齐，框架也很稳固。强烈推荐！',
      images: [],
      specs: 'L型转角 / 墨绿色',
      createTime: '2024-01-12',
      useful: 98,
    },
    {
      id: 8,
      userId: 203,
      username: '周女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Zhou&backgroundColor=0f766e',
      rating: 4,
      content: '沙发质量不错，坐着很舒服。就是颜色比图片稍微深一点，不过也很好看。客服很耐心解答问题。',
      images: [],
      specs: '三人位 / 米白色',
      createTime: '2024-01-08',
      useful: 72,
    },
  ],
  3: [
    {
      id: 9,
      userId: 301,
      username: '吴先生',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Wu&backgroundColor=166534',
      rating: 5,
      content: '岩板餐桌质量超棒！台面很有质感，耐高温，刚出锅的菜直接放上去都没问题。椅子坐着也很舒服。',
      images: [],
      specs: '1.4米 / 雪山白',
      createTime: '2024-01-20',
      useful: 112,
    },
    {
      id: 10,
      userId: 302,
      username: '郑女士',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Zheng&backgroundColor=d97706',
      rating: 5,
      content: '餐桌太好看了，简约现代，岩板台面很有高级感。一家人吃饭很温馨，朋友来都夸好看。',
      images: [],
      specs: '1.6米 / 劳伦黑金',
      createTime: '2024-01-14',
      useful: 88,
    },
  ],
}

/**
 * 获取产品的评价统计
 */
export function getReviewStats(productId) {
  const productReviews = reviews[productId] || []
  if (productReviews.length === 0) {
    return {
      total: 0,
      averageRating: 0,
      ratingDistribution: [0, 0, 0, 0, 0],
      goodRate: 0,
    }
  }

  const total = productReviews.length
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0)
  const averageRating = (sum / total).toFixed(1)

  const ratingDistribution = [0, 0, 0, 0, 0]
  productReviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingDistribution[r.rating - 1]++
    }
  })

  const goodCount = productReviews.filter(r => r.rating >= 4).length
  const goodRate = Math.round((goodCount / total) * 100)

  return {
    total,
    averageRating,
    ratingDistribution,
    goodRate,
  }
}

/**
 * 获取产品的评价列表
 */
export function getProductReviews(productId, page = 1, pageSize = 10) {
  const productReviews = reviews[productId] || []
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    list: productReviews.slice(start, end),
    total: productReviews.length,
    page,
    pageSize,
  }
}

/**
 * 网站导航数据
 * 定义主导航和页脚导航链接
 */
export const navLinks = [
  { label: '首页', path: '/' },
  { label: '产品中心', path: '/products' },
  { label: '全屋搭配', path: '/room-sets' },
  { label: '灵感图集', path: '/inspiration' },
  { label: '品牌故事', path: '/story' },
  { label: '关于我们', path: '/about' },
  { label: '在线留言', path: '/message' },
]

export const footerLinks = {
  products: [
    { label: '全部产品', path: '/products' },
    { label: '卧室家具', path: '/products#bedroom' },
    { label: '客厅家具', path: '/products#living' },
    { label: '餐厅家具', path: '/products#dining' },
    { label: '新品上市', path: '/products' },
  ],
  resources: [
    { label: '全屋搭配', path: '/room-sets' },
    { label: '灵感图集', path: '/inspiration' },
    { label: '品牌故事', path: '/story' },
    { label: '关于我们', path: '/about' },
    { label: '常见问题', path: '/faq' },
  ],
  support: [
    { label: '服务说明', path: '/service' },
    { label: '在线留言', path: '/message' },
    { label: '配送说明', path: '/service#shipping' },
    { label: '退换货政策', path: '/service#return' },
    { label: '联系我们', path: '/contact' },
  ],
  legal: [
    { label: '隐私政策', path: '/privacy' },
    { label: '服务条款', path: '/terms' },
  ],
}

export const contactInfo = {
  phone: '400-888-9999',
  email: 'service@jingmei.com',
  address: '上海市松江区家具产业园区精美路 88 号',
  workHours: '周一至周日 9:00-21:00',
}

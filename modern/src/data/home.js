/**
 * 首页数据
 * 包括 Hero 横幅、特色介绍、客户评价等
 */
export const heroSlides = [
  {
    id: 1,
    title: '品质生活',
    subtitle: '从家开始',
    description: '精选全球优质材料，匠心打造每一件家具，让您的家充满温度与格调。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20modern%20living%20room%20interior%2C%20minimalist%20scandinavian%20design%2C%20wooden%20furniture%2C%20large%20windows%2C%20natural%20light%2C%20green%20plants%2C%20cozy%20sofa%2C%20warm%20ambient%20lighting%2C%20high%20end%20home%20decor%2C%20professional%20interior%20photography&image_size=landscape_16_9',
    ctaText: '探索产品',
    ctaLink: '/products',
  },
  {
    id: 2,
    title: '北欧简约',
    subtitle: '自然之美',
    description: '回归自然的设计理念，将森林气息带入居室，感受宁静舒适的生活方式。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=serene%20bedroom%20with%20oak%20wood%20bed%2C%20white%20linen%20bedding%2C%20potted%20green%20plants%2C%20large%20window%20with%20forest%20view%2C%20morning%20sunlight%2C%20minimalist%20nordic%20style%2C%20peaceful%20atmosphere%2C%20professional%20photography&image_size=landscape_16_9',
    ctaText: '了解更多',
    ctaLink: '/about',
  },
  {
    id: 3,
    title: '品质保证',
    subtitle: '五年质保',
    description: '每一件产品都经过严格品控，提供五年质保服务，让您购物无忧。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=craftsman%20working%20on%20wooden%20furniture%20in%20workshop%2C%20woodworking%20tools%2C%20natural%20oak%20wood%2C%20warm%20lighting%2C%20artisan%20craftsmanship%2C%20attention%20to%20detail%2C%20quality%20control%2C%20professional%20atmosphere&image_size=landscape_16_9',
    ctaText: '查看详情',
    ctaLink: '/about',
  },
]

export const features = [
  {
    id: 1,
    icon: 'Leaf',
    title: '环保材质',
    description: '严选E0级环保板材，绿色健康，为您和家人守护居家空气质量。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=green%20leaf%20on%20natural%20oak%20wood%20surface%2C%20eco%20friendly%20materials%2C%20sustainable%20furniture%2C%20soft%20natural%20lighting%2C%20minimalist%20composition%2C%20environmental%20concept&image_size=landscape_4_3',
  },
  {
    id: 2,
    icon: 'ShieldCheck',
    title: '品质保证',
    description: '五年超长质保，终身维护服务，让您的每一次选择都安心无忧。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=quality%20inspection%20of%20wooden%20furniture%2C%20craftsman%20checking%20detail%2C%20professional%20tools%2C%20workshop%20setting%2C%20warm%20lighting%2C%20precision%20and%20quality%20concept&image_size=landscape_4_3',
  },
  {
    id: 3,
    icon: 'Truck',
    title: '免费配送',
    description: '全国主要城市免费送货上门，专业团队安装，省心省力更省时。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20delivery%20team%20carrying%20furniture%20into%20modern%20home%2C%20uniformed%20workers%2C%20clean%20interior%2C%20friendly%20service%2C%20home%20delivery%20concept&image_size=landscape_4_3',
  },
]

export const testimonials = [
  {
    id: 1,
    name: '林女士',
    role: '设计师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20woman%20interior%20designer%20portrait%2C%20warm%20smile%2C%20natural%20lighting%2C%20modern%20office%20background%2C%20professional%20headshot&image_size=square_hd',
    content: '家具质量非常好，设计感十足，摆在家里瞬间提升了整体格调。客服态度也很好，有问必答。',
    rating: 5,
  },
  {
    id: 2,
    name: '张先生',
    role: '企业高管',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businessman%20portrait%2C%20confident%20smile%2C%20modern%20office%20background%2C%20natural%20lighting%2C%20professional%20headshot&image_size=square_hd',
    content: '对比了很多家，最终选择了精美家居。实物比图片还好看，做工精细，安装师傅也很专业。',
    rating: 5,
  },
  {
    id: 3,
    name: '王女士',
    role: '全职妈妈',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20asian%20woman%20mother%20portrait%2C%20warm%20gentle%20smile%2C%20cozy%20home%20background%2C%20soft%20natural%20lighting%2C%20casual%20lifestyle%20portrait&image_size=square_hd',
    content: '最看重环保材质，精美家居的家具没有异味，给孩子用也放心。款式简约大方，很喜欢。',
    rating: 5,
  },
]

export const stats = [
  { value: 15, suffix: '+', label: '年行业经验', icon: 'award' },
  { value: 50000, suffix: '+', label: '服务家庭', icon: 'users' },
  { value: 98, suffix: '%', label: '好评率', icon: 'star' },
  { value: 5, suffix: '年', label: '品质质保', icon: 'truck' },
]

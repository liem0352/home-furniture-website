/**
 * 产品数据
 * 定义所有产品的信息，包括分类、价格、描述等
 */
export const productCategories = [
  { id: 'all', name: '全部产品' },
  { id: 'bedroom', name: '卧室家具' },
  { id: 'living', name: '客厅家具' },
  { id: 'dining', name: '餐厅家具' },
  { id: 'study', name: '书房家具' },
  { id: 'storage', name: '收纳家具' },
  { id: 'decor', name: '家居饰品' },
]

export const filterOptions = {
  materials: [
    { id: 'solid-wood', name: '实木' },
    { id: 'panel', name: '板式' },
    { id: 'fabric', name: '布艺' },
    { id: 'metal', name: '金属' },
    { id: 'stone', name: '岩板/石材' },
    { id: 'glass', name: '玻璃' },
  ],
  styles: [
    { id: 'nordic', name: '北欧风格' },
    { id: 'modern', name: '现代简约' },
    { id: 'luxury', name: '轻奢风格' },
    { id: 'japanese', name: '日式风格' },
    { id: 'chinese', name: '新中式' },
    { id: 'industrial', name: '工业风' },
  ],
  prices: [
    { id: 'under-1000', name: '1000元以下', min: 0, max: 1000 },
    { id: '1000-3000', name: '1000-3000元', min: 1000, max: 3000 },
    { id: '3000-5000', name: '3000-5000元', min: 3000, max: 5000 },
    { id: '5000-10000', name: '5000-10000元', min: 5000, max: 10000 },
    { id: 'above-10000', name: '10000元以上', min: 10000, max: Infinity },
  ],
}

export const products = [
  {
    id: 1,
    name: '北欧实木双人床',
    category: 'bedroom',
    price: 4299,
    originalPrice: 5299,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20scandinavian%20oak%20wood%20double%20bed%2C%20white%20bedding%2C%20natural%20light%2C%20modern%20bedroom%2C%20green%20plants%2C%20clean%20design%2C%20professional%20product%20photography&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20scandinavian%20oak%20wood%20double%20bed%2C%20white%20bedding%2C%20natural%20light%2C%20modern%20bedroom%2C%20green%20plants%2C%20clean%20design%2C%20professional%20product%20photography&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scandinavian%20oak%20bed%20side%20view%2C%20wood%20grain%20detail%2C%20minimalist%20bedroom%2C%20soft%20morning%20light&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bed%20headboard%20detail%2C%20oak%20wood%20texture%2C%20craftsmanship%20close%20up%2C%20premium%20furniture&image_size=portrait_4_3',
    ],
    description: '精选进口橡木，稳固承重，简约北欧设计风格，为您打造舒适睡眠空间。',
    longDescription: '这款北欧实木双人床采用进口橡木打造，天然木纹清晰美观，手感细腻温润。床架采用榫卯结构，稳固承重可达500kg，静音床板设计让您享受宁静睡眠。简约的北欧设计风格，百搭各种家居风格，为您的卧室增添自然温馨的氛围。',
    features: ['进口橡木', '环保漆面', '静音床板', '五年质保'],
    specs: [
      { name: '尺寸', options: ['1.5米', '1.8米', '2.0米'] },
      { name: '颜色', options: ['原木色', '胡桃色', '白色'] },
    ],
    details: [
      '材质：进口橡木实木框架',
      '尺寸：长210cm x 宽180cm x 高105cm',
      '承重：500kg',
      '漆面：环保水性漆',
      '包装：整装发货，无需安装',
    ],
    isHot: true,
    isNew: false,
    stock: 128,
    sales: 2356,
    material: 'solid-wood',
    style: 'nordic',
  },
  {
    id: 2,
    name: '轻奢布艺沙发',
    category: 'living',
    price: 6899,
    originalPrice: 8999,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20modern%20fabric%20sofa%2C%20light%20gray%2C%20minimalist%20living%20room%2C%20soft%20cushions%2C%20wooden%20floor%2C%20natural%20light%2C%20potted%20plant%2C%20elegant%20interior&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20modern%20fabric%20sofa%2C%20light%20gray%2C%20minimalist%20living%20room%2C%20soft%20cushions%2C%20wooden%20floor%2C%20natural%20light%2C%20potted%20plant%2C%20elegant%20interior&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sofa%20fabric%20texture%20close%20up%2C%20high%20quality%20tech%20fabric%2C%20stitch%20detail%2C%20premium%20furniture&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sofa%20cushion%20detail%2C%20comfortable%20seat%2C%20ergonomic%20design%2C%20soft%20fabric&image_size=portrait_4_3',
    ],
    description: '高密度海绵填充，科技布面料耐脏易清洁，人体工学设计久坐不累。',
    longDescription: '轻奢布艺沙发采用高品质科技布面料，触感柔软亲肤，耐脏易清洁，一擦即净。高密度海绵填充，回弹性好，久坐不塌陷。人体工学设计，贴合人体曲线，给您最舒适的坐感体验。实木框架，稳固耐用，质保十年。',
    features: ['科技布面料', '高密度海绵', '实木框架', '可拆洗'],
    specs: [
      { name: '尺寸', options: ['三人位', '四人位', 'L型转角'] },
      { name: '颜色', options: ['浅灰色', '米白色', '墨绿色'] },
    ],
    details: [
      '面料：科技布（耐磨耐脏）',
      '填充：高密度回弹海绵',
      '框架：进口松木实木',
      '尺寸：长220cm x 宽95cm x 高85cm',
      '重量：约85kg',
    ],
    isHot: true,
    isNew: true,
    stock: 56,
    sales: 1892,
    material: 'fabric',
    style: 'luxury',
  },
  {
    id: 3,
    name: '岩板餐桌椅组合',
    category: 'dining',
    price: 3599,
    originalPrice: 4599,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20slate%20dining%20table%20with%20chairs%2C%20white%20marble%20table%20top%2C%20black%20metal%20legs%2C%20minimalist%20dining%20room%2C%20pendant%20light%2C%20elegant%20interior&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20slate%20dining%20table%20with%20chairs%2C%20white%20marble%20table%20top%2C%20black%20metal%20legs%2C%20minimalist%20dining%20room%2C%20pendant%20light%2C%20elegant%20interior&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slate%20table%20top%20close%20up%2C%20marble%20texture%2C%20high%20end%20furniture%20detail&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dining%20chair%20detail%2C%20fabric%20seat%2C%20metal%20legs%2C%20modern%20design&image_size=portrait_4_3',
    ],
    description: '意大利进口岩板台面，耐高温防刮花，碳素钢框架稳固耐用。',
    longDescription: '岩板餐桌椅组合采用意大利进口岩板台面，莫氏硬度高达6级，耐高温、防刮花、防渗透，易于清洁。碳素钢框架，稳固不晃动。简约现代设计，提升餐厅档次感。一桌六椅，满足家庭聚餐需求。',
    features: ['进口岩板', '碳素钢框架', '防刮耐高温', '一桌六椅'],
    specs: [
      { name: '尺寸', options: ['1.2米', '1.4米', '1.6米'] },
      { name: '颜色', options: ['雪山白', '劳伦黑金', '阿玛尼灰'] },
    ],
    details: [
      '台面：意大利进口岩板，厚度12mm',
      '框架：碳素钢，静电喷塑',
      '椅子：科技布+碳素钢脚',
      '尺寸：长140cm x 宽80cm x 高75cm',
      '承重：300kg',
    ],
    isHot: false,
    isNew: true,
    stock: 89,
    sales: 1567,
    material: 'stone',
    style: 'modern',
  },
  {
    id: 4,
    name: '实木衣柜衣橱',
    category: 'storage',
    price: 5699,
    originalPrice: 6999,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20solid%20wood%20wardrobe%2C%20oak%20color%2C%20sliding%20doors%2C%20minimalist%20bedroom%2C%20natural%20light%2C%20clean%20interior%2C%20storage%20furniture&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20solid%20wood%20wardrobe%2C%20oak%20color%2C%20sliding%20doors%2C%20minimalist%20bedroom%2C%20natural%20light%2C%20clean%20interior%2C%20storage%20furniture&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wardrobe%20interior%20storage%2C%20hanging%20rods%2C%20drawers%2C%20shelves%2C%20organized%20closet&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wood%20grain%20texture%20detail%2C%20oak%20wood%2C%20premium%20furniture%20close%20up&image_size=portrait_4_3',
    ],
    description: '大容量分区收纳，全实木板材，环保水性漆，推拉门设计节省空间。',
    longDescription: '实木衣柜采用全实木板材打造，环保水性漆，无甲醛异味，即装即用。大容量分区收纳，挂衣区、叠放区、抽屉区合理划分，满足不同收纳需求。推拉门设计，节省卧室空间。静音导轨，开关顺畅无声。',
    features: ['全实木', '分区收纳', '推拉门', '环保材质'],
    specs: [
      { name: '尺寸', options: ['1.2米两门', '1.6米两门', '2.0米三门'] },
      { name: '颜色', options: ['原木色', '胡桃色', '白色'] },
    ],
    details: [
      '材质：进口橡木实木',
      '尺寸：宽160cm x 深60cm x 高210cm',
      '结构：推拉门+分区收纳',
      '漆面：环保水性漆',
      '配件：静音导轨、合金拉手',
    ],
    isHot: true,
    isNew: false,
    stock: 42,
    sales: 987,
    material: 'solid-wood',
    style: 'modern',
  },
  {
    id: 5,
    name: '创意装饰画组合',
    category: 'decor',
    price: 899,
    originalPrice: 1299,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20abstract%20wall%20art%20set%2C%203%20piece%20canvas%20paintings%2C%20green%20and%20gold%20botanical%20design%2C%20minimalist%20living%20room%2C%20elegant%20home%20decor&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20abstract%20wall%20art%20set%2C%203%20piece%20canvas%20paintings%2C%20green%20and%20gold%20botanical%20design%2C%20minimalist%20living%20room%2C%20elegant%20home%20decor&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=canvas%20painting%20detail%2C%20high%20definition%20print%2C%20frame%20detail%2C%20premium%20wall%20art&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wall%20art%20in%20bedroom%20setting%2C%20above%20bed%2C%20cozy%20atmosphere%2C%20warm%20lighting&image_size=portrait_4_3',
    ],
    description: '现代简约风格，高清微喷工艺，PS环保外框，多尺寸自由组合。',
    longDescription: '创意装饰画组合采用高清微喷工艺，色彩还原度高，画面清晰细腻。PS环保外框，轻便耐用，防潮防变形。三联组合设计，可根据墙面大小自由调整间距。免打孔安装，轻松搞定墙面装饰。',
    features: ['高清微喷', '环保外框', '多尺寸', '免打孔安装'],
    specs: [
      { name: '尺寸', options: ['小尺寸组合', '中尺寸组合', '大尺寸组合'] },
      { name: '图案', options: ['植物系列', '抽象系列', '风景系列'] },
    ],
    details: [
      '工艺：高清微喷',
      '画芯：防水油画布',
      '外框：PS环保材质',
      '尺寸：单幅40x60cm（三幅组合）',
      '配件：无痕钉、水平仪',
    ],
    isHot: false,
    isNew: true,
    stock: 256,
    sales: 3421,
    material: 'panel',
    style: 'modern',
  },
  {
    id: 6,
    name: '单人休闲椅',
    category: 'living',
    price: 1899,
    originalPrice: 2499,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20accent%20armchair%2C%20mustard%20yellow%20velvet%2C%20gold%20metal%20legs%2C%20minimalist%20living%20room%20corner%2C%20floor%20lamp%2C%20cozy%20reading%20nook&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20accent%20armchair%2C%20mustard%20yellow%20velvet%2C%20gold%20metal%20legs%2C%20minimalist%20living%20room%20corner%2C%20floor%20lamp%2C%20cozy%20reading%20nook&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=armchair%20fabric%20detail%2C%20velvet%20texture%2C%20stitch%20detail%2C%20premium%20furniture&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chair%20metal%20legs%20detail%2C%20gold%20finish%2C%20elegant%20design%2C%20modern%20furniture&image_size=portrait_4_3',
    ],
    description: '人体工学弧形靠背，高密度回弹海绵，金属椅脚稳固时尚。',
    longDescription: '单人休闲椅采用人体工学弧形靠背设计，贴合腰背曲线，缓解久坐疲劳。高密度回弹海绵填充，坐感舒适，久用不塌陷。金属椅脚，稳固承重，时尚美观。适用于客厅、书房、卧室等多种场景。',
    features: ['人体工学', '高密度海绵', '金属椅脚', '多色可选'],
    specs: [
      { name: '颜色', options: ['姜黄色', '墨绿色', '米白色'] },
      { name: '面料', options: ['丝绒', '科技布', '棉麻'] },
    ],
    details: [
      '面料：优质丝绒（亲肤透气）',
      '填充：高密度回弹海绵',
      '框架：实木内架',
      '椅脚：碳素钢镀金',
      '尺寸：宽75cm x 深70cm x 高85cm',
    ],
    isHot: true,
    isNew: false,
    stock: 134,
    sales: 2156,
    material: 'fabric',
    style: 'luxury',
  },
  {
    id: 7,
    name: '床头柜边柜',
    category: 'bedroom',
    price: 799,
    originalPrice: 1099,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20wooden%20nightstand%2C%20oak%20color%2C%20two%20drawers%2C%20minimalist%20bedroom%2C%20table%20lamp%2C%20clean%20design%2C%20natural%20light&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20wooden%20nightstand%2C%20oak%20color%2C%20two%20drawers%2C%20minimalist%20bedroom%2C%20table%20lamp%2C%20clean%20design%2C%20natural%20light&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nightstand%20drawer%20detail%2C%20metal%20handle%2C%20soft%20close%20rail%2C%20wood%20texture&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nightstand%20top%20view%2C%20wood%20grain%2C%20lamp%20and%20book%2C%20cozy%20bedroom%20scene&image_size=portrait_4_3',
    ],
    description: '双抽屉大容量收纳，实木材质，圆角设计更安全。',
    longDescription: '床头柜采用实木材质打造，天然木纹，质感出众。双抽屉设计，大容量收纳，满足床边储物需求。静音导轨，抽屉推拉顺畅无声。圆角设计，避免磕碰，更安全贴心。简约百搭，适配各种卧室风格。',
    features: ['实木材质', '双抽屉', '圆角设计', '静音导轨'],
    specs: [
      { name: '颜色', options: ['原木色', '胡桃色', '白色'] },
      { name: '尺寸', options: ['标准款', '加宽款'] },
    ],
    details: [
      '材质：橡胶木实木',
      '尺寸：宽50cm x 深40cm x 高55cm',
      '结构：双抽屉',
      '导轨：静音三节轨',
      '漆面：环保水性漆',
    ],
    isHot: false,
    isNew: false,
    stock: 178,
    sales: 1654,
    material: 'solid-wood',
    style: 'nordic',
  },
  {
    id: 8,
    name: '茶几电视柜组合',
    category: 'living',
    price: 2699,
    originalPrice: 3499,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tv%20stand%20and%20coffee%20table%20set%2C%20white%20marble%20top%2C%20black%20metal%20frame%2C%20minimalist%20living%20room%2C%20television%2C%20elegant%20interior&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tv%20stand%20and%20coffee%20table%20set%2C%20white%20marble%20top%2C%20black%20metal%20frame%2C%20minimalist%20living%20room%2C%20television%2C%20elegant%20interior&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tv%20stand%20storage%20detail%2C%20drawers%20and%20shelves%2C%20cable%20management%2C%20modern%20design&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20table%20top%20view%2C%20marble%20texture%2C%20metal%20legs%2C%20minimalist%20furniture&image_size=portrait_4_3',
    ],
    description: '岩板台面耐磨耐高温，大容量储物空间，简约设计百搭各种风格。',
    longDescription: '茶几电视柜组合采用岩板台面，耐磨耐高温，易于清洁。大容量储物空间，电视柜带抽屉和开放式储物格，茶几带储物层，满足客厅各种收纳需求。碳素钢框架，稳固耐用。简约现代设计，百搭各种家居风格。',
    features: ['岩板台面', '大容量储物', '实木框架', '组合套装'],
    specs: [
      { name: '尺寸', options: ['1.6米电视柜+茶几', '1.8米电视柜+茶几', '2.0米电视柜+茶几'] },
      { name: '颜色', options: ['雪山白', '劳伦黑金', '阿玛尼灰'] },
    ],
    details: [
      '台面：进口岩板，厚度12mm',
      '框架：碳素钢+实木多层板',
      '电视柜尺寸：长180cm x 宽40cm x 高45cm',
      '茶几尺寸：长120cm x 宽60cm x 高40cm',
      '配件：静音导轨、合金拉手',
    ],
    isHot: true,
    isNew: false,
    stock: 67,
    sales: 1234,
    material: 'stone',
    style: 'modern',
  },
  {
    id: 9,
    name: '真空压缩收纳袋',
    category: 'storage',
    price: 199,
    originalPrice: 299,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vacuum%20storage%20bags%20set%2C%20transparent%20plastic%20bags%20with%20clothes%20inside%2C%20space%20saving%20organizers%2C%20white%20background%2C%20product%20photography&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vacuum%20storage%20bags%20set%2C%20transparent%20plastic%20bags%20with%20clothes%20inside%2C%20space%20saving%20organizers%2C%20white%20background%2C%20product%20photography&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vacuum%20bag%20zip%20seal%20detail%2C%20air%20valve%2C%20product%20close%20up&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=storage%20bags%20in%20closet%2C%20organized%20wardrobe%2C%20space%20saving%2C%20neat%20and%20tidy&image_size=portrait_4_3',
    ],
    description: '11丝加厚材质，防潮防霉，节省70%收纳空间，多规格组合装。',
    longDescription: '真空压缩收纳袋采用11丝加厚PA+PE材质，韧性好，不易破损。防潮防霉，保护衣物不受潮发霉。真空压缩后节省70%收纳空间，让衣柜更整洁。多规格组合装，满足不同物品收纳需求。配手泵，轻松抽真空。',
    features: ['11丝加厚', '防潮防霉', '节省空间', '多规格'],
    specs: [
      { name: '规格', options: ['6件组合装', '10件组合装', '12件组合装'] },
    ],
    details: [
      '材质：PA+PE，11丝加厚',
      '规格：2特大+2大+2中+2小+手泵',
      '特点：防潮、防霉、防虫、节省空间',
      '配件：手动抽气泵',
      '适用：衣物、棉被、毛绒玩具等',
    ],
    isHot: true,
    isNew: false,
    stock: 526,
    sales: 8765,
    material: 'panel',
    style: 'modern',
  },
  {
    id: 10,
    name: '胡桃木书桌书架一体',
    category: 'study',
    price: 3299,
    originalPrice: 4199,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walnut%20wood%20desk%20with%20bookshelf%2C%20integrated%20study%20table%2C%20minimalist%20home%20office%2C%20warm%20lighting%2C%20clean%20lines%2C%20professional%20product%20photography&image_size=portrait_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walnut%20wood%20desk%20with%20bookshelf%2C%20integrated%20study%20table%2C%20minimalist%20home%20office%2C%20warm%20lighting%2C%20clean%20lines%2C%20professional%20product%20photography&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=desk%20surface%20detail%2C%20walnut%20wood%20grain%2C%20cable%20management%20hole%2C%20premium%20furniture%20close%20up&image_size=portrait_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bookshelf%20storage%20detail%2C%20open%20shelves%2C%20books%20and%20decor%2C%20walnut%20finish&image_size=portrait_4_3',
    ],
    description: '北美FAS级黑胡桃木，实木框架稳固耐用，一体化设计节省空间。',
    longDescription: '胡桃木书桌书架一体采用北美FAS级黑胡桃木打造，木纹自然优美，色泽温润典雅。一体化设计将书桌与书架完美结合，节省空间的同时提升书房整体格调。桌面预留理线孔，保持桌面整洁有序。多层开放式书架，取放书籍方便。承重能力强，可放置大量书籍和办公用品。',
    features: ['FAS级黑胡桃木', '一体化设计', '理线孔', '多层书架'],
    specs: [
      { name: '尺寸', options: ['1.2米', '1.4米', '1.6米'] },
      { name: '颜色', options: ['原木色', '深胡桃色'] },
    ],
    details: [
      '材质：北美FAS级黑胡桃木',
      '尺寸：长140cm x 宽60cm x 高200cm',
      '台面厚度：25mm',
      '书架层数：5层',
      '漆面：木蜡油涂装',
      '配件：理线孔盖、水平仪',
    ],
    isHot: false,
    isNew: true,
    stock: 73,
    sales: 456,
    material: 'solid-wood',
    style: 'nordic',
  },
]

export const hotProducts = products.filter(p => p.isHot).slice(0, 4)
export const newProducts = products.filter(p => p.isNew).slice(0, 4)

/**
 * 根据 ID 获取产品
 */
export function getProductById(id) {
  return products.find(p => p.id === parseInt(id))
}

/**
 * 获取相关产品
 */
export function getRelatedProducts(productId, category, limit = 4) {
  return products
    .filter(p => p.category === category && p.id !== parseInt(productId))
    .slice(0, limit)
}

/**
 * 根据ID列表获取产品
 */
export function getProductsByIds(ids) {
  return ids.map(id => products.find(p => p.id === id)).filter(Boolean)
}

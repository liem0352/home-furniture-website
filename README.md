# 精美家居 | 品质生活，从家开始

> 高端家居家具品牌网站 —— React + Vite + Tailwind CSS 构建的现代化前端项目，提供沉浸式浏览体验与完整电商功能流程。

## 项目简介

精美家居是一个面向品牌展示与家具销售的前端项目，覆盖从首页浏览、产品选购、购物车结算到订单管理的完整购物链路，同时包含品牌故事、灵感中心、房间搭配等内容运营模块。项目采用组件化架构与统一设计语言，全站支持双向滚动动画与响应式布局。

## 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | 组件化 UI 构建（Hooks + Context 状态管理） |
| Vite 5 | 开发构建工具，支持 HMR 与路径别名 |
| Tailwind CSS 3 | 原子化 CSS 框架，自定义设计令牌 |
| React Router 6 | 客户端路由，支持动态参数与嵌套路由 |
| GSAP 3 | 高性能动画引擎，实现滚动揭示与微交互 |
| Phosphor Icons | 矢量图标库 |

## 核心特性

- **沉浸式 Hero 设计**：全站统一的 PageHero 组件，渐变叠加 + 标签徽章 + 居中排版
- **双向滚动动画**：基于 GSAP ScrollTrigger 的入场上扬淡入与退场淡出，动效连贯丝滑
- **统一设计系统**：森林深绿（forest）+ 骨白（bone）+ 琥珀点缀（amber）三色体系，自定义圆角、阴影、缓动曲线
- **完整电商流程**：产品列表 / 详情 / 快速预览 / 购物车 / 收藏 / 对比 / 结算 / 订单
- **内容运营模块**：灵感中心、房间搭配、品牌故事、优惠券中心
- **响应式布局**：适配桌面、平板、移动端，移动端抽屉式导航
- **全局状态管理**：Context API 管理购物车、收藏、对比列表、Toast 通知

## 页面总览

| 模块 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | Hero 横幅、限时秒杀、产品推荐、数据统计、用户评价、品牌故事 |
| 产品中心 | `/products` | 产品列表、分类筛选、排序 |
| 产品详情 | `/product/:id` | 商品图文、规格选择、加购收藏、面包屑导航 |
| 房间搭配 | `/room-sets` | 场景化整屋搭配方案 |
| 灵感中心 | `/inspiration` | 家居灵感图册与搭配建议 |
| 商品对比 | `/compare` | 多商品参数横向对比 |
| 购物车 | `/cart` | 商品数量调整、金额汇总 |
| 收藏夹 | `/wishlist` | 收藏商品管理 |
| 结算 | `/checkout` | 地址填写、支付方式、订单确认 |
| 订单管理 | `/orders` `/order/:id` | 订单列表与详情 |
| 优惠券中心 | `/coupons` | 优惠券领取与管理 |
| 搜索 | `/search` | 关键词搜索与结果展示 |
| 品牌故事 | `/story` | 品牌历史与理念 |
| 关于我们 | `/about` | 公司简介与团队 |
| 联系我们 | `/contact` | 联系方式与地图 |
| 在线留言 | `/message` | 留言表单与展示 |
| 客服中心 | `/service` | 常见服务与支持 |
| 常见问题 | `/faq` | Q&A 问答 |
| 隐私政策 | `/privacy` | 隐私条款 |
| 服务条款 | `/terms` | 用户协议 |
| 账户中心 | `/account` | 个人信息管理 |
| 登录 / 注册 | `/login` `/register` | 用户认证 |

## 项目结构

```
├── index.html              # HTML 入口
├── package.json            # 依赖与脚本
├── vite.config.js          # Vite 配置（别名 @ -> ./src）
├── tailwind.config.js      # Tailwind 设计令牌配置
├── postcss.config.js       # PostCSS 配置
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # 应用入口
    ├── App.jsx             # 根组件与路由配置
    ├── index.css           # 全局样式与 Tailwind 指令
    ├── components/         # 通用组件
    │   ├── Navbar.jsx          # 导航栏（沉浸式 / 滚动感知）
    │   ├── Footer.jsx          # 页脚
    │   ├── Hero.jsx            # 首页主视觉
    │   ├── PageHero.jsx        # 统一页面 Hero 组件
    │   ├── ProductCard.jsx     # 产品卡片
    │   ├── ProductShowcase.jsx # 产品展示区
    │   ├── FlashSale.jsx       # 限时秒杀
    │   ├── Features.jsx        # 特色卖点
    │   ├── StatsSection.jsx    # 数据统计（数字滚动动画）
    │   ├── Testimonials.jsx    # 用户评价
    │   ├── BrandStory.jsx      # 品牌故事
    │   ├── CTASection.jsx      # 行动号召区
    │   ├── CartDrawer.jsx      # 购物车抽屉
    │   ├── QuickView.jsx       # 快速预览弹窗
    │   ├── BackToTop.jsx       # 返回顶部悬浮按钮
    │   ├── ScrollToTop.jsx     # 路由切换滚动重置
    │   ├── Toast.jsx           # 通知提示
    │   ├── Button.jsx          # 按钮组件
    │   └── States.jsx          # 空状态/加载态
    ├── pages/              # 页面组件
    ├── data/               # 静态数据
    │   ├── products.js         # 产品数据与分类
    │   ├── reviews.js          # 评价数据
    │   ├── coupons.js          # 优惠券数据
    │   ├── home.js             # 首页配置
    │   └── nav.js              # 导航配置
    ├── hooks/              # 自定义 Hooks
    │   ├── useScrollReveal.js  # 滚动揭示动画（双向）
    │   ├── useScrollPosition.js
    │   └── useMediaQuery.js
    └── store/
        └── AppContext.jsx      # 全局状态（购物车/收藏/对比/Toast）
```

## 设计系统

| 类别 | 令牌 | 值 |
|------|------|------|
| 主色 | forest-700 | `#254e3f` 森林深绿 |
| 主色 | forest-900 | `#1a342b` 深夜墨绿 |
| 背景色 | bone-50 | `#faf9f6` 骨白 |
| 点缀色 | amber-400 | `#fbbf24` 琥珀金 |
| 字体 | sans | Geist / Inter / system-ui |
| 字号 | display | `clamp(2.5rem, 6vw, 5rem)` |
| 圆角 | card / button | `16px` / `100px` |
| 缓动 | expo | `cubic-bezier(0.16, 1, 0.3, 1)` |

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/liem0352/home-furniture-website.git

# 2. 进入项目目录
cd home-furniture-website

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 构建生产版本
npm run build
```

开发服务器默认运行在 `http://localhost:5173`。

## 浏览器兼容

推荐使用 Chrome / Edge / Firefox / Safari 最新版本，支持 CSS Grid、Flexbox 与 ES2020+ 语法。

## 功能统计

| 类别 | 数量 |
|------|------|
| 页面路由 | 23 |
| 通用组件 | 17 |
| 自定义 Hooks | 3 |
| 产品数据 | 10 |
| 产品分类 | 8 |

## License

MIT License —— 作者 liem。本项目仅用于学习与展示，可自由使用与修改。

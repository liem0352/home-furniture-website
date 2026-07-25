<p align="center">
  <img src="assets/readme/hero.svg" alt="精美家居 - 高端家居家具品牌网站 | React + Vite + Tailwind CSS 沉浸式设计与丝滑双向滚动动画" width="100%"/>
</p>

<p align="center">
  <b>品质生活，从家开始</b> — 高端家居家具品牌前端项目，覆盖完整电商购物链路
</p>

<p align="center">
  <a href="#-快速开始">快速开始</a>
  &nbsp;·&nbsp;
  <a href="#-页面总览">页面总览</a>
  &nbsp;·&nbsp;
  <a href="#-架构说明">架构说明</a>
  &nbsp;·&nbsp;
  <a href="#-设计系统">设计系统</a>
</p>

<br>

## 关于项目

精美家居是一套基于 **React 18 + Vite + Tailwind CSS** 构建的现代化家居电商前端项目。项目采用组件化架构与统一设计语言，覆盖从首页浏览、产品选购、购物车结算到订单管理的完整购物链路，同时包含品牌故事、灵感中心、房间搭配等内容运营模块。

全站基于 **GSAP** 实现丝滑的双向滚动动画，采用森林深绿 + 骨白 + 琥珀金的冷调奢华配色，配合沉浸式 Hero 设计与响应式布局，呈现高品质的品牌浏览体验。

<p align="center">
  <img src="assets/readme/stats-board.svg" alt="功能统计" width="100%"/>
</p>

<br>

## ✨ 核心特性

- **沉浸式 Hero 设计** — 全站统一 PageHero 组件，渐变叠加 + 标签徽章 + 居中排版
- **双向滚动动画** — GSAP ScrollTrigger 驱动，入场上扬淡入 / 退场淡出，动效连贯丝滑
- **完整电商流程** — 产品列表 / 详情 / 快速预览 / 购物车 / 收藏 / 对比 / 结算 / 订单
- **内容运营模块** — 灵感中心、房间搭配、品牌故事、优惠券中心
- **统一设计系统** — 森林深绿（forest）+ 骨白（bone）+ 琥珀点缀（amber）三色体系
- **响应式布局** — 桌面 / 平板 / 移动端适配，移动端抽屉式导航
- **全局状态管理** — Context API 管理购物车、收藏、对比列表、Toast 通知

<br>

<p align="center">
  <img src="assets/readme/section-pages.svg" alt="页面总览" width="100%"/>
</p>

## 📄 页面总览

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
| 订单管理 | `/orders` · `/order/:id` | 订单列表与详情 |
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
| 登录 / 注册 | `/login` · `/register` | 用户认证 |

<br>

<p align="center">
  <img src="assets/readme/architecture.svg" alt="项目架构图" width="100%"/>
</p>

## 🏗️ 架构说明

项目采用四层架构，自上而下逐层依赖：

**页面层 Pages** — 23 个路由页面，负责组合组件与业务逻辑编排
**组件层 Components** — 17 个通用组件，可复用可组合
**状态层 & Hooks 层** — Context API 全局状态 + 3 个自定义 Hooks
**数据层 & 样式层 & 路由层** — 静态数据 + Tailwind 设计令牌 + React Router

### 目录结构

```
├── index.html              # HTML 入口
├── package.json            # 依赖与脚本
├── vite.config.js          # Vite 配置（@ -> ./src 别名）
├── tailwind.config.js      # Tailwind 设计令牌
├── postcss.config.js       # PostCSS 配置
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # 应用入口
    ├── App.jsx             # 根组件与路由配置
    ├── index.css           # 全局样式
    ├── components/         # 通用组件（17 个）
    ├── pages/              # 页面组件（23 个）
    ├── data/               # 静态数据
    ├── hooks/              # 自定义 Hooks
    └── store/
        └── AppContext.jsx  # 全局状态
```

<br>

<p align="center">
  <img src="assets/readme/section-tech.svg" alt="技术栈" width="100%"/>
</p>

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **React 18** | 组件化 UI 构建，Hooks + Context 状态管理 |
| **Vite 5** | 开发构建工具，支持 HMR 与路径别名 |
| **Tailwind CSS 3** | 原子化 CSS 框架，自定义设计令牌 |
| **React Router 6** | 客户端路由，支持动态参数与嵌套路由 |
| **GSAP 3** | 高性能动画引擎，ScrollTrigger 滚动揭示 |
| **Phosphor Icons** | 轻量级矢量图标库 |

<br>

<p align="center">
  <img src="assets/readme/section-design.svg" alt="设计系统" width="100%"/>
</p>

## 🎨 设计系统

### 配色方案

| 角色 | 令牌 | 色值 |
|------|------|------|
| 主色 | `forest-700` | `#254e3f` 森林深绿 |
| 深主色 | `forest-900` | `#1a342b` 深夜墨绿 |
| 背景色 | `bone-50` | `#faf9f6` 骨白 |
| 点缀色 | `amber-400` | `#fbbf24` 琥珀金 |
| 辅助色 | `bone-500` | `#a89a7d` 暖灰 |

### 排版规范

- **Display 标题**：`clamp(2.5rem, 6vw, 5rem)` / 字间距 -0.02em
- **Heading-2**：`clamp(1.75rem, 3.5vw, 3rem)` / 字间距 -0.015em
- **字体栈**：Geist / Inter / system-ui / sans-serif

### 形状与动效

- 卡片圆角：`16px` · 按钮圆角：`100px`
- 缓动曲线：`cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- 弹动缓动：`cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce-soft)

<br>

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/liem0352/home-furniture-website.git

# 进入项目目录
cd home-furniture-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器默认运行在 `http://localhost:5173`。

<br>

## 📱 浏览器兼容

推荐使用 **Chrome / Edge / Firefox / Safari** 最新版本，支持 CSS Grid、Flexbox 与 ES2020+ 语法。

<br>

## License

MIT License — 作者 liem。本项目仅用于学习与展示，可自由使用与修改。

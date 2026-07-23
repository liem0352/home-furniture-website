<p align="center">
  <img src="assets/readme/hero.svg" alt="精美家居企业网站 — 前端项目 README Hero:左侧项目标题与技术栈,右侧首页/产品/登录/留言四个核心页面缩略图墙" width="100%"/>
</p>

# 精美家居企业网站

> 纯前端家居企业站点 — 首页、产品中心、登录注册、在线留言、企业介绍,基于 HTML5 / CSS3 / 原生 JavaScript 与 Iconfont 矢量图标构建,浏览器直接打开即可运行。

## 这是什么

一个面向家居企业的纯前端展示站点,覆盖企业宣传、产品分类浏览、用户登录注册与在线留言等核心场景。无后端、无构建步骤,克隆仓库后用浏览器打开 `index.html` 即可完整预览。

## 页面与资源

<p align="center">
  <img src="assets/readme/section-pages.svg" alt="功能页面结构示意图:首页、产品中心、登录、注册、在线留言、关于我们六个页面卡片" width="100%"/>
</p>

| 页面 | 文件 | 职责 |
| --- | --- | --- |
| 首页 | `index.html` | 欢迎栏 / 导航 / 轮播 / 产品推荐 / 企业介绍 / 底部 |
| 产品中心 | `product.html` | 产品分类(床 / 椅 / 桌 / 柜)与网格展示 |
| 登录 | `login.html` | 用户登录表单与字段校验 |
| 注册 | `register.html` | 新用户注册表单与字段校验 |
| 在线留言 | `message.html` | 留言表单与留言列表 |
| 关于我们 | `about.html` | 企业介绍页面 |

### 样式表(共 9 个,每页独立)

- `css/reset.css` — 全局重置(盒模型 / 字体 / 边距)
- `css/header.css` / `css/footer.css` — 公共头部与底部
- `css/index.css` / `css/product.css` / `css/login.css` / `css/register.css` / `css/message.css` / `css/about.css` — 各页专属样式

### 脚本(共 5 个,原生 JS)

- `js/index.js` — 首页轮播切换与自动播放
- `js/product.js` — 产品分类筛选与网格更新
- `js/login.js` / `js/register.js` — 登录注册表单校验
- `js/message.js` — 留言追加与列表渲染

### 图片资源

- 站点标识:`img/logo.png`
- 首页轮播:`img/banner.jpg`、`img/banner1.jpg`、`img/banner2.jpg`、`img/banner3.jpg`
- 产品分类:`img/bed.png`(床)、`img/chair.png`(椅)、`img/table.png`(桌)、`img/cupboard.png`(柜)

## 设计要点

### 响应式布局
CSS3 Flexbox 与 Grid 配合,适配桌面与移动端宽度。断点以内容可读性为准,不依赖重型前端框架。

### Iconfont 矢量图标
统一通过 Iconfont 引入矢量图标,与位图资源解耦,任意缩放不失真,色调可跟随 CSS 变量调整。

### 模块化样式
每个页面拥有独立 CSS 文件,公共部分(重置 / 头部 / 底部)单独抽离,避免样式互相污染,便于按页维护与迭代。

### 表单验证
登录、注册、留言表单均在原生 JS 中实现字段校验(非空、格式、一致性),错误提示就地展示,不依赖第三方校验库。

## 页面结构与交互逻辑

```text
站点结构
├── index.html ─── 轮播 (index.js) + 产品推荐 + 企业介绍
├── product.html ── 分类导航 + 产品网格 (product.js)
├── login.html ──── 表单校验 (login.js)
├── register.html ─ 表单校验 (register.js)
├── message.html ── 留言表单 + 列表 (message.js)
└── about.html ──── 企业介绍 (静态)

样式组织
├── reset.css ───── 全局重置(盒模型 / 字体 / 边距)
├── header.css ──── 顶部导航(全站共用)
├── footer.css ──── 底部信息(全站共用)
└── *.css ───────── 各页专属样式(按页隔离)

交互逻辑
├── index.js ────── 轮播切换 / 自动播放
├── product.js ──── 分类筛选 / 网格更新
├── login.js ────── 字段校验 / 提交拦截
├── register.js ─── 字段校验 / 一致性检查
└── message.js ──── 留言追加 / 列表渲染
```

## 快速开始

无需安装依赖,无需构建步骤。

```bash
# 1. 克隆仓库
git clone https://github.com/liem0352/home-furniture-website.git

# 2. 进入目录
cd home-furniture-website

# 3. 直接用浏览器打开首页
#    Windows: start index.html
#    macOS:   open index.html
#    Linux:   xdg-open index.html
```

或直接在文件管理器中双击 `index.html`,即可在默认浏览器中预览全部页面。

## 兼容性

- 现代浏览器最新版:Chrome / Edge / Firefox / Safari
- 依赖 CSS Flexbox / Grid 与 ES5+ 语法,不支持 IE

## 资源清单

| 类别 | 数量 | 说明 |
| --- | --- | --- |
| HTML 页面 | 6 | index / product / login / register / message / about |
| 样式表 | 9 | reset / header / footer + 6 页专属 |
| 脚本 | 5 | index / product / login / register / message |
| 图片资源 | 12+ | logo / banner 系列 / 产品分类图等 |

## License

MIT License — 作者 **liem**。本仓库代码与资源可自由用于学习与商业参考,引用时请保留作者署名。

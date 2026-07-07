# 精美家居企业网站

> 作者：liem

## 项目简介

精美家居企业网站是一个纯前端项目，使用 HTML + CSS + JavaScript 构建，展示家居企业的产品与服务。网站包含首页、产品中心、登录注册、在线留言和关于我们等模块，是一个完整的企业宣传网站。

## 功能模块

### 首页（index.html）
- 顶部欢迎栏：联系电话、邮箱、日期展示
- 导航栏：Logo + 菜单（首页、产品中心、关于我们、登录注册、在线留言）
- 轮播图：首页 Banner 轮播展示
- 产品推荐：精选家居产品展示
- 企业介绍：公司简介与特色
- 底部信息：版权与联系方式

### 产品中心（product.html）
- 产品分类展示：床、椅、桌、柜等家居品类
- 产品详情：图片、名称、价格、描述
- 产品筛选：按分类筛选

### 登录注册
- `login.html`：用户登录页面
- `register.html`：新用户注册页面
- 表单验证：用户名、密码格式校验

### 在线留言（message.html）
- 留言表单：姓名、邮箱、留言内容
- 留言展示：展示用户留言列表

### 关于我们（about.html）
- 企业简介：公司历史与文化
- 企业团队：团队成员介绍
- 联系方式：地址、电话、邮箱

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式设计（Flexbox + Grid 布局） |
| 原生 JavaScript | 交互逻辑与表单验证 |
| Iconfont | 阿里巴巴矢量字体图标 |

## 页面样式

每个页面都有独立的样式文件，便于维护：

| 样式文件 | 说明 |
|---------|------|
| `reset.css` | 样式重置，消除浏览器默认样式 |
| `header.css` | 顶部欢迎栏与导航栏样式 |
| `footer.css` | 底部信息区域样式 |
| `index.css` | 首页样式（轮播图、产品推荐等） |
| `product.css` | 产品中心样式 |
| `login.css` | 登录页样式 |
| `register.css` | 注册页样式 |
| `message.css` | 留言页样式 |
| `about.css` | 关于我们页样式 |

## 项目结构

```
├── index.html              # 首页
├── product.html            # 产品中心
├── login.html              # 登录页
├── register.html           # 注册页
├── message.html            # 在线留言
├── about.html              # 关于我们
├── css/                    # 样式文件
│   ├── reset.css           # 样式重置
│   ├── header.css          # 头部样式
│   ├── footer.css          # 底部样式
│   ├── index.css           # 首页样式
│   ├── product.css         # 产品页样式
│   ├── login.css           # 登录页样式
│   ├── register.css        # 注册页样式
│   ├── message.css         # 留言页样式
│   └── about.css           # 关于我们样式
├── js/                     # 脚本文件
│   ├── index.js            # 首页脚本（轮播图等）
│   ├── login.js            # 登录脚本
│   ├── register.js         # 注册脚本
│   ├── message.js          # 留言脚本
│   └── product.js          # 产品页脚本
└── img/                    # 图片资源
    ├── logo.png            # 网站 Logo
    ├── banner.jpg          # 首页 Banner
    ├── banner1.jpg         # 轮播图 1
    ├── banner2.jpg         # 轮播图 2
    ├── banner3.jpg         # 轮播图 3
    ├── bed.png             # 床产品图
    ├── chair.png           # 椅子产品图
    ├── table.png           # 桌子产品图
    ├── cupboard.png        # 柜子产品图
    └── ...                 # 其他图片
```

## 使用方式

直接在浏览器中打开 `index.html` 即可预览。

无需安装任何依赖，所有资源均为本地文件。

## 设计特点

- **响应式布局**：适配不同屏幕尺寸
- **Iconfont 图标**：使用阿里巴巴矢量图标库，清晰可缩放
- **模块化样式**：每个页面独立样式文件，便于维护
- **表单验证**：前端 JavaScript 表单校验

## 许可证

MIT License

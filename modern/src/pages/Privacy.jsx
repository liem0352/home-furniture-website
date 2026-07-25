import { Shield, FileText, Lock, User, Eye, Cookie, Envelope, LockKey } from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 隐私政策页面
 * 展示网站的隐私保护政策和用户数据使用说明
 */
export default function Privacy() {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const contentRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })

  const sections = [
    {
      icon: Shield,
      title: '信息收集',
      content: `我们收集的信息包括但不限于：
1. 您主动提供的个人信息，如姓名、手机号、邮箱、收货地址等
2. 设备信息，如设备型号、操作系统、IP 地址等
3. 使用信息，如浏览记录、搜索记录、购物车记录等
4. 交易信息，如订单信息、支付信息等

我们仅在必要范围内收集信息，不会收集与服务无关的个人信息。`,
    },
    {
      icon: Lock,
      title: '信息使用',
      content: `我们收集的信息将用于以下用途：
1. 提供、维护和改进我们的产品和服务
2. 处理您的订单、支付和售后服务
3. 向您发送产品更新、优惠活动等通知（您可随时退订）
4. 验证您的身份，保障账户安全
5. 进行数据分析以改善用户体验
6. 遵守法律法规的要求

我们不会将您的个人信息出售给任何第三方。`,
    },
    {
      icon: Eye,
      title: '信息保护',
      content: `我们采取多种安全措施保护您的个人信息：
1. 使用加密技术传输和存储敏感数据
2. 建立严格的数据访问权限管理
3. 定期进行安全审计和漏洞扫描
4. 制定完善的信息安全管理制度
5. 对员工进行信息安全培训

尽管我们采取了合理的安全措施，但互联网环境并非绝对安全，我们会尽力保护您的信息安全。`,
    },
    {
      icon: Cookie,
      title: 'Cookie 政策',
      content: `我们使用 Cookie 和类似技术来提升您的使用体验：
1. 必要 Cookie：用于网站基本功能的正常运行
2. 功能 Cookie：用于记住您的偏好设置
3. 统计 Cookie：用于分析网站流量和使用情况
4. 营销 Cookie：用于提供个性化广告

您可以通过浏览器设置管理或删除 Cookie，但这可能会影响网站的部分功能。`,
    },
    {
      icon: User,
      title: '您的权利',
      content: `您对您的个人信息享有以下权利：
1. 访问权：您可以查询、复制您的个人信息
2. 更正权：您可以要求更正不准确的信息
3. 删除权：您可以要求删除您的个人信息
4. 撤回同意：您可以撤回对个人信息使用的同意
5. 注销账户：您可以申请注销您的账户

如需行使以上权利，请通过下方联系方式与我们联系。`,
    },
    {
      icon: Envelope,
      title: '联系我们',
      content: `如果您对本隐私政策有任何疑问、意见或建议，或需要行使您的个人信息权利，请通过以下方式联系我们：
- 客服热线：400-200-500
- 电子邮箱：contact@jingmeijiaju.com
- 通讯地址：广东肇庆市星湖大道 10 号

我们会在收到您的请求后 15 个工作日内予以回复。`,
    },
  ]

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      <PageHero
        title="隐私政策"
        subtitle="您的隐私，我们重视。我们承诺保护您的个人信息安全。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=privacy%20protection%20concept%2C%20digital%20security%2C%20shield%20with%20lock%2C%20green%20color%20scheme%2C%20minimalist%20design%2C%20soft%20lighting%2C%20professional%20business%20concept%2C%20high%20end%20style&image_size=landscape_16_9"
        tag="隐私保护"
        tagIcon={LockKey}
        variant="immersive"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* 标题 */}
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-100 text-forest-700 mb-4">
            <Shield size={32} weight="duotone" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
            您的隐私，我们重视
          </h2>
          <p className="text-zinc-600">
            最后更新：2024 年 1 月 1 日
          </p>
        </div>

        {/* 内容区 */}
        <div ref={contentRef} className="bg-white rounded-card shadow-soft p-8 md:p-12 opacity-0">
          <p className="text-zinc-600 mb-8 leading-relaxed">
            精美家居（以下简称"我们"）深知个人信息对您的重要性，我们将按照法律法规要求，采取相应的安全保护措施，致力于保护您的个人信息安全可控。
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                      <Icon size={20} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">
                      {index + 1}. {section.title}
                    </h3>
                  </div>
                  <div className="pl-13 text-zinc-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-100">
            <p className="text-sm text-zinc-500">
              精美家居 保留对本隐私政策的最终解释权和修改权。如有变更，我们将在网站上公布更新后的政策。请您定期查阅本隐私政策，以了解最新信息。
            </p>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

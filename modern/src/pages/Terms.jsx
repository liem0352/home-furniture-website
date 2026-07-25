import { FileText, CheckCircle, ShieldCheck, User, ShoppingCart, Target, Scroll } from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * 服务条款页面
 * 展示网站的用户服务协议和使用条款
 */
export default function Terms() {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const contentRef = useScrollReveal({ y: 40, duration: 0.8, delay: 0.2 })

  const sections = [
    {
      icon: Target,
      title: '服务协议的接受',
      content: `欢迎使用精美家居网站及相关服务。在使用我们的服务之前，请您仔细阅读本服务条款的全部内容。
一旦您注册账号或使用我们的服务，即表示您已阅读、理解并同意接受本服务条款的全部内容。如果您不同意本服务条款的任何内容，请您立即停止使用我们的服务。`,
    },
    {
      icon: User,
      title: '用户注册与账号',
      content: `1. 用户在注册时应提供真实、准确、完整的个人资料，并保证资料的及时更新。
2. 用户应妥善保管账号和密码，对账号下的所有行为和风险承担责任。
3. 如发现账号被盗用或存在安全漏洞，应立即通知我们。
4. 用户不得以任何形式转让、出借、售卖其账号。
5. 我们有权根据需要暂停或终止违反规定的用户账号。`,
    },
    {
      icon: ShoppingCart,
      title: '商品与订单',
      content: `1. 我们尽力确保商品信息的准确性，但由于技术原因，可能存在个别误差，请以实物为准。
2. 商品价格可能会根据市场情况调整，下单时以页面显示的价格为准。
3. 订单成立以我们确认发货为准。如遇缺货等无法履行的情况，我们会及时通知您并办理退款。
4. 促销活动的具体规则以活动页面说明为准，我们保留活动的最终解释权。
5. 定制商品不支持无理由退换，具体请参考定制协议。`,
    },
    {
      icon: CheckCircle,
      title: '支付与结算',
      content: `1. 我们提供多种支付方式，用户可自行选择。
2. 用户应确保使用的支付方式合法有效，如因支付问题造成损失，由用户自行承担。
3. 退款将按照原支付路径返回，到账时间以支付机构处理时间为准。
4. 涉及发票的，请在下单时注明发票信息，我们将按规定开具发票。`,
    },
    {
      icon: ShieldCheck,
      title: '用户行为规范',
      content: `用户在使用本网站服务时，不得从事以下行为：
1. 违反国家法律法规的任何行为
2. 发布、传播违法或不良信息
3. 侵犯他人知识产权、隐私权等合法权益
4. 恶意注册账号、刷单刷评等不正当行为
5. 攻击、干扰网站正常运行
6. 盗用他人账号或个人信息
7. 其他损害我们或第三方合法权益的行为

如有违反，我们有权采取警告、限制功能、封禁账号等措施，并保留追究法律责任的权利。`,
    },
    {
      icon: ShieldCheck,
      title: '免责声明',
      content: `1. 因不可抗力（包括但不限于自然灾害、政府行为、网络故障等）导致的服务中断或数据损失，我们不承担责任。
2. 对于用户因使用本服务而产生的间接损失，我们不承担赔偿责任。
3. 第三方链接的内容由第三方负责，我们不对其准确性、合法性负责。
4. 用户应自行判断使用本服务的风险，我们不对服务的适用性、可靠性作保证。

以上免责声明在法律允许的范围内适用。`,
    },
    {
      icon: FileText,
      title: '条款修改与争议解决',
      content: `1. 我们有权根据需要修改本服务条款，修改后的条款将在网站上公布。继续使用服务即表示您同意修改后的条款。
2. 本服务条款的解释、执行和争议解决均适用中华人民共和国法律。
3. 因本服务条款引起的争议，双方应友好协商解决；协商不成的，可向我们所在地人民法院提起诉讼。`,
    },
  ]

  return (
    <div className="pb-section bg-bone-50 min-h-screen">
      <PageHero
        title="服务条款"
        subtitle="请您在使用我们的服务前，仔细阅读以下服务条款。使用我们的服务即表示您同意接受这些条款的约束。"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=law%20and%20justice%20concept%2C%20scale%20of%20justice%2C%20legal%20documents%2C%20green%20color%20scheme%2C%20minimalist%20professional%20design%2C%20soft%20lighting%2C%20high%20end%20style%2C%20clean%20composition&image_size=landscape_16_9"
        tag="用户协议"
        tagIcon={Scroll}
        variant="immersive"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* 标题 */}
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-100 text-forest-700 mb-4">
            <FileText size={32} weight="duotone" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
            精美家居服务条款
          </h2>
          <p className="text-zinc-600">
            最后更新：2024 年 1 月 1 日
          </p>
        </div>

        {/* 内容区 */}
        <div ref={contentRef} className="bg-white rounded-card shadow-soft p-8 md:p-12 opacity-0">
          <p className="text-zinc-600 mb-8 leading-relaxed">
            感谢您选择精美家居。请您在使用我们的服务前，仔细阅读以下服务条款。使用我们的服务即表示您同意接受这些条款的约束。
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
              如您对本服务条款有任何疑问，请通过客服热线 400-200-500 或邮箱 contact@jingmeijiaju.com 联系我们。
            </p>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}

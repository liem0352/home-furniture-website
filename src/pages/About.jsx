import {
  Leaf,
  ShieldCheck,
  Target,
  Heart,
  Users,
  MapPin,
  Phone,
  Envelope,
  Clock,
  CheckCircle,
  Building,
} from '@phosphor-icons/react'
import BackToTop from '../components/BackToTop.jsx'
import StatsSection from '../components/StatsSection.jsx'
import CTASection from '../components/CTASection.jsx'
import PageHero from '../components/PageHero.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { contactInfo } from '../data/nav.js'

/**
 * 关于我们页面
 * 展示公司简介、发展历程、企业理念、团队和联系方式
 */
export default function About() {
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 })
  const storyRef = useScrollReveal({ y: 40, duration: 0.8 })
  const valuesRef = useScrollReveal({ y: 40, duration: 0.8 })
  const teamRef = useScrollReveal({ y: 40, duration: 0.8 })
  const contactRef = useScrollReveal({ y: 40, duration: 0.8 })
  const introRef = useScrollReveal({ y: 30, duration: 0.8 })

  const values = [
    { icon: Leaf, title: '环保理念', desc: '坚持使用环保材料，为可持续发展贡献力量' },
    { icon: ShieldCheck, title: '品质至上', desc: '严格品控，每一件产品都经过多重检验' },
    { icon: Target, title: '匠心设计', desc: '专业设计团队，打造兼具美感与实用的作品' },
    { icon: Heart, title: '用心服务', desc: '以客户为中心，提供贴心的售前售后服务' },
  ]

  const timeline = [
    { year: '2009', title: '品牌创立', desc: '精美家居在广东肇庆成立，开启家居之旅' },
    { year: '2013', title: '生产基地', desc: '建立自有生产基地，实现设计生产一体化' },
    { year: '2017', title: '品牌升级', desc: '完成品牌升级，拓展全国主要城市门店' },
    { year: '2021', title: '数字化转型', desc: '上线电商平台，开启线上线下融合发展' },
    { year: '2024', title: '持续创新', desc: '推出智能家居产品线，引领行业新趋势' },
  ]

  const team = [
    { name: '陈明远', role: '创始人 & CEO', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businessman%20CEO%20portrait%2C%20confident%20smile%2C%20modern%20office%2C%20suit%2C%20natural%20lighting%2C%20corporate%20headshot&image_size=square_hd' },
    { name: '林雨婷', role: '设计总监', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20woman%20designer%20portrait%2C%20creative%20studio%2C%20artistic%20background%2C%20natural%20lighting%2C%20professional%20headshot&image_size=square_hd' },
    { name: '王建国', role: '生产总监', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20industrial%20engineer%20portrait%2C%20factory%20background%2C%20safety%20helmet%2C%20professional%20confident%20look&image_size=square_hd' },
    { name: '张雪梅', role: '客服总监', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20woman%20customer%20service%20director%2C%20friendly%20smile%2C%20modern%20office%2C%20warm%20lighting%2C%20professional%20headshot&image_size=square_hd' },
  ]

  return (
    <div className="bg-bone-50 min-h-screen">
      <PageHero
        title="关于我们"
        subtitle="了解精美家居的品牌故事与企业理念"
        image="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20building%20exterior%2C%20corporate%20headquarters%2C%20minimalist%20architecture%2C%20glass%20facade%2C%20green%20landscaping%2C%20professional%20business%20environment&image_size=landscape_16_9"
        tag="企业介绍"
        tagIcon={Building}
        variant="immersive"
      />

      {/* 公司简介 */}
      <section id="story" className="py-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={storyRef}>
              <div className="relative">
                <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20furniture%20manufacturing%20facility%2C%20clean%20production%20line%2C%20professional%20workers%2C%20woodworking%20machinery%2C%20quality%20control%2C%20industrial%20design&image_size=landscape_4_3"
                    alt="公司简介"
                    className="w-full h-[400px] object-cover rounded-card shadow-large"
                  />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-forest-700 rounded-card flex items-center justify-center text-white text-center hidden md:block">
                  <div>
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-xs text-forest-200">年行业经验</div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={introRef}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-amber-500" />
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase">
                  公司简介
                </span>
              </div>

              <h2 className="text-heading-2 font-bold text-zinc-900 mb-6 text-balance">
                十五年匠心坚守
                <br />
                只为品质家居
              </h2>

              <p className="text-zinc-600 leading-relaxed mb-4">
                精美家居有限公司成立于 2009 年，总部位于广东肇庆。
                经过十五年的发展，已成长为集设计、生产、销售于一体的综合性家居企业。
              </p>

              <p className="text-zinc-600 leading-relaxed mb-6">
                公司现有员工 1000 余人，拥有现代化生产基地和专业设计团队。
                我们的产品涵盖卧室、客厅、餐厅、书房等全品类家居，
                远销韩国、日本、美国、澳大利亚等十几个国家和地区。
              </p>

              <div className="grid grid-cols-2 gap-3">
                {['ISO9001 质量认证', 'ISO14001 环境认证', '中国驰名商标', 'AAA 级信用企业'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-forest-600 flex-shrink-0" />
                    <span className="text-sm text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <StatsSection />

      {/* 企业理念 */}
      <section id="philosophy" className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={valuesRef} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-10 h-px bg-forest-600" />
              <span className="text-forest-700 font-medium tracking-widest text-xs uppercase">
                企业理念
              </span>
              <span className="w-10 h-px bg-forest-600" />
            </div>
            <h2 className="text-heading-2 font-bold text-zinc-900 text-balance max-w-2xl mx-auto">
              我们的核心价值观
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group p-8 bg-bone-50 rounded-card hover:bg-white hover:shadow-medium transition-all duration-500 ease-expo hover:-translate-y-1 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-all duration-300">
                    <Icon size={28} weight="duotone" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-section bg-forest-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-10 h-px bg-forest-600" />
              <span className="text-forest-700 font-medium tracking-widest text-xs uppercase">
                发展历程
              </span>
              <span className="w-10 h-px bg-forest-600" />
            </div>
            <h2 className="text-heading-2 font-bold text-zinc-900 text-balance">
              我们的成长足迹
            </h2>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-forest-200 md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* 圆点 */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-forest-600 border-4 border-forest-50 md:-translate-x-1/2 z-10" />

                  {/* 内容卡片 */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <div className="bg-white p-6 rounded-card shadow-soft hover:shadow-medium transition-shadow">
                      <div className="text-2xl font-bold text-forest-700 mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={teamRef} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-10 h-px bg-forest-600" />
              <span className="text-forest-700 font-medium tracking-widest text-xs uppercase">
                核心团队
              </span>
              <span className="w-10 h-px bg-forest-600" />
            </div>
            <h2 className="text-heading-2 font-bold text-zinc-900 text-balance max-w-2xl mx-auto">
              专业的团队，为您服务
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4 overflow-hidden rounded-card">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">{member.name}</h3>
                <p className="text-sm text-forest-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="py-section bg-bone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-amber-500" />
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase">
                  联系我们
                </span>
              </div>

              <h2 className="text-heading-2 font-bold text-zinc-900 mb-6 text-balance">
                有任何问题？
                <br />
                随时与我们联系
              </h2>

              <p className="text-zinc-600 leading-relaxed mb-8">
                我们的客服团队随时为您解答疑问，无论是产品咨询、配送服务还是售后问题，
                我们都会第一时间为您处理。
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-card">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">门店地址</div>
                    <div className="font-medium text-zinc-900">{contactInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-card">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                    <Phone size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">客服热线</div>
                    <div className="font-medium text-zinc-900">{contactInfo.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-card">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                    <Envelope size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">电子邮箱</div>
                    <div className="font-medium text-zinc-900">{contactInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-card">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                    <Clock size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">营业时间</div>
                    <div className="font-medium text-zinc-900">{contactInfo.workHours}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-card shadow-medium p-8">
              <h3 className="text-xl font-semibold text-zinc-900 mb-6">在线留言</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">姓名</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">电话</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="请输入电话"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">留言内容</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none"
                    placeholder="请输入您的留言内容..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-forest-700 text-white font-medium rounded-button hover:bg-forest-800 transition-colors active:scale-[0.98]"
                >
                  提交留言
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <BackToTop />
    </div>
  )
}

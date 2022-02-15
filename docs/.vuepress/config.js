module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '陈科衡的博客',
    description: '陈科衡的vuepress博客',
    head: ['link', { rel: 'icon', href: '/img/light.png' }],

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '/img/light.png',
        logoDark: '/img/dark.png',
        darkMode: true,
        repo: 'https://github.com/kehengch/kehengch.github.io',
        repoLabel: 'GitHub',
        editLink: true,
        editLinkText: '编辑此页',
        navbar: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: 'Vue',
                link: '/vue'
            },
            {
                text: '海洋',
                children: [
                    {
                        text: '渔业导论',
                        children: [
                            {
                                text: '目录',
                                link: '/fishguide'
                            },
                            {
                                text: '一、绪论、世界和国内现状',
                                link: '/fishguide/2021fish01.md'
                            }
                        ],
                    },
                    {
                        text: '其它',
                        children: [
                            {
                                text: 'AJAX',
                                link: '/mixin/AJAX学习笔记.md'
                            },
                            {
                                text: 'cookie',
                                link: '/mixin/cookie.md'
                            }
                        ],
                    }
                ],
            },
            {
                text: '关于我',
                link: '/about/'
            },
            {
                text: '友链',
                children: [
                    {
                        text: 'vuepress',
                        link: 'https://v2.vuepress.vuejs.org/zh'
                    },
                    {
                        text: 'vue',
                        link: 'https://v3.cn.vuejs.org'
                    }
                ]
            }
        ],
        lastUpdated: true,
        lastUpdatedText: '最近更新于',
        contributors: true,
        contributorsText: '贡献者',
        tip: '提示',
        warning: '警告',
        danger: '危险',
        notFound: ["Not Found","404","页面飞了~","文章不存在！"],
        backToHome: '回到主页',
    }
}

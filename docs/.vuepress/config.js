module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '陈科衡的博客',
    description: '陈科衡的vuepress博客',
    head: [
        ['link', {
            rel: 'icon',
            href: '/img/light.png'
        }]
    ],
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '/img/light.png',
        logoDark: '/img/dark.png',
        repo: 'https://github.com/kehengch/kehengch.github.io',
        repoLabel: 'GitHub',
        editLink: true,
        editLinkText: '编辑此页',
        navbar: [{
                text: '主页',
                link: '/'
            },
            {
                text: '关于我',
                link: '/about/'
            },
            {
                text: '友链',
                children: [{
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
        notFound: ["Not Found", "404", "页面飞了~", "文章不存在！"],
        backToHome: '回到主页',
    }
}
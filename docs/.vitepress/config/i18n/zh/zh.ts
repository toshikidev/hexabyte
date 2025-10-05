import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  title: 'Hexabyte',
  description: '思考，阅读与写作；反思，审核与发布。',

  themeConfig: {
    nav: [
      {
        text: '记录',
        link: '/zh/memo/',
      },
      {
        text: '测评', 
        link: '/zh/review/',
      },
      {
        text: '开发',
        link: '/zh/dev/',
      },
    ],

    editLink: {
      pattern: 'https://github.com/toshikidev/hexabyte/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 <a href="https://github.com/toshikidev/hexabyte/blob/main/LICENSE">MIT 协议</a> 发布。',
      copyright: 'Copyright © 2025-present Hexabyte',
    },

    search: {
      provider: 'local',
    },

  },
})
// .vitepress/config.ts
import { withSidebar } from 'vitepress-sidebar'
import { defineConfig } from 'vitepress'
import lightbox from 'vitepress-plugin-lightbox'
import { autoIndexPlugin } from './plugins/auto-index'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

const baseUrl = 'https://hexabyte.cc'
const RSS: RSSOptions = {
  title: 'Hexabyte CC',
  baseUrl,
  copyright: 'Copyright (c) 2025-present, Hexabyte CC',
}

const vitePressOptions = {
  title: "Hexabyte",
  description: "Think, Read & Write; Reflect, Audit & Publish.",
  markdown: {
    config: (md) => {
      md.use(lightbox, {})
    },
  },
  themeConfig: {
    nav: [
      { text: 'Memo', link: '/memo/' },
      { text: 'Review', link: '/review/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/toshikidev/hexabyte' }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/toshikidev/hexabyte/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present Hexabyte'
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    plugins: [autoIndexPlugin(), RssPlugin(RSS)],
    resolve: {
      alias: {
        crypto: 'node:crypto' // force Node’s built-in crypto
      }
    }
  }
}

// multiple sidebars: one for /memo/, one for /review/
const vitePressSidebarOptions = [
  {
    documentRootPath: 'docs',   // always where .vitepress is
    scanStartPath: 'memo',      // only scan docs/memo
    resolvePath: '/memo/',      // shows when visiting /memo/*
    basePath: '/memo/',         // links become /memo/xxx
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'review',
    resolvePath: '/review/',
    basePath: '/review/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  }
]

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))

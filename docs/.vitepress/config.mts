// .vitepress/config.ts
import { withSidebar } from 'vitepress-sidebar'
import { defineConfig } from 'vitepress'
import lightbox from 'vitepress-plugin-lightbox'
import { autoIndexPlugin } from './plugins/auto-index'
import { bookmarkPreviewPlugin, bookmarkPreviewMdPlugin } from './plugins/bookmark-preview'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'
import mdkatex from '@andatoshiki/markdown-it-katex'
import mdLink from 'markdown-it-link-preview'

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

const baseUrl = 'https://hexabyte.cc'
const RSS: RSSOptions = {
  title: 'Hexabyte CC',
  baseUrl,
  copyright: 'Copyright (c) 2025-present, Hexabyte CC',
}

const vitePressOptions = {
  title: 'Hexabyte',
  description: 'Think, Read & Write; Reflect, Audit & Publish.',
  head: [
    [
      'script',
      {
        defer: '',
        src: 'https://umami.toshiki.dev/script.js',
        'data-website-id': '19c4f141-5d75-4aee-9687-82de52667328',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.toshiki.dev/ajax/libs/KaTeX/0.16.0/katex.min.css',
      },
    ],
  ],
  markdown: {
    // math: true,
    config: (md) => {
      md.use(lightbox)
      md.use(mdkatex)
      md.use(mdLink)
      md.use(bookmarkPreviewMdPlugin)
    },
    lineNumbers: false
  },
  themeConfig: {
    lastUpdated: true,
    editLink: {
      pattern: 'https://github.com/toshikidev/hexabyte/edit/master/docs/:path'
    },
    logo: '/hexabyte.png',
    nav: [
      { text: 'Memo', link: '/memo/' },
      { text: 'Review', link: '/review/' },
      { text: 'Development', link: '/dev/'}
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/toshikidev/hexabyte' }],
    footer: {
      message:
        'Released under the <a href="https://github.com/toshikidev/hexabyte/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present Hexabyte',
    },
    search: {
      provider: 'local',
    },
  },
  vite: {
    plugins: [
      autoIndexPlugin(),
      RssPlugin(RSS),
      GitChangelog({
        // Fill in your repository URL here
        repoURL: () => 'https://github.com/toshikidev/hexabyte',
      }),
      GitChangelogMarkdownSection(),
      bookmarkPreviewPlugin(),
    ],
    resolve: {
      alias: {
        crypto: 'node:crypto', // force Node’s built-in crypto
      },
    },
  },
  sitemap: {
    hostname: 'https://hexabyte.cc',
  },
}

// multiple sidebars: one for /memo/, one for /review/
const vitePressSidebarOptions = [
  {
    documentRootPath: 'docs', // always where .vitepress is
    scanStartPath: 'memo', // only scan docs/memo
    resolvePath: '/memo/', // shows when visiting /memo/*
    basePath: '/memo/', // links become /memo/xxx
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
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'dev',
    resolvePath: '/dev/',
    basePath: '/dev/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
]

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))

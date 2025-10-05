import { autoIndexPlugin } from '../../plugins/auto-index'
import { bookmarkPreviewPlugin } from '../../plugins/bookmark-preview'
import { RssPlugin, type RSSOptions } from 'vitepress-plugin-rss'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default {
  plugins: [
    autoIndexPlugin(),
    RssPlugin({
      title: 'Hexabyte CC',
      baseUrl: 'https://hexabyte.cc',
      copyright: 'Copyright (c) 2025-present, Hexabyte CC',
    } as RSSOptions),
    GitChangelog({
      repoURL: () => 'https://github.com/toshikidev/hexabyte',
    }),
    GitChangelogMarkdownSection
({ 
      exclude
: (id
) => id
.endsWith
('index.md'), 
    }),
    bookmarkPreviewPlugin(),
  ],
  resolve: {
    alias: {
      crypto: 'node:crypto',
    },
  },
  ssr: {
      noExternal: ["vuetify"]
    }
}
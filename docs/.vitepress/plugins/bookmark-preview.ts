import type { Plugin } from 'vitepress'
import MarkdownIt from 'markdown-it'

export function bookmarkPreviewPlugin(): Plugin {
  return {
    name: 'vitepress-bookmark-preview',
    configResolved(config) {
      if (!config.markdown) config.markdown = {}
      const origConfig = config.markdown.config
      config.markdown.config = (md) => {
        if (origConfig) origConfig(md)
        md.use(bookmarkPreviewMdPlugin)
      }
    },
  }
}

export function bookmarkPreviewMdPlugin(md: MarkdownIt) {
  // Inline rule to replace [bookmark](url) with [@preview](url)
  md.core.ruler.after('inline', 'bookmark-preview', function (state) {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type !== 'inline' || !token.children) continue
      for (let j = 0; j < token.children.length; j++) {
        const t = token.children[j]
        // Find a link_open followed by a text 'bookmark' and a link_close
        if (
          t.type === 'link_open' &&
          token.children[j + 1] &&
          token.children[j + 1].type === 'text' &&
          token.children[j + 1].content === 'bookmark' &&
          token.children[j + 2] &&
          token.children[j + 2].type === 'link_close'
        ) {
          token.children[j + 1].content = '@preview'
        }
      }
    }
  })
}

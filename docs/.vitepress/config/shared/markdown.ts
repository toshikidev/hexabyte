// import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
// import { ElementTransform } from '@nolebase/markdown-it-element-transform'
import type { MarkdownOptions } from 'vitepress'
import mdkatex from '@andatoshiki/markdown-it-katex'
import mdLink from 'markdown-it-link-preview'
import lightbox from 'vitepress-plugin-lightbox'
import { bookmarkPreviewMdPlugin } from '../../plugins/bookmark-preview'

// import mdLink from 'markdown-it-link-preview'

export const markdown: MarkdownOptions = {
  html: true,
  theme: {
    light: 'github-light',
    dark: 'github-dark-dimmed',
  },
  lineNumbers: false,
  config: (md) => {
    // use more markdown-it plugins!
    ;(md.use(mdkatex),
      md.use(mdkatex),
      md.use(mdLink),
      md.use(lightbox),
      md.use(bookmarkPreviewMdPlugin))
  },
}

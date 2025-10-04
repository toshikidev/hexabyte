import type { Plugin } from 'vite'
import { getReadingTime } from '../utils'
// import { replacer } from '../../../scripts/utils'

export function MarkdownTransform(): Plugin {
  return {
    name: 'markdown-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) return null
      // convert links to relative
      code = code.replace(/https?:\/\/note.toshiki\.dev\//g, '/')
      const [_name, i] = id.split('/').slice(-2)

      // cut index.md
      if (_name === 'docs' && i === 'index.md') return code

      // const { footer } = await getDocsMarkdown()
      // code = replacer(code, footer, 'FOOTER', 'tail')
      const { readTime, words } = getReadingTime(code)
      code = code.replace(
        /(#\s.+?\n)/,
        `$1\n\n<PageInfo readTime="${readTime}" words="${words}"/>\n`
      )

      return code
    },
  }
}

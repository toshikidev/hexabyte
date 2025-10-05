import type { HeadConfig } from 'vitepress'
// import { metaData } from './constants'

export const head: HeadConfig[] = [
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
]

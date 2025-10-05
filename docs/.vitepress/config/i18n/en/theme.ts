import type { DefaultTheme } from 'vitepress'
import { nav } from '../../shared/nav'
import { footer } from '../../shared/footer'

export const themeConfig: DefaultTheme.Config = {
  nav, // documentation navigation bar config
  footer, // site global footer config

  logo: '/hexabyte.png',
  outline: 'deep', // documentation outline header precedence
  outlineTitle: 'TOC', // documentation outline title text
  search: {
    provider: 'local',
  },
  // documentation edit link
  editLink: {
    pattern: 'https://github.com/toshikidev/hexabyte/edit/master/docs/:path',
    text: 'Edit this page on GitHub',
  },
}

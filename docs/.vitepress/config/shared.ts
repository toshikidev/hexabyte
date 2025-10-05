// Shared configs across all locales
import { markdown } from './shared/markdown'
import { head } from './shared/head'
import { sitemap } from './shared/sitemap'
import { metaData } from './shared/constants'
import { themeConfig } from './shared/theme'
import vite from './shared/vite'

export const sharedConfig = {
  base: metaData.base,
  head,
  markdown,
  vite,
  sitemap,
  // Add minimal themeConfig for RSS plugin compatibility
  themeConfig,
}
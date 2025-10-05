import { defineConfig } from 'vitepress'
import { themeConfig } from './theme'

export const en = defineConfig({
  lang: 'en-US',
  title: 'Hexabyte',
  description: 'Think, Read & Write; Reflect, Audit & Publish.',

  themeConfig,
})

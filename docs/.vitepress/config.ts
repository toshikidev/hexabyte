// default imports
import { withSidebar } from 'vitepress-sidebar'
import { defineConfig } from 'vitepress'
import { locales } from './config/locales'
// modular configs
import { vitePressSidebarOptions } from './config/shared/sidebar'
import { sharedConfig } from './config/shared'

const vitePressOptions = {
  ...sharedConfig,
  locales,
}

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))

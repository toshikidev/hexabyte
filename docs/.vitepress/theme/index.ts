// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Artalk from './components/Artalk.vue'
import PageInfo from './components/PageInfo.vue'
import Layout from './components/Layout.vue'
import 'mdit-plugin-callouts/index.css'
import './styles/style.scss'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import 'uno.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
  app.component('Artalk', Artalk)
  app.component('PageInfo', PageInfo)

    app.use(NolebaseGitChangelogPlugin, {
      hideContributorsHeader: true,
      // hideChangelogHeader: true,
      // hideChangelogNoChangesText: true,
    })
  },
} satisfies Theme

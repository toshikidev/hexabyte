// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Artalk from './components/artalk.vue'
import Layout from './components/Layout.vue'
import 'mdit-plugin-callouts/index.css'
import './styles/style.css'

export default {
  extends: DefaultTheme,
  
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('Artalk', Artalk)
  }
} satisfies Theme


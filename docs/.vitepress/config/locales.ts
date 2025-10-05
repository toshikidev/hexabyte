import { zh } from './i18n/zh/zh'
import { en } from './i18n/en/en'

export const locales = {
  root: {
    label: 'English',
    lang: 'en-US',
    ...en,
  },
  zh: {
    label: '简体中文',
    lang: 'zh-CN',
    ...zh,
  },
}

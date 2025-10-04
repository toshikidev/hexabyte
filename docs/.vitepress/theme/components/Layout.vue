<script setup>
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import mediumZoom from 'medium-zoom'

const { Layout } = DefaultTheme
const router = useRouter()

// Setup medium zoom with the desired options
const setupMediumZoom = () => {
  mediumZoom('[data-zoomable]', {
    background: 'transparent',
  })
}

// Apply medium zoom on load
onMounted(setupMediumZoom)

// Subscribe to route changes to re-apply medium zoom effect
router.onAfterRouteChange = setupMediumZoom

const { lang } = useData()
watchEffect(() => {
  if (inBrowser)
    document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <Artalk />
    </template>
  </Layout>
</template>

<style>
.medium-zoom-overlay {
  backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>

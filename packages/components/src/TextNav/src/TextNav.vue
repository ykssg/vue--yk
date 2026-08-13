<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface TextNavItem {
  id: number
  text: string
  path?: string
}

interface Bubble {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

defineOptions({
  name: 'YkTextnav',
  inheritAttrs: false
})

const props = defineProps<{
  model?: string
}>()

const attrs = useAttrs()

const items = computed<TextNavItem[]>(() => {
  const texts = (props.model || '')
    .split(/[，,、]/)
    .map((s) => s.trim())
    .filter(Boolean)
  return texts.map((text, i) => {
    const path = attrs[`a-v${i}`]
    return {
      id: i,
      text,
      path: typeof path === 'string' ? path : undefined
    }
  })
})

const bubbles = generateBubbles()

function generateBubbles(): Bubble[] {
  const count = 7
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 6 + Math.random() * 18,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 6,
    opacity: 0.15 + Math.random() * 0.3
  }))
}

function bubbleStyle(b: Bubble) {
  return {
    left: `${b.left}%`,
    width: `${b.size}px`,
    height: `${b.size}px`,
    '--bubble-duration': `${b.duration}s`,
    '--bubble-delay': `${b.delay}s`,
    '--bubble-opacity': b.opacity
  }
}
</script>

<template>
  <nav class="textnav">
    <span class="textnav__bg" aria-hidden="true">
      <span
        v-for="b in bubbles"
        :key="b.id"
        class="textnav__bubble"
        :style="bubbleStyle(b)"
      ></span>
    </span>

    <template v-for="item in items" :key="item.id">
      <a v-if="item.path" :href="item.path" class="textnav__item">{{ item.text }}</a>
      <span v-else class="textnav__item">{{ item.text }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'YkTextNav'
})

interface TextNavItem {
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

withDefaults(defineProps<{
  items?: TextNavItem[]
}>(), {
  items: () => []
})

const bubbles = generateBubbles()

// 基于 index 的确定性伪随机，保证 SSR 与客户端产物一致，避免 hydration mismatch
function generateBubbles(): Bubble[] {
  const count = 7
  const rand = (seed: number) => {
    const x = Math.sin(seed * 999) * 10000
    return x - Math.floor(x)
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand(i + 1) * 100,
    size: 6 + rand(i + 2) * 18,
    duration: 6 + rand(i + 3) * 8,
    delay: rand(i + 4) * 6,
    opacity: 0.15 + rand(i + 5) * 0.3
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
  <nav class="yk-text-nav">
    <span class="yk-text-nav__bg" aria-hidden="true">
      <span
        v-for="b in bubbles"
        :key="b.id"
        class="yk-text-nav__bubble"
        :style="bubbleStyle(b)"
      ></span>
    </span>

    <template v-for="(item, idx) in items" :key="idx">
      <a v-if="item.path" :href="item.path" class="yk-text-nav__item">{{ item.text }}</a>
      <span v-else class="yk-text-nav__item">{{ item.text }}</span>
    </template>
  </nav>
</template>

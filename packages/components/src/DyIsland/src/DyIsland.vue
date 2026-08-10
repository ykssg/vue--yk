<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'YkDyIsland'
})

interface Tool {
  name: string
  icon?: string
  onClick?: () => void
}

const props = withDefaults(defineProps<{
  message?: string
  tools?: Tool[]
  glowColors?: string[]
  glowSpeed?: number
  backgroundColor?: string
  backgroundImage?: string
  backgroundModel?: number
}>(), {
  message: '',
  tools: () => [],
  glowColors: () => ['#ff00c8', '#00e5ff', '#7b2fff'],
  glowSpeed: 3,
  backgroundColor: '#000',
  backgroundImage: '',
  backgroundModel: 0.55,
})

const emit = defineEmits<{
  'update:message': [value: string]
}>()

const islandRef = ref<HTMLElement>()

function onClickOutside(e: MouseEvent) {
  if (!props.message) return
  if (islandRef.value && !islandRef.value.contains(e.target as Node)) {
    emit('update:message', '')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
})

const isHover = ref(false)
const isExpanded = computed(() => !!props.message || isHover.value)

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const timeStr = computed(() => {
  const h = now.value.getHours()
  const m = now.value.getMinutes()
  return `${h}:${m.toString().padStart(2, '0')}`
})

const visibleTools = computed(() => props.tools.slice(0, 4))
const hasMore = computed(() => props.tools.length > 4)

function hexToRgb(hex: string): [number, number, number] | null {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  if (hex.length !== 6) return null
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

const finalBg = computed(() => {
  const alpha = props.backgroundModel
  let color = props.backgroundColor

  const rgb = hexToRgb(color)
  if (rgb) {
    color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
  }

  if (props.backgroundImage) {
    return `url(${props.backgroundImage}) center / cover no-repeat, ${color}`
  }
  return color
})

const glowGradientId = 'glow-grad'
</script>

<template>
  <div
    ref="islandRef"
    class="dy-island"
    :class="{ 'is-expanded': isExpanded, 'is-glowing': !!message }"
    :style="{
      '--glow-speed': `${glowSpeed}s`,
      '--bg-final': finalBg,
    }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <!-- SVG 流光边框 -->
    <svg
      v-if="message"
      class="glow-svg"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient :id="glowGradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            v-for="(c, i) in glowColors"
            :key="i"
            :offset="`${(i / (glowColors.length - 1)) * 100}%`"
            :stop-color="c"
          />
        </linearGradient>
        <filter id="glow-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <!-- 外层柔光 -->
      <rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
        :rx="isExpanded ? 24 : 18"
        fill="none"
        stroke-width="4"
        :stroke="`url(#${glowGradientId})`"
        stroke-dasharray="70 1000"
        stroke-linecap="round"
        filter="url(#glow-blur)"
        opacity="0.5"
        class="glow-path"
      />
      <!-- 内层锐利光带 -->
      <rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
        :rx="isExpanded ? 24 : 18"
        fill="none"
        stroke-width="2"
        :stroke="`url(#${glowGradientId})`"
        stroke-dasharray="50 1000"
        stroke-linecap="round"
        class="glow-path"
      />
    </svg>

    <!-- 收起态 -->
    <template v-if="!isExpanded">
      <span class="dy-island__time">{{ timeStr }}</span>
    </template>

    <!-- 展开态 -->
    <template v-else>
      <div v-if="message" class="dy-island__msg-wrap">
        <span class="dy-island__message">--- {{ message }} ---</span>
      </div>
      <div v-else class="dy-island__msg-wrap dy-island__msg-wrap--placeholder">
        <span class="dy-island__device">设备</span>
      </div>

      <div class="dy-island__bottom">
        <span class="dy-island__time-expanded">{{ timeStr }}</span>
        <div class="dy-island__tools" v-if="tools.length">
          <button
            v-for="tool in visibleTools"
            :key="tool.name"
            class="dy-island__tool"
            :title="tool.name"
            @click="tool.onClick"
          >
            <span class="dy-island__tool-icon">{{ tool.icon || tool.name }}</span>
          </button>
          <button v-if="hasMore" class="dy-island__tool dy-island__tool--more" title="更多">
            ···
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

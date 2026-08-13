<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useId } from '../../../../utils/useId'

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
  backgroundAlpha?: number
}>(), {
  message: '',
  tools: () => [],
  glowColors: () => ['#ff00c8', '#00e5ff', '#7b2fff'],
  glowSpeed: 3,
  backgroundColor: '#000',
  backgroundImage: '',
  backgroundAlpha: 0.55,
})

const emit = defineEmits<{
  'update:message': [value: string]
}>()

const glowGradientId = useId('dy-glow-grad')
const glowBlurId = useId('dy-glow-blur')

const islandRef = ref<HTMLElement>()
const isHover = ref(false)
const isExpanded = computed(() => !!props.message || isHover.value)

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined

const timeStr = computed(() => {
  const h = now.value.getHours()
  const m = now.value.getMinutes()
  return `${h}:${m.toString().padStart(2, '0')}`
})

const visibleTools = computed(() => props.tools.slice(0, 4))

function onClickOutside(e: MouseEvent) {
  if (!props.message) return
  if (islandRef.value && !islandRef.value.contains(e.target as Node)) {
    emit('update:message', '')
  }
}

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, '')
  let full = clean
  if (clean.length === 3) {
    full = clean.split('').map((c) => c + c).join('')
  }
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const finalBg = computed(() => {
  const alpha = props.backgroundAlpha
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

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
  // 分钟级显示，60s 刷新一次即可，避免每秒触发重渲染
  timer = setInterval(() => {
    now.value = new Date()
  }, 60_000)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    ref="islandRef"
    class="yk-dy-island"
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
      class="yk-dy-island__glow-svg"
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
        <filter :id="glowBlurId">
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
        :filter="`url(#${glowBlurId})`"
        opacity="0.5"
        class="yk-dy-island__glow-path"
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
        class="yk-dy-island__glow-path"
      />
    </svg>

    <!-- 收起态 -->
    <template v-if="!isExpanded">
      <span class="yk-dy-island__time">{{ timeStr }}</span>
    </template>

    <!-- 展开态 -->
    <template v-else>
      <div v-if="message" class="yk-dy-island__msg-wrap">
        <span class="yk-dy-island__message">--- {{ message }} ---</span>
      </div>
      <div v-else class="yk-dy-island__msg-wrap yk-dy-island__msg-wrap--placeholder">
        <span class="yk-dy-island__device">设备</span>
      </div>

      <div class="yk-dy-island__bottom">
        <span class="yk-dy-island__time-expanded">{{ timeStr }}</span>
        <div v-if="tools.length" class="yk-dy-island__tools">
          <button
            v-for="tool in visibleTools"
            :key="tool.name"
            class="yk-dy-island__tool"
            :title="tool.name"
            @click="tool.onClick"
          >
            <span class="yk-dy-island__tool-icon">{{ tool.icon || tool.name }}</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

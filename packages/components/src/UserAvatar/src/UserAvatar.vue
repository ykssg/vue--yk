<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkUserAvatar'
})

const props = withDefaults(defineProps<{
  avatar?: string
  frame?: string
  image?: 0 | 1
  model?: 'image' | 'flow' | 'over'
  glowColors?: string[]
  glowSpeed?: number
}>(), {
  avatar: '',
  frame: '',
  image: 1,
  model: 'image',
  glowColors: () => ['#ff00c8', '#00e5ff', '#7b2fff'],
  glowSpeed: 3,
})

const showImageFrame = computed(() => props.model === 'image' && props.frame)
const showGlow = computed(() => props.model === 'flow' || props.model === 'over')

// flow: 作为外框，受 image 控制层级
// over: 包裹全部，始终在最外层
const glowZ = computed(() => props.model === 'over' ? 10 : (props.image === 1 ? 0 : 2))
const avatarZ = computed(() => props.image === 1 ? 2 : 0)
const frameZ = computed(() => props.image === 1 ? 0 : 2)

const glowGradientId = 'ua-glow-grad'
</script>

<template>
  <div class="user-avatar">
    <!-- SVG 流光 -->
    <svg
      v-if="showGlow"
      class="user-avatar__glow"
      :style="{ zIndex: glowZ }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
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
        <filter id="ua-glow-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <!-- flow：光带流转 -->
      <template v-if="model === 'flow'">
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="3"
          :stroke="`url(#${glowGradientId})`"
          stroke-dasharray="60 500"
          stroke-linecap="round"
          filter="url(#ua-glow-blur)"
          opacity="0.5"
          class="ua-glow-path"
          :style="{ animationDuration: `${glowSpeed}s` }"
        />
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="2"
          :stroke="`url(#${glowGradientId})`"
          stroke-dasharray="40 500"
          stroke-linecap="round"
          class="ua-glow-path"
          :style="{ animationDuration: `${glowSpeed}s` }"
        />
      </template>

      <!-- over：边框整体发光 + 高光转圈 -->
      <template v-if="model === 'over'">
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="2"
          :stroke="`url(#${glowGradientId})`"
          filter="url(#ua-glow-blur)"
          opacity="0.6"
        />
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="2"
          :stroke="`url(#${glowGradientId})`"
          opacity="0.9"
        />
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="2.5"
          stroke="#fff"
          stroke-dasharray="30 500"
          stroke-linecap="round"
          opacity="0.8"
          class="ua-glow-path"
          :style="{ animationDuration: `${glowSpeed}s` }"
        />
      </template>
    </svg>

    <img
      v-if="avatar"
      class="user-avatar__img"
      :src="avatar"
      :style="{ zIndex: avatarZ }"
      alt="avatar"
    />

    <img
      v-if="showImageFrame"
      class="user-avatar__frame"
      :src="frame"
      :style="{ zIndex: frameZ }"
      alt="frame"
    />
  </div>
</template>

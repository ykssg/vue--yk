<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../../../../utils/useId'

defineOptions({
  name: 'YkUserAvatar'
})

const props = withDefaults(defineProps<{
  avatar?: string
  avatarAlt?: string
  frame?: string
  frameAlt?: string
  imageOnTop?: boolean
  model?: 'image' | 'flow' | 'over'
  glowColors?: string[]
  glowSpeed?: number
}>(), {
  avatar: '',
  avatarAlt: 'avatar',
  frame: '',
  frameAlt: 'frame',
  imageOnTop: true,
  model: 'image',
  glowColors: () => ['#ff00c8', '#00e5ff', '#7b2fff'],
  glowSpeed: 3,
})

// 层级常量：外框 < 图片 < 流光
const Z_BASE = 0
const Z_IMAGE = 2
const Z_GLOW = 10

const glowGradientId = useId('ua-glow-grad')
const glowBlurId = useId('ua-glow-blur')

const showImageFrame = computed(() => props.model === 'image' && !!props.frame)
const showGlow = computed(() => props.model === 'flow' || props.model === 'over')

// flow: 作为外框，受 imageOnTop 控制层级
// over: 包裹全部，始终在最外层
const glowZ = computed(() =>
  props.model === 'over' ? Z_GLOW : props.imageOnTop ? Z_BASE : Z_IMAGE
)
const avatarZ = computed(() => (props.imageOnTop ? Z_IMAGE : Z_BASE))
const frameZ = computed(() => (props.imageOnTop ? Z_BASE : Z_IMAGE))
</script>

<template>
  <div class="yk-user-avatar">
    <!-- SVG 流光 -->
    <svg
      v-if="showGlow"
      class="yk-user-avatar__glow"
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
        <filter :id="glowBlurId">
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
          :filter="`url(#${glowBlurId})`"
          opacity="0.5"
          class="yk-user-avatar__glow-path"
          :style="{ animationDuration: `${glowSpeed}s` }"
        />
        <rect
          x="2" y="2" width="68" height="68" rx="50%"
          fill="none"
          stroke-width="2"
          :stroke="`url(#${glowGradientId})`"
          stroke-dasharray="40 500"
          stroke-linecap="round"
          class="yk-user-avatar__glow-path"
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
          :filter="`url(#${glowBlurId})`"
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
          class="yk-user-avatar__glow-path"
          :style="{ animationDuration: `${glowSpeed}s` }"
        />
      </template>
    </svg>

    <img
      v-if="avatar"
      class="yk-user-avatar__img"
      :src="avatar"
      :alt="avatarAlt"
      :style="{ zIndex: avatarZ }"
    />

    <img
      v-if="showImageFrame"
      class="yk-user-avatar__frame"
      :src="frame"
      :alt="frameAlt"
      :style="{ zIndex: frameZ }"
    />
  </div>
</template>

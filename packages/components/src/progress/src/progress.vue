<script lang="ts">
export type ProgressModel = 'strip' | 'ring' | 'text'

export interface ProgressProps {
  /** 进度条类型：strip 长条 / ring 环形 / text 文字 */
  model?: ProgressModel
  /** 当前进度值，范围 1 - 100 */
  value?: number
  /** 长条进度条头部贴图（CSS 背景值，如 url('xxx.png')），仅在 model 为 strip 时生效 */
  image?: string
  /** 底层（轨道）颜色 */
  backgroundimage?: string
  /** 顶部（已填充）颜色 */
  topimage?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkProgress'
})

const props = withDefaults(defineProps<ProgressProps>(), {
  model: 'strip',
  value: 0,
  image: '',
  backgroundimage: '#ebeef5',
  topimage: '#409eff'
})

const percentage = computed(() => Math.min(100, Math.max(0, props.value)))

const CIRCUMFERENCE = 2 * Math.PI * 45

const ringOffset = computed(() => CIRCUMFERENCE * (1 - percentage.value / 100))
</script>

<template>
  <div class="yk-progress" :class="`yk-progress--${model}`">
    <!-- 长条进度条 -->
    <template v-if="model === 'strip'">
      <div class="yk-progress__track" :style="{ backgroundColor: backgroundimage }">
        <div
          class="yk-progress__bar"
          :style="{ width: percentage + '%', backgroundColor: topimage }"
        >
          <span
            v-if="image"
            class="yk-progress__image"
            :style="{ backgroundImage: image }"
          ></span>
        </div>
      </div>
    </template>

    <!-- 环形进度条 -->
    <template v-else-if="model === 'ring'">
      <div class="yk-progress__ring">
        <svg viewBox="0 0 100 100">
          <circle
            class="yk-progress__ring-track"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            :stroke="backgroundimage"
            stroke-width="8"
          />
          <circle
            class="yk-progress__ring-bar"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            :stroke="topimage"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="CIRCUMFERENCE"
            :stroke-dashoffset="ringOffset"
          />
        </svg>
        <span class="yk-progress__ring-text">{{ percentage }}%</span>
      </div>
    </template>

    <!-- 文字进度 -->
    <template v-else>
      <span class="yk-progress__text">{{ percentage }}%</span>
    </template>
  </div>
</template>

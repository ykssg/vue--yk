<script lang="ts">
export type DividerModel = 'solid' | 'dashed' | 'dotted' | 'double' | 'string'

export interface DividerProps {
  /** 分割线样式：solid 实线 / dashed 虚线 / dotted 点线 / double 双线 / string 自定义符号 */
  model?: DividerModel
  /** 自定义分割线符号（model 为 string 时使用） */
  text?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkDivider'
})

const props = withDefaults(defineProps<DividerProps>(), {
  model: 'solid',
  text: '*'
})

// 重复符号填满整行，配合 overflow:hidden 裁剪到 80% 宽度
const stringLine = computed(() => props.text.repeat(120))
</script>

<template>
  <div class="yk-divider" :class="`yk-divider--${model}`">
    <span v-if="model === 'string'" class="yk-divider__string">{{ stringLine }}</span>
  </div>
</template>

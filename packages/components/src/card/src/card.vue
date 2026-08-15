<script lang="ts">
export interface CardProps {
  /** 背景图（CSS 值，如 url('...')） */
  backgroundImage?: string
  /** 文字颜色 */
  textColor?: string
  /** 是否显示用户信息（用户名 + 创建时间），支持布尔值或字符串（如 user-model="true"） */
  userModel?: boolean | string
  /** 用户名 */
  username?: string
  /** 创建时间（日期字符串或时间戳） */
  time?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkCard'
})

const props = withDefaults(defineProps<CardProps>(), {
  backgroundImage: '',
  textColor: '#ffffff',
  userModel: false,
  username: '',
  time: ''
})

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundImage) {
    style.backgroundImage = props.backgroundImage
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  style.color = props.textColor || '#ffffff'
  return style
})

// 兼容 <yk-card user-model="false"> 这类字符串写法，避免布尔值被当作字符串判断
const showUser = computed(() => {
  const value = props.userModel
  if (typeof value === 'boolean') return value
  return value !== 'false' && value !== '0' && value !== ''
})

// 今年内显示「月日」，否则显示「年月日」
const formattedTime = computed(() => {
  const date = parseTime(props.time)
  if (!date) return props.time

  const now = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return year === now.getFullYear()
    ? `${month}月${day}日`
    : `${year}年${month}月${day}日`
})

function parseTime(value: string): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  // 纯数字视为时间戳（秒或毫秒）
  if (/^\d+$/.test(trimmed)) {
    const num = Number(trimmed)
    const date = new Date(num < 1e12 ? num * 1000 : num)
    return isNaN(date.getTime()) ? null : date
  }

  const date = new Date(trimmed)
  return isNaN(date.getTime()) ? null : date
}
</script>

<template>
  <div class="yk-card" :style="rootStyle">
    <div class="yk-card__top">
      <div class="yk-card__title">
        <slot />
      </div>
    </div>
    <div class="yk-card__bottom">
      <div v-if="showUser" class="yk-card__user">
        <span class="yk-card__username">{{ username }}</span>
        <span class="yk-card__time">{{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>

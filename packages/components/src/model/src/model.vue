<script lang="ts">
export interface ModelProps {
  /** 是否显示弹窗（v-model） */
  modelValue?: boolean
  /** 顶部标题 */
  title?: string
  /** 主体文字 */
  message?: string
  /** 可选图片地址 */
  image?: string
  /** 文字颜色 */
  textColor?: string
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'YkModel'
})

withDefaults(defineProps<ModelProps>(), {
  modelValue: false,
  title: '',
  message: '',
  image: '',
  textColor: '#333333'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="yk-model-mask" @click.self="handleClose">
      <div class="yk-model">
        <div class="yk-model__header">
          <span class="yk-model__title">{{ title }}</span>
          <div class="yk-model__right">
            <p class="yk-model__close" @click="handleClose">×</p>
          </div>
        </div>
        <div class="yk-model__body">
          <img v-if="image" class="yk-model__image" :src="image" alt="" />
          <div v-if="message" class="yk-model__message" :style="{ color: textColor }">{{ message }}</div>
          <div class="yk-model__content">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

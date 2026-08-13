<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkButton'
})

type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning'

const props = withDefaults(defineProps<{
  type?: ButtonType
}>(), {
  type: 'default'
})

const classList = computed(() => ({
  [`yk-button--${props.type}`]: props.type !== 'default'
}))
</script>

<template>
  <button class="yk-button" :class="classList">
    <slot>按钮</slot>
  </button>
</template>

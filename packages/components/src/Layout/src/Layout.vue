<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'YkLayout'
})

const props = withDefaults(defineProps<{
  width?: number | string
}>(), {
  width: '1200px'
})

const widthStyle = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)
</script>

<template>
  <div class="yk-layout">
    <div class="yk-layout__container" :style="{ width: widthStyle }">
      <div class="yk-layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

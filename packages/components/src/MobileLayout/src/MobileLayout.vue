<script setup lang="ts">
defineOptions({
  name: 'YkMobileLayout'
})

const props = withDefaults(defineProps<{
  ratio?: number
}>(), {
  ratio: 90
})
</script>

<template>
  <div class="yk-mobile-layout">
    <div class="yk-mobile-layout__content" :style="{ flexBasis: `${props.ratio}%` }">
      <slot />
    </div>
    <div class="yk-mobile-layout__footer" :style="{ flexBasis: `${100 - props.ratio}%` }">
      <slot name="footer" />
    </div>
  </div>
</template>

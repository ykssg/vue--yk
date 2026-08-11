<script setup lang="ts">
defineOptions({
  name: 'YkLayout'
})

withDefaults(defineProps<{
  lWidth?: string
}>(), {
  lWidth: '1200px'
})
</script>

<template>
  <div class="layout">
    <div class="layout__container" :style="{ width: lWidth }">
      <div class="layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

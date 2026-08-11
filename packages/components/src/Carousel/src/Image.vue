<script setup lang="ts">
defineOptions({
  name: 'YkImage'
})

withDefaults(defineProps<{
  src?: string
  alt?: string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}>(), {
  src: '',
  alt: '',
  fit: 'cover'
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    class="yk-image"
    :style="{ objectFit: fit }"
  />
</template>

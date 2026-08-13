<script setup lang="ts">
defineOptions({
  name: 'YkMobileLayout'
})
</script>

<template>
  <div class="mobile-layout">
    <div class="mobile-layout__content">
      <slot />
    </div>
    <div class="mobile-layout__nav">
      <slot name="footer" />
    </div>
  </div>
</template>

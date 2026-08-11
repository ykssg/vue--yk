<script setup lang="ts">
const demoImages = [
  { src: 'https://picsum.photos/seed/1/800/400', alt: '图片1' },
  { src: 'https://picsum.photos/seed/2/800/400', alt: '图片2' },
  { src: 'https://picsum.photos/seed/3/800/400', alt: '图片3' },
  { src: 'https://picsum.photos/seed/4/800/400', alt: '图片4' },
  { src: 'https://picsum.photos/seed/5/800/400', alt: '图片5' },
]
</script>

<template>
  <div class="demo">
    <h2>静态模式</h2>
    <YkCarousel
      model="static"
      :images="demoImages"
      :interval="3000"
      height="400px"
    />

    <h2 style="margin-top: 48px">隐藏箭头</h2>
    <YkCarousel
      model="static"
      :images="demoImages.slice(0, 3)"
      :interval="4000"
      height="300px"
      :show-arrow="false"
    />
  </div>
</template>

<style scoped>
.demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}
h2 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
}
</style>

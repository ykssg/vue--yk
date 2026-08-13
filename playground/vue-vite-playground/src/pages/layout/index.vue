<script setup lang="ts">
</script>

<template>
  <YkLayout width="800px">
    <div class="demo-box">
      <h2>Layout 组件演示</h2>
      <p>内容区域始终居中，无论浏览器如何缩放。</p>
      <p>当前容器宽度: 800px（通过 width 属性设置）</p>
    </div>
  </YkLayout>

  <YkLayout width="60%">
    <div class="demo-box" style="background: #e8f4fd;">
      <h2>百分比宽度</h2>
      <p>width="60%" — 宽度跟随视口自动缩放，内容始终居中。</p>
    </div>
  </YkLayout>
</template>

<style scoped>
.demo-box {
  background: #f0f0f0;
  padding: 24px;
  border-radius: 8px;
  min-height: 200px;
}
h2 {
  margin-bottom: 12px;
  font-size: 18px;
}
p {
  color: #666;
  line-height: 1.8;
}
</style>

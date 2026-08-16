<script setup lang="ts">
import { ref } from 'vue'

const value = ref(60)

// 头部贴图占位（data URI，不依赖外网）
const image = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="14" cy="14" r="11" fill="%23f89898"/></svg>')`
</script>

<template>
  <div class="demo">
    <h2>Progress</h2>

    <div class="box">
      <p>拖动滑块查看效果（value: {{ value }}）</p>
      <input v-model.number="value" type="range" min="0" max="100" />

      <p>strip 长条 + 头部贴图</p>
      <yk-progress
        model="strip"
        :value="value"
        :image="image"
        backgroundimage="#ebeef5"
        topimage="#409eff"
      />

      <p>strip 长条（无贴图）</p>
      <yk-progress model="strip" :value="value" topimage="#67c23a" />

      <p>ring 环形</p>
      <yk-progress model="ring" :value="value" topimage="#e6a23c" />

      <p>text 文字</p>
      <yk-progress model="text" :value="value" />
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 80px;
  background: #fff;
  gap: 24px;
}
h2 { font-size: 20px; color: #333; }
.box {
  width: 400px;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px;
}
.box p {
  margin: 16px 0 8px;
  font-size: 13px;
  color: #666;
}
.box input {
  width: 100%;
  margin-bottom: 8px;
}
</style>

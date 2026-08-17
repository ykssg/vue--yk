<script setup lang="ts">
import { ref } from 'vue'

const data = ref<[string, number][]>([
  ['苹果', 10],
  ['香蕉', 20],
  ['橙子', 15],
  ['葡萄', 30]
])

function randomize() {
  data.value = data.value.map(([name]) => [name, Math.round(Math.random() * 50)])
}
</script>

<template>
  <div class="demo">
    <h2>PieChart 饼状图</h2>

    <div class="box">
      <p>基本用法（[name, value]，各扇区自动着色，点击按钮更新数据）</p>
      <yk-pie-chart :data="data" />
      <button @click="randomize">随机更新数据</button>
    </div>

    <div class="box">
      <p>自定义背景</p>
      <yk-pie-chart
        :data="[['苹果', 10], ['香蕉', 20], ['橙子', 15], ['葡萄', 30]]"
        backgroundcolor="rgba(64, 158, 255, 0.08)"
      />
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  padding: 80px 24px;
  background: #fff;
}
h2 {
  font-size: 20px;
  color: #333;
}
.box {
  width: 560px;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px;
}
.box p {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
.box button {
  margin-top: 12px;
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
}
</style>

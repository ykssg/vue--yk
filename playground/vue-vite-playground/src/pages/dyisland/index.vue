<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')

const tools = [
  { icon: '🎵', onClick: () => console.log('音乐') },
  { icon: '⏱', onClick: () => console.log('计时器') },
  { icon: '🎙', onClick: () => console.log('录音') },
  { icon: '🔦', onClick: () => console.log('手电') },
  { icon: '🔢', onClick: () => console.log('计算器') },
]

function simulateMsg() {
  msg.value = msg.value
    ? ''
    : '您有一条新消息通知'
}
</script>

<template>
  <YkDyIsland
    v-model:message="msg"
    :tools="tools"
    :glow-colors="['#ff00c8', '#00e5ff', '#7b2fff', '#ff00c8']"
    :glow-speed="3"
    background-color="#1a1a2e"
    :background-model="0.6"
  />

  <div class="demo">
    <div class="card">
      <p class="hint">收起态 —— 鼠标移入展开；有消息自动展开</p>
      <button class="btn" @click="simulateMsg">
        {{ msg ? '清除消息' : '模拟消息推送' }}
      </button>
      <p class="info">当前消息: {{ msg || '无' }}</p>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e8e8e8;
}
.card {
  text-align: center;
  background: #fff;
  padding: 32px 40px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.hint {
  font-size: 13px;
  color: #888;
  margin-bottom: 16px;
}
.btn {
  padding: 10px 28px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  cursor: pointer;
}
.info {
  margin-top: 14px;
  font-size: 13px;
  color: #666;
}
</style>

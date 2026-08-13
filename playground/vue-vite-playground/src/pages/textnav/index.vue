<script setup lang="ts">
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-section">
      <p class="demo-label">文字导航 · 玻璃质感 + 气泡</p>
      <yk-textnav model="首页，组件，文档，关于" a-v0="/" a-v2="/textnav" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.demo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 56px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    #0f0c29 0%,
    #302b63 50%,
    #24243e 100%
  );
}

.demo-label {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
</style>

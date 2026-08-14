<script setup lang="ts">
interface SearchPayload {
  keyword: string
  engine: { name: string; url: string }
}

function onSearch(payload: SearchPayload) {
  console.log('搜索事件:', payload)
}
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-section demo-section--light">
      <p class="demo-label">默认：透明背景 + 黑色边框</p>
      <yk-search-input @search="onSearch" />
    </div>

    <div class="demo-section">
      <p class="demo-label">自定义背景色 / 文字颜色</p>
      <yk-search-input
        background-color="rgba(255, 255, 255, 0.25)"
        text-color="#ffffff"
        @search="onSearch"
      />
    </div>

    <div class="demo-section">
      <p class="demo-label">自定义背景图</p>
      <yk-search-input
        background-image="url('/vite.svg')"
        text-color="#ffffff"
        @search="onSearch"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 24px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    #0f0c29 0%,
    #302b63 50%,
    #24243e 100%
  );

  &--light {
    background: #f2f3f5;
  }
}

.demo-label {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);

  .demo-section--light & {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>

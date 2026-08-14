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
  <div class="home">
    <h2 class="home__title">YkSearchInput 搜索框</h2>

    <yk-search-input @search="onSearch" />

    <p class="home__tip">点击左侧图标切换搜索引擎 · 点击输入框查看历史/推荐 · 回车触发搜索</p>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 100vh;
  padding: 40px;
  background: #f2f3f5;
}

.home__title {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.home__tip {
  margin: 0;
  font-size: 13px;
  color: #888;
}
</style>

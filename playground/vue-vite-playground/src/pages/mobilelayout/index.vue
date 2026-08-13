<script setup lang="ts">
</script>

<template>
  <div class="demo-page">
    <yk-mobile-layout>
      <div class="content">内容区（90%）</div>
      <template #footer>
        <div class="nav">
          <span>首页</span>
          <span>分类</span>
          <span>我的</span>
        </div>
      </template>
    </yk-mobile-layout>
  </div>
</template>

<style scoped lang="scss">
.demo-page {
  height: 100%;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f5f7fa;
  color: #666;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background: #fff;
  color: #333;
}
</style>

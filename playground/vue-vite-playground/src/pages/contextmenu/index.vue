<script setup lang="ts">
</script>

<template>
  <div class="demo">
    <h2>ContextMenu 右键菜单</h2>

    <div class="ctx-box">
      <span class="ctx-hint">基本用法：在此区域右键</span>
      <yk-context-menu>
        <div class="ctx-item">复制</div>
        <div class="ctx-item">粘贴</div>
        <div class="ctx-item">删除</div>
      </yk-context-menu>
    </div>

    <div class="ctx-box">
      <span class="ctx-hint">背景色菜单</span>
      <yk-context-menu backgroundcolor="#f0f9ff">
        <div class="ctx-item">选项 A</div>
        <div class="ctx-item">选项 B</div>
      </yk-context-menu>
    </div>

    <div class="ctx-box">
      <span class="ctx-hint">背景图菜单</span>
      <yk-context-menu backgroundimage="linear-gradient(135deg, #667eea, #764ba2)">
        <div class="ctx-item ctx-item--light">选项 A</div>
        <div class="ctx-item ctx-item--light">选项 B</div>
      </yk-context-menu>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  padding: 80px 24px;
  background: #fff;
}
h2 {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.ctx-box {
  position: relative;
  width: 300px;
  height: 180px;
  background: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
}
.ctx-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}
.ctx-item {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
}
.ctx-item:hover {
  background: #f5f7fa;
}
.ctx-item--light {
  color: #ffffff;
}
.ctx-item--light:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>

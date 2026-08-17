<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>

<template>
  <div class="demo">
    <h2>Model 弹窗</h2>

    <div class="box">
      <p>基本用法（v-model + title + message）</p>
      <yk-button type="primary" @click="visible = true">打开弹窗</yk-button>

      <p>自定义插槽（放入按钮）</p>
      <yk-button type="primary" @click="visible2 = true">打开弹窗</yk-button>

      <p>带图片（image + message + text-color）</p>
      <yk-button type="primary" @click="visible3 = true">打开弹窗</yk-button>
    </div>

    <yk-model v-model="visible" title="提示" message="接入需要显示的文字的数据" />

    <yk-model v-model="visible2" title="确认操作" text-color="#e6a23c">
      <yk-button type="danger" @click="visible2 = false">取消</yk-button>
      <yk-button type="primary" @click="visible2 = false">确定</yk-button>
    </yk-model>

    <yk-model
      v-model="visible3"
      title="图片"
      message="这是一张图片"
      image="https://picsum.photos/300/200?random=2"
    />
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
h2 {
  font-size: 20px;
  color: #333;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px;
}
.box p {
  margin: 8px 0 0;
  font-size: 13px;
  color: #666;
}
</style>

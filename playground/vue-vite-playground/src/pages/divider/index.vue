<script setup lang="ts">
</script>

<template>
  <div class="demo">
    <h2>Divider</h2>

    <div class="box">
      <p>solid 实线</p>
      <yk-divider model="solid" />

      <p>dashed 虚线</p>
      <yk-divider model="dashed" />

      <p>dotted 点线</p>
      <yk-divider model="dotted" />

      <p>double 双线</p>
      <yk-divider model="double" />

      <p>string 自定义符号（text="*"）</p>
      <yk-divider model="string" text="*" />

      <p>string 自定义符号（text="~"）</p>
      <yk-divider model="string" text="~" />

      <p>string 自定义符号（text="✦"）</p>
      <yk-divider model="string" text="✦" />
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
</style>

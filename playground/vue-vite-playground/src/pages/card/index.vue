<script setup lang="ts">
const yearTime = '2026-08-15'
const lastYearTime = '2025-03-20'
const timestamp = '1723670400000'
</script>

<template>
  <div class="demo">
    <h2>Card</h2>

    <div class="row">
      <!-- 今年内时间 -> 月日 -->
      <yk-card
        background-image="linear-gradient(135deg, #667eea, #764ba2)"
        text-color="#ffffff"
        user-model="true"
        :username="'杨堃'"
        :time="yearTime"
      >
        今年内的时间，显示为月日
      </yk-card>

      <!-- 跨年时间 -> 年月日 -->
      <yk-card
        background-image="url('https://picsum.photos/400/300?random=1')"
        text-color="#ffffff"
        user-model="true"
        username="前端工程师"
        :time="lastYearTime"
      >
        跨年的时间显示为年月日，这里是一段更长的标题用来测试换行与超出两行时的省略号效果测试换行与超出两行时的省略号效果测试
      </yk-card>

      <!-- 时间戳 -->
      <yk-card
        background-image="linear-gradient(135deg, #f093fb, #f5576c)"
        user-model="true"
        username="Windlil"
        :time="timestamp"
      >
        时间戳时间
      </yk-card>

      <!-- 不显示用户信息 -->
      <yk-card
        background-image="linear-gradient(135deg, #4facfe, #00f2fe)"
        text-color="#333"
        user-model="false"
      >
        不显示用户信息（user-model="false"）
      </yk-card>
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
  background: #e8e8e8;
  gap: 24px;
}
h2 { font-size: 20px; color: #333; }
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.row .yk-card {
  width: 240px;
}
</style>

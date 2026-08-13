<script setup lang="ts">
import { ref } from 'vue'

const layer = ref(true)
</script>

<template>
  <div class="demo">
    <h2>UserAvatar</h2>

    <div class="row">
      <div class="item">
        <YkUserAvatar
          avatar="https://i.pravatar.cc/150?img=5"
          model="image"
          frame="https://api.dicebear.com/7.x/bottts/svg?seed=ring"
          :image-on-top="layer"
        />
        <span>model="image"</span>
      </div>

      <div class="item">
        <YkUserAvatar
          avatar="https://i.pravatar.cc/150?img=8"
          model="flow"
          :image-on-top="layer"
        />
        <span>model="flow"</span>
      </div>

      <div class="item">
        <YkUserAvatar
          avatar="https://i.pravatar.cc/150?img=12"
          model="over"
          :image-on-top="layer"
        />
        <span>model="over"</span>
      </div>
    </div>

    <button @click="layer = !layer">
      切换层级: imageOnTop={{ layer }}
    </button>
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
  gap: 32px;
  align-items: flex-start;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}
button {
  padding: 10px 24px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  cursor: pointer;
}
</style>

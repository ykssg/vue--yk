<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Navbar {
  id: string;
  name: string;
  image: string;
  path?: string;
}

// ---- 演示1: navList 静态传入 ----
const navList = ref<Navbar[]>([
  { id: "home", name: "首页", image: "/images/home.png" },
]);

const showModal = ref(false)
const form = reactive({
  name: '',
  image: '',
  path: ''
})

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.name = ''
  form.image = ''
  form.path = ''
}

function addNav() {
  if (!form.name || !form.image) return
  navList.value.push({
    id: Date.now().toString(),
    name: form.name,
    image: form.image,
    path: form.path || undefined
  })
  closeModal()
}

// ---- 演示2: listurl 从接口获取 + h 设置高度 ----
const listurl = 'https://api.example.com/navbar/list'
</script>

<template>
  <div class="demo-wrapper">
    <!-- 演示1: navList + 手动添加 -->
    <div class="demo-section">
      <p class="demo-label">navList 静态传入</p>
      <div class="navbar-row">
        <yk-navbar :navList="navList" />
        <div class="btn-add" @click="openModal">
          <span class="btn-add-icon">+</span>
        </div>
      </div>
    </div>

    <!-- 演示2: listurl + h -->
    <div class="demo-section">
      <p class="demo-label">listurl 接口获取 + h="48"</p>
      <yk-navbar :listurl="listurl" :h="48" />
    </div>

    <!-- 弹窗 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3 class="modal-title">添加导航</h3>
        <div class="modal-field">
          <label class="modal-label">图片 URL</label>
          <input v-model="form.image" class="modal-input" placeholder="请输入图片地址" />
        </div>
        <div class="modal-field">
          <label class="modal-label">名称</label>
          <input v-model="form.name" class="modal-input" placeholder="请输入导航名称" />
        </div>
        <div class="modal-field">
          <label class="modal-label">链接（可选）</label>
          <input v-model="form.path" class="modal-input" placeholder="请输入链接地址" />
        </div>
        <div class="modal-actions">
          <button class="modal-btn modal-btn-cancel" @click="closeModal">取消</button>
          <button class="modal-btn modal-btn-confirm" @click="addNav">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-radius: 16px;
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

.navbar-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

// ---------- 添加按钮 ----------
.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  cursor: pointer;
  position: relative;
  transition:
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    background 0.3s ease;

  .btn-add-icon {
    font-size: 20px;
    font-weight: 300;
    color: #1a1a2e;
    line-height: 1;
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    box-shadow:
      0 8px 28px rgba(0, 0, 0, 0.12),
      0 2px 8px rgba(0, 0, 0, 0.06),
      0 0 0 1px rgba(255, 255, 255, 0.18) inset;
    transform: translateY(-2px);

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 6%;
      right: 6%;
      height: 40%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.28) 0%,
        rgba(255, 255, 255, 0.04) 60%,
        transparent 100%
      );
      border-radius: 9px 9px 50% 50%;
      pointer-events: none;
    }

    .btn-add-icon {
      transform: rotate(90deg);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }
}

// ---------- 弹窗 ----------
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  z-index: 1000;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 36px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  position: relative;
  overflow: hidden;
  min-width: 320px;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 50%;
    height: 120%;
    background: radial-gradient(
      ellipse 60% 50% at 30% 20%,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    z-index: 1;
  }

  &-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
    z-index: 1;
  }

  &-label {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a2e;
  }

  &-input {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    font-size: 14px;
    color: #1a1a2e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder {
      color: rgba(26, 26, 46, 0.35);
    }

    &:focus {
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }
  }

  &-actions {
    display: flex;
    gap: 12px;
    z-index: 1;
  }

  &-btn {
    padding: 8px 24px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &-cancel {
      background: rgba(255, 255, 255, 0.08);
      color: #1a1a2e;

      &:hover {
        background: rgba(255, 255, 255, 0.18);
      }
    }

    &-confirm {
      background: rgba(99, 102, 241, 0.55);
      color: #fff;
      border-color: rgba(99, 102, 241, 0.35);

      &:hover {
        background: rgba(99, 102, 241, 0.75);
        box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

defineOptions({
  name: 'YkNavbar'
})

interface NavbarItem {
  id: string
  name: string
  image: string
  path?: string
}

const props = withDefaults(defineProps<{
  navList?: NavbarItem[]
  apiUrl?: string
  height?: number | string
}>(), {
  navList: () => [],
  apiUrl: '',
  height: '',
})

const emit = defineEmits<{
  error: [error: Error]
}>()

const items = ref<NavbarItem[]>(props.navList)

const heightStyle = computed(() => {
  if (!props.height) return undefined
  return { height: typeof props.height === 'number' ? `${props.height}px` : props.height }
})

watch(() => props.navList, (list) => {
  items.value = list ?? []
})

watch(() => props.apiUrl, (url) => {
  if (url) fetchList(url)
})

onMounted(() => {
  if (props.apiUrl) fetchList(props.apiUrl)
})

async function fetchList(url: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const list = Array.isArray(data) ? data : data?.list ?? data?.data
    if (Array.isArray(list)) items.value = list
  } catch (err) {
    emit('error', err as Error)
  }
}
</script>

<template>
  <div class="yk-navbar" :style="heightStyle">
    <div v-for="item in items" :key="item.id" class="yk-navbar__item">
      <a v-if="item.path" :href="item.path" class="yk-navbar__link">
        <img :src="item.image" :alt="item.name" class="yk-navbar__img" />
        <p class="yk-navbar__text">{{ item.name }}</p>
      </a>
      <span v-else class="yk-navbar__link">
        <img :src="item.image" :alt="item.name" class="yk-navbar__img" />
        <p class="yk-navbar__text">{{ item.name }}</p>
      </span>
    </div>
  </div>
</template>

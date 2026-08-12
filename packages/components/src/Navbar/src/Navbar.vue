<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Navbar {
  id: string;
  name: string;
  image: string;
  path?: string;
}

const props = defineProps<{
  navList?: Navbar[];
  listurl?: string;
  h?: number | string;
}>();

const items = ref<Navbar[]>(props.navList || [])

onMounted(async () => {
  if (props.listurl) {
    await fetchList()
  }
})

watch(() => props.listurl, async () => {
  if (props.listurl) {
    await fetchList()
  }
})

async function fetchList() {
  try {
    const res = await fetch(props.listurl!)
    const data = await res.json()
    items.value = data
  } catch {
    // keep current items on error
  }
}

defineOptions({
  name: "YkNavbar",
});
</script>

<template>
  <div
    class="overall"
    :style="h ? { height: typeof h === 'number' ? h + 'px' : h } : undefined"
  >
    <div v-for="item in items" :key="item.id" class="btn">
      <a v-if="item.path" :href="item.path" class="btn-link">
        <img :src="item.image" :alt="item.name" class="btn-img" />
        <p class="btn-text">{{ item.name }}</p>
      </a>
      <span v-else class="btn-link">
        <img :src="item.image" :alt="item.name" class="btn-img" />
        <p class="btn-text">{{ item.name }}</p>
      </span>
    </div>
  </div>
</template>

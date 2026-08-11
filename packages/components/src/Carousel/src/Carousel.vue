<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import YkImage from './Image.vue'

defineOptions({
  name: 'YkCarousel'
})

interface CarouselImage {
  src: string
  alt?: string
}

const props = withDefaults(defineProps<{
  model?: 'static' | 'api'
  images?: CarouselImage[] | string[]
  apiUrl?: string
  interval?: number
  height?: string
  autoplay?: boolean
  showArrow?: boolean
}>(), {
  model: 'static',
  images: () => [],
  apiUrl: '',
  interval: 3000,
  height: '300px',
  autoplay: true,
  showArrow: true,
})

const emit = defineEmits<{
  'change': [index: number]
}>()

const internalIndex = ref(1)
const transitionEnabled = ref(true)
const apiImages = ref<CarouselImage[]>([])
const loading = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const displayImages = computed<CarouselImage[]>(() => {
  if (props.model === 'api') {
    return apiImages.value
  }
  return props.images.map((img) => {
    if (typeof img === 'string') {
      return { src: img, alt: '' }
    }
    return img
  })
})

const totalSlides = computed(() => displayImages.value.length)

// 首尾克隆实现无限循环: [last, 0, 1, ..., n-1, first]
const clonedImages = computed<CarouselImage[]>(() => {
  const imgs = displayImages.value
  if (imgs.length <= 1) return imgs
  return [imgs[imgs.length - 1], ...imgs, imgs[0]]
})

// 实际图片索引 (去除克隆位的偏移)
const realIndex = computed(() => {
  const n = totalSlides.value
  if (n === 0) return 0
  if (internalIndex.value === 0) return n - 1
  if (internalIndex.value === n + 1) return 0
  return internalIndex.value - 1
})

function goTo(idx: number) {
  if (totalSlides.value === 0) return
  transitionEnabled.value = true
  internalIndex.value = idx + 1
  emit('change', idx)
}

function prev() {
  if (totalSlides.value === 0) return
  transitionEnabled.value = true
  internalIndex.value--
  emit('change', realIndex.value)
}

function next() {
  if (totalSlides.value === 0) return
  transitionEnabled.value = true
  internalIndex.value++
  emit('change', realIndex.value)
}

function onTransitionEnd() {
  const n = totalSlides.value
  if (internalIndex.value === 0) {
    transitionEnabled.value = false
    internalIndex.value = n
  } else if (internalIndex.value === n + 1) {
    transitionEnabled.value = false
    internalIndex.value = 1
  }
}

function startAutoplay() {
  stopAutoplay()
  if (!props.autoplay || totalSlides.value <= 1) return
  timer = setInterval(() => {
    next()
  }, props.interval)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

async function fetchImages() {
  if (!props.apiUrl) return
  loading.value = true
  try {
    const response = await fetch(props.apiUrl)
    const data = await response.json()
    if (Array.isArray(data)) {
      apiImages.value = data.map((item: any) =>
        typeof item === 'string' ? { src: item, alt: '' } : item
      )
    } else if (data.images && Array.isArray(data.images)) {
      apiImages.value = data.images.map((item: any) =>
        typeof item === 'string' ? { src: item, alt: '' } : item
      )
    }
  } catch {
    // fetch failed silently
  } finally {
    loading.value = false
  }
}

watch(() => props.images, () => {
  internalIndex.value = 1
})

watch(totalSlides, () => {
  internalIndex.value = totalSlides.value > 0 ? 1 : 0
  startAutoplay()
})

onMounted(() => {
  if (props.model === 'api') {
    fetchImages()
  }
  nextTick(() => {
    startAutoplay()
  })
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    class="carousel"
    :style="{ height: props.height }"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div v-if="loading" class="carousel__loading">加载中...</div>

    <div v-else-if="totalSlides === 0" class="carousel__empty">暂无图片</div>

    <template v-else>
      <div
        class="carousel__track"
        :class="{ 'carousel__track--no-transition': !transitionEnabled }"
        :style="{ transform: `translateX(-${internalIndex * 100}%)` }"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(img, idx) in clonedImages"
          :key="idx"
          class="carousel__slide"
        >
          <YkImage :src="img.src" :alt="img.alt || ''" fit="cover" />
        </div>
      </div>

      <button
        v-if="showArrow && totalSlides > 1"
        class="carousel__arrow carousel__arrow--prev"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-if="showArrow && totalSlides > 1"
        class="carousel__arrow carousel__arrow--next"
        @click="next"
      >
        ›
      </button>

      <div v-if="totalSlides > 1" class="carousel__dots">
        <span
          v-for="(_, idx) in displayImages"
          :key="idx"
          class="carousel__dot"
          :class="{ 'is-active': idx === realIndex }"
          @click="goTo(idx)"
        />
      </div>
    </template>
  </div>
</template>

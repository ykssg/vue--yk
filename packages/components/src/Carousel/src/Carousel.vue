<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
  change: [index: number]
  error: [error: Error]
}>()

// 与 CSS 中 track transition 时长保持一致
const TRANSITION_MS = 500

const apiImages = ref<CarouselImage[]>([])
const loading = ref(false)
const internalIndex = ref(1) // 克隆数组中的索引
const transitionEnabled = ref(true)
let timer: ReturnType<typeof setInterval> | null = null
let resetTimer: ReturnType<typeof setTimeout> | null = null
let isMounted = false

const displayImages = computed<CarouselImage[]>(() => {
  if (props.model === 'api') {
    return apiImages.value
  }
  return props.images.map((img) =>
    typeof img === 'string' ? { src: img, alt: '' } : img
  )
})

const totalSlides = computed(() => displayImages.value.length)

// 首尾克隆实现无限循环: [last, 0, 1, ..., n-1, first]
const clonedImages = computed<CarouselImage[]>(() => {
  const imgs = displayImages.value
  if (imgs.length <= 1) return imgs
  return [imgs[imgs.length - 1], ...imgs, imgs[0]]
})

// 真实图片索引（去除克隆位偏移）
const realIndex = computed(() => {
  const n = totalSlides.value
  if (n <= 1) return 0
  return (internalIndex.value - 1 + n) % n
})

function goTo(idx: number) {
  if (totalSlides.value <= 1) return
  transitionEnabled.value = true
  clearTimeout(resetTimer)
  internalIndex.value = idx + 1
  startAutoplay()
}

function prev() {
  if (totalSlides.value <= 1) return
  transitionEnabled.value = true
  clearTimeout(resetTimer)
  internalIndex.value--
}

function next() {
  if (totalSlides.value <= 1) return
  transitionEnabled.value = true
  clearTimeout(resetTimer)
  internalIndex.value++
}

// 跨越首尾克隆位后，过渡结束后无感复位到真实图片
watch(internalIndex, (val) => {
  const n = totalSlides.value
  if (n <= 1) return
  if (val === 0) {
    scheduleReset(n)
  } else if (val === n + 1) {
    scheduleReset(1)
  }
  emit('change', realIndex.value)
})

function scheduleReset(target: number) {
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    transitionEnabled.value = false
    internalIndex.value = target
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transitionEnabled.value = true
      })
    })
  }, TRANSITION_MS)
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
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    const list = Array.isArray(data) ? data : data?.images
    apiImages.value = Array.isArray(list)
      ? list
          .map((item: unknown): CarouselImage | null => {
            if (typeof item === 'string') return { src: item, alt: '' }
            if (item && typeof item === 'object' && 'src' in item) {
              const img = item as CarouselImage
              return { src: img.src, alt: img.alt ?? '' }
            }
            return null
          })
          .filter((img): img is CarouselImage => img !== null)
      : []
  } catch (err) {
    emit('error', err as Error)
  } finally {
    loading.value = false
  }
}

watch(totalSlides, (n) => {
  internalIndex.value = n > 1 ? 1 : 0
  if (isMounted) startAutoplay()
})

onMounted(() => {
  isMounted = true
  if (props.model === 'api') {
    fetchImages()
  }
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
  clearTimeout(resetTimer)
})
</script>

<template>
  <div
    class="yk-carousel"
    :style="{ height: props.height }"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div v-if="loading" class="yk-carousel__loading">加载中...</div>

    <div v-else-if="totalSlides === 0" class="yk-carousel__empty">暂无图片</div>

    <template v-else>
      <div
        class="yk-carousel__track"
        :class="{ 'yk-carousel__track--no-transition': !transitionEnabled }"
        :style="{ transform: `translateX(-${internalIndex * 100}%)` }"
      >
        <div
          v-for="(img, idx) in clonedImages"
          :key="`${idx}-${img.src}`"
          class="yk-carousel__slide"
        >
          <YkImage :src="img.src" :alt="img.alt || ''" fit="cover" />
        </div>
      </div>

      <button
        v-if="showArrow && totalSlides > 1"
        class="yk-carousel__arrow yk-carousel__arrow--prev"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-if="showArrow && totalSlides > 1"
        class="yk-carousel__arrow yk-carousel__arrow--next"
        @click="next"
      >
        ›
      </button>

      <div v-if="totalSlides > 1" class="yk-carousel__dots">
        <span
          v-for="(_, idx) in displayImages"
          :key="idx"
          class="yk-carousel__dot"
          :class="{ 'is-active': idx === realIndex }"
          @click="goTo(idx)"
        />
      </div>
    </template>
  </div>
</template>

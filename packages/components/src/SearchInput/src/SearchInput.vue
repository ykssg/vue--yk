<script lang="ts">
// 模块作用域：供 defineProps 默认值引用（默认值会被提升到 setup 之外）
export interface SearchEngine {
  /** 引擎名称，如「百度」 */
  name: string
  /** 图标地址（URL 或 data URL） */
  icon: string
  /** 搜索地址，用 {keyword} 占位关键词 */
  url: string
}

// 生成搜索引擎图标（data URL，无需外部资源）
function badgeIcon(label: string, color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">` +
    `<rect width="24" height="24" rx="6" fill="${color}"/>` +
    `<text x="12" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff" ` +
    `font-family="-apple-system, 'Segoe UI', Arial, sans-serif" textLength="20" lengthAdjust="spacingAndGlyphs">${label}</text>` +
    `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const DEFAULT_ENGINES: SearchEngine[] = [
  { name: '百度', icon: badgeIcon('百度', '#2932E1'), url: 'https://www.baidu.com/s?wd={keyword}' },
  { name: '必应', icon: badgeIcon('必应', '#008373'), url: 'https://www.bing.com/search?q={keyword}' },
  { name: '谷歌', icon: badgeIcon('G', '#4285F4'), url: 'https://www.google.com/search?q={keyword}' },
  { name: '知乎', icon: badgeIcon('知乎', '#056DE8'), url: 'https://www.zhihu.com/search?type=content&q={keyword}' },
  { name: 'GitHub', icon: badgeIcon('Git', '#24292F'), url: 'https://github.com/search?q={keyword}' },
  { name: 'B站', icon: badgeIcon('B站', '#FB7299'), url: 'https://search.bilibili.com/all?keyword={keyword}' },
  { name: '360', icon: badgeIcon('360', '#19B955'), url: 'https://www.so.com/s?q={keyword}' },
  { name: '2345', icon: badgeIcon('2345', '#FF5000'), url: 'https://www.2345.com/?k={keyword}' }
]

const DEFAULT_RECOMMEND = ['Vue 3', 'TypeScript', '前端组件库', 'CSS 布局', 'Git 教程']
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

defineOptions({
  name: 'YkSearchInput'
})

const props = withDefaults(
  defineProps<{
    /** 整体背景色，默认透明，激活时叠加半透明层 */
    backgroundColor?: string
    /** 文字颜色 */
    textColor?: string
    /** 背景图（CSS 值，如 url('...')） */
    backgroundImage?: string
    /** 搜索引擎列表 */
    engines?: SearchEngine[]
    /** 热门推荐词（最多显示 5 条） */
    recommend?: string[]
    /** 输入框占位文本 */
    placeholder?: string
    /** 历史记录 localStorage 键名 */
    historyKey?: string
  }>(),
  {
    backgroundColor: 'transparent',
    textColor: '#333333',
    backgroundImage: '',
    engines: () => [...DEFAULT_ENGINES],
    recommend: () => [...DEFAULT_RECOMMEND],
    placeholder: '搜索...',
    historyKey: 'yk-searchinput-history'
  }
)

const emit = defineEmits<{
  /** 搜索触发：回车 / 点击搜索按钮 / 点击历史或推荐项 */
  search: [payload: { keyword: string; engine: SearchEngine }]
}>()

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const keyword = ref('')
const currentEngine = ref<SearchEngine>(props.engines[0] ?? { name: '', icon: '', url: '' })
const showEngines = ref(false)
const showHistory = ref(false)
const isFocused = ref(false)
const historyList = ref<string[]>([])

const isActive = computed(() => showEngines.value || showHistory.value || isFocused.value)

const recommendList = computed(() => props.recommend.slice(0, 5))

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundImage) {
    style.backgroundImage = props.backgroundImage
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  } else if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  style.color = props.textColor
  return style
})

watch(
  () => props.engines,
  (list) => {
    if (!list.length) return
    const found = list.find((e) => e.name === currentEngine.value.name)
    if (!found) currentEngine.value = list[0]
  }
)

function onInputFocus() {
  isFocused.value = true
  showEngines.value = false
  showHistory.value = true
}

function onInputBlur() {
  isFocused.value = false
}

function toggleEngines() {
  showEngines.value = !showEngines.value
  if (showEngines.value) showHistory.value = false
}

function selectEngine(engine: SearchEngine) {
  currentEngine.value = engine
  showEngines.value = false
}

function closePanels() {
  showEngines.value = false
  showHistory.value = false
}

function persistHistory() {
  try {
    localStorage.setItem(props.historyKey, JSON.stringify(historyList.value))
  } catch {
    // localStorage 不可用时忽略
  }
}

function saveHistory(kw: string) {
  historyList.value = [kw, ...historyList.value.filter((item) => item !== kw)].slice(0, 5)
  persistHistory()
}

function removeHistory(idx: number) {
  historyList.value.splice(idx, 1)
  persistHistory()
}

function search() {
  const kw = keyword.value.trim()
  if (!kw) return
  saveHistory(kw)
  closePanels()
  const engine = currentEngine.value
  emit('search', { keyword: kw, engine })
  if (engine.url) {
    const url = engine.url.replace('{keyword}', encodeURIComponent(kw))
    window.open(url, '_blank', 'noopener')
  }
}

function searchWith(kw: string) {
  keyword.value = kw
  search()
}

function onDocClick(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    closePanels()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  try {
    const raw = localStorage.getItem(props.historyKey)
    const parsed = raw ? JSON.parse(raw) : []
    historyList.value = Array.isArray(parsed) ? parsed.slice(0, 5) : []
  } catch {
    historyList.value = []
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})
</script>

<template>
  <div
    ref="rootRef"
    class="yk-searchinput"
    :class="{ 'is-active': isActive }"
    :style="rootStyle"
  >
    <div class="yk-searchinput__box">
      <button
        type="button"
        class="yk-searchinput__engine"
        aria-label="选择搜索引擎"
        @click.stop="toggleEngines"
      >
        <img
          v-if="currentEngine.icon"
          class="yk-searchinput__engine-icon"
          :src="currentEngine.icon"
          :alt="currentEngine.name"
        />
        <span class="yk-searchinput__engine-arrow">
          <svg
            viewBox="0 0 24 24"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <input
        ref="inputRef"
        v-model="keyword"
        class="yk-searchinput__input"
        type="text"
        :placeholder="placeholder"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keydown.enter="search"
      />

      <button
        type="button"
        class="yk-searchinput__submit"
        aria-label="搜索"
        @click.stop="search"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>

    <transition name="yk-searchinput-fade">
      <div v-if="showEngines" class="no-searchinput-img">
        <div
          v-for="engine in engines"
          :key="engine.name"
          class="no-searchinput-img__item"
          :class="{ 'is-active': currentEngine.name === engine.name }"
          @mousedown.prevent
          @click.stop="selectEngine(engine)"
        >
          <img class="no-searchinput-img__icon" :src="engine.icon" :alt="engine.name" />
          <span class="no-searchinput-img__name">{{ engine.name }}</span>
        </div>
      </div>
    </transition>

    <transition name="yk-searchinput-fade">
      <div v-if="showHistory" class="no-searchinput-history">
        <div v-if="historyList.length" class="no-searchinput-history__group">
          <div class="no-searchinput-history__title">历史记录</div>
          <div
            v-for="(item, idx) in historyList"
            :key="`h-${item}-${idx}`"
            class="no-searchinput-history__item"
            @mousedown.prevent
            @click.stop="searchWith(item)"
          >
            <span class="no-searchinput-history__text">{{ item }}</span>
            <button
              type="button"
              class="no-searchinput-history__del"
              aria-label="删除"
              @mousedown.stop.prevent
              @click.stop="removeHistory(idx)"
            >
              ×
            </button>
          </div>
        </div>

        <div class="no-searchinput-history__group">
          <div class="no-searchinput-history__title">热门推荐</div>
          <div
            v-for="item in recommendList"
            :key="`r-${item}`"
            class="no-searchinput-history__item"
            @mousedown.prevent
            @click.stop="searchWith(item)"
          >
            <span class="no-searchinput-history__text">{{ item }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

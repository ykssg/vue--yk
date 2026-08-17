<script lang="ts">
export interface ContextMenuProps {
  /** 背景图（CSS 值，如 url('...')） */
  backgroundimage?: string
  /** 背景色 */
  backgroundcolor?: string
}
</script>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'YkContextMenu'
})

const props = withDefaults(defineProps<ContextMenuProps>(), {
  backgroundimage: '',
  backgroundcolor: '#ffffff'
})

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
}>()

const visible = ref(false)
const x = ref(0)
const y = ref(0)
const menuRef = ref<HTMLElement>()

const menuStyle = computed(() => {
  const style: Record<string, string> = {
    left: `${x.value}px`,
    top: `${y.value}px`
  }
  if (props.backgroundimage) {
    style.backgroundImage = props.backgroundimage
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  if (props.backgroundcolor) {
    style.backgroundColor = props.backgroundcolor
  }
  return style
})

async function show(clientX: number, clientY: number) {
  x.value = clientX
  y.value = clientY
  visible.value = true
  emit('open')

  await nextTick()
  const el = menuRef.value
  if (!el) return

  // 菜单贴近右/下边缘时回退，保证不超出视口
  const rect = el.getBoundingClientRect()
  const { innerWidth, innerHeight } = window
  if (clientX + rect.width > innerWidth) {
    x.value = Math.max(0, innerWidth - rect.width)
  }
  if (clientY + rect.height > innerHeight) {
    y.value = Math.max(0, innerHeight - rect.height)
  }
}

function hide() {
  if (!visible.value) return
  visible.value = false
  emit('close')
}

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
  show(e.clientX, e.clientY)
}

function onGlobalClick() {
  hide()
}

function onGlobalContextMenu() {
  hide()
}

function onGlobalScroll() {
  hide()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    hide()
  }
}

onMounted(() => {
  document.addEventListener('click', onGlobalClick)
  document.addEventListener('contextmenu', onGlobalContextMenu)
  window.addEventListener('scroll', onGlobalScroll, true)
  window.addEventListener('resize', onGlobalScroll)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onGlobalClick)
  document.removeEventListener('contextmenu', onGlobalContextMenu)
  window.removeEventListener('scroll', onGlobalScroll, true)
  window.removeEventListener('resize', onGlobalScroll)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="yk-context-menu" @contextmenu.prevent.stop="onContextMenu">
    <Teleport to="body">
      <div
        v-if="visible"
        ref="menuRef"
        class="yk-context-menu__menu"
        :style="menuStyle"
        @contextmenu.prevent.stop
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>

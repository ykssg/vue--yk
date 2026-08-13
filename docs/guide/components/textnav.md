---
sider_text="文字导航 TextNav"
---
:::

# TextNav 文字导航

玻璃质感文字导航组件，胶囊容器 + 左上角高光 + 上升气泡动画。hover 时毛玻璃模糊 + 顶部高光，文字项带轻微上浮。导航项通过 `items` 数组传入。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。若您在二次开发中为其添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `items` 传入导航项数组，带 `path` 的项渲染为 `<a>`，否则渲染为 `<span>` 纯文字。

<div class="group">
  <yk-text-nav :items="[
    { text: '首页', path: '/' },
    { text: '组件' },
    { text: '文档', path: '/guide/components/textnav' },
    { text: '关于' },
  ]" />
</div>

::: details Show Code

```vue
<template>
  <yk-text-nav :items="items" />
</template>

<script setup>
const items = [
  { text: '首页', path: '/' },
  { text: '组件' },
  { text: '文档', path: '/guide/components/textnav' },
  { text: '关于' },
]
</script>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `TextNavItem[]` | `[]` | 导航项数组 |

### TextNavItem 类型

```ts
interface TextNavItem {
  text: string    // 显示文本
  path?: string   // 跳转链接，可选；不传则渲染为 <span>
}
```

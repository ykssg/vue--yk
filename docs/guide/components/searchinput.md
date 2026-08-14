---
sider_text="搜索框 SearchInput"
---
:::

# SearchInput 搜索框

带搜索引擎切换的搜索框组件。默认整体背景透明、点击后半透明，黑色边框。左侧图标可切换搜索引擎，右侧输入框支持历史记录与热门推荐，回车触发搜索。

::: warning ⚠️ 免责声明
本组件的搜索行为为公开的第三方搜索引擎 URL 跳转，不收集、不存储任何隐私数据；历史记录仅保存在浏览器本地 localStorage。因第三方搜索引擎的内容与行为导致的任何问题，与本组件开发者无关。
:::

## 基本用法

默认渲染透明背景 + 黑色边框的搜索框。点击左侧图标展开搜索引擎列表，点击输入框显示历史记录与热门推荐。

<div class="group">
  <yk-search-input />
</div>

::: details Show Code

```vue
<template>
  <yk-search-input />
</template>
```

:::

## 自定义背景与文字颜色

通过 `background-color` / `text-color` 设置整体背景色与文字颜色，激活（聚焦/点击）时会叠加半透明层。

<div class="group" style="padding: 24px; background: linear-gradient(135deg, #0f0c29, #302b63); border-radius: 12px;">
  <yk-search-input
    background-color="rgba(255,255,255,0.25)"
    text-color="#ffffff"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-search-input
    background-color="rgba(255,255,255,0.25)"
    text-color="#ffffff"
  />
</template>
```

:::

## 自定义背景图

通过 `background-image` 传入 CSS 背景值（如 `url(...)` 或渐变）。

<div class="group" style="padding: 24px; background: linear-gradient(135deg, #0f0c29, #24243e); border-radius: 12px;">
  <yk-search-input
    background-image="linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))"
    text-color="#ffffff"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-search-input
    background-image="linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))"
    text-color="#ffffff"
  />
</template>
```

:::

## 自定义引擎与推荐词

通过 `engines` / `recommend` 自定义搜索引擎列表与热门推荐词。

<div class="group">
  <yk-search-input
    :engines="[
      { name: '百度', icon: '', url: 'https://www.baidu.com/s?wd={keyword}' },
      { name: '必应', icon: '', url: 'https://www.bing.com/search?q={keyword}' },
    ]"
    :recommend="['Vue 3', 'Vite', '组件库']"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-search-input
    :engines="engines"
    :recommend="recommend"
  />
</template>

<script setup>
const engines = [
  { name: '百度', icon: '', url: 'https://www.baidu.com/s?wd={keyword}' },
  { name: '必应', icon: '', url: 'https://www.bing.com/search?q={keyword}' },
]
const recommend = ['Vue 3', 'Vite', '组件库']
</script>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background-color` | `string` | `'transparent'` | 整体背景色，激活时叠加半透明层 |
| `text-color` | `string` | `'#333333'` | 文字颜色 |
| `background-image` | `string` | `''` | 背景图（CSS 值，如 `url('...')`） |
| `engines` | `SearchEngine[]` | 8 个内置引擎 | 搜索引擎列表 |
| `recommend` | `string[]` | 5 条默认词 | 热门推荐词（最多显示 5 条） |
| `placeholder` | `string` | `'搜索...'` | 输入框占位文本 |
| `history-key` | `string` | `'yk-searchinput-history'` | 历史记录 localStorage 键名 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `search` | `{ keyword: string; engine: SearchEngine }` | 回车 / 点击搜索 / 点击历史或推荐项时触发，同时新标签页打开对应引擎 |

### SearchEngine 类型

```ts
interface SearchEngine {
  name: string   // 引擎名称
  icon: string   // 图标（URL 或 data URL）
  url: string    // 搜索地址，用 {keyword} 占位关键词
}
```

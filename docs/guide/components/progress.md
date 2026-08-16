---
sider_text="进度条 Progress"
---
:::

# Progress 进度条

进度条组件，支持三种形态：`strip` 长条、`ring` 环形、`text` 文字。长条形态支持头部贴图。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 长条进度条

`model="strip"`（默认）渲染长条进度条，通过 `value` 设置进度，`image` 可选头部贴图，`backgroundimage` / `topimage` 设置轨道与填充颜色。

<div class="group">
  <yk-progress model="strip" :value="60" />
  <yk-progress model="strip" :value="35" topimage="#67c23a" />
</div>

::: details Show Code

```vue
<template>
  <yk-progress model="strip" :value="60" />
  <yk-progress model="strip" :value="35" topimage="#67c23a" />
</template>
```

:::

## 环形进度条

`model="ring"` 渲染环形进度条，中心显示百分比。

<div class="group">
  <yk-progress model="ring" :value="60" topimage="#e6a23c" />
</div>

::: details Show Code

```vue
<template>
  <yk-progress model="ring" :value="60" topimage="#e6a23c" />
</template>
```

:::

## 文字进度

`model="text"` 只显示百分比文字。

<div class="group">
  <yk-progress model="text" :value="60" />
</div>

::: details Show Code

```vue
<template>
  <yk-progress model="text" :value="60" />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `'strip'` / `'ring'` / `'text'` | `'strip'` | 进度条形态 |
| `value` | `number` | `0` | 当前进度值，范围 0 ~ 100 |
| `image` | `string` | `''` | 长条头部贴图（CSS 背景值，如 `url('...')`），仅 `strip` 生效 |
| `backgroundimage` | `string` | `'#ebeef5'` | 底层（轨道）颜色 |
| `topimage` | `string` | `'#409eff'` | 顶部（已填充）颜色 |

### ProgressModel 类型

```ts
type ProgressModel = 'strip' | 'ring' | 'text'
```

### ProgressProps 类型

```ts
interface ProgressProps {
  model?: ProgressModel      // 进度条类型：strip 长条 / ring 环形 / text 文字
  value?: number             // 当前进度值，范围 0 ~ 100
  image?: string             // 长条头部贴图（CSS 背景值）
  backgroundimage?: string   // 底层（轨道）颜色
  topimage?: string          // 顶部（已填充）颜色
}
```

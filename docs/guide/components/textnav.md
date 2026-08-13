---
sider_text="文字导航 TextNav"
---
:::

# TextNav 文字导航

玻璃质感文字导航组件，胶囊容器 + 左上角高光 + 上升气泡动画。hover 时毛玻璃模糊 + 顶部高光，文字项带轻微上浮。导航内容通过字符串传入，点击跳转链接通过 `a-vN` 逐项指定。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。若您在二次开发中为其添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `model` 传入逗号分隔的导航文本，`a-vN`（N 从 0 开始）指定第 N 项的跳转链接，未指定链接的项渲染为纯文字。

<div class="group">
  <yk-textnav model="首页，组件，文档，关于" a-v0="/" a-v2="/guide/components/textnav" />
</div>

::: details Show Code

```vue
<template>
  <yk-textnav
    model="首页，组件，文档，关于"
    a-v0="/"
    a-v2="/guide/components/textnav"
  />
</template>
```

:::

## 部分项为链接

「首页」「文档」为链接（`a-v0`、`a-v2`），「组件」「关于」未指定链接，渲染为 `<span>` 纯文字。

```vue
<template>
  <yk-textnav
    model="首页，组件，文档，关于"
    a-v0="/"
    a-v2="/guide/components/textnav"
  />
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `string` | `''` | 导航内容，用 `，` / `,` / `、` 分隔 |
| `a-v0` / `a-v1` / `a-v2` … | `string` | — | 第 N 项（从 0 开始）的跳转链接；不传则该项渲染为 `<span>` |

### 说明

- `model` 按 `，`、`,`、`、` 三种分隔符拆分，首尾空格会被去除，空项自动忽略。
- `a-vN` 的 N 为该项在 `model` 中的下标（从 0 开始）。
- 有链接的项渲染为 `<a>`，无链接的项渲染为 `<span>`，两者样式一致。

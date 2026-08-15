---
sider_text="分割线 Divider"
---
:::

# Divider 分割线

分割线组件，支持五种样式：`solid` 实线、`dashed` 虚线、`dotted` 点线、`double` 双线、`string` 自定义符号。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `model` 切换分割线样式。

<div class="group">
  <yk-divider model="solid" />
  <yk-divider model="dashed" />
  <yk-divider model="dotted" />
  <yk-divider model="double" />
</div>

::: details Show Code

```vue
<template>
  <yk-divider model="solid" />
  <yk-divider model="dashed" />
  <yk-divider model="dotted" />
  <yk-divider model="double" />
</template>
```

:::

## 自定义符号

`model="string"` 时通过 `text` 传入自定义符号，会重复填满整行。

<div class="group">
  <yk-divider model="string" text="*" />
  <yk-divider model="string" text="~" />
  <yk-divider model="string" text="✦" />
</div>

::: details Show Code

```vue
<template>
  <yk-divider model="string" text="*" />
  <yk-divider model="string" text="~" />
  <yk-divider model="string" text="✦" />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `'solid'` / `'dashed'` / `'dotted'` / `'double'` / `'string'` | `'solid'` | 分割线样式 |
| `text` | `string` | `'*'` | 自定义符号（`model` 为 `string` 时使用） |

### DividerModel 类型

```ts
type DividerModel = 'solid' | 'dashed' | 'dotted' | 'double' | 'string'
```

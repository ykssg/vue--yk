---
sider_text="弹窗 Model"
---
:::

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>

# Model 弹窗

弹窗组件，从上到下居中布局：顶部标题栏（左侧标题 + 右侧 × 关闭按钮），主体依次为可选图片、文字、默认插槽（可放按钮、文字）。通过 `v-model` 控制显示与隐藏，点击关闭按钮或遮罩可关闭。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。图片请使用公开、可访问的图片地址，因图片内容、版权或第三方资源加载失败导致的问题，与本组件开发者无关。
:::

## 基本用法

通过 `v-model` 控制弹窗显示，`title` 设置标题，`message` 设置主体文字。

<div class="group">
  <yk-button type="primary" @click="visible = true">打开弹窗</yk-button>
  <yk-model v-model="visible" title="提示" message="接入需要显示的文字的数据" />
</div>

::: details Show Code

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <yk-button type="primary" @click="visible = true">打开弹窗</yk-button>
  <yk-model v-model="visible" title="提示" message="接入需要显示的文字的数据" />
</template>
```

:::

## 自定义插槽

默认插槽可放入按钮、文字等自定义内容，`text-color` 设置文字颜色。

<div class="group">
  <yk-button type="primary" @click="visible2 = true">打开弹窗</yk-button>
  <yk-model v-model="visible2" title="确认操作" text-color="#e6a23c">
    <yk-button type="danger" @click="visible2 = false">取消</yk-button>
    <yk-button type="primary" @click="visible2 = false">确定</yk-button>
  </yk-model>
</div>

::: details Show Code

```vue
<template>
  <yk-model v-model="visible2" title="确认操作" text-color="#e6a23c">
    <yk-button type="danger" @click="visible2 = false">取消</yk-button>
    <yk-button type="primary" @click="visible2 = false">确定</yk-button>
  </yk-model>
</template>
```

:::

## 带图片

通过 `image` 传入图片地址，显示在文字上方。

<div class="group">
  <yk-button type="primary" @click="visible3 = true">打开弹窗</yk-button>
  <yk-model
    v-model="visible3"
    title="图片"
    message="这是一张图片"
    image="https://picsum.photos/300/200?random=2"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-model
    v-model="visible3"
    title="图片"
    message="这是一张图片"
    image="https://picsum.photos/300/200?random=2"
  />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | `boolean` | `false` | 是否显示弹窗 |
| `title` | `string` | `''` | 顶部标题 |
| `message` | `string` | `''` | 主体文字 |
| `image` | `string` | `''` | 可选图片地址 |
| `text-color` | `string` | `'#333333'` | 文字颜色 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(value: boolean)` | 关闭时触发，配合 `v-model` 使用 |
| `close` | `-` | 关闭时触发 |

### ModelProps 类型

```ts
interface ModelProps {
  modelValue?: boolean   // 是否显示弹窗（v-model）
  title?: string         // 顶部标题
  message?: string       // 主体文字
  image?: string         // 可选图片地址
  textColor?: string     // 文字颜色
}
```

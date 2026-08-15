---
sider_text="卡片 Card"
---
:::

# Card 卡片

带背景图/渐变的卡片组件，标题最多显示两行并自动省略，底部可选显示用户名与创建时间。创建时间支持日期字符串（如 `'2026-08-15'`）与时间戳（秒或毫秒），今年内显示「月日」，跨年显示「年月日」。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。背景图请使用公开、可访问的图片地址，因图片内容、版权或第三方资源加载失败导致的问题，与本组件开发者无关。
:::

## 基本用法

默认不显示用户信息，只渲染标题，通过默认插槽传入标题内容。

<div class="group">
  <yk-card
    background-image="linear-gradient(135deg, #667eea, #764ba2)"
    text-color="#ffffff"
  >
    卡片标题
  </yk-card>
</div>

::: details Show Code

```vue
<template>
  <yk-card
    background-image="linear-gradient(135deg, #667eea, #764ba2)"
    text-color="#ffffff"
  >
    卡片标题
  </yk-card>
</template>
```

:::

## 显示用户信息

设置 `user-model` 为 `true`，通过 `username` / `time` 传入用户名与创建时间。

<div class="group">
  <yk-card
    background-image="linear-gradient(135deg, #f093fb, #f5576c)"
    text-color="#ffffff"
    user-model="true"
    username="Windlil"
    time="2026-08-15"
  >
    今年内的时间显示为月日
  </yk-card>

  <yk-card
    background-image="url('https://picsum.photos/400/300?random=1')"
    text-color="#ffffff"
    user-model="true"
    username="前端工程师"
    time="2025-03-20"
  >
    跨年的时间显示为年月日
  </yk-card>
</div>

::: details Show Code

```vue
<template>
  <yk-card
    background-image="linear-gradient(135deg, #f093fb, #f5576c)"
    text-color="#ffffff"
    user-model="true"
    username="Windlil"
    time="2026-08-15"
  >
    今年内的时间显示为月日
  </yk-card>

  <yk-card
    background-image="url('https://picsum.photos/400/300?random=1')"
    text-color="#ffffff"
    user-model="true"
    username="前端工程师"
    time="2025-03-20"
  >
    跨年的时间显示为年月日
  </yk-card>
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background-image` | `string` | `''` | 背景图（CSS 值，如 `url('...')` 或渐变） |
| `text-color` | `string` | `'#ffffff'` | 文字颜色 |
| `user-model` | `boolean` | `false` | 是否显示用户信息（用户名 + 创建时间），兼容 `"true"` / `"false"` 字符串写法 |
| `username` | `string` | `''` | 用户名 |
| `time` | `string` | `''` | 创建时间（日期字符串或时间戳） |

### CardProps 类型

```ts
interface CardProps {
  backgroundImage?: string          // 背景图（CSS 值，如 url('...') 或渐变）
  textColor?: string                // 文字颜色
  userModel?: boolean | string      // 是否显示用户信息，兼容字符串 "true"/"false"
  username?: string                 // 用户名
  time?: string                     // 创建时间（日期字符串或时间戳）
}
```

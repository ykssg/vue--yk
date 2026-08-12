---
sider_text="布局 Layout"
---
:::

# Layout 布局

页面布局容器，三层 div 结构，内容始终左右居中，无论浏览器如何缩放。

::: warning ⚠️ 免责声明
本组件为纯 UI 布局组件，不涉及任何外部数据接口。若您在二次开发中为其添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 固定宽度

<div class="group">
  <yk-layout l-width="800px">
    <div style="background:#f5f5f5;padding:24px;border-radius:8px;text-align:center;">
      <p>内容区域宽度 800px，始终居中</p>
    </div>
  </yk-layout>
</div>

::: details Show Code

```vue
<template>
  <yk-layout l-width="800px">
    <div>内容始终居中</div>
  </yk-layout>
</template>
```

:::

## 百分比宽度

<div class="group">
  <yk-layout l-width="60%">
    <div style="background:#e8f4fd;padding:24px;border-radius:8px;text-align:center;">
      <p>l-width="60%"，宽度跟随视口缩放，内容始终居中</p>
    </div>
  </yk-layout>
</div>

::: details Show Code

```vue
<yk-layout l-width="60%">
  <div>响应式居中</div>
</yk-layout>
```

:::

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `l-width` | `string` | `'1200px'` | 内容区宽度，支持 px / % / vw 等 CSS 单位 |

## 结构

```
.layout                    ← padding: 0; margin: 0; width: 100%
  └─ .layout__container    ← width 由 l-width 控制; margin: 0 auto 居中
       └─ .layout__content  ← 内容区，slot 插槽
```

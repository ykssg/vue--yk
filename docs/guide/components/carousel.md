---
sider_text="轮播图 Carousel"
---
:::

# Carousel 轮播图

轮播图组件，支持静态数据和后端 API 两种模式。底部带导航圆点可快速跳转，支持自动播放，采用首尾克隆实现无缝循环切换。

## 静态模式

<div class="group">
  <yk-carousel
    model="static"
    :images="['https://picsum.photos/seed/a/800/400', 'https://picsum.photos/seed/b/800/400', 'https://picsum.photos/seed/c/800/400']"
    :interval="3000"
    height="400px"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-carousel
    model="static"
    :images="['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']"
    :interval="3000"
    height="400px"
  />
</template>
```

:::

## API 模式

从后端接口获取轮播图数据，接口期望返回格式：

```json
{
  "images": [
    { "src": "/img/1.jpg", "alt": "图片1" },
    { "src": "/img/2.jpg", "alt": "图片2" }
  ]
}
```

```vue
<yk-carousel
  model="api"
  api-url="/api/banner/list"
  :interval="5000"
  height="400px"
/>
```

## 隐藏箭头

<div class="group">
  <yk-carousel
    model="static"
    :images="['https://picsum.photos/seed/d/800/300', 'https://picsum.photos/seed/e/800/300']"
    :interval="4000"
    height="300px"
    :show-arrow="false"
  />
</div>

::: details Show Code

```vue
<yk-carousel
  model="static"
  :images="images"
  :show-arrow="false"
/>
```

:::

## YkImage 子组件

`<yk-image>` 封装了 `<img>` 标签，用于展示轮播图片。

```vue
<yk-image src="图片地址" alt="描述" fit="cover" />
```

## Props — Carousel

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | `'static'` / `'api'` | `'static'` | 数据模式 |
| `images` | `CarouselImage[]` / `string[]` | `[]` | 静态模式图片列表 |
| `api-url` | `string` | `''` | API 接口地址 |
| `interval` | `number` | `3000` | 自动播放间隔（ms） |
| `height` | `string` | `'300px'` | 轮播图高度 |
| `autoplay` | `boolean` | `true` | 是否自动播放 |
| `show-arrow` | `boolean` | `true` | 是否显示左右箭头 |

## Props — YkImage

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | `''` | 图片地址 |
| `alt` | `string` | `''` | 替代文本 |
| `fit` | `'cover'` / `'contain'` / `'fill'` / `'none'` / `'scale-down'` | `'cover'` | 图片填充方式 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `change` | `index: number` | 切换图片时触发 |

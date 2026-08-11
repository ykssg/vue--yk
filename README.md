# YK-UI

基于 Vue3 + TypeScript 的组件库，组件前缀 `<yk-xxx>`。

## 安装

```bash
pnpm install
```

## 快速开始

```ts
// main.ts
import { createApp } from 'vue'
import YkUI from '@ykssg/components'
import '@ykssg/components/style'

const app = createApp(App)
app.use(YkUI)
app.mount('#app')
```

```vue
<!-- 全局注册后即可使用 -->
<template>
  <yk-button>按钮</yk-button>
  <yk-dy-island v-model:message="msg" />
  <yk-user-avatar avatar="xxx.jpg" model="flow" />
</template>
```

## 组件

### DyIsland 灵动岛

顶部灵动岛组件，收起时显示时间，有消息时展开并显示设备状态、工具、消息内容。

```vue
<yk-dy-island
  v-model:message="msg"
  :tools="[
    { icon: '🎵', name: '音乐', onClick: handleMusic },
    { icon: '⏱', name: '计时器' },
  ]"
  :glow-colors="['#ff00c8', '#00e5ff']"
  :glow-speed="3"
  background-color="#000"
  :background-model="0.55"
  background-image=""
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model:message` | `string` | `''` | 消息内容，非空自动展开；点击外部清空 |
| `tools` | `Tool[]` | `[]` | 工具列表，最多显示 4 个 + 更多按钮 |
| `glow-colors` | `string[]` | 粉紫蓝 | 消息时边框流光颜色 |
| `glow-speed` | `number` | `3` | 流光旋转速度（秒） |
| `background-color` | `string` | `'#000'` | 背景色，支持 hex |
| `background-model` | `number` | `0.55` | 背景透明度 0~1 |
| `background-image` | `string` | `''` | 背景图 URL |

**Tool 接口**

```ts
interface Tool {
  name: string       // 工具名（title 提示）
  icon?: string      // 图标（emoji 或文字）
  onClick?: () => void
}
```

---

### UserAvatar 用户头像

头像 + 外框叠加组件，支持图片外框、流光外框、包裹流光三种模式。

```vue
<yk-user-avatar
  avatar="头像URL"
  model="over"
  frame="外框URL"
  :image="1"
  :glow-colors="['#ff00c8', '#00e5ff']"
  :glow-speed="3"
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `avatar` | `string` | `''` | 头像图片 URL |
| `model` | `'image'` / `'flow'` / `'over'` | `'image'` | 外框模式 |
| `frame` | `string` | `''` | 图片外框 URL（model=image 时） |
| `image` | `0` / `1` | `1` | `1` 头像在上 / `0` 外框在上 |
| `glow-colors` | `string[]` | 粉紫蓝 | 流光颜色（model=flow/over 时） |
| `glow-speed` | `number` | `3` | 流光速度（秒） |

**model 说明**

| 值 | 效果 |
|------|------|
| `'image'` | 图片外框，通过 `frame` 传入 |
| `'flow'` | 彩色光带沿边框流动 |
| `'over'` | 完整渐变边框 + 白色高光流转 |

---

### Button 按钮

```vue
<yk-button>默认</yk-button>
<yk-button type="primary">主要</yk-button>
<yk-button type="success">成功</yk-button>
<yk-button type="danger">危险</yk-button>
<yk-button type="warning">警告</yk-button>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | - | `primary` / `success` / `danger` / `warning` |

---

### Carousel 轮播图

轮播图组件，支持静态数据和后端 API 两种模式，带导航圆点和自动播放。

```vue
<!-- 静态模式 -->
<yk-carousel
  model="static"
  :images="['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']"
  :interval="3000"
  height="400px"
/>

<!-- API 模式 -->
<yk-carousel
  model="api"
  api-url="/api/banner/list"
  :interval="5000"
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | `'static'` / `'api'` | `'static'` | 数据模式：前端定义 / 后端接口 |
| `images` | `CarouselImage[]` / `string[]` | `[]` | 静态模式的图片列表 |
| `api-url` | `string` | `''` | API 模式的接口地址 |
| `interval` | `number` | `3000` | 自动播放间隔（ms） |
| `height` | `string` | `'300px'` | 轮播图高度 |
| `autoplay` | `boolean` | `true` | 是否自动播放 |
| `show-arrow` | `boolean` | `true` | 是否显示左右箭头 |

**Events**

| 事件 | 参数 | 说明 |
|------|------|------|
| `change` | `index: number` | 切换图片时触发 |

**YkImage 子组件**

```vue
<yk-image src="图片地址" alt="描述" fit="cover" />
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | `''` | 图片地址 |
| `alt` | `string` | `''` | 替代文本 |
| `fit` | `'cover'` / `'contain'` / `'fill'` / `'none'` / `'scale-down'` | `'cover'` | 图片填充方式 |

---

### Layout 布局

页面布局容器，通过三层 div 实现内容始终左右居中，无论浏览器如何缩放。

```vue
<yk-layout l-width="800px">
  <div>内容始终居中</div>
</yk-layout>

<yk-layout l-width="60%">
  <div>响应式宽度</div>
</yk-layout>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `l-width` | `string` | `'1200px'` | 内容区宽度，支持 px / % / vw |

---

## 开发

```bash
pnpm comp:play    # 启动 playground 调试
pnpm docs:dev     # 启动 VitePress 文档
pnpm build        # 构建组件库
pnpm comp:create  # 创建新组件脚手架
```

## License

MIT

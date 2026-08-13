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
  :background-alpha="0.55"
  background-image=""
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model:message` | `string` | `''` | 消息内容，非空自动展开；点击外部清空 |
| `tools` | `Tool[]` | `[]` | 工具列表，最多显示 4 个 |
| `glow-colors` | `string[]` | 粉紫蓝 | 消息时边框流光颜色 |
| `glow-speed` | `number` | `3` | 流光旋转速度（秒） |
| `background-color` | `string` | `'#000'` | 背景色，支持 hex |
| `background-alpha` | `number` | `0.55` | 背景透明度 0~1 |
| `background-image` | `string` | `''` | 背景图 URL |

**Tool 接口**

```ts
interface Tool {
  name: string       // 工具名（title 提示）
  icon?: string      // 图标（emoji 或文字）
  onClick?: () => void
}
```

> ⚠️ **免责声明**：本组件为纯 UI 展示组件，不涉及外部数据接口。二次开发中若添加数据请求，请自行配置鉴权。

---

### UserAvatar 用户头像

头像 + 外框叠加组件，支持图片外框、流光外框、包裹流光三种模式。

```vue
<yk-user-avatar
  avatar="头像URL"
  model="over"
  frame="外框URL"
  :image-on-top="true"
  :glow-colors="['#ff00c8', '#00e5ff']"
  :glow-speed="3"
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `avatar` | `string` | `''` | 头像图片 URL |
| `avatar-alt` | `string` | `'avatar'` | 头像图片替代文本 |
| `model` | `'image'` / `'flow'` / `'over'` | `'image'` | 外框模式 |
| `frame` | `string` | `''` | 图片外框 URL（model=image 时） |
| `frame-alt` | `string` | `'frame'` | 外框图片替代文本 |
| `image-on-top` | `boolean` | `true` | `true` 头像在上 / `false` 外框在上 |
| `glow-colors` | `string[]` | 粉紫蓝 | 流光颜色（model=flow/over 时） |
| `glow-speed` | `number` | `3` | 流光速度（秒） |

**model 说明**

| 值 | 效果 |
|------|------|
| `'image'` | 图片外框，通过 `frame` 传入 |
| `'flow'` | 彩色光带沿边框流动 |
| `'over'` | 完整渐变边框 + 白色高光流转 |

> ⚠️ **免责声明**：本组件为纯 UI 展示组件，不涉及外部数据接口。二次开发中若添加数据请求，请自行配置鉴权。

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
| `type` | `'default'` / `'primary'` / `'success'` / `'danger'` / `'warning'` | `'default'` | 按钮类型 |

> ⚠️ **免责声明**：本组件为纯 UI 展示组件，不涉及外部数据接口。二次开发中若添加数据请求，请自行配置鉴权。

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
| `error` | `Error` | 接口请求失败时触发 |

> ⚠️ **免责声明**：本组件 `api-url` 接口为公开只读数据，不涉及用户隐私或敏感操作，地址在前端代码中可见不构成安全漏洞。若需加密或鉴权，请在项目的 API 管理文件中自行配置请求拦截器。

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
<yk-layout width="800px">
  <div>内容始终居中</div>
</yk-layout>

<yk-layout width="60%">
  <div>响应式宽度</div>
</yk-layout>

<yk-layout :width="960">
  <div>数字自动补 px</div>
</yk-layout>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number` / `string` | `'1200px'` | 内容区宽度，支持 px / % / vw，数字自动补 px |

> ⚠️ **免责声明**：本组件为纯 UI 布局组件，不涉及外部数据接口。二次开发中若添加数据请求，请自行配置鉴权。

---

### Navbar 导航栏

玻璃质感导航栏组件，半透明毛玻璃背景 + 左上角高光，图片文字竖排居中，hover 时图片放大、阴影抬升、玻璃高光。支持静态数据传入或接口获取。

```vue
<!-- 静态数据 -->
<yk-navbar
  :navList="[
    { id: 'home', name: '首页', image: '/images/home.png', path: '/' },
    { id: 'about', name: '关于', image: '/images/about.png' },
  ]"
/>

<!-- 接口获取 + 设置高度 -->
<yk-navbar api-url="/api/navbar/list" :height="48" />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `navList` | `NavbarItem[]` | `[]` | 导航项数组 |
| `api-url` | `string` | `''` | 接口地址，传入后自动 fetch 获取数据 |
| `height` | `number` / `string` | `''` | 整体高度，数字自动补 px |

**Events**

| 事件 | 参数 | 说明 |
|------|------|------|
| `error` | `Error` | 接口请求失败时触发 |

**NavbarItem 接口**

```ts
interface NavbarItem {
  id: string      // 唯一标识
  name: string    // 显示名称
  image: string   // 图片地址
  path?: string   // 链接地址，可选；不传渲染 <span>
}
```

> ⚠️ **免责声明**：本组件 `api-url` 接口为公开只读数据，不涉及用户隐私或敏感操作，地址在前端代码中可见不构成安全漏洞。若需加密或鉴权，请在项目的 API 管理文件中自行配置请求拦截器。因未合理配置后端鉴权或滥用该接口导致的一切问题，与本组件开发者无关。

---

### TextNav 文字导航

玻璃质感文字导航组件，胶囊容器 + 左上角高光 + 上升气泡动画，hover 时毛玻璃模糊 + 顶部高光。

```vue
<yk-text-nav :items="[
  { text: '首页', path: '/' },
  { text: '组件' },
  { text: '文档', path: '/textnav' },
  { text: '关于' },
]" />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TextNavItem[]` | `[]` | 导航项数组 |

**TextNavItem 接口**

```ts
interface TextNavItem {
  text: string    // 显示文本
  path?: string   // 跳转链接，可选；不传渲染 <span>
}
```

> ⚠️ **免责声明**：本组件为纯 UI 展示组件，不涉及外部数据接口。二次开发中若添加数据请求，请自行配置鉴权。

---

### MobileLayout 移动端布局

上下两段式移动端布局：上方内容区默认占 90%，下方导航区占 10%，导航区顶部带边框。比例可通过 `ratio` 配置。

```vue
<yk-mobile-layout>
  <div>内容区（90%）</div>
  <template #footer>
    <div>导航区（10%）</div>
  </template>
</yk-mobile-layout>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ratio` | `number` | `90` | 上方内容区占比（%），下方导航区自动为 `100 - ratio` |

**Slots**

| 插槽 | 说明 |
|------|------|
| 默认 | 上方内容区 |
| `footer` | 下方导航区，顶部带 1px 边框 |

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

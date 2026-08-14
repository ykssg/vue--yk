# YK-UI

基于 Vue3 + TypeScript 的组件库，组件前缀 `<yk-xxx>`。当前版本 **v1.0.0**。

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

| 组件 | 标签 | 说明 |
|------|------|------|
| [DyIsland 灵动岛](#dyisland-灵动岛) | `<yk-dy-island>` | 顶部灵动岛，显示时间与消息 |
| [UserAvatar 用户头像](#useravatar-用户头像) | `<yk-user-avatar>` | 头像 + 外框叠加 |
| [Button 按钮](#button-按钮) | `<yk-button>` | 基础按钮 |
| [Carousel 轮播图](#carousel-轮播图) | `<yk-carousel>` | 轮播图，静态/API 两种模式 |
| [Layout 布局](#layout-布局) | `<yk-layout>` | 居中布局容器 |
| [Navbar 导航栏](#navbar-导航栏) | `<yk-navbar>` | 玻璃质感导航栏 |
| [TextNav 文字导航](#textnav-文字导航) | `<yk-text-nav>` | 文字导航 |
| [MobileLayout 移动端布局](#mobilelayout-移动端布局) | `<yk-mobile-layout>` | 上下两段式移动端布局 |
| [SearchInput 搜索框](#searchinput-搜索框) | `<yk-search-input>` | 带搜索引擎切换的搜索框，含历史/推荐 |

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

### SearchInput 搜索框

带搜索引擎切换的搜索框组件。默认整体背景透明、点击后半透明，黑色边框。左侧图标可切换搜索引擎（百度/必应/谷歌/知乎/GitHub/B站/360/2345），右侧输入框支持历史记录（最多 5 条，存 localStorage）与热门推荐（最多 5 条），回车或点击搜索按钮触发搜索。

```vue
<!-- 默认（透明背景 + 黑色边框） -->
<yk-search-input />

<!-- 自定义背景色 / 文字颜色 -->
<yk-search-input
  background-color="rgba(255,255,255,0.3)"
  text-color="#ffffff"
/>

<!-- 自定义背景图 -->
<yk-search-input background-image="url('/bg.jpg')" />

<!-- 监听搜索事件 -->
<yk-search-input @search="onSearch" />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `background-color` | `string` | `'transparent'` | 整体背景色，激活时叠加半透明层 |
| `text-color` | `string` | `'#333333'` | 文字颜色 |
| `background-image` | `string` | `''` | 背景图（CSS 值，如 `url('...')`） |
| `engines` | `SearchEngine[]` | 8 个内置引擎 | 搜索引擎列表 |
| `recommend` | `string[]` | 5 条默认词 | 热门推荐词（最多显示 5 条） |
| `placeholder` | `string` | `'搜索...'` | 输入框占位文本 |
| `history-key` | `string` | `'yk-searchinput-history'` | 历史记录 localStorage 键名 |

**Events**

| 事件 | 参数 | 说明 |
|------|------|------|
| `search` | `{ keyword: string; engine: SearchEngine }` | 回车 / 点击搜索 / 点击历史或推荐项时触发，同时新标签页打开对应引擎 |

**SearchEngine 接口**

```ts
interface SearchEngine {
  name: string   // 引擎名称
  icon: string   // 图标（URL 或 data URL）
  url: string    // 搜索地址，用 {keyword} 占位关键词
}
```

> ⚠️ **免责声明**：本组件的搜索行为为公开的第三方搜索引擎 URL 跳转，不收集、不存储任何隐私数据；历史记录仅保存在浏览器本地 localStorage。因第三方搜索引擎的内容与行为导致的任何问题，与本组件开发者无关。

---

## 开发

```bash
pnpm comp:play    # 启动 playground 调试
pnpm docs:dev     # 启动 VitePress 文档
pnpm build        # 构建组件库
pnpm comp:create  # 创建新组件脚手架
```

## 从 0.x 迁移

v1.0.0 对部分组件 API 做了 breaking change，迁移对照如下：

| 组件 | 旧 API | 新 API |
|------|--------|--------|
| TextNav | `model="首页，组件"` + `a-v0="/"` | `:items="[{ text: '首页', path: '/' }]"` |
| Navbar | `listurl` / `h` | `api-url` / `height` |
| Layout | `l-width` | `width` |
| DyIsland | `background-model` | `background-alpha` |
| UserAvatar | `image`（`0` / `1`） | `image-on-top`（`boolean`） |

同时所有组件的 CSS 类名统一为 `yk-` 前缀，`<yk-textnav>` 更名为 `<yk-text-nav>`。

## License

MIT

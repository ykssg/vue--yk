---
sider_text="导航栏 Navbar"
---
:::

# Navbar 导航栏

玻璃质感导航栏组件，支持静态数据传入或接口获取，图片与文字竖排居中，hover 时图片放大、阴影抬升、玻璃高光效果。

::: warning ⚠️ 免责声明
本组件（导航栏）仅用于展示公开导航数据，`listurl` 接口地址为明文传递。该接口属于**低风险只读资源**，不涉及用户隐私或敏感操作，暴露地址在前端代码中可见属于正常现象，不构成安全漏洞。

- 若您需对接口加密或鉴权，请在项目的 API 管理文件中自行配置请求拦截器，添加 Token 或其他签名参数。
- 因未合理配置后端鉴权、或擅自将低风险接口改为敏感数据接口而导致的一切问题，**与本组件开发者无关**。
:::

## 基本用法

传入 `navList` 静态数组渲染导航项。

<div class="navbar-demo">
  <yk-navbar :navList="[
    { id: 'home', name: '首页', image: '/images/home.png', path: '/' },
    { id: 'about', name: '关于', image: '/images/about.png' },
  ]" />
</div>

::: details Show Code

```vue
<template>
  <yk-navbar :navList="[
    { id: 'home', name: '首页', image: '/images/home.png', path: '/' },
    { id: 'about', name: '关于', image: '/images/about.png' },
  ]" />
</template>
```

:::

## 接口获取

通过 `listurl` 传入接口地址，组件 `onMounted` 时自动 fetch 获取导航数据。适合动态配置场景。

<div class="navbar-demo">
  <yk-navbar listurl="https://api.example.com/navbar/list" :h="48" />
</div>

::: details Show Code

```vue
<template>
  <yk-navbar listurl="https://api.example.com/navbar/list" :h="48" />
</template>
```

:::

## 自定义高度

通过 `h` 设置整体高度，数字自动补 `px`，也可传字符串如 `"3rem"`。

<div class="navbar-demo">
  <yk-navbar :navList="[{ id: 'home', name: '首页', image: '/images/home.png' }]" :h="56" />
</div>

::: details Show Code

```vue
<template>
  <yk-navbar
    :navList="[{ id: 'home', name: '首页', image: '/images/home.png' }]"
    :h="56"
  />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `navList` | `Navbar[]` | `[]` | 导航项数组 |
| `listurl` | `string` | — | 接口地址，传入后自动 fetch 获取数据 |
| `h` | `number \| string` | — | 整体高度，数字补 `px` |

### Navbar 类型

```ts
interface Navbar {
  id: string;      // 唯一标识
  name: string;    // 显示名称
  image: string;   // 图片地址
  path?: string;   // 链接地址，可选；不传则渲染为 <span>
}
```

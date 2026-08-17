---
sider_text="折线图 LineChart"
---
:::

# LineChart 折线图

基于 ECharts 封装的折线图组件。通过 `data` 传入 `[x, y]` 二元组数组绘制折线，`data-color` 设置折线颜色，`backgroundcolor` 设置背景颜色（可带透明度）。容器默认宽 100%、高 300px。

::: warning ⚠️ 免责声明
本组件基于 ECharts 渲染，为纯前端展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `:data` 传入 `[x, y]` 二元组数组。

<div class="group">
  <yk-line-chart :data="[[1, 10], [2, 20], [3, 15], [4, 30], [5, 25]]" />
</div>

::: details Show Code

```vue
<template>
  <yk-line-chart :data="[[1, 10], [2, 20], [3, 15], [4, 30], [5, 25]]" />
</template>
```

:::

## 字符串 x 轴

x 为字符串时自动切换为类目轴。

<div class="group">
  <yk-line-chart :data="[['1月', 10], ['2月', 20], ['3月', 15], ['4月', 30]]" />
</div>

::: details Show Code

```vue
<template>
  <yk-line-chart :data="[['1月', 10], ['2月', 20], ['3月', 15], ['4月', 30]]" />
</template>
```

:::

## 自定义颜色与背景

通过 `data-color` 设置折线颜色，`backgroundcolor` 设置背景色（支持 rgba 透明度）。

<div class="group">
  <yk-line-chart
    :data="[[1, 10], [2, 22], [3, 18], [4, 28], [5, 20]]"
    data-color="#e6a23c"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-line-chart
    :data="[[1, 10], [2, 22], [3, 18], [4, 28], [5, 20]]"
    data-color="#e6a23c"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `[number \| string, number][]` | `[]` | 折线数据，`[x, y]` 二元组数组 |
| `data-color` | `string` | `'#409eff'` | 折线颜色 |
| `backgroundcolor` | `string` | `'transparent'` | 背景颜色（可带透明度） |

### LineChartProps 类型

```ts
type LineChartData = [number | string, number]

interface LineChartProps {
  data?: LineChartData[]      // [x, y] 二元组数组
  dataColor?: string          // 折线颜色
  backgroundcolor?: string    // 背景颜色（可带透明度）
}
```

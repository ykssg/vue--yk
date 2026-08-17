---
sider_text="柱状图 BarChart"
---
:::

# BarChart 柱状图

基于 ECharts 封装的区间柱状图组件。通过 `data` 传入 `[x1, x2, y]` 三元组数组，每个柱横跨 `x1 ~ x2`、高度为 `y`。`data-color` 设置柱体颜色，`backgroundcolor` 设置背景颜色（可带透明度）。容器默认宽 100%、高 300px。

::: warning ⚠️ 免责声明
本组件基于 ECharts 渲染，为纯前端展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `:data` 传入 `[x1, x2, y]` 三元组数组。

<div class="group">
  <yk-bar-chart :data="[[1, 3, 10], [4, 6, 20], [7, 9, 15]]" />
</div>

::: details Show Code

```vue
<template>
  <yk-bar-chart :data="[[1, 3, 10], [4, 6, 20], [7, 9, 15]]" />
</template>
```

:::

## 自定义颜色与背景

通过 `data-color` 设置柱体颜色，`backgroundcolor` 设置背景色（支持 rgba 透明度）。

<div class="group">
  <yk-bar-chart
    :data="[[1, 4, 30], [5, 8, 18], [9, 12, 42], [13, 16, 25]]"
    data-color="#67c23a"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-bar-chart
    :data="[[1, 4, 30], [5, 8, 18], [9, 12, 42], [13, 16, 25]]"
    data-color="#67c23a"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `[number, number, number][]` | `[]` | 柱状图数据，`[x1, x2, y]` 三元组数组 |
| `data-color` | `string` | `'#409eff'` | 柱体颜色 |
| `backgroundcolor` | `string` | `'transparent'` | 背景颜色（可带透明度） |

### BarChartProps 类型

```ts
type BarChartData = [number, number, number]

interface BarChartProps {
  data?: BarChartData[]      // [x1, x2, y] 三元组数组
  dataColor?: string          // 柱体颜色
  backgroundcolor?: string    // 背景颜色（可带透明度）
}
```

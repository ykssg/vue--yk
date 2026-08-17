---
sider_text="饼状图 PieChart"
---
:::

# PieChart 饼状图

基于 ECharts 封装的饼状图组件。通过 `data` 传入 `[name, value]` 二元组数组绘制饼图，每个扇区自动分配不同颜色，`backgroundcolor` 设置背景颜色（可带透明度）。容器默认宽 100%、高 300px。

::: warning ⚠️ 免责声明
本组件基于 ECharts 渲染，为纯前端展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

通过 `:data` 传入 `[name, value]` 二元组数组，各扇区自动着色。

<div class="group">
  <yk-pie-chart :data="[['苹果', 10], ['香蕉', 20], ['橙子', 15], ['葡萄', 30]]" />
</div>

::: details Show Code

```vue
<template>
  <yk-pie-chart :data="[['苹果', 10], ['香蕉', 20], ['橙子', 15], ['葡萄', 30]]" />
</template>
```

:::

## 自定义背景

通过 `backgroundcolor` 设置背景色（支持 rgba 透明度）。

<div class="group">
  <yk-pie-chart
    :data="[['苹果', 10], ['香蕉', 20], ['橙子', 15], ['葡萄', 30]]"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</div>

::: details Show Code

```vue
<template>
  <yk-pie-chart
    :data="[['苹果', 10], ['香蕉', 20], ['橙子', 15], ['葡萄', 30]]"
    backgroundcolor="rgba(64, 158, 255, 0.08)"
  />
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `[string, number][]` | `[]` | 饼状图数据，`[name, value]` 二元组数组 |
| `backgroundcolor` | `string` | `'transparent'` | 背景颜色（可带透明度） |

### PieChartProps 类型

```ts
type PieChartData = [string, number]

interface PieChartProps {
  data?: PieChartData[]      // [name, value] 二元组数组
  backgroundcolor?: string    // 背景颜色（可带透明度）
}
```

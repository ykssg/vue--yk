<script lang="ts">
export type BarChartData = [number, number, number]

export interface BarChartProps {
  /** 柱状图数据，[x1, x2, y] 三元组数组，柱横跨 x1~x2、高度为 y，如 [[1, 3, 10], [4, 6, 20]] */
  data?: BarChartData[]
  /** 柱体颜色 */
  dataColor?: string
  /** 背景颜色（可带透明度，如 rgba(255, 255, 255, 0.5)） */
  backgroundcolor?: string
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

defineOptions({
  name: 'YkBarChart'
})

const props = withDefaults(defineProps<BarChartProps>(), {
  data: () => [],
  dataColor: '#409eff',
  backgroundcolor: 'transparent'
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function buildOption(): EChartsOption {
  const color = props.dataColor

  return {
    backgroundColor: props.backgroundcolor,
    grid: { left: 50, right: 24, top: 32, bottom: 40 },
    xAxis: { type: 'value', scale: true },
    yAxis: { type: 'value' },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const d = params.data as number[]
        return `x: ${d[0]} ~ ${d[1]}<br/>y: ${d[2]}`
      }
    },
    series: [
      {
        type: 'custom',
        data: props.data,
        encode: { x: [0, 1], y: 2 },
        renderItem: (_params: any, api: any) => {
          const start = api.coord([api.value(0), 0])
          const end = api.coord([api.value(1), api.value(2)])
          return {
            type: 'rect',
            shape: {
              x: Math.min(start[0], end[0]),
              y: Math.min(start[1], end[1]),
              width: Math.abs(end[0] - start[0]),
              height: Math.abs(start[1] - end[1])
            },
            style: api.style({ fill: color })
          }
        }
      }
    ]
  } as EChartsOption
}

function render() {
  chart?.setOption(buildOption())
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  render()

  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(chartRef.value)
})

watch(() => props.data, render, { deep: true })
watch(() => props.dataColor, render)
watch(() => props.backgroundcolor, render)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div ref="chartRef" class="yk-bar-chart" />
</template>

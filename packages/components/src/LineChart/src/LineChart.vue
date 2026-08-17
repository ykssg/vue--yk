<script lang="ts">
export type LineChartData = [number | string, number]

export interface LineChartProps {
  /** 折线数据，[x, y] 二元组数组，如 [[1, 10], [2, 20]] */
  data?: LineChartData[]
  /** 折线颜色 */
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
  name: 'YkLineChart'
})

const props = withDefaults(defineProps<LineChartProps>(), {
  data: () => [],
  dataColor: '#409eff',
  backgroundcolor: 'transparent'
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function buildOption(): EChartsOption {
  const firstX = props.data[0]?.[0]
  const xType: 'value' | 'category' = typeof firstX === 'number' ? 'value' : 'category'

  return {
    backgroundColor: props.backgroundcolor,
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 24, top: 32, bottom: 40 },
    xAxis: {
      type: xType,
      boundaryGap: xType === 'category' ? false : undefined
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        data: props.data,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: props.dataColor, width: 2 },
        itemStyle: { color: props.dataColor }
      }
    ]
  }
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
  <div ref="chartRef" class="yk-line-chart" />
</template>

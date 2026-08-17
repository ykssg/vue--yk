<script lang="ts">
export type PieChartData = [string, number]

export interface PieChartProps {
  /** 饼状图数据，[name, value] 二元组数组，如 [['苹果', 10], ['香蕉', 20]] */
  data?: PieChartData[]
  /** 背景颜色（可带透明度，如 rgba(255, 255, 255, 0.5)） */
  backgroundcolor?: string
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

defineOptions({
  name: 'YkPieChart'
})

const props = withDefaults(defineProps<PieChartProps>(), {
  data: () => [],
  backgroundcolor: 'transparent'
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function buildOption(): EChartsOption {
  return {
    backgroundColor: props.backgroundcolor,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: '58%',
        center: ['40%', '50%'],
        data: props.data.map(([name, value]) => ({ name, value })),
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 0.85)',
          borderWidth: 3,
          borderRadius: 6
        },
        label: {
          formatter: '{b}: {c}'
        },
        emphasis: {
          scaleSize: 8,
          itemStyle: {
            shadowBlur: 24,
            shadowColor: 'rgba(0, 0, 0, 0.28)',
            shadowOffsetY: 8
          },
          label: {
            fontWeight: 'bold'
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
watch(() => props.backgroundcolor, render)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div ref="chartRef" class="yk-pie-chart" />
</template>

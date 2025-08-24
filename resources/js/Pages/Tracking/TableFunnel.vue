<template>
    <div class="overflow-x-auto mb-10">
      <!-- Bảng dữ liệu -->
      <table class="w-full border border-collapse text-center">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">Step</th>
            <th class="border px-4 py-2">Total Clicks</th>
            <th class="border px-4 py-2">CTR (%)</th>
            <th class="border px-4 py-2">Drop Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="border px-4 py-2 text-left">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.total_clicks }}</td>
            <td class="border px-4 py-2">{{ item.ctr }}%</td>
            <td class="border px-4 py-2">{{ item.drop_rate }}%</td>
          </tr>
        </tbody>
      </table>

      <!-- Biểu đồ funnel -->
      <div class="mt-6 w-full max-w-4xl mx-auto">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </template>

  <script setup>
  import { onMounted, ref, watch } from 'vue'
  import Chart from 'chart.js/auto'

  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  })

  const chartRef = ref(null)
  let funnelChart = null

  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#8BC34A', '#E91E63',
    '#9C27B0', '#00BCD4', '#CDDC39', '#795548'
  ]

  function getColor(index) {
    return colors[index % colors.length]
  }

  const createChart = () => {
    if (funnelChart) funnelChart.destroy()

    const labels = props.data.map(item => item.name)
    const clicks = props.data.map(item => item.total_clicks)
    const backgroundColors = props.data.map((_, index) => getColor(index))

    funnelChart = new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total Clicks',
          data: clicks,
          backgroundColor: backgroundColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    })
  }

  onMounted(createChart)
  watch(() => props.data, createChart, { deep: true })
  </script>

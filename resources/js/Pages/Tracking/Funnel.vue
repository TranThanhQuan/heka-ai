<template>
<Head title="Funnel Tracking" />

    <div class="p-4 max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-4">
        Funnel từ {{ startDate }} đến {{ endDate }}
      </h2>

      <!-- Bộ lọc -->
      <div class="flex flex-wrap justify-center items-end gap-4 mb-6">
        <div>
          <label for="startDate" class="block text-sm font-medium mb-1">Từ ngày:</label>
          <input type="date" v-model="startDate" class="border rounded px-3 py-2 w-48" />
        </div>

        <div>
          <label for="endDate" class="block text-sm font-medium mb-1">Đến ngày:</label>
          <input type="date" v-model="endDate" class="border rounded px-3 py-2 w-48" />
        </div>

        <button
          @click="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Xem
        </button>
      </div>

      <!-- Bảng Onboarding -->
      <div class="mb-10">
        <h3 class="text-lg font-semibold mb-2">🟢 Onboarding Funnel</h3>
        <TableFunnel :data="dataOnboarding" />
      </div>

      <!-- Bảng IAP -->
      <div>
        <h3 class="text-lg font-semibold mb-2">💳 IAP Funnel</h3>
        <TableFunnel :data="dataIap" />
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue'
  import { router } from '@inertiajs/vue3'
  import dayjs from 'dayjs'
  import TableFunnel from './TableFunnel.vue'
  import { Head } from '@inertiajs/vue3'
  // Props
  const props = defineProps({
    dataOnboarding: Array,
    dataIap: Array,
    startDate: String,
    endDate: String,
  })

  console.log(props.dataOnboarding)
  console.log(props.dataIap)


  // Reactive variables
  const startDate = ref(props.startDate)
  const endDate = ref(props.endDate)

  // Submit function
  const submit = () => {
    router.get(route('tracking.funnel'), {
      startDate: startDate.value,
      endDate: endDate.value,
    })
  }

  // Auto-fetch on mount if not available
  onMounted(() => {
    if (!props.startDate || !props.endDate) {
      endDate.value = dayjs().format('YYYY-MM-DD')
      startDate.value = dayjs().subtract(6, 'day').format('YYYY-MM-DD')
      submit()
    }
  })
  </script>

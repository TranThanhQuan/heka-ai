<template>

    <Head title="Thống kê Click" />
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-6 flex items-center space-x-2">
        <span>📊</span>
        <span>Thống kê Click</span>
      </h2>

      <!-- Filters -->
      <form @submit.prevent="search">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <!-- Event Name -->
          <div>
            <label class="text-sm font-medium mb-1 block">Event Name</label>
            <select v-model="filters.event_name" class="w-full border rounded px-2 py-1">
              <option value="">Tất cả</option>
              <option v-for="event in eventNames" :key="event" :value="event">{{ event }}</option>
            </select>
          </div>

          <!-- Device -->
          <div>
            <label class="text-sm font-medium mb-1 block">Thiết bị</label>
            <select v-model="filters.device" class="w-full border rounded px-2 py-1">
              <option value="">Tất cả</option>
              <option v-for="device in devices" :key="device" :value="device">{{ device }}</option>
            </select>
          </div>

          <!-- Country -->
          <div>
            <label class="text-sm font-medium mb-1 block">Quốc gia</label>
            <select v-model="filters.country" class="w-full border rounded px-2 py-1">
              <option value="">Tất cả</option>
              <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
            </select>
          </div>

          <!-- Start Date -->
          <div>
            <label class="text-sm font-medium mb-1 block">Từ ngày</label>
            <input type="date" v-model="filters.startDate" class="w-full border rounded px-2 py-1" />
          </div>

          <!-- End Date -->
          <div>
            <label class="text-sm font-medium mb-1 block">Đến ngày</label>
            <input type="date" v-model="filters.endDate" class="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <div class="text-right mb-6">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            🔍 Tìm kiếm
          </button>
        </div>
      </form>

      <div class="font-bold mb-6">
        <span class="text-lg  ">Tổng số lượt click: {{ totalClicks }}</span>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full border border-collapse text-sm text-center">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2">#</th>
              <th class="border px-4 py-2">Event</th>
              <th class="border px-4 py-2">IP</th>
              <th class="border px-4 py-2">Quốc gia</th>
              <th class="border px-4 py-2">Thiết bị</th>
              <th class="border px-4 py-2">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.data" :key="item.id" class="hover:bg-gray-50">
              <td class="border px-4 py-2">{{ index + 1 + ((data.current_page - 1) * data.per_page) }}</td>
              <td class="border px-4 py-2">{{ item.event_name }}</td>
              <td class="border px-4 py-2">{{ item.ip_address }}</td>
              <td class="border px-4 py-2">{{ item.country }}</td>
              <td class="border px-4 py-2">{{ item.device }}</td>
              <td class="border px-4 py-2">{{ formatCreatedAt(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-4 flex flex-wrap justify-center space-x-2">
          <button
            v-for="(link, index) in data.links"
            :key="index"
            @click="changePage(link.url)"
            v-html="link.label"
            :disabled="!link.url"
            class="px-3 py-1 border rounded"
            :class="{ 'bg-blue-600 text-white': link.active, 'text-gray-500': !link.url }"
          />
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { router, Head } from '@inertiajs/vue3'
  import { ref } from 'vue'

  const props = defineProps({
    data: Object,
    eventNames: Array,
    countries: Array,
    devices: Array,
    filters: Object,
    totalClicks: Number,
  })


  const filters = ref({
    event_name: props.filters.event_name || '',
    device: props.filters.device || '',
    country: props.filters.country || '',
    startDate: props.filters.startDate || '',
    endDate: props.filters.endDate || '',
  })

  // Tìm kiếm (submit form)
  const search = () => {
    router.get(route('tracking.viewTracking'), filters.value, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  // Chuyển trang
  const changePage = (url) => {
    if (url) {
      router.get(url, filters.value, {
        preserveScroll: true,
        preserveState: true,
      })
    }
  }


  // format created_at from 2025-08-24T08:13:38.000000Z to dd/mm/yyyy H:i
  const formatCreatedAt = (created_at) => {
    return created_at.split('T')[0] + ' ' + created_at.split('T')[1].split('.')[0]
  }
  </script>

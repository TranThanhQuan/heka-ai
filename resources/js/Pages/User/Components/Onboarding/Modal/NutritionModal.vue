<template>
    <transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-70"
        @keydown.esc="close"
      >
        <!-- Modal content -->
        <div
          class="relative w-full max-w-[270px] mx-auto rounded-2xl overflow-hidden shadow-lg"
          style="background: url('/images/onboarding/modal/bg_nutrition_modal.png') no-repeat center center/cover"
        >
          <!-- ❌ Overlay (disabled) -->
          <!-- <div class="absolute inset-0 bg-black bg-opacity-60"></div> -->

          <!-- ❌ Close Button -->
          <button
            @click="close"
            class="absolute top-3 right-3 z-20 w-6 h-6 text-white bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full flex items-center justify-center text-xs"
          >
            ✕
          </button>

          <!-- Content -->
          <div class="relative z-10 flex flex-col items-center text-center text-white p-6">
            <!-- Pricing Options -->
            <div class="grid grid-cols-2 gap-2 w-full mx-auto" style="padding-top: 21rem;">
              <!-- 1 Month -->
              <div @click="selectPlan('1month')" class="cursor-pointer">
                <img
                  :src="selected === '1month' ? '/images/onboarding/modal/1month_active.png' : '/images/onboarding/modal/1month.png'"
                  alt="1 month"
                  class="w-full"
                />
              </div>

              <!-- 12 Months -->
              <div @click="selectPlan('12months')" class="cursor-pointer">
                <img
                  :src="selected === '12months' ? '/images/onboarding/modal/12months_active.png' : '/images/onboarding/modal/12months.png'"
                  alt="12 months"
                  class="w-full"
                />
              </div>
            </div>

            <!-- CTA -->
            <button
              @click="accept"
              class="mt-2 w-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold py-2 rounded-xl shadow-md"
            >
              Go Premium Now
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>

<script setup>
import { ref } from 'vue'

// Định nghĩa props và emits
const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['close', 'accepted'])

// Lưu ID gói
const selected = ref('12months')

// Lấy giá từ ENV
const PRICE_IDS = {
  '1month': import.meta.env.VITE_PRICE_ID_MONTHLY,
  '12months': import.meta.env.VITE_PRICE_ID_YEARLY
}

// Đóng modal
const close = () => emit('close')

// Accept gói → console log price id
const accept = () => {
  const priceId = PRICE_IDS[selected.value]
  console.log('Selected Price ID:', priceId)
  emit('accepted', selected.value)
  close()
}

// Cập nhật gói chọn
const selectPlan = (plan) => {
  selected.value = plan
}
</script>


  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>

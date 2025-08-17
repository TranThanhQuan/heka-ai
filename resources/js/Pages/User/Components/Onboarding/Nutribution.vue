<template>
    <div class="overflow-hidden">
        <!-- Dynamic height image -->
        <div class="mx-auto pb-5" style="height: calc(100vh - 250px);">
            <img src="/images/onboarding/image_nutrition.png" alt="" class="h-full w-auto mx-auto object-contain" />
        </div>

        <!-- Bottom fixed content -->
        <div ref="footerRef" class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-6 px-4">
            <div class="text-center">
                <h2 class="text-lg font-bold text-black">
                    MASTER YOUR <span class="text-blue-600">NUTRITION</span>
                </h2>
                <p class="text-sm text-gray-600 mt-1">
                    Log food, control calories, and build healthier habits with AI support.
                </p>
                <div class="mt-4 flex justify-center">
                    <button @click="showModal = true"
                        class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4 transition duration-200">
                        Get Started
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg_nutrition_modal.png" @close="showModal = false" @accepted="handleAccepted" />

    </div>
</template>

<script setup>
import { ref } from 'vue'
import PaywallModal from './Modal/PaywallModal.vue'
defineEmits(['change-screen'])

const handleAccepted = (priceId) => {
    console.log('Price ID:', priceId)
    // Thực hiện các hành động sau khi người dùng chấp nhận thanh toán
}

const showModal = ref(false)
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

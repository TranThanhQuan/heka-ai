<template>
    <OnboardingLayout>
        <div class="text-center text-xl font-semibold">
            <img class="w-4/5 mx-auto" src="/images/onboarding/intro1.png" alt="">
        </div>

        <div class="text-center px-4 py-8">
            <h2 class="text-xl font-bold">
                STAY ON <span class="text-blue-600">TRACK</span>
            </h2>
            <p class="mt-2 text-gray-700">
                Log food, control calories, and watch your<br />
                weight goals become reality
            </p>

            <!-- Dots -->
            <div class="mt-4 flex justify-center gap-2">
                <span class="w-2 h-2 bg-white border border-gray-400 rounded-full"></span>
                <span class="w-2 h-2 bg-black rounded-full"></span>
            </div>
        </div>

        <!-- button next fixed on bottom -->
        <div class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow">
            <div class="flex items-center justify-center px-4 py-2">
                <button
                    type="button"
                    class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 w-1/5"
                    @click="$emit('change-screen', 'Intro2')"
                >
                    Next
                </button>
            </div>
        </div>
    </OnboardingLayout>
</template>

<script setup>
import OnboardingLayout from '../../Layouts/OnboardingLayout.vue';


defineEmits(['change-screen'])

defineProps({
    message: String,
})
</script>

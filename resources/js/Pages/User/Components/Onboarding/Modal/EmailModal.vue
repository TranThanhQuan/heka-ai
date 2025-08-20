<template>
    <transition name="fade">
        <div v-if="visible"
            class="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-70"
            @keydown.esc="close">
            <!-- Modal content -->
            <div class="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6">
                <!-- Close Button -->
                <button @click="close"
                    class="absolute top-3 right-3 z-20 w-6 h-6 text-black hover:bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    ✕
                </button>

                <!-- Content -->
                <div class="flex flex-col items-center text-center space-y-4 mt-4">
                    <!-- Title -->
                    <h2 class="text-lg font-semibold text-black">Enter your email to continue</h2>

                    <!-- form input email -->
                    <form @submit.prevent="submit">
                        <input type="email" v-model="email" placeholder="Email" class="w-full p-2 border border-gray-300 rounded-md mb-2">
                        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded-md">Continue</button>
                    </form>




                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';


const showLoading = ref(false)
const email = ref('')

const props = defineProps({
    visible: Boolean
})
const emit = defineEmits(['close', 'email'])

const close = () => emit('close')

const submit = () => {
    emit('email', email.value)
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

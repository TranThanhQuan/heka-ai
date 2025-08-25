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
                    <h2 class="text-lg font-semibold text-black">Login to Continue</h2>

                    <!-- Google Button -->
                    <!-- <button @click="loginWithProvider('google')" :disabled="showLoading"
                        class="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 px-4 text-black hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" x="0px" y="0px" width="20" height="20"
                            viewBox="0 0 48 48">
                            <path fill="#fbc02d"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                            </path>
                            <path fill="#e53935"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                            </path>
                            <path fill="#4caf50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                            </path>
                            <path fill="#1565c0"
                                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                            </path>
                        </svg>
                        Continue with Google
                    </button>


                    <button @click="loginWithProvider('apple')" :disabled="showLoading"
                        class="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 px-4 text-black hover:bg-gray-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple"
                            width="18" height="18" class="mr-2">
                        Continue with Apple
                    </button> -->


                    <!-- Google Button -->
                        <button @click="loginWithProvider('google')" :disabled="showLoading"
                            class="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 px-4 text-black hover:bg-gray-100">
                            <template v-if="loadingProvider === 'google'">
                                <svg class="animate-spin mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>

                            </template>
                            <template v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" x="0px" y="0px" width="20" height="20"
                                    viewBox="0 0 48 48">
                                    <path fill="#fbc02d"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                                    </path>
                                    <path fill="#e53935"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                                    </path>
                                    <path fill="#4caf50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                                    </path>
                                    <path fill="#1565c0"
                                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                                    </path>
                                </svg>
                                Continue with Google
                            </template>
                        </button>

                        <!-- Apple Button -->
                        <button @click="loginWithProvider('apple')" :disabled="showLoading"
                            class="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 px-4 text-black hover:bg-gray-100">
                            <template v-if="loadingProvider === 'apple'">
                                <svg class="animate-spin mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>

                            </template>
                            <template v-else>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple"
                                    width="18" height="18" class="mr-2">
                                Continue with Apple
                            </template>
                        </button>

                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/utils/auth';


const showLoading = ref(false)
const loadingProvider = ref(null)


const props = defineProps({
    visible: Boolean
})
const emit = defineEmits(['close', 'login'])

const close = () => emit('close')

// const loginWithProvider = (provider) => {
//     showLoading.value = true
//     console.log('loginWithProvider', provider)
//     // login(provider);
// }


const loginWithProvider = (provider) => {
    showLoading.value = true
    loadingProvider.value = provider

    // Giả lập xử lý đăng nhập trong 2s
    login(provider)
    setTimeout(() => {
        showLoading.value = false
        loadingProvider.value = null

    }, 3000)
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

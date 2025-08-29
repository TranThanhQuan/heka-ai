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
<<<<<<< HEAD
                    <h2 class="text-lg font-semibold text-black">Enter your email to receive the personalized plan just for you</h2>
=======
                    <h2 class="text-lg font-semibold text-black">Enter your email to active the personalized plan just for you</h2>
>>>>>>> dev

                    <!-- form input email -->
                    <form @submit.prevent="submit" class="relative w-full">
                        <input type="text" v-model="email" @blur="validateEmail" placeholder="Email"
                            class="w-full p-2 border border-gray-300 rounded-md mb-1" :disabled="isLoading" />

                        <p v-if="emailError" class="text-sm text-red-500 mb-2">{{ emailError }}</p>
                        <p v-else class="text-sm text-red-500 mb-7"> </p>

                        <div class="text-sm text-black bg-slate-100 p-2 rounded-md text-left">
                            <p><b>Note:</b> Please enter your correct email to synchronize your benefits with the Heka AI mobile app.</p>
                            <br>
                            <p>We respect your privacy and are committed to protecting your personal data. Your data will be processed in accordance with our Privacy Policy.</p>
                        </div>

                        <div class="relative w-full mt-4">
                            <button type="submit" :disabled="!email || emailError || isLoading"
                                class="w-full p-2 bg-blue-500 text-white rounded-md relative transition-opacity duration-200"
                                :class="{ 'opacity-50 cursor-not-allowed': !email || emailError || isLoading }">
                                <span v-if="!isLoading">Get My Plan</span>
                                <span v-else class="invisible">Get My Plan</span>
                            </button>

                            <!-- vòng tròn loading overlay -->
                            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-10">
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8z"></path>
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { createPaymentLink } from '@/utils/paymentLink';
import { showLoadingScreen, hideLoadingScreen } from '@/utils/helpers';
import Swal from 'sweetalert2';

const email = ref('');
const emailError = ref('');
const isEmailValid = ref(false);
const isLoading = ref(false);

const showLoading = ref(false);

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['close', 'email']);

const close = () => emit('close');

// Regex kiểm tra định dạng email
const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

// Theo dõi thay đổi của email để validate real-time
watch(email, (newVal) => {
  if (newVal === '') {
    emailError.value = '';
    isEmailValid.value = false;
  } else if (!validateEmail(newVal)) {
    emailError.value = 'Email not valid';
    isEmailValid.value = false;
  } else {
    emailError.value = '';
    isEmailValid.value = true;
  }
});

const submit = async () => {
  if (!isEmailValid.value) return;

  isLoading.value = true;

  const priceId = localStorage.getItem('priceId');

  if (!priceId) {
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong',
      text: 'Please try again'
    });

    isLoading.value = false;
    //close modal
    close();
    return;
  }

  const result = await createPaymentLink(email.value, priceId);

  isLoading.value = false;

  if (result.success) {

    localStorage.removeItem('priceId');
    window.location.href = result.data.url;
  } else {
    Swal.fire({
      icon: 'error',
      title: result.error.message,
      text: 'Please use another email'
    }).then(() => {
    //   window.location.reload();
    });
  }
};
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

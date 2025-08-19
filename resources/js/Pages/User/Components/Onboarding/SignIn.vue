<template>
    <div class="w-4/5 md:w-1/3 mx-auto h-full px-4">
      <transition name="fade" @after-leave="$emit('change-screen', 'MainGoal')">
        <div v-if="showContent" class="text-center flex flex-col items-center justify-center h-full ">
          <!-- Logo HEKA -->
          <a href="/">
            <img src="/images/icon.png" alt="logo" class="w-20 md:w-1/5 mx-auto mb-2" />
          </a>
          <h2 class="text-xl font-bold">HEKA AI</h2>
          <p class="text-base text-[#a1a1a1]">Smart Eating Stronger Living</p>

          <!-- Nút Apple -->
          <a href="javascript:void(0)" class="w-full md:w-3/5 mx-auto mt-6 cursor-pointer" @click="loginWithProvider('apple')">
            <img src="/images/onboarding/continue_apple.png" alt="Continue with Apple" class="transition-transform duration-200 hover:scale-105 w-full" />
          </a>

          <!-- Nút Google -->
          <a href="javascript:void(0)" class="w-full md:w-3/5 mx-auto mt-4 cursor-pointer" @click="loginWithProvider('google')">
            <img src="/images/onboarding/continue_google.png" alt="Continue with Google" class="transition-transform duration-200 hover:scale-105 w-full" />
          </a>

          <!-- Nút Guest -->
          <a class="flex items-center gap-2 justify-center text-blue-500 mt-8 text-sm md:text-base" style="cursor:pointer" id="continueGuest" @click="handleGuestClick">
            Continue as Guest
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </transition>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { login, silentLoginSSO, getUserInfo, handleLogout } from '@/utils/auth'
  import { logEvent, analytics } from '@/firebase'


  const props = defineProps({
    source: {
      type: String
    }
  })



  const showContent = ref(true)

  const handleGuestClick = () => {
    showContent.value = false
  }

  const loginWithProvider = (provider) => {

    login(provider);

    logEvent(analytics, 'sign_in', {
      method: provider
    });


    }
  </script>

  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>

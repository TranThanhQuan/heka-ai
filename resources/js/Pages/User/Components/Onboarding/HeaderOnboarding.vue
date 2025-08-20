<template>

<nav class="border-gray-200 bg-gray-50">
  <div class="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
         <ApplicationLogo class="h-10 w-auto fill-current text-gray-800 dark:text-gray-200" />
    </a>
    <a href="javascript:void(0)" id="direct-purchase" class="  w-1/4 md:w-1/5" @click="showModal = true">
        <img src="/images/onboarding/Animation-Premium.gif" alt="">
    </a>

  </div>
</nav>

<!-- modal -->
<PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg_premium_modal.png" @close="showModal = false" @accepted="handleAccepted" @showSignInModal="showSignInModal = true" @closeModal="showModal = true" @headerModal="showModal = true" />

<SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />

</template>

<script setup>
import { ref, watch } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import PaywallModal from './Modal/PaywallModal.vue';
import SignInModal from './Modal/SignInModal.vue';
import { eventTracking } from "@/utils/tracking.js";

const props = defineProps({
    title: {
        type: String,
        default: 'Default Title'
    }
});

const showModal = ref(false)
const showSignInModal = ref(false)

const handleAccepted = (priceId) => {
    console.log('Price ID:', priceId)
}

const handleLogin = () => {
    showSignInModal.value = false
}

watch(showModal, (newVal) => {
    //lấy goal từ localStorage
    const goal = localStorage.getItem('goal')
    let source = ''

    if (goal === 'lose') {
        source = 'onboarding_lose'
    } else if (goal === 'maintain') {
        source = 'onboarding_maintain'
    } else if (goal === 'gain') {
        source = 'onboarding_gain'
    } else if (goal === 'healthy') {
        source = 'onboarding_healthy'
    } else {
        source = 'home_scr_pro_icon'
    }


    if (newVal) {
        // lưu số lần mở modal vào localStorage integer
        const openModalCount = parseInt(localStorage.getItem('openModalCount')) || 0
        localStorage.setItem('openModalCount', openModalCount + 1)
        eventTracking('iap_view', {
            convert_number: openModalCount + 1,
            source: source
        })

    }
})

</script>


<style scoped>
#direct-purchase img {

    animation: zoomInOut 2s infinite ease-in-out;
}

@keyframes zoomInOut {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(.9);
    }
}
</style>

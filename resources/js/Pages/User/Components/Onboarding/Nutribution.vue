<template>
    <div class="overflow-hidden">
        <!-- Dynamic height image -->
        <div class="mx-auto pb-5" style="height: calc(67vh);">

            <img v-if="isMobile" src="/images/onboarding/image_nutrition.webp" alt="" class="h-full w-auto mx-auto object-contain" />

            <video v-else src="/images/onboarding/video/introduction.mp4" autoplay muted loop
                class="h-full w-auto mx-auto object-contain" />
        </div>

        <!-- Bottom fixed content -->
        <div ref="footerRef" class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-8 md:pb-6 px-4">
            <div class="text-center">
                <h2 class="text-lg font-bold text-black">
                    MASTER YOUR <span class="text-blue-600">NUTRITION</span>
                </h2>
                <p class="text-sm text-gray-600 mt-1">
                    Log food, control calories, and build healthier habits with AI support.
                </p>
                <div class="mt-4 flex justify-center">
                    <button @click="getStarted()"
                        class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4 transition duration-200 btn-next">
                        Get Started
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <PaywallModal :visible="showModal" :forceClose="forceClose" :backgroundUrl="modalBackground" @close="showModal = false"
            @accepted="handleAccepted" @showSignInModal="showSignInModal = true" @showEmailModal="showEmailModal = true" />

        <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />

        <EmailModal :visible="showEmailModal" @close="showEmailModal = false" @email="handleEmail" />

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import PaywallModal from './Modal/PaywallModal.vue'
import SignInModal from './Modal/SignInModal.vue'
import EmailModal from './Modal/EmailModal.vue'
import { eventTracking } from "@/utils/tracking.js";

const isMobile = ref(false)
const forceClose = ref(false)

const props = defineProps({
    userData: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    isMobile.value = window.innerWidth < 768
})

const showEmailModal = ref(false)
defineEmits(['change-screen'])

const handleAccepted = (priceId) => {
    // Thực hiện các hành động sau khi người dùng chấp nhận thanh toán

    // showModal.value = false;
    // gọi hàm checkout
    checkout(priceId)
}

const showModal = ref(false)
const showSignInModal = ref(false)
const modalBackground = ref('')

// gọi modal paywall truyền vào background
const showPaywall = () => {
    if (props.userData.goal === 'lose') modalBackground.value = '/images/onboarding/modal/bg_lose_modal.png'
    else if (props.userData.goal === 'gain') modalBackground.value = '/images/onboarding/modal/bg_gain_modal.png'
    else if (props.userData.goal === 'maintain') modalBackground.value = '/images/onboarding/modal/bg_maintain_modal.png'
    else if (props.userData.goal === 'healthy') modalBackground.value = '/images/onboarding/modal/bg_nutrition_modal.png'

    forceClose.value = false
    showModal.value = true
}

const getStarted = () => {
    // event tracking
    eventTracking('nutrition_scr_next_click')

    // hiện modal paywall
    showPaywall();
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

watch(showSignInModal, (newVal) => {
    if (newVal) {
        eventTracking('sign_in_pu')
    }
})

const handleLogin = () => {
    showSignInModal.value = false
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



/* Dưới 768px */
@media (max-width: 768px) {
    .btn-next {
        font-size: 1.2rem;
        padding: 1rem 2rem;
    }
}
</style>

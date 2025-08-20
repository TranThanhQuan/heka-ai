<template>
    <transition name="fade">
        <div v-if="visible"
            class="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-70"
            @keydown.esc="close">
            <!-- Modal content -->
            <div class="modal-paywall relative w-full max-w-[250px] mx-auto rounded-2xl overflow-hidden shadow-lg" :style="{
                background: `url('${backgroundUrl}') no-repeat center center/cover`
            }">
                <!-- ❌ Close Button -->
                <button @click="close(true)"
                    class="absolute top-3 right-3 z-20 w-6 h-6 text-white bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full flex items-center justify-center text-xs">
                    ✕
                </button>

                <!-- Content -->
                <div class="relative z-10 flex flex-col items-center text-center text-white p-6">
                    <!-- Pricing Options -->
                    <div class="grid grid-cols-2 gap-2 w-full mx-auto price-option" style="padding-top: 21rem;">
                        <div @click="selectPlan('1month')" class="cursor-pointer">
                            <img :src="selected === '1month' ? '/images/onboarding/modal/1month_active.png' : '/images/onboarding/modal/1month.png'"
                                alt="1 month" class="w-full" />
                        </div>

                        <div @click="selectPlan('12months')" class="cursor-pointer">
                            <img :src="selected === '12months' ? '/images/onboarding/modal/12months_active.png' : '/images/onboarding/modal/12months.png'"
                                alt="12 months" class="w-full" />
                        </div>
                    </div>

                    <!-- CTA -->
                    <button @click="accept"
                        class="mt-2 w-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold py-2 rounded-xl shadow-md">
                        Go Premium Now
                    </button>
                </div>
            </div>
        </div>
    </transition>

    <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />
</template>

<script setup>
import { ref } from 'vue';
import { checkout } from '@/utils/payment';
import SignInModal from '@/Pages/User/Components/Onboarding/Modal/SignInModal.vue';

const showSignInModal = ref(false)

const props = defineProps({
    visible: Boolean,
    backgroundUrl: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['close', 'accepted', 'showSignInModal', 'closeModal'])
const selected = ref('12months')

const PRICE_IDS = {
    '1month': import.meta.env.VITE_PRICE_ID_MONTHLY,
    '12months': import.meta.env.VITE_PRICE_ID_YEARLY
}

const isProfile = () => {

    const requiredKeys = [
        'activity', 'goal', 'gender', 'year_of_birth', 'measure_type',
        'current_weight', 'current_height', 'target_cal',
        'goal_weight', 'start_date', 'end_date'
    ];

    return requiredKeys.every(key => {
        const value = localStorage.getItem(key);
        return value !== null && value.trim() !== '';
    });

}


const close = (isClose = false) => {
    const groupName = localStorage.getItem('group_name');
    if (groupName === 'vip') {
        window.location.href = '/';
    } else {
        emit('close', isClose)
    }
}

const accept = () => {
    const priceId = PRICE_IDS[selected.value]
    localStorage.setItem('priceId', priceId)

    if (!localStorage.getItem('accessToken')) {
        //    nếu không có accessToken thì trả về tín hiệu để index.vue hiện modal đăng nhập

        emit('showSignInModal')
        close()
        return
    }


    checkout(priceId)
    emit('accepted', priceId)
}

const selectPlan = (plan) => {
    selected.value = plan
}

const handleLogin = () => {
    isLoggedIn.value = true
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
    .modal-paywall{
        max-width: 80vw;
    }
    .price-option{
        padding-top: 24rem!important;
    }
}

/* Từ 769px đến 1280px */
@media (min-width: 769px) and (max-width: 1280px) {
    .modal-paywall{
        max-width: 200px!important;
    }

    .price-option{
        padding-top: 15rem!important;
    }
}

/* Từ 1281px đến 1600px */
@media (min-width: 1281px) and (max-width: 1600px) {

}
/* Trên 1600px */
@media (min-width: 1601px) {

}


</style>

<template>
    <OnboardingLayout>
        <component :is="currentComponent" :userData="userData"  @change-screen="changeScreen" />

        <PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg-modal.jpg" @close="showModal = false" @accepted="handleAccepted" @showSignInModal="showSignInModal = true" />
        <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />
    </OnboardingLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import OnboardingLayout from '../Layouts/OnboardingLayout.vue';
import SignIn from '../Components/Onboarding/SignIn.vue';
import MainGoal from '../Components/Onboarding/MainGoal.vue';
import GenderAge from '../Components/Onboarding/GenderAge.vue';
import Activity from '../Components/Onboarding/Activity.vue';
import HeightWeight from '../Components/Onboarding/HeightWeight.vue';
import GoalWeight from '../Components/Onboarding/GoalWeight.vue';
import Review from '../Components/Onboarding/Review.vue';
import Nutribution from '../Components/Onboarding/Nutribution.vue';
import PaywallModal from '../Components/Onboarding/Modal/PaywallModal.vue';
import SignInModal from '../Components/Onboarding/Modal/SignInModal.vue';

import { silentLoginSSO, getUserInfo, handleLogout } from '@/utils/auth';

const isLoggedIn = ref(false);
const showModal = ref(false);
const showSignInModal = ref(false);

// ==== Handle Code Param (SSO login) ====
const code = new URLSearchParams(window.location.search).get('code')
if (code) {
    silentLoginSSO(code)
} else {
    checkLoginStatus()
}


async function checkLoginStatus() {
    const token = localStorage.getItem('accessToken')
    if (token) {
        isLoggedIn.value = true
        getUserInfo().then(() => {
            //group name
            const groupName = localStorage.getItem('group_name');
            console.log('groupName: ', groupName)
            if(groupName === 'vip'){
                //show modal paywall
                showModal.value = true
            }
        })
    }
}

const userData = ref({
    goal: null,
    current_weight: null,
    current_height: null,
    measure_type: null
})


// Danh sách màn hình có thể hiển thị
const screens = {
    SignIn,
    MainGoal,
    GenderAge,
    HeightWeight,
    Activity,
    GoalWeight,
    Review,
    Nutribution,
}

// Biến điều khiển màn hình đang hiển thị
const currentScreen = ref('SignIn')

const currentComponent = computed(() => screens[currentScreen.value] || GenderAge)

// Hàm chuyển màn hình
function changeScreen(screenName, userData = {}, showIntro = false) {
    userData.showIntro = showIntro;

    if (userData.goal) {
        currentScreen.value = userData.goal === 'healthy' ? 'Nutribution' : screenName;
    } else {
        currentScreen.value = screenName;
    }
}

// ==== Auth actions ====
const handleLogin = (provider) => {
    login(provider)
    showSignInModal.value = false
}


const logout = () => {
    handleLogout()
    isLoggedIn.value = false
    hasSubscription.value = false
}

</script>

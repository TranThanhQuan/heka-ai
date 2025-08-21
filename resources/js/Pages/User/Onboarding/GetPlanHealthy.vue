<template>
    <OnboardingLayout>
        <component :is="currentComponent" :userData="userData" :source="source" @change-screen="changeScreen" />

        <PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg_premium_modal.png" @close="showModal = false" @accepted="handleAccepted" @showSignInModal="showSignInModal = true" @showEmailModal="showEmailModal = true" />
        <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />
        <EmailModal :visible="showEmailModal" @close="showEmailModal = false" @email="handleEmail" />
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
import EmailModal from '../Components/Onboarding/Modal/EmailModal.vue';
import { usePage } from '@inertiajs/vue3';
import { silentLoginSSO, getUserInfo, handleLogout } from '@/utils/auth';
const page = usePage();

const source = ref(page.props.source)

function loadScript(src, id) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.src = src;
  script.id = id;
  script.async = true;
  document.head.appendChild(script);
}

if (source.value === 'get-premium') {
  loadScript('/scripts/meta.js', 'meta-pixel');
} else if (source.value === 'tt-get-premium') {
  loadScript('/scripts/tiktok.js', 'tiktok-pixel');
} else if (source.value === 'ga-get-premium') {
  loadScript('/scripts/ga.js', 'ga-script');
}



const isLoggedIn = ref(false);
const showModal = ref(false);
const showSignInModal = ref(false);
const showEmailModal = ref(false);

localStorage.setItem('noSignIn', true)

// ==== Handle Code Param (SSO login) ====
const code = new URLSearchParams(window.location.search).get('code')
if (code) {
    silentLoginSSO(code)
} else {
    checkLoginStatus()
}

const handleAccepted = () => {
    console.log('handleAccepted')
}

async function checkLoginStatus() {
    const token = localStorage.getItem('accessToken')
    if (token) {
        isLoggedIn.value = true
        getUserInfo().then(() => {
            //group name
            const groupName = localStorage.getItem('group_name');

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
    measure_type: null,
    targetScreen: 'Nutribution'
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
const currentScreen = ref('MainGoal')
localStorage.setItem('goal', 'healthy')
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

const handleEmail = (email) => {
    console.log(email)
}

const logout = () => {
    handleLogout()
    isLoggedIn.value = false
    hasSubscription.value = false
}

</script>

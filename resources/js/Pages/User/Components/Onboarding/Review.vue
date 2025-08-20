<template>
    <div class="relative w-full md:w-1/3 mx-auto overflow-y-auto pb-28 px-4 " style="min-height: calc(100vh - 100px);">
        <!-- ✅ Intro Overlay -->
        <transition name="fade">
            <div v-if="showIntro"
                class="absolute top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center text-center px-5">
                <div>
                    <img src="/images/onboarding/gif/info_guide.gif" alt="Intro" class="w-1/3 mx-auto mb-4" />
                    <p class="text-lg ">
                        Congrats! Your account is all set. <br> Enjoy your <strong>journey with Heka! </strong>
                    </p>
                </div>
            </div>
        </transition>
        <div v-if="showMainContent" class="relative z-10 w-full  mx-auto"
            style="height: calc(100vh - 100px);">

            <!-- back arrow -->
            <div class="flex items-center justify-start">
                <img @click="back()" src="/images/onboarding/back_arrow.png" alt="back" class="w-10 h-10 cursor-pointer" />
            </div>

            <div class="h-full overflow-y-auto box-step" style="padding-bottom: 6rem;">
                <!-- intro -->
                <div class="text-center px-5">
                    <div class="flex justify-center p-4">
                        <img :src="contentData.handImage" alt="thanks" class="w-2/5 md:w-1/4" />

                    </div>
                    <div class="text-gray-700 font-medium w-full md:w-4/5 mx-auto" v-html="contentData.introText"></div>
                </div>

                <hr class="my-4 w-4/5 mx-auto" />

                <!-- goal info -->
                <div class="text-center p-0 md:px-5">

                    <p class="font-semibold text-sm text-gray-700 mb-1">
                        {{ contentData.encouragement }}
                    </p>
                    <p v-if="props.userData.goal != 'maintain'" class="text-xl my-2 font-bold text-black bg-[#f7f7f7] w-full md:w-2/3 mx-auto rounded-full p-2">
                        {{ contentData.goalWeightText }}
                    </p>

                </div>

                <!-- calorie gauge -->
                <div :style="{ backgroundColor: contentData.calorieBg }"
                    class="flex justify-center py-5 w-4/5 md:w-2/3 mx-auto rounded-lg mb-5">
                    <div class="relative w-[220px] h-[110px]">
                        <div v-html="contentData.svg"></div>
                        <div class="absolute inset-0 flex flex-col items-center justify-end pb-3">
                            <p v-if="!unhappyCase" class="text-2xl font-bold text-black">{{ targetCalories }}</p>
                            <p v-else class="text-2xl font-bold text-gray-500"> 0 </p>
                            <p class="text-gray-500 text-sm">{{ contentData.dailyGoalLabel }}</p>
                        </div>
                    </div>
                </div>

                <!-- health tip -->
                <p v-if="!unhappyCase"
                    class="text-center text-sm   bg-[#f4f4f4] w-full md:w-2/3 mx-auto rounded-full p-2 mt-2">
                    {{ contentData.healthTip }}
                </p>
                <p v-else
                    class="text-center text-sm font-medium bg-[#f4f4f4] w-full md:w-2/3 mx-auto rounded-full p-2 mt-2 text-red-500">
                    Invalid goal, unable to calculate calories
                </p>

                <!-- steps -->
                <div class="bg-gray-50 rounded-xl mt-2 p-4 w-full md:w-2/3 mx-auto" v-if="!unhappyCase">
                    <p class="font-semibold text-gray-800 mb-4">{{ contentData.stepsTitle }}</p>
                    <div v-for="(step, index) in contentData.steps" :key="index"
                        class="flex items-center gap-3 bg-white rounded-xl px-4 py-3 mb-3 shadow-sm">
                        <img :src="step.img" :alt="'step-' + index" class="w-10 h-10 object-contain" />
                        <span class="text-gray-700 font-medium">{{ step.text }}</span>
                    </div>
                </div>
            </div>



            <!-- next button -->
            <div class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow pb-4">
                <div class="flex items-center justify-center px-4 py-2">
                    <button type="button"
                        class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4"
                        @click="next">
                        {{ contentData.buttonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <PaywallModal :visible="showModal" :backgroundUrl="modalBackground" @close="showModal = false"
        @accepted="handleAccepted" @showSignInModal="showSignInModal = true" />

    <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />


</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { calculateCalories } from '@/utils/calculation'
import PaywallModal from './Modal/PaywallModal.vue'
import SignInModal from './Modal/SignInModal.vue'
const showMainContent = ref(false)
const showSignInModal = ref(false)

onMounted(() => {
    if (showIntro.value) {
        setTimeout(() => {
            showIntro.value = false;
            showMainContent.value = true;
        }, 3000);
    } else {
        showMainContent.value = true;
    }
});

const props = defineProps({
    userData: {
        type: Object,
        required: true
    }
})



const showIntro = ref(props.userData.showIntro ?? true)
const emit = defineEmits(['change-screen'])
const showModal = ref(false)

const modalBackground = ref('')

const next = () => {
    if (unhappyCase) emit('change-screen', 'GoalWeight', props.userData, false)
    else {
        //  gọi modal truyền vào background
        if (props.userData.goal === 'lose') modalBackground.value = '/images/onboarding/modal/bg_lose_modal.png'
        else if (props.userData.goal === 'gain') modalBackground.value = '/images/onboarding/modal/bg_gain_modal.png'
        else if (props.userData.goal === 'maintain') modalBackground.value = '/images/onboarding/modal/bg_maintain_modal.png'
        showModal.value = true;

        // gọi hàm lưu dữ liệu
        saveData();
    }
}

const handleAccepted = (priceId) => {
    console.log('Price ID:', priceId)
    // Thực hiện các hành động sau khi người dùng chấp nhận thanh toán
}

const handleLogin = () => {
    showSignInModal.value = false
}


const back = () => {
    // nếu maintain thì quay lại
    if (props.userData.goal === 'maintain') {
        emit('change-screen', 'HeightWeight', props.userData, false)
    } else {
        emit('change-screen', 'GoalWeight', props.userData, false)
    }
}



//// lấy dữ liệu calculateCalories
let { targetCalories, endDate, unhappyCase, durationDays } = calculateCalories();
console.log(targetCalories, endDate, unhappyCase, durationDays);

// Xử lý dữ liệu hiển thị
const contentData = computed(() => {
    const goal = props.userData.goal
    const current = props.userData.current_weight
    let target = props.userData.goal_weight
    let measure_type = props.userData.measure_type
    if (props.userData.goal === 'maintain'){
        target = current
        localStorage.setItem('goal_weight', current)
    }





    let svg = `<svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg"> <rect width="100%" height="100%" fill="#e6ebfd" /> <path d="M 20 100 A 90 90 0 0 1 200 100" stroke="#1a1a1a" stroke-width="12" fill="none" stroke-linecap="round" /> <circle cx="200" cy="100" r="8" fill="#1a1a1a" stroke="white" stroke-width="4" /> </svg>`;

    let goalWeightText = ''
        if( measure_type === 'imperial'){
            goalWeightText = `${current} lb → ${target} lb`
        }else{
            goalWeightText = `${current} KG → ${target} KG`
        }

    // Nếu calories < 0 → cảnh báo
    if (targetCalories < 0) {
        unhappyCase = true;


        svg = `<svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="100%" height="100%" fill="#f8f8f8" />

        <!-- Gauge path -->
        <path
            d="M 20 100 A 90 90 0 0 1 200 100"
            stroke="#d4d4d4"
            stroke-width="12"
            fill="none"
            stroke-linecap="round"
        />

        <!-- Start circle (at 20,100 approx) -->
        <circle cx="20" cy="100" r="8" fill="#d4d4d4" stroke="white" stroke-width="4" />
        </svg>`;



        return {
            backIcon: '/images/onboarding/back_arrow.png',
            handImage: '/images/onboarding/error.png',
            calorieBg: '#f9f7f7',
            introText: 'Can\'t calculate your daily calories. <br> Please update your main goal to continue.',
            encouragement: `You've got this! Goal day: ${endDate}`,
            svg: svg,
            dailyGoalLabel: 'Daily Goal Calories',
            healthTip: 'Adjust your plan to stay healthy!',
            stepsTitle: 'What you can do:',
            steps: '',
            buttonText: 'Go Back',
            goalWeightText: goalWeightText
        }
    }



    // Nội dung mặc định theo mục tiêu
    const shared = {
        backIcon: '/images/onboarding/back_arrow.png',
        handImage: '/images/onboarding/review_hand.png',
        calorieBg: '#e3e9fb',
        svg: svg,
        dailyGoalLabel: 'Daily Goal Calories',
        // healthTip: 'Great move for your health 💪',
        stepsTitle: 'Steps to hit your goal:',
        steps: [
            {
                img: '/images/onboarding/food.png',
                text: 'Track your food everyday'
            },
            {
                img: '/images/onboarding/SneakerMove.png',
                text: 'Don’t forget to track your activity'
            }
        ],
        buttonText: 'Next',
        goalWeightText: goalWeightText
    }

    if (goal === 'lose') {
        return {
            ...shared,
            healthTip: 'Great move for your health 💪',
            introText: 'Thanks for logging your goals. You\'re one step closer to your transformation.',
            encouragement: `You've got this! Goal day: ${endDate}`
        }
    } else if (goal === 'gain') {
        return {
            ...shared,
            healthTip: 'A wise move to gain healthy weight. 🍽️',
            introText: 'Thanks for logging your goals. You’re one step closer to your transformation.',
            encouragement: `Let's do this! Target date: ${endDate}`
        }
    } else {
        return {
            ...shared,
            healthTip: 'Smart step to stay balanced. ⚖️',
            introText: 'Thanks for logging your goals. You\'re one step closer to your transformation.',
            encouragement: 'Eat smart to maintain your weight.'
        }
    }
})







</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}



/* Dưới 768px */
@media (max-width: 768px) {
    .box-step {
        padding-bottom: 10rem !important;
    }
}

/* Từ 769px đến 1280px */
@media (min-width: 769px) and (max-width: 1280px) {

}

/* Từ 1281px đến 1600px */
@media (min-width: 1281px) and (max-width: 1600px) {

}

/* Trên 1600px */
@media (min-width: 1601px) {

}
</style>

<template>
    <div class="relative w-full md:w-1/3 mx-auto overflow-y-auto  content-screen" style="min-height: calc(100vh - 100px);">
        <!-- Intro overlay -->
        <transition name="fade">
            <div v-if="showIntro"
                class="absolute top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center text-center px-5 ">
                <div class="mb-16">
                    <img src="/images/onboarding/gif/goal_welcome.gif" alt="Intro" class="w-1/3 mx-auto mb-4" />
                    <p class="text-lg">
                        Hi there! We're <strong>Heka</strong>, and we're <br> here to take care of your health.
                    </p>
                </div>
            </div>
        </transition>

        <!-- content -->
        <div>
            <div class="relative flex items-start">
                <div
                    class="absolute box-message left-[20%] top-2  max-w-md py-2 px-3 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-2">

                    <div class="text-sm">
                        <p>Tell us your goal so we can <span class="font-bold">better support</span> you!</p>
                    </div>
                </div>

                <div class="ml-1 mt-10 sm:ml-10 main-goal-gif">
                    <!-- <img src="/images/onboarding/gif/goal_guide.gif" alt="Main Goal" class="w-1/4" /> -->
                    <img src="/images/onboarding/gif/goal_guide.gif" alt="Main Goal" class="w-1/3  " />

                </div>
            </div>

            <hr class="my-2" />

            <div class="flex flex-col gap-2 px-4 max-h-[47vh] xl:max-h-[52vh] overflow-y-auto pb-8 xl:pb-6 main-goal-option">

                <!-- <div class="flex flex-col gap-2 px-4 max-h-[40vh] overflow-y-auto pb-16 lg:pb-6"> -->

                <div v-for="item in goals" :key="item.title" @click="selectGoal(item.value)" :class="[
                    'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition border w-full md:w-4/5 mx-auto',
                    item.value === goal ? 'bg-black text-white border-black' : 'bg-gray-100 hover:bg-gray-200 border-transparent'
                ]">
                    <img :src="`/images/onboarding/icon/${item.icon}.png`" alt="Goal Icon" class="w-8 shrink-0" />
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm sm:text-base truncate">{{ item.title }}</p>
                        <p class="text-xs sm:text-sm   truncate">{{ item.subtitle }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-6 md:pb-6 px-4 " v-show="!showIntro">
        <div class="flex items-center justify-center">
            <button @click="next"
                class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4 transition duration-200 btn-next"
                :disabled="!goal" :class="{ 'opacity-50 cursor-not-allowed': !goal }">
                Next
            </button>
        </div>
    </div>


</template>


<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    userData: {
        type: Object,
        default: () => ({
            goal: null,
            current_weight: null,
            current_height: null,
            measure_type: null
        })
    }
})

const showIntro = ref(props.userData.showIntro ?? true)

const goal = ref(props.userData.goal ?? '')

const goals = [
    {
        title: 'Lose Weight',
        subtitle: 'Reach your weight loss goals',
        icon: 'icon_chart_down',
        value: 'lose'
    },
    {
        title: 'Maintain Weight',
        subtitle: 'Stay right where you feel best.',
        icon: 'icon_arrow',
        value: 'maintain'
    },
    {
        title: 'Gain Weight',
        subtitle: 'Build up to your ideal weight.',
        icon: 'icon_chart_up',
        value: 'gain'
    },
    {
        title: 'Healthy Eating',
        subtitle: 'Eat better, feel better.',
        icon: 'icon_avocado',
        value: 'healthy'
    }
]

const selectGoal = (value) => {
    goal.value = value
}

const emit = defineEmits(['change-screen'])

const next = () => {
    if (goal.value) {
        localStorage.setItem('goal', goal.value)
        props.userData.goal = goal.value
        emit('change-screen', 'GenderAge', props.userData)
    }
}

onMounted(() => {
    const savedGoal = localStorage.getItem('goal')
    if (savedGoal) {
        goal.value = savedGoal
    }

    setTimeout(() => {
        showIntro.value = false
    }, 3000)
})


const back = () => {
    emit('change-screen', 'Activity', props.userData)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


/* Dưới 768px */
@media (max-width: 768px) {
    .content-screen {
        min-height: 75vh!important;
    }

    .btn-next{
        font-size: 1.2rem;
        padding: 1rem 2rem;
    }
}

/* Từ 769px đến 1280px */
@media (min-width: 769px) and (max-width: 1280px) {
    .main-goal-option{
        padding-bottom: 4rem;
    }



    .main-goal-gif img {
        width: 8rem!important;
    }
}

/* Từ 1281px đến 1600px */
@media (min-width: 1281px) and (max-width: 1600px) {
    .main-goal-gif img {
        width: 8rem!important;
    }

    .main-goal-option{
        padding-bottom: 1rem;
    }

    .box-message{
        top: 1rem;
    }
}

/* Trên 1600px */
@media (min-width: 1601px) {
    .main-goal-gif{
         margin-top: 0;
    }

    .main-goal-gif img {
        width: 10rem;
    }

    .main-goal-option{
        padding-bottom: 2rem;
    }
}

</style>

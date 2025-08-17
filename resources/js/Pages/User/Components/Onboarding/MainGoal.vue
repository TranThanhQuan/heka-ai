<template>
    <div class="relative w-full md:w-1/3 mx-auto overflow-y-auto" style="min-height: calc(100vh - 100px);">
        <!-- Intro overlay -->
        <transition name="fade">
            <div v-if="showIntro"
                class="absolute top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center text-center px-5 ">
                <div class="mb-16">
                    <img src="/images/onboarding/gif/goal_welcome.gif" alt="Intro" class="w-1/3 mx-auto mb-4" />
                    <p class="text-lg font-semibold">
                        Hi there! We're Heka, and we're here to take care of your health.
                    </p>
                </div>
            </div>
        </transition>

        <!-- content -->
        <div>
            <div class="relative flex items-start">
                <div
                    class="absolute right-0 top-2 w-9/12 md-w-full max-w-md py-2 px-3 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-2">

                    <div>
                        Tell us your goal so we can <span class="font-bold">better support</span> you!
                    </div>
                </div>

                <div class="ml-1 mt-10 sm:ml-10">
                    <img src="/images/onboarding/gif/goal_guide.gif" alt="Main Goal" class="w-1/3" />
                </div>
            </div>

            <hr class="my-2" />

            <div class="flex flex-col gap-2 px-4 max-h-[52vh] overflow-y-auto pb-6">
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

    <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-6 px-4" v-show="!showIntro">
        <div class="flex items-center justify-center">
            <button @click="next"
                class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4 transition duration-200"
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
    }, 500)
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
</style>

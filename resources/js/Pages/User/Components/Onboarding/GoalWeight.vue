<template>
    <div class="w-full md:w-1/3 mx-auto overflow-y-auto pb-28 px-4">
        <!-- Back & Progress -->
        <div class="flex items-center mb-2 h-8">
            <button @click="back" class="mr-2 bg-gray-200 rounded-full p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
            </div>
        </div>
        <div class="relative flex items-start">
            <div class="absolute right-0 top-2 w-3/5 md:w-3/5 max-w-md py-2 px-4 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-1 md:mr-10">

                <div v-if="warningMessage" v-html="warningMessage"></div>
                <div v-else>
                    What's your <strong>goal?</strong> Let me help customize for you.
                </div>
            </div>

            <div class="ml-0 sm:ml-5 mt-3">
                <img src="/images/onboarding/gif/info_guide.gif" alt="Activity Guide" class="w-32 md:w-1/3">
            </div>
        </div>

        <hr class="my-2">

        <div class="flex flex-col mt-6 px-4">
            <label class="text-gray-900 font-medium">Weight</label>
            <div class="w-1/2 mx-auto">
                <VueScrollPicker :options="weightOptions" v-model="selectedWeight">
                    <template #default="{ option, selected }">
                        <div :class="[
                            selected ? 'text-2xl font-bold' : 'text-2xl',
                            selected && isInvalidWeight ? 'text-red-500' : 'text-black'
                        ]">
                            {{ option.name }} {{ isImperial ? 'Ib' : 'kg' }}
                        </div>
                    </template>
                </VueScrollPicker>
            </div>
        </div>

        <div class="flex flex-col gap-3 px-4">
            <!-- Label -->
            <label class="text-gray-900 font-medium">Duration</label>

            <!-- Input Group -->
            <div
                class="flex items-center justify-center bg-gray-50 border border-gray-300 rounded-full px-4 py-0 space-x-4 w-4/5 mx-auto">

                <!-- Minus Button -->
                <button @click="decrement" class="text-xl text-gray-500 hover:text-black">
                    &minus;
                </button>

                <!-- Number -->
                <div class="text-lg font-semibold w-16 text-center border-b border-gray-300">
                    {{ duration }}
                </div>

                <!-- Plus Button -->
                <button @click="increment" class="text-xl text-gray-500 hover:text-black">
                    &#43;
                </button>

                <!-- Divider -->
                <div class="w-px h-6 bg-gray-300 mx-2"></div>

                <!-- Dropdown -->
                <select v-model="unit"
                    class="bg-transparent text-gray-700 focus:outline-none cursor-pointer border-none  focus:border-none">
                    <option value="month" selected>Month</option>
                </select>
            </div>
        </div>
    </div>
    <!-- Button fixed at bottom -->
    <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-2 px-4">
        <div class="flex items-center justify-center px-4 py-2">
            <button @click="next"
        :disabled="isInvalidWeight"
        class="w-full md:w-1/4 text-white font-medium rounded-full text-sm px-5 py-2.5 mb-2 transition focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed bg-black hover:bg-gray-900">
    Next
</button>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    userData: Object
})

const emit = defineEmits(['change-screen'])

// --- State ---
const isImperial = ref(props.userData.measure_type === 'imperial')
const selectedWeight = ref(props.userData.current_weight ?? (isImperial.value ? 130 : 50))
const weightOptions = ref([])
const warningMessage = ref('')
const isInvalidWeight = ref(false)
const duration = ref(1)
const unit = ref('month')

// --- Khởi tạo danh sách cân nặng ---
weightOptions.value = Array.from({ length: isImperial.value ? 550 : 250 }, (_, i) => ({
    name: (i + 1).toString(),
    value: i + 1
}))

// --- Gán goal_weight mặc định ---
const validateGoalWeight = () => {
    const { measure_type, current_weight, goal } = props.userData
    if (!measure_type || !current_weight || !goal) return

    let goalWeight = current_weight
    if (measure_type === 'imperial') {
        goalWeight = goal === 'lose'
            ? Math.max(1, current_weight - 8)
            : Math.min(current_weight + 8, 700)
    } else {
        goalWeight = goal === 'lose'
            ? Math.max(1, current_weight - 4)
            : Math.min(current_weight + 4, 360)
    }

    selectedWeight.value = goalWeight
    props.userData.goal_weight = goalWeight
}
validateGoalWeight()

// --- Theo dõi thay đổi ---
watch([selectedWeight, duration, unit], () => {
    const { measure_type, current_weight, goal } = props.userData
    const weight = Number(selectedWeight.value)

    isInvalidWeight.value = false
    warningMessage.value = ''

    if (!measure_type || !goal || !current_weight || !duration.value) return

    const isLosing = goal === 'lose'
    const isGaining = goal === 'gain'

    // --- Validate phạm vi ---
    if (measure_type === 'imperial') {
        if ((isLosing && weight >= current_weight) || (isGaining && weight <= current_weight)) {
            isInvalidWeight.value = true
            warningMessage.value = `You want to <span class="font-bold ">${goal}</span> weight, so pick a <span class="font-bold">${isLosing ? 'lower' : 'higher'}</span> weight.`
        } else if (weight < 1 || weight > 700) {
            isInvalidWeight.value = true
            warningMessage.value = ' Weight must be 1–700 lbs.'
        }
    } else {
        if ((isLosing && weight >= current_weight) || (isGaining && weight <= current_weight)) {
            isInvalidWeight.value = true
            warningMessage.value = `You want to <span class="font-bold ">${goal}</span> weight, so pick a <span class="font-bold">${isLosing ? 'lower' : 'higher'}</span> weight.`
        } else if (weight < 1 || weight > 360) {
            isInvalidWeight.value = true
            warningMessage.value = ' Weight must be 1–360 kg.'
        }
    }


    // --- Tính tốc độ thay đổi cân nặng ---
    if (!isInvalidWeight.value) {
        let diff = Math.abs(weight - current_weight)
        if (measure_type === 'imperial') diff *= 0.453592

        const totalDays = unit.value === 'month' ? duration.value * 30 : duration.value
        const weeklyChange = (diff / totalDays) * 7

        const verb = goal === 'gain' ? 'gaining' : 'losing'
        const isImperialUnit = measure_type === 'imperial'
        const displayUnit = isImperialUnit ? 'lb' : 'kg'
        const rawWeight = isImperialUnit ? (diff / 0.453592) : diff;
        const formattedWeight = Number.isInteger(rawWeight)
            ? rawWeight.toString()
            : rawWeight.toFixed(1);


        const durationText = unit.value === 'month'
            ? `${duration.value} month${duration.value > 1 ? 's' : ''}`
            : `${duration.value} day${duration.value > 1 ? 's' : ''}`

        if (weeklyChange > 1.5) {
            warningMessage.value = `Hey, <span class="font-bold text-red-600">${verb}</span> <span class="font-bold text-red-600">${formattedWeight}${displayUnit}</span> in <span class="font-bold text-red-600">${durationText}</span> is pretty fast.`

            isInvalidWeight.value = true

        } else {
            const capitalVerb = verb.charAt(0).toUpperCase() + verb.slice(1);
            warningMessage.value = `Awesome progress!<span class="font-bold"> ${capitalVerb} ${formattedWeight}${displayUnit}</span> in <span class="font-bold">${durationText}</span> is safe and healthy.`

        }


        console.log('✅ Weekly change (kg):', weeklyChange.toFixed(2))
    }

    // --- Đổi màu text ---
    setTimeout(() => {
        const selectedEl = document.querySelector('.vue-scroll-picker-item[aria-selected="true"]')
        if (selectedEl) {
            selectedEl.classList.toggle('invalid-weight', isInvalidWeight.value)
        }
    }, 10)
})

// --- Navigation ---
const increment = () => duration.value++
const decrement = () => {
    if (duration.value > 1) duration.value--
}

const next = () => {
    localStorage.setItem('goal_weight', selectedWeight.value)
    localStorage.setItem('duration', duration.value)
    localStorage.setItem('unit', unit.value)

    props.userData.goal_weight = selectedWeight.value
    props.userData.duration = duration.value
    props.userData.unit = unit.value

    emit('change-screen', 'Review', props.userData, true)
}

const back = () => {
    emit('change-screen', 'HeightWeight', props.userData, false)
}
</script>


<style scoped>
.invalid-weight {
    color: red !important;
}
</style>

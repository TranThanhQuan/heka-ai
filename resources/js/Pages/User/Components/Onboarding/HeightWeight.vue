<template>
    <div class="relative w-full md:w-1/3 mx-auto overflow-y-auto pb-28 px-4 content-screen" style="min-height: calc(100vh - 100px);">
        <!-- ✅ Intro Overlay -->
        <transition name="fade">
            <div v-if="showIntro"
                class="absolute top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center text-center px-5">
                <div>
                    <img src="/images/onboarding/gif/info_guide.gif" alt="Intro" class="w-1/3 mx-auto mb-4" />
                    <p class="text-lg">
                        Got it! Now let’s <strong>set up a goal </strong> <br> that works best for you.
                    </p>
                </div>
            </div>
        </transition>

        <div v-if="showMainContent" class="relative z-10">
            <!-- Back & Progress -->
            <div class="flex items-center mb-4 h-8">
                <button @click="back" class="mr-2 bg-gray-200 rounded-full p-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 60%"></div>
                </div>
            </div>

            <!-- content -->

            <div class="relative flex items-start">
                <div
                    class="absolute right-0 top-0 w-3/5 md:w-3/5 max-w-md py-2 px-4 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-1 md:mr-10">
                    <div class="text-sm">
                        <p>What's your <span class="font-bold">height, weight?</span> Let's do this!</p>
                    </div>
                </div>

                <div class="ml-0 sm:ml-5 mt-1 height-weight-gif">
                    <img src="/images/onboarding/gif/info_guide.gif" alt="Height Weight" class="w-32 md:w-2/7" />
                </div>
            </div>

            <hr class="my-2" />

            <!-- Toggle Metric/Imperial -->
            <div class="flex justify-end mt-5 mr-5 toggle-imperial">
                <label class="inline-flex items-center mb-5 cursor-pointer ">
                    <span class="mr-3 text-sm font-medium text-gray-900">
                        {{ isImperial ? 'Imperial' : 'Metric' }}
                    </span>

                    <input type="checkbox" v-model="isImperial" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all
                peer-checked:bg-blue-600">
                    </div>
                </label>
            </div>

            <!-- Height and Weight -->
            <div class="flex gap-1">
                <div class="w-1/3 mx-auto">
                    <label class="text-gray-900 font-medium">Height</label>
                    <!-- <VueScrollPicker :options="heightOptions" v-model="selectedHeight">
                        <template #default="{ option, selected }">
                            <div :class="selected ? 'text-black font-bold text-2xl' : 'text-2xl'">
                                {{ option.name }} {{ isImperial ? 'in' : 'cm' }}
                            </div>
                        </template>
                    </VueScrollPicker> -->
                    <VueScrollPicker :options="heightOptions" v-model="selectedHeight">
                        <template #default="{ option, selected }">
                            <div :class="selected ? 'text-black font-bold text-2xl' : 'text-2xl'">
                            {{ isImperial ? formatHeight(option.value) : option.name + ' cm' }}
                            </div>
                        </template>
                    </VueScrollPicker>

                </div>

                <div class="w-1/3 mx-auto">
                    <label class="text-gray-900 font-medium">Weight</label>
                    <VueScrollPicker :options="weightOptions" v-model="selectedWeight">
                        <template #default="{ option, selected }">
                            <div :class="selected ? 'text-black font-bold text-2xl' : 'text-2xl'">
                                {{ option.name }} {{ isImperial ? 'lb' : 'kg' }}
                            </div>
                        </template>
                    </VueScrollPicker>

                </div>
            </div>

            <!-- Button fixed at bottom -->
            <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-4 px-4">
                <div class="flex items-center justify-center px-4 py-2">
                    <button @click="next" class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-1/2 md:w-1/4 transition duration-200" > Next </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    userData: Object
})


// lấy từ localStorage nếu không có thì metric
const isImperial = ref(localStorage.getItem('measure_type') === 'imperial')
const selectedHeight = ref(props.userData.current_height ?? 150)
const selectedWeight = ref(props.userData.current_weight ?? 50)

const heightOptions = ref([])
const weightOptions = ref([])

const showIntro = ref(props.userData.showIntro ?? true)

const showMainContent = ref(false)

onMounted(() => {
    if (showIntro.value) {
        setTimeout(() => {
            showIntro.value = false
            setTimeout(() => {
                showMainContent.value = true
            }, 300)
        }, 500)
    } else {

        showMainContent.value = true
    }
})

const formatHeight = (inches) => {
  const feet = Math.floor(inches / 12);
  const inch = inches % 12;
  return `${feet}'${inch}''`;
};



// Mặc định cho metric
const defaultMetricHeight = 167;   // cm
const defaultMetricWeight = 57;    // kg

// Mặc định cho imperial
const defaultImperialHeight = 5 * 12 + 6; // 66 in
const defaultImperialWeight = 120;       // lbs

const updateOptions = (isSwitch = false) => {
  if (isImperial.value) {
    // Chiều cao: 12in (1ft) → 107in (8ft11in)
    heightOptions.value = Array.from({ length: 107 - 12 + 1 }, (_, i) => {
      const totalInches = i + 12;
      return {
        name: totalInches.toString(),
        value: totalInches
      };
    });

    // Cân nặng: 50 → 700 lbs
    weightOptions.value = Array.from({ length: 700 - 50 + 1 }, (_, i) => ({
      name: (i + 50).toString(),
      value: i + 50
    }));

    // Gán theo switch hoặc lấy từ localStorage

    selectedHeight.value = isSwitch
      ? defaultImperialHeight
      : parseInt(localStorage.getItem('current_height')) || defaultImperialHeight;

    selectedWeight.value = isSwitch
      ? defaultImperialWeight
      : parseInt(localStorage.getItem('current_weight')) || defaultImperialWeight;

    console.log(selectedHeight.value, selectedWeight.value);

  } else {
    // Chiều cao: 60 → 243 cm
    heightOptions.value = Array.from({ length: 243 - 60 + 1 }, (_, i) => ({
      name: (i + 60).toString(),
      value: i + 60
    }));

    // Cân nặng: 20 → 360 kg
    weightOptions.value = Array.from({ length: 360 - 20 + 1 }, (_, i) => ({
      name: (i + 20).toString(),
      value: i + 20
    }));

    selectedHeight.value = isSwitch
      ? defaultMetricHeight
      : parseInt(localStorage.getItem('current_height')) || defaultMetricHeight;

    selectedWeight.value = isSwitch
      ? defaultMetricWeight
      : parseInt(localStorage.getItem('current_weight')) || defaultMetricWeight;
  }
};





const initFromLocalStorage = () => {
    const type = localStorage.getItem('measure_type')
    const height = localStorage.getItem('current_height')
    const weight = localStorage.getItem('current_weight')


    isImperial.value = type === 'imperial'
    selectedHeight.value = height ? parseInt(height) : (isImperial.value ? 60 : 150)
    selectedWeight.value = weight ? parseInt(weight) : (isImperial.value ? 130 : 50)

    updateOptions(false)

}



watch(isImperial, () => {


    updateOptions(true)
})




initFromLocalStorage()

const emit = defineEmits(['change-screen'])

const next = () => {
    const measure_type = isImperial.value ? 'imperial' : 'metric'

    localStorage.setItem('measure_type', measure_type)
    localStorage.setItem('current_height', selectedHeight.value)
    localStorage.setItem('current_weight', selectedWeight.value)

    props.userData.measure_type = measure_type
    props.userData.current_height = selectedHeight.value
    props.userData.current_weight = selectedWeight.value

    if (props.userData.goal === 'lose' || props.userData.goal === 'gain') {
        emit('change-screen', 'GoalWeight', props.userData)
    } else if (props.userData.goal === 'maintain') {
        localStorage.setItem('goal_weight', selectedWeight.value)
        localStorage.setItem('duration', 1)
        localStorage.setItem('unit', 'month')
        emit('change-screen', 'Review', props.userData)
    } else {
        emit('change-screen', 'MainGoal', props.userData)
    }
}

const back = () => {
    emit('change-screen', 'Activity', props.userData, false)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .content-screen {
        min-height: 75vh!important;
    }
}

@media (min-width: 1600px){
    .height-weight-gif img{
        width: 9rem;
    }
}


@media (max-width: 1280px) {
    .toggle-imperial {
        margin-top: 0;
    }

    .toggle-imperial label{
        margin-bottom: 0;
    }
}


@media (max-width: 768px) {
    .toggle-imperial {
        margin-top: 1rem;
    }

    .toggle-imperial label{
        margin-bottom: 1rem;
    }
}



</style>

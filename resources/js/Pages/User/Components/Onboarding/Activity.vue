<template>
    <div class="w-full md:w-1/3 mx-auto overflow-y-auto pb-28 px-4">
      <!-- Back & Progress -->
      <div class="flex items-center mb-4 h-8">
        <button @click="back" class="mr-2 bg-gray-200 rounded-full p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: 40%"></div>
        </div>
      </div>

      <!-- Tooltip -->
      <div class="relative flex items-start">
        <div class="absolute left-[30%] top-0  max-w-md py-2 px-4 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-1 md:mr-10 box-message">
          <div class="text-sm">
            <p>How often do you <span class="font-bold">exercise</span> each week?</p>
          </div>
        </div>

        <div class="ml-0 sm:ml-5 mt-1 activity-gif">
          <!-- <img src="/images/onboarding/gif/activity_guide.gif" alt="Activity" class="w-32 md:w-1/3" /> -->
          <img src="/images/onboarding/gif/activity_guide.gif" alt="Activity" class="w-1/3 " />

        </div>
      </div>

      <hr class="my-2" />

      <!-- Activity options -->
      <div class="flex flex-col gap-3 px-2 max-h-[47vh] xl:max-h-[52vh] overflow-y-auto pb-16 activity-options">
        <div
          v-for="item in activities"
          :key="item.value"
          @click="selectActivity(item.value); next()"
          :class="[
            'flex items-center gap-2 p-3 sm:p-2 w-full sm:w-4/5 mx-auto rounded-lg cursor-pointer transition border',
            item.value === activity
              ? 'bg-black text-white border-black'
              : 'bg-gray-100 hover:bg-gray-200 border-transparent'
          ]"
        >
          <img :src="`/images/onboarding/icon/${item.icon}.png`" alt="Main Goal" class="w-8" />
          <div>
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-sm">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Button fixed at bottom -->
    <!-- <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-8 md:pb-6 px-4">
      <div class="flex items-center justify-center">
        <button
          @click="next"
          class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-3/4 md:w-1/4 transition btn-next"
          :disabled="!activity"
          :class="{ 'opacity-50 cursor-not-allowed': !activity }"
        >
          Next
        </button>
      </div>
    </div> -->
  </template>


<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    userData: Object
})

const activity = ref('');


const activities = [
    {
        title: 'No Plan Yet',
        subtitle: 'No workout',
        icon: 'icon_moon',
        value: '1.2'
    },
    {
        title: 'Light & Easy',
        subtitle: '1-2 days per week',
        icon: 'icon_leaf',
        value: '1.3'
    },
    {
        title: 'Regular Training',
        subtitle: '3-5 days per week',
        icon: 'icon_heart',
        value: '1.5'
    },
    {
        title: 'Intense Program',
        subtitle: '6+ days per week',
        icon: 'icon_lightning',
        value: '1.7'
    }
]

const selectActivity = (value) => {
    activity.value = value
}

onMounted(() => {
    const savedActivity = localStorage.getItem('activity')
    if (savedActivity) {
        activity.value = savedActivity
    }
})

const emit = defineEmits(['change-screen'])

const next = () => {
    if (activity.value) {
        localStorage.setItem('activity', activity.value)
        props.userData.activity = activity.value
        // Gửi cả activity lên Index để xử lý điều hướng
        emit('change-screen', 'HeightWeight', props.userData, true)
    }
}

const back = () => {
    emit('change-screen', 'GenderAge', props.userData)
}
</script>
<style scoped>

/* Dưới 768px */
@media (max-width: 768px) {
    .activity-options{
        padding-bottom: 0;
    }

    .btn-next{
        font-size: 1.2rem;
        padding: 1rem 2rem;
    }

}

/* Từ 769px đến 1280px */
@media (min-width: 769px) and (max-width: 1280px) {
    .activity-options {
        padding-bottom: 1rem!important;
    }
}

/* Từ 1281px đến 1600px */
@media (min-width: 1281px) and (max-width: 1600px) {
    .activity-gif img{
       width: 9rem;
    }


}

/* Trên 1600px */
@media (min-width: 1601px) {
    .activity-gif img{
       width: 9rem;
    }

    .box-message{
        left: 20%;
    }
}


</style>

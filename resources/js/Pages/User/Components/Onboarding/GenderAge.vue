<template>
    <div class="w-full md:w-1/3 mx-auto overflow-y-auto pb-28 px-4 content-screen">
        <!-- Back & Progress -->
        <div class="flex items-center mb-4 h-8">
            <button @click="back" class="mr-2 bg-gray-200 rounded-full p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 20%"></div>
            </div>
        </div>

        <!-- Tooltip  -->
        <div class="relative flex items-start">
            <div class="absolute right-0 top-0 w-3/5 sm:w-11/12 md:w-3/5 max-w-md py-2 px-4 text-left text-lg shadow-lg rounded-2xl bg-white flex items-center mr-1  box-message">


                <div>
                    Let us know your <span class="font-bold">gender and your birthday</span>
                </div>
            </div>

            <div class="ml-0 sm:ml-5 mt-1">
                <img src="/images/onboarding/gif/gender_guide.gif" alt="Main Goal" class="w-32 md:w-1/3" />
            </div>
        </div>

        <hr class="my-2" />
        <div class="gender-age-content max-h-[47vh] xl:max-h-[52vh] overflow-y-auto pb-16">

            <!-- Select Gender -->
            <div class="flex justify-center gap-4 flex-wrap">
                <div @click="selectGender('male')" class="cursor-pointer">
                    <img
                    :src="gender === 'male' ? '/images/onboarding/male_active.png' : '/images/onboarding/male.png'"
                    alt="Male"
                    class="gender-img"
                    />
                </div>
                <div @click="selectGender('female')" class="cursor-pointer">
                    <img
                    :src="gender === 'female' ? '/images/onboarding/female_active.png' : '/images/onboarding/female.png'"
                    alt="Female"
                    class="gender-img"
                    />
                </div>
            </div>

            <!-- Select Birthday -->
            <div class="w-2/3 sm:w-2/3 md:w-1/2 mx-auto mt-6 select-birthday">
                <VueScrollPicker :options="yearOptions" v-model="selectedYear">
                    <template #default="{ option, selected }">
                        <div :class="selected ? 'text-black font-bold text-2xl' : 'text-2xl text-gray-500'">
                            {{ option.name }}
                        </div>
                    </template>
                </VueScrollPicker>
            </div>
        </div>
    </div>

    <!-- Button fixed at bottom -->
    <div class="fixed bottom-0 left-0 right-0 z-40 shadow bg-white pb-8 md:pb-6 px-4">
        <div class="flex items-center justify-center">
            <button type="button"
                class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full sm:w-2/3 md:w-1/4 transition duration-200"
                :disabled="!gender" :class="{ 'opacity-50 cursor-not-allowed': !gender }" @click="next">
                Next
            </button>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    userData: Object
});


const gender = ref(localStorage.getItem('gender') ?? 'male')
const selectedYear = ref(localStorage.getItem('year_of_birth') ?? 2000)

const yearOptions = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => {
    const year = 1900 + i;
    return { name: year.toString(), value: year };
});

const emit = defineEmits(['change-screen'])

const selectGender = (value) => {
    gender.value = value
}

const back = () => {
    emit('change-screen', 'MainGoal', props.userData, false)
}

const next = () => {

    localStorage.setItem('gender', gender.value)
    localStorage.setItem('year_of_birth', selectedYear.value)
    // truyền giá trị   cho userData
    props.userData.gender = gender.value
    props.userData.year_of_birth = selectedYear.value

    emit('change-screen', 'Activity', props.userData)

}

onMounted(() => {
    gender.value = localStorage.getItem('gender')
})
</script>


<style scoped>
  .gender-img {
    width: 8rem;
  }


    /* Dưới 768px */
    @media (max-width: 768px) {
        @media (max-width: 768px) {
            .content-screen {
                min-height: 75vh!important;
            }
        }
    }

    /* Từ 769px đến 1280px */
    @media (min-width: 769px) and (max-width: 1280px) {
        .gender-img {
            width: 6.25rem;
        }
    }

    /* Từ 1281px đến 1600px */
    @media (min-width: 1281px) and (max-width: 1600px) {
        .gender-img {
            width: 8rem;
        }
        .select-birthday {
            margin-top: 0;
        }

        .gender-age-content{
            padding-bottom: 5rem;
        }

        .box-message{
            margin-right: 10px!important;
        }
    }

    /* Trên 1600px */
    @media (min-width: 1601px) {
        .gender-img {
        width: 10rem;
        }

        .select-birthday{
            margin-top: 2rem;
        }
    }

</style>

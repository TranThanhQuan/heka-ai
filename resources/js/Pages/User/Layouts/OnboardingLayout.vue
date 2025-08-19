<template>

    <Head title="Heka AI with Meta">
        <link rel="icon" type="image/x-icon" href="/images/favicon.png">
    </Head>

    <div class="max-h-[100vh] flex flex-col overflow-hidden border-2 border-yellow-500">
        <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow opacity-50">
            <Header></Header>
        </div>

        <div class="flex-1 flex items-start justify-center mt-16 pt-5 border-2 border-red-500 max-h-[100vh] overflow-hidden ob-layout">
            <slot>  </slot>
        </div>
    </div>


</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { initFlowbite } from 'flowbite'
import { Head } from '@inertiajs/vue3'
import Header from '../Components/Onboarding/HeaderOnboarding.vue'

onMounted(() => {
    initFlowbite()
})


</script>


<style scoped>


@media (max-width: 768px) {
    .ob-layout {
        max-height: calc(95vh - 100px);
    }
}
</style>

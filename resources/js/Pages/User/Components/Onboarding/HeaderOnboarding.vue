<template>


<nav class="border-gray-200 bg-gray-50">
  <div class="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
         <ApplicationLogo class="h-10 w-auto fill-current text-gray-800 dark:text-gray-200" />
    </a>
    <a href="javascript:void(0)" class="  w-1/5" @click="showModal = true">
        <img src="/images/onboarding/Animation-Premium.gif" alt="">
    </a>

  </div>
</nav>

<!-- modal -->
<PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg-modal.jpg" @close="showModal = false" @accepted="handleAccepted" />
</template>

<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import PaywallModal from './Modal/PaywallModal.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Default Title'
    }
});

const showModal = ref(false)

const handleAccepted = (priceId) => {
    console.log('Price ID:', priceId)
}

</script>

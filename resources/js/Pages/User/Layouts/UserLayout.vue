<template>
    <div>
        <!-- header -->
        <Header></Header>
        <!-- end header -->
        <!-- main contain -->
            <!-- product list -->
            <slot></slot>
            <!-- end product list -->
        <!-- end main contain -->

        <!-- footer -->
        <Footer></Footer>
        <!-- end footer -->
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

import Header from './Header.vue';
import Footer from './Footer.vue';


// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})



</script>

<style lang="scss" scoped></style>

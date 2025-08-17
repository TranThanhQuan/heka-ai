<template>
    <UserLayout>
        <!-- hero section -->
        <Hero></Hero>
        <!-- end hero section -->
        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Latest product list</h2>

                <!-- product list component -->
                <Products :products="products"></Products>


                <!-- end product list -->

                <div class="flex justify-center mt-5">
                    <Link :href="route('products.index')"
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    More >>></Link>


                </div>

            </div>
        </div>

    </UserLayout>

</template>

<script setup>
import UserLayout from './Layouts/UserLayout.vue';
// import { defineProps } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import Hero from './Layouts/Hero.vue';
import Products from './Components/Product.vue';


// product list
const props = defineProps({
    products: Array
});




</script>

<style lang="scss" scoped></style>

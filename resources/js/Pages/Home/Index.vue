<template>

    <Head title="Home" />

    <header class="sticky top-0 z-50 bg-white shadow-sm px-4 md:px-16">
        <nav class="container mx-auto flex items-center justify-between py-3">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="/">
                    <img src="/images/logo.svg" alt="HekaAI Logo" class="w-[130px]" />
                </a>
            </div>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex items-center space-x-6 text-gray-700">
                <li>
                    <a href="/" class="hover:text-black">Home</a>
                </li>
                <li>
                    <a href="#features" class="hover:text-black">Features</a>
                </li>
                <li>
                    <a href="#price" class="hover:text-black">Premium Access</a>
                </li>
            </ul>


            <!-- App Store + Sign in (desktop) -->
            <div class="hidden md:flex items-center space-x-3">
                <a :href="downloadUrl">
                    <img src="/images/home/chplay_icon.png" alt="Google Play" class="h-9" />
                </a>
                <a :href="downloadUrl">
                    <img src="/images/home/appstore_icon.png" alt="App Store" class="h-9" />
                </a>

                <!-- Nếu chưa login -->
                <a v-if="!isLoggedIn" id="loginBtn" @click="showSignInModal = true"
                    class="text-gray-700 hover:text-black font-medium cursor-pointer">
                    Sign In
                </a>

                <!-- Nếu đã login -->
                <div v-else class="relative">
                    <img @click="showDropdown = !showDropdown" src="/images/home/user_icon.png"
                        class="h-9 cursor-pointer rounded-full" />

                    <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                        <ul class="py-2">
                            <li v-if="hasSubscription" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <a id="subscriptionManagement" :href="subscriptionUrl">
                                    Subscription Management
                                </a>
                            </li>
                            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">
                                Sign Out
                            </li>
                        </ul>
                    </div>
                </div>
            </div>






            <!-- Mobile Menu Button -->
            <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
                <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>

        <!-- Mobile Dropdown Menu -->
        <!-- <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t border-gray-200">
            <ul class="flex flex-col items-start space-y-4 py-4 px-6 text-gray-700">
                <li><a href="#" class="hover:text-black">Home</a></li>
                <li><a href="#features" class="hover:text-black">Features</a></li>
                <li><a href="#price" class="hover:text-black">Premium Access</a></li>
                <li>
                    <a href="javascript:void(0)" @click="showSignInModal = true"
                        class="text-gray-700 hover:text-black font-medium">
                        <img src="/images/home/user_icon.png" alt="User" class="h-9" />
                    </a>
                </li>
                <li class="flex space-x-3">
                    <a href="#">
                        <img src="/images/home/chplay_icon.png" alt="Google Play" class="h-9" />
                    </a>
                    <a href="#">
                        <img src="/images/home/appstore_icon.png" alt="App Store" class="h-9" />
                    </a>
                </li>
            </ul>
        </div> -->




        <!-- Mobile Dropdown Menu -->
        <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t border-gray-200">
            <ul class="flex flex-col items-start space-y-4 py-4 px-6 text-gray-700">
                <li><a href="#" class="hover:text-black">Home</a></li>
                <li><a href="#features" class="hover:text-black">Features</a></li>
                <li><a href="#price" class="hover:text-black">Premium Access</a></li>

                <!-- Nếu chưa login -->
                <li v-if="!isLoggedIn">
                    <a href="javascript:void(0)" @click="showSignInModal = true" class="text-gray-700 hover:text-black font-medium">
                        Sign In
                    </a>
                </li>

                <!-- Nếu đã login -->
                <template v-else>
                    <li v-if="hasSubscription">
                        <a :href="subscriptionUrl" class="text-gray-700 hover:text-black font-medium">
                            Subscription Management
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" @click="logout" class="text-gray-700 hover:text-black font-medium">
                            Sign Out
                        </a>
                    </li>
                </template>

                <!-- App download buttons -->
                <li class="flex space-x-3">
                    <a :href="downloadUrl">
                        <img src="/images/home/chplay_icon.png" alt="Google Play" class="h-9" />
                    </a>
                    <a :href="downloadUrl">
                        <img src="/images/home/appstore_icon.png" alt="App Store" class="h-9" />
                    </a>
                </li>
            </ul>
        </div>

    </header>

    <!-- hero section -->
    <div class="container mx-auto px-4 md:px-16">
        <section class="pt-2 pb-5 bg-white">
            <div class="container mx-auto px-3 lg:px-5">
                <div class="flex flex-col lg:flex-row items-center">

                    <!-- Left Content -->
                    <div class="lg:w-1/2 text-center lg:text-left mt-4 lg:mt-0">
                        <!-- User love + Avatars -->
                        <div
                            class="inline-flex items-center px-3 py-2 rounded-full mb-3 shadow-sm mx-auto lg:mx-0 bg-white space-x-3">
                            <span class="text-sm">Loved by 5M users with ⭐ 4.9 rating</span>
                            <div class="flex items-center space-x-1">
                                <img src="/images/home/used-by-1.png" class="rounded-full" width="28" height="28" />
                                <img src="/images/home/used-by-2.png" class="rounded-full" width="28" height="28" />
                                <img src="/images/home/used-by-3.png" class="rounded-full" width="28" height="28" />
                            </div>
                        </div>

                        <!-- Title -->
                        <h1 class="font-bold mb-3 text-3xl lg:text-5xl leading-tight">
                            Heka AI<br class="hidden md:block" />
                            Simple track calories<br class="hidden md:block" />
                            with just a photo
                        </h1>

                        <!-- Description -->
                        <p class="text-gray-600 mb-4 text-base lg:text-lg">
                            The AI-powered app for easy calorie tracking and personalize your health plan.
                            Snap a photo, scan a barcode, or describe your meal and get instant calorie and nutrient
                            info.
                        </p>

                        <!-- App Buttons -->
                        <div class="flex flex-nowrap justify-center lg:justify-start items-center gap-2 md:gap-3 mb-4">
                            <a id="app-button-ios2" :href="downloadUrl" class="btn-download-tracking">
                                <img src="/images/home/appstore_icon.png" alt="App Store" class="h-10 md:h-12 w-auto" />
                            </a>
                            <a id="app-button-and2" :href="downloadUrl" class="btn-download-tracking">
                                <img src="/images/home/chplay_icon.png" alt="Google Play" class="h-10 md:h-12 w-auto" />
                            </a>
                        </div>

                    </div>

                    <!-- Right Image -->
                    <div class="lg:w-1/2 text-center">
                        <img src="/images/home/hero-image.png" alt="Heka AI App Demo" class="max-h-[550px] mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- features section -->
    <section id="features" class="py-12 px-4 md:px-16 bg-white">
        <div class="container mx-auto px-4 md:px-16">
            <h2 class="text-2xl md:text-3xl font-semibold text-center mb-8">
                What does Heka AI include?
            </h2>

            <div class="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <!-- Left: Slick Slider -->
                <div ref="slickRef" class="slider w-full max-w-sm mx-auto">
                    <div v-for="(img, i) in images" :key="i">
                        <img :src="img.src" class="rounded-xl shadow-lg mx-auto max-h-[500px] object-contain" />
                    </div>
                </div>

                <!-- Right: Info Boxes -->
                <div class="flex flex-col space-y-4 w-full">
                    <div v-for="(feature, index) in features" :key="index"
                        class="p-5 border rounded-2xl transition cursor-pointer" :class="{
                            'bg-gray-100 border-black shadow-md': index === activeIndex,
                            'bg-white hover:shadow': index !== activeIndex,
                        }" @click="goToSlide(index)">
                        <h5 class="text-lg font-semibold mb-2">
                            {{ feature.title }}
                        </h5>
                        <p class="text-gray-600">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- price section -->

    <section class="py-16 px-2 md:px-16" id="price">
        <div class="text-center">
            <h2 class="text-2xl md:text-3xl font-semibold text-center mb-2">Unlock full with Premium Access</h2>
            <p class="text-gray-600 text-center mb-8">
                It takes just seconds to scan Cal in food with AI. Heka will help you automatically log foods, help you
                track and personalize your health plan.
            </p>
        </div>



        <div class="px-0 md:px-16 text-center">
            <table class="w-full border border-gray-200 text-center table-fixed px-16">
                <thead class="bg-gray-50">
                    <tr style="border: 0;">
                        <th style="border: 0;"></th>
                        <th style="border-left:0px; border-color: #dee2e6; border-right:0; border-bottom:0">
                            <div>Free</div>
                            <small>$0</small>
                        </th>
                        <th
                            style="border-left:0px; border-right:0; border-bottom:0; border-top:0; border-color: #dee2e6;">
                            <div>Premium Access</div>
                            <small>Monthly or Yearly</small>
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="p-1 md:p-3 text-left whitespace-normal break-words">Unlimited scan barcode</td>
                        <td>✔</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td class="p-1 md:p-3  text-left whitespace-normal break-words">Unlimited scan foods with AI
                        </td>
                        <td>-</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td class="p-1 md:p-3  text-left whitespace-normal break-words">Auto log foods</td>
                        <td>-</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td class="p-1 md:p-3  text-left whitespace-normal break-words">Auto analytic metrics</td>
                        <td>-</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td class="p-1 md:p-3  text-left whitespace-normal break-words">Premium theme, icon app</td>
                        <td>-</td>
                        <td>✔</td>
                    </tr>
                    <tr>
                        <td class="p-1 md:p-3  text-left whitespace-normal break-words">Cancel anytime</td>
                        <td>-</td>
                        <td>✔</td>
                    </tr>
                    <tr style="border:0">
                        <td></td>
                        <td style="border:0; padding: 0; text-align: center;">
                            <a id="downloadBtn"
                                href="https://play.google.com/store/apps/details?id=com.heka.ai.caloriecounter.mealplan"
                                class="inline-block bg-[#f91c5f] hover:bg-pink-600 text-white font-semibold px-3 py-2 text-sm rounded">
                                {{ downloadText }}
                            </a>
                        </td>
                        <td style="border:0; padding: 0; text-align: center;">
                            <a id="goPremiumBtn" href="javascript:void(0)" @click="showModal = true"
                                class="inline-block bg-[#f91c5f] hover:bg-pink-600 text-white font-semibold px-3 py-2 text-sm rounded">
                                {{ premiumText }}
                            </a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </section>



    <!-- Testimonial Section -->
    <section class="bg-[#0e0d13] p-2 md:p-16">
        <div class="container mx-auto px-2 md:px-16">
            <h2 class="text-white text-center text-2xl md:text-3xl font-bold mb-10">
                Thousands of users feedback
            </h2>

            <div class="flex flex-wrap justify-center gap-6">
                <div class="bg-[#1a1822] p-5 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%]">
                    <div class="flex items-center mb-3">
                        <img src="/images/home/review1.png" alt="pree.palmer" class="w-10 h-10 rounded-full mr-3" />
                        <div class="font-semibold text-white">pree.palmer</div>
                    </div>
                    <p class="text-gray-300 text-sm">
                        "im ngl I've lost 17 lbs with it doesn't need to be exact it's pretty decent"
                    </p>
                </div>

                <div class="bg-[#1a1822] p-5 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%]">
                    <div class="flex items-center mb-3">
                        <img src="/images/home/review2.png" alt="Ordinary Tony" class="w-10 h-10 rounded-full mr-3" />
                        <div class="font-semibold text-white">Ordinary Tony</div>
                    </div>
                    <p class="text-gray-300 text-sm">
                        "I'VE BEEN BULKING FOR A YEAR STRAIGHT W APP FR 👏👏👏"
                    </p>
                </div>

                <div class="bg-[#1a1822] p-5 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%]">
                    <div class="flex items-center mb-3">
                        <img src="/images/home/review3.png" alt="2025weightlossacc"
                            class="w-10 h-10 rounded-full mr-3" />
                        <div class="font-semibold text-white">2025weightlossacc</div>
                    </div>
                    <p class="text-gray-300 text-sm">
                        "I love your app it helps me keep track of my food without overthinking everything and gives
                        me a visual of my portions plus it's so aesthetic ❤️"
                    </p>
                </div>

                <div class="bg-[#1a1822] p-5 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%]">
                    <div class="flex items-center mb-3">
                        <img src="/images/home/review4.png" alt="Mathias" class="w-10 h-10 rounded-full mr-3" />
                        <div class="font-semibold text-white">Mathias</div>
                    </div>
                    <p class="text-gray-300 text-sm">
                        "I started to use it yesterday and im already giving it 5 ⭐"
                    </p>
                </div>

                <div class="bg-[#1a1822] p-5 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%]">
                    <div class="flex items-center mb-3">
                        <img src="/images/home/review5.png" alt="Ms Nsofor" class="w-10 h-10 rounded-full mr-3" />
                        <div class="font-semibold text-white">Ms Nsofor</div>
                    </div>
                    <p class="text-gray-300 text-sm">
                        "For people that want to control their calories hekaAI is the app for you 🙌🍽"
                    </p>
                </div>
            </div>
        </div>
    </section>


    <footer class="bg-white px-1 md:px-16">
        <div class="container mx-auto px-1 md:px-16">
            <!-- Top Section -->
            <div class="hidden lg:flex items-center justify-between py-6 border-b border-gray-300">
                <!-- Logo + text -->
                <div>
                    <img src="/images/logo.svg" alt="Heka AI" class="w-48 mb-3" />
                    <h5 class="text-gray-500">Simpler calorie tracking.</h5>
                </div>

                <!-- Empty spacer -->
                <div class="flex-1"></div>

                <!-- App Store + Google Play -->
                <div class="flex items-center gap-4">
                    <a id="btn-download-footer1" href="https://apps.apple.com/app/heka-ai-calorie-counter/id6747111547">
                        <img src="/images/home/appstore_icon.png" alt="App Store" class="w-40" />
                    </a>
                    <a id="btn-download-footer2"
                        href="https://play.google.com/store/apps/details?id=com.heka.ai.caloriecounter.mealplan">
                        <img src="/images/home/chplay_icon.png" alt="Google Play" class="w-40" />
                    </a>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="text-center text-gray-500 py-6">
                <div class="space-x-2">
                    <a href="https://astronex.ai/privacy-policy-heka-ai/" class="hover:underline">
                        Privacy Policy
                    </a>
                    <span>|</span>
                    <a href="https://astronex.ai/privacy/" class="hover:underline">
                        Terms of Services
                    </a>
                </div>
                <p class="text-sm mt-2">Copyright © 2025 by Astronex.</p>
                <p class="text-sm">Contact: aso.astronex@gmail.com</p>
            </div>
        </div>
    </footer>

    <PaywallModal :visible="showModal" backgroundUrl="/images/onboarding/modal/bg_premium_modal.png"
        @close="showModal = false" @accepted="handleAccepted" @showSignInModal="showSignInModal = true" />

    <SignInModal :visible="showSignInModal" @close="showSignInModal = false" @login="handleLogin" />
</template>

<script setup>
import { Head } from '@inertiajs/vue3'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { login, silentLoginSSO, getUserInfo, handleLogout } from '@/utils/auth'
import { createStripeBillingPortalSession, checkout } from '@/utils/payment'
import PaywallModal from '@/Pages/User/Components/Onboarding/Modal/PaywallModal.vue'
import SignInModal from '@/Pages/User/Components/Onboarding/Modal/SignInModal.vue'

console.log(result);

let downloadUrl = ref('');
// cập nhật link download
onMounted(() => {
    if (result) {
        downloadUrl.value = result.clickURL;
    } else {
        //detect device
        const device = navigator.userAgent;
        if (device.includes('iPhone') || device.includes('iPad') || device.includes('iPod')) {
            downloadUrl.value = import.meta.env.VITE_DOWNLOAD_URL_IOS;
        } else if (device.includes('Android')) {
            downloadUrl.value = import.meta.env.VITE_DOWNLOAD_URL_ANDROID;
        } else {
            // random ios và android
            const urls = import.meta.env.VITE_DOWNLOAD_URL_WEB.split(',');
            if (device.includes('iPhone') || device.includes('iPad') || device.includes('iPod')) {
                downloadUrl.value = urls[Math.floor(Math.random() * urls.length)];
            } else if (device.includes('Android')) {
                downloadUrl.value = urls[Math.floor(Math.random() * urls.length)];
            } else {
                downloadUrl.value = urls[Math.floor(Math.random() * urls.length)];
            }
        }
    }
});

console.log(downloadUrl.value);
const handleAccepted = (priceId) => {
    checkout(priceId)
}

// ==== Auth State ====
const isLoggedIn = ref(false)
const hasSubscription = ref(false)
const showDropdown = ref(false)
const subscriptionUrl = ref('#')
const showModal = ref(false)
const showSignInModal = ref(false)

// ==== Feature/Slider ====
const slickRef = ref(null)
const activeIndex = ref(0)
const isOpen = ref(false)

const images = [
    { src: "/images/home/analyzed.png" },
    { src: "/images/home/search-food-db.png" },
    { src: "/images/home/food-db.png" },
    { src: "/images/home/water.png" },
]

const features = [
    {
        title: "Track Your Food With Just a Picture",
        description:
            "Snap a photo with Heka AI, and your phone's depth sensor calculates food volume. Our AI then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.",
    },
    {
        title: "Search Our Database of over 1 million foods",
        description:
            "Quickly find and log foods from our extensive database. Search by name, brand, or scan barcodes for instant nutritional information.",
    },
    {
        title: "Complete Progress Tracking and AI suggestions",
        description:
            "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.",
    },
    {
        title: "Keep track of your water and daily exercise",
        description:
            "Log your water intake and daily exercise effortlessly. Heka AI helps you stay hydrated and active, integrating seamlessly with your fitness routine.",
    },
]

const downloadText = ref("DOWNLOAD NOW")
const premiumText = ref("GET PREMIUM")

// ==== Check login and Stripe ====
async function checkLoginStatus() {
    const token = localStorage.getItem('accessToken')
    if (token) {
        isLoggedIn.value = true
        getUserInfo()

        const res = await createStripeBillingPortalSession()
        if (res) {
            hasSubscription.value = true
            subscriptionUrl.value = res
            // gắn subscriptionUrl vào link của button subscriptionManagement
        }
    }
}

// ==== Auth actions ====
const handleLogin = (provider) => {
    login(provider)
    showSignInModal.value = false
}


const logout = () => {
    handleLogout()
    isLoggedIn.value = false
    hasSubscription.value = false
}

// ==== Handle Code Param (SSO login) ====
const code = new URLSearchParams(window.location.search).get('code')
if (code) {
    silentLoginSSO(code)
} else {
    checkLoginStatus()
}

// ==== Slider Init ====
onMounted(() => {
    window.$(slickRef.value).slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    })

    window.$(slickRef.value).on("afterChange", (event, slick, current) => {
        activeIndex.value = current
    })

    updateButtonText()
    window.addEventListener("resize", updateButtonText)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateButtonText)
})

// ==== Slide change ====
const goToSlide = (index) => {
    window.$(slickRef.value).slick("slickGoTo", index)
    activeIndex.value = index
}

// ==== Text on Mobile/Desktop ====
function updateButtonText() {
    if (window.innerWidth <= 768) {
        premiumText.value = "BUY NOW"
        downloadText.value = "DOWNLOAD"
    } else {
        premiumText.value = "GET PREMIUM"
        downloadText.value = "DOWNLOAD NOW"
    }
}

// ==== Expose for inline usage ====
window.logout = logout
// window.loginWithGoogle = handleLogin('google')
// window.loginWithApple = handleLogin('apple')
window.getUserInfo = getUserInfo
</script>


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<style scoped>
body {
    scroll-behavior: smooth;
}
</style>

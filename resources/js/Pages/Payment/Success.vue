<template>

    <Head title="Subscription Activated" />

    <div class="min-h-screen flex items-center justify-center bg-[#e2ebfb]">
        <div class="text-center px-4 py-6 max-w-md w-full">
            <h4 class="text-xl font-bold mb-4">
                Thanks for being amazing with Heka AI.<br />
                Let's start your plan now!
            </h4>

            <a href="/">
                <img src="/images/icon.png" alt="Heka Logo" class="w-20 h-20 mx-auto my-4" />
            </a>

            <ol class="text-lg text-left mb-6 space-y-1">
                <li>1. Click on the link below to download Heka AI</li>
                <li>2. Open the app and select "Sign in"</li>
                <li v-if="email" id="email">
                    3. Use your sign-up email: <strong class="text-black">{{ email }}</strong>
                </li>
            </ol>

            <a :href="downloadUrl" class="block w-full text-white btn-download">
                Download Heka
            </a>

            <a href="/" class="text-indigo-600 text-sm hover:text-indigo-800 block mt-2">Back to home</a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import { eventTracking } from '@/utils/tracking';
import { updateUserProfile } from '@/utils/auth';

const props = defineProps({
    sessionId: String
});

let email = ref('');
let downloadUrl = ref('');

// lấy checkoutId từ local storage
let checkoutId = localStorage.getItem('checkoutId');
//xóa checkoutId
localStorage.removeItem('checkoutId');

//lấy id từ url
const id = new URLSearchParams(window.location.search).get('id');





// lấy accessToken từ local storage
const accessToken = localStorage.getItem('accessToken');
if (!id || !checkoutId || id !== checkoutId) {
    window.location.href = '/';
} else {

    // đếm số lần checkout thành công
    const checkoutCount = parseInt(localStorage.getItem('checkoutCount')) || 0
    localStorage.setItem('checkoutCount', checkoutCount + 1)
    // lấy package_id từ local storage
    const package_id = localStorage.getItem('package_id');
    localStorage.removeItem('package_id');

    // lấy goal từ local storage
    const goal = localStorage.getItem('goal');
    let source = '';
    if (goal === 'lose') {
        source = 'onboarding_lose';
    } else if (goal === 'maintain') {
        source = 'onboarding_maintain';
    } else if (goal === 'gain') {
        source = 'onboarding_gain';
    } else if (goal === 'healthy') {
        source = 'onboarding_healthy';
    } else {
        source = 'home_scr_pro_icon';
    }

    eventTracking('iap_successfull', {
        convert_number: checkoutCount + 1,
        package_id: package_id,
        source: source
    });

    // gọi hàm updateUserProfile
    const keys = [
        'activity', 'goal', 'gender', 'year_of_birth', 'measure_type',
        'current_weight', 'current_height', 'target_cal', 'goal_weight',
        'start_date', 'end_date'
    ];

    const data = {};

    // Lấy giá trị từ localStorage nếu có
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null && value !== '') {
            data[key] = value;
        }
    });

    console.log('👉 data truyền đi:', data);

    // Gọi cập nhật với dữ liệu đã lọc
    updateUserProfile(data);

}


// lấy email từ local storage
email.value = localStorage.getItem('email');


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
</script>

<style scoped>
.btn-download {
    background-color: #5f6ae6;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.btn-download:hover {
    background-color: #8891f1;
}
</style>

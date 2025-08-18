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

// lấy accessToken từ local storage
const accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
    window.location.href = '/';
}else{
    eventTracking('payment_success', {
        sessionId: props.sessionId,
        email: email.value,
        downloadUrl: downloadUrl.value,
        accessToken: accessToken
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
if (!email.value) {
    document.getElementById('email').style.display = 'none';
}

onMounted(() => {
    if(result){
        downloadUrl.value = result.clickURL;
    }else{
        //detect device
        const device = navigator.userAgent;
        if(device.includes('iPhone') || device.includes('iPad') || device.includes('iPod')){
            downloadUrl.value = import.meta.env.VITE_DOWNLOAD_URL_IOS;
        }else if(device.includes('Android')){
            downloadUrl.value = import.meta.env.VITE_DOWNLOAD_URL_ANDROID;
        }else{
            // random ios và android
            const urls = import.meta.env.VITE_DOWNLOAD_URL_WEB.split(',');
            if(device.includes('iPhone') || device.includes('iPad') || device.includes('iPod')){
                downloadUrl.value = urls[Math.floor(Math.random() * urls.length)];
            }else if(device.includes('Android')){
                downloadUrl.value = urls[Math.floor(Math.random() * urls.length)];
            }else{
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

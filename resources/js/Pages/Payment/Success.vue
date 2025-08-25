<template>

    <Head title="Subscription Activated" />

    <div class="min-h-screen flex items-center justify-center bg-[#e2ebfb]">
        <div class="   text-center px-4 py-8 sm:px-6 sm:py-10 max-w-md w-11/12">
            <!-- Title -->
            <h4 class="text-lg sm:text-xl font-bold mb-4">
                Thanks for being amazing with Heka AI.<br />
                Let's start your plan now!
            </h4>

            <!-- Logo -->
            <a href="/">
                <img src="/images/icon.png" alt="Heka Logo" class="w-20 h-20 mx-auto my-4" />
            </a>

            <!-- Instructions -->
            <ol class="text-base sm:text-lg text-left mb-6 space-y-2">
                <li>1. Click on the link below to download Heka AI</li>
                <li>2. Open the app and select "Sign in"</li>
                <li v-if="email" id="email">
                    3. Use your sign-up email: <strong class="text-black break-all">{{ email }}</strong>
                </li>
            </ol>

            <!-- Download button -->
            <a :href="downloadUrl"
                class="block w-full bg-indigo-600 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200">
                Download Heka
            </a>

            <!-- Back link -->
            <a href="/" class="text-indigo-600 text-sm hover:text-indigo-800 block mt-3">Back to home</a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import { eventTracking } from '@/utils/tracking';
import { updateUserProfile } from '@/utils/auth';
import { getUserInfo } from '@/utils/auth';
const props = defineProps({
    sessionId: String
});

let email = ref('');
let downloadUrl = ref('');


let checkoutId = localStorage.getItem('checkoutId');
localStorage.removeItem('checkoutId');

let payment_redirect_from = localStorage.getItem('payment_redirect_from');
console.log('payment_redirect_from: ', payment_redirect_from);
//lấy id từ url
const id = new URLSearchParams(window.location.search).get('id');

// lấy accessToken từ local storage
const accessToken = localStorage.getItem('accessToken');

if (!id || !checkoutId) {
    window.location.href = '/';
} else {

    if (accessToken) {
        const user = getUserInfo();
    }



    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
        //lấy từ env
        const apiUrl = import.meta.env.VITE_SERVICE_DOMAIN + `/api/v1/payment/verify-checkout-session?session_id=${sessionId}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                console.log("✅ Dữ liệu trả về từ API:", data);
                if (data.success) {


                    email.value = data.data.customerEmail;

                    eventTracking('iap_successfull', {
                        convert_number: checkoutCount + 1,
                        price_id: localStorage.getItem('priceId'),
                        source: localStorage.getItem('source'),

                    });

                    eventTracking('confirm_purchased_with_store', {
                        pi_id: data.data.pi_id,
                        invoice_id: data.data.invoice_id,
                        subscription_id: data.data.subscription_id,
                        customerId: data.data.customerId,
                        value: data.data.amountTotal,
                        original_price: data.data.amountSubtotal,
                        currency: data.data.currency,
                        price_id: localStorage.getItem('priceId'),
                    });

                }
            },
            error: function (xhr, status, error) {
                console.error("❌ Lỗi khi gọi API:", error);
                if (xhr.responseJSON) {
                    console.error("Chi tiết lỗi:", xhr.responseJSON);
                }
            }
        });
    } else {
        console.warn("⚠️ No session_id");
    }



    // đếm số lần checkout thành công
    const checkoutCount = parseInt(localStorage.getItem('checkoutCount')) || 0
    localStorage.setItem('checkoutCount', checkoutCount + 1)
    // lấy package_id từ local storage
    const package_id = localStorage.getItem('package_id');
    localStorage.removeItem('package_id');


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

    const isComplete = keys.every(key => key in data);

    if (isComplete && accessToken) {
        updateUserProfile(data);
    }
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

import axios from 'axios'
import { showLoadingScreen, hideLoadingScreen } from './helpers'


async function createPaymentLink(email, priceId) {
    const id = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('checkoutId', id);
    localStorage.setItem('package_id', priceId);
    localStorage.setItem('type', 'paymentLink');
    const createPaymentLinkUrl = `${import.meta.env.VITE_SERVICE_DOMAIN}/api/v1/payment/create-payment-link`
    try {
        showLoadingScreen();

        const response = await axios.post(
            createPaymentLinkUrl,
            {
                priceId: priceId,
                email: email,
                successUrl: `${window.location.origin}/payment/success?id=${id}`
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        hideLoadingScreen();

        return response.data;

    } catch (error) {
        hideLoadingScreen();

        // Nếu API trả về response 400 với message rõ ràng thì lấy luôn
        if (error.response?.data) {
            return error.response.data;
        }

        // Nếu lỗi không rõ
        return {
            success: false,
            error: {
                code: 'UNKNOWN_ERROR',
                message: 'An error occurred, please try again later'
            }
        };
    }
}



export { createPaymentLink }







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

        // Nếu API trả về 400
        if (error.response?.status === 400) {
            // Nếu message là User already vip thì trả nguyên response
            if (error.response?.data?.error?.code === 'USER_ALREADY_VIP') {
                return error.response.data;
            }

            // Còn lại trả về something went wrong
            return {
                success: false,
                error: {
                    code: 'SOMETHING_WENT_WRONG',
                    message: 'Something went wrong, please try again'
                }
            };
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







import { eventTracking } from "@/utils/tracking.js";

export async function createStripeBillingPortalSession() {
    try {
      // Lấy access token từ localStorage
      let token = localStorage.getItem('accessToken');

      const paymentDomain = import.meta.env.VITE_PAYMENT_DOMAIN;
      if (!token) {
        throw new Error('Access token not found in localStorage');
      }

      // Gửi request tạo billing portal session
       const response = await fetch(`${paymentDomain}/saas-payment-service/v1/stripe/billing-portal-session`, {

        method: 'POST',
        headers: {
          'x-api-bundleid': 'com.astronex.hekaai',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callbackUrl: '/',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      // console.log('Stripe Billing Portal URL:', data.url);


      return data.url;

    } catch (error) {
      // console.error('Error creating Stripe billing portal session:', error.message);
      return null;
    }
  }



export async function checkout(stripePriceId) {

    showLoadingScreen();
    let accessToken = localStorage.getItem("accessToken");
    const paymentDomain = import.meta.env.VITE_SERVICE_DOMAIN;
    const bundleId = import.meta.env.VITE_BUNDLE_ID;

    const redirectUri = localStorage.getItem('redirectUri');
    // lấy domain hiện tại
    const domain = window.location.origin;

    const product = await getProducts(stripePriceId);


    if (!product) {
      hideLoadingScreen();
      return;
    }

    // console.log('product: ', product.price.id);

    // tạo 1 id random
    const id = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('checkoutId', id)
    localStorage.setItem('package_id', stripePriceId)

    try {
      const body = {
        cart: [{ stripePriceId: product.price.id, quantity: 1, name: product.name }],
        successUrl: `${domain}/payment/success?id=${id}`,
        cancelUrl: `${domain}/payment/cancel?id=${id}`
      };

      const res = await fetch(`${paymentDomain}/api/v1/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "x-api-bundleid": bundleId
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
        hideLoadingScreen();
      console.log('data', data)

        if (res.ok && data?.data?.url) {
            localStorage.setItem('payment_redirect_from', window.location.pathname);
            eventTracking('checkout_view');

            window.location.href = data.data.url;
        } else {
            alert('Lỗi khi tạo checkout session');
        // window.location.href = '/';
        // hideLoadingScreen();
        }

    } catch (err) {
      window.location.href = '/';
      hideLoadingScreen();
    }
  }




  export async function getProducts(targetId) {
    const serviceDomain = import.meta.env.VITE_SERVICE_DOMAIN;

    try {
      const res = await fetch(`${serviceDomain}/api/v1/payment/products/prices`, {
        method: "GET",
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data.data)) {
        const product = data.data.find(p => p.id === targetId);

        if (product) {
          return product; // ID tồn tại
        } else {
        //   console.warn(`Price ID "${targetId}" không tồn tại trong danh sách.`);
          return null;
        }
      }
    } catch (e) {
      console.error("Lỗi lấy sản phẩm:", e);
    }

    return null;
  }


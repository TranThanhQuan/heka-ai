

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
    const paymentDomain = import.meta.env.VITE_PAYMENT_DOMAIN;
    const bundleId = import.meta.env.VITE_BUNDLE_ID;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const keycloakDomain = import.meta.env.VITE_KEYCLOAK_DOMAIN;

    const redirectUri = localStorage.getItem('redirectUri');
    // lấy domain hiện tại
    const domain = window.location.origin;

    const product = await getProducts(stripePriceId);

    console.log('product: ', product);
    if (!product) {
      hideLoadingScreen();
      return;
    }

    console.log('product: ', product.price.id);

    try {
      const body = {
        cart: [{ stripePriceId: product.price.id, quantity: 1, name: product.name }],
        successUrl: `${domain}/payment/success`,
        cancelUrl: `${domain}/payment/cancel`
      };

      const res = await fetch(`${paymentDomain}/saas-payment-service/v1/stripe/create-checkout-session`, {
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

      if (res.ok && data?.url) {
        window.location.href = data.url;
      } else {
            window.location.href = '/';
        hideLoadingScreen();
      }
    } catch (err) {
      window.location.href = '/';
      hideLoadingScreen();
    }
  }




  export async function getProducts(targetId) {
    const paymentDomain = import.meta.env.VITE_PAYMENT_DOMAIN;
    const bundleId = import.meta.env.VITE_BUNDLE_ID;
    const accessToken = localStorage.getItem("accessToken");


    try {
      const res = await fetch(`${paymentDomain}/saas-payment-service/v1/stripe/products`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "x-api-bundleid": bundleId
        }
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.data)) {
        return data.data.find(p => p.price?.id === targetId);
      }
    } catch (e) {
      console.error("Lỗi lấy sản phẩm:", e);
    }
    return null;
  }

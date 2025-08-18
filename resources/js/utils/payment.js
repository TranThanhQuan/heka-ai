

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

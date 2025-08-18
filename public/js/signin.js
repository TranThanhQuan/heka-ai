const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
const keycloakDomain = import.meta.env.VITE_KEYCLOAK_DOMAIN;
const bundleId = import.meta.env.VITE_BUNDLE_ID;
const clientId = import.meta.env.VITE_CLIENT_ID;
const paymentDomain = import.meta.env.VITE_PAYMENT_DOMAIN;
const paymentDomainDev = import.meta.env.VITE_PAYMENT_DOMAIN_DEV;




// ---------------------------
// Utilities
// ---------------------------
function getRealm(bundleId) {
  return bundleId.replace(/\./g, '-');
}

function generateCodeVerifier(length = 128) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length);
}

// ✅ async version with js-sha256
async function generateCodeChallenge(codeVerifier) {
  const hashBuffer = await sha256.arrayBuffer(codeVerifier);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64;
}

function generateRandomState() {
  return Math.random().toString(36).substring(2, 16);
}


async function login(idp) {
  showLoadingScreen();

  const realm = getRealm(bundleId);
  const keycloakUrl = keycloakDomain + '/realms/' + realm + '/protocol/openid-connect/auth';
  const state = generateRandomState();
  const codeVerifier = generateCodeVerifier();

  localStorage.setItem('pkce_code_verifier', codeVerifier);
  localStorage.setItem("idp", idp);
  localStorage.setItem("deviceId", "device-" + crypto.randomUUID());
  localStorage.setItem("bundleId", bundleId);

  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const authUrl = `${keycloakUrl}?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('openid device-id profile email ancestor-id address phone group-membership')}&` +
    `state=${state}&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256&` +
    `kc_idp_hint=${idp}&` +
    `prompt=consent%20select_account`;

  hideLoadingScreen();

  window.location.href = authUrl;
  // trả về code ở domain+path
}

async function silentLoginSSO(code) {

  const codeVerifier = localStorage.getItem('pkce_code_verifier');
  const idp = localStorage.getItem('idp');
  const deviceId = localStorage.getItem('deviceId');
  const bundleId = localStorage.getItem('bundleId');
  const redirectUri = window.location.origin + window.location.pathname;
  if (code) {
    //thêm loading
    showLoadingScreen();

    fetch(backendDomain + '/saas-user-service/v1/users/silent-login-sso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-bundleid': bundleId
      },
      body: JSON.stringify({ code, codeVerifier, redirectUri, deviceId, idp })
    })
      .then(response => response.json())
      .then(data => {
        if (data?.data?.accessToken && data?.data?.refreshToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          eventTracking('login_success', '');
          // nếu có priceId thì gọi checkout
          // Đợi 500ms rồi gọi getUserInfo
          setTimeout(() => {
            getUserInfo();
          }, 500);

          // chuyển hướng redirectUri
          window.location.href = redirectUri;
        } else {
          hideLoadingScreen();
          console.error('Login failed:', data);

          // nhấn ok thì chuyển hướng về redirectUri
          Swal.fire({
            title: 'Login failed',
            text: 'Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = redirectUri;
          });
        }
      })
      .catch((error) => {
        hideLoadingScreen();
        // console.error('Error during login:', error);
      });

  }
}

// ---------------------------
// Stripe Checkout
// ---------------------------
async function getProducts(targetId) {
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

async function checkout(stripePriceId) {

  showLoadingScreen();
  accessToken = localStorage.getItem("accessToken");

  // lấy domain hiện tại
  const domain = window.location.origin;


  const product = await getProducts(stripePriceId);
  if (!product) {
    hideLoadingScreen();
    return;
  }

  try {
    const body = {
      cart: [{ stripePriceId: product.price.id, quantity: 1, name: product.name }],
      successUrl: `${domain}/payment/success.html`,
      cancelUrl: `${domain}/payment/cancel.html`
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
    //   console.error("Lỗi tạo checkout session:", data);
    //   Swal.fire({
    //     title: 'Checkout error',
    //     text: data.message || 'An error occurred while creating the checkout session.',
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   });
    window.location.href = '/';
      hideLoading();
    }
  } catch (err) {
    // console.error("Lỗi mạng khi tạo checkout:", err);
    // Swal.fire({
    //   title: 'Network error',
    //   text: 'An error occurred while trying to create the checkout session. Please try again later.',
    //   icon: 'error',
    //   confirmButtonText: 'OK'
    // });
    window.location.href = '/';

  }
}

async function getUserInfo() {
  let accessToken = localStorage.getItem('accessToken');
  showLoadingScreen();

  try {
    const res = await fetch(`${backendDomain}/saas-user-service/v1/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "x-api-bundleid": bundleId
      }
    });
    hideLoadingScreen();
    const data = await res.json();
    if (res.ok && data.data) {
      const userInfo = data.data;

      if (userInfo.email) {
        localStorage.setItem("email", userInfo.email);
      }
      // Lưu group name nếu có
      const groupName = userInfo.groups?.[0]?.name || null;
      if (groupName) {
        localStorage.setItem("group_name", groupName);
      }

      const attributes = userInfo.attributes || {};
      for (const key in attributes) {
        const valueArray = attributes[key];
        if (Array.isArray(valueArray)) {
          localStorage.setItem(key, valueArray[0]);
        }
      }


      // Lưu tất cả các attributes vào localStorage

      if (localStorage.getItem('gender') ||
        localStorage.getItem('year_of_birth') &&
        localStorage.getItem('activity') &&
        localStorage.getItem('measure_type') &&
        localStorage.getItem('current_weight') &&
        localStorage.getItem('current_height') &&
        localStorage.getItem('target_cal')) {
      }

      return false;

    } else {
      // console.error("Lỗi lấy thông tin người dùng:", data);

      Swal.fire({
        title: 'Session expired',
        text: 'Please sign in again to continue.',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        handleLogout();

        showLoginModal();
      });
    }
  } catch (err) {
    console.error("Lỗi mạng khi lấy thông tin người dùng:", err);
  }

  hideLoadingScreen();
}

async function createStripeBillingPortalSession() {
  try {
    // Lấy access token từ localStorage
    let token = localStorage.getItem('accessToken');


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



$('#btnGoogle').on('click', function () {
  login('google');
});

$('#btnApple').on('click', function () {
  login('apple');
});


// ---------------------------
// Tự động login nếu có code
// ---------------------------

// window.onload = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get("code");
//   const state = urlParams.get("state");

//   if (!code) return;

//   const isLoginFirst = localStorage.getItem("loginFirst") === "1";

//   if (isLoginFirst) {
//     loginFirst().then(() => {

//     });
//   } else {
//     login();
//   }
// };



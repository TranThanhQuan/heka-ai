import { getRealm, generateCodeVerifier, generateCodeChallenge, generateRandomState, showLoadingScreen, hideLoadingScreen } from './helpers';

import { checkout } from './payment';

import { v4 as uuidv4 } from 'uuid';


export async function login(idp) {
    showLoadingScreen();

    console.log('VITE_KEYCLOAK_DOMAIN: ', import.meta.env.VITE_KEYCLOAK_DOMAIN);
    console.log('VITE_BACKEND_DOMAIN: ', import.meta.env.VITE_BACKEND_DOMAIN);
    console.log('VITE_PAYMENT_DOMAIN: ', import.meta.env.VITE_PAYMENT_DOMAIN);

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('pkce_code_verifier', codeVerifier);
    localStorage.setItem('idp', idp);
    localStorage.setItem('deviceId', 'device-' + uuidv4());

    const realm = getRealm(import.meta.env.VITE_BUNDLE_ID);
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = window.location.origin + window.location.pathname;
    const state = generateRandomState();

    const authUrl = `${import.meta.env.VITE_KEYCLOAK_DOMAIN}/realms/${realm}/protocol/openid-connect/auth?` +
        new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: 'openid device-id profile email ancestor-id address phone group-membership',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state: state,
            kc_idp_hint: idp,
            prompt: 'consent select_account',
        });

    hideLoadingScreen();

    window.location.href = authUrl;
}



export async function handleLogout() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
        const bundleId = import.meta.env.VITE_BUNDLE_ID;

        if (!refreshToken) {
            window.location.href = localStorage.getItem('redirectUri') || '/';
            localStorage.clear();
            return;
        }

        const response = await fetch(`${backendDomain}/saas-user-service/v1/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-bundleid': bundleId
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            // const errorData = await response.json().catch(() => ({}));
            // throw new Error(errorData.message || 'Logout failed. Please try again.');
            localStorage.clear();

            // Swal.fire({
            //     title: 'Session expired',
            //     text: 'Please sign in again to continue.',
            //     icon: 'warning',
            //     confirmButtonText: 'Log In'
            // }).then(() => {
            //     // handleLogout();
            //     // showLoginModal();
            // });
        }else {
            window.location.href = localStorage.getItem('redirectUri') || '/';
            localStorage.clear();
        }
    } catch (error) {
        // console.error('Logout error:', error);
        // showResponse('Error', error.message || 'An error occurred during logout', false);
    }
}


export async function silentLoginSSO(code) {
    const priceId = localStorage.getItem('priceId');
    localStorage.removeItem('priceId');

    const codeVerifier = localStorage.getItem('pkce_code_verifier');
    const idp = localStorage.getItem('idp');
    const deviceId = localStorage.getItem('deviceId');
    const bundleId = import.meta.env.VITE_BUNDLE_ID;
    const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
    const redirectUri = window.location.origin + window.location.pathname;
    if (code) {
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
                    // eventTracking('login_success', '');

                    if(priceId){
                        // call checkout

                        checkout(priceId)
                    }else{
                        // chuyển hướng redirectUri
                        window.location.href = redirectUri;
                    }


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
                console.error('Error during login:', error);
            });

    }
}


export async function getUserInfo() {
    var accessToken = localStorage.getItem('accessToken');
    var backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
    var keycloakDomain = import.meta.env.VITE_KEYCLOAK_DOMAIN;
    var bundleId = import.meta.env.VITE_BUNDLE_ID;


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

        if (localStorage.getItem('gender') &&
          localStorage.getItem('year_of_birth') &&
          localStorage.getItem('activity') &&
          localStorage.getItem('measure_type') &&
          localStorage.getItem('current_weight') &&
          localStorage.getItem('current_height') &&
          localStorage.getItem('target_cal')) {
        }

        return false;

      } else {

        Swal.fire({
          title: 'Session expired',
          text: 'Please sign in again to continue.',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then(() => {
          handleLogout();

          showSignInModal(true);
        });
      }
    } catch (err) {
    //   console.error("Lỗi mạng khi lấy thông tin người dùng:", err);
    }

    hideLoadingScreen();
  }





  export async function updateUserProfile(data) {
    let accessToken = localStorage.getItem('accessToken');
    const bundleId = import.meta.env.VITE_BUNDLE_ID;
    const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
    if (!accessToken) {
      console.error('❌ Access token is missing');
      return;
    }

    // Tự động lọc và làm sạch tất cả key trong `data`
    const attributes = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          if (typeof value === 'string') {
            value = value.trim();
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }
          }
          acc[key] = value;
        }
        return acc;
      }, {});


    const payload = { attributes: attributes };

    try {
      // showLoadingScreen();
      const res = await fetch(`${backendDomain}/saas-user-service/v1/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-bundleid': bundleId,
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok && result.data === true) {
        // Thành công
      } else {
        if (result?.error?.message === 'Token expired') {
          handleLogout();
        } else {
          console.error('❌ Update failed:', result);
        }
      }
    } catch (error) {
      console.error('❌ Error while updating profile:', error);
    } finally {
      hideLoadingScreen();
    }
  }


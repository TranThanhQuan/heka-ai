import { getRealm, generateCodeVerifier, generateCodeChallenge, generateRandomState } from './helpers';
import { v4 as uuidv4 } from 'uuid';


export async function login(idp) {
    showLoadingScreen();

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



export function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
}


export async function silentLoginSSO(code) {

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
                console.error('Error during login:', error);
            });

    }
}

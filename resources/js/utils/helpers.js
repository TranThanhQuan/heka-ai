export function getRealm(bundleId) {
    return bundleId.replace(/\./g, '-');
}


export function generateRandomState() {
    return Math.random().toString(36).substring(2, 16);
}

export function generateCodeVerifier(length = 64) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    array.forEach((val) => {
        result += charset[val % charset.length];
    });
    return result;
}

export async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64UrlEncode(digest);
}

export function base64UrlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));

    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export function showLoadingScreen() {
    document.body.style.overflow = 'hidden';
}

export function hideLoadingScreen() {
    document.body.style.overflow = 'auto';
}

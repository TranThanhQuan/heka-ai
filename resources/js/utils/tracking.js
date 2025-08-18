export function eventTracking(eventName, eventData = null) {
    //  path = "/heka.astronex.local/get-premium"
    let path = localStorage.getItem('redirectUri');

    if (path) {
        // Chuyển thành mảng và lấy phần tử cuối cùng
        path = path.split('/').filter(Boolean).pop(); // "get-premium"
    } else {
        // Lấy từ window.location.pathname nếu không có redirectUri
        path = window.location.pathname.split('/').filter(Boolean).pop(); // "get-premium"
    }



    const payload = {
        event_name: eventName,
        event_data: eventData ? JSON.stringify(eventData) : null,
        path: path
    };

    console.log('payload event tracking: ', payload);

    // // 🔹 Gửi lên API
    // fetch('/api/event_tracking.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload)
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log('Event tracked:', data);
    //     })
    //     .catch(error => {
    //         // console.error('Tracking error:', error);
    //     });


    // // 🔹 Gửi lên Firebase
    // if (typeof logEvent === 'function' && typeof analytics !== 'undefined') {
    //     try {
    //         logEvent(analytics, eventName, eventData || {});
    //         //   console.log('✅ Event tracked to Firebase:', eventName);
    //     } catch (firebaseError) {
    //         //   console.error('❌ Firebase tracking error:', firebaseError);
    //     }
    // } else {
    //     // console.warn('⚠️ Firebase not initialized or logEvent not available');
    // }
}

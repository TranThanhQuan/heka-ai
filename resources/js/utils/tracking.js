
import { logEvent, analytics } from "@/firebase.js";

// Danh sách các event chỉ gửi 1 lần
const singleFireEvents = [
  "splash_scr",
  "goal_scr_item_click",
  "goal_scr_next_click",
  "sex_age_scr_next_click",
  "activity_level_click",
  "height_weight_next_click",
  "goal_weight_next_click",
  "review_scr_next_click",
  "nutrition_scr_next_click"
];

// Key trong localStorage để lưu event đã bắn
const STORAGE_KEY = "tracked_events";

// Lấy danh sách event đã gửi từ localStorage
function getTrackedEvents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Lưu danh sách event đã gửi vào localStorage
function saveTrackedEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// Hàm tracking chính
export function eventTracking(eventName, data = {}) {
  const tracked = getTrackedEvents();

  if (singleFireEvents.includes(eventName)) {
    // Nếu event thuộc loại chỉ gửi 1 lần
    if (tracked.includes(eventName)) {
    //   console.log(`[Tracking] Event '${eventName}' đã gửi rồi, bỏ qua`);
      return;
    }

    // Gửi event lần đầu
    logEvent(analytics, eventName, data);
    // console.log(`[Tracking] Sent (once): ${eventName}`, data);

    // Lưu vào localStorage
    tracked.push(eventName);
    saveTrackedEvents(tracked);
  } else {
    // Event gửi nhiều lần
    logEvent(analytics, eventName, data);


    if (eventName === 'iap_successfull') {
        const session_id = localStorage.getItem('session_id');
        fbq('track', 'Purchase', {
            value: 0.00,
            currency: 'USD',
            session_id: session_id
        });


        //   dataLayer.push({
        //       event: 'purchase_success',
        //       event_category: 'purchase',
        //       event_label: 'purchase',
        //     });
    }

    if (eventName === 'iap_btn_click') {

        fbq('track', 'InitiateCheckout');
    }

  }
}

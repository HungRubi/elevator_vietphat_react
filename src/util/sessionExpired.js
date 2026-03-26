/** Thông báo thống nhất khi hết phiên (thay message từ server kiểu unauthenticated). */
export const SESSION_EXPIRED_USER_MESSAGE = "Vui lòng đăng nhập để tiếp tục.";

let handler = null;
let lastNotifyAt = 0;
const DEBOUNCE_MS = 2500;

export function registerSessionExpiredHandler(fn) {
    handler = typeof fn === "function" ? fn : null;
}

/**
 * Gắn `message` thân thiện lên lỗi axios trước khi reject (thunk/component đọc `response.data.message`).
 * @param {import("axios").AxiosError} error
 */
export function applySessionExpiredMessage(error) {
    if (!error || typeof error !== "object") return error;
    if (!error.response) {
        error.response = { status: 401, data: { message: SESSION_EXPIRED_USER_MESSAGE } };
        return error;
    }
    const prev = error.response.data;
    error.response.data =
        prev && typeof prev === "object" && !Array.isArray(prev)
            ? { ...prev, message: SESSION_EXPIRED_USER_MESSAGE }
            : { message: SESSION_EXPIRED_USER_MESSAGE };
    return error;
}

/**
 * Toast + điều hướng login (đăng ký từ App). Có debounce tránh bắn nhiều lần khi song song request.
 */
export function notifySessionExpired() {
    const now = Date.now();
    if (now - lastNotifyAt < DEBOUNCE_MS) return;
    lastNotifyAt = now;
    if (handler) handler();
}

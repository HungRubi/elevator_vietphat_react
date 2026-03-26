/** Giữ lựa chọn thanh toán khi F5 (Redux không persist). */
export const CHECKOUT_STORAGE_KEY = "elevator_checkout_v1";

export function clearCheckoutStorage() {
    try {
        sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
    } catch {
        // ignore
    }
}

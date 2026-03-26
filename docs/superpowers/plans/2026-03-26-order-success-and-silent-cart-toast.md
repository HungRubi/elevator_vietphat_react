# Order Success Page + Silent Cart Toast Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sau khi đặt hàng thành công (COD và VNPay return), chuyển sang trang “Đặt hàng thành công” có 2 nút điều hướng; đồng thời không hiển thị toast “xóa sản phẩm khỏi giỏ” khi xóa giỏ là bước hậu xử lý sau đặt hàng.

**Architecture:** Thêm route `/order-success` (Protected) hiển thị UI success. Tách “toast im lặng” bằng tham số `silent` trên thunk `deleteCartItem`, để chỉ ẩn toast trong ngữ cảnh đặt hàng thành công nhưng vẫn giữ toast khi user tự xóa trong giỏ.

**Tech Stack:** React + React Router, Redux Toolkit, Tailwind classes (đang dùng), Vite.

---

### Task 1: Silent `deleteCartItem` when post-order cleanup

**Files:**
- Modify: `d:/elevator/ui/src/store/slices/userSlice.js`
- Modify: `d:/elevator/ui/src/containers/system/Pay.jsx`
- Modify: `d:/elevator/ui/src/containers/system/PaymentReturn.jsx`

- [ ] Add `silent` to `deleteCartItem` thunk args (no API change).
- [ ] In `deleteCartItem.fulfilled`, only set `state.messageUser` if `!action.meta.arg.silent`.
- [ ] Update COD success path in `Pay.jsx` to dispatch `deleteCartItem(..., silent: true)`.
- [ ] Update VNPay success path in `PaymentReturn.jsx` to dispatch `deleteCartItem(..., silent: true)`.
- [ ] Verify: manual click delete in Cart still shows toast.

### Task 2: Create `/order-success` page

**Files:**
- Create: `d:/elevator/ui/src/containers/system/OrderSuccess.jsx`
- Modify: `d:/elevator/ui/src/util/path.js`
- Modify: `d:/elevator/ui/src/App.jsx`

- [ ] Add `path.ORDER_SUCCESS = '/order-success'`.
- [ ] Add protected route in `App.jsx` for the page.
- [ ] Implement UI: success hero + short note + 2 CTAs:
  - “Xem đơn hàng” → `/account/order`
  - “Tiếp tục mua sắm” → `/products`

### Task 3: Navigate to success page on order success

**Files:**
- Modify: `d:/elevator/ui/src/containers/system/Pay.jsx`
- Modify: `d:/elevator/ui/src/containers/system/PaymentReturn.jsx`

- [ ] Replace success navigation from `/account/order` to `/order-success`.
- [ ] Ensure page is robust on F5 (no dependency on Redux-only payload).

### Task 4: Verification

**Commands:**
- [ ] Run: `yarn build` (Expected: success)
- [ ] Run: `yarn lint` (Expected: no new errors in modified files)


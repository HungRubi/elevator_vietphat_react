# Mobile Header/Menu/Search (A2) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign 100% header/menu/search cho mobile theo concept A2 (search dock dưới) và style “phẳng + viền mảnh”.

**Architecture:** Giữ `HeaderBar` là entry chính của header. Di chuyển menu mobile overlay từ `Public.jsx` vào `HeaderBar.jsx`. Mobile search dùng dock fixed-bottom mở sheet, tận dụng Redux action `querySite` và routing hiện có.

**Tech Stack:** React, react-router-dom, Redux Toolkit, TailwindCSS, existing slices/components.

---

## Chunk 1: Implement mobile menu/search in HeaderBar

### Task 1: Gỡ overlay menu cũ khỏi Public

**Files:**
- Modify: `src/containers/public/Public.jsx`

- [ ] Xoá UI overlay menu mobile đang render dưới cùng file (block `fixed top-0 ... menu_mobie`).
- [ ] Xoá imports/state liên quan nếu không còn dùng (`menuBar`, `toggleMenuMobie`, `menu_mobie`, `IoCloseSharp`, `Button`, `dispatch` phụ).
- [ ] Chạy `yarn lint` (expected: no errors).

### Task 2: Thêm Menu Sheet + Search Dock theo A2

**Files:**
- Modify: `src/components/HeaderBar.jsx`
- (Optional) Create: `src/components/MobileSearchDock.jsx`, `src/components/MobileMenuSheet.jsx` nếu `HeaderBar.jsx` phình quá.

- [ ] Thêm state local cho `isMenuOpen`, `isSearchOpen`, `activeAccordionKey`.
- [ ] Implement **Menu Sheet** (overlay + panel) dùng `menuBar`; subMenu accordion.
- [ ] Implement **Search Dock** fixed-bottom (mobile only) + **Search Sheet** với input + submit → `/products?q=...` và dispatch `querySite`.
- [ ] Đảm bảo `z-index` không đè sai `notification/account` dropdown.
- [ ] Kiểm tra tương tác đóng mở (tap nền + nút close).

### Task 3: Verify

**Commands:**
- [ ] Run: `yarn lint` (expected: no errors)
- [ ] Run: `yarn build` (expected: build success)


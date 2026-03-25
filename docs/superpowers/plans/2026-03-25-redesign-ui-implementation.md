# Redesign UI “Việt Phát” (Catalog-first) — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai UI/UX theo spec catalog-first: design system nhẹ, trang Products/Detail làm trọng tâm, search qua URL, CTA báo giá, giảm clutter và đồng bộ các trang còn lại.

**Architecture:** Chuẩn hoá token CSS + Tailwind utility trong `index.css`; tái dùng component hiện có (`Button`, `HeaderBar`, `ProductsAll`) nhưng restyle theo spec; thêm modal/form báo giá tách file; `Products` đọc `useSearchParams` + filter chips thay sidebar; `Search` submit → `/products?q=...` + dispatch giữ tương thích Redux nếu cần.

**Tech Stack:** Vite 6, React 19, React Router 7, Redux, Tailwind CSS v4 (`@import "tailwindcss"`), react-helmet, react-toastify.

**Spec tham chiếu:** `docs/superpowers/specs/2026-03-25-redesign-ui-design.md`

---

## File structure (tổng quan)

| File / thư mục | Trách nhiệm |
|----------------|-------------|
| `src/index.css` | Tokens (`--color-*`, spacing), body background, reduced-motion, loại bớt class decorative cũ không dùng |
| `src/components/Button.jsx` (và liên quan) | Variant primary/secondary/ghost, focus ring, loading state nếu mở rộng |
| `src/components/Search.jsx` | Submit → `navigate('/products?q=...')`, styling theo header light, empty hint |
| `src/containers/public/Products.jsx` | Layout mới: breadcrumb, search sync URL, chips category, sort, skeleton/empty |
| `src/components/ProductsAll.jsx` | Grid responsive, item “open” (ít border/shadow), hover nhẹ, a11y alt |
| `src/containers/public/ProductDetail.jsx` | 2 cột, CTA “Nhận báo giá”, modal, gọn reviews |
| `src/components/QuoteRequestModal.jsx` (mới) | Form báo giá: tên, SĐT, ghi chú, product ref; focus trap / ESC |
| `src/containers/public/Home.jsx` | Trust row, CTA “Xem sản phẩm” link `/products`, section “How we help” nếu thiếu |
| `src/components/Footer.jsx` | Bớt fixed-bg nặng; layout trust + links |
| `src/containers/public/Public.jsx` | Sửa bug `dispatch.actions` → `dispatch(actions...)`; FAB phone/to-top theo spec (tinh gọn) |
| `src/containers/public/News.jsx`, `NewsDetail.jsx`, `AboutUs.jsx`, `Contact.jsx` | Áp spacing/typography spec |
| `src/containers/system/Cart.jsx`, `Pay.jsx`, `Account.jsx` (+ con) | Đồng bộ design system, empty states |
| `src/components/PageBar.jsx` | Style pagination theo token |

---

## Chunk 1: Foundation — tokens & global styles

### Task 1.1: CSS variables & body

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1:** Thêm `:root` tokens: `--color-primary`, `--color-bg`, `--color-surface`, `--radius-lg`, font stack giữ `Be Vietnam Pro`.
- [ ] **Step 2:** Đặt `body` nền `#FFFFFF` hoặc `#F8FAFC`, `color` slate-900 tương đương; bỏ/giảm `background: #f3f3f3` toàn trang.
- [ ] **Step 3:** Thêm `@media (prefers-reduced-motion: reduce)` giảm animation transform mạnh (tuỳ class dùng global).

**Verify:** Mở app, trang bất kỳ nền sáng đồng nhất.

- [ ] **Step 4:** Commit  
  `git add src/index.css && git commit -m "style: global tokens and page background for redesign"`

---

## Chunk 2: Search → Products với query URL

### Task 2.1: Điều hướng và đồng bộ Redux

**Files:**
- Modify: `src/components/Search.jsx`
- Modify: `src/containers/public/Products.jsx` (đọc `q` từ URL, gọi search nếu có action sẵn)

- [ ] **Step 1:** Trong `Search`, `handleSubmit`: nếu `trim()` rỗng → không navigate, optional `aria-live` hint hoặc placeholder tiếng Việt.
- [ ] **Step 2:** Nếu có query: `navigate(\`/products?q=${encodeURIComponent(q)}\`)` và `dispatch(actions.querySearch(q))` (giữ hành vi data hiện có nếu list dựa vào Redux).
- [ ] **Step 3:** Restyle input theo header sáng: border slate-200, text slate-900, focus ring emerald/primary, nút search contrast đủ WCAG.

**Files:**
- Modify: `src/containers/public/Products.jsx`

- [ ] **Step 4:** `useSearchParams`: khi mount hoặc `q` đổi, sync vào state/local và dispatch search nếu API dùng global `productSearch` vs `products` — **đọc** `store/actions/products.js` và reducer để chọn nguồn dữ liệu đúng (tránh hiển thị sai).

**Verify:** Gõ từ khoá → URL có `?q=`; refresh giữ kết quả; back hoạt động.

- [ ] **Step 5:** Commit  
  `git commit -m "feat(search): navigate to products with q param and styled search field"`

---

## Chunk 3: Products list — layout & filters

### Task 3.1: Bỏ sidebar, thêm chips + mobile drawer

**Files:**
- Modify: `src/containers/public/Products.jsx`
- Optional create: `src/components/CategoryFilterDrawer.jsx` (hoặc inline trong Products)

- [ ] **Step 1:** Layout `max-w-[1200px] mx-auto px-4 md:px-8`; breadcrumb nhẹ (Trang chủ / Sản phẩm).
- [ ] **Step 2:** Thanh trên cùng: title H1, ô search (có thể reuse `Search` hoặc controlled input sync URL).
- [ ] **Step 3:** Map `categoryProduct` → chips pill; `activeId` đồng bộ highlight; click chip gọi `getProductByCategory(id)` như hiện tại; thêm “Tất cả” reset list (`getProducts()`).
- [ ] **Step 4:** Mobile: nút “Bộ lọc” mở panel (fixed bottom hoặc slide-in) chứa cùng danh sách category; focus trap + ESC + return focus (theo spec §6).

**Verify:** Desktop không còn cột sidebar 230px; mobile lọc được.

- [ ] **Step 5:** Commit

### Task 3.2: Sort & empty/loading

**Files:**
- Modify: `src/containers/public/Products.jsx`

- [ ] **Step 1:** Select sort: client-side sort mảng hiển thị (price asc/desc, name) nếu không có API — document trong code.
- [ ] **Step 2:** Khi `dispatch` loading: skeleton grid 6–8 ô (div animate-pulse) thay spinner đơn lẻ.
- [ ] **Step 3:** Empty: copy + nút “Xoá bộ lọc” / “Xem tất cả sản phẩm”.

- [ ] **Step 4:** Commit

---

## Chunk 4: Product grid component

### Task 4.1: Restyle `ProductsAll`

**Files:**
- Modify: `src/components/ProductsAll.jsx`
- Có thể cần chỉnh: `src/index.css` (`.item_product` media queries)

- [ ] **Step 1:** Thay wrapper `flex-wrap` bằng `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
- [ ] **Step 2:** Mỗi item: bỏ shadow dày; `rounded-2xl border border-slate-200/80` hoặc chỉ dùng gap + `bg-white`; hover `-translate-y-0.5` + `shadow-sm`.
- [ ] **Step 3:** Bỏ/giảm overlay `GoPlus` scale ảnh mạnh nếu spec “subtle”; giữ `NavLink` toàn vùng ảnh.
- [ ] **Step 4:** `alt={item.name}` thay vì chung “ảnh sản phẩm”.
- [ ] **Step 5:** Nút giỏ: kích thước tối thiểu 44px touch target.

**Verify:** Grid đều trên 320px–1280px; không CLS lớn khi load ảnh.

- [ ] **Step 6:** Commit

---

## Chunk 5: Product detail — CTA báo giá & layout

### Task 5.1: Modal báo giá

**Files:**
- Create: `src/components/QuoteRequestModal.jsx`
- Modify: `src/components/index.js` export
- Modify: `src/containers/public/ProductDetail.jsx`

- [ ] **Step 1:** Modal: overlay click đóng, ESC, focus vào input đầu; `role="dialog"` `aria-modal="true"` `aria-labelledby`.
- [ ] **Step 2:** Fields: họ tên, SĐT, ghi chú; hiển thị readonly tên sản phẩm; submit: tạm thời `toast.success` + đóng (hoặc hook EmailJS nếu đã có pattern trong `Form.jsx`).
- [ ] **Step 3:** Primary button trang detail: “Nhận báo giá”; secondary: Gọi / Email / Thêm giỏ theo thứ tự spec.

### Task 5.2: Gọn layout detail

**Files:**
- Modify: `src/containers/public/ProductDetail.jsx`

- [ ] **Step 1:** Container `max-w-[1200px] mx-auto`; gallery + info grid; giảm khối nền xám (#fafafa) thành section typography.
- [ ] **Step 2:** Tabs mô tả / đánh giá: border-bottom thay vì nền #DBDBDB dày.
- [ ] **Step 3:** Heading tiếng Việt nhất quán (bỏ “contact/suggest products” kiểu demo nếu không cần).

**Verify:** Tab keyboard vào modal; Lighthouse a11y không regress nghiêm trọng.

- [ ] **Step 4:** Commit

---

## Chunk 6: Home & shell

### Task 6.1: Home theo spec §3.1

**Files:**
- Modify: `src/containers/public/Home.jsx`

- [ ] **Step 1:** Primary CTA `NavLink` tới `/products`; secondary `/contact`.
- [ ] **Step 2:** Thêm trust row + section “How we help” (3 mục) nếu chưa đủ.
- [ ] **Step 3:** Rà `data-aos` — với `prefers-reduced-motion` có thể tắt init trong `App.jsx` (optional task nhỏ).

- [ ] **Step 4:** Commit

### Task 6.2: Public layout & bugfix menu

**Files:**
- Modify: `src/containers/public/Public.jsx`

- [ ] **Step 1:** Sửa `onClick={() => dispatch.actions.toggleMenuMobie(false)}` → `dispatch(actions.toggleMenuMobie(false))` (import `actions` đúng).
- [ ] **Step 2:** Cùng pattern cho `NavLink` trong drawer (mọi chỗ `dispatch.actions`).

- [ ] **Step 3:** Tinh giản FAB (màu gradient vàng) theo palette neutral + primary nếu spec “premium”.

- [ ] **Step 4:** Commit

---

## Chunk 7: Footer

### Task 7.1: Footer sạch hơn

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1:** Partner strip: bỏ `bg-fixed` nếu gây jank; giảm chiều cao cố định 400px nếu không cần.
- [ ] **Step 2:** CTA “contact now” → tiếng Việt + class button theo design system.
- [ ] **Step 3:** Kiểm tra contrast chữ trên nền `#051230`.

- [ ] **Step 4:** Commit

---

## Chunk 8: News, About, Contact

### Task 8.1: Áp typography & spacing

**Files:**
- Modify: `src/containers/public/News.jsx`, `NewsDetail.jsx`, `AboutUs.jsx`, `Contact.jsx`

- [ ] **Step 1:** Container `max-w-[1200px]`, padding `px-4 md:px-8`, heading scale theo spec.
- [ ] **Step 2:** Sửa lỗi typo nếu gặp (ví dụ `` trong `TimKiem.jsx` tabs) — ngoài scope trang nhưng nên sửa khi chạm file.

- [ ] **Step 3:** Commit

---

## Chunk 9: System pages (Account / Cart / Pay)

### Task 9.1: Đồng bộ UI

**Files:**
- Modify: `src/containers/system/Cart.jsx`, `Pay.jsx`, `Account.jsx`, và các con tùy cấu trúc

- [ ] **Step 1:** Cart empty state + CTA “Tiếp tục mua sắm” → `/products`.
- [ ] **Step 2:** Summary sticky mobile-friendly; nút ≥ 44px height.
- [ ] **Step 3:** Pay steps: heading rõ từng bước (nếu flow hiện tại một trang thì chỉ cần section headings).

- [ ] **Step 4:** Commit

---

## Chunk 10: Pagination & polish

### Task 10.1: PageBar

**Files:**
- Modify: `src/components/PageBar.jsx`

- [ ] **Step 1:** Pill hoặc border nhẹ, focus ring, current page contrast.

- [ ] **Step 2:** Commit

### Task 10.2: Auth pages (Login / Register)

**Files:**
- Modify: `src/containers/auth/Login.jsx`, `Register.jsx`

- [ ] **Step 1:** Card form căn giữa, input/button theo token; link quên mật khẩu nếu có.

- [ ] **Step 2:** Commit

---

## Verification cuối (bắt buộc trước khi merge)

Chạy từ root repo:

```bash
cd D:/elevator/elevator_vietphat_react
yarn lint
yarn build
```

**Kỳ vọng:** `eslint` exit 0; `vite build` thành công, không lỗi compile.

**Kiểm tra tay (smoke):**
- [ ] `/` hero CTA → `/products`
- [ ] Search → `/products?q=...` và danh sách đúng
- [ ] Filter chip + mobile drawer
- [ ] `/products/detail/:slug` mở modal báo giá, ESC đóng
- [ ] Cart empty + có item → Pay không vỡ layout

---

## Plan review loop (khuyến nghị)

Sau mỗi Chunk 1–4 và 5–7: chạy reviewer (plan-document-reviewer) so với spec; sửa plan nếu phát hiện mismatch scope (ví dụ TimKiem vs Products-only search).

---

**Plan complete and saved to `docs/superpowers/plans/2026-03-25-redesign-ui-implementation.md`. Ready to execute?**

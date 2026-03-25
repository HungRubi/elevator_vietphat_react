# Spec thiết kế UI/UX — Redesign “Việt Phát” (Catalog-first)

Ngày: 2026-03-25  
Phạm vi: Frontend (Vite + React + React Router), UI/UX, design system, responsive, interaction states  
Mục tiêu kinh doanh chính: Duyệt catalog → tìm/lọc → xem chi tiết → liên hệ/báo giá (tối ưu trải nghiệm duyệt & chuyển đổi tư vấn)

---

## 1) Mục tiêu & nguyên tắc

### Mục tiêu UX
- Rõ ràng, nhanh, dễ dùng; giảm ma sát trong hành trình duyệt → quyết định → liên hệ.
- Giảm “visual clutter”: hạn chế box/card nặng, đổ bóng dày, skew/decoration không phục vụ đọc hiểu.
- Tăng tính “premium SaaS”: whitespace, typography, hierarchy, micro-interactions tinh tế.
- A11y: ưu tiên tương phản tốt, focus states rõ, target chạm đủ lớn trên mobile.

### Nguyên tắc thiết kế
- Minimal, professional, product-focused.
- Dùng **spacing/typography/alignment** thay vì viền dày, nền xám đậm, hoặc container chồng lớp.
- Bảng màu giới hạn: **Primary** (xanh thương hiệu) + **neutral** (slate/gray).
- Hệ thống hoá component (Button/Input/Chip/Link/Modal/Skeleton) để nhất quán.

---

## 2) IA (Information Architecture) & navigation

### Global navigation (header)
- Trang chủ
- Sản phẩm
- Tin tức
- Về chúng tôi
- Liên hệ

### Global actions (header right)
- Search (desktop: inline; mobile: full-screen overlay)
- Cart (nếu còn e-commerce)
- Account/avatar menu

### User flow chính (catalog-first)
1. Home → CTA “Xem sản phẩm” hoặc Search nhanh
2. Products (List) → tìm/lọc theo danh mục → duyệt grid
3. Product Detail → xem ảnh & thông tin cốt lõi → CTA “Nhận báo giá / Liên hệ”

### User flow phụ (để thống nhất hành vi header)
- **Search**
  - Từ header (desktop inline / mobile overlay) → submit → điều hướng sang trang `Products` với query trên URL (ví dụ `?q=...`) để có thể share link và back/forward mượt.
  - Empty query: không submit, hiển thị hint “Nhập từ khoá”.
  - Không có kết quả: empty state + gợi ý đổi từ khoá / xoá lọc.
- **Cart → Checkout/Pay** (nếu còn e-commerce)
  - Header cart → Cart page → Pay page → Payment return.
  - CTA chính ở Cart: “Tiếp tục thanh toán”.
- **Account**
  - Avatar menu → đăng nhập/đăng ký (nếu chưa login) hoặc profile/orders/voucher (nếu đã login).

---

## 3) Layout blueprint theo trang (high-fidelity)

### 3.1 Home (Landing + dẫn vào catalog)

#### Header (sticky, slim)
- Trạng thái mặc định: nền trắng/near-white trong suốt nhẹ, blur nhẹ, border hairline.
- Trạng thái scrolled: tăng opacity, thêm shadow nhẹ (không dày) để tách lớp.

#### Hero (open, “breathable”, tránh boxed UI)
- H1 rõ ràng (giá trị + ngành hàng), 1–2 dòng subcopy.
- CTA:
  - Primary: “Xem sản phẩm”
  - Secondary: “Nhận tư vấn / Liên hệ”
- Trust row (text-first): “Bảo hành” · “Giao hàng” · “Hỗ trợ”

#### Featured categories + sản phẩm nổi bật
- Chips dạng pill (4–8 danh mục nổi bật).
- Grid sản phẩm: ưu tiên ảnh + tên + 1 dòng thuộc tính/miêu tả ngắn; tránh “card” nặng.

#### “How we help” (3 bullets)
- Dạng editorial: heading nhỏ + mô tả 1–2 dòng, không dùng icon rườm rà.

#### CTA cuối trang (1 khối)
- Mục tiêu: chuyển đổi lead nhanh.
- Form tối thiểu: Tên + SĐT (hoặc Email) + nhu cầu (optional).
- Thể hiện chính sách phản hồi “trong 24h” để tăng trust.

---

### 3.2 Products (List) — trang trọng tâm

#### Header section
- Title + breadcrumb nhẹ.
- Search input “prominent” (cao ~44–48px), focus ring rõ.
- Filter chips theo category (scrollable trên mobile).
- Sort dropdown (tuỳ chọn): “Mới nhất”, “Giá tăng/giảm”, “Phổ biến”.

#### Filter model (responsive)
- Desktop: chips + sort ngay trên grid. Tránh sidebar box cố định (cảm giác “nặng” và chia cắt).
- Mobile: nút “Bộ lọc” mở drawer/bottom-sheet; chips vẫn có thể hiện top.

#### Grid system
- Desktop: 3–4 cột; Tablet: 2 cột; Mobile: 1 cột.
- Item style:
  - Nền trong/near-white, border hairline hoặc không border.
  - Hover: nâng rất nhẹ (translate 1px) + tăng contrast title/link.
  - Thumbnail giữ tỉ lệ, tránh crop phá sản phẩm.

#### Pagination / infinite
- Ưu tiên pagination rõ ràng (đã có `PageBar`), thiết kế lại theo design system.

#### Empty / Loading / Error
- Loading: skeleton grid (không spinner đơn lẻ).
- Empty: message + action “Xoá bộ lọc”.
- Error: thông báo ngắn + nút “Thử lại”.

---

### 3.3 Product Detail — tối ưu “Nhận báo giá”

#### Above-the-fold
- Layout desktop 2 cột (gallery | info), mobile 1 cột.
- Nội dung cốt lõi:
  - H1: tên sản phẩm
  - Mô tả ngắn (1–2 đoạn ngắn)
  - 2–4 bullet thuộc tính nổi bật (nếu có dữ liệu)
- CTA hierarchy:
  - Primary: “Nhận báo giá” (mở modal form ngắn)
  - Secondary: “Gọi ngay”, “Gửi email”
  - Tertiary: “Thêm giỏ” / “Mua ngay” (nếu còn)

#### Nội dung chi tiết
- Sections mở, typography-first (không nền xám to).
- Anchor links (optional): “Mô tả”, “Thông số”, “Đánh giá”, “Sản phẩm liên quan”.

#### Social proof (Đánh giá)
- Tóm tắt rating gọn.
- Filter sao bằng chips (pill).
- Giảm khối nền xám/green lớn; ưu tiên readability.

#### Related products
- Grid nhỏ 6–8 item, dựa category.

---

### 3.4 Tin tức (News) — listing + detail

#### News listing
- Mục tiêu: đọc nhanh, chọn bài liên quan, tăng trust.
- Layout:
  - Header: title + search bài viết (optional) / filter tag (optional).
  - Grid 1–3 cột tuỳ màn hình, item thiên về typography (title + excerpt) và thumbnail đồng nhất tỉ lệ.
- States:
  - Loading: skeleton list
  - Empty: “Chưa có bài viết” + link về Home/Products

#### News detail
- Typography-first: max-width đọc thoải mái, line-height lớn.
- “Related articles” cuối bài (3–6 items).

---

### 3.5 Về chúng tôi (About)
- Mục tiêu: củng cố niềm tin, trả lời “Vì sao chọn Việt Phát?”.
- Layout gợi ý:
  - Hero ngắn (H1 + value props)
  - 3–5 bullet “Cam kết”
  - Timeline/Stats (text-first)
  - CTA: “Nhận tư vấn” / “Liên hệ”

---

### 3.6 Liên hệ (Contact)
- Mục tiêu: chuyển đổi lead nhanh (ít bước).
- Layout:
  - Form (tối thiểu): Họ tên, SĐT, nhu cầu (optional)
  - Thông tin liên hệ (địa chỉ/điện thoại/email) dạng list rõ ràng
  - Bản đồ (optional) nhưng không chiếm ưu thế
- States:
  - Validation inline
  - Submit loading
  - Success: message rõ + hành động tiếp theo (gọi hotline / về sản phẩm)

---

### 3.7 Account/Cart/Pay (key pages phụ)

#### Account (Profile / Orders / Voucher / Notifications)
- Mục tiêu: self-service rõ ràng, tối thiểu hoá thao tác.
- IA con:
  - Profile (thông tin cá nhân)
  - Orders (danh sách → chi tiết)
  - Voucher
  - Notifications (nếu có)
- Layout:
  - Mobile: tab/segmented control
  - Desktop: subnav gọn (không sidebar box nặng), nội dung typography-first.

#### Cart
- Empty state: “Giỏ hàng trống” + CTA “Tiếp tục mua sắm”.
- Non-empty:
  - Line items: ảnh nhỏ + tên + qty + giá (gọn, căn lề tốt)
  - Summary: tổng tiền + CTA “Tiếp tục thanh toán”
  - Loading: khi update qty/ remove, disable row + mini-skeleton

#### Pay / Checkout (nếu còn e-commerce)
- Step clarity:
  - Bước 1: Thông tin nhận hàng
  - Bước 2: Phương thức thanh toán
  - Bước 3: Xác nhận
- Error handling:
  - Lỗi thanh toán: thông báo rõ + CTA “Thử lại” / “Đổi phương thức”

---

## 4) Design system (tokens + components)

### 4.1 Color palette (đề xuất)
- Primary: `#2F904B` (giữ brand)
- Neutrals: `slate-900/700/600/500/200/100` (hoặc tương đương Tailwind)
- Background:
  - Page: `#FFFFFF` hoặc `#F8FAFC` (near-white), **tránh** xám #f3f3f3 toàn trang.

Yêu cầu WCAG:
- Text/body vs background: ≥ 4.5:1
- Focus ring phải nhìn rõ trên cả nền trắng và nền primary.

Approved pairings (quy tắc sử dụng để tránh lỗi contrast):
- Body text: `slate-900` trên `#FFFFFF` / `#F8FAFC` (mặc định)
- Muted text: `slate-600` trên `#FFFFFF` / `#F8FAFC` (không dùng cho text nhỏ nếu thiếu contrast)
- Primary button: nền `#2F904B` + chữ trắng; **chỉ dùng** khi đạt contrast, nếu không đạt thì tăng shade (đậm hơn) cho nền.
- Primary text/link: chỉ dùng cho **link/CTA/heading** hoặc size lớn; body text dài không dùng màu primary.

### 4.2 Typography
- Font stack: `Be Vietnam Pro`, `Inter` (đã có).
- Heading hierarchy:
  - H1: 40–48, weight 700–800, tracking nhẹ
  - H2: 28–32, weight 700–800
  - H3: 20–22, weight 600–700
  - Body: 14–16, line-height 1.6–1.8
- Nội dung dài: max-width khoảng 60–75 ký tự/line (giảm mỏi mắt).

### 4.3 Spacing & layout
- Spacing scale: 4/8/12/16/24/32/48/64
- Container: max-w ~1200px, padding responsive (4 → 8).
- Section rhythm: mỗi section có top/bottom padding rõ, “smooth transitions” giữa section (dùng background subtle, không dùng box).

### 4.4 Component spec (API/UI states)

#### Buttons
- Variants: primary / secondary / ghost / danger (nếu cần)
- Size: sm/md/lg (hit area ≥ 44px trên mobile)
- States:
  - hover: tăng contrast, shadow rất nhẹ
  - active: translateY 1px
  - disabled: giảm opacity + cursor-not-allowed
  - loading: giữ width, hiển thị spinner + `aria-busy="true"`

#### Inputs
- Label + hint + error text
- Focus: ring rõ (không chỉ đổi border)
- Disabled: nền neutral nhẹ, text vẫn readable

#### Chips (filters)
- Idle: neutral text, background trong
- Active: background neutral/white + border/contrast rõ + font-semibold
- Focus: ring

#### Link
- Dạng text link: hover underline + tăng contrast

#### Modal (Báo giá)
- Title rõ, đóng dễ, trap focus, ESC đóng
- Form tối thiểu:
  - Họ tên (required)
  - SĐT (required)
  - Ghi chú (optional)
  - Auto-attach: tên sản phẩm / slug (readonly)

#### Skeleton/loading
- Skeleton line/thumbnail cho grid, không lạm dụng spinner.

---

## 5) Interaction states cần thể hiện (theo yêu cầu output)

### Hover/Active/Focus
- Nav links: hover nền nhẹ + underline tuỳ chỗ, focus ring luôn có.
- Product item: hover nâng nhẹ + title đổi màu primary (không quá gắt).
- CTA primary: hover tăng sáng nhẹ, active “press”.

### Loading
- Products list: skeleton grid + pagination disabled.
- Product detail: skeleton cho gallery + title/price/CTA.
- Form submit: nút loading + disable input, toast/inline success.

### Empty / Error
- Empty list: message + “Xoá bộ lọc”.
- Error fetch: message ngắn + “Thử lại”.

---

## 6) Responsive rules (desktop ↔ mobile)
- Header:
  - Desktop: nav inline, search inline
  - Mobile: hamburger + search overlay
- Products:
  - Mobile ưu tiên scroll dọc; filter drawer; chips có thể scroll ngang.
- Typography:
  - H1/H2 giảm size hợp lý trên mobile, giữ line-height thoải mái.

---

## 6.1 Motion (micro-interactions) & reduced motion
- Duration gợi ý: 150–250ms; easing “ease-out”.
- Không animate quá nhiều thuộc tính cùng lúc; ưu tiên opacity/transform nhẹ.
- `prefers-reduced-motion: reduce`: tắt translate/scroll animation mạnh; vẫn giữ focus/contrast states.

---

## 7) Mapping vào code hiện tại (tác động chính)

Các khu vực cần chỉnh lớn (không implement ở bước spec):
- `src/index.css`: giảm/loại bỏ các lớp “decorative” (skew/shadow dày, nền xám toàn trang), chuyển về tokens & utilities.
- `HeaderBar`/menu mobile overlay: chuẩn hoá states, focus ring, click-outside, giảm opacity nặng.
- `Products.jsx`: bỏ sidebar categories cứng, thay bằng top filters (chips + drawer mobile).
- `ProductDetail.jsx`: tái cấu trúc hierarchy nội dung + CTA “Nhận báo giá” + giảm mảng nền/box cứng.
- `Footer.jsx`: giảm ảnh nền fixed nặng; chuyển sang footer “trust + links” clean, vẫn giữ partner strip nếu cần nhưng gọn.

---

## 8) Definition of Done (thiết kế)
- Home/Products/ProductDetail đạt:
  - Visual hierarchy rõ (H1/H2/H3, spacing rhythm)
  - Ít card/box nặng; cảm giác mở, thoáng
  - CTA rõ (đặc biệt trên Product Detail)
  - States: hover/active/focus/loading/empty/error
  - Responsive ổn trên mobile
  - A11y: focus visible, contrast đạt, aria cho trạng thái loading/modal


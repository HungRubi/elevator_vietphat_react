# Mobile Header/Menu/Search Redesign (A2) — Design

**Mục tiêu:** Thiết kế lại 100% phần header + menu mobile + thanh tìm kiếm mobile theo hướng **chuyên nghiệp**, **1 tay**, **phẳng + viền mảnh**, bo góc vừa phải.

**In-scope:**
- Mobile header (≤ `sm`): topbar + actions + trạng thái đăng nhập
- Mobile menu: full-screen sheet, có điều hướng theo `menuBar` + subMenu dạng accordion
- Mobile search: “dock” cố định dưới (A2), mở search sheet (input + gợi ý nhanh), điều hướng sang `/products?q=...`

**Out-of-scope:**
- Desktop header (≥ `sm`) giữ logic hiện tại (có thể chỉnh nhẹ để đồng bộ style nếu cần, nhưng không bắt buộc)
- Thay đổi API/search backend

---

## IA & Flow

### 1) Topbar (mobile)
- **Left:** nút Menu (hamburger) mở **Menu Sheet**
- **Center:** logo/text “VIỆT PHÁT” (tap → `/`)
- **Right:** actions:
  - Bell: mở dropdown notification (giữ behavior hiện có)
  - Cart: link `/cart` + badge số lượng
  - Account: mở account sheet nhỏ hoặc điều hướng `/login` nếu chưa đăng nhập (tối thiểu: giữ dropdown hiện có)

### 2) Search Dock (mobile)
- Dock fixed bottom (không che nội dung quan trọng; đảm bảo có padding bottom cho page nếu cần).
- Tap dock → mở **Search Sheet**:
  - Input (auto focus)
  - Chips gợi ý (ví dụ: “Sản phẩm”, “Danh mục”, “Tin tức”) hoặc recent (tối giản)
  - Submit → dispatch `querySite(q)` + navigate `/products?q=...`

### 3) Menu Sheet (mobile)
- Fullscreen overlay, đóng bằng:
  - nút Close
  - tap nền
  - ESC (optional)
- Nội dung:
  - Header: logo + close
  - Danh sách item từ `menuBar`
  - Submenu dạng accordion (tap mở/đóng)
  - Footer: link nhanh (Cart/Account/Hotline) (optional)

---

## Style Tokens (mobile)
- **Tone:** phẳng, viền mảnh, shadow rất nhẹ hoặc không shadow.
- **Rounded:** 10–14px (icon 10px, input 12px, sheet 12–14px).
- **Borders:** `border-slate-200/70` (light) + trạng thái active `border-emerald-500/40`.
- **Typography:** title đậm, label nhỏ uppercase cho section.

---

## Success Criteria
- Badge cart cập nhật đúng theo `productCart.length`.
- Menu & search hoạt động 1 tay, đóng/mở mượt, không giật layout.
- Không còn overlay menu cũ trong `Public.jsx` (tránh double overlay).
- `yarn lint` không error, `yarn build` pass.


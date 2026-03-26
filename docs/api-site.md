# API Site (`/` — mount tại root trong `index.route.js`)

Các route công khai: trang chủ, tìm kiếm, VNPay. **Không** ghi CSDL trong controller này; `POST /create-payment-url` chỉ tạo URL thanh toán (theo policy hiện tại **không bắt buộc** `verifyTokenAdmin`), nhưng cần **rate limit** + kiểm tra số tiền.

## Rate limit

| Biến môi trường | Mặc định | Áp dụng |
|-----------------|----------|---------|
| `RATE_LIMIT_SITE_HOME_PER_MINUTE` | 120 | `GET /home` |
| `RATE_LIMIT_SITE_SEARCH_PER_MINUTE` | 60 | `GET /timkiem` |
| `RATE_LIMIT_SITE_PAYMENT_URL_PER_MINUTE` | 30 | `POST /create-payment-url` |
| `RATE_LIMIT_SITE_VNP_CALLBACK_PER_MINUTE` | 120 | `GET /check_payment`, `GET /vnpay/return` |

## `GET /home`

Trả về block:

- video (3)
- sản phẩm theo 4 danh mục cố định (mỗi loại tối đa 8)
- bài viết (2)
- banner public (3)

Gợi ý: dùng `.lean()` cho nhất quán.

## `GET /timkiem`

- **Từ khóa**: `s`, hoặc `timkiem`, hoặc `q`
  - Tối thiểu **2** ký tự; ngắn hơn → mảng rỗng + `totals` 0.
- **Tránh ReDoS / regex nguy hiểm**: ký tự đặc biệt trong từ khóa được escape trước khi `$regex`.
- **Phân trang**: theo `listQuery.util`
  - `page` / `offset`
  - `limit` (max 100)
  - `sort` (`createdAt`)
  - `order`
  - legacy: `site=asc` / `site=desc` (cùng quy ước các controller khác)
- **Response**:
  - `product`, `video`, `article` (article có thêm `dateFormat`)
  - `totals` (tổng khớp filter, không chỉ trang hiện tại)
  - `page`, `limit`, `offset`

## `POST /create-payment-url`

- Body: `amount` (số VND).
- Validate: **1000 ≤ amount ≤ 500_000_000**
- Env bắt buộc:
  - `VNP_TMN_CODE`
  - `VNP_HASH_SECRET` (dùng `.trim()` khi ký)
  - `VNP_URL`
  - `VNP_RETURN_URL`

## `GET /check_payment`

- Verify chữ ký VNPay
- Thiếu `?query` → **400**
- Chữ ký sai → **400** (trước đây 404)
- Thất bại thanh toán vẫn **200** + `data` query (để client đọc mã lỗi)

## `GET /vnpay/return`

Redirect về:

- `FRONTEND_URL` hoặc
- `VNP_PAYMENT_REDIRECT_BASE` (fallback `http://localhost:4000`)

Path redirect: `/payment-result?...`

Query redirect có `encodeURIComponent` cho `orderId` / `amount`.

## Sửa lỗi đã gặp

- Ký tự **`s`** thừa giữa hai method (lỗi cú pháp class).
- `querySearch`: không trả `res.json(error)`; không trả toàn bộ kết quả khi `s` rỗng.


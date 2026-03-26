# API Notification (`/notification`)

Tuân thủ `AGENTS.md`:

| Route | Middleware | Ghi chú |
|------|------------|---------|
| POST `/add`, GET `/`, `/filter`, `GET/PUT/DELETE /:id` | `verifyTokenStaff` | Quản trị |
| PUT `/read/:id`, GET `/all/:id` | `verifyToken` | Khách: **chỉ dữ liệu của chính user** |

## Rate limit

| Env | Mặc định | Áp dụng |
|-----|----------|---------|
| `RATE_LIMIT_NOTIFICATION_CUSTOMER_PER_MINUTE` | 90 | PUT `/read/:id`, GET `/all/:id` |
| `RATE_LIMIT_NOTIFICATION_STAFF_PER_MINUTE` | 120 | Mọi route staff |

## `listQuery.util`

`page` / `offset`, `limit` (max 100), `sort`, `order`, `timkiem` / `q`.  
Legacy: `notification=desc` / `notification=asc`.

Sort cho phép: `createdAt`, `updatedAt`, `type`, `message`, `isRead`.

## Sửa lỗi nghiêm trọng (đã vá phía backend)

- `POST /add`: không còn lưu trùng 2 document; `message` bắt buộc; `type` theo enum; `user_id` optional.
- `PUT /:id`: update có `$set/$unset` whitelist.
- Không tìm thấy trả 404.
- IDOR:
  - `GET /all/:id`: `:id` phải trùng `req.user.id`.
  - `PUT /read/:id`: chỉ cho phép nếu `notification.user_id` trùng JWT; notification hệ thống không cho đánh dấu đọc qua endpoint này.
- `PUT /read/:id`: không tin `user_id` trong body; dùng `req.user.id`.
- `GET /filter` / `GET /`: thêm phân trang + search hợp lệ (type enum, message regex).

## Breaking / thay đổi response

- `GET /` thêm meta: `total`, `page`, `limit`, `offset`, `currentNotification` và alias `sortNotification`.
- `GET /all/:id` thêm meta phân trang; **403** nếu lệch user.
- `PUT /read/:id` **403** nếu không phải thông báo cá nhân của user.


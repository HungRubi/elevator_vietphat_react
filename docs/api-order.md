# API Orders (`/order`)

## Quy tắc (AGENTS)

- **Staff** (`verifyTokenStaff`): danh sách, filter, biểu đồ, `GET /:id`, `PUT /:id`, `PUT /admin/:id`, `DELETE /:id`, `GET /details/:id`, `GET /add`.
- **Customer + token** (`verifyToken`): **`POST /store`** — `user_id` phải khớp JWT trừ khi staff đặt hộ (theo controller).

## Rate limit

| Env | Mặc định | Áp dụng |
|-----|----------|---------|
| `RATE_LIMIT_ORDER_STORE_PER_MINUTE` | 30 | `POST /store` |
| `RATE_LIMIT_ORDER_STAFF_PER_MINUTE` | 120 | Mọi route staff |

## List / filter — `listQuery.util`

Tham số: `page`, `offset`, `limit` (max 100), `sort`, `order`, `timkiem` / `q`.

- **`GET /`**: tìm `order_code` (regex); sort whitelist: `createdAt`, `updatedAt`, `order_date`, `total_price`, `status`, `order_code`, `payment_method`. Default `limit=10`, `createdAt` desc.\n- **`GET /filter`**: lọc `status`, `payment_method`, `from_date`/`to_date` (`order_date`), cộng tìm `order_code` qua `timkiem`/`q`; cùng sort/limit.

**Lưu ý:** `order=desc/asc` theo chuẩn `listQuery` (desc = mới nhất trước với `createdAt`).

## Sửa lỗi / an toàn (backend)

1. **`DELETE /:id`**: lấy chi tiết trước, hoàn kho đúng điều kiện, rồi xóa.\n2. **`PUT /:id`**: whitelist field; notification khi đổi status; không tin `userId` trong body.\n3. **`PUT /admin/:id`**: `$set` field cho phép.\n4. **`GET /:id`**: 404 nếu không có; bỏ gửi notification trên GET.\n5. **`POST /store`**: `items` phải là mảng không rỗng; thông báo admin dùng `Promise.all`.\n6. **`GET /add`**: giới hạn 500 sản phẩm.\n7. **`GET /details/:id`**: trả JSON `{ order, orderDetailsFormat }` (không render view).

## Response `GET /` thêm

`total`, `page`, `limit`, `offset`, `searchOrder` khi có tìm kiếm.


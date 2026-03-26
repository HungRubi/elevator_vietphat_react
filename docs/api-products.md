# API Products (`/products`)

## Quy tắc

- **Ghi dữ liệu** (`POST /store`, `PUT /:id`, `DELETE /:id`): `verifyTokenStaff` (admin + employee).
- **Đọc công khai**: `GET /`, `GET /filter`, `GET /fe/:slug`, `POST /selected` không yêu cầu token; có **rate limit**.

## Rate limit

| Env | Mặc định | Áp dụng |
|-----|----------|---------|
| `RATE_LIMIT_PRODUCTS_PUBLIC_PER_MINUTE` | 120 | GET `/`, `/filter`, `/fe/:slug` và nhóm public chung cho `POST /selected` |
| `RATE_LIMIT_PRODUCTS_SELECTED_PER_MINUTE` | 60 | `POST /selected` (lớp hẹp hơn) |

## `listQuery.util`

- **Query**: `page` / `offset`, `limit` (max 100), `sort`, `order`, `timkiem` / `q`
- **Legacy**: `product=desc` / `product=asc` (đã hỗ trợ trong `listQuery.util`)

## Endpoint

### `GET /products/admin` (staff)

- Danh sách quản trị: phân trang, tìm theo `name`
- Sort whitelist: `name`, `createdAt`, `updatedAt`, `price`, `sale`, `minimum`, `slug`
- Response:
  - `data.productFormat`
  - `data.total`, `data.totalPage`, `data.page`, `data.limit`, `data.offset`, ...

### `GET /products` (public)

- Default `limit=12`
- Sort `createdAt` desc
- Có thể tìm theo `name`
- Response `data` thêm meta: `total`, `page`, `limit`, `offset`

### `GET /products/filter` (public)

- Lọc theo `category`
- Lọc ngày theo `startDate` / `endDate` (field `createdAt`)
- Tìm theo `name` qua `timkiem` / `q`
- Phân trang đầy đủ

### `GET /products/fe/:slug` (public)

- 404 nếu không có `slug`
- Hỗ trợ gợi ý `$sample` qua `limit_suggest`
  - Default 8, max 20
- **Fix**: `formatComments[].lastUpdate` dùng `comment.updatedAt` (không nhầm `product.updatedAt`)
- Response bọc trong `data` (đồng bộ với edit)

### `POST /products/selected` (public)

- Body: `productId`: **mảng** ObjectId, tối đa **50**
- Toàn bộ id phải hợp lệ
- Response: `product` (mảng lean + populate)

### `GET /products/:id` (staff)

- 404 nếu không có sản phẩm
- Danh mục kèm tối đa **500** bản ghi

### `PUT /products/:id` / `DELETE /:id` (staff)

- Không mass assignment: chỉ field trong whitelist
- `PUT`: đổi `name` → tự **tạo lại `slug`**
- `DELETE`: **404** nếu không có bản ghi
- Lỗi server trả **500** (không dùng 404 cho lỗi nội bộ)

### `POST /products/store` (staff)

- Lỗi trả **500**

## Breaking / thay đổi

- `GET /` và `GET /filter`: thêm meta phân trang
- `getProduct` response lỗi là object `{ message }` thay vì raw error
- `POST /selected`: bắt buộc `productId` là mảng, giới hạn 50
- `GET /fe/:slug`: `data` bọc trong `data`, thêm `limit_suggest`


# API Comment (`/comment`)

Mount: `app.use('/comment', …)`.

Tuân thủ `AGENTS.md`:

- **POST `/add`**: ghi dữ liệu với **`verifyToken`** (customer) + **`user_id` trong body phải trùng `id` trong JWT** (chống IDOR).
- **GET `/filter`**, **GET `/all`**: đọc quản trị với **`verifyTokenStaff`** (admin + employee — cùng quy ước CMS với bài viết).

## `listQuery.util`

Tham số: `page` / `offset`, `limit` (max 100), `sort`, `order`, `timkiem` / `q`.  
Legacy sort: **`comment=desc`** / **`comment=asc`**.

Sort cho phép: `createdAt`, `updatedAt`, `star`, `quality`, `message`.

## Rate limit

| Biến môi trường | Mặc định | Áp dụng |
|-----------------|----------|---------|
| `RATE_LIMIT_COMMENT_ADD_PER_MINUTE` | 45 | POST `/add` |
| `RATE_LIMIT_COMMENT_STAFF_PER_MINUTE` | 120 | GET `/filter`, `/all` |

## `GET /comment/all` (staff)

- Tìm kiếm `timkiem`/`q`: lọc theo **tên sản phẩm** (query `Product`, sau đó `Comments` có `product_id` trùng).
- Phân trang: `total`, `totalPage`, `page`, `limit`, `offset`.
- Response: `comment`, `searchType`, `searchComment` (khi có tìm kiếm), `currentSort`, `currentOrder`.

## `GET /comment/filter` (staff)

- Lọc `star`, `startDate`/`endDate` trên **`createdAt`**.
- Tìm `timkiem`/`q` trên **`message`** (regex).
- Phân trang đầy đủ như trên.

## `POST /comment/add` (customer + token)

- Bắt buộc **`user_id` === JWT `id`**.
- `product_id`: một id hoặc mảng id (schema là mảng); ít nhất một id hợp lệ và tồn tại trong `Product`.
- `star`: số 1–5.
- `img`: mảng hoặc một phần tử; an toàn khi `img` undefined.

## Breaking / thay đổi hành vi

- **GET `/filter`**: có thêm meta phân trang (trước chỉ có `comment` toàn bộ).
- Search theo tên SP trên `/all` không còn dùng `populate` + `match`.


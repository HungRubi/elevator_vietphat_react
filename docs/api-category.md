# API Category (`/category`)

Mount: `app.use('/category', …)`.

## Public (đọc)

Các route dùng cho storefront / lọc sản phẩm theo danh mục; không ghi CSDL trong các endpoint chỉ đọc này (theo controller **category**).

### `GET /category/product/all`

- Trả danh sách danh mục dùng cho menu / filter.
- Response (frontend hiện dùng): `{ category: [...] }`.

### `GET /category/product/get-product/:id`

- `:id`: MongoDB id của **danh mục**.
- Trả sản phẩm thuộc danh mục đó; có thể kèm meta phân trang (`total`, `totalPage`, `page`, `limit`, `offset`, …) tùy backend.
- Frontend map vào `productsSlice.fetchProductsByCategory`: `products`, `totalPage`, …

## Ghi chú

- Route **staff** (CRUD danh mục) nếu có trên server: dùng `verifyTokenStaff`; khi bạn bổ sung màn CMS, thêm thunk tương ứng trong slice (giống `products` / `notificationStaff`).

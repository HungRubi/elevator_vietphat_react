# Migration Redux → Redux Toolkit (RTK)

## Mục tiêu

- Bỏ `redux-thunk` trực tiếp; dùng **`configureStore`** (đã gắn thunk mặc định).
- Tách logic theo **slice** (ví dụ `authSlice`); giữ `app` / `user` tạm thời dạng reducer cổ điển cho đến khi migrate dần.
- **Loading / error**: ưu tiên trạng thái theo luồng (login, register, đổi mật khẩu) trong slice tương ứng; vẫn đồng bộ `message` / toast qua `app` khi cần.
- **Không dùng `redux-persist`**: refresh token chỉ qua cookie HttpOnly; `accessToken` lưu `localStorage` (`util/token.js`); hồ sơ user khôi phục bằng **`GET /auth/me`** khi mở app (`bootstrapAuthSession`).

## Tiến độ

| Hạng mục | Trạng thái |
|----------|------------|
| `configureStore`, bỏ `createStore` + `redux-thunk` package | Hoàn thành |
| Slice `auth` (`login` / `register` / `changePassword`) + loading/error | Hoàn thành |
| `fetchSessionUser` + `bootstrapAuthSession` (`GET /auth/me`) | Hoàn thành |
| Gỡ `redux-persist` (không persist user/cart/…) | Hoàn thành |
| Axios: refresh khi **401** hoặc **403** + message token không hợp lệ | Hoàn thành |
| Chuyển `appReducers` → `appSlice` (createSlice) | Chưa |
| Chuyển `userReducers` → `userSlice` | Chưa |
| Các action async còn lại (`cart`, `order`, …) → `createAsyncThunk` | Chưa |

## Quy ước

- **Slice mới** đặt tại `src/store/slices/`.
- **API** giữ trong `src/apis/`; slice gọi API, không nhúng URL thô vào component.
- Sau khi login thành công vẫn dispatch `LOGIN` + `SET_ACCESS_TOKEN` để `App.jsx` sync `user` như cũ.

## Tham chiếu nhanh

- Auth API: [api-auth.md](./api-auth.md)
- Store entry: `src/redux.js`
- Root reducer: `src/store/reducers/rootReducers.js`

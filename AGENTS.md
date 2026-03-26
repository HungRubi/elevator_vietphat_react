# Hướng dẫn cho agent (Cursor / AI)

## Vibe & phạm vi

- Ưu tiên **thay đổi tối thiểu**, đúng ticket: không refactor rộng khi chỉ sửa một luồng.
- **Không đổi giao diện** trừ khi ticket yêu cầu; giữ className / layout hiện có.
- Trả lời user bằng **tiếng Việt** (theo rule dự án).

## Skills — khi nào dùng

| Tình huống | Skill |
|------------|--------|
| Bug / test fail / hành vi lạ | `systematic-debugging` — trước khi đoán fix |
| Feature / hành vi mới, nhiều hướng thiết kế | `brainstorming` — làm rõ trước code lớn |
| Nhiều bước, có spec rõ | `writing-plans` rồi `executing-plans` / `subagent-driven-development` |
| Trước khi nói “xong / pass” | `verification-before-completion` — chạy lệnh verify, có log |
| React / Next performance | `vercel-react-best-practices` |
| Review UI / a11y | `web-design-guidelines` |

**Luôn** đọc `using-superpowers` khi mở phiên: kiểm tra skill có áp dụng ≥1% không.

## Kiến trúc state (hiện tại)

- Store: Redux Toolkit `configureStore` (`src/redux.js`). **Không** dùng `redux-persist`.
- Reducer: `app`, `user`, `auth` (login/register/password + `sessionResolved` sau `GET /auth/me`).
- `accessToken`: `localStorage` (`util/token.js`) + `user.accessToken` trong Redux; refresh token chỉ cookie HttpOnly.
- Khởi động phiên: `bootstrapAuthSession` → `GET /auth/me` (403 → interceptor refresh + retry).
- Auth HTTP: `src/apis/auth.js`, interceptor `src/axios.js` (`withCredentials`).

## Tài liệu trong repo

- `docs/api-auth.md` — contract `/auth` cho frontend.
- `docs/migration-redux-toolkit.md` — checklist migrate RTK.

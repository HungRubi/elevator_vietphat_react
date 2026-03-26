import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { clearCheckoutStorage } from "../../util/checkoutStorage";
import { clearStoredAccessToken, getStoredAccessToken } from "../../util/token";

export const logoutUser = createAsyncThunk("user/logout", async () => {
    try {
        await axios({
            url: "/auth/logout",
            method: "post",
            withCredentials: true,
        });
    } catch {
        // ignore
    }
    clearStoredAccessToken();
    return true;
});

/** Body hợp lệ: `{ "address": "..." }` — không gửi name/phone qua route này. */
export const updateAddress = createAsyncThunk(
    "user/updateAddress",
    async ({ data, userId }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/user/update/address/${userId}`,
                method: "put",
                data,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Update address failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Update address failed");
        }
    }
);

/** Body: `name`, `email`, `phone`, `birth`, `avatar` (base64 tùy chọn). */
export const updateProfileUser = createAsyncThunk(
    "user/updateProfile",
    async ({ data, userId }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/user/profile/update/${userId}`,
                method: "put",
                data,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Update profile failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Update profile failed");
        }
    }
);

export const getOrderByUser = createAsyncThunk(
    "user/getOrderByUser",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/user/order/${userId}`,
                method: "get",
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Get orders failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Get orders failed");
        }
    }
);

export const updateCart = createAsyncThunk(
    "user/updateCart",
    async ({ data, userId }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/cart/update/${userId}`,
                method: "PUT",
                data,
            });
            if (res?.status === 200) return res.data;
            return rejectWithValue(res?.data ?? { message: "Cập nhật giỏ hàng thất bại. Vui lòng thử lại." });
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? { message: "Cập nhật giỏ hàng thất bại. Vui lòng thử lại." });
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    "user/deleteCartItem",
    async ({ data, userId }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/cart/delete/${userId}`,
                method: "PUT",
                data,
            });
            if (res?.status === 200) return res.data;
            return rejectWithValue(res?.data ?? { message: "Không xóa được sản phẩm khỏi giỏ hàng. Vui lòng thử lại." });
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? { message: "Không xóa được sản phẩm khỏi giỏ hàng. Vui lòng thử lại." });
        }
    }
);

/** Đọc giỏ từ server (F5 / vào thẳng /cart). Backend cần `GET /cart/:userId` trả cùng shape như PUT update (`cart`, `product`) hoặc bổ sung các field này vào `GET /auth/me`. */
export const fetchUserCart = createAsyncThunk(
    "user/fetchCart",
    async (userId, { rejectWithValue }) => {
        if (!userId) return null;
        try {
            const res = await axios({
                url: `/cart/${userId}`,
                method: "get",
            });
            if (res?.status === 200) return res.data;
            return null;
        } catch (err) {
            const st = err?.response?.status;
            if (st === 404 || st === 405) return null;
            return rejectWithValue(err?.response?.data ?? err?.message ?? null);
        }
    }
);

export const addOrder = createAsyncThunk(
    "user/addOrder",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "POST",
                url: "order/store",
                data,
            });
            if (res?.status === 200) return res.data;
            return rejectWithValue(res?.data ?? { message: "Đặt hàng không thành công. Vui lòng thử lại." });
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? { message: "Đặt hàng không thành công. Vui lòng thử lại." });
        }
    }
);

export const updateOrder = createAsyncThunk(
    "user/updateOrder",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "PUT",
                url: `order/${id}`,
                data: {
                    status: data.status,
                },
            });
            if (res?.status === 200) return res.data;
            return rejectWithValue(res?.data ?? { message: "Cập nhật đơn hàng không thành công." });
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? { message: "Cập nhật đơn hàng không thành công." });
        }
    }
);

export const getNotifiByUser = createAsyncThunk(
    "user/getNotifiByUser",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/notification/all/${userId}`,
                method: "get",
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Get notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Get notification failed");
        }
    }
);

export const isReadNotification = createAsyncThunk(
    "user/isReadNotification",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/notification/read/${id}`,
                method: "put",
                data: {},
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Read notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Read notification failed");
        }
    }
);

const initialState = {
    currentUser: null,
    accessToken: getStoredAccessToken(),
    cart: [],
    productCart: [],
    selectedProducts: [],
    quantities: [],
    messageUser: null,
    selectedVoucher: null,
    orders: [],
    myNotifi: [],
    inforOrder: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            const { user, cart, productCart, orders, myNotifi } = action.payload || {};
            state.currentUser = user ?? null;
            state.cart = cart ?? [];
            state.productCart = productCart ?? [];
            state.orders = orders ?? [];
            state.myNotifi = myNotifi ?? [];
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload || null;
        },
        setSelectedProducts: (state, action) => {
            state.selectedProducts = action.payload?.productId ?? action.payload ?? [];
            state.quantities = action.payload?.quantity ?? [];
        },
        selectVoucher: (state, action) => {
            state.selectedVoucher = action.payload ?? null;
            state.messageUser = action.payload ? "Đã áp dụng voucher thành công" : null;
        },
        resetMessageUser: (state) => {
            state.messageUser = null;
        },
        clearCartLocal: (state, action) => {
            const ids = Array.isArray(action.payload) ? action.payload : [];
            if (!ids.length) {
                state.selectedProducts = [];
                state.cart = [];
                state.productCart = [];
                state.selectedVoucher = null;
                return;
            }
            state.selectedProducts = state.selectedProducts.filter(
                (item) => !ids.includes(item.product?._id)
            );
            state.cart = state.cart.filter((item) => !ids.includes(item.product_id));
            state.productCart = state.productCart.filter((item) => !ids.includes(item._id));
            state.selectedVoucher = null;
        },
        setInforOrder: (state, action) => {
            state.inforOrder = action.payload;
        },
        resetInforOrder: (state) => {
            state.inforOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                clearCheckoutStorage();
                state.currentUser = null;
                state.accessToken = null;
                state.cart = [];
                state.productCart = [];
                state.selectedProducts = [];
                state.selectedVoucher = null;
                state.orders = [];
                state.messageUser = null;
                state.myNotifi = null;
                state.inforOrder = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                const p = action.payload;
                if (p && typeof p === "object") {
                    const patch =
                        p.updatedUser ||
                        p.user ||
                        p.data?.updatedUser ||
                        p.data?.user ||
                        null;
                    if (patch && typeof patch === "object") {
                        state.currentUser = { ...(state.currentUser || {}), ...patch };
                    } else {
                        const name = p.name ?? p.data?.name;
                        const phone = p.phone ?? p.data?.phone;
                        const address = p.address ?? p.data?.address;
                        if (name != null || phone != null || address != null) {
                            state.currentUser = {
                                ...(state.currentUser || {}),
                                ...(name != null ? { name } : {}),
                                ...(phone != null ? { phone } : {}),
                                ...(address != null ? { address } : {}),
                            };
                        }
                    }
                    const msg = p.message ?? p.data?.message;
                    state.messageUser =
                        typeof msg === "string" ? msg : msg != null ? String(msg) : state.messageUser;
                }
            })
            .addCase(updateProfileUser.fulfilled, (state, action) => {
                const p = action.payload;
                if (p && typeof p === "object") {
                    const patch =
                        p.user ||
                        p.updatedUser ||
                        p.data?.user ||
                        p.data?.updatedUser ||
                        null;
                    if (patch && typeof patch === "object") {
                        state.currentUser = { ...(state.currentUser || {}), ...patch };
                    }
                    if (!action.meta?.arg?.silent) {
                        const msg = p.message ?? p.data?.message;
                        if (typeof msg === "string") state.messageUser = msg;
                        else if (msg != null) state.messageUser = String(msg);
                    }
                }
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                const raw = action.payload;
                if (raw == null || typeof raw !== "object") return;
                const root = raw.data != null && typeof raw.data === "object" ? raw.data : raw;
                if (Array.isArray(root.cart)) state.cart = root.cart;
                if (Array.isArray(root.product)) state.productCart = root.product;
            })
            .addCase(fetchUserCart.rejected, () => {})
            .addCase(updateCart.fulfilled, (state, action) => {
                if (Array.isArray(action.payload?.cart)) state.cart = action.payload.cart;
                if (Array.isArray(action.payload?.product)) state.productCart = action.payload.product;
                state.messageUser = action.payload?.message || null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.messageUser = action.payload?.message || "Cập nhật giỏ hàng thất bại. Vui lòng thử lại.";
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                if (!action.meta?.arg?.silent) {
                    state.messageUser = action.payload?.message || null;
                }
                if (Array.isArray(action.payload?.cart)) state.cart = action.payload.cart;
                if (Array.isArray(action.payload?.product)) state.productCart = action.payload.product;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.messageUser = action.payload?.message || "Không xóa được sản phẩm khỏi giỏ hàng. Vui lòng thử lại.";
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.orders = action.payload?.orders?.length > 0 ? action.payload.orders : state.orders;
                state.messageUser = action.payload?.message ?? null;
            })
            .addCase(addOrder.rejected, (state, action) => {
                const p = action.payload;
                state.messageUser =
                    (typeof p === "string" ? p : p?.message) ||
                    "Đặt hàng không thành công. Vui lòng thử lại.";
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.messageUser = action.payload?.message || null;
                state.orders = action.payload?.orders || state.orders;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.orders = action.payload?.order || [];
            })
            .addCase(getNotifiByUser.fulfilled, (state, action) => {
                state.myNotifi = action.payload?.myNotifi || [];
            })
            .addCase(isReadNotification.fulfilled, (state, action) => {
                state.myNotifi = action.payload?.myNotifi || [];
            });
    },
});

export const {
    setCurrentUser,
    setAccessToken,
    setSelectedProducts,
    selectVoucher,
    resetMessageUser,
    clearCartLocal,
    setInforOrder,
    resetInforOrder,
} = userSlice.actions;

export default userSlice.reducer;


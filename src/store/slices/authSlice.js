import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { setStoredAccessToken, clearStoredAccessToken, getStoredAccessToken } from "../../util/token";
import { clearAuthErrors as clearUiAuthErrors, setLoginError, setMessage, setRegisterError } from "./uiSlice";
import { logoutUser, setAccessToken, setCurrentUser, fetchUserCart } from "./userSlice";

const extractAccessToken = (responseData) =>
    responseData?.accessToken || responseData?.data?.accessToken || null;

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ credentials, isAdmin }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios({
                url: isAdmin ? "/auth/login/admin" : "/auth/login",
                method: "post",
                data: credentials,
            });
            if (response?.status === 200) {
                const accessToken = extractAccessToken(response.data);
                if (accessToken) {
                    setStoredAccessToken(accessToken);
                    dispatch(setAccessToken(accessToken));
                }
                const payload = response.data || {};
                dispatch(clearUiAuthErrors());
                dispatch(setLoginError(null));
                dispatch(setMessage(payload?.message || "Login successful"));
                dispatch(
                    setCurrentUser({
                        user: payload?.user ?? null,
                        cart: payload?.cart ?? [],
                        productCart: payload?.product ?? [],
                        orders: payload?.orders ?? [],
                        myNotifi: payload?.myNotifi ?? payload?.notification ?? [],
                    })
                );
                return payload;
            }
            const errPayload = response?.data ?? response;
            clearStoredAccessToken();
            dispatch(setAccessToken(null));
            dispatch(setLoginError(errPayload));
            dispatch(setMessage(errPayload));
            return rejectWithValue(errPayload);
        } catch (err) {
            clearStoredAccessToken();
            const payload = err.response?.data || "Đã xảy ra lỗi";
            dispatch(setAccessToken(null));
            dispatch(setLoginError(payload));
            dispatch(setMessage(payload));
            return rejectWithValue(payload);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const requestBody = {
                ...data,
                first: data?.first || data?.frist || "",
                frist: data?.frist || data?.first || "",
            };
            const response = await axios({
                url: "/auth/register",
                method: "post",
                data: requestBody,
            });
            if (response?.status === 200) {
                dispatch(clearUiAuthErrors());
                dispatch(setRegisterError(null));
                dispatch(setMessage(response.data?.message || "Register successful"));
                return response.data;
            }
            dispatch(setRegisterError(response.data));
            dispatch(setMessage(response.data));
            return rejectWithValue(response.data);
        } catch (err) {
            const payload = err.response?.data || "Đã xảy ra lỗi";
            dispatch(setRegisterError(payload));
            dispatch(setMessage(payload));
            return rejectWithValue(payload);
        }
    }
);

/**
 * Khôi phục user khi chỉ còn accessToken (storage).
 * 401/403: axios interceptor thử refresh rồi retry; vẫn lỗi thì xóa phiên.
 */
export const fetchSessionUser = createAsyncThunk(
    "auth/fetchSession",
    async (_, { dispatch, getState, rejectWithValue }) => {
        const token =
            getState().user?.accessToken || getStoredAccessToken();
        if (!token) {
            return null;
        }
        try {
            const response = await axios({
                url: "/auth/me",
                method: "get",
            });
            if (response?.status === 200 && response.data?.user) {
                const d = response.data;
                dispatch(
                    setCurrentUser({
                        user: d.user,
                        cart: d.cart ?? [],
                        productCart: d.product ?? d.productCart ?? [],
                        orders: d.orders ?? [],
                        myNotifi: d.myNotifi ?? d.notification ?? [],
                    })
                );
                const hasCartInPayload =
                    (Array.isArray(d.cart) && d.cart.length > 0) ||
                    (Array.isArray(d.product) && d.product.length > 0) ||
                    (Array.isArray(d.productCart) && d.productCart.length > 0);
                if (d.user?._id && !hasCartInPayload) {
                    dispatch(fetchUserCart(d.user._id));
                }
                return d.user;
            }
            const payload = response?.data ?? "Không tải được hồ sơ";
            return rejectWithValue(payload);
        } catch (err) {
            const status = err.response?.status;
            if (status === 404 || status === 401 || status === 403) {
                clearStoredAccessToken();
                dispatch(setAccessToken(null));
                dispatch(logoutUser());
            }
            return rejectWithValue(err.response?.data || err.message || "Lỗi phiên đăng nhập");
        }
    }
);

export const changePasswordUser = createAsyncThunk(
    "auth/changePassword",
    async ({ userId, body }, { dispatch, rejectWithValue }) => {
        const response = await axios({
            url: `/auth/password/${userId}`,
            method: "PUT",
            data: body,
        });
        if (response?.status === 200) {
            dispatch(setMessage(response.data?.message || "Đổi mật khẩu thành công"));
            return response.data;
        }
        dispatch(setMessage(response.data));
        return rejectWithValue(response.data);
    }
);

const initialState = {
    loginStatus: "idle",
    registerStatus: "idle",
    changePasswordStatus: "idle",
    /** true sau lần bootstrap /auth/me (hoặc khi không có token — không chờ API). */
    sessionResolved: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthForm: (state) => {
            state.loginStatus = "idle";
            state.registerStatus = "idle";
            state.changePasswordStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginStatus = "loading";
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loginStatus = "succeeded";
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginStatus = "failed";
            })
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = "loading";
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.registerStatus = "succeeded";
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerStatus = "failed";
            })
            .addCase(changePasswordUser.pending, (state) => {
                state.changePasswordStatus = "loading";
            })
            .addCase(changePasswordUser.fulfilled, (state) => {
                state.changePasswordStatus = "succeeded";
            })
            .addCase(changePasswordUser.rejected, (state) => {
                state.changePasswordStatus = "failed";
            })
            .addCase(fetchSessionUser.fulfilled, (state) => {
                state.sessionResolved = true;
            })
            .addCase(fetchSessionUser.rejected, (state) => {
                state.sessionResolved = true;
            });
    },
});

export const { clearAuthForm } = authSlice.actions;
export default authSlice.reducer;

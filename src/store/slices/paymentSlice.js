import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const createPaymentUrl = createAsyncThunk(
    "payment/createPaymentUrl",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "POST",
                url: "/create-payment-url",
                data: payload,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Create payment url failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Create payment url failed");
        }
    }
);

export const paymentCheckOut = createAsyncThunk(
    "payment/checkOut",
    async (searchParams, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "GET",
                url: `/check_payment?${searchParams.toString()}`,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Payment checkout failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Payment checkout failed");
        }
    }
);

const initialState = {
    paymentUrl: "",
    dataPayment: [],
    message: null,
    status: "idle",
    error: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPaymentMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentUrl.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createPaymentUrl.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.paymentUrl = action.payload?.paymentUrl || "";
            })
            .addCase(createPaymentUrl.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            })
            .addCase(paymentCheckOut.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message = null;
                state.dataPayment = [];
            })
            .addCase(paymentCheckOut.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload?.message || null;
                const raw = action.payload?.data;
                state.dataPayment = raw == null ? [] : Array.isArray(raw) ? raw : [raw];
            })
            .addCase(paymentCheckOut.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
                // giữ message theo legacy nếu server trả
                if (action.payload?.message) state.message = action.payload.message;
            });
    },
});

export const { clearPaymentMessage } = paymentSlice.actions;
export default paymentSlice.reducer;


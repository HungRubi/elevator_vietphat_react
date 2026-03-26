import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchDiscounts = createAsyncThunk("discount/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await axios({
            url: "/category/discount",
            method: "get",
        });
        if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch discounts failed");
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch discounts failed");
    }
});

const initialState = {
    discount: [],
    status: "idle",
    error: null,
};

const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscounts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchDiscounts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.discount = action.payload?.data?.formatDiscount || [];
            })
            .addCase(fetchDiscounts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default discountSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllCategories = createAsyncThunk(
    "category/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "GET",
                url: "/category/product/all",
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch categories failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch categories failed");
        }
    }
);

const initialState = {
    categoryProduct: [],
    status: "idle",
    error: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                // API mới: { category: [...] }
                state.categoryProduct = action.payload?.category || [];
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default categorySlice.reducer;


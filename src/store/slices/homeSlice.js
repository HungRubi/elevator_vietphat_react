import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchHome = createAsyncThunk("home/fetchHome", async (_, { rejectWithValue }) => {
    try {
        const res = await axios({ url: "home", method: "get" });
        if (res?.status !== 200) return rejectWithValue(res?.data ?? "Home request failed");
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data ?? err?.message ?? "Home request failed");
    }
});

const initialState = {
    banner: [],
    video: [],
    productsCategory: [],
    article: [],
    status: "idle",
    error: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHome.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchHome.fulfilled, (state, action) => {
                state.status = "succeeded";
                const data = action.payload?.data ?? action.payload ?? {};
                state.banner = data.banner || [];
                state.video = data.video || [];
                state.productsCategory = data.products || [];
                state.article = data.article || [];
            })
            .addCase(fetchHome.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default homeSlice.reducer;


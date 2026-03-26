import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchVideoDetail = createAsyncThunk(
    "video/fetchDetail",
    async (slug, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/category/video/${slug}`,
                method: "get",
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch video failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch video failed");
        }
    }
);

const initialState = {
    videoDetail: {},
    listVideo: [],
    articleSuggest: [],
    productNewLast: [],
    status: "idle",
    error: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoDetail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchVideoDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.videoDetail = action.payload?.data?.video || {};
                state.listVideo = action.payload?.data?.videos || [];
                state.articleSuggest = action.payload?.data?.articleSuggest || [];
                state.productNewLast = action.payload?.data?.productSuggest || [];
            })
            .addCase(fetchVideoDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default videoSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

/**
 * @param {string | { q?: string; timkiem?: string; page?: number; limit?: number; offset?: number; sort?: string; order?: string }} input
 */
export const querySite = createAsyncThunk("search/querySite", async (input, { rejectWithValue }) => {
    const raw = typeof input === "string" ? { q: input } : input && typeof input === "object" ? input : {};
    const q = String(raw.q ?? raw.timkiem ?? "").trim();
    if (q.length < 2) {
        return { product: [], article: [], video: [], totals: 0, page: 1, limit: 0, offset: 0 };
    }
    const page = Math.max(1, Number(raw.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(raw.limit) || 12));
    const params = {
        q,
        page,
        limit,
        ...(raw.offset !== undefined && raw.offset !== null ? { offset: raw.offset } : {}),
        ...(raw.sort ? { sort: raw.sort } : {}),
        ...(raw.order ? { order: raw.order } : {}),
    };
    try {
        const res = await axios({
            url: "timkiem",
            method: "get",
            params,
        });
        if (res?.status !== 200) return rejectWithValue(res?.data ?? "Search failed");
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data ?? err?.message ?? "Search failed");
    }
});

const initialState = {
    productSearch: [],
    articleSearch: [],
    videoSearch: [],
    totals: 0,
    page: 1,
    limit: 0,
    offset: 0,
    /** Tổng số trang (server hoặc suy ra từ totals/limit) */
    searchTotalPage: 1,
    status: "idle",
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.productSearch = [];
            state.articleSearch = [];
            state.videoSearch = [];
            state.totals = 0;
            state.page = 1;
            state.limit = 0;
            state.offset = 0;
            state.searchTotalPage = 1;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(querySite.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(querySite.fulfilled, (state, action) => {
                state.status = "succeeded";
                const p = action.payload || {};
                state.productSearch = p.product || [];
                state.articleSearch = p.article || [];
                state.videoSearch = p.video || [];
                state.totals = p.totals ?? 0;
                state.page = p.page ?? 1;
                state.limit = p.limit ?? 0;
                state.offset = p.offset ?? 0;
                const lim = state.limit > 0 ? state.limit : 12;
                state.searchTotalPage =
                    p.totalPage ?? Math.max(1, Math.ceil((state.totals || 0) / lim));
            })
            .addCase(querySite.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;


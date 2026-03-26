import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

/**
 * Danh sách bài (status public) có phân trang — cùng contract `GET /articles/` trong docs.
 * Nếu server chỉ bật cho staff, cần route public tương đương hoặc mở GET này cho khách.
 */
export const fetchArticlesPublicList = createAsyncThunk(
    "articles/fetchPublicList",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/articles/",
                method: "get",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch articles list failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch articles list failed");
        }
    }
);

export const fetchLatestArticles = createAsyncThunk(
    "articles/fetchLatest",
    async (limit = 20, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/articles/api/latest",
                method: "get",
                params: { limit: Math.min(20, Math.max(1, Number(limit) || 20)) },
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch articles failed");
            const arr = Array.isArray(res.data) ? res.data : [];
            return arr;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch articles failed");
        }
    }
);

export const fetchArticleDetail = createAsyncThunk(
    "articles/fetchDetail",
    async ({ slug, limit_sidebar = 4 }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/articles/fe/${slug}`,
                method: "get",
                params: { limit_sidebar: Math.min(20, Math.max(1, Number(limit_sidebar) || 4)) },
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch article failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch article failed");
        }
    }
);

const initialState = {
    articles: [],
    /** Trang /news: danh sách theo trang từ API */
    indexArticles: [],
    indexTotal: 0,
    indexTotalPage: 1,
    indexPage: 1,
    indexLimit: 9,
    indexOffset: 0,
    indexStatus: "idle",
    indexError: null,
    articleDetail: {},
    articleSuggest: [],
    productNewLast: [],
    status: "idle",
    error: null,
};

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesPublicList.pending, (state) => {
                state.indexStatus = "loading";
                state.indexError = null;
            })
            .addCase(fetchArticlesPublicList.fulfilled, (state, action) => {
                state.indexStatus = "succeeded";
                const d = action.payload?.data ?? action.payload ?? {};
                state.indexArticles = d.articles ?? d.articleFormat ?? [];
                state.indexTotal = d.total ?? 0;
                state.indexTotalPage = Math.max(1, d.totalPage ?? 1);
                state.indexPage = d.page ?? 1;
                state.indexLimit = d.limit ?? state.indexLimit;
                state.indexOffset = d.offset ?? 0;
            })
            .addCase(fetchArticlesPublicList.rejected, (state, action) => {
                state.indexStatus = "failed";
                state.indexError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchLatestArticles.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchLatestArticles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articles = action.payload || [];
            })
            .addCase(fetchLatestArticles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchArticleDetail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchArticleDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articleDetail = action.payload?.article || {};
                state.articleSuggest = action.payload?.formNewArticles || [];
                state.productNewLast = action.payload?.formNewProduct || [];
            })
            .addCase(fetchArticleDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default articlesSlice.reducer;


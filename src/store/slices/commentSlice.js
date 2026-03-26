import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { setMessage } from "./uiSlice";

function normalizeCommentPayload(input) {
    const data = input && typeof input === "object" ? input : {};
    const productRaw = data.product_id;
    const product_id = Array.isArray(productRaw)
        ? productRaw.filter(Boolean)
        : productRaw
            ? [productRaw]
            : [];

    const imgRaw = data.img;
    const img = Array.isArray(imgRaw) ? imgRaw : imgRaw ? [imgRaw] : [];

    return {
        ...data,
        product_id,
        img,
        star: Number(data.star) || 5,
    };
}

function staffListFromPayload(payload) {
    const d = payload?.data ?? payload ?? {};
    return {
        list: d.comment ?? d.comments ?? [],
        total: d.total ?? 0,
        totalPage: d.totalPage ?? 1,
        page: d.page ?? 1,
        limit: d.limit ?? 10,
        offset: d.offset ?? 0,
    };
}

/** Staff: GET /comment/all */
export const fetchStaffCommentsAll = createAsyncThunk(
    "comment/fetchStaffAll",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/comment/all",
                method: "get",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch staff comments failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch staff comments failed");
        }
    }
);

/** Staff: GET /comment/filter */
export const fetchStaffCommentsFilter = createAsyncThunk(
    "comment/fetchStaffFilter",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/comment/filter",
                method: "get",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch staff comments filter failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch staff comments filter failed");
        }
    }
);

export const addComment = createAsyncThunk(
    "comment/add",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const payload = normalizeCommentPayload(data);
            const res = await axios({
                url: "comment/add",
                method: "POST",
                data: payload,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Add comment failed");
            dispatch(setMessage(res.data?.message || "Gửi đánh giá thành công"));
            return res.data;
        } catch (err) {
            const payload = err?.response?.data ?? err?.message ?? "Add comment failed";
            dispatch(setMessage(payload));
            return rejectWithValue(payload);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        status: "idle",
        error: null,
        staffComments: [],
        staffTotal: 0,
        staffTotalPage: 1,
        staffPage: 1,
        staffLimit: 10,
        staffOffset: 0,
        staffListStatus: "idle",
        staffListError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffCommentsAll.pending, (state) => {
                state.staffListStatus = "loading";
                state.staffListError = null;
            })
            .addCase(fetchStaffCommentsAll.fulfilled, (state, action) => {
                state.staffListStatus = "succeeded";
                const s = staffListFromPayload(action.payload);
                state.staffComments = s.list;
                state.staffTotal = s.total;
                state.staffTotalPage = s.totalPage;
                state.staffPage = s.page;
                state.staffLimit = s.limit;
                state.staffOffset = s.offset;
            })
            .addCase(fetchStaffCommentsAll.rejected, (state, action) => {
                state.staffListStatus = "failed";
                state.staffListError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffCommentsFilter.pending, (state) => {
                state.staffListStatus = "loading";
                state.staffListError = null;
            })
            .addCase(fetchStaffCommentsFilter.fulfilled, (state, action) => {
                state.staffListStatus = "succeeded";
                const s = staffListFromPayload(action.payload);
                state.staffComments = s.list;
                state.staffTotal = s.total;
                state.staffTotalPage = s.totalPage;
                state.staffPage = s.page;
                state.staffLimit = s.limit;
                state.staffOffset = s.offset;
            })
            .addCase(fetchStaffCommentsFilter.rejected, (state, action) => {
                state.staffListStatus = "failed";
                state.staffListError = action.payload ?? action.error?.message ?? null;
            });
    },
});

export default commentSlice.reducer;


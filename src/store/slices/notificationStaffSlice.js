import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

function listFromPayload(payload) {
    const d = payload?.data ?? payload ?? {};
    return {
        list:
            d.notification ??
            d.notifications ??
            d.data?.notification ??
            [],
        total: d.total ?? 0,
        totalPage: d.totalPage ?? 1,
        page: d.page ?? 1,
        limit: d.limit ?? 10,
        offset: d.offset ?? 0,
    };
}

/** Staff: GET /notification */
export const fetchStaffNotificationList = createAsyncThunk(
    "notificationStaff/fetchList",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "get",
                url: "/notification",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch notifications failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch notifications failed");
        }
    }
);

/** Staff: GET /notification/filter */
export const fetchStaffNotificationFilter = createAsyncThunk(
    "notificationStaff/fetchFilter",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "get",
                url: "/notification/filter",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Filter notifications failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Filter notifications failed");
        }
    }
);

/** Staff: GET /notification/:id */
export const fetchStaffNotificationById = createAsyncThunk(
    "notificationStaff/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "get", url: `/notification/${id}` });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Get notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Get notification failed");
        }
    }
);

/** Staff: POST /notification/add */
export const createStaffNotification = createAsyncThunk(
    "notificationStaff/create",
    async (body, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "post", url: "/notification/add", data: body });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Create notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Create notification failed");
        }
    }
);

/** Staff: PUT /notification/:id */
export const updateStaffNotification = createAsyncThunk(
    "notificationStaff/update",
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "put", url: `/notification/${id}`, data: body });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Update notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Update notification failed");
        }
    }
);

/** Staff: DELETE /notification/:id */
export const deleteStaffNotification = createAsyncThunk(
    "notificationStaff/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "delete", url: `/notification/${id}` });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Delete notification failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Delete notification failed");
        }
    }
);

const initialState = {
    list: [],
    total: 0,
    totalPage: 1,
    page: 1,
    limit: 10,
    offset: 0,
    listStatus: "idle",
    listError: null,
    detail: null,
    detailStatus: "idle",
    detailError: null,
    mutationStatus: "idle",
    mutationError: null,
};

const notificationStaffSlice = createSlice({
    name: "notificationStaff",
    initialState,
    reducers: {
        clearStaffNotificationDetail: (state) => {
            state.detail = null;
            state.detailStatus = "idle";
            state.detailError = null;
        },
    },
    extraReducers: (builder) => {
        const applyListFulfilled = (state, action) => {
            state.listStatus = "succeeded";
            const s = listFromPayload(action.payload);
            state.list = Array.isArray(s.list) ? s.list : [];
            state.total = s.total;
            state.totalPage = s.totalPage;
            state.page = s.page;
            state.limit = s.limit;
            state.offset = s.offset;
        };

        builder
            .addCase(fetchStaffNotificationList.pending, (state) => {
                state.listStatus = "loading";
                state.listError = null;
            })
            .addCase(fetchStaffNotificationList.fulfilled, applyListFulfilled)
            .addCase(fetchStaffNotificationList.rejected, (state, action) => {
                state.listStatus = "failed";
                state.listError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffNotificationFilter.pending, (state) => {
                state.listStatus = "loading";
                state.listError = null;
            })
            .addCase(fetchStaffNotificationFilter.fulfilled, applyListFulfilled)
            .addCase(fetchStaffNotificationFilter.rejected, (state, action) => {
                state.listStatus = "failed";
                state.listError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffNotificationById.pending, (state) => {
                state.detailStatus = "loading";
                state.detailError = null;
            })
            .addCase(fetchStaffNotificationById.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.detail = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(fetchStaffNotificationById.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.detailError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(createStaffNotification.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(createStaffNotification.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(createStaffNotification.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(updateStaffNotification.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(updateStaffNotification.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(updateStaffNotification.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(deleteStaffNotification.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(deleteStaffNotification.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(deleteStaffNotification.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            });
    },
});

export const { clearStaffNotificationDetail } = notificationStaffSlice.actions;
export default notificationStaffSlice.reducer;

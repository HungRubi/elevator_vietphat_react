import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

function orderListFromPayload(payload) {
    const d = payload?.data ?? payload ?? {};
    return {
        list: d.order ?? d.orders ?? d.data?.order ?? [],
        total: d.total ?? 0,
        totalPage: d.totalPage ?? 1,
        page: d.page ?? 1,
        limit: d.limit ?? 10,
        offset: d.offset ?? 0,
    };
}

/** Staff: GET /order */
export const fetchStaffOrders = createAsyncThunk(
    "orderStaff/fetchList",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "get",
                url: "/order",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch orders failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch orders failed");
        }
    }
);

/** Staff: GET /order/filter */
export const fetchStaffOrdersFilter = createAsyncThunk(
    "orderStaff/fetchFilter",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: "get",
                url: "/order/filter",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Filter orders failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Filter orders failed");
        }
    }
);

/** Staff: GET /order/:id */
export const fetchStaffOrderById = createAsyncThunk(
    "orderStaff/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "get", url: `/order/${id}` });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Get order failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Get order failed");
        }
    }
);

/** Staff: GET /order/details/:id — { order, orderDetailsFormat } */
export const fetchStaffOrderDetails = createAsyncThunk(
    "orderStaff/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "get", url: `/order/details/${id}` });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Get order details failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Get order details failed");
        }
    }
);

/** Staff: GET /order/add — danh sách SP (tối đa ~500) cho form tạo đơn */
export const fetchStaffOrderAddCatalog = createAsyncThunk(
    "orderStaff/fetchAddCatalog",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "get", url: "/order/add" });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch order add catalog failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch order add catalog failed");
        }
    }
);

/** Staff: PUT /order/:id */
export const updateStaffOrder = createAsyncThunk(
    "orderStaff/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "put", url: `/order/${id}`, data });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Update order failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Update order failed");
        }
    }
);

/** Staff: PUT /order/admin/:id */
export const updateStaffOrderAdmin = createAsyncThunk(
    "orderStaff/updateAdmin",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "put", url: `/order/admin/${id}`, data });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Admin update order failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Admin update order failed");
        }
    }
);

/** Staff: DELETE /order/:id */
export const deleteStaffOrder = createAsyncThunk(
    "orderStaff/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios({ method: "delete", url: `/order/${id}` });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Delete order failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Delete order failed");
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
    detailsPayload: null,
    detailsStatus: "idle",
    detailsError: null,
    addCatalog: [],
    addCatalogStatus: "idle",
    addCatalogError: null,
    mutationStatus: "idle",
    mutationError: null,
};

const orderStaffSlice = createSlice({
    name: "orderStaff",
    initialState,
    reducers: {
        clearStaffOrderDetail: (state) => {
            state.detail = null;
            state.detailStatus = "idle";
            state.detailError = null;
        },
        clearStaffOrderDetailsPayload: (state) => {
            state.detailsPayload = null;
            state.detailsStatus = "idle";
            state.detailsError = null;
        },
    },
    extraReducers: (builder) => {
        const applyListFulfilled = (state, action) => {
            state.listStatus = "succeeded";
            const s = orderListFromPayload(action.payload);
            state.list = Array.isArray(s.list) ? s.list : [];
            state.total = s.total;
            state.totalPage = s.totalPage;
            state.page = s.page;
            state.limit = s.limit;
            state.offset = s.offset;
        };

        builder
            .addCase(fetchStaffOrders.pending, (state) => {
                state.listStatus = "loading";
                state.listError = null;
            })
            .addCase(fetchStaffOrders.fulfilled, applyListFulfilled)
            .addCase(fetchStaffOrders.rejected, (state, action) => {
                state.listStatus = "failed";
                state.listError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffOrdersFilter.pending, (state) => {
                state.listStatus = "loading";
                state.listError = null;
            })
            .addCase(fetchStaffOrdersFilter.fulfilled, applyListFulfilled)
            .addCase(fetchStaffOrdersFilter.rejected, (state, action) => {
                state.listStatus = "failed";
                state.listError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffOrderById.pending, (state) => {
                state.detailStatus = "loading";
                state.detailError = null;
            })
            .addCase(fetchStaffOrderById.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.detail = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(fetchStaffOrderById.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.detailError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffOrderDetails.pending, (state) => {
                state.detailsStatus = "loading";
                state.detailsError = null;
            })
            .addCase(fetchStaffOrderDetails.fulfilled, (state, action) => {
                state.detailsStatus = "succeeded";
                state.detailsPayload = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(fetchStaffOrderDetails.rejected, (state, action) => {
                state.detailsStatus = "failed";
                state.detailsError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchStaffOrderAddCatalog.pending, (state) => {
                state.addCatalogStatus = "loading";
                state.addCatalogError = null;
            })
            .addCase(fetchStaffOrderAddCatalog.fulfilled, (state, action) => {
                state.addCatalogStatus = "succeeded";
                const p = action.payload?.data ?? action.payload ?? {};
                state.addCatalog = p.product ?? p.products ?? p.data?.product ?? [];
            })
            .addCase(fetchStaffOrderAddCatalog.rejected, (state, action) => {
                state.addCatalogStatus = "failed";
                state.addCatalogError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(updateStaffOrder.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(updateStaffOrder.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(updateStaffOrder.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(updateStaffOrderAdmin.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(updateStaffOrderAdmin.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(updateStaffOrderAdmin.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(deleteStaffOrder.pending, (state) => {
                state.mutationStatus = "loading";
                state.mutationError = null;
            })
            .addCase(deleteStaffOrder.fulfilled, (state) => {
                state.mutationStatus = "succeeded";
            })
            .addCase(deleteStaffOrder.rejected, (state, action) => {
                state.mutationStatus = "failed";
                state.mutationError = action.payload ?? action.error?.message ?? null;
            });
    },
});

export const { clearStaffOrderDetail, clearStaffOrderDetailsPayload } = orderStaffSlice.actions;
export default orderStaffSlice.reducer;

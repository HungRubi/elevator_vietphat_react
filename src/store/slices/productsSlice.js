import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchProducts = createAsyncThunk("products/fetchList", async (params, { rejectWithValue }) => {
    try {
        const res = await axios({
            url: "/products",
            method: "get",
            // API mới có meta phân trang; giữ default server limit=12, createdAt desc.
            params: params && typeof params === "object" ? params : undefined,
        });
        if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch products failed");
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch products failed");
    }
});

export const fetchProductDetail = createAsyncThunk(
    "products/fetchDetail",
    async ({ slug, limit_suggest = 8 }, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: `/products/fe/${slug}`,
                method: "get",
                params: {
                    limit_suggest: Math.min(20, Math.max(1, Number(limit_suggest) || 8)),
                },
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch product failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch product failed");
        }
    }
);

export const fetchSelectedProducts = createAsyncThunk(
    "products/fetchSelected",
    async (productId, { rejectWithValue }) => {
        const ids = Array.isArray(productId) ? productId : productId ? [productId] : [];
        if (ids.length > 50) {
            return rejectWithValue({ message: "Tối đa 50 sản phẩm mỗi lần." });
        }
        try {
            const res = await axios({
                url: "/products/selected",
                method: "post",
                data: { productId: ids },
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch selected products failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch selected products failed");
        }
    }
);

/** Public: lọc theo category, ngày, timkiem/q, phân trang (listQuery.util). */
export const fetchProductsFilter = createAsyncThunk(
    "products/fetchFilter",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/products/filter",
                method: "get",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch products filter failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch products filter failed");
        }
    }
);

/** Staff: danh sách quản trị (verifyTokenStaff). */
export const fetchProductsAdmin = createAsyncThunk(
    "products/fetchAdmin",
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios({
                url: "/products/admin",
                method: "get",
                params: params && typeof params === "object" ? params : undefined,
            });
            if (res?.status !== 200) return rejectWithValue(res?.data ?? "Fetch products admin failed");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data ?? err?.message ?? "Fetch products admin failed");
        }
    }
);

const initialState = {
    products: [],
    totalPage: 1,
    total: 0,
    page: 1,
    limit: 12,
    offset: 0,
    /** GET /products/filter */
    filterProducts: [],
    filterTotalPage: 1,
    filterTotal: 0,
    filterPage: 1,
    filterLimit: 12,
    filterOffset: 0,
    filterStatus: "idle",
    filterError: null,
    /** GET /products/admin */
    adminProductList: [],
    adminTotalPage: 1,
    adminTotal: 0,
    adminPage: 1,
    adminLimit: 10,
    adminOffset: 0,
    adminStatus: "idle",
    adminError: null,
    productDetail: {},
    productSuggest: [],
    comments: [],
    selectedProducts: [],
    status: "idle",
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload?.data?.products || [];
                state.totalPage = Math.max(1, action.payload?.data?.totalPage || 1);
                state.total = action.payload?.data?.total ?? 0;
                state.page = action.payload?.data?.page ?? 1;
                state.limit = action.payload?.data?.limit ?? 12;
                state.offset = action.payload?.data?.offset ?? 0;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchProductsFilter.pending, (state) => {
                state.filterStatus = "loading";
                state.filterError = null;
            })
            .addCase(fetchProductsFilter.fulfilled, (state, action) => {
                state.filterStatus = "succeeded";
                const d = action.payload?.data ?? action.payload ?? {};
                state.filterProducts = d.products ?? d.productFormat ?? [];
                state.filterTotalPage = Math.max(1, d.totalPage ?? 1);
                state.filterTotal = d.total ?? 0;
                state.filterPage = d.page ?? 1;
                state.filterLimit = d.limit ?? 12;
                state.filterOffset = d.offset ?? 0;
            })
            .addCase(fetchProductsFilter.rejected, (state, action) => {
                state.filterStatus = "failed";
                state.filterError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchProductsAdmin.pending, (state) => {
                state.adminStatus = "loading";
                state.adminError = null;
            })
            .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
                state.adminStatus = "succeeded";
                const d = action.payload?.data ?? action.payload ?? {};
                state.adminProductList = d.productFormat ?? d.products ?? [];
                state.adminTotalPage = d.totalPage ?? 1;
                state.adminTotal = d.total ?? 0;
                state.adminPage = d.page ?? 1;
                state.adminLimit = d.limit ?? 10;
                state.adminOffset = d.offset ?? 0;
            })
            .addCase(fetchProductsAdmin.rejected, (state, action) => {
                state.adminStatus = "failed";
                state.adminError = action.payload ?? action.error?.message ?? null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload?.data?.product || {};
                state.productSuggest = action.payload?.data?.productSuggest || [];
                state.comments = action.payload?.data?.comment || [];
            })
            .addCase(fetchSelectedProducts.fulfilled, (state, action) => {
                // API /products/selected trả { product: [...] }
                state.selectedProducts = action.payload?.product || [];
            });
    },
});

export default productsSlice.reducer;


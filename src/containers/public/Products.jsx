import { ProductsAll, PageBar } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as actions from '../../store/actions';
import { Helmet } from 'react-helmet';
import { NavLink, useSearchParams } from 'react-router-dom';

const SORT_OPTIONS = [
    { value: 'default', label: 'Mặc định' },
    { value: 'price-asc', label: 'Giá tăng dần' },
    { value: 'price-desc', label: 'Giá giảm dần' },
    { value: 'name', label: 'Tên A–Z' },
];

function sortProducts(list, sortKey) {
    const arr = [...list];
    switch (sortKey) {
        case 'price-asc':
            return arr.sort((a, b) => Number(a.price) - Number(b.price));
        case 'price-desc':
            return arr.sort((a, b) => Number(b.price) - Number(a.price));
        case 'name':
            return arr.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'));
        default:
            return arr;
    }
}

const Products = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const q = (searchParams.get('q') || '').trim();

    const { products, categoryProduct, productSearch } = useSelector((state) => state.app);
    const [activeId, setActiveId] = useState(null);
    const [sortKey, setSortKey] = useState('default');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const sortWrapRef = useRef(null);
    const sortTriggerRef = useRef(null);

    const currentSort = useMemo(() => SORT_OPTIONS.find((o) => o.value === sortKey) ?? SORT_OPTIONS[0], [sortKey]);

    useEffect(() => {
        if (!sortOpen) return;
        const onDoc = (e) => {
            if (sortWrapRef.current && !sortWrapRef.current.contains(e.target)) setSortOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setSortOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [sortOpen]);

    useEffect(() => {
        dispatch(actions.getProducts());
        dispatch(actions.getCategoryProduct());
    }, [dispatch]);

    useEffect(() => {
        if (!q) {
            setSearchLoading(false);
            return;
        }
        let cancelled = false;
        setSearchLoading(true);
        (async () => {
            try {
                await dispatch(actions.querySearch(q));
            } finally {
                if (!cancelled) setSearchLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [dispatch, q]);

    const sourceList = useMemo(() => {
        if (q) return Array.isArray(productSearch) ? productSearch : [];
        return Array.isArray(products) ? products : [];
    }, [q, productSearch, products]);

    const sortedList = useMemo(() => sortProducts(sourceList, sortKey), [sourceList, sortKey]);

    const [current, setCurrent] = useState(1);
    const limit = 12;

    useEffect(() => {
        setCurrent(1);
    }, [q, activeId, sortKey, sourceList.length]);

    const lastProduct = current * limit;
    const firstProduct = lastProduct - limit;
    const currentProduct = sortedList.slice(firstProduct, lastProduct);
    const totalPages = Math.max(1, Math.ceil(sortedList.length / limit));

    const handleCategory = useCallback(
        (id) => {
            setActiveId(id);
            setSearchParams({}, { replace: true });
            dispatch(actions.getProductByCategory(id));
        },
        [dispatch, setSearchParams]
    );

    const handleAllCategories = useCallback(() => {
        setActiveId(null);
        setSearchParams({}, { replace: true });
        dispatch(actions.getProducts());
    }, [dispatch, setSearchParams]);

    const clearSearch = useCallback(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    return (
        <>
            <Helmet>
                <title>Sản phẩm - Thang máy Việt Phát</title>
                <meta
                    name="description"
                    content="Khám phá các dòng sản phẩm thang máy chất lượng cao tại Thang máy Việt Phát: thang máy gia đình, thang máy tải hàng, thang máy kính và nhiều hơn nữa."
                />
                <meta
                    name="keywords"
                    content="sản phẩm thang máy, thang máy gia đình, thang máy tải hàng, thang máy kính, thang máy Việt Phát"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/products" />
            </Helmet>

            <div className="min-w-0 bg-slate-100/95">
            <div className="mx-auto w-full max-w-[1200px] px-4 pb-12 pt-8 md:px-8">
                <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
                    <NavLink to="/" className="hover:text-slate-800">
                        Trang chủ
                    </NavLink>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-slate-800">Sản phẩm</span>
                </nav>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Sản phẩm
                        </h1>
                        {q ? (
                            <p className="mt-2 text-sm text-slate-600">
                                Kết quả cho “<span className="font-semibold text-slate-900">{q}</span>”
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-slate-600">
                                Phụ tùng & linh kiện thang máy — chọn danh mục hoặc tìm nhanh.
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div ref={sortWrapRef} className="relative">
                            <span className="sr-only" id="sort-label">
                                Sắp xếp sản phẩm
                            </span>
                            <button
                                ref={sortTriggerRef}
                                type="button"
                                id="product-sort-trigger"
                                aria-haspopup="listbox"
                                aria-expanded={sortOpen}
                                aria-labelledby="sort-label product-sort-trigger"
                                onClick={() => setSortOpen((v) => !v)}
                                className="flex h-10 min-w-[10.5rem] items-center justify-between gap-2 rounded-md border border-slate-300 bg-white px-3 text-left text-sm text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 sm:min-w-[12rem]"
                            >
                                <span className="truncate">{currentSort.label}</span>
                                <svg
                                    className={`size-4 shrink-0 text-slate-500 ${sortOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {sortOpen ? (
                                <div
                                    role="listbox"
                                    aria-labelledby="sort-label"
                                    className="absolute left-0 right-0 z-50 mt-1 sm:left-auto sm:right-0 sm:min-w-[12rem]"
                                >
                                    <ul className="max-h-60 overflow-auto rounded-md border border-slate-300 bg-white py-1 shadow-md [scrollbar-width:thin]">
                                        {SORT_OPTIONS.map((opt) => {
                                            const selected = sortKey === opt.value;
                                            return (
                                                <li key={opt.value} role="presentation">
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={selected}
                                                        onClick={() => {
                                                            setSortKey(opt.value);
                                                            setSortOpen(false);
                                                            sortTriggerRef.current?.focus();
                                                        }}
                                                        className={`w-full px-3 py-2 text-left text-sm focus:outline-none focus-visible:bg-slate-100 ${
                                                            selected ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                        <button
                            type="button"
                            className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 lg:hidden"
                            onClick={() => setFilterOpen(true)}
                        >
                            Danh mục
                        </button>
                    </div>
                </div>

                {/* Desktop category chips */}
                <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
                    <button
                        type="button"
                        onClick={handleAllCategories}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25 ${
                            activeId === null && !q
                                ? 'bg-slate-900 text-white'
                                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                    >
                        Tất cả
                    </button>
                    {categoryProduct?.map((item) => (
                        <button
                            key={item._id}
                            type="button"
                            onClick={() => handleCategory(item._id)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25 ${
                                activeId === item._id
                                    ? 'bg-[#2f904b] text-white'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Mobile: show compact chip row */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <button
                        type="button"
                        onClick={handleAllCategories}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                            activeId === null && !q ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white'
                        }`}
                    >
                        Tất cả
                    </button>
                    {categoryProduct?.map((item) => (
                        <button
                            key={item._id}
                            type="button"
                            onClick={() => handleCategory(item._id)}
                            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                                activeId === item._id ? 'bg-[#2f904b] text-white' : 'border border-slate-200 bg-white'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {searchLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white"
                                >
                                    <div className="aspect-square bg-slate-200" />
                                    <div className="space-y-2 p-4">
                                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                                        <div className="h-4 w-1/2 rounded bg-slate-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sortedList.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                            <p className="text-lg font-semibold text-slate-900">Không có sản phẩm phù hợp</p>
                            <p className="mt-2 text-sm text-slate-600">
                                Thử đổi từ khoá hoặc xoá bộ lọc để xem toàn bộ danh mục.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                {q ? (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
                                    >
                                        Xoá tìm kiếm
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={handleAllCategories}
                                    className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800"
                                >
                                    Xem tất cả sản phẩm
                                </button>
                            </div>
                        </div>
                    ) : (
                        <ProductsAll data={currentProduct} />
                    )}
                </div>

                {!searchLoading && sortedList.length > 0 ? (
                    <PageBar currentPage={current} totalPage={totalPages} onPageChange={setCurrent} />
                ) : null}
            </div>
            </div>

            {/* Mobile filter drawer: same categories, focus return on close */}
            {filterOpen ? (
                <div className="fixed inset-0 z-[1100] lg:hidden" role="presentation">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-900/40"
                        aria-label="Đóng bộ lọc"
                        onClick={() => setFilterOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-lg border-t border-slate-200 bg-white shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                            <span className="text-sm font-semibold text-slate-900">Danh mục</span>
                            <button
                                type="button"
                                onClick={() => setFilterOpen(false)}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                Đóng
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 p-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleAllCategories();
                                    setFilterOpen(false);
                                }}
                                className={`rounded-md px-3 py-2.5 text-left text-sm ${
                                    activeId === null && !q ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                Tất cả
                            </button>
                            {categoryProduct?.map((item) => (
                                <button
                                    key={item._id}
                                    type="button"
                                    onClick={() => {
                                        handleCategory(item._id);
                                        setFilterOpen(false);
                                    }}
                                    className={`rounded-md px-3 py-2.5 text-left text-sm ${
                                        activeId === item._id ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Products;

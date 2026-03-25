import { NavLink } from 'react-router-dom';
import { QuantityButton, Button } from '../../components';
import icons from '../../util/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatMoney } from '../../util/formatMoney';
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as actions from '../../store/actions';

const {
    PiShoppingCartBold,
    FiTruck,
    IoShieldCheckmarkOutline,
    AiOutlineLeft,
} = icons;

/* Cùng kích thước mọi chỗ: chọn tất cả + từng dòng */
const checkboxBoxClass =
    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-slate-300 bg-white shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] transition peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-2 peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary)] peer-checked:shadow-none peer-checked:[&>svg]:opacity-100';

/** Checkbox tùy chỉnh — đồng bộ nền sáng, có tick SVG */
function CartCheckbox({ id, checked, onChange, label, ariaLabel, checkboxOnly }) {
    const control = (
        <span className="relative inline-flex">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
                aria-label={ariaLabel}
            />
            <span className={checkboxBoxClass} aria-hidden>
                <svg
                    className="h-3 w-3 text-white opacity-0 transition"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <path
                        d="M2.5 6l2.5 2.5L9.5 3"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </span>
    );

    if (checkboxOnly) {
        return (
            <label
                htmlFor={id}
                className="inline-flex cursor-pointer select-none"
            >
                {control}
            </label>
        );
    }

    return (
        <label
            htmlFor={id}
            className="inline-flex cursor-pointer items-center gap-3 select-none text-sm font-medium text-slate-700"
        >
            {control}
            {label != null ? <span>{label}</span> : null}
        </label>
    );
}

const Cart = () => {
    const dispatch = useDispatch();
    const { productCart, cart, currentUser } = useSelector((state) => state.user);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const cartItems = useMemo(() => cart?.[0]?.items ?? [], [cart]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const initialQuantities = {};
            cartItems.forEach((item) => {
                initialQuantities[item.productId] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [cartItems]);

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: newQuantity,
        }));

        const updatedItems = cartItems.map((cartItem) =>
            cartItem.productId === productId
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
        );
        const totalPrice = updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        dispatch(
            actions.updateCart(
                {
                    productId,
                    quantity: newQuantity,
                    items: updatedItems,
                    totalPrice,
                },
                currentUser?._id
            )
        );
    };

    const handleProductSelect = (productId) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSelectAll = () => {
        const isAllSelected = selectedProducts.length === productCart.length;
        if (isAllSelected) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(productCart.map((item) => item._id));
        }
    };

    const { totalPrice, totalItems } = useMemo(() => {
        let price = 0;
        let items = 0;
        selectedProducts.forEach((productId) => {
            const product = productCart.find((p) => p._id === productId);
            if (product) {
                const q = quantities[productId] ?? 1;
                price += product.price * q;
                items += q;
            }
        });
        return { totalPrice: price, totalItems: items };
    }, [selectedProducts, quantities, productCart]);

    const handleBuyNow = () => {
        const selectedProductsWithQuantity = selectedProducts.map((productId) => {
            const product = productCart.find((p) => p._id === productId);
            return {
                product,
                quantity: quantities[productId] || 1,
            };
        });
        dispatch(actions.setSelectedProducts(selectedProductsWithQuantity));
    };

    const handleDeleteSelected = useCallback(() => {
        if (selectedProducts.length > 0) {
            dispatch(
                actions.deleteCartItem(
                    { productId: selectedProducts },
                    currentUser?._id
                )
            );
            setSelectedProducts([]);
        }
    }, [dispatch, selectedProducts, currentUser]);

    const handleDeleteItem = (itemId) => {
        dispatch(
            actions.deleteCartItem({ productId: itemId }, currentUser?._id)
        );
        setSelectedProducts((prev) => prev.filter((id) => id !== itemId));
    };

    const hasItems = productCart && productCart.length > 0;
    const allSelected =
        hasItems && selectedProducts.length === productCart.length;
    const someSelected = selectedProducts.length > 0;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--color-bg)] pb-28 text-[var(--color-text)] lg:pb-10">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
                <header className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <NavLink
                            to="/products"
                            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                        >
                            <AiOutlineLeft className="text-lg" aria-hidden />
                            Tiếp tục mua sắm
                        </NavLink>
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                <PiShoppingCartBold
                                    className="text-xl"
                                    aria-hidden
                                />
                            </span>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    Giỏ hàng
                                </h1>
                                <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                                    {hasItems
                                        ? `${productCart.length} sản phẩm`
                                        : 'Chưa có sản phẩm'}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {!hasItems ? (
                    <div
                        className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-[var(--color-surface)] px-6 py-14 text-center shadow-sm"
                        role="status"
                    >
                        <img
                            src="/gif/empty-product.gif"
                            alt=""
                            className="h-36 w-36 object-contain"
                        />
                        <p className="mt-6 max-w-sm text-[var(--color-text-muted)]">
                            Giỏ hàng trống. Hãy thêm sản phẩm để tiếp tục đặt
                            hàng.
                        </p>
                        <NavLink to="/products" className="mt-8">
                            <Button className="!rounded-xl !px-8 !py-3 !normal-case !font-semibold">
                                Xem sản phẩm
                            </Button>
                        </NavLink>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 grid grid-cols-[2.75rem_1fr] gap-x-3 gap-y-2 rounded-xl border border-slate-200 bg-[var(--color-surface)] px-4 py-3.5 shadow-sm sm:px-5 lg:grid-cols-[2.75rem_1fr_7rem_8.5rem_7rem_4rem] lg:items-center lg:gap-4">
                            <div className="flex h-5 items-center justify-start lg:justify-center">
                                <CartCheckbox
                                    checkboxOnly
                                    id="cart-select-all"
                                    checked={allSelected}
                                    onChange={handleSelectAll}
                                    ariaLabel="Chọn tất cả sản phẩm"
                                />
                            </div>
                            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                                <label
                                    htmlFor="cart-select-all"
                                    className="cursor-pointer select-none text-sm font-medium text-slate-700"
                                >
                                    Chọn tất cả ({productCart.length})
                                </label>
                                {someSelected && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteSelected}
                                        className="text-sm font-semibold text-red-600 underline-offset-2 hover:underline"
                                    >
                                        Xóa đã chọn (
                                        {selectedProducts.length})
                                    </button>
                                )}
                            </div>
                            <div className="hidden lg:block" aria-hidden />
                            <div className="hidden lg:block" aria-hidden />
                            <div className="hidden lg:block" aria-hidden />
                            <div className="hidden lg:block" aria-hidden />
                        </div>

                        {/* Tiêu đề cột — desktop */}
                        <div
                            className="mb-2 hidden gap-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:grid lg:grid-cols-[2.75rem_1fr_7rem_8.5rem_7rem_4rem] lg:px-5"
                            aria-hidden
                        >
                            <span />
                            <span>Sản phẩm</span>
                            <span className="text-center">Đơn giá</span>
                            <span className="text-center">Số lượng</span>
                            <span className="text-right">Thành tiền</span>
                            <span />
                        </div>

                        <ul className="space-y-4">
                            {productCart.map((item) => {
                                const cartItem = cartItems.find(
                                    (c) => c.productId === item._id
                                );
                                const initialQuantity = cartItem
                                    ? cartItem.quantity
                                    : 1;
                                const qty =
                                    quantities[item._id] ?? initialQuantity;
                                const lineTotal = qty * item.price;
                                const selected = selectedProducts.includes(
                                    item._id
                                );
                                const itemCbId = `cart-item-${item._id}`;

                                return (
                                    <li
                                        key={item._id}
                                        className={`overflow-hidden rounded-2xl border bg-[var(--color-surface)] transition-all duration-200 ${
                                            selected
                                                ? 'border-[var(--color-primary)]/40 shadow-[0_4px_20px_-4px_rgba(47,144,75,0.2)] ring-1 ring-[var(--color-primary)]/15'
                                                : 'border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="flex flex-col lg:grid lg:grid-cols-[2.75rem_1fr_7rem_8.5rem_7rem_4rem] lg:items-center lg:gap-4 lg:p-5">
                                            {/* Hàng sản phẩm: checkbox + ảnh + tên */}
                                            <div className="flex gap-3 border-b border-slate-100 p-4 sm:p-5 lg:contents lg:border-b-0 lg:p-0">
                                                <div className="flex w-11 shrink-0 items-center justify-center self-stretch lg:w-auto lg:self-center lg:justify-self-center">
                                                    <CartCheckbox
                                                        checkboxOnly
                                                        id={itemCbId}
                                                        checked={selected}
                                                        onChange={() =>
                                                            handleProductSelect(
                                                                item._id
                                                            )
                                                        }
                                                        ariaLabel={`Chọn ${item.name}`}
                                                    />
                                                </div>
                                                <div className="flex min-w-0 flex-1 gap-4">
                                                    <NavLink
                                                        to={`/products/detail/${item.slug}`}
                                                        className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200/90 transition hover:ring-[var(--color-primary)]/35 sm:h-24 sm:w-24"
                                                    >
                                                        <img
                                                            src={
                                                                item.thumbnail_main
                                                            }
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </NavLink>
                                                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                                                        <NavLink
                                                            to={`/products/detail/${item.slug}`}
                                                            className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition hover:text-[var(--color-primary)]"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                        <p className="text-sm tabular-nums text-slate-500 lg:hidden">
                                                            {formatMoney(
                                                                item.price
                                                            )}
                                                            đ / sản phẩm
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden px-4 text-center text-sm font-medium tabular-nums text-slate-700 lg:block lg:px-0">
                                                {formatMoney(item.price)}đ
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5 lg:border-b-0 lg:justify-center lg:px-0 lg:py-0">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                                                    Số lượng
                                                </span>
                                                <QuantityButton
                                                    variant="cart"
                                                    quantity={
                                                        quantities[item._id] ||
                                                        initialQuantity
                                                    }
                                                    setQuantity={(
                                                        newQuantity
                                                    ) =>
                                                        setQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item._id]:
                                                                    newQuantity,
                                                            })
                                                        )
                                                    }
                                                    price={item.price}
                                                    onQuantityChange={(
                                                        newQuantity
                                                    ) =>
                                                        handleQuantityChange(
                                                            item._id,
                                                            newQuantity
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-between px-4 py-3 sm:px-5 lg:flex-col lg:items-end lg:justify-center lg:px-0 lg:py-0">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                                                    Thành tiền
                                                </span>
                                                <p className="text-lg font-bold tabular-nums text-slate-900 lg:text-base">
                                                    {formatMoney(lineTotal)}đ
                                                </p>
                                            </div>

                                            <div className="flex justify-end border-t border-slate-100 px-4 py-2.5 sm:px-5 lg:border-t-0 lg:justify-center lg:px-0 lg:py-0">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteItem(
                                                            item._id
                                                        )
                                                    }
                                                    className="rounded-lg px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                                    aria-label={`Xóa ${item.name}`}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Bảng thanh toán — nằm ngang */}
                        <div className="mt-8 rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-4 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                                <div className="flex flex-wrap items-end gap-8 sm:gap-10">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Tạm tính
                                        </p>
                                        <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                                            {formatMoney(totalPrice)}đ
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Đã chọn
                                        </p>
                                        <p className="mt-1 text-xl font-semibold tabular-nums text-[var(--color-primary)]">
                                            {totalItems} sản phẩm
                                        </p>
                                    </div>
                                    <div className="flex min-w-0 flex-1 flex-col gap-2 text-xs leading-relaxed text-[var(--color-text-muted)] sm:max-w-md lg:max-w-lg">
                                        <p className="flex gap-2">
                                            <FiTruck
                                                className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                                                aria-hidden
                                            />
                                            <span>
                                                Phí vận chuyển &amp; lắp đặt
                                                được xác nhận khi thanh toán.
                                            </span>
                                        </p>
                                        <p className="flex gap-2">
                                            <IoShieldCheckmarkOutline
                                                className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                                                aria-hidden
                                            />
                                            <span>
                                                Hàng chính hãng, hỗ trợ tư vấn
                                                kỹ thuật.
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full shrink-0 flex-col gap-2 lg:w-auto lg:min-w-[200px]">
                                    {someSelected ? (
                                        <NavLink
                                            to="/pay"
                                            onClick={handleBuyNow}
                                            className="block w-full"
                                        >
                                            <Button className="!w-full !rounded-xl !py-3.5 !normal-case !text-base !font-semibold">
                                                Thanh toán ({totalItems} SP)
                                            </Button>
                                        </NavLink>
                                    ) : (
                                        <Button
                                            type="button"
                                            disabled
                                            className="!w-full !cursor-not-allowed !rounded-xl !py-3.5 !normal-case !text-base !font-semibold !opacity-50"
                                        >
                                            Thanh toán
                                        </Button>
                                    )}
                                    {!someSelected && (
                                        <p className="text-center text-xs text-amber-700">
                                            Chọn ít nhất một sản phẩm.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {hasItems && (
                <div
                    className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[var(--color-surface)]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md lg:hidden"
                    role="region"
                    aria-label="Thanh toán nhanh"
                >
                    <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-slate-500">Tạm tính</p>
                            <p className="text-lg font-bold tabular-nums text-slate-900">
                                {formatMoney(totalPrice)}đ
                            </p>
                        </div>
                        {someSelected ? (
                            <NavLink
                                to="/pay"
                                onClick={handleBuyNow}
                                className="shrink-0"
                            >
                                <Button className="!rounded-xl !px-6 !py-3 !normal-case !font-semibold">
                                    Thanh toán
                                </Button>
                            </NavLink>
                        ) : (
                            <Button
                                type="button"
                                disabled
                                className="!cursor-not-allowed !rounded-xl !px-6 !py-3 !opacity-50"
                            >
                                Thanh toán
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

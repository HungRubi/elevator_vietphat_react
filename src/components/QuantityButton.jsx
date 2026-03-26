import PropTypes from 'prop-types';
import { useState } from 'react';

const focusRing =
    'focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-0';

/**
 * default: viên thuốc — trang chi tiết SP
 * cart: thanh ngang chỉn chu — giỏ hàng (nền sáng)
 * floor: bảng tầng dọc — tùy chọn theme tối
 */
const QuantityButton = ({
    quantity: quantityProp,
    setQuantity: setQuantityProp,
    price,
    onQuantityChange,
    variant = 'default',
    className = '',
    min = 1,
    max = null,
    disabled = false,
}) => {
    const [internalQty, setInternalQty] = useState(() => quantityProp ?? 1);
    const controlled =
        typeof setQuantityProp === 'function' && quantityProp != null;

    const quantity = controlled ? quantityProp : internalQty;
    const setQuantity = controlled ? setQuantityProp : setInternalQty;

    const maxN = max != null && !Number.isNaN(Number(max)) ? Number(max) : null;
    const capped = (raw) => {
        let v = Math.max(min, raw);
        if (maxN != null) v = Math.min(v, maxN);
        return v;
    };

    const sync = (next) => {
        if (disabled) return;
        const v = capped(next);
        setQuantity(v);
        if (typeof onQuantityChange === 'function') {
            onQuantityChange(v, price);
        }
    };

    const handleDecrease = () => {
        if (disabled) return;
        if (quantity > min) sync(quantity - 1);
    };

    const handleIncrease = () => {
        if (disabled) return;
        if (maxN != null && quantity >= maxN) return;
        sync(quantity + 1);
    };

    const handleInputChange = (e) => {
        if (disabled) return;
        const value = parseInt(e.target.value, 10);
        if (!Number.isNaN(value) && value >= min) sync(value);
    };

    const atMax = maxN != null && quantity >= maxN;
    const atMin = quantity <= min;

    const baseBtn =
        'flex select-none items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-35';

    if (variant === 'floor') {
        return (
            <div
                className={`inline-flex flex-col overflow-hidden rounded-2xl bg-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(52,211,153,0.35),0_8px_32px_rgba(0,0,0,0.45)] ${disabled ? 'opacity-45' : ''} ${className}`}
                role="group"
                aria-label="Điều chỉnh số lượng"
            >
                <button
                    type="button"
                    className={`${baseBtn} ${focusRing} h-10 w-[3.25rem] rounded-t-xl bg-zinc-800/90 text-lg text-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-200 active:bg-emerald-500/35`}
                    onClick={handleIncrease}
                    disabled={disabled || atMax}
                    aria-label="Tăng số lượng"
                >
                    +
                </button>
                <input
                    type="text"
                    inputMode="numeric"
                    value={quantity || min}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="w-[3.25rem] border-0 bg-black/55 py-2 text-center font-mono text-base tabular-nums tracking-widest text-emerald-300 caret-emerald-400 outline-none disabled:opacity-50"
                    aria-label="Số lượng"
                />
                <button
                    type="button"
                    className={`${baseBtn} ${focusRing} h-10 w-[3.25rem] rounded-b-xl bg-zinc-800/90 text-lg text-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-200 active:bg-emerald-500/35 disabled:opacity-40`}
                    onClick={handleDecrease}
                    disabled={disabled || atMin}
                    aria-label="Giảm số lượng"
                >
                    −
                </button>
            </div>
        );
    }

    if (variant === 'cart') {
        return (
            <div
                className={`inline-flex h-9 items-stretch overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${disabled ? 'opacity-45' : ''} ${className}`}
                role="group"
                aria-label="Điều chỉnh số lượng"
            >
                <button
                    type="button"
                    className={`${baseBtn} ${focusRing} w-9 text-base leading-none text-slate-500 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100`}
                    onClick={handleDecrease}
                    disabled={quantity <= min}
                    aria-label="Giảm số lượng"
                >
                    −
                </button>
                <input
                    type="text"
                    inputMode="numeric"
                    value={quantity || min}
                    onChange={handleInputChange}
                    className="w-11 min-w-[2.75rem] border-x border-slate-200 bg-slate-50/90 py-0 text-center text-sm font-semibold tabular-nums text-slate-900 outline-none transition focus:bg-white"
                    aria-label="Số lượng"
                />
                <button
                    type="button"
                    className={`${baseBtn} ${focusRing} w-9 text-base leading-none text-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.08] active:bg-[var(--color-primary)]/[0.12]`}
                    onClick={handleIncrease}
                    aria-label="Tăng số lượng"
                >
                    +
                </button>
            </div>
        );
    }

    /* default — capsule ngang */
    return (
        <div
            className={`inline-flex items-stretch overflow-hidden rounded-full border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] ${disabled ? 'opacity-45' : ''} ${className}`}
            role="group"
            aria-label="Điều chỉnh số lượng"
        >
            <button
                type="button"
                className={`${baseBtn} ${focusRing} w-10 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40`}
                onClick={handleDecrease}
                disabled={disabled || atMin}
                aria-label="Giảm số lượng"
            >
                −
            </button>
            <input
                type="text"
                inputMode="numeric"
                value={quantity || min}
                onChange={handleInputChange}
                disabled={disabled}
                className="w-11 border-0 border-x border-slate-100 bg-slate-50/80 py-2 text-center text-sm font-semibold tabular-nums text-slate-900 outline-none focus:bg-white disabled:opacity-50"
                aria-label="Số lượng"
            />
            <button
                type="button"
                className={`${baseBtn} ${focusRing} w-10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10`}
                onClick={handleIncrease}
                disabled={disabled || atMax}
                aria-label="Tăng số lượng"
            >
                +
            </button>
        </div>
    );
};

QuantityButton.propTypes = {
    quantity: PropTypes.number,
    setQuantity: PropTypes.func,
    price: PropTypes.number,
    onQuantityChange: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'cart', 'floor']),
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
};

export default QuantityButton;

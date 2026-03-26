import { useState, useRef, useEffect, useMemo } from 'react';
import icons from '../util/icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { VoucherEmpty } from '../util/iconSgv';
import { fetchDiscounts } from "../store/slices/discountSlice";
import { selectVoucher } from "../store/slices/userSlice";

const { AiOutlineQuestionCircle, IoCloseSharp } = icons;

const LABEL_CHOOSE = 'Chọn voucher';

function parseEndDate(endDateStr) {
    if (!endDateStr) return null;
    try {
        const [day, month, year] = endDateStr.split('/');
        const d = new Date(year, month - 1, day);
        if (Number.isNaN(d.getTime())) return null;
        d.setHours(0, 0, 0, 0);
        return d;
    } catch {
        return null;
    }
}

const ModalDiscount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [localPick, setLocalPick] = useState(null);
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const { discount } = useSelector((state) => state.discount);
    const appliedVoucher = useSelector((state) => state.user.selectedVoucher);

    const validDiscounts = useMemo(() => {
        if (!discount?.length) return [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return discount.filter((item) => {
            const end = parseEndDate(item.endDate);
            return end != null && end >= today;
        });
    }, [discount]);

    useEffect(() => {
        // đảm bảo có dữ liệu voucher khi mở modal
        dispatch(fetchDiscounts());
    }, [dispatch]);

    useEffect(() => {
        const onDown = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', onDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    /* Khi mở modal: đồng bộ với voucher đang áp dụng trên store (nếu còn hạn) */
    useEffect(() => {
        if (!isOpen) return;
        const appliedStillValid =
            appliedVoucher &&
            validDiscounts.some((d) => d._id === appliedVoucher._id);
        if (appliedStillValid) {
            setLocalPick(appliedVoucher);
        } else if (validDiscounts.length > 0) {
            setLocalPick(validDiscounts[0]);
        } else {
            setLocalPick(null);
        }
    }, [isOpen, appliedVoucher, validDiscounts]);

    const handleApply = () => {
        if (localPick) {
            dispatch(selectVoucher(localPick));
            setIsOpen(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="shrink-0 rounded-xl border border-[var(--color-primary)]/35 bg-[var(--color-primary)]/5 px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
                {LABEL_CHOOSE}
            </button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-voucher-title"
                >
                    <div
                        ref={modalRef}
                        className="flex max-h-[min(90vh,560px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[var(--color-surface)] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="modal-voucher-title"
                                    className="text-lg font-bold text-slate-900 sm:text-xl"
                                >
                                    {LABEL_CHOOSE}
                                </h2>
                                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <AiOutlineQuestionCircle
                                        className="text-base text-slate-400"
                                        aria-hidden
                                    />
                                    Chỉ hiển thị mã còn hạn sử dụng
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                                aria-label="Đóng"
                            >
                                <IoCloseSharp className="text-xl" />
                            </button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300"
                        >
                            {validDiscounts.length > 0 ? (
                                <ul className="space-y-3">
                                    {validDiscounts.map((item) => {
                                        const checked =
                                            localPick?._id === item._id;
                                        return (
                                            <li key={item._id}>
                                                <label
                                                    className={`flex cursor-pointer gap-3 border-2 p-3 transition sm:gap-4 sm:p-4 ${
                                                        checked
                                                            ? 'border-[var(--color-primary)] bg-emerald-50/50'
                                                            : 'border-slate-200 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="discount-pick"
                                                        className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                                                        checked={checked}
                                                        onChange={() =>
                                                            setLocalPick(item)
                                                        }
                                                    />
                                                    <img
                                                        src="/img/voucher.png"
                                                        alt=""
                                                        className="h-20 w-20 shrink-0 object-cover sm:h-[88px] sm:w-[88px]"
                                                    />
                                                    <div className="min-w-0 flex-1 text-left">
                                                        <p className="font-semibold text-slate-900">
                                                            {item.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            HSD: {item.endDate}
                                                        </p>
                                                        <span className="mt-2 inline-block text-xs font-medium text-[var(--color-primary)]">
                                                            Xem điều kiện tại
                                                            chi tiết mã
                                                        </span>
                                                    </div>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <VoucherEmpty />
                                    <p className="mt-4 text-sm font-medium text-slate-600">
                                        Không có voucher khả dụng
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Hiện không có mã giảm giá trong thời
                                        gian này
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
                            <Button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="!border !border-slate-300 !bg-white !normal-case !font-semibold !text-slate-700 hover:!bg-slate-50"
                            >
                                Trở lại
                            </Button>
                            <Button
                                type="button"
                                onClick={handleApply}
                                disabled={!localPick}
                                className="!normal-case !font-semibold disabled:!cursor-not-allowed disabled:!opacity-50"
                            >
                                Áp dụng
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ModalDiscount;

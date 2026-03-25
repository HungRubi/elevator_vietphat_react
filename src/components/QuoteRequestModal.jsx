import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const QuoteRequestModal = ({ open, onClose, productName, productSlug }) => {
    const titleId = useId();
    const firstFieldRef = useRef(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        const t = requestAnimationFrame(() => firstFieldRef.current?.focus());
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            cancelAnimationFrame(t);
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            setName('');
            setPhone('');
            setNote('');
            setSubmitting(false);
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            toast.error('Vui lòng nhập họ tên và số điện thoại.');
            return;
        }
        setSubmitting(true);
        // Gửi backend / EmailJS có thể nối sau; hiện xác nhận UX
        setTimeout(() => {
            toast.success('Đã ghi nhận yêu cầu. Chúng tôi sẽ liên hệ sớm.');
            setSubmitting(false);
            onClose();
        }, 400);
    };

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center sm:p-4"
            role="presentation"
        >
            <button
                type="button"
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                aria-label="Đóng"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 w-full max-w-md rounded-t-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:rounded-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <h2 id={titleId} className="text-lg font-bold text-slate-900">
                        Nhận báo giá
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/30"
                        aria-label="Đóng hộp thoại"
                    >
                        ×
                    </button>
                </div>
                {productName ? (
                    <p className="mt-2 text-sm text-slate-600">
                        Sản phẩm:{' '}
                        <span className="font-semibold text-slate-900">{productName}</span>
                        {productSlug ? (
                            <span className="ml-1 text-xs text-slate-400">({productSlug})</span>
                        ) : null}
                    </p>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="quote-name" className="block text-sm font-medium text-slate-700">
                            Họ và tên <span className="text-red-600">*</span>
                        </label>
                        <input
                            ref={firstFieldRef}
                            id="quote-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20"
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="quote-phone" className="block text-sm font-medium text-slate-700">
                            Số điện thoại <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="quote-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20"
                            autoComplete="tel"
                        />
                    </div>
                    <div>
                        <label htmlFor="quote-note" className="block text-sm font-medium text-slate-700">
                            Ghi chú
                        </label>
                        <textarea
                            id="quote-note"
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20"
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            aria-busy={submitting}
                            className="rounded-xl bg-[#2f904b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#268a42] focus:outline-none focus:ring-2 focus:ring-[#2f904b]/40 disabled:opacity-60"
                        >
                            {submitting ? 'Đang gửi…' : 'Gửi yêu cầu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

QuoteRequestModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    productName: PropTypes.string,
    productSlug: PropTypes.string,
};

export default QuoteRequestModal;

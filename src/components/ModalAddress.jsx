import { useState, useRef, useEffect } from 'react';
import { Button } from './index';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../util/icons';

const { IoCloseSharp } = icons;

const LABEL_CHANGE = 'Thay đổi địa chỉ';

const emptyForm = () => ({
    name: '',
    phone: '',
    address: '',
    specificAddress: '',
});

const ModalAddress = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [err, setErr] = useState(null);
    const modalRef = useRef(null);

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

    /* Mở modal: đồng bộ form với thông tin user hiện tại (chỉ khi mở, tránh ghi đè lúc đang nhập) */
    useEffect(() => {
        if (!isOpen) return;
        setErr(null);
        setFormData({
            name: currentUser?.name ?? '',
            phone: currentUser?.phone ?? '',
            address: '',
            specificAddress: (currentUser?.address ?? '').trim(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ sync theo lần mở modal
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === '') {
            setErr('Nhập họ tên của bạn');
            return;
        }

        if (formData.phone === '') {
            setErr('Nhập số điện thoại của bạn');
            return;
        }

        if (formData.address === '' && formData.specificAddress === '') {
            setErr('Nhập địa chỉ của bạn');
            return;
        }

        setErr(null);
        const combinedAddress = `${formData.specificAddress} ${formData.address}`.trim();
        const formDataToSubmit = {
            name: formData.name,
            phone: formData.phone,
            address: combinedAddress,
        };

        dispatch(actions.updateAddress(formDataToSubmit, currentUser?._id));
        setIsOpen(false);
    };

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20';

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="shrink-0 rounded-xl border border-[var(--color-primary)]/35 bg-[var(--color-primary)]/5 px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
                {LABEL_CHANGE}
            </button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-address-title"
                >
                    <div
                        ref={modalRef}
                        className="flex max-h-[min(90vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[var(--color-surface)] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="modal-address-title"
                                    className="text-lg font-bold text-slate-900 sm:text-xl"
                                >
                                    {LABEL_CHANGE}
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Cập nhật thông tin nhận hàng cho đơn này
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

                        <form
                            onSubmit={handleSubmit}
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <input
                                            onChange={handleChange}
                                            value={formData.name}
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Họ và tên"
                                            className={inputClass}
                                        />
                                        <input
                                            onChange={handleChange}
                                            value={formData.phone}
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="Số điện thoại"
                                            className={inputClass}
                                        />
                                    </div>
                                    <input
                                        onChange={handleChange}
                                        value={formData.address}
                                        name="address"
                                        type="text"
                                        autoComplete="address-level1"
                                        placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                                        className={inputClass}
                                    />
                                    <input
                                        onChange={handleChange}
                                        value={formData.specificAddress}
                                        name="specificAddress"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="Địa chỉ cụ thể (số nhà, đường, tòa nhà…)"
                                        className={inputClass}
                                    />
                                    {err ? (
                                        <p
                                            className="text-sm text-red-600"
                                            role="alert"
                                        >
                                            {err}
                                        </p>
                                    ) : null}
                                </div>
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
                                    type="submit"
                                    className="!normal-case !font-semibold"
                                >
                                    Hoàn thành
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ModalAddress;

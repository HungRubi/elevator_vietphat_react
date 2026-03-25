import { Button, Form } from './index';
import { useState, useRef, useEffect } from 'react';
import icons from '../util/icons';

const { IoCloseSharp } = icons;

const LABEL = 'Trả hàng / khiếu nại';

const ModelContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="!rounded-xl !border !border-slate-200 !bg-white !normal-case !font-semibold !text-slate-700 hover:!border-slate-300 hover:!bg-slate-50"
            >
                {LABEL}
            </Button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-return-title"
                >
                    <div
                        ref={modalRef}
                        className="flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[var(--color-surface)] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="modal-return-title"
                                    className="text-lg font-bold text-slate-900 sm:text-xl"
                                >
                                    {LABEL}
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Điền form — bộ phận CSKH sẽ liên hệ theo thông tin bạn gửi.
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
                        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                            <div className="[&>div>div]:!rounded-none [&>div>div]:!border-0 [&>div>div]:!bg-transparent [&>div>div]:!p-0 [&>div>div]:!shadow-none">
                                <Form variant="embedded" className="!mt-0" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ModelContact;

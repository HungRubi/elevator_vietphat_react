import { toast } from "react-toastify";
import { Button, ModalAddress } from "../../components";
import icons from "../../util/icons";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const { GoPlus, FaMapMarkerAlt } = icons;

const Address = () => {
    const { currentUser } = useSelector((state) => state.user);

    const handlePlaceholder = () => {
        toast.warning("Chức năng đang được cập nhật.");
    };

    return (
        <>
            <Helmet>
                <title>Địa chỉ - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Địa chỉ giao hàng</h1>
                        <p className="mt-1 text-sm text-slate-600">Địa chỉ mặc định dùng cho đơn hàng.</p>
                    </div>
                    <Button
                        type="button"
                        onClick={handlePlaceholder}
                        className="!inline-flex !w-full !items-center !justify-center !gap-2 !rounded-xl !normal-case sm:!w-auto"
                    >
                        <GoPlus className="size-5" aria-hidden />
                        Thêm địa chỉ
                    </Button>
                </div>
            </div>

            <div className="p-6 md:p-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#2f904b] ring-1 ring-emerald-100">
                                <FaMapMarkerAlt className="size-6" aria-hidden />
                            </div>
                            <div className="min-w-0">
                                <p className="text-lg font-extrabold text-slate-900">{currentUser?.name || "Khách hàng"}</p>
                                <p className="mt-1 text-sm font-medium text-slate-500">{currentUser?.phone}</p>
                                <address className="mt-3 text-sm not-italic leading-relaxed text-slate-700">
                                    {currentUser?.address || "Chưa cập nhật địa chỉ — vui lòng chỉnh trong hồ sơ hoặc liên hệ hỗ trợ."}
                                </address>
                                <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1b5e35]">
                                    Mặc định
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                            <ModalAddress />
                            <button
                                type="button"
                                onClick={handlePlaceholder}
                                className="text-left text-xs font-semibold text-[#2f904b] underline decoration-emerald-200 underline-offset-2 hover:decoration-[#2f904b] sm:text-right"
                            >
                                Thiết lập mặc định
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Address;

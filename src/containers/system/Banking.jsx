import { toast } from "react-toastify";
import { Button } from "../../components";
import icons from "../../util/icons";
import { Helmet } from "react-helmet";

const { GoPlus, RiBillLine } = icons;

const Banking = () => {
    const handleSoon = () => {
        toast.warning("Chức năng đang được hoàn thiện. Vui lòng quay lại sau.");
    };

    const EmptyBlock = ({ title, description, actionLabel }) => (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/90 px-6 py-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm ring-1 ring-slate-100">
                <RiBillLine className="size-7" aria-hidden />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-700">{title}</p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{description}</p>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Ngân hàng &amp; thẻ - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Thanh toán &amp; liên kết</h1>
                <p className="mt-1 text-sm text-slate-600">Quản lý thẻ và tài khoản ngân hàng (sắp ra mắt).</p>
            </div>

            <div className="space-y-8 p-6 md:p-8">
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
                    <span className="font-bold">Lưu ý:</span> Liên kết thẻ / ngân hàng đang trong giai đoạn nâng cấp. Thanh toán đơn hàng hiện thực hiện qua các kênh hướng dẫn khi đặt hàng.
                </div>

                <section>
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-extrabold text-slate-900">Thẻ tín dụng / ghi nợ</h2>
                            <p className="text-xs text-slate-500">Lưu thẻ an toàn để thanh toán nhanh hơn.</p>
                        </div>
                        <Button
                            type="button"
                            onClick={handleSoon}
                            className="!inline-flex !w-full !items-center !justify-center !gap-2 !rounded-xl !normal-case sm:!w-auto"
                        >
                            <GoPlus className="size-5" aria-hidden />
                            Thêm thẻ
                        </Button>
                    </div>
                    <EmptyBlock
                        title="Chưa có thẻ liên kết"
                        description="Khi tính năng mở, bạn có thể thêm thẻ ngay tại đây với xác thực bảo mật."
                    />
                </section>

                <section>
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-extrabold text-slate-900">Tài khoản ngân hàng</h2>
                            <p className="text-xs text-slate-500">Nhận hoàn tiền hoặc chuyển khoản doanh nghiệp.</p>
                        </div>
                        <Button
                            type="button"
                            onClick={handleSoon}
                            className="!inline-flex !w-full !items-center !justify-center !gap-2 !rounded-xl !normal-case sm:!w-auto"
                        >
                            <GoPlus className="size-5" aria-hidden />
                            Thêm tài khoản
                        </Button>
                    </div>
                    <EmptyBlock
                        title="Chưa có tài khoản ngân hàng"
                        description="Thêm STK để đồng bộ giao dịch — chúng tôi sẽ thông báo khi kích hoạt."
                    />
                </section>
            </div>
        </>
    );
};

export default Banking;

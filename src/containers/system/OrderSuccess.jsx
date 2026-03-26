import { NavLink, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import icons from "../../util/icons";

const { PiShoppingCartBold } = icons;

function pickSearchValue(search, key) {
    try {
        const sp = new URLSearchParams(search);
        const v = sp.get(key);
        return v == null ? "" : String(v);
    } catch {
        return "";
    }
}

const OrderSuccess = () => {
    const location = useLocation();
    const code = pickSearchValue(location.search, "code");

    return (
        <>
            <Helmet>
                <title>Đặt hàng thành công - Thang máy Việt Phát</title>
            </Helmet>

            <div className="min-h-[calc(100vh-120px)] bg-[var(--color-bg)] px-4 py-10 sm:py-14">
                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-[var(--color-surface)] shadow-[0_26px_70px_rgba(2,6,23,0.10)]">
                        <div className="h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-emerald-300 to-teal-200" />

                        <div className="relative px-6 py-12 text-center sm:px-10">
                            <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-emerald-200/45 blur-3xl" />
                            <div className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-teal-200/35 blur-3xl" />

                            <div className="relative mx-auto flex size-20 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--color-primary)] ring-2 ring-emerald-100">
                                <svg viewBox="0 0 24 24" className="size-11" aria-hidden>
                                    <path
                                        fill="currentColor"
                                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                    />
                                </svg>
                            </div>

                            <h1 className="relative mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                Đặt hàng thành công
                            </h1>
                            <p className="relative mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                                Cảm ơn bạn. Đơn hàng đã được ghi nhận và sẽ được xử lý sớm.
                            </p>

                            {code ? (
                                <div className="relative mx-auto mt-7 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm">
                                    <span className="text-slate-500">Mã đơn</span>
                                    <span className="font-mono font-extrabold text-slate-900">{code}</span>
                                </div>
                            ) : null}

                            <div className="relative mt-10 grid gap-3 sm:grid-cols-2">
                                <NavLink
                                    to="/account/order"
                                    className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(47,144,75,0.7)] transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
                                >
                                    Xem đơn hàng
                                </NavLink>
                                <NavLink
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                                >
                                    <PiShoppingCartBold className="text-lg" aria-hidden />
                                    Tiếp tục mua sắm
                                </NavLink>
                            </div>

                            <p className="relative mx-auto mt-6 max-w-lg text-xs leading-relaxed text-slate-500">
                                Gợi ý: bạn có thể theo dõi trạng thái tại mục “Đơn hàng”. Nếu cần hỗ trợ gấp, hãy liên hệ hotline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSuccess;


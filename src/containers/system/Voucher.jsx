import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscounts } from "../../store/slices/discountSlice";
import { PageBar } from "../../components";
import { Helmet } from "react-helmet";
import icons from "../../util/icons";

const { BsTag, FaRegCalendarAlt } = icons;

const LIMIT = 5;

const Voucher = () => {
    const { discount } = useSelector((state) => state.discount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDiscounts());
    }, [dispatch]);

    const [current, setCurrent] = useState(1);
    const discountActive = (discount || []).filter((item) => item.is_active === "active");
    const totalPage = Math.max(1, Math.ceil(discountActive.length / LIMIT));
    const slice = discountActive.slice((current - 1) * LIMIT, current * LIMIT);

    useEffect(() => {
        setCurrent((c) => Math.min(c, totalPage));
    }, [totalPage]);

    return (
        <>
            <Helmet>
                <title>Voucher - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Voucher &amp; ưu đãi</h1>
                <p className="mt-1 text-sm text-slate-600">Mã giảm giá đang áp dụng — dùng khi thanh toán theo hướng dẫn.</p>
            </div>

            <div className="p-6 md:p-8">
                {slice.length > 0 ? (
                    <ul className="space-y-4">
                        {slice.map((item) => (
                            <li
                                key={item._id}
                                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex items-center justify-center bg-gradient-to-br from-[#2f904b] to-emerald-800 px-6 py-8 text-white md:w-44 md:shrink-0">
                                        <div className="text-center">
                                            <BsTag className="mx-auto size-10 opacity-90" aria-hidden />
                                            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-80">Ưu đãi</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center border-t border-dashed border-slate-200 p-5 md:border-l md:border-t-0 md:pl-8">
                                        <h2 className="text-lg font-extrabold text-slate-900">{item.title}</h2>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1">
                                                <FaRegCalendarAlt className="size-3.5 text-[#2f904b]" aria-hidden />
                                                {item.startDate} — {item.endDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="pointer-events-none absolute -left-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full border border-slate-200 bg-[#f4f7f5] md:block"
                                    aria-hidden
                                />
                                <div
                                    className="pointer-events-none absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full border border-slate-200 bg-[#f4f7f5] md:block"
                                    aria-hidden
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16 text-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-[#2f904b] shadow-sm ring-1 ring-emerald-100">
                            <BsTag className="size-8" aria-hidden />
                        </div>
                        <p className="mt-4 text-sm font-bold text-slate-700">Chưa có voucher khả dụng</p>
                        <p className="mt-1 max-w-sm text-xs text-slate-500">
                            Theo dõi thông báo và tin tức để nhận mã giảm giá mới nhất.
                        </p>
                    </div>
                )}

                {discountActive.length > LIMIT ? (
                    <PageBar className="mt-8" currentPage={current} totalPage={totalPage} onPageChange={setCurrent} />
                ) : null}
            </div>
        </>
    );
};

export default Voucher;

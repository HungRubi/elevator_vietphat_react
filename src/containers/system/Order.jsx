import { useDispatch, useSelector } from "react-redux";
import { ListOrder } from "../../components";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { Helmet } from "react-helmet";
import icons from "../../util/icons";

const { FiSearch, BsArrowRightSquareFill, FiTruck, RiBillLine } = icons;

const filterByQuery = (list, query) => {
    const q = query.trim().toLowerCase();
    if (!q || !list?.length) return list || [];
    return list.filter((o) => {
        const code = (o.order_code || o._id || "").toString().toLowerCase();
        if (code.includes(q)) return true;
        return o.orderDetails?.some((d) => (d.product?.name || "").toLowerCase().includes(q));
    });
};

const Order = () => {
    const dispatch = useDispatch();
    const { orders, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const [query, setQuery] = useState("");
    const ordersSectionRef = useRef(null);
    const skipTabScrollRef = useRef(true);

    /** Đổi tab khi đang ở cuối trang → cuộn lại đầu danh sách (không chạy lúc mount) */
    useEffect(() => {
        if (skipTabScrollRef.current) {
            skipTabScrollRef.current = false;
            return;
        }
        const id = requestAnimationFrame(() => {
            ordersSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return () => cancelAnimationFrame(id);
    }, [active]);

    const sortedOrders = useMemo(
        () => [...(orders || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [orders]
    );

    const [orderHanle, setOrderHanle] = useState([]);
    const [orderDelivery, setOrderDelivery] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState([]);
    const [orderFail, setOrderFail] = useState([]);

    useEffect(() => {
        dispatch(actions.getOrderByUser(currentUser?._id));
    }, [dispatch, currentUser]);

    useEffect(() => {
        setOrderHanle(sortedOrders.filter((item) => item.status === "Đang xử lý"));
        setOrderDelivery(sortedOrders.filter((item) => item.status === "Đang giao hàng"));
        setOrderSuccess(sortedOrders.filter((item) => item.status === "Thành công"));
        setOrderFail(sortedOrders.filter((item) => item.status === "Thất bại"));
    }, [sortedOrders]);

    const tabs = useMemo(
        () => [
            { id: 0, title: "Tất cả", list: sortedOrders },
            { id: 1, title: "Chờ xử lý", list: orderHanle },
            { id: 2, title: "Đang giao", list: orderDelivery },
            { id: 3, title: "Đã giao", list: orderSuccess },
            { id: 4, title: "Đã hủy", list: orderFail },
            { id: 5, title: "Trả hàng", list: [] },
        ],
        [sortedOrders, orderHanle, orderDelivery, orderSuccess, orderFail]
    );

    const rawList = tabs[active]?.list || [];
    const displayedOrders = filterByQuery(rawList, query);

    const stats = useMemo(
        () => [
            { n: sortedOrders.length, label: "Tổng đơn", accent: "text-slate-900" },
            { n: orderHanle.length, label: "Chờ xử lý", accent: "text-amber-600" },
            { n: orderDelivery.length, label: "Đang giao", accent: "text-sky-600" },
            { n: orderSuccess.length, label: "Hoàn thành", accent: "text-[#2f904b]" },
            { n: orderFail.length, label: "Đã hủy", accent: "text-rose-600" },
        ],
        [sortedOrders.length, orderHanle.length, orderDelivery.length, orderSuccess.length, orderFail.length]
    );

    const hanleCanCelOrder = useCallback(
        (orderId) => () => {
            dispatch(
                actions.updateOrder(orderId, {
                    status: "Thất bại",
                    userId: currentUser?._id,
                })
            );
        },
        [dispatch, currentUser]
    );

    const handleBuyAgain = useCallback(
        (order) => {
            const products = order.orderDetails.map((item) => ({
                product: item.product,
                quantity: item.quantity,
            }));
            dispatch(actions.setSelectedProducts(products));
            navigate("/pay");
        },
        [dispatch, navigate]
    );

    return (
        <>
            <Helmet>
                <title>Đơn hàng - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>

            <div className="w-full bg-[#f4f7f5]">
                {/* Hero — không dùng margin âm kéo thống kê chồng lên (tránh che số liệu) */}
                <section className="relative overflow-hidden rounded-t-2xl border-b border-emerald-900/15 bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#0c1f18]">
                    <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0zm24 24h24v24H24V24z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                        }}
                    />
                    <div className="relative mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14 lg:py-16">
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400/90">Trung tâm đơn hàng</p>
                        <h1 className="mt-3 max-w-3xl text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl lg:leading-tight">
                            Đơn hàng
                            <span className="bg-gradient-to-r from-emerald-300 to-[#9ae6b4] bg-clip-text text-transparent"> của bạn</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base lg:text-lg">
                            Theo dõi từng trạng thái, tìm theo mã đơn hoặc tên sản phẩm, xuất hóa đơn và mua lại — tất cả tập trung
                            một nơi, bố cục rộng rãi cho danh sách dài.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {["Minh bạch", "Cập nhật realtime", "Hỗ trợ nhanh", "Lịch sử đầy đủ"].map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-sm"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <NavLink
                                to="/products"
                                className="inline-flex items-center gap-2 rounded-2xl bg-[#2f904b] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(47,144,75,0.4)] transition hover:bg-emerald-600"
                            >
                                Tiếp tục mua sắm
                                <BsArrowRightSquareFill className="size-5" aria-hidden />
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
                            >
                                Liên hệ hỗ trợ
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* Thống kê — tách rời hero, luôn nổi trên nền xám (không bị hero đè) */}
                <section className="relative z-10 mx-auto max-w-[1200px] px-4 pt-6 md:px-8 md:pt-8">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-[0_12px_40px_rgba(2,6,23,0.06)] md:p-5"
                            >
                                <p className={`text-2xl font-black tabular-nums md:text-3xl ${s.accent}`}>{s.n}</p>
                                <p className="mt-1 text-[11px] font-semibold leading-snug text-slate-600 md:text-xs">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Danh sách đơn: thanh tìm + tab ghim khi cuộn (dưới HeaderBar sticky z-50) */}
                <section
                    ref={ordersSectionRef}
                    className="mx-auto max-w-[1200px] scroll-mt-24 px-4 py-8 md:scroll-mt-28 md:px-8 md:py-12"
                >
                    <div className="sticky top-20 z-30 mb-4 rounded-lg border border-slate-200/90 bg-white/95 p-3 shadow-md backdrop-blur-md sm:p-4">
                        <div className="relative space-y-3 overflow-visible">
                            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-100/40 blur-2xl" aria-hidden />
                            <div className="relative space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 text-[#2f904b]">
                                        <RiBillLine className="size-5" aria-hidden />
                                        <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">Danh sách đơn</h2>
                                    </div>
                                    <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 md:text-sm">
                                        Mở rộng từng đơn để xem chi tiết. Tab lọc theo trạng thái — số trong badge là số đơn.
                                    </p>
                                </div>
                                <div className="relative max-w-2xl">
                                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Mã đơn, tên sản phẩm…"
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50/90 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#2f904b] focus:bg-white focus:ring-2 focus:ring-[#2f904b]/20"
                                        aria-label="Tìm đơn hàng"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lọc theo trạng thái</p>
                                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin] snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
                                        {tabs.map((tab, index) => {
                                            const count = tab.list?.length ?? 0;
                                            const isActive = active === index;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActive(index)}
                                                    className={`flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold transition ${
                                                        isActive
                                                            ? "border-[#2f904b] bg-emerald-50 text-[#2f904b] shadow-sm ring-1 ring-emerald-100"
                                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    <span className="whitespace-nowrap">{tab.title}</span>
                                                    <span
                                                        className={`min-w-[1.75rem] rounded-full px-2 py-0.5 text-center text-xs font-black tabular-nums ${
                                                            isActive ? "bg-[#2f904b] text-white" : "bg-slate-100 text-slate-600"
                                                        }`}
                                                    >
                                                        {count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {query.trim() && rawList.length > 0 && displayedOrders.length === 0 ? (
                        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center shadow-sm">
                            <p className="text-sm font-semibold text-slate-700">Không có đơn khớp “{query.trim()}”</p>
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="mt-3 text-sm font-bold text-[#2f904b] underline decoration-emerald-200 underline-offset-2"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <ListOrder
                            orders={displayedOrders}
                            handleBuyAgain={handleBuyAgain}
                            hanleCanCelOrder={hanleCanCelOrder}
                        />
                    )}

                    {/* CTA cuối — nhịp giống About */}
                    <div className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-emerald-200/60 bg-gradient-to-br from-[#2f904b] to-emerald-800 p-8 text-center shadow-[0_28px_64px_rgba(47,144,75,0.28)] md:p-10">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
                        <FiTruck className="relative mx-auto size-10 text-white/90" aria-hidden />
                        <h2 className="relative mt-4 text-xl font-extrabold text-white md:text-2xl">Cần đổi địa chỉ hoặc hỏi tiến độ?</h2>
                        <p className="relative mx-auto mt-2 max-w-lg text-sm leading-relaxed text-emerald-50 md:text-base">
                            Đội ngũ Việt Phát hỗ trợ theo mã đơn — gửi yêu cầu qua trang liên hệ hoặc hotline để xử lý nhanh.
                        </p>
                        <NavLink
                            to="/contact"
                            className="relative mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#2f904b] shadow-lg transition hover:bg-emerald-50"
                        >
                            Liên hệ ngay
                            <BsArrowRightSquareFill className="size-5" aria-hidden />
                        </NavLink>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Order;

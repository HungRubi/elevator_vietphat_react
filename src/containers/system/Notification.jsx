import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageBar } from "../../components";
import * as actions from "../../store/actions";
import { Helmet } from "react-helmet";
import icons from "../../util/icons";

const { FaRegBell, IoIosSend } = icons;

const LIMIT = 8;

const Notification = () => {
    const dispatch = useDispatch();
    const { myNotifi, currentUser } = useSelector((state) => state.user);
    const [current, setCurrent] = useState(1);

    const list = myNotifi || [];
    const totalPage = Math.max(1, Math.ceil(list.length / LIMIT));
    const slice = list.slice((current - 1) * LIMIT, current * LIMIT);

    const markRead = (id) => {
        dispatch(
            actions.isReadNotification(id, {
                user_id: currentUser?._id,
                isRead: true,
            })
        );
    };

    return (
        <>
            <Helmet>
                <title>Thông báo - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Thông báo</h1>
                <p className="mt-1 text-sm text-slate-600">Đơn hàng, khuyến mãi và cập nhật từ Việt Phát.</p>
            </div>

            <div className="p-6 md:p-8">
                {slice.length > 0 ? (
                    <ul className="space-y-3">
                        {slice.map((item) => (
                            <li
                                key={item._id}
                                className={`rounded-2xl border p-4 md:flex md:items-start md:gap-4 md:p-5 ${
                                    item.isRead
                                        ? "border-slate-200 bg-white"
                                        : "border-emerald-200 bg-emerald-50/40 ring-1 ring-emerald-100"
                                }`}
                            >
                                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <img src="/img/logo.png" alt="" className="size-9 object-contain" />
                                </div>
                                <div className="mt-3 min-w-0 flex-1 md:mt-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#1b5e35]">
                                            <IoIosSend className="size-3" aria-hidden />
                                            {item.type}
                                        </span>
                                        {!item.isRead ? (
                                            <span className="rounded-full bg-[#2f904b] px-2 py-0.5 text-[10px] font-bold text-white">
                                                Mới
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-800">{item.message}</p>
                                    <p className="mt-2 text-xs font-medium text-slate-400">{item.timeAgo}</p>
                                </div>
                                <div className="mt-3 shrink-0 md:mt-0 md:self-center">
                                    {!item.isRead ? (
                                        <button
                                            type="button"
                                            onClick={() => markRead(item._id)}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-[#2f904b] hover:text-[#2f904b] md:w-auto"
                                        >
                                            Đã đọc
                                        </button>
                                    ) : (
                                        <span className="block text-center text-xs font-semibold text-slate-400 md:text-right">Đã xem</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16 text-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm ring-1 ring-slate-100">
                            <FaRegBell className="size-8" aria-hidden />
                        </div>
                        <p className="mt-4 text-sm font-bold text-slate-700">Chưa có thông báo</p>
                        <p className="mt-1 max-w-xs text-xs text-slate-500">Ưu đãi và cập nhật đơn hàng sẽ hiển thị tại đây.</p>
                    </div>
                )}

                {list.length > LIMIT ? (
                    <PageBar className="mt-8" currentPage={current} totalPage={totalPage} onPageChange={setCurrent} />
                ) : null}
            </div>
        </>
    );
};

export default Notification;

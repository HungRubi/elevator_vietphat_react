import { useDispatch, useSelector } from "react-redux";
import { getNotifiByUser, isReadNotification } from "../store/slices/userSlice";
import { NavLink } from "react-router-dom";
import icons from "../util/icons";
import PropTypes from "prop-types";

const { FaRegBell, IoIosSend, FaRegNewspaper, FaCirclePlay, HiUserGroup } = icons;

const typeIcon = (type) => {
    const t = (type || "").toLowerCase();
    if (t.includes("video") || t.includes("play")) return FaCirclePlay;
    if (t.includes("tin") || t.includes("news") || t.includes("bài")) return FaRegNewspaper;
    if (t.includes("tuyển") || t.includes("job")) return HiUserGroup;
    return IoIosSend;
};

const Notification = ({ onNavigate }) => {
    const dispatch = useDispatch();
    const { myNotifi, currentUser } = useSelector((state) => state.user);

    const currentNofiti = myNotifi?.slice(0, 10);

    const handleReadNotifi = (id) => {
        if (!id) return;
        dispatch(isReadNotification(id));
    };

    const handleRefershNotification = () => {
        dispatch(getNotifiByUser(currentUser?._id));
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-[0_24px_64px_rgba(2,6,23,0.18)] backdrop-blur-2xl ring-1 ring-slate-900/[0.04]">
            <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-r from-[#0f172a] via-slate-900 to-[#0c1f18] px-4 py-3">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/25 blur-2xl" />
                <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
                            <FaRegBell className="size-[18px]" aria-hidden />
                        </span>
                        <div>
                            <h2 className="text-sm font-bold tracking-tight text-white">Thông báo</h2>
                            <p className="text-[11px] font-medium text-slate-400">Cập nhật đơn hàng &amp; tin mới</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleRefershNotification}
                        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    >
                        Làm mới
                    </button>
                </div>
            </div>

            <div className="max-h-[min(65vh,400px)] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80">
                {currentNofiti?.length > 0 ? (
                    <ul className="divide-y divide-slate-100 p-2">
                        {currentNofiti.map((item) => {
                            const Icon = typeIcon(item.type);
                            const unread = !item.isRead;
                            return (
                                <li key={item._id}>
                                    <div
                                        className={`flex gap-3 rounded-xl p-2.5 transition ${
                                            unread
                                                ? "bg-emerald-50/80 ring-1 ring-emerald-200/60"
                                                : "hover:bg-slate-50/90"
                                        }`}
                                    >
                                        <div className="relative shrink-0">
                                            <div
                                                className={`flex size-11 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-sm ${
                                                    unread ? "border-emerald-200/80" : "border-slate-200/80"
                                                }`}
                                            >
                                                <img src="/img/logo.png" alt="" className="size-8 object-contain opacity-90" />
                                            </div>
                                            {unread ? (
                                                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#2f904b] ring-2 ring-white" />
                                            ) : null}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <Icon className="size-3.5 shrink-0 text-[#2f904b]" aria-hidden />
                                                    <span className="truncate text-xs font-bold uppercase tracking-wide text-slate-800">
                                                        {item.type}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleReadNotifi(item._id)}
                                                    className={`shrink-0 text-[11px] font-semibold underline decoration-transparent underline-offset-2 transition hover:decoration-current ${
                                                        item.isRead ? "text-slate-400" : "text-[#2f904b]"
                                                    }`}
                                                >
                                                    {item.isRead ? "Đã xem" : "Đánh dấu đã đọc"}
                                                </button>
                                            </div>
                                            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-slate-600">{item.message}</p>
                                            <p className="mt-1.5 text-[11px] font-medium text-slate-400 tabular-nums">{item.timeAgo}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300 ring-1 ring-slate-200/80">
                            <FaRegBell className="size-8" aria-hidden />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Chưa có thông báo</p>
                        <p className="max-w-[240px] text-xs leading-relaxed text-slate-500">
                            Ưu đãi và cập nhật đơn hàng sẽ hiển thị tại đây.
                        </p>
                    </div>
                )}
            </div>

            {currentNofiti?.length > 0 ? (
                <div className="border-t border-slate-100 bg-slate-50/80 px-3 py-2.5">
                    <NavLink
                        to="/account/notification"
                        onClick={() => onNavigate?.()}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#2f904b] py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(47,144,75,0.35)] transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/40"
                    >
                        Xem tất cả thông báo
                        <span aria-hidden>→</span>
                    </NavLink>
                </div>
            ) : null}
        </div>
    );
};

Notification.propTypes = {
    onNavigate: PropTypes.func,
};

export default Notification;

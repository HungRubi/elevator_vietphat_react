import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import icons from "../util/icons";

const { FaCirclePlay, FaVideo, FaRegCalendarAlt } = icons;

const videoLink = (slug) => `/video/${slug}`;

function FeaturedVideoCard({ item }) {
    if (!item) return null;
    const title = item.name || "Video";
    return (
        <NavLink
            to={videoLink(item.slug)}
            className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label={`Xem video: ${title}`}
        >
            <div className="aspect-video w-full bg-slate-950">
                <img
                    src={item.thumbnail}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] opacity-60" />

            <div className="absolute left-1/2 top-1/2 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#2f904b] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-4 ring-white/25 transition duration-300 group-hover:scale-110 group-hover:ring-emerald-300/60 md:size-20">
                <FaCirclePlay className="ml-1 text-3xl md:text-4xl" aria-hidden />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                {item.format && (
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                        <FaRegCalendarAlt className="size-3.5 opacity-80" aria-hidden />
                        {item.format}
                    </div>
                )}
                <h3 className="text-lg font-bold leading-snug text-white drop-shadow-sm md:text-2xl md:leading-tight">
                    {title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-emerald-300/95 opacity-0 transition duration-300 group-hover:opacity-100">
                    Phát ngay →
                </p>
            </div>
        </NavLink>
    );
}

function CompactVideoCard({ item, index }) {
    const title = item.name || "Video";
    return (
        <NavLink
            to={videoLink(item.slug)}
            className="group flex min-w-[min(100%,280px)] shrink-0 snap-start gap-3 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-emerald-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:min-w-0 lg:w-full"
            aria-label={`Xem video: ${title}`}
        >
            <div className="relative h-[4.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:h-[4.75rem] sm:w-[7.75rem]">
                <img
                    src={item.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-90 transition group-hover:bg-black/45">
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/95 text-[#2f904b] shadow-md">
                        <FaCirclePlay className="ml-0.5 text-lg" aria-hidden />
                    </span>
                </div>
                <span className="absolute left-1 top-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-white/95">
                    {String(index + 2).padStart(2, "0")}
                </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white transition group-hover:text-emerald-200">
                    {title}
                </p>
                {item.format && (
                    <time className="mt-1 text-xs text-slate-400">{item.format}</time>
                )}
            </div>
        </NavLink>
    );
}

/**
 * Khối video đặc trưng cho trang chủ: nền cinema, 1 video nổi bật + danh sách cuộn.
 */
const HomeVideoSection = ({ videos }) => {
    const list = Array.isArray(videos) ? videos : [];
    const featured = list[0];
    const rest = list.slice(1);

    return (
        <section className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-8" data-aos="fade-up">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-700/40 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0c1f18] p-6 shadow-[0_32px_80px_rgba(2,6,23,0.45)] md:rounded-[2rem] md:p-8 lg:p-10">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-32 w-32 rounded-full bg-[#2f904b]/20 blur-2xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">
                            Kênh nội dung
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Video{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-[#7ddf9a] bg-clip-text text-transparent">
                                thực tế &amp; kỹ thuật
                            </span>
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                            Lắp đặt, vận hành và cập nhật xu hướng — xem trước khi quyết định.
                        </p>
                    </div>
                    <NavLink
                        to="/news"
                        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-emerald-500/15 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 lg:self-auto"
                    >
                        Mở trang tin &amp; video
                        <span aria-hidden>→</span>
                    </NavLink>
                </div>

                {list.length === 0 ? (
                    <div className="relative mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] py-16 text-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5 text-slate-500">
                            <FaVideo className="text-3xl" aria-hidden />
                        </div>
                        <p className="text-sm text-slate-500">Chưa có video. Vui lòng quay lại sau.</p>
                    </div>
                ) : (
                    <div className="relative mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
                        <div className="lg:col-span-7">
                            <FeaturedVideoCard item={featured} />
                        </div>
                        <div className="lg:col-span-5">
                            {rest.length > 0 ? (
                                <>
                                    <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 lg:block">
                                        Tiếp theo
                                    </p>
                                    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex lg:max-h-[min(28rem,calc(100vh-12rem))] lg:flex-col lg:gap-2 lg:overflow-y-auto lg:overflow-x-visible lg:pb-0 [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:block lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-white/20">
                                        {rest.map((item, i) => (
                                            <CompactVideoCard key={item._id} item={item} index={i} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-500">
                                    Đang cập nhật thêm video trong danh sách.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

FeaturedVideoCard.propTypes = {
    item: PropTypes.object,
};

CompactVideoCard.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

HomeVideoSection.propTypes = {
    videos: PropTypes.array,
};

export default HomeVideoSection;

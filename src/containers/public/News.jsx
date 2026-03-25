import { Helmet } from "react-helmet";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { PageBar } from "../../components";
import icons from "../../util/icons";
import { sortArticlesNewestFirst } from "../../util/articleUtils";

const { FiSearch, FaRegCalendarAlt, BsPerson, FaRegNewspaper } = icons;

/** Trang 1: 1 bài tổng (hero) + 6 bài lưới = 2 hàng × 3 cột. Các trang sau: 9 bài (3×3), không lẻ ô. */
const FIRST_PAGE_TOTAL = 7;
const REST_PAGE_GRID = 9;

function newsTotalPages(count) {
    if (count <= 0) return 1;
    if (count <= FIRST_PAGE_TOTAL) return 1;
    return 1 + Math.ceil((count - FIRST_PAGE_TOTAL) / REST_PAGE_GRID);
}

function sliceNewsPage(list, page) {
    const p = Math.max(1, page);
    if (p === 1) {
        const chunk = list.slice(0, FIRST_PAGE_TOTAL);
        return { hero: chunk[0] ?? null, gridItems: chunk.slice(1) };
    }
    const offset = FIRST_PAGE_TOTAL + (p - 2) * REST_PAGE_GRID;
    return { hero: null, gridItems: list.slice(offset, offset + REST_PAGE_GRID) };
}

function ArticleMeta({ author, dateFormat, className = "" }) {
    return (
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 ${className}`}>
            {dateFormat && (
                <span className="inline-flex items-center gap-1.5 font-medium">
                    <FaRegCalendarAlt className="size-3.5 text-[#2f904b]" aria-hidden />
                    {dateFormat}
                </span>
            )}
            {author && (
                <span className="inline-flex items-center gap-1.5">
                    <BsPerson className="size-3.5 text-slate-400" aria-hidden />
                    {author}
                </span>
            )}
        </div>
    );
}

function HeroArticle({ item }) {
    if (!item) return null;
    return (
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-[0_40px_100px_rgba(2,6,23,0.35)] md:rounded-[2rem]">
            <NavLink
                to={`/news/detail/${item.slug}`}
                className="grid overflow-hidden md:grid-cols-12 md:gap-0"
                aria-label={`Đọc bài: ${item.subject}`}
            >
                <div className="relative aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[320px] lg:min-h-[380px]">
                    <img
                        src={item.thumbnail}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/25 md:to-black/75" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#2f904b] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                        Bài tổng · Nổi bật
                    </span>
                </div>
                <div className="relative flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c1f18] p-6 md:col-span-5 md:p-8 lg:p-10">
                    <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
                    <ArticleMeta author={item.author} dateFormat={item.dateFormat} className="text-slate-400 [&_svg]:text-emerald-400" />
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white transition group-hover:text-emerald-200 md:text-3xl lg:text-[2rem] lg:leading-[1.15]">
                        {item.subject}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400 md:text-base">
                        {item.content}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition group-hover:gap-3">
                        Đọc toàn bộ
                        <span aria-hidden>→</span>
                    </span>
                </div>
            </NavLink>
        </article>
    );
}

function ArticleCard({ item, index }) {
    return (
        <article
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_16px_48px_rgba(2,6,23,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-200/60 hover:shadow-[0_24px_64px_rgba(2,6,23,0.12)]"
            data-aos="fade-up"
            data-aos-delay={Math.min(index * 80, 240)}
        >
            <NavLink to={`/news/detail/${item.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                    src={item.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-800 shadow-sm">
                    Tin tức
                </span>
            </NavLink>
            <div className="flex flex-1 flex-col p-5">
                <ArticleMeta author={item.author} dateFormat={item.dateFormat} />
                <NavLink
                    to={`/news/detail/${item.slug}`}
                    className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition hover:text-[#2f904b]"
                >
                    {item.subject}
                </NavLink>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{item.content}</p>
                <NavLink
                    to={`/news/detail/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2f904b] underline decoration-emerald-200 underline-offset-4 transition hover:decoration-[#2f904b]"
                >
                    Xem chi tiết
                </NavLink>
            </div>
        </article>
    );
}

const News = () => {
    const dispatch = useDispatch();
    const { articles } = useSelector((state) => state.app);
    const [current, setCurrent] = useState(1);
    const [query, setQuery] = useState("");

    useEffect(() => {
        dispatch(actions.getArticles());
    }, [dispatch]);

    const filtered = useMemo(() => {
        const sorted = sortArticlesNewestFirst(articles || []);
        const q = query.trim().toLowerCase();
        if (!q) return sorted;
        return sorted.filter(
            (a) =>
                (a.subject || "").toLowerCase().includes(q) ||
                (a.content || "").toLowerCase().includes(q) ||
                (a.author || "").toLowerCase().includes(q)
        );
    }, [articles, query]);

    useEffect(() => {
        setCurrent(1);
    }, [query]);

    const totalPage = newsTotalPages(filtered.length);

    useEffect(() => {
        setCurrent((c) => (c > totalPage ? totalPage : c));
    }, [totalPage]);

    const effectivePage = Math.min(Math.max(1, current), totalPage);
    const { hero, gridItems } = sliceNewsPage(filtered, effectivePage);

    return (
        <>
            <Helmet>
                <title>Tin tức - Thang máy Việt Phát</title>
                <meta
                    name="description"
                    content="Cập nhật tin tức mới nhất về công nghệ thang máy, xu hướng xây dựng, và hoạt động của Thang máy Việt Phát."
                />
                <meta
                    name="keywords"
                    content="tin tức thang máy, công nghệ thang máy, xu hướng xây dựng, tin tức Việt Phát, blog thang máy"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/news" />
            </Helmet>

            <div className="min-h-screen bg-[#f4f7f5]">
                <div className="relative overflow-hidden border-b border-emerald-900/20 bg-gradient-to-br from-slate-950 via-[#0a1628] to-[#0c1f18]">
                    <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                    />

                    <div className="relative mx-auto max-w-[1200px] px-4 py-14 md:px-8 md:py-20">
                        <div className="max-w-3xl">
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400/90">Tạp chí &amp; cập nhật</p>
                            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                                Tin tức
                                <span className="bg-gradient-to-r from-emerald-300 to-[#9ae6b4] bg-clip-text text-transparent"> thang máy</span>
                            </h1>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                                Công nghệ, lắp đặt, bảo trì và hoạt động công ty — cập nhật thường xuyên, đọc lọc theo từ khóa.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <div className="inline-flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                                    <span className="text-3xl font-black tabular-nums text-white">{filtered.length}</span>
                                    <span className="text-sm font-medium text-slate-400">bài trong kho</span>
                                </div>
                                <NavLink
                                    to="/"
                                    className="text-sm font-semibold text-emerald-300/90 underline decoration-emerald-500/40 underline-offset-4 transition hover:text-white"
                                >
                                    ← Về trang chủ
                                </NavLink>
                            </div>
                        </div>

                        <div className="relative mt-10 max-w-xl">
                            <FiSearch
                                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                                aria-hidden
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Tìm theo tiêu đề, nội dung, tác giả…"
                                className="w-full rounded-2xl border border-white/10 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white shadow-inner backdrop-blur-md placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                                aria-label="Tìm kiếm bài viết"
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
                    {filtered.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 py-20 text-center backdrop-blur-sm"
                            data-aos="fade-up"
                        >
                            <div className="flex size-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <FaRegNewspaper className="text-4xl" aria-hidden />
                            </div>
                            <p className="mt-6 text-lg font-semibold text-slate-800">
                                {query.trim() ? "Không tìm thấy bài phù hợp" : "Chưa có bài viết"}
                            </p>
                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                {query.trim()
                                    ? "Thử từ khóa khác hoặc xóa ô tìm kiếm."
                                    : "Vui lòng quay lại sau."}
                            </p>
                            {query.trim() ? (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="mt-6 rounded-xl bg-[#2f904b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Xóa bộ lọc
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        <>
                            {hero ? (
                                <div className="mb-10 md:mb-14" data-aos="fade-up">
                                    <HeroArticle item={hero} />
                                </div>
                            ) : null}

                            {gridItems.length > 0 ? (
                                <div>
                                    {effectivePage === 1 && hero ? (
                                        <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                                            Các bài tiếp theo
                                        </h2>
                                    ) : null}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {gridItems.map((item, index) => (
                                            <ArticleCard key={item._id} item={item} index={index} />
                                        ))}
                                    </div>
                                </div>
                            ) : hero ? null : null}

                            <PageBar
                                currentPage={effectivePage}
                                totalPage={totalPage}
                                onPageChange={setCurrent}
                                className="mt-14"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default News;

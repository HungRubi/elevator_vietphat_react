import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import icons from '../util/icons';

const { FaRegCalendarAlt, FaRegNewspaper, PiShoppingCartBold } = icons;

/**
 * Cột phải dùng chung: tin mới + sản phẩm nổi bật (News / Video / Tuyển dụng).
 */
function PublicDetailSidebar({ articleSuggest = [], productNewLast = [], formatPrice }) {
    const fmt =
        typeof formatPrice === 'function'
            ? formatPrice
            : (n) => (n != null ? Number(n).toLocaleString('vi-VN') : '');

    return (
        <aside className="flex w-full flex-col gap-6 lg:w-[min(100%,380px)] lg:shrink-0">
            <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-[0_16px_48px_rgba(2,6,23,0.06)]">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-white px-4 py-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <FaRegNewspaper className="size-4" aria-hidden />
                    </span>
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                        Tin mới
                    </h2>
                </div>
                <ul className="divide-y divide-slate-100">
                    {articleSuggest?.map((item) => (
                        <li key={item._id}>
                            <NavLink
                                to={`/news/detail/${item.slug}`}
                                className="flex gap-3 p-3 transition hover:bg-slate-50/90"
                            >
                                <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/80">
                                    <img
                                        src={item.thumbnail}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </span>
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                                        {item.subject}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">{item.author}</p>
                                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                                        <FaRegCalendarAlt className="size-3.5 shrink-0" aria-hidden />
                                        {item.formatedDate}
                                    </p>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-[0_16px_48px_rgba(2,6,23,0.06)]">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/40 px-4 py-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <PiShoppingCartBold className="size-4" aria-hidden />
                    </span>
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                        Sản phẩm nổi bật
                    </h2>
                </div>
                <ul className="divide-y divide-slate-100">
                    {productNewLast?.map((item) => (
                        <li key={item._id}>
                            <NavLink
                                to={`/products/detail/${item.slug}`}
                                className="flex gap-3 p-3 transition hover:bg-slate-50/90"
                            >
                                <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/80">
                                    <img
                                        src={item.thumbnail_main}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </span>
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                                        {item.name}
                                    </p>
                                    <p className="mt-1 text-sm font-bold tabular-nums text-[var(--color-primary)]">
                                        {fmt(item.price)} đ
                                    </p>
                                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                                        <FaRegCalendarAlt className="size-3.5 shrink-0" aria-hidden />
                                        {item.formatedDate}
                                    </p>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
    );
}

PublicDetailSidebar.propTypes = {
    articleSuggest: PropTypes.array,
    productNewLast: PropTypes.array,
    formatPrice: PropTypes.func,
};

export default PublicDetailSidebar;

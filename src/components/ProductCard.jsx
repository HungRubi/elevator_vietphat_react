import LoveButton from './LoveButton';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export function formatProductPrice(money) {
    if (money == null || Number.isNaN(Number(money))) return '—';
    return Number(money).toLocaleString('vi-VN');
}

function stripDescriptionText(raw) {
    if (raw == null || typeof raw !== 'string') return '';
    return raw
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function computePriceDisplay(price, sale) {
    const p = Number(price);
    const s = Number(sale);
    if (Number.isNaN(p)) return { current: null, original: null, percent: 0 };
    if (!s || s <= 0 || Number.isNaN(s)) {
        return { current: p, original: null, percent: 0 };
    }
    const current = Math.round(p - (s * p) / 100);
    return { current, original: p, percent: s };
}

function stockLabel(stock) {
    const n = Number(stock);
    if (Number.isNaN(n)) return { text: 'Liên hệ', tone: 'neutral' };
    if (n <= 0) return { text: 'Liên hệ', tone: 'warn' };
    if (n < 5) return { text: `Còn ${n}`, tone: 'low' };
    return { text: 'Còn hàng', tone: 'ok' };
}

/**
 * Thẻ sản phẩm catalog — layout mới, thông tin phân tầng (mã, mô tả, tồn, giá KM).
 * variant: elevated = thẻ nổi (trang chủ); mosaic = cùng UI, tối ưu lưới trang /products
 */
const ProductCard = ({ item, variant = 'elevated', categoryLabel }) => {
    const isMosaic = variant === 'mosaic';
    const refCode = item?.slug || item?.sku || item?.code || (item?._id ? String(item._id).slice(-8) : '');
    const category =
        categoryLabel ||
        item?.category?.name ||
        item?.categoryName ||
        (typeof item?.category === 'string' ? item.category : null);
    const excerpt = stripDescriptionText(item?.description);
    const excerptShort = excerpt.length > 140 ? `${excerpt.slice(0, 137)}…` : excerpt;
    const { current, original, percent } = computePriceDisplay(item?.price, item?.sale);
    const stock = stockLabel(item?.stock);

    const cardShell = isMosaic
        ? 'group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/95 bg-white shadow-sm transition-all duration-300 ease-out hover:z-[1] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)]'
        : 'group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/95 bg-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-900/10 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.22)]';

    const stockStyles = {
        ok: 'bg-emerald-50 text-emerald-800 ring-emerald-600/15',
        low: 'bg-amber-50 text-amber-900 ring-amber-600/20',
        warn: 'bg-slate-100 text-slate-700 ring-slate-400/20',
        neutral: 'bg-slate-50 text-slate-600 ring-slate-400/15',
    };

    return (
        <article className={cardShell}>
            <NavLink
                to={`/products/detail/${item.slug}`}
                className="relative block aspect-[5/4] shrink-0 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/80"
            >
                <img
                    src={item.thumbnail_main}
                    alt={item.name || 'Sản phẩm'}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/5 opacity-80" />

                <div className="absolute left-0 top-0 flex max-w-[85%] flex-wrap gap-1.5 p-2.5 sm:p-3">
                    {category ? (
                        <span className="inline-flex max-w-full truncate rounded border border-white/70 bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-700 shadow-sm backdrop-blur-sm">
                            {category}
                        </span>
                    ) : null}
                    {percent > 0 ? (
                        <span className="inline-flex rounded border border-red-200/80 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 shadow-sm">
                            −{percent}%
                        </span>
                    ) : null}
                </div>

                <div className="absolute right-2 top-2 z-10 sm:right-2.5 sm:top-2.5">
                    <LoveButton productId={item._id} tone="glass" size="sm" />
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                    <span
                        className={`inline-flex shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ring-1 backdrop-blur-md ${stockStyles[stock.tone]}`}
                    >
                        {stock.text}
                    </span>
                </div>
            </NavLink>

            <div className="flex min-h-0 flex-1 flex-col border-t border-slate-100 p-3.5 sm:p-4">
                {refCode ? (
                    <p className="font-mono text-[11px] font-medium tracking-wide text-slate-400">
                        REF · <span className="text-slate-600">{refCode}</span>
                    </p>
                ) : null}

                <NavLink
                    to={`/products/detail/${item.slug}`}
                    className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-slate-900 decoration-transparent transition group-hover:text-[#1f7a3a]"
                >
                    {item.name}
                </NavLink>

                {excerptShort ? (
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{excerptShort}</p>
                ) : (
                    <p className="mt-2 text-[13px] italic text-slate-400">
                        Xem thông số và báo giá chi tiết tại trang sản phẩm.
                    </p>
                )}

                <div className="mt-auto border-t border-slate-100 pt-3">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                            {original != null && percent > 0 ? (
                                <p className="text-xs text-slate-400 line-through tabular-nums">
                                    ₫{formatProductPrice(original)}
                                </p>
                            ) : null}
                            <p className="text-lg font-bold tabular-nums tracking-tight text-[#1a6b34]">
                                <span className="text-sm font-semibold text-[#2f904b]">₫</span>
                                {formatProductPrice(current ?? item?.price)}
                            </p>
                            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                Giá tham khảo · VAT theo quy định
                            </p>
                        </div>
                        <NavLink
                            to={`/products/detail/${item.slug}`}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            Chi tiết
                            <span aria-hidden className="text-sm leading-none">
                                →
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </article>
    );
};

ProductCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        slug: PropTypes.string,
        name: PropTypes.string,
        thumbnail_main: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sale: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        stock: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        description: PropTypes.string,
        category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        categoryName: PropTypes.string,
        sku: PropTypes.string,
        code: PropTypes.string,
    }).isRequired,
    variant: PropTypes.oneOf(['mosaic', 'elevated']),
    categoryLabel: PropTypes.string,
};

export default ProductCard;

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'vp_product_favorites';

export function getFavoriteProductIds() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function setFavoriteProductIds(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

/**
 * Yêu thích sản phẩm — tim icon, có lưu localStorage theo productId.
 * @param {'glass'|'plain'|'accent'} tone — glass: trên ảnh; plain: nền trắng (detail); accent: icon thương hiệu (không bấm)
 */
const LoveButton = ({ productId, tone = 'glass', size = 'md', className = '' }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (tone === 'accent' || !productId) {
            setLiked(false);
            return;
        }
        setLiked(getFavoriteProductIds().includes(productId));
    }, [productId, tone]);

    const toggle = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (tone === 'accent') return;

            if (!productId) {
                setLiked((v) => !v);
                return;
            }

            const fav = getFavoriteProductIds();
            if (fav.includes(productId)) {
                setFavoriteProductIds(fav.filter((id) => id !== productId));
                setLiked(false);
                toast.info('Đã gỡ khỏi yêu thích');
            } else {
                setFavoriteProductIds([...fav, productId]);
                setLiked(true);
                toast.success('Đã thêm vào yêu thích');
            }
        },
        [productId, tone]
    );

    if (tone === 'accent') {
        return (
            <span
                className={`inline-flex shrink-0 text-[#2f904b] opacity-90 ${className}`}
                aria-hidden
            >
                <FaHeart className="text-[15px]" />
            </span>
        );
    }

    const sizeCls =
        size === 'sm'
            ? 'h-9 w-9 min-h-9 min-w-9 [&_svg]:h-[18px] [&_svg]:w-[18px]'
            : 'h-10 w-10 min-h-10 min-w-10 [&_svg]:h-5 [&_svg]:w-5';

    const glassBase =
        'rounded-full border backdrop-blur-md shadow-lg transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.94]';
    const glassIdle =
        'border-white/50 bg-black/20 text-white hover:scale-105 hover:border-white/70 hover:bg-black/30 hover:shadow-xl';
    const glassLiked =
        'border-rose-300/60 bg-rose-600/90 text-white hover:bg-rose-600 hover:border-rose-200/80';

    const plainBase =
        'rounded-full border bg-white shadow-sm transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/35 focus-visible:ring-offset-2 active:scale-[0.94]';
    const plainIdle =
        'border-slate-200/90 text-slate-500 hover:border-rose-200 hover:bg-rose-50/80 hover:text-rose-600';
    const plainLiked =
        'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100';

    const toneCls =
        tone === 'glass'
            ? `${glassBase} ${liked ? glassLiked : glassIdle}`
            : `${plainBase} ${liked ? plainLiked : plainIdle}`;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={liked}
            title={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            aria-label={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            className={`inline-flex items-center justify-center ${sizeCls} ${toneCls} ${className}`}
        >
            {liked ? (
                <FaHeart className="fill-current drop-shadow-sm" aria-hidden />
            ) : (
                <FaRegHeart className="drop-shadow-sm" aria-hidden />
            )}
        </button>
    );
};

LoveButton.propTypes = {
    productId: PropTypes.string,
    tone: PropTypes.oneOf(['glass', 'plain', 'accent']),
    size: PropTypes.oneOf(['sm', 'md']),
    className: PropTypes.string,
};

export default LoveButton;

import {
    LoveButton,
    QuantityButton,
    Button,
    PageBar,
    Form,
    ProductsAll,
    QuoteRequestModal,
} from '../../components/index';
import icons from '../../util/icons';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from "../../store/slices/productsSlice";
import { updateCart } from "../../store/slices/userSlice";
import { getWarehouseStockNumber } from '../../util/stock';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const {
    FaStar,
    FiTruck,
    AiOutlineRight,
    IoShieldCheckmarkOutline,
    PiShoppingCartBold,
    MdEmail,
    BsThreeDotsVertical,
    BiSolidLike,
    FaRegStar,
} = icons;

const SECTION_IDS = {
    explore: 'vp-pd-explore',
    reviews: 'vp-pd-reviews',
    contact: 'vp-pd-contact',
    suggest: 'vp-pd-suggest',
};

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { productDetail, productSuggest, comments } = useSelector(
        (state) => state.products
    );
    const [oneStar, setOneStar] = useState([]);
    const [twoStar, setTwoStar] = useState([]);
    const [threeStar, setThreeStar] = useState([]);
    const [fourStar, setFourStar] = useState([]);
    const [fiveStar, setFiveStar] = useState([]);
    const [averageStar, setAverageStar] = useState(0);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [orderQty, setOrderQty] = useState(1);
    const { slug } = useParams();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [storyTab, setStoryTab] = useState('story');
    const [showFloatBar, setShowFloatBar] = useState(false);

    const galleryImages = useMemo(() => {
        if (!productDetail) return [];
        const list = [
            productDetail.thumbnail_main,
            productDetail.thumbnail_1,
            productDetail.thumbnail_2,
            productDetail.thumbnail_3,
        ].filter(Boolean);
        return list.length ? list : [];
    }, [productDetail]);

    useEffect(() => {
        setOrderQty(1);
        setActiveImageIndex(0);
    }, [slug, productDetail?._id]);

    useEffect(() => {
        if (!comments?.length) {
            setOneStar([]);
            setTwoStar([]);
            setThreeStar([]);
            setFourStar([]);
            setFiveStar([]);
            setAverageStar(0);
            return;
        }
        const one = comments.filter((item) => item.star === 1);
        const two = comments.filter((item) => item.star === 2);
        const three = comments.filter((item) => item.star === 3);
        const four = comments.filter((item) => item.star === 4);
        const five = comments.filter((item) => item.star === 5);

        setOneStar(one);
        setTwoStar(two);
        setThreeStar(three);
        setFourStar(four);
        setFiveStar(five);

        const totalStars = comments.reduce((sum, item) => sum + item.star, 0);
        const avg = totalStars / comments.length;
        setAverageStar(Math.round(avg * 10) / 10);
    }, [comments]);

    const typeComment = [
        { title: 'tất cả', length: comments?.length || 0 },
        { title: '5 sao', length: fiveStar?.length || 0 },
        { title: '4 sao', length: fourStar?.length || 0 },
        { title: '3 sao', length: threeStar?.length || 0 },
        { title: '2 sao', length: twoStar?.length || 0 },
        { title: '1 sao', length: oneStar?.length || 0 },
    ];

    let pricePre = 0;
    if (Number(productDetail?.sale) === 0) {
        pricePre = Number(productDetail?.price);
    } else {
        const discount =
            (Number(productDetail?.sale) * Number(productDetail?.price)) / 100;
        pricePre = Number(productDetail?.price) - discount;
    }

    useEffect(() => {
        if (slug) {
            dispatch(fetchProductDetail({ slug, limit_suggest: 8 }));
        }
    }, [dispatch, slug]);

    useEffect(() => {
        const onScroll = () => setShowFloatBar(window.scrollY > 420);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    function format(money) {
        return money?.toLocaleString('vi-VN');
    }

    const warehouseStockNum = useMemo(
        () => getWarehouseStockNumber(productDetail),
        [productDetail]
    );
    const isOutOfStock = warehouseStockNum !== null && warehouseStockNum <= 0;
    const maxOrderQty =
        warehouseStockNum != null && warehouseStockNum > 0 ? warehouseStockNum : null;

    useEffect(() => {
        if (maxOrderQty != null && orderQty > maxOrderQty) {
            setOrderQty(maxOrderQty);
        }
    }, [maxOrderQty, orderQty]);

    const handleAddToCart = useCallback(
        (product, userId) => {
            if (!product?._id || !userId) return;
            const cap =
                warehouseStockNum != null && warehouseStockNum > 0
                    ? Math.min(orderQty, warehouseStockNum)
                    : orderQty;
            if (warehouseStockNum !== null && warehouseStockNum <= 0) return;
            const cartData = {
                items: [
                    {
                        productId: product._id,
                        quantity: Math.max(1, cap),
                        price: product.price,
                    },
                ],
            };
            dispatch(updateCart({ data: cartData, userId }));
        },
        [dispatch, orderQty, warehouseStockNum]
    );

    const [current, setCurrent] = useState(1);
    const limit = 3;
    const lastItemIndex = limit * current;
    const firstItemIndex = lastItemIndex - limit;
    const currentComment = comments?.slice(firstItemIndex, lastItemIndex);

    const mainGallerySrc =
        galleryImages[activeImageIndex] || productDetail?.thumbnail_main;
    const hasDiscount = Number(productDetail?.sale) > 0;

    const extraImages = [
        productDetail?.thumbnail_1,
        productDetail?.thumbnail_2,
        productDetail?.thumbnail_3,
    ].filter(Boolean);

    const journeySteps = [
        { n: '01', t: 'Chọn SL', d: 'Điều chỉnh số lượng phù hợp công trình' },
        { n: '02', t: 'Đặt hàng', d: 'Báo giá hoặc thêm vào giỏ — hotline hỗ trợ' },
        { n: '03', t: 'Giao & lắp', d: 'Lịch giao và lắp đặt theo hiện trường' },
        { n: '04', t: 'Bảo hành', d: 'Đồng hành sau bán theo chính sách' },
    ];

    return (
        <>
            <Helmet>
                <title>
                    {productDetail?.name
                        ? `${productDetail.name} - Thang máy Việt Phát`
                        : 'Chi tiết sản phẩm - Thang máy Việt Phát'}
                </title>
                <meta
                    name="description"
                    content={
                        productDetail?.description
                            ? productDetail.description.slice(0, 200)
                            : 'Xem chi tiết sản phẩm thang máy chất lượng cao từ Thang máy Việt Phát.'
                    }
                />
                <meta
                    name="keywords"
                    content="thang máy, thang máy gia đình, thang máy tải hàng, thiết bị thang máy, Thang máy Việt Phát"
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://vmu.com.vn/products/${productDetail?.slug || ''}`}
                />
                <meta
                    property="og:title"
                    content={
                        productDetail?.name
                            ? `${productDetail.name} - Thang máy Việt Phát`
                            : 'Chi tiết sản phẩm - Thang máy Việt Phát'
                    }
                />
                <meta
                    property="og:description"
                    content={productDetail?.description || ''}
                />
                <meta property="og:type" content="product" />
                <meta
                    property="og:url"
                    content={`https://vmu.com.vn/products/${productDetail?.slug || ''}`}
                />
                <meta
                    property="og:image"
                    content={
                        productDetail?.image ||
                        'https://vmu.com.vn/img/products/1.jpg'
                    }
                />
            </Helmet>

            <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] pb-28 lg:pb-20">
                {/* Breadcrumb — pill nổi */}
                <div className="relative z-20 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:pt-6">
                    <nav
                        className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-md sm:text-sm"
                        aria-label="Breadcrumb"
                    >
                        <Link
                            to="/"
                            className="rounded-full px-2 py-0.5 transition hover:bg-slate-100 hover:text-[var(--color-primary)]"
                        >
                            Trang chủ
                        </Link>
                        <span className="text-slate-300">/</span>
                        <Link
                            to="/products"
                            className="rounded-full px-2 py-0.5 transition hover:bg-slate-100 hover:text-[var(--color-primary)]"
                        >
                            Sản phẩm
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="line-clamp-1 px-1 font-semibold text-slate-800">
                            {productDetail?.name || '…'}
                        </span>
                    </nav>
                </div>

                {/* Hero: ảnh trần (không bo/ring) + hover nhẹ | thông tin tối ưu chuyển đổi */}
                <div className="relative z-10 mx-auto mt-6 max-w-7xl lg:mt-8">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
                        {/* Ảnh — giữ kiểu trưng bày phẳng, chỉ hiệu ứng hover */}
                        <div className="order-2 lg:order-1">
                            <div className="group relative overflow-hidden bg-slate-100">
                                <img
                                    src={mainGallerySrc}
                                    alt={productDetail?.name || 'Sản phẩm'}
                                    className="w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-[1.03]"
                                />
                                {hasDiscount ? (
                                    <span className="absolute left-3 top-3 bg-[var(--color-primary)] px-2 py-1 text-xs font-bold text-white">
                                        −{productDetail?.sale}%
                                    </span>
                                ) : null}
                            </div>
                            {galleryImages.length > 1 ? (
                                <div
                                    className="mt-4 grid grid-cols-4 gap-3"
                                    role="tablist"
                                    aria-label="Ảnh sản phẩm"
                                >
                                    {galleryImages.map((src, idx) => (
                                        <button
                                            key={`${src}-${idx}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                idx === activeImageIndex
                                            }
                                            onClick={() =>
                                                setActiveImageIndex(idx)
                                            }
                                            className={`overflow-hidden border-2 border-transparent bg-slate-100 outline-none transition duration-300 hover:opacity-90 focus-visible:border-[var(--color-primary)] ${
                                                idx === activeImageIndex
                                                    ? 'border-[var(--color-primary)] opacity-100'
                                                    : 'opacity-95'
                                            }`}
                                        >
                                            <img
                                                src={src}
                                                alt=""
                                                className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
                                            />
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        {/* Thông tin — hiện đại, nhấn mạnh mua & tin cậy */}
                        <div className="order-1 lg:order-2">
                            <div className="lg:sticky lg:top-24">
                                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-5">
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                            Việt Phát · Phụ tùng thang máy
                                        </p>
                                        <h1 className="mt-2 text-2xl font-bold capitalize leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[1.75rem] xl:text-4xl">
                                            {productDetail?.name}
                                        </h1>
                                    </div>
                                    <LoveButton
                                        productId={productDetail?._id}
                                        tone="plain"
                                        size="md"
                                    />
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xl font-black tabular-nums text-slate-900">
                                            {comments?.length
                                                ? averageStar.toFixed(1)
                                                : '—'}
                                        </span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => {
                                                const v = averageStar - i;
                                                if (!comments?.length) {
                                                    return (
                                                        <FaRegStar
                                                            key={i}
                                                            className="text-sm text-amber-400/50"
                                                        />
                                                    );
                                                }
                                                if (v >= 1)
                                                    return (
                                                        <FaStar
                                                            key={i}
                                                            className="text-sm text-amber-400"
                                                        />
                                                    );
                                                if (v > 0)
                                                    return (
                                                        <FaRegStar
                                                            key={i}
                                                            className="text-sm text-amber-400/80"
                                                        />
                                                    );
                                                return (
                                                    <FaRegStar
                                                        key={i}
                                                        className="text-sm text-slate-300"
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <span className="text-slate-400">·</span>
                                    <span className="text-slate-600">
                                        <strong className="text-slate-900">
                                            {comments?.length || 0}
                                        </strong>{' '}
                                        khách đánh giá
                                    </span>
                                    <span className="text-slate-400">·</span>
                                    <span className="font-medium text-[var(--color-primary)]">
                                        Còn {productDetail?.stock ?? 10} — ưu
                                        tiên đơn sớm
                                    </span>
                                </div>

                                <div className="mt-6 bg-gradient-to-br from-emerald-50/90 via-white to-slate-50/80 p-5 sm:p-6">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Giá hiển thị
                                    </p>
                                    <div className="mt-2 flex flex-wrap items-baseline gap-3">
                                        <span className="text-3xl font-black tabular-nums text-[var(--color-primary)] sm:text-[2.25rem]">
                                            ₫{format(pricePre)}
                                        </span>
                                        {hasDiscount ? (
                                            <>
                                                <span className="text-lg text-slate-400 line-through tabular-nums">
                                                    ₫{format(
                                                        productDetail?.price
                                                    )}
                                                </span>
                                                <span className="bg-[var(--color-primary)] px-2 py-0.5 text-xs font-bold text-white">
                                                    Tiết kiệm{' '}
                                                    {productDetail?.sale}%
                                                </span>
                                            </>
                                        ) : null}
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                        Giá có thể điều chỉnh theo số lượng &
                                        công trình.{' '}
                                        <button
                                            type="button"
                                            onClick={() => setQuoteOpen(true)}
                                            className="font-semibold text-[var(--color-primary)] underline decoration-[var(--color-primary)]/40 underline-offset-2 hover:decoration-[var(--color-primary)]"
                                        >
                                            Nhận báo giá chính xác →
                                        </button>
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800">
                                            Voucher ₫200k
                                        </span>
                                        <span className="border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800">
                                            Voucher ₫400k
                                        </span>
                                    </div>
                                </div>

                                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                                    <li className="flex gap-3">
                                        <span
                                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-primary)] text-[10px] font-bold text-white"
                                            aria-hidden
                                        >
                                            ✓
                                        </span>
                                        <span>
                                            <strong className="text-slate-900">
                                                Tư vấn kỹ thuật 0đ
                                            </strong>{' '}
                                            — hotline &amp; email đồng hành
                                            chọn đúng model.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span
                                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-primary)] text-[10px] font-bold text-white"
                                            aria-hidden
                                        >
                                            ✓
                                        </span>
                                        <span>
                                            <strong className="text-slate-900">
                                                Hàng rõ nguồn gốc
                                            </strong>{' '}
                                            — phù hợp lắp đặt thang máy &amp;
                                            bảo trì.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span
                                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-primary)] text-[10px] font-bold text-white"
                                            aria-hidden
                                        >
                                            ✓
                                        </span>
                                        <span>
                                            <strong className="text-slate-900">
                                                Giao &amp; lắp theo lịch
                                            </strong>{' '}
                                            — thời gian xác nhận sau đặt
                                            hàng.
                                        </span>
                                    </li>
                                </ul>

                                <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
                                    <span className="text-sm font-semibold text-slate-700 sm:w-28">
                                        Số lượng
                                    </span>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                        <QuantityButton
                                            quantity={orderQty}
                                            setQuantity={setOrderQty}
                                            price={Number(productDetail?.price) || 0}
                                            onQuantityChange={() => {}}
                                            variant="default"
                                            max={maxOrderQty ?? undefined}
                                            disabled={isOutOfStock}
                                        />
                                        {warehouseStockNum !== null ? (
                                            <p
                                                className={`text-xs font-semibold sm:text-sm ${
                                                    isOutOfStock
                                                        ? 'text-red-600'
                                                        : warehouseStockNum < 5
                                                          ? 'text-amber-700'
                                                          : 'text-slate-500'
                                                }`}
                                                role="status"
                                            >
                                                {isOutOfStock
                                                    ? 'Sản phẩm đã hết hàng — vui lòng liên hệ báo giá hoặc chọn model khác.'
                                                    : `Tồn kho: ${warehouseStockNum} sản phẩm${warehouseStockNum < 5 ? ' (sắp hết)' : ''}.`}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-slate-500 sm:text-sm">
                                                Số lượng tồn kho sẽ được xác nhận khi đặt hàng.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <Button
                                        type="button"
                                        onClick={() => setQuoteOpen(true)}
                                        className="!w-full !py-4 !normal-case !text-base !font-bold !shadow-[0_14px_36px_-12px_rgba(47,144,75,0.55)]"
                                    >
                                        Nhận báo giá ngay
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleAddToCart(
                                                productDetail,
                                                currentUser?._id
                                            )
                                        }
                                        disabled={isOutOfStock || !currentUser?._id}
                                        className="!flex !w-full !items-center !justify-center !gap-2 !border-2 !border-[var(--color-primary)] !bg-white !py-3.5 !normal-case !text-base !font-bold !text-[var(--color-primary)] hover:!bg-emerald-50 disabled:!cursor-not-allowed disabled:!border-slate-200 disabled:!text-slate-400 disabled:!opacity-60"
                                    >
                                        <PiShoppingCartBold className="text-xl" />
                                        {isOutOfStock
                                            ? 'Hết hàng'
                                            : !currentUser?._id
                                              ? 'Đăng nhập để thêm giỏ'
                                              : 'Thêm vào giỏ hàng'}
                                    </Button>
                                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                                        <a
                                            href="tel:0924113113"
                                            className="text-center text-sm font-semibold text-slate-700 underline-offset-2 hover:text-[var(--color-primary)] hover:underline"
                                        >
                                            Gọi 0924 113 113
                                        </a>
                                        <span className="hidden text-slate-300 sm:inline">
                                            |
                                        </span>
                                        <a
                                            href="mailto:infor@phukienthangmay.vn"
                                            className="flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-slate-700 underline-offset-2 hover:text-[var(--color-primary)] hover:underline"
                                        >
                                            <MdEmail className="text-lg" />
                                            Gửi email tư vấn
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-6 text-xs text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <FiTruck className="text-lg text-[var(--color-primary)]" />
                                        <span>Giao hàng toàn quốc</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IoShieldCheckmarkOutline className="text-lg text-[var(--color-primary)]" />
                                        <span>Hỗ trợ sau mua</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dải hành trình — không chỉ “card” */}
                <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:mt-14">
                    <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <ol className="flex min-w-[640px] items-stretch gap-0 sm:min-w-0 sm:justify-between">
                            {journeySteps.map((step, i) => (
                                <li
                                    key={step.n}
                                    className="flex flex-1 items-center gap-2"
                                >
                                    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-slate-200/90 bg-white px-3 py-3 shadow-sm sm:px-4">
                                        <span className="font-mono text-[10px] font-bold text-emerald-600">
                                            {step.n}
                                        </span>
                                        <span className="text-sm font-bold text-slate-900">
                                            {step.t}
                                        </span>
                                        <span className="mt-1 text-[11px] leading-snug text-slate-500">
                                            {step.d}
                                        </span>
                                    </div>
                                    {i < journeySteps.length - 1 ? (
                                        <AiOutlineRight
                                            className="mx-0.5 shrink-0 text-slate-300 sm:mx-1"
                                            aria-hidden
                                        />
                                    ) : null}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Sticky wayfinding — điều hướng chương */}
                <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-[var(--color-bg)]/90 backdrop-blur-lg">
                    <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 sm:py-3">
                        {[
                            { id: SECTION_IDS.explore, label: 'Khám phá' },
                            { id: SECTION_IDS.reviews, label: 'Đánh giá' },
                            { id: SECTION_IDS.contact, label: 'Liên hệ' },
                            { id: SECTION_IDS.suggest, label: 'Gợi ý' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className="shrink-0 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-200 hover:bg-white hover:text-[var(--color-primary)]"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:space-y-24">
                    {/* Bento + tab nội dung */}
                    <section
                        id={SECTION_IDS.explore}
                        className="scroll-mt-28"
                        aria-labelledby="vp-pd-explore-h"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2
                                    id="vp-pd-explore-h"
                                    className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
                                >
                                    Khám phá sản phẩm
                                </h2>
                                <p className="mt-1 max-w-xl text-sm text-slate-500">
                                    Chuyển tab để xem mô tả, hình kỹ thuật hoặc
                                    chính sách vận chuyển.
                                </p>
                            </div>
                            <div
                                className="flex flex-wrap gap-1 rounded-xl bg-slate-200/60 p-1"
                                role="tablist"
                            >
                                {[
                                    { key: 'story', label: 'Mô tả' },
                                    { key: 'media', label: 'Hình ảnh' },
                                    { key: 'ship', label: 'Vận chuyển' },
                                ].map((t) => (
                                    <button
                                        key={t.key}
                                        type="button"
                                        role="tab"
                                        aria-selected={storyTab === t.key}
                                        onClick={() => setStoryTab(t.key)}
                                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                                            storyTab === t.key
                                                ? 'bg-white text-[var(--color-primary)] shadow-sm'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-12 md:gap-5">
                            {storyTab === 'story' && (
                                <>
                                    <div className="relative md:col-span-7 md:row-span-2">
                                        <div
                                            className="absolute -left-3 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-[var(--color-primary)] to-emerald-200 md:block"
                                            aria-hidden
                                        />
                                        <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 md:pl-8">
                                            <h3 className="text-lg font-bold text-slate-900">
                                                Mô tả chi tiết
                                            </h3>
                                            <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-slate-600">
                                                {productDetail?.description}
                                            </p>
                                            <dl className="mt-8 grid gap-4 border-t border-slate-100 pt-6 text-sm sm:grid-cols-2">
                                                <div>
                                                    <dt className="text-slate-400">
                                                        Tồn kho
                                                    </dt>
                                                    <dd className="mt-1 font-bold text-slate-900">
                                                        {productDetail?.stock}
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-slate-400">
                                                        Kho
                                                    </dt>
                                                    <dd className="mt-1 font-bold capitalize text-[var(--color-primary)]">
                                                        Hải Phòng — VN
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <dt className="text-slate-400">
                                                        Danh mục
                                                    </dt>
                                                    <dd className="mt-1 font-bold capitalize text-[var(--color-primary)]">
                                                        Thiết bị điện
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:col-span-5">
                                        {extraImages[0] ? (
                                            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md md:aspect-[5/3]">
                                                <img
                                                    src={extraImages[0]}
                                                    alt=""
                                                    className="h-full min-h-[200px] w-full object-cover"
                                                />
                                            </div>
                                        ) : null}
                                        <div className="grid grid-cols-2 gap-4">
                                            {extraImages.slice(1).map(
                                                (src, i) =>
                                                    src && (
                                                        <div
                                                            key={i}
                                                            className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
                                                        >
                                                            <img
                                                                src={src}
                                                                alt=""
                                                                className="aspect-square w-full object-cover"
                                                            />
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {storyTab === 'media' && (
                                <div className="md:col-span-12">
                                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                                        {galleryImages.map((src, i) => (
                                            <div
                                                key={i}
                                                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
                                            >
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {storyTab === 'ship' && (
                                <div className="grid gap-4 sm:grid-cols-2 md:col-span-12 lg:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <FiTruck className="text-3xl text-[var(--color-primary)]" />
                                        <h3 className="mt-4 font-bold text-slate-900">
                                            Giao &amp; lắp
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                            Thời gian và chi phí xác nhận theo
                                            địa điểm thi công. Đội ngũ khảo sát
                                            hỗ trợ lên lịch phù hợp.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <IoShieldCheckmarkOutline className="text-3xl text-[var(--color-primary)]" />
                                        <h3 className="mt-4 font-bold text-slate-900">
                                            Đổi trả &amp; tin cậy
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                            Hàng chính hãng, quy trình đổi trả
                                            theo chính sách cửa hàng. Hotline
                                            đồng hành sau mua.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 sm:col-span-2 lg:col-span-1">
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Gợi ý
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600">
                                            Cần báo giá nhanh? Dùng nút{' '}
                                            <strong>Nhận báo giá</strong> hoặc
                                            gọi trực tiếp — kỹ thuật viên phản
                                            hồi sớm nhất có thể.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Đánh giá — timeline */}
                    <section
                        id={SECTION_IDS.reviews}
                        className="scroll-mt-28"
                    >
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            Đánh giá
                        </h2>
                        <div
                            className={`mt-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-white p-6 ${
                                comments?.length ? '' : 'hidden'
                            }`}
                        >
                            {comments?.length > 0 ? (
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-4xl font-black text-[var(--color-primary)]">
                                            {averageStar}
                                            <span className="text-lg font-semibold text-slate-500">
                                                /5
                                            </span>
                                        </p>
                                        <div className="mt-1 flex gap-0.5">
                                            {[...Array(5)].map((_, index) => {
                                                const starValue =
                                                    averageStar - index;
                                                if (starValue >= 1)
                                                    return (
                                                        <FaStar
                                                            key={index}
                                                            className="text-lg text-amber-400"
                                                        />
                                                    );
                                                if (starValue > 0)
                                                    return (
                                                        <FaRegStar
                                                            key={index}
                                                            className="text-lg text-amber-400/70"
                                                        />
                                                    );
                                                return (
                                                    <FaRegStar
                                                        key={index}
                                                        className="text-lg text-slate-300"
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {typeComment.map((item, idx) => (
                                            <Button
                                                key={idx}
                                                type="button"
                                                className="!rounded-full !border !border-slate-200 !bg-white !py-2 !px-4 !text-sm !font-medium !normal-case !text-slate-700 hover:!border-[var(--color-primary)]"
                                            >
                                                {item.title} ({item.length})
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <ul className="relative mt-10 space-y-0 pl-2 sm:pl-4">
                            <div
                                className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-[var(--color-primary)]/50 via-slate-200 to-slate-200 sm:left-[23px]"
                                aria-hidden
                            />
                            {currentComment && currentComment.length > 0 ? (
                                currentComment.map((item) => (
                                    <li
                                        key={item._id}
                                        className="relative pb-10 pl-10 sm:pl-12"
                                    >
                                        <span
                                            className="absolute left-2 top-3 flex h-4 w-4 rounded-full border-2 border-white bg-[var(--color-primary)] shadow sm:left-3 sm:h-4 sm:w-4"
                                            aria-hidden
                                        />
                                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                            <div className="flex gap-4">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100">
                                                    <img
                                                        src={
                                                            item?.user_id?.avatar?.startsWith(
                                                                '/uploads'
                                                            )
                                                                ? `${import.meta.env.VITE_SERVER_URL}${item?.user_id?.avatar}`
                                                                : item
                                                                      ?.user_id
                                                                      ?.avatar
                                                        }
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <span className="font-bold text-slate-900">
                                                            {
                                                                item.user_id
                                                                    .account
                                                            }
                                                        </span>
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map(
                                                                (_, index) =>
                                                                    index <
                                                                    item.star ? (
                                                                        <FaStar
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-xs text-amber-400"
                                                                        />
                                                                    ) : (
                                                                        <FaRegStar
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-xs text-slate-300"
                                                                        />
                                                                    )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {item.lastUpdate}
                                                    </p>
                                                    <p className="mt-2 text-sm text-slate-600">
                                                        Chất lượng:{' '}
                                                        {item.quantity} · Đúng
                                                        mô tả:{' '}
                                                        {item.isAccurate}
                                                    </p>
                                                    <p className="mt-2 text-[15px] leading-relaxed text-slate-800">
                                                        {item.message}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {item.img_1 && (
                                                            <img
                                                                src={`${import.meta.env.VITE_SERVER_URL}${item.img_1}`}
                                                                alt=""
                                                                className="h-20 w-20 rounded-lg border object-cover sm:h-24 sm:w-24"
                                                            />
                                                        )}
                                                        {item.img && (
                                                            <img
                                                                src={`${import.meta.env.VITE_SERVER_URL}${item.img}`}
                                                                alt=""
                                                                className="h-20 w-20 rounded-lg border object-cover sm:h-24 sm:w-24"
                                                            />
                                                        )}
                                                        {item.img_2 && (
                                                            <img
                                                                src={`${import.meta.env.VITE_SERVER_URL}${item.img_2}`}
                                                                alt=""
                                                                className="h-20 w-20 rounded-lg border object-cover sm:h-24 sm:w-24"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm">
                                                        <span className="font-semibold text-slate-700">
                                                            Phản hồi cửa hàng
                                                        </span>
                                                        <p className="mt-1 text-slate-500">
                                                            Cảm ơn đã ủng hộ
                                                            chúng tôi
                                                        </p>
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between text-slate-500">
                                                        <div className="flex items-center gap-2">
                                                            <BiSolidLike className="text-lg text-[var(--color-primary)]" />
                                                            <span>29</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="rounded-lg p-2 hover:bg-slate-100"
                                                            aria-label="Khác"
                                                        >
                                                            <BsThreeDotsVertical className="text-lg" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
                                    <img
                                        src="/img/no-comment.png"
                                        alt=""
                                        className="mx-auto h-36 w-36 opacity-35"
                                    />
                                    <p className="mt-3 text-slate-500">
                                        Chưa có đánh giá
                                    </p>
                                </div>
                            )}
                        </ul>
                        {comments?.length > 0 ? (
                            <div className="mt-8 flex justify-center">
                                <PageBar
                                    currentPage={current}
                                    totalPage={Math.max(
                                        1,
                                        Math.ceil(comments.length / limit)
                                    )}
                                    onPageChange={setCurrent}
                                />
                            </div>
                        ) : null}
                    </section>

                    <section
                        id={SECTION_IDS.contact}
                        className="scroll-mt-28"
                    >
                        <div className="grid gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg lg:grid-cols-5">
                            <div className="relative flex flex-col justify-end bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-950 p-8 text-white lg:col-span-2 lg:min-h-[320px]">
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-30"
                                    aria-hidden
                                >
                                    <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-emerald-400 blur-3xl" />
                                </div>
                                <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/90">
                                    Liên hệ
                                </p>
                                <h2 className="relative mt-2 text-2xl font-black leading-tight sm:text-3xl">
                                    Cần tư vấn kỹ thuật?
                                </h2>
                                <p className="relative mt-3 max-w-sm text-sm text-white/75">
                                    Gửi nội dung — chúng tôi phản hồi trong thời
                                    gian làm việc.
                                </p>
                            </div>
                            <div className="p-6 sm:p-8 lg:col-span-3">
                                <Form />
                            </div>
                        </div>
                    </section>

                    <section
                        id={SECTION_IDS.suggest}
                        className="scroll-mt-28 pb-8"
                    >
                        <h2 className="text-center text-2xl font-black text-slate-900 sm:text-3xl">
                            Có thể bạn cần
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-center text-sm text-slate-500">
                            Sản phẩm liên quan cùng ngành
                        </p>
                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/90 p-4 sm:p-6">
                            <ProductsAll data={productSuggest} />
                        </div>
                    </section>
                </div>
            </div>

            {/* Thanh CTA nổi — xuất hiện sau khi cuộn */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/90 bg-white/95 px-4 py-3 shadow-[0_-8px_40px_rgba(15,23,42,0.12)] backdrop-blur-md transition-transform duration-300 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:left-1/2 lg:right-auto lg:bottom-6 lg:w-full lg:max-w-lg lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:px-5 ${
                    showFloatBar
                        ? 'translate-y-0'
                        : 'pointer-events-none translate-y-full opacity-0 lg:translate-y-[120%]'
                }`}
                aria-hidden={!showFloatBar}
            >
                <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-xs text-slate-500">
                            {productDetail?.name}
                        </p>
                        <p className="text-lg font-black tabular-nums text-[var(--color-primary)]">
                            ₫{format(pricePre)}
                        </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                        <Button
                            type="button"
                            onClick={() => setQuoteOpen(true)}
                            className="!rounded-xl !px-4 !py-2.5 !normal-case !text-sm !font-bold"
                        >
                            Báo giá
                        </Button>
                        <Button
                            type="button"
                            onClick={() =>
                                handleAddToCart(
                                    productDetail,
                                    currentUser?._id
                                )
                            }
                            disabled={isOutOfStock || !currentUser?._id}
                            className="!rounded-xl !px-4 !py-2.5 !normal-case !text-sm !font-bold !border-2 !border-[var(--color-primary)] !bg-emerald-50 !text-[var(--color-primary)] disabled:!border-slate-200 disabled:!bg-slate-100 disabled:!text-slate-400"
                        >
                            {isOutOfStock ? 'Hết' : '+ Giỏ'}
                        </Button>
                    </div>
                </div>
            </div>

            <QuoteRequestModal
                open={quoteOpen}
                onClose={() => setQuoteOpen(false)}
                productName={productDetail?.name}
                productSlug={productDetail?.slug}
            />
        </>
    );
};

export default ProductDetail;

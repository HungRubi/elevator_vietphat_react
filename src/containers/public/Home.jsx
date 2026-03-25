import { NavLink } from 'react-router-dom';
import { Button, ListProduct, Form, HomeVideoSection } from '../../components/index'
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions';
import { sortArticlesNewestFirst } from '../../util/articleUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import icons from '../../util/icons';

const { FiTruck, IoShieldCheckmarkOutline, AiOutlineMessage, MdEmail, FaPhoneAlt } = icons;

const Home = () => {
    const dispatch = useDispatch();
    const { article, articles, productsCategory, banner, video } = useSelector((state) => state.app);
    const [active, setActive] = useState(0);

    useEffect(() => {
        dispatch(actions.getArticles());
    }, [dispatch]);

    const latestArticles = useMemo(() => {
        const src = Array.isArray(articles) && articles.length > 0 ? articles : article;
        return sortArticlesNewestFirst(src || []).slice(0, 3);
    }, [articles, article]);
    const tabs = [
        { label: "COP/LOP", category: "COP/LOP" },
        { label: "Linh kiện điện", category: "Linh kiện điện" },
        { label: "Linh kiện inox", category: "Linh kiện inox" },
        { label: "Tay vịn cabin", category: "Tay vịn thang máy" },
    ];
    return (
        <>
            <Helmet>
                <title>Trang Chủ - Thang máy Việt Phát</title>
                <meta name="description" content="Thang máy Việt Phát - nơi cung cấp thiết bị thang máy chất lượng cao" />
                <meta name="keywords" content="thang máy Việt Phát, thang máy gia đình, thang máy tải hàng, thang máy kính, lắp đặt thang máy, bảo trì thang máy, công ty thang máy uy tín, thang máy chất lượng cao" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/" />
            </Helmet>
            <div className="bg-[#f6f8f7]">
                
                <div className="relative mx-auto w-full max-w-[1200px] px-4 pt-6 md:px-8 md:pt-8">
                    {/* subtle mesh only for hero area */}
                    <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-10 -bottom-24 -z-10 overflow-hidden">
                        <div className="absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-emerald-400/16 blur-3xl" />
                        <div className="absolute -right-28 -top-16 h-[420px] w-[420px] rounded-full bg-sky-400/12 blur-3xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.045)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
                    </div>

                    <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    slidesPerView={1}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1200} // Làm hiệu ứng mượt hơn
                    className="relative z-20 overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_16px_46px_rgba(2,6,23,0.10)] slider_home"

                >
                    {banner?.map(item => (
                        <SwiperSlide key={item._id}>
                            <div className="w-full aspect-[1600/670] flex-none">
                                <img src={item.thumbnail} alt="slider" className="w-full object-cover"/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                </div>

                {/* Intro — typography-first, không ảnh */}
                <section
                    className="relative mx-auto w-full max-w-[1200px] px-4 pb-10 pt-8 md:px-8 md:pb-14 md:pt-12"
                    aria-labelledby="home-hero-heading"
                >
                    <div
                        className="pointer-events-none absolute -left-4 top-0 h-[min(100%,420px)] w-1 rounded-full bg-gradient-to-b from-[#2f904b] via-[#2f904b]/40 to-transparent md:left-0"
                        aria-hidden
                    />
                    <div className="relative pl-5 md:pl-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center rounded-md border border-slate-200/90 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm">
                                Việt Phát
                            </span>
                            <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
                            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                                {'Safe & quality elevator components'}
                            </p>
                        </div>

                        <h1
                            id="home-hero-heading"
                            className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:max-w-4xl lg:text-[3.25rem] lg:leading-[1.06]"
                        >
                            Phụ tùng thang máy{' '}
                            <span className="bg-gradient-to-r from-[#1a6b34] via-[#2f904b] to-[#3daa5c] bg-clip-text text-transparent">
                                chất lượng cao
                            </span>
                            <span className="text-[#2f904b]">.</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                            Công ty TNHH Phụ tùng thang máy Việt Phát cung cấp phụ kiện thang máy chất lượng cao,
                            linh kiện và giải pháp liên quan cho khách hàng trên toàn Việt Nam.
                        </p>

                        <div
                            className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4"
                            role="list"
                            aria-label="Cam kết dịch vụ"
                        >
                            {[
                                {
                                    t: 'Bảo hành rõ ràng',
                                    d: 'Chính sách minh bạch, hỗ trợ khiếu nại nhanh.',
                                    Icon: IoShieldCheckmarkOutline,
                                },
                                {
                                    t: 'Giao hàng toàn quốc',
                                    d: 'Đóng gói cẩn thận, phối hợp vận chuyển linh hoạt.',
                                    Icon: FiTruck,
                                },
                                {
                                    t: 'Hỗ trợ kỹ thuật',
                                    d: 'Tư vấn lắp đặt, tương thích model và tiêu chuẩn.',
                                    Icon: AiOutlineMessage,
                                },
                            ].map(({ t, d, Icon }, i) => (
                                <div
                                    key={t}
                                    role="listitem"
                                    className="group relative flex gap-3 rounded-lg border border-slate-200/80 bg-white/70 p-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition hover:border-[#2f904b]/25 hover:shadow-md"
                                >
                                    <span
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-100 bg-slate-50 text-slate-600 transition group-hover:border-[#2f904b]/20 group-hover:text-[#2f904b]"
                                        aria-hidden
                                    >
                                        <Icon className="text-lg" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold tabular-nums text-slate-400">0{i + 1}</p>
                                        <p className="mt-0.5 font-semibold text-slate-900">{t}</p>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <NavLink to="/products" className="inline-flex">
                                <Button className="!rounded-lg !px-7 !py-3.5 !text-[15px] !font-semibold !normal-case !shadow-sm">
                                    Xem sản phẩm
                                </Button>
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-900/90 bg-transparent px-6 py-3 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                            >
                                Liên hệ tư vấn
                                <span aria-hidden className="text-lg leading-none">
                                    →
                                </span>
                            </NavLink>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-8 md:py-10">
                    <div className="grid grid-cols-1 gap-8 border-t border-slate-200/80 pt-10 md:grid-cols-3">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Tư vấn chọn linh kiện</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Đồng hành chọn đúng model, tiêu chuẩn và phụ kiện phù hợp dự án của bạn.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Đồng bộ giải pháp</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Kết nối linh kiện — vận hành — bảo trì theo một quy trình rõ ràng, ít rủi ro.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Hỗ trợ sau bán</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Phản hồi nhanh, hỗ trợ kỹ thuật và báo giá minh bạch khi bạn cần.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8" data-aos="fade-up">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Danh mục nổi bật
                            </div>
                            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                Sản phẩm
                                <span className="text-[#2f904b]">.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {tabs?.map((tab, index) => (
                            <button
                                type="button"
                                key={tab.label}
                                onClick={() => setActive(index)}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                    active === index
                                        ? "border-white/60 bg-white/70 text-slate-900 shadow-sm"
                                        : "border-white/40 bg-white/35 text-slate-600 hover:bg-white/55 hover:text-slate-900"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        {tabs?.map((tab, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-300 ease-out ${
                                    active === index ? "opacity-100 block" : "opacity-0 hidden"
                                }`}
                            >
                                <ListProduct data={productsCategory} category={tab.category} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Articles */}
                <section className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8" data-aos="fade-up">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Cập nhật mới
                            </div>
                            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                Bài viết nổi bật
                                <span className="text-[#2f904b]">.</span>
                            </h2>
                        </div>
                        <NavLink to="/news" className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 sm:inline-flex">
                            Xem tất cả →
                        </NavLink>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {latestArticles.length > 0 ? (
                            latestArticles.map((item) => (
                                <NavLink
                                    key={item._id}
                                    to={`/news/detail/${item.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-white/60 bg-white/55 shadow-[0_20px_60px_rgba(2,6,23,0.10)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(2,6,23,0.14)]"
                                >
                                    <div className="relative overflow-hidden">
                                        <img src={item.thumbnail} alt={item.subject} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            {item.dateFormat || "Tin tức"}
                                        </div>
                                        <div className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-slate-900 transition group-hover:text-[#2f904b]">
                                            {item.subject}
                                        </div>
                                        <div className="mt-2 line-clamp-2 text-sm text-slate-600">
                                            {item.content}
                                        </div>
                                        <div className="mt-4 text-sm font-semibold text-slate-700">
                                            Đọc thêm →
                                        </div>
                                    </div>
                                </NavLink>
                            ))
                        ) : (
                            <p className="col-span-full py-8 text-center text-sm text-slate-500">
                                Đang tải hoặc chưa có bài viết.{" "}
                                <NavLink to="/news" className="font-semibold text-[#2f904b] hover:underline">
                                    Xem trang tin tức
                                </NavLink>
                            </p>
                        )}
                    </div>
                </section>

                <HomeVideoSection videos={video} />

                {/* Liên hệ — tư vấn nhanh */}
                <section
                    id="tu-van-nhanh"
                    className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-8"
                    data-aos="fade-up"
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Liên hệ
                        </div>
                        <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                            Tư vấn nhanh
                            <span className="text-[#2f904b]">.</span>
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 md:text-base">
                            Gửi nhu cầu — đội ngũ sẽ gọi lại hoặc báo giá qua email trong thời gian sớm nhất.
                        </p>
                    </div>

                    <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                        <aside className="flex flex-col gap-4 lg:col-span-4">
                            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.08)] backdrop-blur-xl">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#2f904b]">
                                    <FaPhoneAlt className="size-4" aria-hidden />
                                    Gọi trực tiếp
                                </div>
                                <NavLink
                                    to="tel:0924113113"
                                    className="mt-3 block text-2xl font-extrabold tabular-nums text-slate-900 transition hover:text-[#2f904b]"
                                >
                                    0924 113 113
                                </NavLink>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    Hotline hỗ trợ nhanh theo giờ làm việc của công ty.
                                </p>
                            </div>
                            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.08)] backdrop-blur-xl">
                                <div className="flex items-start gap-3">
                                    <MdEmail className="mt-0.5 size-5 shrink-0 text-[#2f904b]" aria-hidden />
                                    <div className="min-w-0 text-left">
                                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Email
                                        </div>
                                        <a
                                            href="mailto:infor@phukienthangmay.vn"
                                            className="mt-1 block break-all text-sm font-semibold text-slate-900 transition hover:text-[#2f904b]"
                                        >
                                            infor@phukienthangmay.vn
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <ul className="space-y-3 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-5 text-left text-sm text-slate-700">
                                <li className="flex gap-3">
                                    <IoShieldCheckmarkOutline className="mt-0.5 size-5 shrink-0 text-[#2f904b]" aria-hidden />
                                    <span>Thông tin chỉ dùng để tư vấn, được xử lý bảo mật.</span>
                                </li>
                                <li className="flex gap-3">
                                    <AiOutlineMessage className="mt-0.5 size-5 shrink-0 text-[#2f904b]" aria-hidden />
                                    <span>Thường phản hồi trong vòng 24 giờ làm việc.</span>
                                </li>
                            </ul>
                        </aside>
                        <div className="lg:col-span-8">
                            <Form variant="embedded" className="!mt-0" />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mx-auto w-full max-w-[1200px] px-4 pb-14 md:px-8">
                    <div className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-[#2f904b] to-emerald-700 shadow-[0_20px_60px_rgba(2,6,23,0.12)]">
                        <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2 md:p-10">
                            <div className="text-white">
                                <div className="text-xs font-semibold uppercase tracking-wide text-white/80">Luôn hoạt động 24/7</div>
                                <div className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                                    Hãy liên hệ ngay để được tư vấn nhanh chóng
                                </div>
                                <div className="mt-3 text-sm text-white/90">
                                    Đội ngũ hỗ trợ sẵn sàng giải đáp và báo giá theo nhu cầu.
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-3 md:items-end">
                                <NavLink to={"tel:0924113113"} className="w-full md:w-auto">
                                    <Button className={"w-full md:w-auto !px-8 !py-4 font-semibold text-base rounded-2xl"}>
                                        Gọi ngay
                                    </Button>   
                                </NavLink>
                                <div className="text-xs text-white/80">
                                    Hotline: <span className="font-semibold text-white">0924 113 113</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </>
    )
}
export default Home
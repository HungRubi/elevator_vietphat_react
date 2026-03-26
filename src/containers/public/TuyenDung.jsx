import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideoDetail } from "../../store/slices/videoSlice";
import { Helmet } from 'react-helmet';
import icons from '../../util/icons';
import { PublicDetailSidebar } from '../../components';

const { FiBriefcase, FiMail, FiMapPin } = icons;

const HIGHLIGHTS = [
    { label: 'Số lượng', value: '05 nhân sự' },
    { label: 'Kinh nghiệm', value: 'Không bắt buộc — có đào tạo' },
    { label: 'Thu nhập', value: 'Trên 15.000.000đ / tháng' },
];

const TuyenDung = () => {
    const dispatch = useDispatch();
    const { productNewLast, articleSuggest } = useSelector((state) => state.video);

    const format = (money) => money?.toLocaleString('vi-VN');

    /* Sidebar tin/sp: reducer chỉ hydrate từ getVideoDetail (cùng pattern trang cũ) */
    const sidebarVideoSlug =
        'bang-dieu-khien-cabin-cop-mat-kinh-cuong-luc-tich-hop-van-tay-va-sac-dien-thoai-thong-minh';

    useEffect(() => {
        dispatch(fetchVideoDetail(sidebarVideoSlug));
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Tuyển dụng - Thang máy Việt Phát</title>
                <meta
                    name="description"
                    content="Cơ hội việc làm tại Thang máy Việt Phát — môi trường chuyên nghiệp, đãi ngộ rõ ràng."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/tuyen-dung" />
            </Helmet>

            <div className="min-h-screen bg-[var(--color-bg)]">
                <header className="relative overflow-hidden border-b border-emerald-900/20 bg-gradient-to-br from-slate-950 via-[#0f2918] to-[#0c1f18]">
                    <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
                    <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
                    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                            <FiBriefcase className="size-4" aria-hidden />
                            Tuyển dụng
                        </div>
                        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Gia nhập đội ngũ{' '}
                            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
                                Việt Phát
                            </span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                            Chúng tôi mở rộng sản xuất và cần đồng đội gắn bó, học hỏi nhanh và làm việc an toàn trong
                            môi trường thang máy &amp; cơ khí.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            {HIGHLIGHTS.map((h) => (
                                <div
                                    key={h.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                                >
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-200/80">
                                        {h.label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">{h.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
                    <article className="min-w-0 flex-1 space-y-6">
                        <section className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                                Thông báo tuyển dụng
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Do nhu cầu phát triển và mở rộng quy mô, Công ty thang máy Hybrid thông báo tuyển dụng
                                vị trí sau:
                            </p>
                            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                                <li>
                                    <strong className="text-slate-900">Nhân viên sản xuất:</strong> 05 người
                                </li>
                                <li>
                                    <strong className="text-slate-900">Kinh nghiệm:</strong> không yêu cầu — sẽ đào tạo
                                </li>
                                <li>
                                    <strong className="text-slate-900">Đãi ngộ:</strong> lương cơ bản + % doanh số +
                                    thưởng (trên 15.000.000đ)
                                </li>
                            </ol>
                        </section>

                        <section className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">Mô tả công việc</h2>
                            <p className="mt-3 text-sm text-slate-600">
                                Chúng tôi tìm ứng viên sản xuất có đam mê với thang máy:
                            </p>
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                                <li>
                                    Tham gia sản xuất, lắp ráp linh kiện theo bản vẽ và hướng dẫn kỹ thuật.
                                </li>
                                <li>Vận hành máy cắt, hàn, uốn và thiết bị dây chuyền.</li>
                                <li>Đảm bảo tiến độ và chất lượng theo yêu cầu.</li>
                                <li>Kiểm tra, bảo trì định kỳ công cụ và thiết bị.</li>
                                <li>Phối hợp xử lý sự cố với các bộ phận liên quan.</li>
                                <li>Thực hiện công việc khác theo phân công.</li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">Yêu cầu ứng viên</h2>
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                                <li>Nam, 20–40 tuổi, sức khỏe tốt; am hiểu xây dựng / thang máy là lợi thế.</li>
                                <li>Ưu tiên đọc hiểu bản vẽ kỹ thuật.</li>
                                <li>Chịu khó, cẩn thận, trách nhiệm.</li>
                                <li>Sẵn sàng tăng ca khi cần.</li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-slate-200/90 bg-emerald-50/40 p-6 ring-1 ring-emerald-100 sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">Quyền lợi</h2>
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                                <li>Thu nhập 15.000.000đ – 20.000.000đ.</li>
                                <li>Thưởng hoa hồng theo doanh số sản xuất.</li>
                                <li>Đào tạo nếu chưa có kinh nghiệm.</li>
                                <li>BHXH, BHYT, BHTN theo quy định.</li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">Thời gian làm việc</h2>
                            <p className="mt-3 text-sm text-slate-600">
                                Thứ Hai đến thứ Bảy — giờ hành chính hoặc theo ca (thỏa thuận khi phỏng vấn).
                            </p>
                        </section>

                        <section className="rounded-2xl border border-dashed border-[var(--color-primary)]/35 bg-[var(--color-primary)]/5 p-6 sm:p-8">
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">Nộp hồ sơ</h2>
                            <ul className="mt-4 space-y-4 text-sm">
                                <li className="flex gap-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-primary)] shadow-sm ring-1 ring-slate-200">
                                        <FiMail className="size-5" aria-hidden />
                                    </span>
                                    <div>
                                        <p className="font-bold text-slate-900">Email</p>
                                        <a
                                            href="mailto:infor@phukienthangmay.vn"
                                            className="mt-1 inline-block font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
                                        >
                                            infor@phukienthangmay.vn
                                        </a>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-primary)] shadow-sm ring-1 ring-slate-200">
                                        <FiMapPin className="size-5" aria-hidden />
                                    </span>
                                    <div>
                                        <p className="font-bold text-slate-900">Địa chỉ nộp trực tiếp</p>
                                        <p className="mt-1 leading-relaxed text-slate-700">
                                            Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </article>

                    <PublicDetailSidebar
                        articleSuggest={articleSuggest}
                        productNewLast={productNewLast}
                        formatPrice={format}
                    />
                </div>
            </div>
        </>
    );
};

export default TuyenDung;

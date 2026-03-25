import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import icons from "../../util/icons";

const {
    FaGem,
    HiUserGroup,
    FaHeart,
    IoShieldCheckmarkOutline,
    FiTruck,
    FaRegCalendarAlt,
    BsArrowRightSquareFill,
    FaMapMarkerAlt,
} = icons;

const VALUES = [
    {
        icon: FaGem,
        title: "Chất lượng chuẩn mực",
        text: "Thiết bị và phụ kiện được lựa chọn kỹ, phù hợp tiêu chuẩn an toàn vận hành.",
    },
    {
        icon: HiUserGroup,
        title: "Con người là trọng tâm",
        text: "Đội ngũ kỹ thuật và tư vấn đồng hành từ khảo sát đến hậu mãi.",
    },
    {
        icon: FaHeart,
        title: "Phục vụ tận tâm",
        text: "Lắng nghe nhu cầu từng công trình — gia đình, văn phòng hay nhà xưởng.",
    },
    {
        icon: IoShieldCheckmarkOutline,
        title: "An toàn & bền bỉ",
        text: "Ưu tiên giải pháp ổn định, bảo trì định kỳ rõ ràng, minh bạch.",
    },
];

const CAPABILITIES = [
    { title: "Tư vấn & báo giá", desc: "Khảo sát hiện trạng, đề xuất cấu hình và chi phí hợp lý.", tone: "from-emerald-600 to-[#2f904b]" },
    { title: "Lắp đặt", desc: "Thi công có quy trình, bàn giao và hướng dẫn vận hành.", tone: "from-slate-800 to-slate-900" },
    { title: "Phụ tùng & COP/LOP", desc: "Cung cấp linh kiện, mặt gọi tầng, phụ kiện cabin.", tone: "from-teal-600 to-emerald-700" },
    { title: "Bảo trì", desc: "Kiểm tra định kỳ, xử lý sự cố, kéo dài tuổi thọ thiết bị.", tone: "from-slate-700 to-slate-800" },
];

const STATS = [
    { n: "10+", label: "Năm kinh nghiệm ngành" },
    { n: "500+", label: "Dự án & đơn hàng phục vụ" },
    { n: "24/7", label: "Hotline hỗ trợ nhanh" },
    { n: "100%", label: "Cam kết uy tín từng hạng mục" },
];

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>Giới thiệu - Thang máy Việt Phát</title>
                <meta
                    name="description"
                    content="Thang máy Việt Phát — đơn vị cung cấp thiết bị, lắp đặt và dịch vụ thang máy uy tín tại Việt Nam. Đội ngũ chuyên nghiệp, cam kết chất lượng và an toàn."
                />
                <meta
                    name="keywords"
                    content="giới thiệu thang máy Việt Phát, công ty thang máy, lắp đặt thang máy, bảo trì thang máy"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/about-us" />
            </Helmet>

            <div className="min-h-screen bg-[#f4f7f5]">
                {/* Hero */}
                <section className="relative overflow-hidden border-b border-emerald-900/15 bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#0c1f18]">
                    <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0zm24 24h24v24H24V24z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                        }}
                    />
                    <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400/90">Về chúng tôi</p>
                        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                            Nâng tầm
                            <span className="bg-gradient-to-r from-emerald-300 to-[#9ae6b4] bg-clip-text text-transparent"> công trình </span>
                            của bạn
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                            Công ty TNHH Thang máy Việt Phát — đồng hành cùng chủ đầu tư và nhà thầu trong hệ sinh thái thang máy:
                            từ phụ kiện, linh kiện đến tư vấn lắp đặt và bảo trì.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {["Uy tín", "An toàn", "Minh bạch", "Hậu mãi"].map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-sm"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-2xl bg-[#2f904b] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(47,144,75,0.4)] transition hover:bg-emerald-600"
                            >
                                Liên hệ tư vấn
                                <BsArrowRightSquareFill className="size-5" aria-hidden />
                            </NavLink>
                            <NavLink
                                to="/products"
                                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
                            >
                                Xem sản phẩm
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="mx-auto -mt-8 max-w-[1200px] px-4 md:px-8">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-white/60 bg-white p-5 text-center shadow-[0_16px_48px_rgba(2,6,23,0.08)]"
                                data-aos="fade-up"
                            >
                                <p className="text-2xl font-black tabular-nums text-[#2f904b] md:text-3xl">{s.n}</p>
                                <p className="mt-1 text-xs font-medium leading-snug text-slate-600 md:text-sm">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story */}
                <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-20">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                        <div data-aos="fade-up">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f904b]">Câu chuyện</h2>
                            <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                                Chúng tôi là ai?
                            </p>
                            <div className="mt-4 h-1 w-14 rounded-full bg-[#2f904b]" />
                            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
                                <p>
                                    Thang máy Việt Phát phát triển từ nhu cầu thực tế của thị trường: cần nguồn phụ kiện — linh kiện
                                    tin cậy, đội ngũ am hiểu kỹ thuật và quy trình phục vụ rõ ràng.
                                </p>
                                <p>
                                    Chúng tôi tập trung vào chất lượng từng đơn hàng, hỗ trợ tư vấn đúng ngữ cảnh công trình và
                                    duy trì quan hệ lâu dài với khách hàng, đối tác.
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_24px_64px_rgba(2,6,23,0.08)]"
                            data-aos="fade-up"
                        >
                            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-100/80 blur-2xl" />
                            <FiTruck className="relative size-12 text-[#2f904b]" aria-hidden />
                            <p className="relative mt-4 text-lg font-bold text-slate-900">Từ kho đến công trình</p>
                            <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                                Hệ thống sản phẩm đa dạng (COP/LOP, linh kiện điện — inox — thép, tay vịn…) giúp rút ngắn thời gian
                                tìm nguồn và đồng bộ cho dự án của bạn.
                            </p>
                            <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-[#2f904b]">
                                <FaRegCalendarAlt className="size-4" aria-hidden />
                                Luôn cập nhật xu hướng thiết bị thang máy
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="border-y border-slate-200/80 bg-white py-16 md:py-20">
                    <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f904b]">Giá trị cốt lõi</h2>
                            <p className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">Điều khách hàng nhận được</p>
                            <p className="mt-3 text-sm text-slate-600 md:text-base">
                                Bốn trụ cột chúng tôi giữ vững trong mọi tương tác — từ báo giá đến sau bán hàng.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {VALUES.map((v, i) => (
                                <article
                                    key={v.title}
                                    className="group rounded-2xl border border-slate-100 bg-[#f8faf9] p-6 transition hover:border-emerald-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(2,6,23,0.06)]"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 60}
                                >
                                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-[#2f904b] transition group-hover:bg-[#2f904b] group-hover:text-white">
                                        <v.icon className="size-6" aria-hidden />
                                    </span>
                                    <h3 className="mt-4 text-base font-bold text-slate-900">{v.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities bento */}
                <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-20">
                    <div className="mb-10 max-w-2xl">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f904b]">Năng lực</h2>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">Trọn vòng đời thang máy</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {CAPABILITIES.map((c, i) => (
                            <div
                                key={c.title}
                                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.tone} p-6 text-white shadow-lg md:p-8`}
                                data-aos="fade-up"
                                data-aos-delay={i * 80}
                            >
                                <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                                <h3 className="relative text-lg font-extrabold md:text-xl">{c.title}</h3>
                                <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-white/85">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mx-auto max-w-[1200px] px-4 pb-20 md:px-8">
                    <div
                        className="relative overflow-hidden rounded-[1.75rem] border border-emerald-200/60 bg-gradient-to-br from-[#2f904b] to-emerald-800 p-8 text-center shadow-[0_28px_64px_rgba(47,144,75,0.35)] md:p-12"
                        data-aos="fade-up"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
                        <FaMapMarkerAlt className="relative mx-auto size-10 text-white/90" aria-hidden />
                        <h2 className="relative mt-4 text-2xl font-extrabold text-white md:text-3xl">Sẵn sàng đồng hành</h2>
                        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-emerald-50 md:text-base">
                            Dù bạn là chủ công trình, nhà thầu hay đơn vị bảo trì — hãy trao đề bài, chúng tôi phản hồi bằng giải pháp
                            thực tế và báo giá minh bạch.
                        </p>
                        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#2f904b] shadow-lg transition hover:bg-emerald-50"
                            >
                                Liên hệ ngay
                                <BsArrowRightSquareFill className="size-5" aria-hidden />
                            </NavLink>
                            <NavLink
                                to="/news"
                                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                            >
                                Đọc tin &amp; video
                            </NavLink>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUs;

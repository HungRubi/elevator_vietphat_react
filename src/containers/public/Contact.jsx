import { Helmet } from "react-helmet";
import { Form } from "../../components/index";
import icons from "../../util/icons";
import { NavLink } from "react-router-dom";

const { FaMapMarkerAlt, MdEmail, FaPhoneAlt, FaRegCalendarAlt, BiSolidPhoneCall, IoIosSend } = icons;

const MAPS_URL =
    "https://www.google.com/maps/dir/20.87506,106.6173419/20.87815,106.61313/@20.8759506,106.6100315,16z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu";

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Liên hệ - Thang máy Việt Phát</title>
                <meta
                    name="description"
                    content="Liên hệ Thang máy Việt Phát — tư vấn, báo giá, hỗ trợ lắp đặt và phụ kiện thang máy. Hotline 0924 113 113, Hải Phòng."
                />
                <meta
                    name="keywords"
                    content="liên hệ thang máy, tư vấn thang máy, báo giá thang máy, Thang máy Việt Phát, Hải Phòng"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/contact" />
            </Helmet>

            <div className="min-h-screen bg-[#f4f7f5]">
                {/* Hero */}
                <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
                    <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-slate-200/40 blur-3xl" />
                    <div className="relative mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-16">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2f904b]">Liên hệ</p>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                            Nói chuyện với
                            <span className="text-[#2f904b]"> Việt Phát</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                            Gửi form — chúng tôi phản hồi trong 24 giờ. Cần gấp? Gọi hotline hoặc ghé văn phòng tại Hải Phòng.
                        </p>
                    </div>
                </section>

                <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-10">
                    {/* Cột trái — thông tin */}
                    <aside className="flex flex-col gap-4 lg:col-span-5" data-aos="fade-up">
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_16px_48px_rgba(2,6,23,0.06)] md:p-6">
                            <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">Thông tin liên hệ</h2>
                            <p className="mt-1 text-xs text-slate-500">Công ty TNHH Thang máy Việt Phát</p>
                            <ul className="mt-5 space-y-4">
                                <li>
                                    <a
                                        href={MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex gap-3 rounded-xl border border-transparent p-2 transition hover:border-slate-100 hover:bg-slate-50"
                                    >
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#2f904b] ring-1 ring-emerald-100">
                                            <FaMapMarkerAlt className="size-5" aria-hidden />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Địa chỉ</span>
                                            <span className="mt-0.5 block text-sm font-semibold leading-snug text-slate-800 group-hover:text-[#2f904b]">
                                                Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng
                                            </span>
                                            <span className="mt-1 text-xs font-medium text-[#2f904b]">Mở chỉ đường →</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:0924113113"
                                        className="group flex gap-3 rounded-xl border border-transparent p-2 transition hover:border-slate-100 hover:bg-slate-50"
                                    >
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#2f904b] ring-1 ring-emerald-100">
                                            <FaPhoneAlt className="size-5" aria-hidden />
                                        </span>
                                        <span>
                                            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Hotline</span>
                                            <span className="mt-0.5 block text-lg font-extrabold tabular-nums text-slate-900 group-hover:text-[#2f904b]">
                                                0924 113 113
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:infor@phukienthangmay.vn"
                                        className="group flex gap-3 rounded-xl border border-transparent p-2 transition hover:border-slate-100 hover:bg-slate-50"
                                    >
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#2f904b] ring-1 ring-emerald-100">
                                            <MdEmail className="size-5" aria-hidden />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Email</span>
                                            <span className="mt-0.5 block break-all text-sm font-semibold text-slate-800 group-hover:text-[#2f904b]">
                                                infor@phukienthangmay.vn
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-[#0c1f18] p-5 text-white shadow-lg md:p-6">
                            <div className="flex items-center gap-2 text-emerald-300">
                                <FaRegCalendarAlt className="size-5" aria-hidden />
                                <span className="text-xs font-bold uppercase tracking-wider">Giờ làm việc</span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-300">
                                Thứ Hai — Thứ Sáu: theo giờ hành chính. Hotline tiếp nhận yêu cầu; chúng tôi sắp lịch gọi lại nếu bạn
                                liên hệ ngoài giờ.
                            </p>
                            <NavLink
                                to="tel:0924113113"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f904b] py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                            >
                                <BiSolidPhoneCall className="size-5" aria-hidden />
                                Gọi ngay
                            </NavLink>
                        </div>

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
                            <div className="flex items-start gap-3">
                                <IoIosSend className="mt-0.5 size-6 shrink-0 text-[#2f904b]" aria-hidden />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Cam kết phản hồi</p>
                                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                        Chúng tôi phấn đấu phát triển bằng uy tín, tồn tại bằng chất lượng — hướng tới sự hài lòng của
                                        khách hàng và dịch vụ toàn diện.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Form — một lớp card (Form embedded) */}
                    <div className="lg:col-span-7" data-aos="fade-up">
                        <div className="mb-4 md:mb-5">
                            <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">Gửi yêu cầu</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Điền thông tin — đội ngũ sẽ liên hệ để tư vấn hoặc báo giá.
                            </p>
                        </div>
                        <Form variant="embedded" className="!mt-0 w-full" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;

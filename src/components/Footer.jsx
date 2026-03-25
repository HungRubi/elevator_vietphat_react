import { NavLink } from "react-router-dom";
import icons from "../util/icons";

const { FaMapMarkerAlt, FaPhoneAlt, MdEmail, BsFacebook, FaYoutube, FaInstagramSquare, FaTwitter } = icons;

const footerLink = "text-sm text-slate-300 transition hover:text-white";
const footerHeading = "text-xs font-semibold uppercase tracking-wider text-[#2f904b]";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full">
            <div className="border-t border-white/10 bg-gradient-to-br from-slate-900 via-[#0a1628] to-slate-900">
                <div className="mx-auto max-w-[1200px] px-4 py-10 text-center md:px-8">
                    <p className="text-sm font-medium text-slate-200 md:text-base">
                        Đồng hành cùng đối tác &amp; khách hàng trên toàn quốc
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        {["Tư vấn 24/7", "Bảo hành rõ ràng", "Lắp đặt chuyên nghiệp"].map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#051230]">
                <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 md:grid-cols-2 md:px-8 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <NavLink to="/" className="inline-flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f904b]/40">
                            <img src="/img/logo.png" alt="Thang máy Việt Phát" className="h-10 w-auto" />
                        </NavLink>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Cung cấp thang máy và phụ kiện chất lượng — tư vấn, lắp đặt và hỗ trợ sau bán hàng tận tâm.
                        </p>
                    </div>

                    <div>
                        <h3 className={footerHeading}>Khám phá</h3>
                        <ul className="mt-4 flex flex-col gap-2.5">
                            <li>
                                <NavLink to="/products" className={footerLink}>
                                    Sản phẩm
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/news" className={footerLink}>
                                    Tin tức
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" className={footerLink}>
                                    Giới thiệu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={footerLink}>
                                    Liên hệ
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={footerHeading}>Danh mục</h3>
                        <ul className="mt-4 flex flex-col gap-2.5">
                            <li>
                                <NavLink to="/products/cop-lop" className={footerLink}>
                                    COP / LOP
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products/linh-kien-dien" className={footerLink}>
                                    Linh kiện điện
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products/tay-vin-thang-may" className={footerLink}>
                                    Tay vịn thang máy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products/linh-kien-inox" className={footerLink}>
                                    Linh kiện inox
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={footerHeading}>Liên hệ</h3>
                        <ul className="mt-4 flex flex-col gap-4 text-sm text-slate-300">
                            <li>
                                <address className="not-italic">
                                    <div className="flex gap-2">
                                        <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2f904b]" aria-hidden />
                                        <NavLink
                                            className="text-left leading-snug text-slate-300 transition hover:text-white"
                                            title="Chỉ đường Google Maps"
                                            to="https://www.google.com/maps/dir/20.87506,106.6173419/20.87815,106.61313/@20.8759506,106.6100315,16z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu"
                                        >
                                            Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng
                                        </NavLink>
                                    </div>
                                </address>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <FaPhoneAlt className="shrink-0 text-[#2f904b]" aria-hidden />
                                    <NavLink to="tel:0924113113" className="hover:text-white">
                                        0924 113 113
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <MdEmail className="shrink-0 text-[#2f904b]" aria-hidden />
                                    <a href="mailto:infor@phukienthangmay.vn" className="break-all hover:text-white">
                                        infor@phukienthangmay.vn
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <NavLink
                                to="https://www.facebook.com/VietPhatelevator"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                aria-label="Facebook"
                            >
                                <BsFacebook className="size-5 text-sky-400" />
                            </NavLink>
                            <NavLink
                                to="https://www.youtube.com/@thangmayhybrid5438"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="size-5 text-red-400" />
                            </NavLink>
                            <span
                                className="flex size-10 cursor-not-allowed items-center justify-center rounded-full bg-white/5 text-slate-500"
                                title="Cập nhật link Instagram sau"
                                aria-hidden
                            >
                                <FaInstagramSquare className="size-5" />
                            </span>
                            <span
                                className="flex size-10 cursor-not-allowed items-center justify-center rounded-full bg-white/5 text-slate-500"
                                title="Cập nhật link X/Twitter sau"
                                aria-hidden
                            >
                                <FaTwitter className="size-5" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-slate-400 md:flex-row md:text-left md:px-8">
                        <p>
                            Để biết thêm về sản phẩm hoặc báo giá, gửi form liên hệ — chúng tôi sẽ phản hồi trong 24 giờ.
                        </p>
                        <NavLink
                            to="/contact"
                            className="shrink-0 rounded-xl border border-[#2f904b]/50 bg-[#2f904b]/15 px-5 py-2.5 text-sm font-semibold text-[#7ddf9a] transition hover:bg-[#2f904b]/25"
                        >
                            Liên hệ ngay
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="bg-[#2f904b] py-2.5 text-center text-sm text-white/95">
                © {year} Thang máy Việt Phát · Design by HUYHUNG
            </div>
        </footer>
    );
};

export default Footer;

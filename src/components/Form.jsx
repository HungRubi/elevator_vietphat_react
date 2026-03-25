import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import icons from "../util/icons";

const { IoIosSend } = icons;

const inputClass =
    "w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20";

/**
 * @param {{ className?: string; variant?: 'standalone' | 'embedded' }} props
 * variant embedded: dùng trong Home (không tiêu đề trong card, full width).
 * Giữ nguyên name: name, email, phone, subject, message cho EmailJS.
 */
const Form = ({ className = "", variant = "standalone" }) => {
    const [status, setStatus] = useState("");
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                import.meta.env.VITE_SERVICE_KEY,
                import.meta.env.VITE_TEMPLATE_KEY,
                form.current,
                import.meta.env.VITE_USER_PUBLIC_KEY
            )
            .then(() => {
                setStatus("1");
                form.current.reset();
            })
            .catch(() => {
                setStatus("2");
            });
    };

    useEffect(() => {
        if (status === "1") {
            toast.success("Chúng tôi đã nhận được lời nhắn của bạn ^^");
        }
        if (status === "2") {
            toast.error("Có lỗi gì rồi vui lòng kiểm tra lại thông tin!");
        }
        const timer = setTimeout(() => setStatus(""), 3000);
        return () => clearTimeout(timer);
    }, [status]);

    const isEmbedded = variant === "embedded";

    const shell =
        isEmbedded
            ? "w-full"
            : "mx-auto mt-8 w-full max-w-3xl px-0 max-[1000px]:px-[15px]";

    const card =
        "rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.10)] backdrop-blur-xl md:p-8";

    return (
        <div
            className={`${shell} ${className}`.trim()}
            data-aos={isEmbedded ? undefined : "fade-up"}
        >
            <div className={card}>
                {!isEmbedded && (
                    <div className="mb-6 border-b border-slate-100 pb-6">
                        <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                            Gửi yêu cầu tư vấn
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Điền thông tin — chúng tôi phản hồi trong vòng 24 giờ.
                        </p>
                    </div>
                )}

                <form ref={form} className="space-y-4" onSubmit={sendEmail}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="form-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="form-name"
                                type="text"
                                name="name"
                                placeholder="Nguyễn Văn A"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label htmlFor="form-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="form-phone"
                                type="tel"
                                name="phone"
                                placeholder="09xx xxx xxx"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="form-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="form-email"
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="form-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Chủ đề
                        </label>
                        <input
                            id="form-subject"
                            type="text"
                            name="subject"
                            placeholder="Ví dụ: Báo giá thang tải khách"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="form-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Nội dung <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="form-message"
                            name="message"
                            rows={5}
                            placeholder="Mô tả nhu cầu, số tầng, loại thang…"
                            required
                            className={`${inputClass} min-h-[120px] resize-y`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f904b] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(47,144,75,0.35)] transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/40 sm:w-auto sm:min-w-[200px]"
                    >
                        <IoIosSend className="size-5" aria-hidden />
                        Gửi yêu cầu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;

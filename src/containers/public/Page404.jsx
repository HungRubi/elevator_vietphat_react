import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import path from '../../util/path';
import icons from '../../util/icons';

const { FiSearch, FaHome } = icons;

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Không tìm thấy trang - Thang máy Việt Phát</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="relative min-h-[70vh] overflow-hidden bg-[var(--color-bg)]">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,144,75,0.18),transparent),radial-gradient(circle_at_90%_60%,rgba(14,165,233,0.08),transparent)]"
                />
                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:py-24">
                    <div className="relative mb-8">
                        <span className="absolute -inset-6 rounded-full bg-[var(--color-primary)]/10 blur-2xl" />
                        <img
                            src="/gif/404.gif"
                            alt=""
                            className="relative mx-auto h-48 w-auto max-w-full object-contain sm:h-56"
                        />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-primary)]">
                        Lỗi 404
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Trang này không tồn tại
                    </h1>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                        Có thể đường dẫn đã đổi hoặc bạn chưa đăng nhập để xem nội dung được bảo vệ.
                    </p>
                    <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                        >
                            <FiSearch className="size-4 rotate-90" aria-hidden />
                            Quay lại
                        </button>
                        <NavLink
                            to="/"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(47,144,75,0.35)] transition hover:bg-emerald-600"
                        >
                            <FaHome className="size-4" aria-hidden />
                            Về trang chủ
                        </NavLink>
                    </div>
                    <p className="mt-8 text-sm text-slate-500">
                        Đã có tài khoản?{' '}
                        <NavLink
                            to={path.LOGIN}
                            className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
                        >
                            Đăng nhập
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Page404;

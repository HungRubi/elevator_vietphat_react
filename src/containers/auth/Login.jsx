import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../util/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useId, useMemo, useState } from "react";
import { loginUser } from "../../store/slices/authSlice";
import { clearAuthErrors } from "../../store/slices/uiSlice";
import { Helmet } from "react-helmet";
import path from "../../util/path";

const { FcGoogle, FaFacebook } = icons;

const Login = () => {
  const dispatch = useDispatch();
  const { message, loginError } = useSelector((state) => state.ui);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const navigate = useNavigate();

  const accountErrorId = useId();
  const passwordErrorId = useId();

  const [formData, setFormData] = useState({ account: "", password: "" });

  const isSubmitting = loginStatus === "loading";

  const canSubmit = useMemo(() => {
    return formData.account.trim() && formData.password && !isSubmitting;
  }, [formData.account, formData.password, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.account.trim() || !formData.password) return;
    dispatch(loginUser({ credentials: formData, isAdmin: false }));
  };

  useEffect(() => {
    dispatch(clearAuthErrors());
  }, [dispatch]);

  useEffect(() => {
    if (message === "Login successful") {
      navigate("/");
    }
  }, [message, navigate]);

  return (
    <>
      <Helmet>
        <title>Đăng nhập - Thang máy Việt Phát</title>
        <meta
          name="description"
          content="Đăng nhập để quản lý thông tin cá nhân, theo dõi đơn hàng, và nhận ưu đãi từ Thang máy Việt Phát."
        />
        <meta
          name="keywords"
          content="đăng nhập, tài khoản, quản lý đơn hàng, thang máy Việt Phát, khách hàng thang máy"
        />
        <link rel="canonical" href="https://vmu.com.vn/login" />
      </Helmet>

      <div className="relative min-h-[100svh] overflow-hidden bg-[#f6f8f7]">
        {/* premium mesh background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-emerald-400/25 blur-3xl" />
          <div className="absolute -right-28 -top-16 h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-[520px] w-[520px] rounded-full bg-lime-300/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.05)_1px,transparent_0)] [background-size:22px_22px] opacity-60" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[520px] flex-col justify-center px-4 py-8 sm:py-10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="inline-flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25">
              <img src="/img/logo.png" alt="Thang máy Việt Phát" className="h-10 w-auto sm:h-12" />
            </NavLink>
            <NavLink
              to={path.CONTACT}
              className="rounded-md px-2 py-1 text-xs font-medium text-[#2f904b] hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25 sm:text-sm"
            >
              Cần hỗ trợ?
            </NavLink>
          </div>

          <div className="mt-4 rounded-2xl border border-white/60 bg-white/55 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.12)] backdrop-blur-xl sm:p-6 md:p-8">
            <div>
              <div className="text-xl font-semibold text-slate-900 sm:text-2xl">Đăng nhập</div>
              <div className="mt-1 text-sm text-slate-600">Nhập thông tin để tiếp tục.</div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="account" className="block text-sm font-medium text-slate-700">
                    Tài khoản
                  </label>
                  <input
                    id="account"
                    name="account"
                    type="text"
                    autoComplete="username"
                    value={formData.account}
                    onChange={handleChange}
                    placeholder="Nhập tài khoản của bạn"
                    aria-invalid={Boolean(loginError)}
                    aria-describedby={loginError ? accountErrorId : undefined}
                    className="mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    aria-invalid={Boolean(loginError)}
                    aria-describedby={loginError ? passwordErrorId : undefined}
                    className="mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20"
                  />
                </div>

                {loginError ? (
                  <div className="rounded-xl border border-red-200/80 bg-red-50/70 px-3 py-2 text-sm text-red-700">
                    <p id={accountErrorId}>Tài khoản hoặc mật khẩu không chính xác.</p>
                    <p id={passwordErrorId} className="sr-only">
                      Lỗi đăng nhập.
                    </p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#2f904b] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,144,75,0.35)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/30"
                >
                  {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <NavLink to={path.CONTACT} className="text-slate-600 hover:text-slate-900">
                    Quên mật khẩu?
                  </NavLink>
                  <NavLink to={path.REGISTER} className="font-medium text-[#2f904b] hover:text-emerald-700">
                    Tạo tài khoản
                  </NavLink>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200/70" />
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-400">hoặc</div>
                  <div className="h-px flex-1 bg-slate-200/70" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    <FaFacebook className="text-xl text-blue-600" />
                    Facebook
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    <FcGoogle className="text-xl" />
                    Google
                  </button>
                </div>
            </form>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Bằng việc đăng nhập, bạn đồng ý với các điều khoản sử dụng của Thang máy Việt Phát.
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;


import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../util/icons";
import { useEffect, useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Helmet } from "react-helmet";
import path from "../../util/path";

const { FcGoogle, FaFacebook } = icons;

const Register = () => {
  const [errors, setErrors] = useState({});
  const { message, registerError } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formErrorId = useId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    frist: "",
    last: "",
    email: "",
    city: "",
    street: "",
    day: "",
    month: "",
    year: "",
    account: "",
    password: "",
    confirm: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = {};
    const { frist, last, email, phone, city, street, account, password, confirm } = formData;

    if (!frist.trim()) newErrors.frist = "Vui lòng nhập Họ.";
    if (!last.trim()) newErrors.last = "Vui lòng nhập Tên.";

    if (!email.trim()) newErrors.email = "Vui lòng nhập Email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email không hợp lệ.";

    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{9,11}$/.test(phone)) newErrors.phone = "Số điện thoại phải từ 9 đến 11 chữ số.";

    if (!city.trim()) newErrors.city = "Vui lòng nhập Tỉnh/Thành phố.";
    if (!street.trim()) newErrors.street = "Vui lòng nhập Đường.";
    if (!account.trim()) newErrors.account = "Vui lòng nhập tên tài khoản.";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    if (password && password.length < 6) newErrors.password = "Mật khẩu tối thiểu 6 ký tự.";
    if (password !== confirm) newErrors.confirm = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    dispatch(actions.register(formData));
  };

  const canSubmit = useMemo(() => {
    return !isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    if (!isSubmitting) return;
    if (registerError) setIsSubmitting(false);
    if (message && !registerError) {
      setIsSubmitting(false);
      navigate(path.LOGIN);
    }
  }, [isSubmitting, message, registerError, navigate]);

  const fieldClass =
    "mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-3 text-slate-900 outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20";

  const errorText = (text) => (text ? <div className="mt-1 text-xs text-red-600">{text}</div> : null);

  return (
    <>
      <Helmet>
        <title>Đăng ký - Thang máy Việt Phát</title>
        <meta
          name="description"
          content="Tạo tài khoản tại Thang máy Việt Phát để theo dõi đơn hàng, nhận ưu đãi và cập nhật tin tức mới nhất."
        />
        <meta
          name="keywords"
          content="đăng ký, tạo tài khoản, khách hàng mới, thang máy Việt Phát, ưu đãi thang máy"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://vmu.com.vn/register" />
      </Helmet>

      <div className="relative min-h-[100svh] overflow-hidden bg-[#f6f8f7]">
        {/* premium mesh background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-emerald-400/25 blur-3xl" />
          <div className="absolute -right-28 -top-16 h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-[520px] w-[520px] rounded-full bg-lime-300/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.05)_1px,transparent_0)] [background-size:22px_22px] opacity-60" />
        </div>

        <div className="relative mx-auto w-full max-w-[900px] px-4 py-8 sm:py-10 md:py-12">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="inline-flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25">
              <img src="/img/logo.png" alt="Thang máy Việt Phát" className="h-10 w-auto sm:h-12" />
            </NavLink>
            <NavLink
              to={path.LOGIN}
              className="rounded-md px-2 py-1 text-xs font-medium text-[#2f904b] hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25 sm:text-sm"
            >
              Đã có tài khoản?
            </NavLink>
          </div>

          <div className="mt-4 rounded-2xl border border-white/60 bg-white/55 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.12)] backdrop-blur-xl sm:p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              aria-describedby={registerError ? formErrorId : undefined}
            >
              <div>
                <div className="text-xl font-semibold text-slate-900 sm:text-2xl">Đăng ký</div>
                <div className="mt-1 text-sm text-slate-600">Tạo tài khoản để tiếp tục.</div>
              </div>

              {registerError ? (
                <div
                  id={formErrorId}
                  className="mt-5 rounded-xl border border-red-200/80 bg-red-50/70 px-3 py-2 text-sm text-red-700"
                >
                  {typeof registerError === "string" ? registerError : "Đăng ký không thành công. Vui lòng thử lại."}
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="frist" className="block text-sm font-medium text-slate-700">
                    Họ
                  </label>
                  <input
                    id="frist"
                    name="frist"
                    type="text"
                    value={formData.frist}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.frist)}
                  />
                  {errorText(errors.frist)}
                </div>
                <div>
                  <label htmlFor="last" className="block text-sm font-medium text-slate-700">
                    Tên
                  </label>
                  <input
                    id="last"
                    name="last"
                    type="text"
                    value={formData.last}
                    onChange={handleChange}
                    placeholder="Ví dụ: An"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.last)}
                  />
                  {errorText(errors.last)}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ten@email.com"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                  />
                  {errorText(errors.email)}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0xxxxxxxxx"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.phone)}
                    autoComplete="tel"
                  />
                  {errorText(errors.phone)}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                    Tỉnh/Thành phố
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ví dụ: TP. Hồ Chí Minh"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errorText(errors.city)}
                </div>
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-slate-700">
                    Địa chỉ
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Số nhà, đường..."
                    className={fieldClass}
                    aria-invalid={Boolean(errors.street)}
                    autoComplete="street-address"
                  />
                  {errorText(errors.street)}
                </div>

                <div className="sm:col-span-2">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label htmlFor="day" className="block text-sm font-medium text-slate-700">
                        Ngày
                      </label>
                      <input
                        id="day"
                        name="day"
                        type="number"
                        value={formData.day}
                        onChange={handleChange}
                        placeholder="DD"
                        className={fieldClass}
                        min={1}
                        max={31}
                      />
                    </div>
                    <div>
                      <label htmlFor="month" className="block text-sm font-medium text-slate-700">
                        Tháng
                      </label>
                      <input
                        id="month"
                        name="month"
                        type="number"
                        value={formData.month}
                        onChange={handleChange}
                        placeholder="MM"
                        className={fieldClass}
                        min={1}
                        max={12}
                      />
                    </div>
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-slate-700">
                        Năm
                      </label>
                      <input
                        id="year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="YYYY"
                        className={fieldClass}
                        min={1900}
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="account" className="block text-sm font-medium text-slate-700">
                    Tài khoản
                  </label>
                  <input
                    id="account"
                    name="account"
                    type="text"
                    value={formData.account}
                    onChange={handleChange}
                    placeholder="Tên đăng nhập"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.account)}
                    autoComplete="username"
                  />
                  {errorText(errors.account)}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tối thiểu 6 ký tự"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.password)}
                    autoComplete="new-password"
                  />
                  {errorText(errors.password)}
                </div>
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    value={formData.confirm}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.confirm)}
                    autoComplete="new-password"
                  />
                  {errorText(errors.confirm)}
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#2f904b] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,144,75,0.35)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/30"
              >
                {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </button>

              <div className="mt-4 flex items-center justify-between text-sm">
                <NavLink to={path.LOGIN} className="text-slate-600 hover:text-slate-900">
                  Đã có tài khoản? Đăng nhập
                </NavLink>
                <NavLink to={path.CONTACT} className="font-medium text-[#2f904b] hover:text-emerald-700">
                  Cần hỗ trợ
                </NavLink>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200/70" />
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">hoặc</div>
                <div className="h-px flex-1 bg-slate-200/70" />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng của Thang máy Việt Phát.
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;


import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { useState } from "react";
import { changePasswordUser } from "../../store/slices/authSlice";
import { Helmet } from "react-helmet";
import icons from "../../util/icons";

const { IoShieldCheckmarkOutline } = icons;

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20";

const Password = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const changePasswordStatus = useSelector((state) => state.auth.changePasswordStatus);
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [checkErr, setCheckErr] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (checkErr) setCheckErr("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.password || !formData.newPassword || !formData.confirmPassword) {
            setCheckErr("Vui lòng nhập đủ thông tin.");
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setCheckErr("Mật khẩu mới và xác nhận không khớp.");
            return;
        }
        setCheckErr("");
        dispatch(changePasswordUser({ userId: currentUser?._id, body: formData }));
    };

    return (
        <>
            <Helmet>
                <title>Đổi mật khẩu - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Đổi mật khẩu</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Nên đổi định kỳ và không dùng lại mật khẩu trên các dịch vụ khác.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="mx-auto max-w-lg">
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                        <IoShieldCheckmarkOutline className="mt-0.5 size-6 shrink-0 text-[#2f904b]" aria-hidden />
                        <p className="text-xs leading-relaxed text-slate-700">
                            Mật khẩu mạnh gồm chữ hoa, chữ thường, số và ký tự đặc biệt. Không chia sẻ mật khẩu với người khác.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className={inputClass}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                autoComplete="new-password"
                                placeholder="Mật khẩu mới"
                                className={inputClass}
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Nhập lại mật khẩu mới
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                placeholder="Xác nhận mật khẩu"
                                className={inputClass}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {checkErr ? <p className="mt-3 text-sm font-semibold text-rose-600">{checkErr}</p> : null}

                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={changePasswordStatus === "loading"}
                            aria-busy={changePasswordStatus === "loading"}
                            className="!rounded-xl !px-10 !py-3 !normal-case"
                        >
                            Cập nhật mật khẩu
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Password;

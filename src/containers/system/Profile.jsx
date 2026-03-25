import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";
import { Helmet } from "react-helmet";

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2f904b] focus:ring-2 focus:ring-[#2f904b]/20 disabled:bg-slate-50 disabled:text-slate-500";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const fileInputRef = useRef();
    const [formData, setFormData] = useState({
        account: currentUser?.account,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        birth: currentUser?.format,
        avatar: currentUser?.avatar,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.warn("Dung lượng ảnh vượt quá 2MB!");
            return;
        }
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            toast.warn("Chỉ hỗ trợ ảnh JPEG hoặc PNG!");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { ...formData };
        if (dataToSend.avatar === currentUser?.avatar) {
            delete dataToSend.avatar;
        }
        dispatch(actions.updateProfileUser(dataToSend, currentUser?._id));
    };

    const previewSrc = formData?.avatar?.startsWith("/uploads")
        ? `${import.meta.env.VITE_SERVER_URL}${formData.avatar}`
        : formData.avatar;

    return (
        <>
            <Helmet>
                <title>Hồ sơ - Tài khoản | Thang máy Việt Phát</title>
            </Helmet>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-5 md:px-8">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Hồ sơ của tôi</h1>
                <p className="mt-1 text-sm text-slate-600">Cập nhật thông tin để nhận hỗ trợ và đơn hàng chính xác hơn.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid gap-10 lg:grid-cols-[1fr,260px] lg:items-start">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                name="account"
                                disabled
                                value={formData.account || ""}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nhập họ tên"
                                value={formData.name || ""}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="09xx xxx xxx"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Ngày sinh</label>
                            <input type="date" name="birth" value={formData.birth || ""} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="pt-2">
                            <Button type="submit" className="!rounded-xl !px-8 !py-3 !normal-case">
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-center">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Ảnh đại diện</p>
                        <div className="relative mx-auto mt-4 size-36 overflow-hidden rounded-2xl border-2 border-white shadow-lg ring-2 ring-emerald-100">
                            <img src={previewSrc || "/img/default.png"} alt="" className="size-full object-cover" />
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="avatar"
                            hidden
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                        />
                        <Button
                            type="button"
                            className="mt-4 !w-full !rounded-xl !normal-case"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Chọn ảnh
                        </Button>
                        <p className="mt-3 text-xs leading-relaxed text-slate-500">
                            Tối đa 2MB · JPEG hoặc PNG
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;

import { NavLink, useNavigate } from "react-router-dom"
import {Footer} from "../../components/index"
import icons from '../../util/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";


const {FcGoogle, FaFacebook} = icons;

const Register = () => {
    const [errors, setErrors] = useState({});
    const {messageRegister, registerError} = useSelector(state => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        frist: '',
        last: '',
        email: '',
        city: '',
        street: '',
        day: '',
        month: '',
        year: '',
        account: '',
        password: '',
        confirm: '',
        phone: '',
    })
    const validateForm = () => {
    const newErrors = {};
    const { frist, last, email, phone, city, street, account, password, confirm } = formData;

    if (!frist.trim()) newErrors.frist = "Vui lòng nhập Họ.";
    if (!last.trim()) newErrors.last = "Vui lòng nhập Tên.";

    if (!email.trim()) {
        newErrors.email = "Vui lòng nhập Email.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Email không hợp lệ.";
    }

    if (!phone.trim()) {
        newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^[0-9]{9,11}$/.test(phone)) {
        newErrors.phone = "Số điện thoại phải từ 9 đến 11 chữ số.";
    }

    if (!city.trim()) newErrors.city = "Vui lòng nhập Tỉnh/Thành phố.";
    if (!street.trim()) newErrors.street = "Vui lòng nhập Đường.";
    if (!account.trim()) newErrors.account = "Vui lòng nhập tên tài khoản.";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    if (password !== confirm) newErrors.confirm = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        dispatch(actions.register(formData));
        navigate("/login");
    }
    };
    useEffect(() => {
        if(messageRegister){
            toast.success(messageRegister);
        }
    }, [messageRegister, navigate])
    return (
        <>
            <Helmet>
                <title>Đăng ký - Thang máy Việt Phát</title>
                <meta name="description" content="Tạo tài khoản tại Thang máy Việt Phát để theo dõi đơn hàng, nhận ưu đãi và cập nhật tin tức mới nhất." />
                <meta name="keywords" content="đăng ký, tạo tài khoản, khách hàng mới, thang máy Việt Phát, ưu đãi thang máy" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href="https://vmu.com.vn/register" />
            </Helmet>

            <div className="fixed w-full bg-[#f3f3f3] max-[1892px]:bg-white top-0 z-[49] h-screen overflow-y-auto max-[1892px]:relative ">
                <div className="w-full h-1/7 flex items-center justify-between px-[10%] max-[1892px]:hidden">
                    <div className="flex items-center gap-5">
                        <img src="/img/logo.png" alt="" className="h-[110px] w-auto mb-4"/>
                        <h1 className="text-[35px] font-[500] cursor-default text-[#2f904b]">Đăng nhập</h1>
                    </div>
                    <NavLink
                    className="text-[18px] text-[#2f904b]">
                        Bạn cần giúp đỡ?
                    </NavLink>
                </div>
                <div className="w-full relative mb-8">
                    <img src="/img/slider/background_login.png" alt="" 
                    className="max-[1892px]:hidden"/>
                    <form onSubmit={handleSubmit}
                    className="w-[700px] !bg-white rounded-[4px] login_form absolute 
                    max-[1892px]:w-full max-[1892px]:h-full max-[1892px]:!left-0">
                        <div className="px-[30px] py-[1.375rem] w-full">
                            <div className="text-[1.8rem] text-center capitalize text-[#2f904b]">
                                đăng ký
                            </div>
                        </div>
                        <div className="px-[30px] pb-[30px] max-[1892px]:!pb-0">
                            <div className="mt-5 flex gap-5">
                                <input 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Frist Name" 
                                    name="frist" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                                />
                                {errors.frist && <span className="text-red-500 text-sm">{errors.frist}</span>}
                                <input 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Last Name" 
                                    name="last" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                                />
                                {errors.last && <span className="text-red-500 text-sm">{errors.last}</span>}
                            </div>
                            <div className="mt-5 flex gap-5">
                                <input 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Email" 
                                    name="email" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                                />
                                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                                <input 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Phone" 
                                    name="phone" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                                />
                                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                            </div>
                            <div className="mt-5 flex gap-5">
                                <input 
                                    onChange={handleChange} 
                                    type="text" placeholder="City" 
                                    name="city" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                                <input 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Street" 
                                    name="street" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                    {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
                            </div>
                            <div className="mt-5 flex gap-5 items-center">
                                <input 
                                    onChange={handleChange} 
                                    type="number" 
                                    placeholder="Day" 
                                    name="day"
                                    value={formData.day || ''}
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
                                <span className="text-4xl text-gray-500">/</span>
                                <input 
                                    onChange={handleChange} 
                                    type="number" 
                                    placeholder="Month" 
                                    name="month" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
                                <span className="text-4xl text-gray-500">/</span>
                                <input 
                                    onChange={handleChange} 
                                    type="number" 
                                    placeholder="Year" 
                                    name="year" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
                            </div>
                            <div className="mt-5">
                                <input 
                                    onChange={handleChange} 
                                    autoComplete="username"
                                    type="text" 
                                    placeholder="Account" 
                                    name="account" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" 
                                />
                                {errors.account && <span className="text-red-500 text-sm">{errors.account}</span>}
                            </div>
                            <div className="mt-5 flex gap-5">
                                <input 
                                    onChange={handleChange} 
                                    autoComplete="new-password"
                                    type="password" 
                                    placeholder="Password" 
                                    name="password"  
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                <input 
                                    onChange={handleChange} 
                                    autoComplete="new-password"
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    name="confirm" 
                                    className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                                />
                                {errors.confirm && <span className="text-red-500 text-sm">{errors.confirm}</span>}
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-red-500">
                                    {registerError ? registerError : ""}
                                </span>
                            </div>
                            <div className={`${registerError ? "mt-4" : "mt-8"}`}>
                                <button type="submit"
                                className="flex-1 outline-none px-[0.75rem] cursor-pointer py-[0.95rem] leading-1 uppercase border-none bg-[#2f904b] rounded-[2px] h-[2.5rem] w-full text-white opacity-70" >
                                    ĐĂNG KÝ
                                </button>
                            </div>
                            <div className="w-full flex items-center mt-8">
                                <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                                <div className="text-[#ccc] px-4 text-[0.75rem] uppercase">hoặc</div>
                                <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                            </div>
                            <div className="flex items-center gap-5 mt-8">
                                <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                    <FaFacebook className="text-[25px] text-blue-600"/>
                                    Facebook
                                </button>
                                <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                    <FcGoogle className="text-[25px]"/>
                                    Google
                                </button>
                            </div>
                            <div className="text-center text-[0.875rem] text-[rgba(0,0,0,.26)] mt-8">
                                Bạn đã có tài khoản?
                                <NavLink
                                to={"/login"} 
                                className="text-[#2f904b] ml-1 text-[1rem] cursor-pointer">
                                    Đăng nhập
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="z-100 max-[1892px]:hidden">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
export default Register
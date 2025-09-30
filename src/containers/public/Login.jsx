import { NavLink, useNavigate } from "react-router-dom"
import {Footer} from "../../components/index"
import icons from '../../util/icons';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as actions from '../../store/actions'
import { Helmet } from "react-helmet";

const {FcGoogle, FaFacebook} = icons;

const Login = () => {
    const dispatch = useDispatch();
    const { message, loginError } = useSelector(state => state.app);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        account: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.login(formData));
    }
    useEffect(() => {
        if(message === "Login successful") {
            navigate("/");
        }
    }, [message, navigate])
    return (
        <>
            <Helmet>
                <title>Đăng nhập - Thang máy Việt Phát</title>
                <meta name="description" content="Đăng nhập để quản lý thông tin cá nhân, theo dõi đơn hàng, và nhận ưu đãi từ Thang máy Việt Phát." />
                <meta name="keywords" content="đăng nhập, tài khoản, quản lý đơn hàng, thang máy Việt Phát, khách hàng thang máy" />
                <link rel="canonical" href="https://vmu.com.vnlogin" />
            </Helmet>

            <div className="fixed w-full bg-[#f3f3f3] top-0 z-[9999] max-[800px]:relative">
                <div className="w-full h-1/7 flex items-center justify-between px-[10%] max-[1000px]:px-[15px] max-[800px]:hidden">
                    <div className="flex items-center gap-5">
                        <NavLink to={"/"}>
                            <img src="/img/logo.png" alt="" className="h-[110px] w-auto mb-4"/>
                        </NavLink>
                        <h1 className="text-[35px] font-[500] cursor-default text-[#2f904b]">Đăng nhập</h1>
                    </div>
                    <NavLink
                    className="text-[18px] text-[#2f904b]">
                        Bạn cần giúp đỡ?
                    </NavLink>
                </div>
                <div className="w-full relative mb-8 max-[800px]:h-[500px] max-[800px]:mt-8">
                    <img src="/img/slider/background_login.png" alt="background_login" 
                    className="max-[1266px]:h-[500px] max-[1266px]:object-cover max-[800px]:hidden "/>
                    <form onSubmit={handleSubmit}
                    className="w-[500px] bg-white rounded-[4px] login_form absolute max-[800px]:h-full max-[800px]:w-full max-[800px]:!left-0">
                        <div className="px-[30px] py-[1.375rem] w-full ">
                            <div className="text-[1.8rem] text-center capitalize text-[#2f904b]">
                                đăng nhập
                            </div>
                        </div>
                        <div className="px-[30px] pb-[30px]">
                            <div className="mt-5">
                                <input type="text" placeholder="Nhập tài khoản của bạn" name="account" onChange={handleChange}
                                className="flex-1 outline-none px-[0.75rem] py-[0.75rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" />
                            </div>
                            <div className="mt-8">
                                <input type="password" placeholder="Mật khẩu" name="password" onChange={handleChange}
                                className="flex-1 outline-none px-[0.75rem] py-[0.75rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" />
                            </div>
                            <div className="mt-4">
                                <p className="text-red-600 text-sm">
                                    {loginError ? "Tài khoản mật khẩu không chính xác" : ""}
                                </p>
                            </div>
                            <div className={`${loginError ? "mt-4" : "mt-8"}`}>
                                <button type="submit"
                                className="flex-1 outline-none px-[0.75rem] py-[0.75rem] leading-1 uppercase border-none bg-[#2f904b] rounded-[2px] h-[2.5rem] w-full text-white opacity-70" >
                                    đăng nhập
                                </button>
                            </div>
                            <div className="w-full mt-2">
                                <NavLink className="text-blue-600 text-[12px]">
                                    Quên mật khẩu
                                </NavLink>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                                <div className="text-[#ccc] px-4 text-[0.75rem] uppercase">hoặc</div>
                                <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                            </div>
                            <div className="flex items-center gap-5 mt-5">
                                <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                    <FaFacebook className="text-[25px] text-blue-600"/>
                                    Facebook
                                </button>
                                <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                    <FcGoogle className="text-[25px]"/>
                                    Google
                                </button>
                            </div>
                            <div className="text-center text-[0.875rem] text-[rgba(0,0,0,.26)] mt-[30px]">
                                Bạn chưa có tài khoản?
                                <NavLink
                                to={"/register"} 
                                className="text-[#2f904b] ml-1 text-[1rem] cursor-pointer">
                                    Đăng ký
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="max-[800px]:hidden">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
export default Login
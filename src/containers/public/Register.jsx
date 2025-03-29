import { NavLink, useNavigate } from "react-router-dom"
import {Footer} from "../../components/index"
import icons from '../../util/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'
import { toast } from "react-toastify";

const {FcGoogle, FaFacebook} = icons;


const Register = () => {
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
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.register(formData));
    }
    useEffect(() => {
        if(messageRegister){
            toast.success(messageRegister);
            navigate("/login");
        }
    }, [messageRegister, navigate])
    return (
        <div className="fixed w-full bg-[#f3f3f3] top-0 z-[9999] h-screen overflow-y-auto">
            <div className="w-full h-1/7 flex items-center justify-between px-[10%]">
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
                <img src="/img/slider/background_login.png" alt="" className=""/>
                <form onSubmit={handleSubmit}
                className="w-[700px] bg-white rounded-[4px] login_form absolute">
                    <div className="px-[30px] py-[1.375rem] w-full">
                        <div className="text-[1.8rem] text-center capitalize text-[#2f904b]">
                            đăng ký
                        </div>
                    </div>
                    <div className="px-[30px] pb-[30px]">
                        <div className="mt-5 flex gap-5">
                            <input 
                                onChange={handleChange} 
                                type="text" 
                                placeholder="Frist Name" 
                                name="frist" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                            />

                            <input 
                                onChange={handleChange} 
                                type="text" 
                                placeholder="Last Name" 
                                name="last" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                            />
                        </div>
                        <div className="mt-5 flex gap-5">
                            <input 
                                onChange={handleChange} 
                                type="text" 
                                placeholder="Email" 
                                name="email" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                            />
                            <input 
                                onChange={handleChange} 
                                type="text" 
                                placeholder="Phone" 
                                name="phone" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2"
                            />
                        </div>
                        <div className="mt-5 flex gap-5">
                            <input 
                                onChange={handleChange} 
                                type="text" placeholder="City" 
                                name="city" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
                            <input 
                                onChange={handleChange} 
                                type="text" 
                                placeholder="Street" 
                                name="street" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
                        </div>
                        <div className="mt-5 flex gap-5 items-center">
                            <input 
                                onChange={handleChange} 
                                type="number" 
                                placeholder="Day" 
                                name="day" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
                            <span className="text-4xl text-gray-500">/</span>
                            <input 
                                onChange={handleChange} 
                                type="number" 
                                placeholder="Month" 
                                name="month" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
                            <span className="text-4xl text-gray-500">/</span>
                            <input 
                                onChange={handleChange} 
                                type="number" 
                                placeholder="Year" 
                                name="year" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
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
                            <input 
                                onChange={handleChange} 
                                autoComplete="new-password"
                                type="password" 
                                placeholder="Confirm Password" 
                                name="confirm" 
                                className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-1/2" 
                            />
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
            <div className="pt-15">
                <Footer/>
            </div>
        </div>
    )
}
export default Register
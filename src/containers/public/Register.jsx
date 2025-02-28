import { NavLink } from "react-router-dom"
import {Footer} from "../../components/index"
import icons from '../../util/icons';

const {FcGoogle, FaFacebook} = icons;


const Register = () => {
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
                <form className="w-[500px] bg-white rounded-[4px] login_form absolute">
                    <div className="px-[30px] py-[1.375rem] w-full">
                        <div className="text-[1.8rem] text-center capitalize text-[#2f904b]">
                            đăng nhập
                        </div>
                    </div>
                    <div className="px-[30px] pb-[30px]">
                        <div className="mt-5">
                            <input type="text" placeholder="Nhập email của bạn" name="email" 
                            className="flex-1 outline-none px-[0.75rem] py-[0.95rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" />
                        </div>
                        <div className="mt-8">
                            <input type="submit" name="submit" value="đăng nhập" disabled
                            className="flex-1 outline-none px-[0.75rem] py-[0.95rem] leading-1 cursor-progress uppercase border-none bg-[#2f904b] rounded-[2px] h-[2.5rem] w-full text-white opacity-70" />
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
            <Footer/>
        </div>
    )
}
export default Register
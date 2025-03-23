import { NavLink } from "react-router-dom"
import icons from '../util/icons'
const {FaMapMarkerAlt, FaPhoneAlt, MdEmail, BsFacebook, FaYoutube} = icons
const Footer = () => {
    return (
        <div className="w-full" data-aos="fade-up">
            <div className="w-full">
                <div className="h-[400px] bg-cover bg-center bg-fixed flex justify-center" 
                    style={{ backgroundImage: "url('/img/partner/partner.jpg')" }}>
                    <div className="w-[80%] flex flex-col text-white text-3xl font-bold bg-opacity-50 items-center justify-center gap-10">
                        <h2 className=" uppercase text-3xl">đối tác và khách hàng</h2>
                        <div className="w-full flex items-center justify-between">
                            <img src="/img/partner/1.png" alt=""/>
                            <img src="/img/partner/2.png" alt=""/>
                            <img src="/img/partner/3.png" alt=""/>
                            <img src="/img/partner/4.png" alt=""/>
                            <img src="/img/partner/5.png" alt=""/>
                            <img src="/img/partner/6.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#051230]">
                
                <p className="siez-[16px] line-clamp-2 text-[rgba(255,255,255,0.7607843137)] mt-[30px]">
                    Để biết thêm thông tin về sản phẩm hoặc bảng giá, 
                    vui lòng để lại email cho chúng tôi và chúng tôi
                    sẽ liên hệ trong vòng 24 giờ.
                </p>
                <button className="rounded-[8px] py-[5px] px-[20px] font-[550] uppercase text-[#ffffffcb] cursor-pointer btn_contact mt-5">
                    <NavLink to={"/contact"}>
                        contact now
                    </NavLink>
                </button>
                <div className="w-[80%] flex justify-center mt-5 pt-5 border-t border-t-[#2f904b]">
                    <div className="w-1/3 text-left">
                        <address className="flex">
                            <FaMapMarkerAlt className="text-[#ffffffcb] size-5"/>
                            <NavLink 
                            className="line-clamp-2 ml-2.5 text-[#ffffffcb] text-[14px]"
                            title="địa chỉ"
                            to={'https://www.google.com/maps/dir/20.87506,106.6173419/20.87815,106.61313/@20.8759506,106.6100315,16z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D'}>
                                Address: Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam
                            </NavLink>
                        </address>
                    </div>
                    <div className="w-1/3">
                        <address className="flex justify-center">
                            <FaPhoneAlt className="text-[#ffffffcb] size-5"/>
                            <NavLink 
                            className="line-clamp-2 ml-2.5 text-[#ffffffcb] text-[14px]"
                            title="Số điện thoại"
                            to={'tel:0924113113'}>
                                Phone: 0924113113
                            </NavLink>
                        </address>
                    </div>
                    <div className="w-1/3 text-right">
                        <address className="flex justify-end">
                            <MdEmail className="text-[#ffffffcb] size-5"/>
                            <NavLink
                            className="line-clamp-2 ml-2.5 text-[#ffffffcb] text-[14px]"
                            title="email">
                                Email: infor@phukienthangmay.vn
                            </NavLink>
                        </address>
                    </div>
                </div>
                <div className="w-[80%] flex justify-center items-center gap-5 mb-5">
                    <NavLink className="size-8 bg-white rounded-full overflow-hidden"
                    to={'https://www.facebook.com/VietPhatelevator'}>
                        <BsFacebook className="text-[#2564ee] size-8"/>
                    </NavLink>
                    <NavLink className="size-8 rounded-full bg-white overflow-hidden flex items-center justify-center"
                    to={'https://www.youtube.com/@thangmayhybrid5438'}>
                        <FaYoutube className="text-[#ec0d0d] size-6 mr-[2px]"/>
                    </NavLink>
                    <NavLink className="size-8 rounded-full overflow-hidden">
                        <img src="/img/footer/instagram.jpg" alt="" className="h-[32px]"/>
                    </NavLink>
                    <NavLink className="size-8 rounded-full">
                        <img src="/img/footer/twitter.png" alt="" className="h-[32px] object-contain"/>
                    </NavLink>
                </div>
                <div className="bg-[#2f904b] w-full text-center py-1 text-[18px] text-[#ffffffde]">
                    Design By ©HUYHUNG - 2024
                </div>
            </div>

        </div>
        
    )
}

export default Footer
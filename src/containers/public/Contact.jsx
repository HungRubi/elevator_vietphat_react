import { Helmet } from "react-helmet"
import {Form} from "../../components/index"
import icons from "../../util/icons"
import { NavLink } from "react-router-dom"
const {FaMapMarkerAlt, MdEmail, FaPhoneAlt} = icons

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Liên hệ - Thang máy Việt Phát</title>
                <meta name="description" content="Liên hệ Thang máy Việt Phát để được tư vấn, báo giá và hỗ trợ lắp đặt thang máy. Chúng tôi luôn sẵn sàng phục vụ quý khách." />
                <meta name="keywords" content="liên hệ thang máy, tư vấn thang máy, báo giá thang máy, hỗ trợ kỹ thuật thang máy, thang máy Việt Phát" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/contact" />
            </Helmet>

            <div className="mt-[75px] w-full mb-15">
                <div className="w-[80%] px-[10%]" data-aos="fade-up">
                    <h1
                    style={{fontFamily: "Poppins, sans-serif"}} 
                    className="text-[24px] text-[#2f904b] font-[600] line-clamp-1">
                        Công ty TNHH Thang máy Việt Phát
                    </h1>
                    <h2
                    style={{fontFamily: "Poppins, sans-serif"}} 
                    className="line-clamp-1 text-[18px] font-[600] text-[#0a0a0a]">
                        Chúng tôi rất mong chờ câu hỏi của bạn!
                    </h2>
                </div>
                <Form className="!w-full"/>
                <div className="w-full px-[10%] mt-2.5" data-aos="fade-up">
                    <p className="text-center line-clamp-3 py-[4px] leading-8">
                        Chúng tôi sẽ phấn đấu phát triển bằng uy tín, tồn tại bằng chất lượng,hướng 
                        tới sự hài lòng của khách hàng và lấy sự tự giác làm kim chỉ nam để cung cấp 
                        cho khách hàng những dịch vụ toàn diện và chất lượng cao hơn.
                    </p>
                    <div className="mt-5 text-left">
                        <div className="flex gap-2.5 justify-start items-center mt-3.5">
                            <FaMapMarkerAlt className="text-[25px] text-[#2f904b]"/>
                            <NavLink
                            to={""}
                            className="line-clamp-1">
                                Address: Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam
                            </NavLink>
                        </div>
                        <div className="flex gap-2.5 justify-start items-center mt-3.5">
                            <MdEmail className="text-[25px] text-[#2f904b]"/>
                            <NavLink
                            to={""}
                            className="line-clamp-1">
                                Email: infor@phukienthangmay.vn
                            </NavLink>
                        </div>
                        <div className="flex gap-2.5 justify-start items-center mt-3.5">
                            <FaPhoneAlt className="text-[25px] text-[#2f904b]"/>
                            <NavLink
                            to={"tel:0924113113"}
                            className="line-clamp-1">
                                Phone: 0924113113
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-full h-[1px] deliver mt-5"></div>
                </div>

            </div>
        </>
    )
}
export default Contact
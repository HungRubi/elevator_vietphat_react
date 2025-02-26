import icons from '../../util/icons'
import {Button} from '../../components/index'
import { NavLink } from 'react-router-dom'
const {FaGem, HiUserGroup, FaHeart, BsArrowRightSquareFill} = icons

const AboutUs = () => {
    return (
        <div className="w-full">
            <div className="px-[10%] bg-white flex justify-between py-[50px]">
                <div className="w-1/2">
                    <div className="flex flex-col">
                        <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                            Chúng tôi là ai?
                        </div>
                        <div className="w-[20%] border border-[#2f904b] mt-2.5"></div>
                        <p className="line-clamp-5 leading-8 text-[16px] text-justify mt-[15px] mb-2.5">
                            Công ty Thang Máy Việt Phát là đơn vị hàng đầu trong lĩnh vực cung cấp,
                            lắp đặt và bảo trì thang máy tại Việt Nam. Với hơn nhiều năm kinh nghiệm, 
                            Việt Phát cam kết mang đến những giải pháp thang máy hiện đại, an toàn 
                            và thẩm mỹ, đáp ứng tối đa nhu cầu của khách hàng. Sản phẩm của công ty
                            không chỉ đạt tiêu chuẩn quốc tế mà còn được tùy chỉnh để phù hợp với từng 
                            công trình cụ thể. Đội ngũ kỹ thuật viên chuyên nghiệp, tận tâm của Việt Phát
                            luôn sẵn sàng đồng hành để mang lại trải nghiệm vượt trội và dịch vụ hậu mãi
                            chu đáo. Việt Phát tự hào là đối tác đáng tin cậy, góp phần nâng cao giá trị
                            công trình và cuộc sống.
                        </p>
                        <div className="mt-5 flex justify-between items-center">
                            <div className="flex items-center gap-2.5">
                                <FaGem className='text-[#2f904b] text-2xl'/>
                                Sản phẩm chất lượng
                            </div>
                            <div className="flex items-center gap-2.5">
                                <HiUserGroup className='text-[#2f904b] text-2xl'/>
                                Đội ngũ chuyên nghiệp
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaHeart className='text-[#2f904b] text-2xl'/>
                                Dịch vụ chu đáo
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[45%]">
                    <img src="/img/about/2.png" alt="" className="object-cover w-full"/>
                </div>
            </div>
            <div className="px-[10%] flex items-center flex-col my-[50px] py-[50px]">
                <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                    Tại sao lên chọn chúng tôi?
                </div>
                <div className="w-[15%] border border-[#2f904b] mt-2.5"></div>
                <p className="text-center leading-8 line-clamp-4 text-[16px] mt-[15px]">
                    Chúng tôi mang đến giải pháp thang máy toàn diện với chất lượng vượt trội, 
                    đảm bảo an toàn và thẩm mỹ tối ưu cho mọi công trình. Việt Phát tự hào sở 
                    hữu đội ngũ kỹ thuật viên giàu kinh nghiệm, dịch vụ hậu mãi tận tâm và 
                    thời gian thi công nhanh chóng. Sản phẩm của chúng tôi được thiết kế theo 
                    tiêu chuẩn quốc tế, tùy chỉnh linh hoạt để phù hợp với từng nhu cầu riêng biệt. 
                    Lựa chọn Việt Phát, bạn không chỉ nhận được một sản phẩm, mà còn cả sự đồng hành 
                    và cam kết bền vững.
                </p>
            </div>
            <div className="px-[10%] bg-white flex justify-between py-[50px]">
                <div className="w-[45%]">
                    <img src="/img/about/2.jpg" alt="" className="object-cover w-full"/>
                </div>
                <div className="w-1/2">
                    <div className="flex flex-col">
                        <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                            Đội ngũ nhân viên
                        </div>
                        <div className="w-[20%] border border-[#2f904b] mt-2.5"></div>
                        <p className="line-clamp-5 leading-8 text-[16px] text-justify mt-[15px] mb-2.5">
                            Đội ngũ nhân viên Thang Máy Việt Phát gồm các chuyên gia giàu kinh nghiệm trong 
                            lĩnh vực thiết kế, lắp đặt và bảo trì thang máy. Với sự tận tâm và kỹ thuật chuyên
                            sâu, chúng tôi cam kết mang đến giải pháp thang máy hiện đại, an toàn và tối ưu nhất 
                            cho khách hàng. Đội ngũ luôn không ngừng học hỏi và cải tiến để đáp ứng mọi yêu cầu, 
                            từ dự án cá nhân đến công trình quy mô lớn.
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-[10%] py-[50px] flex flex-col items-center">
                <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                    Môi trường làm việc
                </div>
                <div className="w-[12%] border border-[#2f904b] mt-2.5"></div>
                <div className="flex items-center gap-5 mt-10">
                    <div className="w-1/4">
                        <img src="/img/about/3.jpg" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/4.jpg" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/5.jpg" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/6.jpg" alt="" className='w-full object-cover'/>
                    </div>
                </div>
                <p className="text-[16px] leading-8 line-clamp-1 text-center mt-2.5">
                    môi trường làm việc chuyên nghiệp, năng động, khuyến khích sự sáng tạo và phát triển nghề nghiệp cho nhân viên
                </p>
            </div>
            <div className="px-[10%] py-[50px] flex flex-col items-center bg-white">
                <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                    Sản phẩm nổi bật
                </div>
                <div className="w-[12%] border border-[#2f904b] mt-2.5"></div>
                <div className="flex items-center gap-5 mt-10">
                    <div className="w-1/4">
                        <img src="/img/about/1.jpg" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/9.png" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/9.jpg" alt="" className='w-full object-cover'/>
                    </div>
                    <div className="w-1/4">
                        <img src="/img/about/10.jpg" alt="" className='w-full object-cover'/>
                    </div>
                </div>
                <p className="text-[16px] leading-8 line-clamp-1 text-center mt-2.5">
                    Với tư cách là một công ty, chúng tôi đã tăng trưởng đều đặn về quy mô và doanh thu. 
                    Với mục tiêu bao phủ toàn Việt Nam và có thể mở rộng xuất khẩu trong tương lai gần
                </p>
            </div>
            <div className="px-[10%] flex items-center flex-col my-[50px] py-[50px]">
                <div className="text-left font-[600] text-[28px] text-[#0a0a0a] heading">
                    Chào mừng hợp tác
                </div>
                <div className="w-[15%] border border-[#2f904b] mt-2.5"></div>
                <p className="text-center leading-8 line-clamp-4 text-[16px] mt-[15px] line-clamp-4">
                    Chào mừng Quý đối tác đến với Thang Máy Việt Phát! Chúng tôi rất vinh hạnh khi được trở thành 
                    người bạn đồng hành đáng tin cậy trên hành trình phát triển của Quý vị.Với sự cam kết về chất 
                    lượng, sáng tạo và dịch vụ tận tâm, Việt Phát luôn nỗ lực mang đến những giá trị vượt ngoài 
                    mong đợi.Sự hợp tác này không chỉ là cơ hội để cùng nhau xây dựng những công trình hiện đại,
                    mà còn là nền tảng cho một 
                    <br />mối quan hệ bền vững, lâu dài. Chúng tôi tin rằng sự đồng hành của 
                    Quý vị chính là động lực để Việt Phát ngày càng phát triển mạnh mẽ hơn. 
                </p>
                <p className="leading-8 line-clamp-1 text-[16px] text-[#2f904b] italic mt-2.5">
                    Nếu bạn đang tham gia vào ngành thang máy và cần sản phẩm đáng tin cậy, 
                    vui lòng liên hệ với chúng tôi. Chúng tôi sẽ rất vui lòng được phục vụ bạn.
                </p>
                <Button className=" !px-[15px] !py-2.5 text-[18px] rounded-[8px] bg-transparent border-2 border-[#2f904b] mt-5">
                    <NavLink 
                    className="capitalize text-[#2f904b] font-[600] w-full h-full flex gap-2.5 items-center leading-8"
                    to={'/contact'}>
                       <BsArrowRightSquareFill className='text-[25px]'/> Contact now
                    </NavLink>
                </Button>
            </div>
        </div>
    )
}
export default AboutUs
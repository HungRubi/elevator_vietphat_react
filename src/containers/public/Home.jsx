import { NavLink } from 'react-router-dom';
import {Button, ListProduct, Form, ListVideo} from '../../components/index'
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation } from 'swiper/modules';
import { Helmet } from 'react-helmet';

const Home = () => {
    const {article, productsCategory, banner, video} = useSelector(state => state.app);
    const [active, setActive] = useState(0);
    const tabs = [
        { label: "COP/LOP", category: "COP/LOP" },
        { label: "Linh kiện điện", category: "Linh kiện điện" },
        { label: "Linh kiện inox", category: "Linh kiện inox" },
        { label: "Tay vịn cabin", category: "Tay vịn thang máy" },
    ];
    return (
        <>
            <Helmet>
                <title>Trang Chủ - Thang máy Việt Phát</title>
                <meta name="description" content="Thang máy Việt Phát - nơi cung cấp thiết bị thang máy chất lượng cao" />
                <meta name="keywords" content="thang máy Việt Phát, thang máy gia đình, thang máy tải hàng, thang máy kính, lắp đặt thang máy, bảo trì thang máy, công ty thang máy uy tín, thang máy chất lượng cao" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/" />
            </Helmet>
            <div >
                
                <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    slidesPerView={1}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1200} // Làm hiệu ứng mượt hơn
                    className="flex flex-nowrap overflow-x-auto z-20 relative slider_home"

                >
                    {banner?.map(item => (
                        <SwiperSlide key={item._id}>
                            <div  className="w-full aspect-[1600/670] flex-none">
                                <img src={item.thumbnail} alt="silder" className="w-full"/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="w-full px-[10%] pt-[65px] flex justify-between intro_company relative max-[1000px]:px-[15px]">
                    <div className="w-[45%] max-[763px]:!w-full" data-aos="fade-right">
                        <h1 className="text-[70px] text-[#2f904b] font-[700] uppercase" style={{fontFamily: "Impact"}}>
                            viet phat
                        </h1>
                        <h2 className="text-[40px] max-[763px]:!text-[30px] mb-5 text-black font-[700] uppercase max-[1000px]:!text-[25px]" style={{fontFamily: "Impact"}}>
                            Safe and quality <br /> elevator components
                        </h2>
                        <div className="w-[90%] text-justify mb-2.5 max-[600px]:!w-full">
                            <p className="line-clamp-10 leading-9 text-[15px] mb-5 max-[1000px]:!leading-7">
                                Công ty TNHH Phụ tùng thang máy Việt Phát là một công ty thương mại
                                đã tham gia tích cực vào ngành thang máy trong nhiều năm. Công ty đặt
                                tại Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam. 
                                Mục tiêu chính của chúng tôi là cung cấp phụ kiện thang máy chất lượng cao, 
                                cải tạo kết nối điện, phụ kiện thang máy và các sản phẩm liên quan cho khách 
                                hàng toàn Việt Nam.
                            </p>
                            <Button className="!py-[15px]">
                                Xem thêm
                            </Button>
                            <div className="mb-[150px]"></div>
                        </div>
                    </div>
                    <div className="w-[45%] mt-[90px] max-[1300px]:!mt-[25%] !z-50 max-[1100px]:!mt-[40%] max-[1000px]:!mt-[30%] max-[900px]:!mt-[60%] max-[763px]:!hidden" data-aos="fade-left">
                        <img src="/img/slider/1.png" alt="" className=' relative'/>
                    </div>
                </div>
                <div className="mt-[85px] max-[763px]:!mt-0 flex items-center justify-between w-full"
                data-aos="fade-up">
                    <div className="w-[80%] m-auto max-[600px]:!w-full max-[600px]:px-[15px]">
                        <div className="flex gap-5 mb-5 flex-col-1100 max-[468px]:!w-full ">
                            {tabs?.map((tab, index) => (
                                <div 
                                className={`tab_category w-1/4 border max-[468px]:!w-full text-center text-white uppercase cursor-pointer py-1.5 ${active === index ? "bg-[#2f904b]" : "bg-[black]"}`}
                                onClick={() => setActive(index)}
                                key={tab.label}>
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                        {tabs?.map((tab, index) => (
                            <div
                                
                                key={index}
                                className={`transition-opacity duration-500 ease-in-out ${
                                    active === index ? "opacity-100 scale-100 block" : "opacity-0 scale-95 hidden"
                                }`}
                            >
                                <ListProduct data={productsCategory} category={tab.category} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="w-[80%] m-auto mt-[70px] max-[1000px]:w-full max-[1000px]:px-[15px]" data-aos="fade-up">
                    <div 
                    className="text-center text-[50px] text-[#2f904b]"
                    style={{ fontFamily: "Impact, sans-serif" }}>
                        Featured Articles
                    </div>
                    {article?.map((item, index) => (
                        <div key={item._id} className="article_home flex items-center justify-between mt-6 gap-8 max-[950px]:!flex-col">
                            {index === 1 ? (
                                <>
                                    <div className="w-full-1100 max-[950px]:!justify-start flex w-1/2 overflow-hidden items-center justify-center max-[950px]:!items-start max-[950px]:mt-10" title={item.subject}>
                                        <div className="transform !skew-x-[29deg] px-[15px] pb-[15px] block max-[1100px]:!skew-x-0" data-aos="flip-left">
                                            <NavLink title={item.subject}
                                            to={`/news/detail/${item.slug}`} 
                                            className="frame_skew flex items-center justify-center dis_skew frame_article overflow-hidden">
                                                <img src={item.thumbnail} alt={item.subject}
                                                className="h-[300px] w-[300px] transform scale-[0.9] mx-[90px] skew-x-[-29deg] max-[1100px]:!skew-x-0" />
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="w-full-1100 text-left w-1/2 ">
                                        <h5 className="font-bold text-[25px]">Feb 02, 2025</h5>
                                        <h4 className="underline text-[#2f904b] text-[20px] font-[500] line-clamp-1">
                                            <NavLink to={`/news/detail/${item.slug}`} >
                                                {item.subject}
                                            </NavLink>
                                        </h4>
                                        <p className="line-clamp-6 text-[16px] leading-8 max-[950px]:!text-justify">
                                            {item.content}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-right w-1/2 order-2-1100 w-full-1100 max-[950px]:!text-left" >
                                        <h5 className="font-bold text-[25px]">Feb 02, 2025</h5>
                                        <h4 className="underline text-[#2f904b] text-[20px] font-[500] line-clamp-1">
                                            <NavLink to={`/news/detail/${item.slug}`} >
                                                {item.subject}
                                            </NavLink>
                                        </h4>
                                        <p className="line-clamp-6 text-[16px] leading-8 max-[950px]:!text-justify">
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="order-1-1100 flex w-1/2 w-full-1100 overflow-hidden items-center justify-center max-[950px]:!justify-start" title={item.subject}>
                                        <div className="transform !-skew-x-[29deg] px-[15px] pb-[15px] block max-[1100px]:!skew-x-0" data-aos="flip-right">
                                            <NavLink title={item.subject}
                                            className="frame_skew flex items-center justify-center frame_article -frame_article overflow-hidden max-[1100px]:!skew-x-0"
                                            to={`/news/detail/${item.slug}`}>
                                                <img src={item.thumbnail} alt="" className="h-[300px] w-[300px] transform scale-[0.9] mx-[90px] skew-x-[29deg] max-[1100px]:!skew-x-0" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                </div>
                <div className="w-[80%] m-auto mt-[70px]">
                    <div
                    data-aos="fade-up" 
                    className="text-center text-[50px] text-[#2f904b] capitalize"
                    style={{ fontFamily: "Impact, sans-serif" }}>
                        Trending Now – Don’t Miss Out!
                    </div>
                </div>
                <div className="w-full px-[10%] max-[1000px]:px-[15px]">
                    <ListVideo data={video}/>
                </div>
                <div className="w-[80%] m-auto mt-[70px]">
                    <div
                    data-aos="fade-up" 
                    className="text-center text-[50px] text-[#2f904b] capitalize"
                    style={{ fontFamily: "Impact, sans-serif" }}>
                        contact
                    </div>
                </div>
                <Form/>
                <div className="w-full mt-10">
                    <div className="w-full relative">
                        <div className="top-0 bottom-0 w-full h-auto relative">
                            <img src="/img/slider/5.png" alt="" className='w-full object-contain max-[750px]:!h-[300px] max-[750px]:object-cover'/>
                            <div className="absolute left-[10%] right-[10%] 
                            flex justify-between z-20 top-[20%] font-bold items-center
                            max-[630px]:flex-col max-[630px]:items-start max-[630px]:gap-5">
                                <div className="text-white w-1/2 leading-20 max-[630px]:w-[90%]">
                                    <h3 className="text-[#6BE455] uppercase max-[1055px]:!leading-10">
                                        luôn hoạt động 24/7
                                    </h3>
                                    <h2 className='line-clamp-2 text-5xl leading-16 
                                        max-[1488px]:text-3xl max-[1488px]:leading-10 
                                        max-[931px]:text-2xl max-[931px]:leading-8
                                        max-[750px]:line-clamp-3 w-full'>
                                        Hãy liện hệ ngay cho chúng tôi để được tư vấn
                                    </h2>
                                </div>
                                <NavLink to={"tel:0924113113"}>
                                    <Button className={"!px-8 !py-4 font-medium text-lg"}>
                                        hãy gọi ngay
                                    </Button>   
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default Home
import { NavLink } from 'react-router-dom';
import { Button, ListProduct, Form, ListVideo } from '../../components/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Navigation } from 'swiper/modules';

const Home = () => {
  const { article, productsCategory, banner, video } = useSelector(state => state.app);
  const [active, setActive] = useState(0);
  const tabs = [
    { label: 'COP/LOP', category: 'COP/LOP' },
    { label: 'Linh kiện điện', category: 'Linh kiện điện' },
    { label: 'Linh kiện inox', category: 'Linh kiện inox' },
    { label: 'Tay vịn cabin', category: 'Tay vịn thang máy' },
  ];

  return (
    <div>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        className="flex flex-nowrap overflow-x-auto z-20 relative slider_home"
      >
        {banner?.map(item => (
          <SwiperSlide key={item._id}>
            <div className="w-full aspect-[1600/670] flex-none">
              <img src={item.thumbnail} alt="slider" className="w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full px-[5%] lg:px-[10%] pt-[65px] flex flex-col lg:flex-row justify-between intro_company relative">
        <div className="lg:w-[45%] w-full" data-aos="fade-right">
          <h1 className="text-[40px] lg:text-[70px] text-[#2f904b] font-bold uppercase font-impact">viet phat</h1>
          <h2 className="text-[24px] lg:text-[40px] text-black font-bold uppercase font-impact">
            Safe and quality <br /> elevator components
          </h2>
          <div className="w-full lg:w-[80%] text-justify mb-2.5">
            <p className="leading-7 text-[15px] mb-5">
              Công ty TNHH Phụ tùng thang máy Việt Phát là một công ty thương mại đã tham gia tích cực vào ngành thang máy trong nhiều năm...
            </p>
            <Button className="!py-[15px]">Xem thêm</Button>
          </div>
        </div>

        <div className="w-full lg:w-[45%] mt-[40px] lg:mt-[90px] z-50" data-aos="fade-left">
          <img src="/img/slider/1.png" alt="" className="w-full max-w-[320px] mx-auto" />
        </div>
      </div>

      <div className="mt-[85px] flex items-center justify-center w-full px-[5%]">
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {tabs.map((tab, index) => (
              <div
                key={tab.label}
                className={`border text-center text-white uppercase cursor-pointer py-2 text-[12px] sm:text-[14px] ${
                  active === index ? 'bg-[#2f904b]' : 'bg-black'
                }`}
                onClick={() => setActive(index)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ease-in-out ${
                active === index ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
              }`}
            >
              <div className="overflow-x-auto pb-4">
                <ListProduct data={productsCategory} category={tab.category} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[90%] lg:w-[80%] mx-auto mt-[70px]" data-aos="fade-up">
        <div className="text-center text-[30px] lg:text-[50px] text-[#2f904b] font-impact">Featured Articles</div>
        {article?.map((item, index) => (
          <div key={item._id} className="flex flex-col lg:flex-row items-center justify-between mt-6 gap-6">
            {index % 2 === 1 ? (
              <>
                <div className="flex w-full lg:w-1/2 items-center justify-center" title={item.subject}>
                  <div className="px-4 pb-4 block" data-aos="flip-left">
                    <NavLink to={`/news/detail/${item.slug}`} className="overflow-hidden block">
                      <img src={item.thumbnail} alt={item.subject} className="h-[250px] w-[250px] md:h-[300px] md:w-[300px] mx-auto" />
                    </NavLink>
                  </div>
                </div>
                <div className="text-left w-full lg:w-1/2">
                  <h5 className="font-bold text-[20px] lg:text-[25px]">Feb 02, 2025</h5>
                  <h4 className="underline text-[#2f904b] text-[18px] lg:text-[20px] font-[500] line-clamp-1">
                    <NavLink to={`/news/detail/${item.slug}`}>{item.subject}</NavLink>
                  </h4>
                  <p className="text-[15px] leading-7 line-clamp-6">{item.content}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-right w-full lg:w-1/2">
                  <h5 className="font-bold text-[20px] lg:text-[25px]">Feb 02, 2025</h5>
                  <h4 className="underline text-[#2f904b] text-[18px] lg:text-[20px] font-[500] line-clamp-1">
                    <NavLink to={`/news/detail/${item.slug}`}>{item.subject}</NavLink>
                  </h4>
                  <p className="text-[15px] leading-7 line-clamp-6">{item.content}</p>
                </div>
                <div className="flex w-full lg:w-1/2 items-center justify-center">
                  <div className="px-4 pb-4 block" data-aos="flip-right">
                    <NavLink to={`/news/detail/${item.slug}`} className="overflow-hidden block">
                      <img src={item.thumbnail} alt="" className="h-[250px] w-[250px] md:h-[300px] md:w-[300px] mx-auto" />
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="w-full mt-[70px] px-[5%]">
        <div data-aos="fade-up" className="text-center text-[30px] lg:text-[50px] text-[#2f904b] capitalize font-impact">
          Trending Now – Don’t Miss Out!
        </div>
      </div>
      <div className="w-full px-[5%] lg:px-[10%] overflow-x-auto">
        <ListVideo data={video} />
      </div>

      <div className="w-full mt-10">
        <div className="w-full relative">
          <div className="relative">
            <img
              src="/img/slider/5.png"
              alt=""
              className="w-full object-contain min-h-[400px] md:min-h-[500px]"
            />
            <div className="absolute inset-x-[5%] top-[5%] sm:top-[8%] md:top-[12%] z-20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="text-white md:max-w-1/2 leading-7">
                <h3 className="text-[#6BE455] uppercase text-sm md:text-base">luôn hoạt động 24/7</h3>
                <h2 className="text-2xl md:text-5xl font-bold mt-2 leading-tight md:leading-[60px]">
                  Hãy liên hệ ngay cho chúng tôi để được tư vấn
                </h2>
              </div>
              <NavLink to="tel:0924113113">
                <Button className="!px-6 !py-3 md:!px-8 md:!py-4 font-medium text-base md:text-lg">hãy gọi ngay</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[70px]">
        <div data-aos="fade-up" className="text-center text-[30px] lg:text-[50px] text-[#2f904b] capitalize font-impact">
          contact
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Home;
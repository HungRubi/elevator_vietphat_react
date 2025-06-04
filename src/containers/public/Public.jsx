import {CircleButton, Footer, HeaderBar} from '../../components'
import { Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import icons from '../../util/icons';
import { useCallback, useEffect, useState } from 'react';

const { FaLongArrowAltUp, BiSolidPhoneCall } = icons


const Public = () => {
    const location = useLocation();
    const [isShow, setIsShow] = useState(false);
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY; 

        if (scrollY > 400) { 
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // `handleScroll` là dependency để đảm bảo listener luôn được cập nhật đúng

    // Hàm cuộn lên đầu trang
    const handleToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Hiệu ứng cuộn mượt
        });
    };
    return (
        <div className="w-full relative">
            <div className={` top-0 left-0 right-0 z-90 ${location.pathname !== '/' ? "relative" : "absolute"}`}>
                <HeaderBar />
            </div>
            <div className="w-full relative">
                <Outlet />
            </div>
            <div className="w-full">
                <Footer />
            </div>
            {isShow ? (
                <>
                    <CircleButton onClick={handleToTop}
                        className="fixed bottom-4 left-10 z-100
                        bg-gradient-to-br from-[#FFD700] to-[#FFA500] 
                        text-[#8B4513] font-bold shadow-xl !w-14 !h-14
                        hover:from-[#FFE066] hover:to-[#FFBB33] 
                        transform hover:scale-110 transition-all duration-400 ease-in-out group "
                    >
                        <FaLongArrowAltUp className='text-[28px] group-hover:animate-bounce-up text-white'/>
                        <span 
                            className="absolute top-0 left-0 w-full h-full 
                            bg-white opacity-0 
                            group-hover:opacity-10 
                            transition-opacity duration-300 
                            pointer-events-none"
                        ></span>
                    </CircleButton>
                    <CircleButton className="fixed bottom-20 left-10 z-100
                        bg-gradient-to-br from-[#FFD700] to-[#FFA500] 
                        text-[#8B4513] font-bold shadow-xl !w-14 !h-14
                        hover:from-[#FFE066] hover:to-[#FFBB33] 
                        transform hover:scale-110 transition-all duration-400 ease-in-out group ">
                            <BiSolidPhoneCall className='text-3xl text-white'/>
                    </CircleButton>
                </>
            ) : ("")}
        </div>
    )
}
export default Public
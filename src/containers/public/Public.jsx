import { CircleButton, Footer, HeaderBar } from '../../components'
import { NavLink, Outlet } from "react-router-dom"
import icons from '../../util/icons';
import { useCallback, useEffect, useState } from 'react';
const { FaLongArrowAltUp, BiSolidPhoneCall } = icons


const Public = () => {
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
            <div className="sticky top-0 left-0 right-0 z-50">
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
                        className="fixed bottom-4 left-10 z-[1200] max-[1000px]:left-[15px]
                        border border-slate-200/80 bg-white text-slate-700 shadow-lg !w-14 !h-14
                        hover:bg-slate-50 max-[1000px]:!w-10 max-[1000px]:!h-10
                        transition-all duration-200 ease-out group"
                    >
                        <FaLongArrowAltUp className='text-[22px] text-[#2f904b]'/>
                        <span 
                            className="absolute top-0 left-0 w-full h-full 
                            bg-white opacity-0 
                            group-hover:opacity-10 
                            transition-opacity duration-300 
                            pointer-events-none"
                        ></span>
                    </CircleButton>
                    <NavLink
                        to="tel:0924113113"
                        className="group fixed bottom-20 left-10 z-[1200] flex h-14 w-14 max-[1000px]:left-[15px] max-[1000px]:h-10 max-[1000px]:w-10 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b] focus-visible:ring-offset-2"
                        aria-label="Gọi hotline 0924 113 113"
                    >
                        <span
                            className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 max-[1000px]:h-10 max-[1000px]:w-10 -translate-x-1/2 -translate-y-1/2"
                            aria-hidden
                        >
                            <span className="vp-call-fab__ring" />
                            <span className="vp-call-fab__ring vp-call-fab__ring--delay" />
                        </span>
                        <span
                            className="relative z-[1] flex h-full w-full items-center justify-center rounded-full border-2 border-white/35 bg-[#2f904b] text-white shadow-[0_10px_30px_rgba(47,144,75,0.45)] transition duration-200 ease-out group-hover:scale-105 group-hover:bg-[#268a42] group-hover:shadow-[0_14px_36px_rgba(47,144,75,0.55)] group-active:scale-95"
                        >
                            <BiSolidPhoneCall className="relative z-[1] text-2xl text-white max-[1000px]:text-xl" />
                        </span>
                    </NavLink>
                </>
            ) : ("")}
        </div>
    )
}
export default Public
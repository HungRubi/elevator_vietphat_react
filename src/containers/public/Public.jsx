import { CircleButton, Footer, HeaderBar } from '../../components'
import { NavLink, Outlet } from "react-router-dom"
import icons from '../../util/icons';
import { useCallback, useEffect, useState } from 'react';
import {Button} from '../../components'
import {menuBar} from '../../util/menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleMenuMobie } from "../../store/slices/uiSlice";
const { FaLongArrowAltUp, BiSolidPhoneCall, IoCloseSharp } = icons


const Public = () => {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const { menu_mobie } = useSelector(state => state.ui);
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
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 z-[1400] bg-[#00000054] 
                            transition-opacity duration-600 ease-in-out
                            ${menu_mobie ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                onClick={() => dispatch(toggleMenuMobie(false))}
                >
                <div
                    className={`w-[70%] h-full bg-white relative transition-transform duration-600 ease-in-out
                                ${menu_mobie ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <Button className={'!bg-white !px-1.5 !py-1 absolute -right-12'}
                        onClick={() => dispatch(toggleMenuMobie(false))}>
                        <IoCloseSharp className='size-[30px] text-black '/>
                    </Button>
                    <ul className="w-full px-2.5 h-full">
                        {menuBar.map((item, index) => (
                            <li key={index} className="border-b border-b-[#cbd0dd]">
                                <NavLink
                                    to={`${item.path}`}
                                    onClick={() => dispatch(toggleMenuMobie(false))}
                                    className={({ isActive }) =>
                                        `block cursor-pointer px-4 py-2 text-lg font-medium uppercase ${
                                            isActive
                                                ? "bg-emerald-50 text-[#2f904b] hover:bg-emerald-100"
                                                : "hover:bg-[#f5f5f5]"
                                        }`
                                    }
                                >
                                    {item.text}
                                </NavLink>
                                {item.subMenu && (
                                    <ul className="pl-4">
                                        {item.subMenu.map((subItem, subIndex) => (  
                                            <li key={subIndex}>
                                                <NavLink
                                                    to={`${subItem.path}`}
                                                    onClick={() => dispatch(toggleMenuMobie(false))}
                                                    className={({ isActive }) =>
                                                        `block cursor-pointer px-4 py-2 text-[14px] ${
                                                            isActive
                                                                ? "bg-emerald-50 font-semibold text-[#2f904b] hover:bg-emerald-100"
                                                                : "hover:bg-[#f5f5f5]"
                                                        }`
                                                    }
                                                >
                                                    {subItem.text}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Public
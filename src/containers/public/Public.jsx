import {CircleButton, Footer, HeaderBar} from '../../components'
import { NavLink, Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import icons from '../../util/icons';
import { useCallback, useEffect, useState } from 'react';
import {Button} from '../../components'
import {menuBar} from '../../util/menu';
import { useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';
const { FaLongArrowAltUp, BiSolidPhoneCall, IoCloseSharp } = icons


const Public = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const { menu_mobie } = useSelector(state => state.app);
    console.log("menu_mobie", menu_mobie);
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
            <div className={`top-0 left-0 right-0 z-50 ${location.pathname !== '/' ? "relative" : "absolute"}
            max-[600px]:relative max-[600px]:bg-[#2f904b]`}>
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
                        className="fixed bottom-4 left-10 z-100 max-[1000px]:left-[15px]
                        bg-gradient-to-br from-[#FFD700] to-[#FFA500] 
                        text-[#8B4513] font-bold shadow-xl !w-14 !h-14
                        hover:from-[#FFE066] hover:to-[#FFBB33] max-[1000px]:!w-10 max-[1000px]:!h-10
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
                    <NavLink to={"tel:0924113113"}>
                        <CircleButton className="fixed bottom-20 left-10 z-100
                            bg-gradient-to-br from-[#FFD700] to-[#FFA500] 
                            text-[#8B4513] font-bold shadow-xl !w-14 !h-14 max-[1000px]:!w-10 max-[1000px]:!h-10
                            hover:from-[#FFE066] hover:to-[#FFBB33] max-[1000px]:left-[15px]
                            transform hover:scale-110 transition-all duration-400 ease-in-out group ">
                                <BiSolidPhoneCall className='text-3xl text-white'/>
                        </CircleButton>
                    </NavLink>
                </>
            ) : ("")}
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-[#00000054] 
                            transition-opacity duration-600 ease-in-out
                            ${menu_mobie ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => dispatch.actions.toggleMenuMobie(false)} 
                >
                <div
                    className={`w-[70%] h-full bg-white relative transition-transform duration-600 ease-in-out
                                ${menu_mobie ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <Button className={'!bg-white !px-1.5 !py-1 absolute -right-12'}
                        onClick={() => dispatch(actions.toggleMenuMobie(false))}>
                        <IoCloseSharp className='size-[30px] text-black '/>
                    </Button>
                    <ul className="w-full px-2.5 h-full">
                        {menuBar.map((item, index) => (
                            <li key={index} className="border-b border-b-[#cbd0dd]">
                                <NavLink to={`${item.path}`} onClick={() => dispatch.actions.toggleMenuMobie(false)}
                                className="block py-2 px-4 hover:bg-[#f5f5f5] uppercase font-medium text-lg cursor-pointer">
                                    {item.text}
                                </NavLink>
                                {item.subMenu && (
                                    <ul className="pl-4">
                                        {item.subMenu.map((subItem, subIndex) => (  
                                            <li key={subIndex}>
                                                <NavLink to={`${subItem.path}`} onClick={() => dispatch.actions.toggleMenuMobie(false)}
                                                className="block py-2 px-4 hover:bg-[#f5f5f5] text-[14px] cursor-pointer">
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
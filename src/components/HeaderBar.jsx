import { NavLink, useNavigate } from 'react-router-dom';
import { menuBar } from '../util/menu';
import { CircleButton, Notification, Search } from './index';
import icons from '../util/icons';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
const {FaRegBell, PiShoppingCartBold, FaArrowRightFromBracket, BsPerson, FiTruck, BsTag} = icons
const active = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 bg-[#2f904b]';
const notActive = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 hover:bg-[#2f904b] transition duration-300 ease-linear';

const HeaderBar = () => {
    const { currentUser, productCart, myNotifi } = useSelector(state => state.user);
    const filterNotifi = myNotifi?.filter(item => item.isRead === false);
    const [openMenu, setOpenMenu] = useState(null);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const timeoutRef = useRef(null);

    const handleToggleMenu = (menu) => {
        setOpenMenu(menu);
    }

    const handleMenuHover = (menu) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredMenu(menu);
    }

    const handleMenuLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHoveredMenu(null);
        }, 200); // 200ms delay
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const notificationMenu = document.querySelector('.notification-menu');
            const accountMenu = document.querySelector('.account-menu');
            
            if (openMenu === "notification" && notificationMenu && !notificationMenu.contains(event.target)) {
                setOpenMenu(null);
            }
            if (openMenu === "account" && accountMenu && !accountMenu.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [openMenu]);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hanleLogout = () => {
        dispatch(actions.logout());
        navigate('/')
    }

    return (
        <div className={`w-full px-[10%] m-auto flex items-center justify-between ${location.pathname === '/' ? "bg-transparent" : "bg-black"}`}
        data-aos="fade-down" data-aos-anchor-placement="top-bottom">
            <div className="w-[90px]">
                <NavLink
                className="w-full"
                to={'/'}>
                    <img src="/img/logo.png" alt="" className='w-full object-cover'/>
                </NavLink>
            </div>
            <div className="flex min-w-[45%] max-w-[55%] w-[55%] px-[1.5%]">
                <ul className="w-full flex items-center justify-between">
                    {menuBar.map(item => (
                        <NavLink
                            key={item.path}
                            className={({isActive}) => isActive ? active : notActive}
                            style={{ transform: "skew(-28deg) translateZ(0)" }}
                            to={item.path}
                            onMouseEnter={() => handleMenuHover(item.text)}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className='transform skew-x-[28deg]'>
                                {item.text}
                            </div>
                            {(item.text === "products" || item.text === "news") && hoveredMenu === item.text && (
                                <div 
                                    className="w-[250px] absolute bg-[#2f904b] flex flex-col top-16 left-12 transform skew-x-[28deg] z-50"
                                    onMouseEnter={() => handleMenuHover(item.text)}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    {item.subMenu.map(subItem => (
                                        <NavLink
                                            key={subItem.path}
                                            className={"leading-[2.5] !flex group items-center gap-2 py-[5px] transform skew-x-[-28deg] px-2 text-white uppercase text-left z-10 "}
                                            to={subItem.path}
                                        >   
                                            <div className="w-2 h-2 bg-transparent group-hover:bg-white">

                                            </div>
                                            <div className='transform skew-x-[28deg] text-[11px]'>
                                                {subItem.text}
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-end gap-4">
                <Search/>
                <div 
                    className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative" 
                    onClick={() => handleToggleMenu("notification")}
                >
                    <FaRegBell className='size-[20px] text-[#ffffffb4]'/>
                    <CircleButton className={`absolute -top-[10px] -right-[10px] bg-red-500 text-white !h-6 !w-6 flex-none text-[12px] ${filterNotifi ? "" : "hidden"}`}>
                        {filterNotifi?.length}
                    </CircleButton>
                    {openMenu === "notification" && (
                        <Notification/>
                    )}
                </div>

                <NavLink
                to={'/cart'} 
                className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative">
                    <PiShoppingCartBold className='size-[22px] font-bold text-[#ffffffb4]'/>
                    <CircleButton className={`absolute -top-[10px] -right-[10px] bg-red-500 text-white !h-6 !w-6 flex-none text-[12px] ${productCart?.length > 0 ? "" : "hidden"}`}>
                        {productCart?.length || 0}
                    </CircleButton>
                </NavLink>
                    
                {/* Menu User */}
                <div 
                    className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative" 
                    onClick={() => handleToggleMenu("account")}
                >
                    <img src={currentUser ? `${currentUser?.avatar?.startsWith('/uploads') ? `${import.meta.env.VITE_SERVER_URL}${currentUser?.avatar}` : currentUser?.avatar}` : "/img/default.png"} alt="" className='rounded-[50%]'/>
                    {openMenu === "account" && (
                        <div className="account-menu menu absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] pb-2.5">
                            {currentUser ? (
                                <>
                                    <div className="flex flex-col items-center pt-[15px] justify-center">
                                        <img 
                                            src={
                                            currentUser?.avatar?.startsWith('/uploads')
                                                ? `${import.meta.env.VITE_SERVER_URL}${currentUser.avatar}`
                                                : currentUser.avatar
                                            } 
                                            alt="avatar" 
                                            className='w-[40px] h-[40px] rounded-[50%] '
                                        />
                                        <h5 className="text-[15px] mt-2.5">
                                            {currentUser?.name}
                                        </h5>
                                        <hr className='h-[1px] border-t border-t-[#cbd0dd] w-full my-3'/>
                                    </div>
                                    <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5">
                                        <ul className='w-full'>
                                            <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                                <BsPerson className='text-[20px] -mt-[3px]'/>
                                                <NavLink className="capitalize text-[15px] text-[#6b6a6a]"
                                                to={"/account/profile"}>
                                                    tài khoản
                                                </NavLink>
                                            </li>
                                            <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                                <FiTruck className='text-[17px] ml-[2px] -mt-[3px]'/>
                                                <NavLink className="capitalize text-[15px] text-[#6b6a6a]"
                                                to={"/account/order"}>
                                                    đơn hàng
                                                </NavLink>
                                            </li>
                                            <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                                <BsTag className='text-[19px] ml-[2px] -mt-[3px]'/>
                                                <NavLink className="capitalize text-[15px] text-[#6b6a6a]"
                                                to={"/account/voucher"}>
                                                    vouchers
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <div className="px-[1rem] w-full">
                                            <button onClick={hanleLogout}
                                            className="text-[18px] cursor-pointer bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
                                                <div className="flex items-center justify-center gap-2.5 capitalize">
                                                    <FaArrowRightFromBracket className='text-[18px] -mt-[2px]'/>
                                                    đăng xuất
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col items-center pt-[15px] justify-center">
                                        <h5 className="px-5 text-[15px] mt-2.5 line-clamp-2 text-center">
                                            Đăng nhập để theo dõi đơn hàng của bạn
                                        </h5>
                                        <hr className='h-[1px] border-t border-t-[#cbd0dd] w-full my-3'/>
                                    </div>
                                    <div className="px-[1rem] w-full">
                                        <button className="text-[18px] cursor-pointer bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
                                            <NavLink
                                            to={"/login"}
                                            className="flex items-center justify-center gap-2.5 capitalize">
                                                <FaArrowRightFromBracket className='text-[18px] -mt-[2px]'/>
                                                đăng nhập
                                            </NavLink>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default HeaderBar
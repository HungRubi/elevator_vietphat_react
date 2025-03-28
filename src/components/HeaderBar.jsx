import { NavLink } from 'react-router-dom';
import { menuBar } from '../util/menu';
import { Search } from './index';
import icons from '../util/icons';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const {FaRegBell, PiShoppingCartBold, FaArrowRightFromBracket, BsPerson, FiTruck, BsTag} = icons
const active = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 bg-[#2f904b]';
const notActive = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 hover:bg-[#2f904b] transition duration-300 ease-linear';
const HeaderBar = () => {
    const { currentUser } = useSelector(state => state.app)
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest(".btn_togglo, .menu_togglo")) {
            setOpenMenu(null);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    const location = useLocation();
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
                        >
                            <div className='transform skew-x-[28deg]'>
                                {item.text}
                            </div>
                        </NavLink>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-end gap-4">
                <Search/>
                <div className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative btn_togglo" onClick={() => toggleMenu("notification")}>
                    <FaRegBell className='size-[20px] text-[#ffffffb4]'/>
                    {openMenu === "notification" && (
                        <div className="absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo">
                            <div className="flex flex-col items-center py-[15px] justify-center">
                                <img src="/img/default.png" alt="" className='w-[40px] h-[40px] rounded-[50%] '/>
                                <h5 className="text-[15px] mt-2.5">
                                    Chưa đăng nhập
                                </h5>
                                <hr className='h-[1px] border-t border-t-[#cbd0dd] w-full my-3'/>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5 px-3">
                                <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2.5 rounded-[8px] !text-black border border-[#cbd0dd]">
                                    <NavLink
                                    to={"/login"}
                                    className="flex items-center justify-center gap-2.5">
                                        <FaArrowRightFromBracket className='text-[18px] -mt-1'/>
                                        Đăng nhập
                                    </NavLink>
                                </button>
                                <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2.5 rounded-[8px] !text-black border border-[#cbd0dd]">
                                    <NavLink
                                    to={"/register"}
                                    className="flex items-center justify-center gap-2.5">
                                        <FaArrowRightFromBracket className='text-[18px] -mt-1'/>
                                        Đăng ký
                                    </NavLink>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <NavLink
                to={'/cart'} 
                className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative">
                    <PiShoppingCartBold className='size-[22px] font-bold text-[#ffffffb4]'/>
                </NavLink>
                <div className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative btn_togglo" onClick={() => toggleMenu("account")}>
                    <img src='/img/default.png' alt="" className='rounded-[50%]'/>
                    {openMenu === "account" && (
                        // <div className="absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo ">
                        //     <div className="flex flex-col items-center py-[15px] justify-center">
                        //         <img src="/img/default.png" alt="" className='w-[40px] h-[40px] rounded-[50%] '/>
                        //         <h5 className="text-[15px] mt-2.5">
                        //             Chưa đăng nhập
                        //         </h5>
                        //         <hr className='h-[1px] border-t border-t-[#cbd0dd] w-full my-3'/>
                        //     </div>
                        //     <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5 px-3">
                        //         <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
                        //             <NavLink
                        //             to={"/login"}
                        //             className="flex items-center justify-center gap-2.5">
                        //                 <FaArrowRightFromBracket className='text-[18px] -mt-1'/>
                        //                 Đăng nhập
                        //             </NavLink>
                        //         </button>
                        //         <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
                        //             <NavLink
                        //             to={"/register"}
                        //             className="flex items-center justify-center gap-2.5">
                        //                 <FaArrowRightFromBracket className='text-[18px] -mt-1'/>
                        //                 Đăng ký
                        //             </NavLink>
                        //         </button>
                        //     </div>
                        // </div>
                        <div className="absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo ">
                            {currentUser ? (
                                <>
                                    <div className="flex flex-col items-center pt-[15px] justify-center">
                                        <img src="/img/default.png" alt="" className='w-[40px] h-[40px] rounded-[50%] '/>
                                        <h5 className="text-[15px] mt-2.5">
                                            Nguyễn Huy Hùng
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
                                            <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
                                                <NavLink
                                                to={"/login"}
                                                className="flex items-center justify-center gap-2.5 capitalize">
                                                    <FaArrowRightFromBracket className='text-[18px] -mt-[2px]'/>
                                                    đăng xuất
                                                </NavLink>
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
                                        <button className="text-[18px] cursor-pointer   bg-[rgba(121,119,119,0.1215686275)] w-full py-2 rounded-[8px] !text-black border border-[#cbd0dd]">
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
import { NavLink, useNavigate } from 'react-router-dom';
import { menuBar } from '../util/menu';
import { CircleButton, Search } from './index';
import icons from '../util/icons';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const { FaRegBell, PiShoppingCartBold, FaArrowRightFromBracket, BsPerson, FiTruck, BsTag } = icons;

const active = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 bg-[#2f904b]';
const notActive = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 hover:bg-[#2f904b] transition duration-300 ease-linear';

const HeaderBar = () => {
  const { currentUser, productCart } = useSelector(state => state.user);
  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const timeoutRef = useRef(null);

  const handleToggleMenu = (menu) => {
    setOpenMenu(prev => prev === menu ? null : menu);
  };

  const handleMenuHover = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredMenu(null), 200);
  };

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [openMenu]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanleLogout = () => {
    dispatch(actions.logout());
    navigate('/login');
  };

  return (
    <div className={`w-full px-5 lg:px-[10%] flex flex-wrap lg:flex-nowrap items-center justify-between ${location.pathname === '/' ? "bg-transparent" : "bg-black"}`} data-aos="fade-down">

      {/* Logo */}
      <div className="w-[80px] lg:w-[90px]">
        <NavLink className="w-full" to={'/'}>
          <img src="/img/logo.png" alt="logo" className='w-full object-cover' />
        </NavLink>
      </div>

      {/* Hamburger menu (mobile only) */}
      <div className="block lg:hidden">
        <button onClick={() => handleToggleMenu("mobile")}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop menu with skew effect */}
      <div className="hidden lg:flex min-w-[45%] max-w-[55%] w-[55%] px-[1.5%]">
        <ul className="w-full flex items-center justify-between">
          {menuBar.map(item => (
            <NavLink
              key={item.path}
              className={({ isActive }) => isActive ? active : notActive}
              style={{ transform: "skew(-28deg) translateZ(0)" }}
              to={item.path}
              onMouseEnter={() => handleMenuHover(item.text)}
              onMouseLeave={handleMenuLeave}
            >
              <div className='transform skew-x-[28deg]'>{item.text}</div>
              {item.subMenu && hoveredMenu === item.text && (
                <div className="w-[250px] absolute bg-[#2f904b] flex flex-col top-16 left-12 transform skew-x-[28deg] z-50"
                  onMouseEnter={() => handleMenuHover(item.text)} onMouseLeave={handleMenuLeave}>
                  {item.subMenu.map(subItem => (
                    <NavLink key={subItem.path}
                      className={"leading-[2.5] !flex group items-center gap-2 py-[5px] transform skew-x-[-28deg] px-2 text-white uppercase text-left z-10"}
                      to={subItem.path}>
                      <div className="w-2 h-2 bg-transparent group-hover:bg-white" />
                      <div className='transform skew-x-[28deg] text-[11px]'>{subItem.text}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {openMenu === 'mobile' && (
  <div className="w-full bg-[#2f904b] text-white px-4 py-4 lg:hidden rounded-md mt-3 space-y-3 z-50">
    {menuBar.map(item => (
      <div key={item.path}>
        <NavLink
          to={item.path}
          onClick={() => setOpenMenu(null)}
          className="block text-[16px] font-semibold uppercase py-2 border-b border-white"
        >
          {item.text}
        </NavLink>

        {item.subMenu && (
          <div className="ml-4 mt-1 space-y-1">
            {item.subMenu.map(sub => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className="block text-[14px] text-white/90 pl-2 border-l-2 border-white"
                onClick={() => setOpenMenu(null)}
              >
                ▸ {sub.text}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)}

      {/* Icon section */}
      <div className="flex items-center justify-end gap-3 mt-3 w-full lg:w-auto sm:gap-4">
        <Search />

        {/* Notification */}
        <div className="rounded-full h-10 w-10 bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative"
          onClick={() => handleToggleMenu("notification")}>
          <FaRegBell className='size-[20px] text-[#ffffffb4]' />
          {openMenu === "notification" && (
            <div className="notification-menu menu absolute bg-white w-[90vw] sm:w-[350px] top-[140%] right-0 rounded-[3px] shadow-md z-50 px-4 py-2">
              <div className="flex items-center justify-between border-b border-[#cbd0dd] pb-2">
                <h5 className="text-[15px]">Notification</h5>
                <span className='text-[15px] text-blue-500 leading-8 cursor-pointer'>Đọc tất cả</span>
              </div>
              <div className="w-full flex flex-col mt-2">
                <div className="w-full flex items-center justify-between p-2.5 border-b border-[#cbd0dd]">
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" className='border-gray-500' />
                    <div className="w-10 h-10 border border-[#cbd0dd] flex-none">
                      <img src="/img/logo.png" alt="" />
                    </div>
                    <h5 className="text-[12px] capitalize line-clamp-2">Đơn hàng của bạn đã được xác nhận</h5>
                    <span className='text-[12px] text-[#888] whitespace-nowrap'>10 phút trước</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <NavLink to={'/cart'} className="rounded-full h-10 w-10 bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative">
          <PiShoppingCartBold className='size-[22px] font-bold text-[#ffffffb4]' />
          <CircleButton className="absolute -top-[10px] -right-[10px] bg-red-500 text-white !h-6 !w-6 text-[12px]">
            {productCart?.length || 0}
          </CircleButton>
        </NavLink>

        {/* Account */}
        <div className="rounded-full h-10 w-10 bg-[rgba(255,255,255,0.253)] flex items-center justify-center cursor-pointer relative"
          onClick={() => handleToggleMenu("account")}>
          <img src={currentUser ? currentUser?.avatar : "/img/default.png"} alt="" className='rounded-full w-full h-full object-cover' />
          {openMenu === "account" && (
            <div className="account-menu menu absolute bg-white w-[90vw] sm:w-[250px] top-[140%] right-0 rounded-[3px] shadow-md z-50 px-4 py-2">
              {currentUser ? (
                <>
                  <div className="flex flex-col items-center pt-2">
                    <img src={currentUser?.avatar} alt="" className='w-[40px] h-[40px] rounded-full' />
                    <h5 className="text-[15px] mt-2.5">{currentUser?.name}</h5>
                    <hr className='border-t border-t-[#cbd0dd] w-full my-3' />
                  </div>
                  <ul className='px-2'>
                    <li className="py-2 flex items-center gap-2 hover_bg_li">
                      <BsPerson /><NavLink to="/account/profile">Tài khoản</NavLink>
                    </li>
                    <li className="py-2 flex items-center gap-2 hover_bg_li">
                      <FiTruck /><NavLink to="/account/order">Đơn hàng</NavLink>
                    </li>
                    <li className="py-2 flex items-center gap-2 hover_bg_li">
                      <BsTag /><NavLink to="/account/voucher">Vouchers</NavLink>
                    </li>
                  </ul>
                  <div className="px-2">
                    <button onClick={hanleLogout} className="w-full mt-2 py-2 border border-[#cbd0dd] rounded text-black">
                      <div className="flex items-center justify-center gap-2">
                        <FaArrowRightFromBracket /> Đăng xuất
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-2 py-3 text-center">
                  <p className="text-sm">Đăng nhập để theo dõi đơn hàng của bạn</p>
                  <NavLink to="/login" className="block mt-3 py-2 border border-[#cbd0dd] rounded text-black">
                    <div className="flex items-center justify-center gap-2">
                      <FaArrowRightFromBracket /> Đăng nhập
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;

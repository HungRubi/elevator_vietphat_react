import { NavLink } from 'react-router-dom';
import { menuBar } from '../util/menu';
import { Search } from './index';
import icons from '../util/icons';
import { useLocation } from 'react-router-dom';

const {FaRegBell, PiShoppingCartBold} = icons
const active = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 bg-[#2f904b]';
const notActive = 'leading-[2.5] py-[5px] px-5 text-xl text-white uppercase text-center item_nav relative z-10 hover:bg-[#2f904b] transition duration-300 ease-linear';
const HeaderBar = () => {
    const location = useLocation();
    return (
        <div className={`w-full px-[10%] m-auto flex items-center justify-between ${location.pathname === '/' ? "bg-transparent" : "bg-black"}`}>
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
                <div className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] overflow-hidden flex items-center justify-center">
                    <FaRegBell className='size-[20px] text-[#ffffffb4]'/>
                </div>
                <div className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] overflow-hidden flex items-center justify-center">
                    <PiShoppingCartBold className='size-[22px] font-bold text-[#ffffffb4]'/>
                </div>
                <div className="rounded-[50%] h-[40px] w-[40px] bg-[rgba(255,255,255,0.253)] overflow-hidden flex items-center justify-center">
                    <img src='/img/default.png' alt=""/>
                </div>
            </div>
        </div>
    )
}
export default HeaderBar
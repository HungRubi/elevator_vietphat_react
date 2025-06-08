import { NavLink } from 'react-router-dom';
import {CircleButton} from '../../components';
import icons  from '../../util/icons';
import { Route, Routes } from 'react-router-dom';
import {Profile, Banking, Address, Password, Notification, Order, Voucher} from './index'
import { useSelector } from 'react-redux';
const {CiEdit, FaRegBell, BsPerson, RiBillLine, BsTag} = icons;
const active = '!text-[#2f904b] capitalize flex items-center';
const notActive = 'text-[#000] capitalize flex items-center';
const Account = () => {
    const {currentUser} = useSelector(state => state.user);
    const account = [
        {
            label: 'Thông báo', 
            icon: <FaRegBell className='text-[16px] mr-2.5 mb-1'/>,
            path: '/account/notification'
        },
        {
            label: 'Thông tin tài khoản', 
            icon: <BsPerson className='text-[18px] mr-2 mb-1'/>,
            path: '/account/profile',
            children: [
                {
                    label: 'Hồ sơ',
                    path: '/account/profile'
                },
                {
                    label: 'Ngân hàng',
                    path: '/account/banking'
                },
                {
                    label: 'Địa chỉ',
                    path: '/account/address'
                },
                {
                    label: 'Đổi mật khẩu',
                    path: '/account/password'
                }
            ]
        },
        {
            label: 'Đơn hàng', 
            icon: <RiBillLine className='text-[16px] mr-2.5 mb-1'/>,
            path: '/account/order'
        },
        {
            label: 'Voucher', 
            icon: <BsTag className='text-[16px] mr-2.5 mb-1'/>,
            path: '/account/voucher'
        },
    ]
    return (
        <div
        className="w-full px-[10%] pt-8 flex justify-between">
            <div className="w-[200px]">
                <div className="flex w-full items-center">
                    <CircleButton
                    className="mr-3">
                        <img 
                            src={
                                currentUser?.avatar?.startsWith('/uploads')
                                ? `${import.meta.env.VITE_SERVER_URL}${currentUser.avatar}`
                                : currentUser.avatar
                            } 
                            alt="avatar" 
                            className='rounded-[50%]'
                        />
                    </CircleButton>
                    <div className="cursor-default text-[15px]">
                    <div className="font-[600]">
                        {currentUser?.account}
                    </div>
                    <div className="flex text-[#888] cursor-pointer gap-2 mt-[2px]">
                        <CiEdit className='text-[20px]'/>
                        <span>Sửa hồ sơ</span>
                    </div>
                </div>
                </div>
                <div className="my-4 w-full h-[1px] border-t border-t-[#cbd0dd]"></div>
                <ul className="w-full ">
                    {account.map((item, index) => (
                        <li key={index}
                        className={`px-3 py-[7px] text-[14px] line-clamp-1 cursor-pointer w-full`}>
                                
                                <NavLink className={({isActive}) => isActive ? active : notActive}
                                to={`${item.path}`}>
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            {item.children && (
                                <ul className="w-full mt-2">
                                    {item.children.map((child, index) => (
                                        <li key={index} className="py-[7px] px-7 line-clamp-1 cursor-pointer w-full text-[14px] capitalize">
                                            <NavLink
                                            className={({isActive}) => isActive ? active : notActive}
                                            to={`${child.path}`}>
                                                {child.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Routes>
                <Route path="profile" element={<Profile/>}/>   
                <Route path="banking" element={<Banking/>}/>   
                <Route path="address" element={<Address/>}/>   
                <Route path="password" element={<Password/>}/>   
                <Route path="notification" element={<Notification/>}/>   
                <Route path="order" element={<Order/>}/>   
                <Route path="voucher" element={<Voucher/>}/>   
            </Routes>
        </div>
    );
}

export default Account;
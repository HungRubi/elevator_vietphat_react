import { NavLink } from 'react-router-dom';
import {CircleButton} from '../../components';
import icons  from '../../util/icons';
import { Route, Routes } from 'react-router-dom';
import {Profile, Banking, Address, Password, Notification, Order} from './index'

const {CiEdit, FaRegBell, BsPerson, RiBillLine} = icons
const Account = () => {
    return (
        <div
        className="w-full px-[10%] pt-8 flex justify-between">
            <div className="w-[200px]">
                <div className="flex w-full items-center">
                    <CircleButton
                    className="mr-3">
                        <img src="/img/default.png" 
                        alt="avatar" 
                        className='rounded-[50%]'/>
                    </CircleButton>
                    <div className="cursor-default text-[15px]">
                    <div className="font-[600]">
                        account
                    </div>
                    <div className="flex text-[#888] cursor-pointer gap-2 mt-[2px]">
                        <CiEdit className='text-[20px]'/>
                        <span>Sửa hồ sơ</span>
                    </div>
                </div>
                </div>
                <div className="my-4 w-full h-[1px] border-t border-t-[#cbd0dd]"></div>
                <ul className="w-full ">
                    <li 
                    className="px-3 py-[7px] text-[14px] line-clamp-1 cursor-pointer w-full flex items-center">
                        <FaRegBell className='text-[16px] mr-2.5 mb-1'/>
                        <NavLink className='capitalize'
                        to={'/account/notification'}>
                            Thông báo
                        </NavLink>
                    </li>
                    <li 
                    className="px-3 py-[7px] text-[14px] line-clamp-1 cursor-pointer w-full">
                        <div className="flex items-center">
                            <BsPerson className='text-[18px] mr-2 mb-1'/>
                            <NavLink className='capitalize cursor-pointer'
                            to={'/account/profile'}>
                                Thông tin tài khoản
                            </NavLink>
                        </div>
                        <ul className="w-full">
                            <li className="py-2 px-7 line-clamp-1 cursor-pointer w-full text-[14px] capitalize mt-1">
                                <NavLink
                                className={"cursor-pointer w-full"}
                                to={'/account/profile'}>
                                    hồ sơ
                                </NavLink>
                            </li>
                            <li className="py-2 px-7 line-clamp-1 cursor-pointer w-full text-[14px] capitalize">
                                <NavLink
                                className={"cursor-pointer w-full"}
                                to={'/account/banking'}>
                                    ngân hàng
                                </NavLink>
                            </li>
                            <li className="py-2 px-7 line-clamp-1 cursor-pointer w-full text-[14px] capitalize">
                                <NavLink
                                className={"cursor-pointer w-full"}
                                to={'/account/address'}>
                                    địa chỉ
                                </NavLink>
                            </li>
                            <li className="py-2 px-7 line-clamp-1 cursor-pointer w-full text-[14px] capitalize">
                                <NavLink
                                className={"cursor-pointer w-full"}
                                to={'/account/password'}>
                                    đổi mật khẩu
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li 
                    className="px-3 py-[7px] text-[14px] line-clamp-1 cursor-pointer w-full flex items-center">
                        <RiBillLine className='text-[16px] mr-2.5 mb-1'/>
                        <NavLink
                        to={'/account/order'} 
                        className='capitalize'>
                            Đơn hàng
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem] relative">
                <Routes>
                    <Route path="profile" element={<Profile/>}/>   
                    <Route path="banking" element={<Banking/>}/>   
                    <Route path="address" element={<Address/>}/>   
                    <Route path="password" element={<Password/>}/>   
                    <Route path="notification" element={<Notification/>}/>   
                    <Route path="order" element={<Order/>}/>   
                </Routes>
            </div>
        </div>
    );
}

export default Account;
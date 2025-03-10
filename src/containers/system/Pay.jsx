import { NavLink } from 'react-router-dom';
import {HeaderNav, LoveButton, Button} from '../../components'
import icons from '../../util/icons';

const {FaMapMarkerAlt, BsTag} = icons;

const Pay = () => {
    return (
        <>
            <div className="w-full bg-white py-2.5"
            style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)'}}>
                <div className="px-[10%] w-full flex items-center justify-between">
                    <HeaderNav>Thanh toán</HeaderNav>
                </div>
            </div>
            <div className="w-full px-[10%] mt-5">
                <div className="w-full bg-white"
                style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)'}}>
                    <div className="w-full h-[3px] bg_pay"></div>
                    <div className="pt-7 pl-[30px] pb-6">
                        <div className="flex items-center mb-5">
                            <FaMapMarkerAlt className='text-[#2f904b] text-[1.225rem] mr-[9px]'/>
                            <h5 className=' capitalize text-[1.425rem]'>
                                địa chỉ nhận hàng
                            </h5>
                        </div>
                        <div className="w-full flex items-center">
                            <h5 className='text-[18px] line-clamp-1 max-w-[700px]'>
                                <span className='font-[600] mr-2.5 line-clamp-'>Huy Hùng (+84) 974226659</span>
                                thôn Kênh Trạch, xã Hưng Nhân, huyện Vĩnh Bảo, Hải Phòng
                            </h5>
                            <div className="ml-[1.5rem] border border-[#2f904b] py-[2px] px-[5px] uppercase text-[10px] text-[#2f904b]">
                                mặc định
                            </div>
                            <div className="ml-[2.5rem] capitalize text-blue-600 cursor-pointer">
                                thay đổi
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white mt-5 px-[30px] border-b-[0.1px] border-[#cbd0dd]"
                style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)'}}>
                    <div className="pt-6 pb-3 flex items-center">
                        <div className="w-2/3 text-[25px]">
                            Sản phẩm
                        </div>
                        <div className="w-1/3 text-[18px] flex text-[#888]">
                            <div className="w-1/3 text-center">Đơn giá</div>
                            <div className="w-1/3 text-center">Số lượng</div>
                            <div className="w-1/3 text-center">Thành tiền</div>
                        </div>
                    </div>
                    <div className="py-3 flex">
                        <LoveButton/>
                        <h3 className='text-[17px] font-[600] ml-1'>Thang máy Việt Phát</h3>
                    </div>
                    <ul className="w-full pb-8">
                        <li className="w-full py-2.5 flex items-center">
                            <div className="w-2/3 flex items-center">
                                <NavLink to={'/products/:slug'}>
                                    <img src="/img/products/1.png" alt="ảnh sản phẩm" 
                                    className='w-[80px] h-[80px] border border-[#cbd0dd]'/>
                                </NavLink>
                                <h5 className='mr-4 text-[17px] text-[#222] line-clamp-1 ml-2.5 max-w-[400px]'>
                                    Hệ thống mở cửa tự động ADA dành cho cử thang máy, cửa kính
                                </h5>
                                <h5 className='text-[17px] text-[#888] line-clamp-1'>
                                    Loại: Linh kiện điện
                                </h5>
                            </div>
                            <div className="w-1/3 text-[18px] flex text-[#888]">
                                <div className="w-1/3 text-center">₫3.600.000</div>
                                <div className="w-1/3 text-center">1</div>
                                <div className="w-1/3 text-center">₫3.600.000</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-full bg-[#fafdff] px-[30px] border-b-dash">
                    <div className="w-full flex">
                        <div className="w-4/10 flex items-center border-r-dash py-10">
                            <div className="w-full flex items-center gap-2.5">
                                <span className='line-clamp-1'>Lời nhắn:</span>
                                <input type="text" placeholder='Lưu ý cho người bán...'
                                className='border border-[#cbd0dd] py-[6px] px-[15px] w-[80%]'/>
                            </div>
                        </div>
                        <div className="w-6/10 py-[25px] pl-[25px]">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center line-clamp-1">
                                    Phương thức thanh toán:
                                    <span className='ml-2.5'>Thanh toán khi nhận hàng</span>
                                </div>
                                <span className='ml-15 capitalize text-[18px] text-blue-600 cursor-pointer'>thay đổi</span>
                            </div>
                            <div className="flex items-center line-clamp-1 justify-between mt-5">
                                <div className="flex items-center gap-2">
                                    <BsTag className='text-[23px] text-[#2f904b]'/>
                                    Voucher của Shop
                                </div>
                                <span className='ml-15 capitalize cursor-pointer text-[18px] text-blue-600'>Chọn Voucher</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#fafdff] px-[30px] border-b-dash flex justify-end py-6 items-center">
                    Tổng số tiền(1 sản phẩm):
                    <span className='ml-10 text-[25px] text-[#2f904b]'>₫3.600.000</span> 
                </div>
                <div className="w-full bg-white box_shadow_div mt-8">
                    <div className="px-[30px] flex items-center h-[100px] w-full text-[23px] border-b-dash">
                        Thanh toán | Đặt hàng
                    </div>
                    <div className="pt-5 bg-[rgba(192,247,195,0.3)]">
                        <div className="w-full px-[30px] flex items-center justify-end border-b-dash pb-4">
                            <div className="text-[#888] text-[18px] min-w-[300px]">
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng tiền hàng
                                    <h5>₫3.600.000</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng vận chuyển
                                    <h5>₫100.000</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng giảm giá
                                    <h5>₫0</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4 items-center">
                                    Tổng tiền hàng
                                    <h5 className='text-[26px] text-[#2f904b]'>₫3.700.000</h5>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-[30px] flex items-center justify-between text-[18px] text-[#888] py-6">
                            <h5>Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo  
                                <NavLink className={"ml-1 text-blue-600"}>
                                    Điều Khoản Việt Phát
                                </NavLink>
                            </h5>
                            <Button>
                                đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Pay
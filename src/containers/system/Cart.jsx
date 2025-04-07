import { NavLink } from 'react-router-dom';
import {SearchProperty, QuantityButton, Button,HeaderNav} from '../../components'
import icons from '../../util/icons';
import { useSelector } from 'react-redux';
import {formatMoney} from '../../util/formatMoney';
const { FiSearch, FaCaretDown, BsTag, FiTruck, PiShoppingCartBold} = icons;

const Cart = () => {
    const {cartUser, productCart} = useSelector(state => state.app);
    return (
        <>
            <div className="w-full bg-white py-2.5">
                <div className="px-[10%] w-full flex items-center justify-between">
                    <HeaderNav icon={<PiShoppingCartBold className='text-[30px] text-[#2f904b]'/>}>
                        giỏ hàng
                    </HeaderNav>
                    <div className="max-w-1/2 w-full">
                        <SearchProperty>
                            <FiSearch className='text-[20px]'/>
                        </SearchProperty>
                    </div>
                </div>
            </div>
            <div className="w-full px-[10%] my-5">
                <div 
                className="w-full bg-white flex items-center justify-between py-2.5 text-[#888] h-[55px] "
                style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)'}}>
                    <div className="w-1/2 flex items-center gap-1">
                        <div className="w-[50px] flex items-center justify-center">
                            <input type="checkbox" className=' scale-[1.3]'/>
                        </div>
                        <h5>Sản phẩm</h5>
                    </div>
                    <div className="w-1/2 flex items-center justify-between">
                        <div className="w-1/4 text-center">
                            Đơn giá
                        </div>
                        <div className="w-1/4 text-center">
                            Số lượng
                        </div>
                        <div className="w-1/4 text-center">
                            Số tiền
                        </div>
                        <div className="w-1/4 text-center">
                            Thao tác
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    {productCart && productCart.length > 0 ? productCart.map((item) => (
                        <div key={item._id}
                        className="w-full  border-t border-[#cbd0dd] cart_items">
                            <div className="w-full bg-white flex items-center justify-between py-5  "
                            style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)'}}>
                                <div className="w-1/2 flex items-center gap-2.5 ">
                                    <div className="w-[50px] flex items-center justify-center">
                                        <input type="checkbox" className=' scale-[1.3]'/>
                                    </div>
                                    <NavLink>
                                        <img src={item.thumbnail_main} alt="ảnh sản phẩm" 
                                        className='w-[100px] h-[100px] border border-[#cbd0dd]'/>
                                    </NavLink>
                                    <div className="text-[17px] text-[#000000be]">
                                        <h5 className='line-clamp-1 capitalize'>
                                            {item.name}
                                        </h5>
                                        <h5 className='line-clamp-1'>
                                            {item.category}
                                        </h5>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-center justify-between pr-2.5">
                                    <div className="w-1/4 text-center">
                                        {formatMoney(item.price)}đ
                                    </div>
                                    <div className="w-1/4 flex items-center justify-center">
                                        <QuantityButton/>
                                    </div>
                                    <div className="w-1/4 text-center">
                                        3.600.000đ
                                    </div>
                                    <div className="w-1/4 text-center">
                                        <NavLink
                                        className={'capitalize text-blue-600'}>
                                            xóa
                                        </NavLink>
                                        <div className='line-clamp-2 flex items-center gap 2.5'>
                                            Tìm kiếm sản phẩm tương tự 
                                            <FaCaretDown className='cursor-pointer text-[18px]'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center bg-white border-t border-[#cbd0dd] h-[55px]">
                                <div className="w-[50px] flex items-center justify-center">
                                    <BsTag className='text-[23px] text-[#2f904b]'/>
                                </div>
                                <h5>Voucher giảm đến 200k Xem thêm Voucher</h5>
                                <h5 className="ml-5 cursor-pointer text-blue-600">Xem thêm Voucher</h5>
                            </div>
                            <div className="w-full flex items-center bg-white border-t border-[#cbd0dd] h-[55px]">
                                <div className="w-[50px] flex items-center justify-center">
                                    <FiTruck className='text-[21px] text-[#2f904b]'/>
                                </div>
                                <h5>Voucher giảm đến 200k Xem thêm Voucher</h5>
                                <h5 className="ml-5 cursor-pointer text-blue-600">Xem thêm Voucher</h5>
                            </div>
                        </div>
                    )) 
                    : 
                    "Chưa có sản phẩm nào trong giỏ hàng"}
                    
                </div>
                <div 
                className="w-full bg-white flex items-center justify-between py-2.5 text-[#888] h-[55px] mt-5"
                style={{boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)'}}>
                    <div className="w-1/2 flex items-center gap-1">
                        <div className="w-[50px] flex items-center justify-center">
                            <input type="checkbox" className=' scale-[1.3]'/>
                        </div>
                        <h5>Chọn tất cả</h5>
                    </div>
                    <div className="w-1/2 flex items-center justify-end pr-2.5 gap-2.5">
                        <h5>Tổng thanh toán (0 sản phẩm): ₫0</h5>
                        <NavLink to={"/pay"}>
                            <Button>
                                mua ngay                                    
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Cart
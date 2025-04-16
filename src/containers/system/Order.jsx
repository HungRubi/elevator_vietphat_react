import { useDispatch, useSelector } from 'react-redux';
import {LoveButton, Button, SearchProperty, ModalQuestion} from '../../components';
import icons from '../../util/icons';
import { useState, useCallback, useEffect } from 'react';
import {formatMoney} from '../../util/formatMoney'
import { NavLink, useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions';

const {FiTruck} = icons;
const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, currentUser } = useSelector(state => state.user);
    const [active, setActive] = useState(0);
    const [orderHanle, setOrderHanle] = useState([]);
    const [orderDelivery, setOrderDelivery] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState([]);
    const [orderFail, setOrderFail] = useState([]);
    
    useEffect(() => {
        if (orders) {
            const handleOrders = orders?.filter(item => item.status === 'Đang xử lý');
            const deliveryOrders = orders?.filter(item => item.status === 'Đang giao hàng');
            const successOrders = orders?.filter(item => item.status === 'Thành công');
            const failOrders = orders?.filter(item => item.status === 'Thất bại');

            setOrderHanle(handleOrders);
            setOrderDelivery(deliveryOrders);
            setOrderSuccess(successOrders);
            setOrderFail(failOrders);
        }
    }, [orders]);

    const tab = [
        {
            title: 'Tất cả',
            length: orders?.length || 0
        },
        {
            title: 'Chờ xử lý',
            length: orderHanle?.length || 0
        },
        {
            title: 'Đang giao hàng',
            length: orderDelivery?.length || 0
        },
        {
            title: 'Đã giao hàng',
            length: orderSuccess?.length || 0
        },
        {
            title: 'Đã hủy',
            length: orderFail?.length || 0
        },
        {
            title: 'Trả hàng',
            length: 0
        },
    ]
    const hanleCanCelOrder = useCallback((orderId) => {
        return () => {
            const data = {
                status: 'Thất bại',
                userId: currentUser?._id
            };
            dispatch(actions.updateOrder(orderId, data));
        };
    }, [dispatch, currentUser]);

    const handleBuyAgain = useCallback((order) => {
        const products = order.orderDetails.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));
        dispatch(actions.setSelectedProducts(products));
        navigate('/pay');
    }, [dispatch, navigate]);

    return (
        <div className="ml-8 flex-1">
            <div className="flex items-center justify-between bg-white w-full">
                {tab.map((item, index) => (
                    <div key={index} 
                    className={`text-center py-2.5 px-[25px] flex whitespace-nowrap border-b-[2px] border-transparent cursor-pointer hover:border-[#2f904b] transition duration-300 ease-linear ${active === index ? "!border-b-[#2f904b] text-[#2f904b]" : "text-[#888]"}`}
                    onClick={() => setActive(index)}>
                        {item.title}
                        <span className='ml-1'>({item.length})</span>
                    </div>
                ))}
            </div>
            <SearchProperty>search</SearchProperty>
            {active === 0 ? (
                <>
                    {orders && orders.length > 0 ? orders.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                            {item.status === 'Đang xử lý' ? (
                                                <Button onClick={hanleCanCelOrder(item._id)}
                                                className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                    hủy đơn
                                                </Button>
                                            ) : (
                                                <>
                                                </>

                                            )}
                                            {item.status === 'Thất bại' ? (
                                                <Button onClick={() => handleBuyAgain(item)}>
                                                    mua lại
                                                </Button>
                                            ) : (
                                                <>

                                                </>

                                            )}
                                            {item.status === 'Thành công' ? (
                                                <>
                                                    <ModalQuestion products={item.orderDetails.map(detail => detail.product)} />
                                                    <Button
                                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                        Trả hàng
                                                    </Button>
                                                </>
                                            ) : (
                                                <>

                                                </>

                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Bạn chưa có đơn hàng nào được đặt
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
            {active === 1 ? (
                <>
                    {orderHanle && orderHanle.length > 0 ? orderHanle.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                            <Button onClick={hanleCanCelOrder(item._id)}
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                hủy đơn
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Không có đơn hàng nào đang xử lý
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
            {active === 2 ? (
                <>
                    {orderDelivery && orderDelivery.length > 0 ? orderDelivery.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Không có đơn hàng nào đang giao
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
            {active === 3 ? (
                <>
                    {orderSuccess && orderSuccess.length > 0 ? orderSuccess.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                            <ModalQuestion products={item.orderDetails.map(detail => detail.product)} />
                                            <Button
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                Trả hàng
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Bạn chưa có đơn hàng nào đã được giao
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
            {active === 4 ? (
                <>
                    {orderFail && orderFail.length > 0 ? orderFail.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                            <Button onClick={() => handleBuyAgain(item)}
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                mua lại
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Bạn chưa hủy đơn hàng nào
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
            {active === 5 ? (
                <>
                    {orderFail && orderFail.length > 0 ? orderFail.map(item => (
                        <ul className="w-full mt-5" key={item._id}>
                            <li className="w-full mb-5" >
                                <div className="bg-white w-full px-5">
                                    <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <LoveButton/>
                                            <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                                Thang máy Việt Phát
                                            </h5>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <FiTruck className='text-[20px] text-[#26aa99]'/>
                                            <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                                {item.status}
                                            </span>
                                            <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                                {item.status}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <ul className="w-full">
                                        {item.orderDetails.map((product, index) => (
                                            <li key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex gap-2.5 w-[70%]">
                                                        <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                            <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                            className='w-full object-cover' />
                                                        </div>
                                                        <div className="max-w-[70%]">
                                                            <h5 className="text-[17px] line-clamp-1">
                                                                {product.product.name}
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Đơn giá: {formatMoney(product.product.price)}đ
                                                            </h5>
                                                            <h5 className="text-[15px] line-clamp-1">
                                                                Số lượng: x{product.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex justify-end items-center gap-2.5">
                                                        <h6 className='line-through text-[17px] text-[#888]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        <h6 className='text-[25px] text-[#2f904b]'>
                                                            {formatMoney(product.quantity * product.product.price)}đ
                                                        </h6>
                                                        productDetail                                                    </div>
                                                </div>
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                    <div className="pt-5 px-5 pb-3 text-right">
                                        <h5 className='text-[15px]'>
                                            Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                        <div className="w-1/2 ">
                                            <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                                Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                                Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                            </p>                            
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end gap-2.5">
                                            <Button>
                                                liên hệ ngay
                                            </Button>
                                            <Button onClick={() => handleBuyAgain(item)}
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                hủy đơn
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )) : (
                        <div className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                        style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                            <img src="/img/orderEmpty.png" alt="" 
                            className='object-cover'/>
                            <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                                Bạn chưa có đơn hàng nào trả lại
                            </h5>
                            <NavLink to="/products">
                                <Button>
                                    Mua hàng ngay
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </>
            ): (
                <></>
            )}
        </div>
    );
};

export default Order;
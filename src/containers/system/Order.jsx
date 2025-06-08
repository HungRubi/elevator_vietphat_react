import { useDispatch, useSelector } from 'react-redux';
import { SearchProperty, ListOrder} from '../../components';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions';


const Order = () => {
    const dispatch = useDispatch();
    const { orders, currentUser } = useSelector(state => state.user);
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    useEffect(() => {
        dispatch(actions.getOrderByUser(currentUser?._id));

    }, [dispatch, currentUser])
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const [orderHanle, setOrderHanle] = useState([]);
    const [orderDelivery, setOrderDelivery] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState([]);
    const [orderFail, setOrderFail] = useState([]);
    
    useEffect(() => {
        if (orders) {
            const handleOrders = sortedOrders?.filter(item => item.status === 'Đang xử lý');
            const deliveryOrders = sortedOrders?.filter(item => item.status === 'Đang giao hàng');
            const successOrders = sortedOrders?.filter(item => item.status === 'Thành công');
            const failOrders = sortedOrders?.filter(item => item.status === 'Thất bại');

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
            {active === 0 && orders && orders?.length > 0 && (
                <ListOrder orders={sortedOrders} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            {active === 1 && orderHanle && orderHanle.length > 0 && (
                <ListOrder orders={orderHanle} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            {active === 2 && orderDelivery && orderDelivery.length > 0 && (
                <ListOrder orders={orderDelivery} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            {active === 3 && orderSuccess && orderSuccess.length > 0 && (
                <ListOrder orders={orderSuccess} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            {active === 4 && orderFail && orderFail.length > 0 && (
                <ListOrder orders={orderFail} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            {active === 5 && orderFail && orderFail.length > 0 && (
                <ListOrder orders={orderFail} handleBuyAgain={handleBuyAgain} hanleCanCelOrder={hanleCanCelOrder}/>
            )}
            
        </div>
    );
};

export default Order;
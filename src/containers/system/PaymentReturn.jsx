import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { formatMoney } from '../../util/formatMoney';
import * as actions from '../../store/actions';
import icons from '../../util/icons';

const {MdError} = icons;


const PaymentReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hasOrdered = useRef(false);

  const { dataPayment, message } = useSelector((state) => state.app);
  const { inforOrder, currentUser } = useSelector((state) => state.user);

  // Process payment check on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    dispatch(actions.paymentCheckOut(searchParams));
  }, [dispatch, location.search]);
  useEffect(() => {
    if (dataPayment && inforOrder && !hasOrdered.current) {
      hasOrdered.current = true;
      const orderData = {
        ...inforOrder,
        orderInfor: dataPayment.vnp_OrderInfo || 'N/A',
        code_banking: dataPayment.vnp_BankTranNo || 'N/A',
      };
      const orderedProductIds = inforOrder.items?.map((item) => item.product_id);
      dispatch(actions.resetInforOrder());
      if(message === 'Thanh toán thành công!') {
        dispatch(actions.addOrder(orderData));
        dispatch(actions.deleteCartItem({ productId: orderedProductIds }, currentUser?._id));
      }
    }
  }, [dataPayment, inforOrder, dispatch, currentUser, message]);

  return (
    <div className="bg-gray-100">
      <div className="bg-white p-6 md:mx-auto">
        {message === 'Thanh toán thành công!' ? (
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
        ) : (
          <MdError className="text-red-600 w-25 h-25 mx-auto my-6" />
        )}
        
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {message === 'Thanh toán thành công!' ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}
          </h3>
          <p className="text-gray-600 my-2">{message === 'Thanh toán thành công!' ? 'Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn.' : 'Xin lỗi, đã xảy ra lỗi trong quá trình thanh toán.'}</p>
          {message === 'Thanh toán thành công!' && (
            <div className="text-gray-600 my-2">
              <p>Mã đơn hàng: {dataPayment?.vnp_TxnRef || 'N/A'}</p>
              <p>Tổng tiền: {formatMoney(dataPayment?.vnp_Amount / 100 || 0)} VNĐ</p>
              <p>Phương thức thanh toán: {dataPayment?.vnp_BankCode || 'N/A'}</p>
            </div>
          )}
          <p>Chúc bạn một ngày tốt lành!</p>
          <div className="py-10 text-center">
            <NavLink
              to="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              QUAY LẠI TRANG CHỦ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;
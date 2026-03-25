import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { formatMoney } from '../../util/formatMoney';
import * as actions from '../../store/actions';
import icons from '../../util/icons';

const { MdError } = icons;

const PaymentReturn = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const hasOrdered = useRef(false);

    const { dataPayment, message } = useSelector((state) => state.app);
    const { inforOrder, currentUser } = useSelector((state) => state.user);

    const ok = message === 'Thanh toán thành công';

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
            if (message === 'Thanh toán thành công') {
                dispatch(actions.addOrder(orderData));
                dispatch(
                    actions.deleteCartItem({ productId: orderedProductIds }, currentUser?._id)
                );
            }
        }
    }, [dataPayment, inforOrder, dispatch, currentUser, message]);

    return (
        <>
            <Helmet>
                <title>
                    {ok ? 'Thanh toán thành công' : 'Thanh toán'} - Thang máy Việt Phát
                </title>
            </Helmet>

            <div className="min-h-[calc(100vh-120px)] bg-[var(--color-bg)] px-4 py-10 sm:py-14">
                <div className="mx-auto max-w-lg">
                    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-[0_24px_64px_rgba(2,6,23,0.08)]">
                        <div
                            className={`h-1.5 ${ok ? 'bg-gradient-to-r from-[var(--color-primary)] to-emerald-300' : 'bg-gradient-to-r from-rose-400 to-amber-300'}`}
                        />
                        <div className="px-6 py-10 text-center sm:px-8">
                            {ok ? (
                                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--color-primary)] ring-2 ring-emerald-100">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="size-11"
                                        aria-hidden
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-2 ring-rose-100">
                                    <MdError className="size-11" aria-hidden />
                                </div>
                            )}

                            <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
                                {ok ? 'Thanh toán thành công' : 'Thanh toán chưa hoàn tất'}
                            </h1>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {ok
                                    ? 'Cảm ơn bạn đã thanh toán trực tuyến. Đơn hàng sẽ được xử lý sớm.'
                                    : 'Giao dịch có thể bị hủy hoặc lỗi cổng thanh toán. Bạn có thể thử lại hoặc chọn phương thức khác.'}
                            </p>

                            {ok && (
                                <dl className="mt-8 space-y-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4 text-left text-sm">
                                    <div className="flex justify-between gap-4">
                                        <dt className="text-slate-500">Mã giao dịch</dt>
                                        <dd className="font-semibold text-slate-900">
                                            {dataPayment?.vnp_TxnRef || '—'}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <dt className="text-slate-500">Số tiền</dt>
                                        <dd className="font-bold tabular-nums text-[var(--color-primary)]">
                                            {formatMoney((dataPayment?.vnp_Amount || 0) / 100)} đ
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <dt className="text-slate-500">Ngân hàng</dt>
                                        <dd className="font-semibold text-slate-900">
                                            {dataPayment?.vnp_BankCode || '—'}
                                        </dd>
                                    </div>
                                </dl>
                            )}

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <NavLink
                                    to="/account/order"
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                                >
                                    Xem đơn hàng
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600"
                                >
                                    Về trang chủ
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentReturn;

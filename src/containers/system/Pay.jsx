import { NavLink, useNavigate } from 'react-router-dom';
import { Button, ModalAddress, ModalDiscount } from '../../components';
import icons from '../../util/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect, useState, useRef } from 'react';
import * as actions from '../../store/actions';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import { formatMoney, convertToWords } from '../../util/formatMoney';

const {
    FaMapMarkerAlt,
    BsTag,
    PiShoppingCartBold,
    AiOutlineLeft,
    RiBillLine,
    IoShieldCheckmarkOutline,
    FiTruck,
} = icons;

const Pay = () => {
    const VAT = 0.1;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProducts, currentUser, selectedVoucher } = useSelector(
        (state) => state.user
    );
    const { message, paymentUrl } = useSelector((state) => state.app);

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [orderNote, setOrderNote] = useState('');
    const prevPaymentMethod = useRef(paymentMethod);

    const hasItems =
        Array.isArray(selectedProducts) && selectedProducts.length > 0;

    const totalPrice = useMemo(
        () =>
            selectedProducts?.reduce(
                (acc, item) =>
                    acc +
                    (Number(item?.product?.price) || 0) *
                        (Number(item?.quantity) || 0),
                0
            ) || 0,
        [selectedProducts]
    );
    const totalQuantity = useMemo(
        () =>
            selectedProducts?.reduce(
                (acc, item) => acc + (Number(item?.quantity) || 0),
                0
            ) || 0,
        [selectedProducts]
    );
    const totalShippingCost = useMemo(
        () =>
            selectedProducts?.reduce(
                (acc, item) =>
                    acc + (Number(item?.product?.shipping_cost) || 0),
                0
            ) || 0,
        [selectedProducts]
    );

    const subTotal =
        totalPrice +
        totalShippingCost -
        (Number(selectedVoucher?.value_discount) || 0);
    const moneyVat = Math.max(0, subTotal) * VAT;
    const total = Math.max(0, subTotal + moneyVat);

    const orderData = useMemo(
        () => ({
            user_id: currentUser?._id,
            total_price: total,
            shipping_address: {
                name: currentUser?.name,
                phone: currentUser?.phone,
                address: currentUser?.address,
            },
            payment_method:
                paymentMethod === 'cod'
                    ? 'Thanh toán khi nhận hàng'
                    : 'Atm nội địa',
            items: selectedProducts?.map((item) => ({
                product_id: item.product._id,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity,
            })),
            status: 'Đang xử lý',
            discount_id: selectedVoucher?._id,
            ...(orderNote.trim()
                ? { note: orderNote.trim() }
                : {}),
        }),
        [
            currentUser,
            paymentMethod,
            selectedProducts,
            selectedVoucher,
            total,
            orderNote,
        ]
    );

    useEffect(() => {
        if (!hasItems) {
            navigate('/cart', { replace: true });
        }
    }, [hasItems, navigate]);

    useEffect(() => {
        dispatch(actions.getDiscounts());
    }, [dispatch]);

    /* Chỉ khi vừa chuyển sang bank — tránh gọi API lặp khi total/orderData đổi */
    useEffect(() => {
        const switchedToBank =
            paymentMethod === 'bank' &&
            prevPaymentMethod.current !== 'bank';
        prevPaymentMethod.current = paymentMethod;

        if (!switchedToBank) return;
        if (total <= 0) {
            alert(
                'Tổng thanh toán không hợp lệ. Vui lòng kiểm tra giỏ hàng hoặc chọn COD.'
            );
            setPaymentMethod('cod');
            return;
        }
        dispatch(actions.setInforOrder(orderData));
        dispatch(actions.createPaymentUrl({ amount: total }));
    }, [paymentMethod, dispatch, total, orderData]);

    useEffect(() => {
        if (paymentMethod === 'bank' && paymentUrl) {
            window.location.href = paymentUrl;
        }
    }, [paymentMethod, paymentUrl]);

    useEffect(() => {
        if (message === 'Tạo đơn hàng thành công' && paymentMethod === 'cod') {
            const orderedProductIds = selectedProducts.map(
                (item) => item.product._id
            );
            dispatch(
                actions.deleteCartItem(
                    { productId: orderedProductIds },
                    currentUser?._id
                )
            );
            dispatch(actions.getNotifiByUser(currentUser?._id));
            navigate('/account/order');
        }
    }, [
        message,
        navigate,
        dispatch,
        selectedProducts,
        currentUser,
        paymentMethod,
    ]);

    const handleExportInvoice = async () => {
        try {
            const template = await loadFile('/template_order.docx');
            const zip = new PizZip(template);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            const today = new Date();
            const data = {
                order_code: 'Vui lòng đặt hàng để có mã đơn hàng',
                name: currentUser?.name || '',
                phone: currentUser?.phone || '',
                address: currentUser?.address || '',
                p: selectedProducts?.map((item, index) => ({
                    no: index + 1,
                    productName: item.product.name || '',
                    unit: item.product.unit || '',
                    quantity: item.quantity || 0,
                    price: formatMoney(item.product.price) || '0',
                    purchers: formatMoney(
                        item.product.price * item.quantity
                    ) || '0',
                    shipping: formatMoney(item.product.shipping_cost) || 0,
                })),
                shipping: formatMoney(totalShippingCost) || 0,
                vat: formatMoney(subTotal <= 0 ? 0 : moneyVat),
                discount: formatMoney(selectedVoucher?.value_discount) || 0,
                totalPrice: formatMoney(total) || '0',
                stringPrice: convertToWords(total) || 'không đồng',
                date: today.getDate(),
                month: today.getMonth() + 1,
            };

            doc.render(data);
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(out, `HoaDon_${Date.now()}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };

    const handleAddOrder = () => {
        if (!hasItems) return;
        dispatch(actions.addOrder(orderData));
    };

    if (!hasItems) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center bg-[var(--color-bg)] px-4">
                <p className="text-slate-500">Đang chuyển tới giỏ hàng…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pb-32 lg:pb-12">
            <div className="border-b border-slate-200 bg-[var(--color-surface)]">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/cart"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]"
                        >
                            <AiOutlineLeft className="text-lg" />
                            Giỏ hàng
                        </NavLink>
                        <span
                            className="hidden h-4 w-px bg-slate-200 sm:block"
                            aria-hidden
                        />
                        <div className="flex items-center gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                <PiShoppingCartBold className="text-xl" />
                            </span>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                                    Thanh toán
                                </h1>
                                <p className="text-xs text-slate-500">
                                    {totalQuantity} sản phẩm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bước tiến trình */}
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
                <ol className="flex items-center justify-center gap-2 text-xs font-semibold sm:gap-4 sm:text-sm">
                    {[
                        { n: 1, t: 'Giỏ hàng', done: true },
                        { n: 2, t: 'Thanh toán', done: true },
                        { n: 3, t: 'Hoàn tất', done: false },
                    ].map((step, i) => (
                        <li key={step.n} className="flex items-center gap-2">
                            {i > 0 ? (
                                <span
                                    className="hidden h-px w-6 bg-slate-200 sm:block sm:w-10"
                                    aria-hidden
                                />
                            ) : null}
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs sm:h-9 sm:w-9 ${
                                    step.done
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'border-2 border-slate-200 bg-white text-slate-400'
                                }`}
                            >
                                {step.n}
                            </span>
                            <span
                                className={
                                    step.done
                                        ? 'text-slate-900'
                                        : 'text-slate-400'
                                }
                            >
                                {step.t}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-10">
                <div className="space-y-6">
                    {/* Địa chỉ */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-sm">
                        <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-emerald-300" />
                        <div className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-xl text-[var(--color-primary)]" />
                                    <h2 className="text-base font-bold text-slate-900">
                                        Địa chỉ nhận hàng
                                    </h2>
                                </div>
                                <ModalAddress />
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm sm:text-base">
                                <p className="font-semibold text-slate-900">
                                    {currentUser?.name}
                                </p>
                                <span className="text-slate-400">·</span>
                                <p className="tabular-nums text-slate-700">
                                    {currentUser?.phone}
                                </p>
                                <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                                    Mặc định
                                </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {currentUser?.address?.trim()
                                    ? currentUser.address
                                    : 'Chưa cập nhật địa chỉ'}
                            </p>
                        </div>
                    </section>

                    {/* Sản phẩm */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-sm">
                        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                            <h2 className="font-bold text-slate-900">
                                Đơn hàng của bạn
                            </h2>
                            <p className="text-xs text-slate-500">
                                Kiểm tra sản phẩm trước khi đặt
                            </p>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {selectedProducts.map((item) => (
                                <li
                                    key={item.product._id}
                                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                >
                                    <div className="flex min-w-0 gap-4">
                                        <NavLink
                                            to={`/products/detail/${item.product.slug}`}
                                            className="h-20 w-20 shrink-0 overflow-hidden bg-slate-100"
                                        >
                                            <img
                                                src={item.product.thumbnail_main}
                                                alt=""
                                                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                            />
                                        </NavLink>
                                        <div className="min-w-0">
                                            <NavLink
                                                to={`/products/detail/${item.product.slug}`}
                                                className="line-clamp-2 font-semibold text-slate-900 hover:text-[var(--color-primary)]"
                                            >
                                                {item.product.name}
                                            </NavLink>
                                            <p className="mt-1 text-sm text-slate-500">
                                                SL:{' '}
                                                <span className="font-medium text-slate-800">
                                                    {item.quantity}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-end justify-between gap-6 sm:flex-col sm:items-end sm:text-right">
                                        <p className="text-xs text-slate-500 sm:hidden">
                                            Thành tiền
                                        </p>
                                        <p className="text-lg font-bold tabular-nums text-[var(--color-primary)]">
                                            ₫
                                            {formatMoney(
                                                item.product.price *
                                                    item.quantity
                                            )}
                                        </p>
                                        <p className="hidden text-sm tabular-nums text-slate-500 sm:block">
                                            ₫{formatMoney(item.product.price)}{' '}
                                            × {item.quantity}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Ghi chú + phương thức + voucher */}
                    <section className="space-y-4">
                        <div className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                            <label
                                htmlFor="pay-order-note"
                                className="text-sm font-semibold text-slate-800"
                            >
                                Lời nhắn cho người bán
                            </label>
                            <input
                                id="pay-order-note"
                                type="text"
                                value={orderNote}
                                onChange={(e) => setOrderNote(e.target.value)}
                                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao…"
                                className="mt-2 w-full border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white"
                            />
                        </div>

                        <div className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                            <h3 className="text-sm font-bold text-slate-900">
                                Phương thức thanh toán
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Chọn một hình thức phù hợp
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex flex-col items-start gap-2 border-2 p-4 text-left transition ${
                                        paymentMethod === 'cod'
                                            ? 'border-[var(--color-primary)] bg-emerald-50/50'
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <FiTruck className="text-2xl text-[var(--color-primary)]" />
                                    <span className="font-bold text-slate-900">
                                        Thanh toán khi nhận hàng
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        COD — kiểm tra hàng rồi thanh toán
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`flex flex-col items-start gap-2 border-2 p-4 text-left transition ${
                                        paymentMethod === 'bank'
                                            ? 'border-[var(--color-primary)] bg-emerald-50/50'
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <RiBillLine className="text-2xl text-[var(--color-primary)]" />
                                    <span className="font-bold text-slate-900">
                                        Chuyển khoản / QR
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        Chuyển tới cổng thanh toán an toàn
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] px-5 py-4 shadow-sm sm:px-6">
                            <div className="flex items-center gap-2">
                                <BsTag className="text-xl text-[var(--color-primary)]" />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        Voucher giảm giá
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {selectedVoucher
                                            ? selectedVoucher.title
                                            : 'Chưa chọn voucher'}
                                    </p>
                                </div>
                            </div>
                            <ModalDiscount />
                        </div>
                    </section>

                    {/* Điều khoản + nút — desktop */}
                    <div className="hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-6 lg:block">
                        <p className="text-sm text-slate-600">
                            Bấm &quot;Đặt hàng&quot; nghĩa là bạn đồng ý với{' '}
                            <NavLink
                                to="/about-us"
                                className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
                            >
                                thông tin &amp; điều khoản
                            </NavLink>{' '}
                            của Việt Phát.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Button
                                onClick={handleAddOrder}
                                className="!rounded-xl !px-8 !py-3.5 !normal-case !text-base !font-bold"
                            >
                                Đặt hàng
                            </Button>
                            <Button
                                type="button"
                                onClick={handleExportInvoice}
                                className="!rounded-xl !border !border-slate-300 !bg-white !px-6 !py-3.5 !normal-case !font-semibold !text-slate-800 hover:!bg-slate-50"
                            >
                                Xuất hóa đơn (xem trước)
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Cột tóm tắt — sticky */}
                <aside className="lg:sticky lg:top-6">
                    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-lg">
                        <div className="border-b border-slate-100 bg-slate-50/90 px-5 py-4">
                            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
                                Tóm tắt thanh toán
                            </h2>
                        </div>
                        <div className="space-y-3 p-5 text-sm">
                            <div className="flex justify-between gap-4 text-slate-600">
                                <span>Tạm tính ({totalQuantity} SP)</span>
                                <span className="tabular-nums font-medium text-slate-900">
                                    ₫{formatMoney(totalPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between gap-4 text-slate-600">
                                <span>Phí vận chuyển</span>
                                <span className="tabular-nums font-medium text-slate-900">
                                    ₫{formatMoney(totalShippingCost)}
                                </span>
                            </div>
                            <div className="flex justify-between gap-4 text-slate-600">
                                <span>Giảm giá</span>
                                <span className="tabular-nums font-medium text-emerald-700">
                                    −₫
                                    {formatMoney(
                                        selectedVoucher?.value_discount || 0
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between gap-4 text-slate-600">
                                <span>VAT (10%)</span>
                                <span className="tabular-nums font-medium text-slate-900">
                                    ₫{formatMoney(subTotal <= 0 ? 0 : moneyVat)}
                                </span>
                            </div>
                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-end justify-between gap-4">
                                    <span className="text-sm font-bold text-slate-800">
                                        Tổng cộng
                                    </span>
                                    <span className="text-2xl font-black tabular-nums text-[var(--color-primary)]">
                                        ₫{formatMoney(total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 bg-emerald-50/40 px-5 py-4">
                            <div className="flex gap-2 text-xs text-slate-600">
                                <IoShieldCheckmarkOutline className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                                <span>
                                    Thanh toán được mã hóa qua hệ thống đối tác.
                                    COD không cần trả trước.
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Mobile: thanh hành động */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[var(--color-surface)]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
                <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-slate-500">Tổng cộng</p>
                        <p className="text-lg font-black tabular-nums text-[var(--color-primary)]">
                            ₫{formatMoney(total)}
                        </p>
                    </div>
                    <Button
                        onClick={handleAddOrder}
                        className="!shrink-0 !rounded-xl !px-6 !py-3 !normal-case !font-bold"
                    >
                        Đặt hàng
                    </Button>
                </div>
                <p className="mx-auto mt-2 max-w-lg text-center text-[10px] text-slate-500">
                    Đặt hàng = đồng ý{' '}
                    <NavLink
                        to="/about-us"
                        className="text-[var(--color-primary)] underline"
                    >
                        điều khoản
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Pay;

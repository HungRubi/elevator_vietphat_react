import { NavLink, useNavigate } from 'react-router-dom';
import { HeaderNav, LoveButton, Button, ModalAddress, ModalDiscount, MethodPayment } from '../../components';
import icons from '../../util/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import { formatMoney } from '../../util/formatMoney';

const { FaMapMarkerAlt, BsTag } = icons;

const Pay = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProducts, currentUser, selectedVoucher } = useSelector((state) => state.user);
    const { message, paymentUrl } = useSelector((state) => state.app);

    // Memoized calculations
    const totalPrice = useMemo(
        () => selectedProducts?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0,
        [selectedProducts]
    );
    const totalQuantity = useMemo(
        () => selectedProducts?.reduce((acc, item) => acc + item.quantity, 0) || 0,
        [selectedProducts]
    );
    const totalShippingCost = useMemo(
        () => selectedProducts?.reduce((acc, item) => acc + item.product.shipping_cost, 0) || 0,
        [selectedProducts]
    );
    const total = totalPrice + totalShippingCost - (selectedVoucher?.value_discount || 0);

    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Constants
    const SHIPPING_COST = 100000;

    // Convert number to words (Vietnamese)
    const convertToWords = (num) => {
        if (!num || num === 0) return 'không đồng';

        const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
        const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
        const hundreds = ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'];

        const convertThreeDigits = (n) => {
            if (n === 0) return '';
            const h = Math.floor(n / 100);
            const t = Math.floor((n % 100) / 10);
            const o = n % 10;
            return `${hundreds[h]} ${tens[t]} ${ones[o]}`.trim();
        };

        let result = '';
        const billion = Math.floor(num / 1000000000);
        const million = Math.floor((num % 1000000000) / 1000000);
        const thousand = Math.floor((num % 1000000) / 1000);
        const rest = num % 1000;

        if (billion > 0) result += `${convertThreeDigits(billion)} tỷ `;
        if (million > 0) result += `${convertThreeDigits(million)} triệu `;
        if (thousand > 0) result += `${convertThreeDigits(thousand)} nghìn `;
        if (rest > 0) result += convertThreeDigits(rest);

        return `${result.trim()} đồng`;
    };

    // Prepare order data
    const orderData = useMemo(
        () => ({
            user_id: currentUser?._id,
            total_price: total < 0 ? 0 : total,
            shipping_address: {
                name: currentUser?.name,
                phone: currentUser?.phone,
                address: currentUser?.address,
            },
            payment_method: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Atm nội địa',
            items: selectedProducts?.map((item) => ({
                product_id: item.product._id,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity,
            })),
            status: 'Đang xử lý',
            discount_id: selectedVoucher?._id,
        }),
        [currentUser, paymentMethod, selectedProducts, selectedVoucher, total]
    );

    // Fetch discounts on mount
    useEffect(() => {
        dispatch(actions.getDiscounts());
    }, [dispatch]);

    // Handle payment method changes
    useEffect(() => {
        if (paymentMethod === 'bank') {
            if (total <= 0) {
                alert('Tổng thanh toán bằng 0, vui lòng chọn phương thức khác hoặc thêm sản phẩm.');
                return;
            }
            dispatch(actions.setInforOrder(orderData));
            dispatch(actions.createPaymentUrl({ amount: total }));
            if (paymentUrl) {
                window.location.href = paymentUrl;
            }
        }
    }, [dispatch, paymentMethod, total, orderData, paymentUrl]);

    // Handle successful order creation
    useEffect(() => {
        if (message === 'Tạo đơn hàng thành công') {
            const orderedProductIds = selectedProducts.map((item) => item.product._id);
            dispatch(actions.deleteCartItem({ productId: orderedProductIds }, currentUser?._id));
            dispatch(actions.getNotifiByUser(currentUser?._id));
            navigate('/account/orders');
        }
    }, [message, navigate, currentUser, selectedProducts, dispatch]);

    // Export invoice
    const handleExportInvoice = async () => {
        try {
            const template = await loadFile('/template_order.docx');
            const zip = new PizZip(template);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            const today = new Date();
            const data = {
                name: currentUser?.name || '',
                phone: currentUser?.phone || '',
                address: currentUser?.address || '',
                products: selectedProducts.map((item, index) => ({
                    no: index + 1,
                    productName: item.product.name || '',
                    quantity: item.quantity || 0,
                    price: formatMoney(item.product.price) || '0đ',
                    purchers: formatMoney(item.product.price * item.quantity) || '0đ',
                })),
                totalPrice: formatMoney(totalPrice + SHIPPING_COST - (selectedVoucher?.value_discount || 0)) || '0đ',
                stringPrice: convertToWords(totalPrice + SHIPPING_COST - (selectedVoucher?.value_discount || 0)) || 'không đồng',
                date: today.getDate(),
                month: today.getMonth() + 1,
            };

            doc.render(data);
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(out, `HoaDon_${Date.now()}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };

    const handleAddOrder = () => {
        dispatch(actions.addOrder(orderData));
    };

    return (
        <>
            <div className="w-full bg-white py-2.5" style={{ boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)' }}>
                <div className="px-[10%] w-full flex items-center justify-between">
                    <HeaderNav>Thanh toán</HeaderNav>
                </div>
            </div>
            <div className="w-full px-[10%] mt-5">
                {/* Address Section */}
                <div className="w-full bg-white" style={{ boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)' }}>
                    <div className="w-full h-[3px] bg_pay"></div>
                    <div className="pt-7 pl-[30px] pb-6">
                        <div className="flex items-center mb-5">
                            <FaMapMarkerAlt className="text-[#2f904b] text-[1.225rem] mr-[9px]" />
                            <h5 className="capitalize text-[1.425rem]">địa chỉ nhận hàng</h5>
                        </div>
                        <div className="w-full flex items-center">
                            <h5 className="text-[18px] line-clamp-1 max-w-[700px]">
                                <span className="font-[600] mr-2.5">{currentUser?.name} (+84) {currentUser?.phone}</span>
                                {currentUser?.address}
                            </h5>
                            <div className="ml-[1.5rem] border border-[#2f904b] py-[2px] px-[5px] uppercase text-[10px] text-[#2f904b]">
                                mặc định
                            </div>
                            <ModalAddress />
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="w-full bg-white mt-5 px-[30px] border-b-[0.1px] border-[#cbd0dd]" style={{ boxShadow: '0 1px 1px 0 rgba(0,0,0,.09)' }}>
                    <div className="pt-6 pb-3 flex items-center">
                        <div className="w-2/3 text-[25px]">Sản phẩm</div>
                        <div className="w-1/3 text-[18px] flex text-[#888]">
                            <div className="w-1/3 text-center">Đơn giá</div>
                            <div className="w-1/3 text-center">Số lượng</div>
                            <div className="w-1/3 text-center">Thành tiền</div>
                        </div>
                    </div>
                    <div className="py-3 flex">
                        <LoveButton />
                        <h3 className="text-[17px] font-[600] ml-1">Thang máy Việt Phát</h3>
                    </div>
                    <ul className="w-full pb-8">
                        {selectedProducts.map((item) => (
                            <li key={item.product._id} className="w-full py-2.5 flex items-center">
                                <div className="w-2/3 flex items-center">
                                    <NavLink to={`/products/detail/${item.product.slug}`}>
                                        <img src={item.product.thumbnail_main} alt="ảnh sản phẩm" className="w-[80px] h-[80px] border border-[#cbd0dd]" />
                                    </NavLink>
                                    <h5 className="mr-4 text-[17px] text-[#222] line-clamp-1 ml-2.5 max-w-[400px]">{item.product.name}</h5>
                                    <h5 className="text-[17px] text-[#888] line-clamp-1">Loại: Linh kiện điện</h5>
                                </div>
                                <div className="w-1/3 text-[18px] flex text-[#888]">
                                    <div className="w-1/3 text-center">₫{formatMoney(item.product.price)}</div>
                                    <div className="w-1/3 text-center">{item.quantity}</div>
                                    <div className="w-1/3 text-center">₫{formatMoney(item.product.price * item.quantity)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Payment and Voucher Section */}
                <div className="w-full bg-[#fafdff] px-[30px] border-b-dash">
                    <div className="w-full flex">
                        <div className="w-4/10 flex items-center border-r-dash py-10">
                            <div className="w-full flex items-center gap-2.5">
                                <span className="line-clamp-1">Lời nhắn:</span>
                                <input type="text" placeholder="Lưu ý cho người bán..." className="border border-[#cbd0dd] py-[6px] px-[15px] w-[80%]" />
                            </div>
                        </div>
                        <div className="w-6/10 py-[25px] pl-[25px]">
                            <div className="w-full grid grid-cols-3 items-center gap-2">
                                <div className="flex items-center line-clamp-1">Phương thức thanh toán:</div>
                                <span className="text-end truncate">{paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua thẻ ngân hàng'}</span>
                                <MethodPayment methodPayment={setPaymentMethod} />
                            </div>
                            <div className="w-full grid grid-cols-3 items-center gap-2 mt-5">
                                <div className="flex items-center gap-2">
                                    <BsTag className="text-[23px] text-[#2f904b]" />
                                    Voucher của Shop
                                </div>
                                <span className="text-end">{selectedVoucher ? selectedVoucher.title : 'Không có voucher nào'}</span>
                                <span className='text-end'>
                                    <ModalDiscount />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Section */}
                <div className="w-full bg-[#fafdff] px-[30px] border-b-dash flex justify-end py-6 items-center">
                    Tổng số tiền ({totalQuantity} sản phẩm): <span className="ml-10 text-[25px] text-[#2f904b]">₫{formatMoney(totalPrice)}</span>
                </div>

                {/* Order Summary and Actions */}
                <div className="w-full bg-white box_shadow_div mt-8">
                    <div className="px-[30px] flex items-center h-[100px] w-full text-[23px] border-b-dash">Thanh toán | Đặt hàng</div>
                    <div className="pt-5 bg-[rgba(192,247,195,0.3)]">
                        <div className="w-full px-[30px] flex items-center justify-end border-b-dash pb-4">
                            <div className="text-[#888] text-[18px] min-w-[300px]">
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng tiền hàng <h5>₫{formatMoney(totalPrice)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng vận chuyển <h5>₫{formatMoney(totalShippingCost)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng giảm giá <h5>₫{formatMoney(selectedVoucher?.value_discount || 0)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4 items-center">
                                    Tổng thanh toán <h5 className="text-[26px] text-[#2f904b]">₫{formatMoney(total < 0 ? 0 : total)}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-[30px] flex items-center justify-between text-[18px] text-[#888] py-6">
                            <h5>
                                Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo
                                <NavLink className="ml-1 text-blue-600">Điều Khoản Việt Phát</NavLink>
                            </h5>
                            <div className="flex items-center gap-5">
                                <Button className="bg-inherit !text-[#2f904b]" onClick={handleExportInvoice}>
                                    Xuất hóa đơn
                                </Button>
                                <Button onClick={handleAddOrder}>Đặt hàng</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pay;
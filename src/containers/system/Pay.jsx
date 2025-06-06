import { NavLink, useNavigate } from 'react-router-dom';
import {HeaderNav, LoveButton, Button, ModalAddress, ModalDiscount} from '../../components'
import icons from '../../util/icons';
import { useSelector } from 'react-redux';
const {FaMapMarkerAlt, BsTag} = icons;
import { formatMoney } from '../../util/formatMoney';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import QrPaymentInfo from '../system/QrPaymentInfo';
import { setPaymentMethod } from '../../store/actions';

const Pay = () => {
   
     const [showPaymentOptions, setShowPaymentOptions] = useState(false);
     const selectedPaymentMethod = useSelector(state => state.user.selectedPaymentMethod);
     const [tempPaymentMethod, setTempPaymentMethod] = useState(selectedPaymentMethod);

    useEffect(() => {
        if (showPaymentOptions) {
                setTempPaymentMethod(selectedPaymentMethod);
        }
    }, [showPaymentOptions, selectedPaymentMethod]);

    const [selectedPaymentText, setSelectedPaymentText] = useState(
        selectedPaymentMethod === 'bank'
         ? 'Thanh toán QR qua ngân hàng'
        : 'Thanh toán khi nhận hàng'
        );

    const {selectedProducts, currentUser, selectedVoucher} = useSelector(state => state.user);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const totalPrice = selectedProducts?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const totalQuantity = selectedProducts?.reduce((acc, item) => acc + item.quantity, 0);
        setTotalPrice(totalPrice);
        setTotalQuantity(totalQuantity);
    }, [selectedProducts]);

    useEffect(() => {
        dispatch(actions.getDiscounts())
    }, [dispatch]);

    const handleExportInvoice = async () => {
        try {
            // Load template file
            const template = await loadFile('/template_order.docx');
            
            // Create PizZip instance
            const zip = new PizZip(template);
            
            // Create docxtemplater instance
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Format date
            const today = new Date();

            // Prepare data for template
            const data = {
                name: currentUser?.name || '',
                phone: currentUser?.phone || '',
                address: currentUser?.address || '',
                products: selectedProducts.map((item, index) => ({
                    no: index + 1,
                    productName: item.product.name || '',
                    quantity: item.quantity || 0,
                    price: formatMoney(item.product.price) || '0đ',
                    purchers: formatMoney(item.product.price * item.quantity) || '0đ'
                })),
                totalPrice: formatMoney(totalPrice + 100000 - (selectedVoucher?.value_discount || 0)) || '0đ',
                stringPrice: convertToWords(totalPrice + 100000 - (selectedVoucher?.value_discount || 0)) || 'không đồng',
                date: today.getDate(),
                month: today.getMonth() + 1
            };

            // Render document
            doc.render(data);

            // Generate output
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Save file
            saveAs(out, `HoaDon_${Date.now()}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };

    // Helper function to convert number to words
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
            
            let result = hundreds[h];
            if (t > 0) {
                result += ' ' + tens[t];
            }
            if (o > 0) {
                result += ' ' + ones[o];
            }
            return result.trim();
        };
        
        let result = '';
        const billion = Math.floor(num / 1000000000);
        const million = Math.floor((num % 1000000000) / 1000000);
        const thousand = Math.floor((num % 1000000) / 1000);
        const rest = num % 1000;
        
        if (billion > 0) {
            result += convertThreeDigits(billion) + ' tỷ ';
        }
        if (million > 0) {
            result += convertThreeDigits(million) + ' triệu ';
        }
        if (thousand > 0) {
            result += convertThreeDigits(thousand) + ' nghìn ';
        }
        if (rest > 0) {
            result += convertThreeDigits(rest);
        }
        
        return result.trim() + ' đồng';
    };
    const totalShipingCost = selectedProducts?.reduce((acc, item) => {
        return acc + item.product.shipping_cost
    }, 0);
    
    const handleAddOrder = () => {
        const orderData = {
            user_id: currentUser?._id,
            total_price: totalPrice + totalShipingCost - (selectedVoucher?.value_discount || 0),
            shipping_address: {
                name: currentUser?.name,
                phone: currentUser?.phone,
                address: currentUser?.address,
            },
            payment_method: 'Thanh toán khi nhận hàng',
            items: selectedProducts?.map(item => ({
                product_id: item.product._id,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity,
            })),
            status: 'Đang xử lý',
            discount_id: selectedVoucher?._id,
        };
        
        const orderedProductIds = selectedProducts.map(item => item.product._id);
        
        dispatch(actions.addOrder(orderData));
        
        // Xóa sản phẩm đã mua khỏi giỏ hàng
        const data = {
            productId: orderedProductIds
        };
        dispatch(actions.deleteCartItem(data, currentUser?._id));
        dispatch(actions.getNotifiByUser(currentUser?._id));
        
        navigate('/account/order');
    }
    return (
        <>
            {showPaymentOptions && (
                <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                    <div className="bg-white px-8 py-6 rounded shadow-md w-[400px] pointer-events-auto">
                            <h3 className="text-[22px] font-semibold text-gray-800 mb-6 text-center">Chọn phương thức thanh toán</h3>
                            <div className="space-y-4">
                                <button
                                    className={`w-full py-3 px-4 rounded border text-left ${
                                        tempPaymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                                    }`}
                                    onClick={() => setTempPaymentMethod('cod')}
                                >
                                    Thanh toán khi nhận hàng
                                </button>
                                <button
                                    className={`w-full py-3 px-4 rounded border text-left ${tempPaymentMethod === 'bank' ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}
                                    onClick={() => setTempPaymentMethod('bank')}
                                >
                                    Thanh toán QR qua ngân hàng
                                </button>
                            </div>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                className="text-gray-600 text-sm hover:underline"
                                onClick={() => setShowPaymentOptions(false)}
                            >
                                TRỞ LẠI
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    dispatch(setPaymentMethod(tempPaymentMethod));
                                    setShowPaymentOptions(false);
                                    if (tempPaymentMethod === 'bank') {
                                        setTimeout(() => {
                                            navigate('/payment-qr', {
                                                state: {
                                                name: currentUser?.name,
                                                phone: currentUser?.phone,
                                                amount: totalPrice + totalShipingCost - (selectedVoucher?.value_discount || 0)
                                            }}); 
                                        }, 100); // 100ms delay
                                    }
                                }}
                            >
                                HOÀN THÀNH
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                <span className='font-[600] mr-2.5 line-clamp-'>{currentUser?.name} (+84) {currentUser?.phone}</span>
                                {currentUser?.address}
                            </h5>
                            <div className="ml-[1.5rem] border border-[#2f904b] py-[2px] px-[5px] uppercase text-[10px] text-[#2f904b]">
                                mặc định
                            </div>
                            <ModalAddress/>
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
                        {selectedProducts.map((item) => (
                            <li key={item.product.  _id} className="w-full py-2.5 flex items-center">
                                <div className="w-2/3 flex items-center">
                                    <NavLink to={`/products/detail/${item.product.slug}`}>
                                        <img src={item.product.thumbnail_main} alt="ảnh sản phẩm" 
                                        className='w-[80px] h-[80px] border border-[#cbd0dd]'/>
                                    </NavLink>
                                    <h5 className='mr-4 text-[17px] text-[#222] line-clamp-1 ml-2.5 max-w-[400px]'>
                                        {item.product.name}
                                    </h5>
                                    <h5 className='text-[17px] text-[#888] line-clamp-1'>
                                        Loại: Linh kiện điện
                                    </h5>
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
                                   
                                </div>
                                <span className='ml-2.5'>
                                    {selectedPaymentText}
                                </span>
                                <span
                                onClick={() => setShowPaymentOptions(true)}
                                className='ml-15 capitalize text-[18px] text-blue-600 cursor-pointer'
                                >
                                thay đổi
                                </span>

                            </div>
                            <div className="flex items-center line-clamp-1 justify-between mt-5">
                                <div className="flex items-center gap-2">
                                    <BsTag className='text-[23px] text-[#2f904b]'/>
                                    Voucher của Shop
                                </div>
                                <ModalDiscount/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#fafdff] px-[30px] border-b-dash flex justify-end py-6 items-center">
                    Tổng số tiền({totalQuantity} sản phẩm):
                    <span className='ml-10 text-[25px] text-[#2f904b]'>₫{formatMoney(totalPrice)}</span> 
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
                                    <h5>₫{formatMoney(totalPrice)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng vận chuyển
                                    <h5>₫{formatMoney(totalShipingCost)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4">
                                    Tổng giảm giá
                                    <h5> ₫{formatMoney(selectedVoucher?.value_discount || 0)}</h5>
                                </div>
                                <div className="w-full flex text-left justify-between mt-4 items-center">
                                    Tổng tiền hàng
                                    <h5 className='text-[26px] text-[#2f904b]'>₫{formatMoney(totalPrice + totalShipingCost - (selectedVoucher?.value_discount || 0))}</h5>
                                </div>
                                    {selectedPaymentMethod === 'bank' && (
                                        <QrPaymentInfo
                                            name={currentUser?.name}
                                            phone={currentUser?.phone}
                                            amount={totalPrice + totalShipingCost - (selectedVoucher?.value_discount || 0)}
                                         />
                                    )}

                            </div>
                        </div>
                        <div className="w-full px-[30px] flex items-center justify-between text-[18px] text-[#888] py-6">
                            <h5>Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo  
                                <NavLink className={"ml-1 text-blue-600"}>
                                    Điều Khoản Việt Phát
                                </NavLink>
                            </h5>
                            <div className="flex items-center gap-5">
                                <Button 
                                    className={"bg-inherit !text-[#2f904b]"}
                                    onClick={handleExportInvoice}
                                >
                                    xuất hóa đơn
                                </Button>
                                <Button onClick={handleAddOrder}>
                                    đặt hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Pay
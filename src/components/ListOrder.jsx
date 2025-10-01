import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { formatMoney, convertToWords } from "../util/formatMoney";
import Button from "./Button";
import LoveButton from "./LoveButton";
import ModalQuestion from "./ModalQuestion";
import ModelContact from "./ModelContact";
import { toast } from "react-toastify";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../util/loadFile';
import { useSelector } from "react-redux";

const ListOrder = ({ orders, hanleCanCelOrder, handleBuyAgain }) => {
    const buttonContact = () => {
        toast.success('Vui lòng liên hệ với chúng tôi qua email hoặc tin nhắn góc phải màn hình để được hỗ trợ');
    }
    const {currentUser} = useSelector(state => state.user);
    const handleExportInvoice = async (item) => {
        try {
            const template = await loadFile('/template_order.docx');
            const zip = new PizZip(template);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            const today = new Date();
            const data = {
                order_code: item?.order_code || '',
                name: currentUser?.name || '',
                phone: currentUser?.phone || '',
                address: currentUser?.address || '',
                p: item?.orderDetails?.map((product, index) => ({
                    no: index + 1,
                    productName: product.product.name || '',
                    unit: product.product.unit || '',
                    quantity: product.quantity || 0,
                    price: formatMoney(product.product.price) || '0',
                    purchers: formatMoney(product.product.price * product.quantity) || '0',
                    shipping: formatMoney(product.product.shipping_cost) || 0
                })),
                shipping: item.orderDetails.reduce((acc, product) => acc + (product.product.shipping_cost || 0), 0) || 0,
                vat: "10%",
                discount: formatMoney(item?.discount_id?.value_discount) || 0,
                totalPrice: formatMoney(item.total_price) || '0',
                stringPrice: convertToWords(item.total_price) || 'không đồng',
                date: today.getDate(),
                month: today.getMonth() + 1
            };

            doc.render(data);
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(out, `HoaDon_${Date.now()}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };
    return (
        <>
            {orders && orders?.length > 0 ? orders.map(item => (
                <div className="w-full mt-5" key={item._id}>
                    <div className="w-full mb-5" >
                        <div className="bg-white w-full px-5">
                            <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between
                            max-[570px]:flex-col max-[570px]:items-start max-[570px]:gap-4">
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
                            <div className="w-full">
                                {item?.orderDetails?.map((product, index) => (
                                    <div key={index} className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%] max-[520px]:w-full">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd] flex-none
                                                max-[650px]:h-[70px] max-[650px]:w-[70px]">
                                                    <img src={product.product.thumbnail_main} alt="ảnh sản phẩm"
                                                    className='w-full h-full object-cover' />
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
                                            <div className="flex-1 flex justify-end items-center gap-2.5 max-[520px]:hidden">
                                                <h6 className='line-through text-[17px] text-[#888] max-[650px]:text-sm'>
                                                    {formatMoney(product.quantity * product.product.price)}đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b] max-[650px]:text-[17px]'>
                                                    {formatMoney(product.quantity * product.product.price)}đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-[rgba(192,247,195,0.445)]">
                            <div className="pt-5 px-5 pb-3 text-right">
                                <h5 className='text-[15px]'>
                                    Tổng tiền: <span className='text-[25px] text-[#2f904b]'>{formatMoney(item.total_price)}đ</span>
                                </h5>
                            </div>
                            <div className="flex items-center gap-10 pt-3 px-6 pb-6 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-4">
                                <div className="w-1/2 max-[650px]:!w-full">
                                    <p className='text-justify leading-[1.5] text-[#888] text-[14px]'>
                                        Ngày đặt hàng: <span className="text-gray-600">{item.createdAtFormatted}</span>. 
                                        <br></br>Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                        <br></br>Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                    </p>                            
                                </div>
                                <div className="w-1/2 flex items-center justify-end gap-2.5 
                                max-[650px]:w-full max-[650px]:justify-start max-[650px]:flex-wrap">
                                    <Button onClick={buttonContact} className={'max-[650px]:!text-sm'}>
                                        liên hệ ngay
                                    </Button>
                                    {item.status === 'Đang xử lý' && (
                                        <>
                                            <Button onClick={() => {handleExportInvoice(item)}}
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] max-[650px]:!text-sm border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                xuất hóa đơn
                                            </Button>
                                            <Button onClick={hanleCanCelOrder(item._id)}
                                            className={"bg-[rgba(255,255,255,0.925)] !text-[#888] max-[650px]:!text-sm border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                                hủy đơn
                                            </Button>
                                        </>
                                    )}
                                    {item.status === 'Thất bại' && (
                                        <Button onClick={() => handleBuyAgain(item)} className={'max-[650px]:!text-sm'}>
                                            mua lại
                                        </Button>
                                    )}
                                    {item.status === 'Thành công' && (
                                        <>
                                            <Button 
                                                onClick={() => {handleExportInvoice(item)}}
                                                className={"bg-[rgba(255,255,255,0.925)] !text-[#888] max-[650px]:!text-sm border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}
                                            >
                                                xuất hóa đơn
                                            </Button>
                                            <ModalQuestion products={item.orderDetails?.map(detail => detail.product)} />
                                            <ModelContact/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    )
}

ListOrder.propTypes = {
    orders: PropTypes.array.isRequired,
    hanleCanCelOrder: PropTypes.func.isRequired,
    handleBuyAgain: PropTypes.func.isRequired
};

export default ListOrder;
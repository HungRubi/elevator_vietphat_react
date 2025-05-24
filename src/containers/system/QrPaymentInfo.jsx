import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import * as actions from '../../store/actions';

const formatMoney = (value) => {
  if (typeof value !== 'number') return value;
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const QrPaymentInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedVoucher = useSelector((state) => state.user.selectedVoucher);
  const selectedProducts = useSelector((state) => state.user.selectedProducts);

  const [agreeInfo, setAgreeInfo] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [exportInvoice, setExportInvoice] = useState(false);

  const totalAmount = selectedProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = selectedProducts.reduce((acc, item) => acc + (item.product.shipping_cost || 0), 0);
  const discount = selectedVoucher?.value_discount || 0;
  const amount = (totalAmount + shippingFee - discount) * 0.9;

  const formData = {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    amount,
  };

  const handleExportInvoice = async () => {
    try {
      const template = await loadFile('/template_order.docx');
      const zip = new PizZip(template);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      const today = new Date();

      const data = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        products: selectedProducts.map((item, index) => ({
          no: index + 1,
          productName: item.product.name,
          quantity: item.quantity,
          price: formatMoney(item.product.price),
          purchers: formatMoney(item.product.price * item.quantity),
        })),
        totalPrice: formatMoney(amount),
        stringPrice: `${Math.floor(amount).toLocaleString('vi-VN')} đồng`,
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
      console.error('Lỗi khi xuất hóa đơn:', error);
      alert('Xuất hóa đơn thất bại');
    }
  };

  const clearCart = () => {
    const data = {
      productId: selectedProducts.map((item) => item.product._id),
    };
    dispatch(actions.deleteCartItem(data, currentUser?._id));
  };

  const handleAccept = async () => {
    if (!agreeInfo || !agreePolicy) return;
    setShowQR(true);

    if (exportInvoice) {
      await handleExportInvoice();
      clearCart();
      navigate('/account/order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-5xl overflow-hidden border border-gray-300">
        {/* Cột thông tin mua hàng */}
        <div className="w-1/2 p-8 border-r border-gray-200">
          <h2 className="text-xl font-semibold text-[#2F904B] mb-6 text-center">Thông Tin Mua Hàng</h2>
          <div className="space-y-4 text-sm">
            <input type="text" value={formData.name} className="w-full border rounded px-3 py-2" disabled />
            <input type="text" value={formData.email} className="w-full border rounded px-3 py-2" disabled />
            <input type="text" value={formData.phone} className="w-full border rounded px-3 py-2" disabled />
            <input type="text" value={formData.address} className="w-full border rounded px-3 py-2" disabled />
            <input type="text" value={formatMoney(formData.amount)} className="w-full border rounded px-3 py-2" disabled />
            <div className="flex items-center space-x-2">
              <input type="checkbox" onChange={(e) => setAgreeInfo(e.target.checked)} className="cursor-pointer" />
              <label className="text-sm">Xác nhận những thông tin trên của bạn là chính xác</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" onChange={(e) => setAgreePolicy(e.target.checked)} className="cursor-pointer" />
              <label className="text-sm">
                Đồng ý với <span className="text-[#2F904B] underline cursor-pointer">Điều khoản sử dụng</span> của công ty
              </label>
            </div>
            <div className="text-sm">
              <label className="font-medium block mb-1">Xuất hóa đơn:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input type="radio" name="invoice" onChange={() => setExportInvoice(true)} className="cursor-pointer" />
                  <span>Có</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input type="radio" name="invoice" defaultChecked onChange={() => setExportInvoice(false)} className="cursor-pointer" />
                  <span>Không</span>
                </label>
              </div>
            </div>
            <button
              className={`py-2 w-full rounded mt-4 text-white transition-colors duration-200 ${
                agreeInfo && agreePolicy ? 'bg-[#2F904B] hover:bg-green-700 cursor-pointer' : 'bg-[#2F904B] opacity-50 cursor-not-allowed'
              }`}
              disabled={!(agreeInfo && agreePolicy)}
              onClick={handleAccept}
            >
              Chấp nhận
            </button>
          </div>
        </div>

        {/* Cột thông tin chuyển khoản */}
        <div className="w-1/2 p-8 bg-gray-50">
          <h2 className="text-xl font-semibold text-center text-[#2F904B] mb-6">Thông Tin Chuyển Khoản</h2>
          <div className="flex justify-center mb-4">
            {showQR ? (
              <img
                src={`https://img.vietqr.io/image/MSB-02001013741555-print.png?amount=${formData.amount}&addInfo=Thanh+toan+don+hang&accountName=PHAM+HONG+QUAN`}
                alt="QR thanh toán"
                className="w-100 h-100 rounded border"
              />
            ) : (
              <img src="/path/to/qr-placeholder.png" alt="QR Code" className="w-50 h-50 rounded border" />
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default QrPaymentInfo;

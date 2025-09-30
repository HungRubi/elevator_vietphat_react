import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
const MethodPayment = ({methodPayment}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modelRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const [tempPaymentMethod, setTempPaymentMethod] = useState('cod');
    return (
        <>
            <span onClick={() => setIsOpen(true)}
            className='capitalize text-[18px] text-blue-600 cursor-pointer text-end max-[655px]:!text-sm'>
                thay đổi
            </span>
            <div className={`fixed flex top-0 right-0 left-0 bottom-0 z-100  bg-black/10 ${isOpen ? "" : "hidden"}`}>
                <div className="w-full flex items-center justify-center h-full">
                    <div className="w-140" ref={modelRef}>
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
                                        onClick={() => setIsOpen(false)}
                                    >
                                        TRỞ LẠI
                                    </button>
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                        onClick={() => {
                                            methodPayment(tempPaymentMethod);
                                            setIsOpen(false);
                                        }}
                                    >
                                        HOÀN THÀNH
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

MethodPayment.propTypes = {
    methodPayment: PropTypes.func.isRequired,
}

export default MethodPayment
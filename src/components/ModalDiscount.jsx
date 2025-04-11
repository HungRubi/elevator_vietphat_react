import { useState, useRef, useEffect } from 'react';
import icons from '../util/icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { VoucherEmpty } from '../util/iconSgv';
import * as actions from '../store/actions';

const { AiOutlineQuestionCircle } = icons;

const ModalDiscount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [validDiscounts, setValidDiscounts] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const {discount} = useSelector(state => state.app);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
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

    useEffect(() => {
        if (discount && discount.length > 0) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            const filteredDiscounts = discount.filter(item => {
                if (!item.endDate) return false;
                
                try {
                    const [day, month, year] = item.endDate.split('/');
                    const endDate = new Date(year, month - 1, day);
                    
                    if (isNaN(endDate.getTime())) return false;
                    
                    endDate.setHours(0, 0, 0, 0);
                    return endDate >= currentDate;
                } catch (error) {
                    console.error('Error parsing date:', item.endDate, error);
                    return false;
                }
            });
            
            setValidDiscounts(filteredDiscounts);
            // Tự động chọn voucher đầu tiên nếu có
            if (filteredDiscounts.length > 0 && !selectedVoucher) {
                setSelectedVoucher(filteredDiscounts[0]);
            }
        } else {
            setValidDiscounts([]);
            setSelectedVoucher(null);
        }
    }, [discount]);

    const handleApplyVoucher = () => {
        if (selectedVoucher) {
            dispatch(actions.selectVoucher(selectedVoucher));
            setIsOpen(false);
        } else {
            console.log('No voucher selected');
        }
    };

    const handleVoucherSelect = (voucher) => {
        setSelectedVoucher(voucher);
    };
    
    return (
        <>
            <button 
                className="ml-[2.5rem] capitalize text-blue-600 !cursor-pointer text-lg" 
                type="button"
                onClick={() => setIsOpen(true)}
            >
                chọn voucher
            </button>

            <div 
                className={`fixed top-0 right-0 left-0 bottom-0 z-100 justify-center items-center bg-black/10 ${isOpen ? 'block' : 'hidden'}`}
            >
                <div className="w-full h-full relative">
                    <div 
                        ref={modalRef}
                        className="w-[600px] pb-5 flex-none bg-white rounded-[3px] shadow-md shadow-black/50 flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#cbd0dd65] p-7.5">
                            <h5 className='text-2xl'>Chọn Voucher</h5>
                            <div className="flex items-center gap-1">
                                <h5 className='capitalize'>hỗ trợ</h5>
                                <AiOutlineQuestionCircle className='text-[23px] text-gray-500'/>
                            </div>
                        </div>
                        <div className="w-full mt-2 flex flex-col overflow-y-scroll 
                            [&::-webkit-scrollbar]:w-2 max-h-[450px] px-5 gap-4
                            [&::-webkit-scrollbar-track]:bg-transparent 
                            [&::-webkit-scrollbar-thumb]:bg-[#0000001a] 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            hover:[&::-webkit-scrollbar-thumb]:bg-[#00000033]"
                        >
                            {validDiscounts.length > 0 ? validDiscounts.map((item, index) => (
                                <div className="flex items-center shadow" key={index}>
                                    <input 
                                        type="radio" 
                                        name="discount" 
                                        className='form-radio text-blue-600 w-4 h-4 rounded-full border-2 border-gray-300 mx-5'
                                        checked={selectedVoucher?.id === item.id}
                                        onChange={() => handleVoucherSelect(item)}
                                    />
                                    <img 
                                        src="/img/voucher.png" alt="" 
                                        className='w-[100px] h-[100px] object-cover flex-none'
                                    />
                                    <div className="ml-5">
                                        <h5 className='mb-1.5'>{item.title}</h5>
                                        <span>HSD: {item.endDate} 
                                            <span className='ml-2 capitalize text-blue-500'>Điều kiện</span>
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="w-full py-5 flex flex-col items-center justify-center text-[20px] text-gray-500">
                                    <VoucherEmpty />
                                    <p className='mt-3 text-sm'>Không có voucher nào</p>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex justify-end gap-5 p-5">
                            <Button onClick={() => setIsOpen(false)}
                            className={"bg-transparent !text-gray-600"}>
                                trở lại
                            </Button>
                            <Button onClick={handleApplyVoucher}>
                                áp dụng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDiscount
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../store/actions"
import { PageBar } from "../../components"
import { VoucherEmpty } from "../../util/iconSgv"
const Voucher = () => {
    const {discount} = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getDiscounts())
    }, [dispatch])
    const [current, setCurrent] = useState(1);
    const discountActive = discount?.filter(item => item.is_active === "active");
    const limit = 5;
    const lastItemIndex = current * limit;
    const firstItemIndex = lastItemIndex - limit;
    const currentDiscount = discountActive?.slice(firstItemIndex, lastItemIndex);

    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-8">
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    Thông báo của bạn
                </h5>
            </div>
            <ul className="w-full">
                {currentDiscount.length > 0 ? currentDiscount?.map(item => (
                    <li 
                        key={item._id}
                        className="flex items-center gap-10 border-b border-b-[#cbd0dd] py-5"
                    >
                        <div className="w-[70%] flex items-center">
                            <div className="w-[120px] h-[120px] flex-none">
                                <img src="/img/voucher.png" alt="logo"
                                className="w-full object-cover"/>
                            </div>
                            <div className="ml-2.5" style={{width: 'calc(100% - 150px)'}}>
                                <h5 className="text-[20px] leading-8 line-clamp-1">
                                    {item.title}
                                </h5>
                                <p className="leading-6 line-clamp-2">
                                    {item.description}
                                </p>
                                <p className="leading-6 line-clamp-1 text-[#888] mt-1">
                                    HSD: {item.startDate} - {item.endDate}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <button
                            className="bg-none border border-[#cbd0dd] py-[6px] px-[15px] cursor-pointer">
                                Xem chi tiết
                            </button>
                        </div>
                    </li>
                )) : (
                    <div className="w-full py-5 flex flex-col items-center justify-center text-[20px] text-gray-500">
                        <VoucherEmpty />
                        <p className='mt-3 text-sm'>Không có voucher nào</p>
                    </div>
                )}
            </ul>
            {Math.ceil(discount.length / limit) > 1 && (
                <PageBar currentPage={current} totalPage={Math.ceil(currentDiscount.length / limit)} onPageChange={setCurrent}/>
            )}
        </div>
    )
}

export default Voucher
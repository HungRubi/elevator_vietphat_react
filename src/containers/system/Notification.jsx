
const Notification = () => {
    return (
        <>
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    Thông báo của bạn
                </h5>
            </div>
            <ul className="w-full">
                <li className="flex items-center gap-10 border-b border-b-[#cbd0dd] py-5">
                    <div className="w-[70%] flex items-center">
                        <div className="w-[150px] h-[150px] border border-[#cbd0dd]">
                            <img src="/img/products/1.png" alt="ảnh sản phẩm"
                            className="w-full object-cover "/>
                        </div>
                        <div className="ml-2.5" style={{width: 'calc(100% - 150px)'}}>
                            <h5 className="text-[20px] leading-8 line-clamp-1">
                                Đang vận chuyển
                            </h5>
                            <p className="leading-6 line-clamp-2">
                                Đơn hàng 
                                <span className="font-[600]"> Hệ thống mở cửa tự động ADA</span>
                                của bạn đang được vận chuyển bởi
                                <span className="font-[600]"> Viettel Post</span>
                            </p>
                            <p className="leading-6 line-clamp-1 text-[#888] mt-1">
                                19:20 07/03/2025
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
            </ul>
        </>
    );
};

export default Notification;   
import { useState } from "react";
import { useSelector } from "react-redux";
import {PageBar} from "../../components"

const Notification = () => {
    const { myNotifi } = useSelector(state => state.user);
    const [current, setCurrent] = useState(1);
    const limit = 6;
    const lastItemIndex= current * limit;
    const firstItemIndex = lastItemIndex - limit;
    const currentNotifi = myNotifi?.slice(firstItemIndex, lastItemIndex);
    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-8">
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    Thông báo của bạn
                </h5>
            </div>
            <ul className="w-full">
                {currentNotifi.length > 0 ? currentNotifi?.map(item => (
                    <li 
                        key={item._id}
                        className="flex items-center gap-10 border-b border-b-[#cbd0dd] py-5"
                    >
                        <div className="w-[70%] flex items-center">
                            <div className="w-[150px] h-[150px] border border-[#cbd0dd]">
                                <img src="/img/logo.png" alt="logo"
                                className="w-full object-cover"/>
                            </div>
                            <div className="ml-2.5" style={{width: 'calc(100% - 150px)'}}>
                                <h5 className="text-[20px] leading-8 line-clamp-1">
                                    {item.type}
                                </h5>
                                <p className="leading-6 line-clamp-2">
                                    {item.message}
                                </p>
                                <p className="leading-6 line-clamp-1 text-[#888] mt-1">
                                    {item.timeAgo}
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
                    <div className="w-full flex flex-col items-center mt-5">
                        <img src="/img/notification_empty.webp" alt="" className="w-50" />
                        <span className="text-xs text-gray-300">Bạn không có thông báo nào</span>
                    </div>
                )}
            </ul>
            {Math.ceil(myNotifi.length / limit) > 1 && (
                <PageBar currentPage={current} totalPage={Math.ceil(myNotifi.length / limit)} onPageChange={setCurrent}/>
            )}
        </div>
    );
};

export default Notification;   
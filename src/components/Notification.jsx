import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { NavLink } from "react-router-dom";

const Notification = () => {
    const dispatch = useDispatch();
    const { myNotifi, currentUser } = useSelector(state => state.user);
    
    const currentNofiti = myNotifi?.slice(0, 9);
    const handleReadNotifi = (id) => {
        const data = {
            user_id: currentUser?._id,
            isRead: true,
        };
        dispatch(actions.isReadNotification(id, data));
    };
    const handleRefershNotification = () => {
        dispatch(actions.getNotifiByUser(currentUser?._id))
    }
    return (
        <div className="notification-menu menu absolute bg-white w-[500px] top-[140%] right-0 rounded-[3px] pb-2.5">
            <div className="flex items-center justify-between border-b border-[#cbd0dd] px-2.5">
                <h5 className="text-[15px]">Notification</h5>
                <h6>
                    <span 
                        onClick={handleRefershNotification}
                        className='text-[15px] text-blue-500 leading-8'
                    >
                        Làm mới
                    </span>
                </h6>
            </div>
            <div className="max-h-100 overflow-y-auto">
                {currentNofiti?.length > 0 ? currentNofiti?.map((item, index) => (
                    <div 
                        key={index} 
                        className="w-full flex flex-col"
                    >
                        <div className="w-full flex items-center justify-between p-2.5 border-b border-b-[#cbd0dd]">
                            <div className="flex items-center gap-2.5 w-9/10">
                                <input type="checkbox" name="" id="" className='border-gray-500'/>
                                <div className="w-10 h-10 border border-[#cbd0dd] flex-none">
                                    <img src="/img/logo.png" alt="" className=''/>
                                </div>
                                <div className="">
                                    <h2 className="text-[12px] capitalize line-clamp-2 font-medium">
                                        {item.type}
                                    </h2>
                                    <h5 className="text-[12px] line-clamp-2">
                                        {item.message}
                                    </h5>
                                    <span className='text-[12px] text-[#888] whitespace-nowrap'>{item.timeAgo}</span>
                                </div>
                            </div>
                            <span onClick={() => handleReadNotifi(item._id)}
                            className={`text-[12px] mr-2.5 w-1/10 truncate cursor-pointer ${item.isRead ? "text-gray-400" : "text-blue-500"}`}>
                                {item.isRead ? "Đã xem" : "Đọc"}
                            </span>
                        </div>
                    </div>
                )) : (
                    <div className="w-full flex flex-col items-center">
                        <img src="/img/notification_empty.webp" alt="" className="w-50" />
                        <span className="text-xs text-gray-300">Bạn không có thông báo nào</span>
                    </div>
                )}
            </div>
            <div className="w-full flex items-center justify-center">
                {currentNofiti?.length > 0 && (
                    <NavLink to={"/account/notification"}>
                        <span className="text-green-600 mt-2 text-sm cursor-pointer">
                            Xem thêm
                        </span>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Notification
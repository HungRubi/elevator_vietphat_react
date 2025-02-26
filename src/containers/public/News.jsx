import { NavLink } from "react-router-dom";
import {Button, PageBar} from "../../components/index";

const News = () => {
    return (
        <div className="w-full px-[10%] pt-8">
            <div className="px-[35px] pb-[30px] bg-white">
                <div className="w-full py-[35px] border-b border-b-[#eee] flex justify-between gap-[50px]">
                    <NavLink className="max-w-[200px] inline-block">
                        <img src="/img/news/2.jpg" alt="" className="w-full"/>
                    </NavLink>
                    <div className="flex-1 flex flex-col text-left ">
                        <NavLink
                        className="text-[20px] font-[500] text-[#393939] line-clamp-1">
                            Công Nghệ Cảm Ứng Thang Máy Hiện Đại
                        </NavLink>
                        <div className="block text-[14px] text-[#ccc] my-2">by Trần Việt on 18/01/2025</div>
                        <div className="text-[15px] line-clamp-2 leading-6">
                        Công nghệ cảm ứng trong thang máy ngày nay là sự kết hợp hoàn hảo giữa kỹ thuật tiên tiến và trải nghiệm người dùng hiện đại, mang lại tiện nghi, an toàn và thẩm mỹ vượt trội. 🌟 Hệ thống bảng điều khiển cảm ứng sử dụng công nghệ điện dung (capacitive touch) hoặc cảm biến hồng ngoại
                        🌈 để nhận diện chính xác thao tác của người dùng, bất kể tay ướt, mang găng
                        </div>
                        <div className="flex justify-end">
                            <Button className="text-[13px] px-[10px] !py-[3px] rounded-[8px] mt-3">read more</Button>
                        </div>
                    </div>
                </div>
                <PageBar/>
            </div>
        </div>
    )
}
export default News
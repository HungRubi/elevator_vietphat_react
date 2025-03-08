import {Button} from '../../components';
import icons from '../../util/icons';
const {GoPlus} = icons;

const Address = () => {
    return (
        <>
            <div className="py-[15px] border-b border-b-[#cbd0dd] flex items-center justify-between">
                <h5 className='text-[22px] capitalize'>
                    địa chỉ của tôi
                </h5>
                <Button
                className={"flex items-center gap-1"}>
                    <GoPlus className='text-[20px] -mt-[2px]'/>
                    thêm địa chỉ mới
                </Button>
            </div>
            <div className="w-full flex justify-between py-[15px] border-b border-b-[#cbd0dd] items-center">
                <div>
                    <h5 className='text-[18px] capitalize '>
                        Nguyễn Huy Hùng
                        <span className='ml-2.5 pl-2.5 border-l border-[#cbd0dd] text-[#888]'>
                            (+84) 123 456 789
                        </span>
                    </h5>
                    <address className='max-w-[70%] line-clamp-2 my-2'>
                        Số 22, ngõ 263, tổ dân phố 10, phường Quán Toan, quận Hồng Bàng, Hải Phòng
                    </address>
                    <Button
                    className="!bg-[inherit] !text-[#2f904b] border border-[#2f904b] !py-[2px] text-[12px]">
                        mặc định
                    </Button>
                    
                </div>
                <div className="text-right">
                    <span className='capitalize text-blue-600 cursor-pointer'>
                        cập nhật
                    </span>
                    <p className='cursor-pointer'>Thiết lập làm mặc định</p>
                </div>
            </div>
            <div className="w-full flex justify-between py-[15px] border-b border-b-[#cbd0dd] items-center">
                <div>
                    <h5 className='text-[18px] capitalize '>
                        Nguyễn Huy Hùng
                        <span className='ml-2.5 pl-2.5 border-l border-[#cbd0dd] text-[#888]'>
                            (+84) 123 456 789
                        </span>
                    </h5>
                    <address className='max-w-[70%] line-clamp-2 my-2'>
                        Số 22, ngõ 263, tổ dân phố 10, phường Quán Toan, quận Hồng Bàng, Hải Phòng
                    </address>
                    <Button
                    className="!bg-[inherit] !text-[#2f904b] border border-[#2f904b] !py-[2px] text-[12px]">
                        mặc định
                    </Button>
                </div>
                <div className="text-right">
                    <span className='capitalize text-blue-600 cursor-pointer'>
                        cập nhật
                    </span>
                    <p className='cursor-pointer'>Thiết lập làm mặc định</p>
                </div>
            </div>
        </>
    );
};

export default Address;
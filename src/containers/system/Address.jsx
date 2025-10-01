import { toast } from 'react-toastify';
import {Button, ModalAddress} from '../../components';
import icons from '../../util/icons';
import { useSelector } from 'react-redux';
const {GoPlus} = icons;

const Address = () => {
    const {currentUser} = useSelector(state => state.user);
    const handleButton = () => {
        toast.warning("Button này chỉ để trang trí");
    }
    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem] max-[750px]:ml-0">
            <div className="py-[15px] border-b border-b-[#cbd0dd] flex items-center justify-between">
                <h5 className='text-[22px] capitalize max-[750px]:text-lg'>
                    địa chỉ của tôi
                </h5>
                <Button onClick={handleButton}
                className={"flex items-center gap-1 max-[750px]:text-sm"}>
                    <GoPlus className='text-[20px] -mt-[2px] '/>
                    thêm địa chỉ mới
                </Button>
            </div>
            <div className="w-full flex justify-between py-[15px] border-b border-b-[#cbd0dd] items-center max-[500px]:flex-col max-[500px]:gap-2">
                <div className='max-[500px]:w-full'>
                    <h5 className='text-[18px] capitalize '>
                        {currentUser?.name}
                        <span className='ml-2.5 pl-2.5 border-l border-[#cbd0dd] text-[#888]'>
                            {currentUser?.phone}
                        </span>
                    </h5>
                    <address className='max-w-[70%] line-clamp-2 my-2 max-[500px]:max-w-full'>
                        {currentUser?.address}
                    </address>
                    <Button
                    className="!bg-[inherit] !text-[#2f904b] border border-[#2f904b] !py-[2px] text-[12px]">
                        mặc định
                    </Button>
                </div>
                <div className="text-right max-[500px]:text-left max-[500px]:w-full">
                    <ModalAddress/>
                    <p className='cursor-pointer'>Thiết lập làm mặc định</p>
                </div>
            </div>
        </div>
    );
};

export default Address;
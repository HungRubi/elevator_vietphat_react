import {Button} from '../../components';
import icons from '../../util/icons';
const {GoPlus} = icons
const Banking = () => {
    return (
        <>
            <div className="py-[15px] border-b border-b-[#cbd0dd] flex items-center justify-between">
                <h5 className='text-[22px] capitalize'>
                    thẻ tín dụng/ghi nợ
                </h5>
                <Button
                className={"flex items-center gap-1"}>
                    <GoPlus className='text-[20px] -mt-[2px]'/>
                    thêm thẻ mới
                </Button>
            </div>
            <div className="w-full text-center pt-2.5">
                <p className='my-[30px]'>
                    Bạn chưa liên kết thẻ
                </p>
            </div>
            <div className="py-[15px] border-b border-b-[#cbd0dd] flex items-center justify-between">
                <h5 className='text-[22px] capitalize'>
                    Tài khoản ngân hàng của tôi
                </h5>
                <Button
                className={"flex items-center gap-1"}>
                    <GoPlus className='text-[20px] -mt-[2px]'/>
                    thêm tài khoản ngân hàng liên kết
                </Button>
            </div>
            <div className="w-full text-center  my-[30px]">
                <p className='pt-2.5'>
                    Bạn chưa có tài khoản ngân hàng
                </p>
            </div>
        </>
    );
};

export default Banking; 
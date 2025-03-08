import {Button, CircleButton} from '../../components';

const Profile = () => {
    return (
        <>
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className="text-[22px] capitalize">
                    hồ sơ của tôi
                </h5>
                <span
                className='text-[15px] text-[#888] line-clamp-1 mt-1'>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
            </div>
            <div className="flex items-center">
                <form action="" method="post"
                className='w-2/3 mt-[15px]'>
                    <table className="w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    tên đăng nhập
                                </td>
                                <td>
                                    <input type="text" name="account" disabled
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    họ tên
                                </td>
                                <td>
                                    <input type="text" name='name' placeholder="Nhập họ tên của bạn"
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    email
                                </td>
                                <td>
                                    <input type="text" name='email' placeholder="Nhập email của bạn"
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    phone
                                </td>
                                <td>
                                    <input type="text" name='phone' placeholder="Nhập số điện thoại của bạn"
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Ngày sinh
                                </td>
                                <td>
                                    <input type="date" name='birth'
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    
                                </td>
                                <td>
                                    <Button type='submit'>
                                        Cập nhật
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                </form>
                <div className="flex-none flex flex-col items-center justify-center w-1/3">
                    <div className="w-[150px] h-[150px] relative">
                        <img src="/img/default.png" 
                        alt="avatar" 
                        className='rounded-[50%]'/>
                        <div className="absolute bottom-0 right-0">
                            <CircleButton>
                                <input type="file" name="avatar" id="avatar" hidden/>
                            </CircleButton>
                        </div>
                    </div>
                    <Button className="my-3">Chọn ảnh</Button>
                    <span className='text-[15px] line-clamp-2 text-[#888] text-center'>
                        Dung lượng file tối đa 2MB <br />
                        Định dạng:.JPEG, .PNG
                    </span>
                </div>
            </div>
        </>
    );
};

export default Profile;
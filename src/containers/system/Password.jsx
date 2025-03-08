import {Button} from '../../components';

const Password = () => {    
    return (
        <>
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    địa chỉ của tôi
                </h5>
                <span className="text-[15px] text-[#888] mt-2">
                    Thay đổi mật khẩu 3 tháng 1 lần để bảo mật
                </span>
            </div>
            <div className="w-full mt-5">
                <form action="" method="post"
                className='w-full mt-[15px]'>
                    <table className="w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    mât khẩu hiện tại
                                </td>
                                <td>
                                    <input type="password" name="password" placeholder='Nhập mật khẩu hiện tại'
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    mật khẩu mới
                                </td>
                                <td>
                                    <input type="password" name='newpassword' placeholder="Mật khẩu mới"
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Nhập lại mật khẩu mới
                                </td>
                                <td>
                                    <input type="password" name='name' placeholder="Nhập lại mật khẩu mới"
                                    className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}/>
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    
                                </td>
                                <td>
                                    <Button type='submit'>
                                        Thay đổi
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default Password;
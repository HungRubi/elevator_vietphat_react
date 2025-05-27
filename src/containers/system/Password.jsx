import { Button } from '../../components';
import { useState } from 'react';

const Password = () => {
    const [formData, setFormData] = useState({
        password: '',
        newpassword: '',
        confirm: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newpassword !== formData.confirm) {
            alert("Mật khẩu mới không khớp!");
            return;
        }

        if (formData.password === formData.newpassword) {
            alert("Mật khẩu mới phải khác mật khẩu cũ!");
            return;
        }

        try {
            const res = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: formData.password,
                    newPassword: formData.newpassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Lỗi khi đổi mật khẩu');

            alert('Đổi mật khẩu thành công!');
            setFormData({ password: '', newpassword: '', confirm: '' });

        } catch (err) {
            alert(err.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem]">
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    Đổi mật khẩu
                </h5>
                <span className="text-[15px] text-[#888] mt-2">
                    Thay đổi mật khẩu 3 tháng 1 lần để bảo mật
                </span>
            </div>
            <div className="w-full mt-5">
                <form onSubmit={handleSubmit} className='w-full mt-[15px]'>
                    <table className="w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Mật khẩu hiện tại
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Nhập mật khẩu hiện tại'
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Mật khẩu mới
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        name='newpassword'
                                        value={formData.newpassword}
                                        onChange={handleChange}
                                        placeholder="Mật khẩu mới"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Nhập lại mật khẩu mới
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        name='confirm'
                                        value={formData.confirm}
                                        onChange={handleChange}
                                        placeholder="Nhập lại mật khẩu mới"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td></td>
                                <td>
                                    <Button type='submit'>Thay đổi</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Password;

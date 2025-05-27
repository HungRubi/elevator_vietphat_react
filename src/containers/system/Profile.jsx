import { Button, CircleButton } from '../../components';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const fileInputRef = useRef(null);

    const [previewAvatar, setPreviewAvatar] = useState(currentUser?.avatar);
    const [avatarFile, setAvatarFile] = useState(null);

    const [formData, setFormData] = useState({
        account: currentUser?.account,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        birth: currentUser?.format,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewAvatar(imageUrl);
            setAvatarFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('account', formData.account);
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('birth', formData.birth);

        if (avatarFile) {
            form.append('avatar', avatarFile);
        }

        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                body: form
            });

            if (!response.ok) throw new Error('Cập nhật thất bại');

            alert('Cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            alert('Đã xảy ra lỗi khi cập nhật.');
        }
    };

    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem]">
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className="text-[22px] capitalize">hồ sơ của tôi</h5>
                <span className='text-[15px] text-[#888] line-clamp-1 mt-1'>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
            </div>
            <div className="flex items-center">
                <form onSubmit={handleSubmit} className='w-2/3 mt-[15px]'>
                    <table className="w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    tên đăng nhập
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="account"
                                        disabled
                                        onChange={handleChange}
                                        value={formData.account}
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px] text-gray-500"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    họ tên
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name='name'
                                        placeholder="Nhập họ tên của bạn"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    email
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name='email'
                                        placeholder="Nhập email của bạn"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    phone
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name='phone'
                                        placeholder="Nhập số điện thoại của bạn"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    Ngày sinh
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name='birth'
                                        value={formData.birth}
                                        onChange={handleChange}
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{ boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)' }}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td></td>
                                <td>
                                    <Button type='submit'>Cập nhật</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                {/* PHẦN AVATAR */}
                <div className="flex-none flex flex-col items-center justify-center w-1/3">
                    <div className="w-[160px] h-[160px] relative rounded-full overflow-hidden shadow-md border border-gray-200">
                        <img
                            src={previewAvatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                            <CircleButton>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    hidden
                                    accept="image/jpeg,image/png"
                                    onChange={handlePreviewAvatar}
                                />
                            </CircleButton>
                        </div>
                    </div>
                    <Button className="my-3" onClick={handleChooseImage}>
                        Chọn ảnh
                    </Button>
                    <span className='text-[14px] text-[#888] text-center leading-tight'>
                        Dung lượng file tối đa 2MB<br />
                        Định dạng: .JPEG, .PNG
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Profile;

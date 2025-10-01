import {Button, CircleButton} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import * as actions from "../../store/actions"

const Profile = () => {
    const {currentUser} = useSelector(state => state.user);
    const fileInputRef = useRef();
    const [formData, setFormData] = useState({
        account: currentUser?.account,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        birth: currentUser?.format,
        avatar: currentUser?.avatar
    });
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.warn("Dung lượng ảnh vượt quá 2MB!");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            toast.warn("Chỉ hỗ trợ ảnh JPEG hoặc PNG!");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFormData(prev => ({
                ...prev,
                avatar: reader.result
            }));

            // 🟢 Tại đây bạn có thể gửi reader.result (base64) lên server
            // hoặc tiếp tục xử lý upload lên Dropbox
        };
        reader.readAsDataURL(file);
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { ...formData };

    // Nếu avatar không thay đổi thì xóa khỏi dataToSend
        if (dataToSend.avatar === currentUser?.avatar) {
            delete dataToSend.avatar;
        }
        dispatch(actions.updateProfileUser(dataToSend, currentUser?._id));
    }
    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem] max-[750px]:ml-0">
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
                <form onSubmit={handleSubmit}
                className='w-full mt-[15px] flex max-[1100px]:flex-col'>
                    <table className="w-2/3 max-[1100px]:order-2 max-[1100px]:w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    tên đăng nhập
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="account" disabled 
                                        onChange={handleChange} 
                                        value={formData.account}
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px] text-gray-500"
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
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
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
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
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
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
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
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
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                    />
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
                    <div className="flex-none flex flex-col items-center justify-center w-1/3 max-[1100px]:!w-full ">
                        <div className="w-[150px] h-[150px] relative">
                            <img src={
                                formData?.avatar?.startsWith('/uploads')
                                    ? `${import.meta.env.VITE_SERVER_URL}${formData.avatar}`
                                    : formData.avatar
                                } 
                                alt="avatar" 
                                className='rounded-[50%]'
                            />
                            <div className="absolute bottom-0 right-0">
                                <CircleButton>
                                    <input 
                                        ref={fileInputRef}
                                        type="file"
                                        name="avatar"
                                        id="avatar"
                                        hidden
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png"
                                    />
                                </CircleButton>
                            </div>
                        </div>
                        <Button type={"button"} className="my-3" onClick={handleClickUpload}>
                            Chọn ảnh
                        </Button>
                        <span className='text-[15px] line-clamp-2 text-[#888] text-center'>
                            Dung lượng file tối đa 2MB <br />
                            Định dạng:.JPEG, .PNG
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
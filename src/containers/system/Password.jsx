import { useDispatch, useSelector } from 'react-redux';
import {Button} from '../../components';
import { useState } from 'react';
import * as actions from "../../store/actions"
const Password = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [checkErr, setCheckErr] = useState("")
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password === ""  || formData.newPassword === "" || formData.confirmPassword === "") {
            setCheckErr("Vui lòng nhập đủ thông tin")
        }else{
            dispatch(actions.changePassword(currentUser?._id, formData))
        }
    }   
    return (
        <div className="ml-8 flex-1 bg-white px-[1.875rem] pb-[0.625rem]">
            <div className="py-[15px] border-b border-b-[#cbd0dd]">
                <h5 className='text-[22px] capitalize'>
                    địa chỉ của tôi
                </h5>
                <span className="text-[15px] text-[#888] mt-2">
                    Thay đổi mật khẩu 3 tháng 1 lần để bảo mật
                </span>
            </div>
            <div className="w-full mt-5">
                <form onSubmit={handleSubmit}
                className='w-full mt-[15px]'>
                    <table className="w-full">
                        <tbody>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    mât khẩu hiện tại
                                </td>
                                <td>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder='Nhập mật khẩu hiện tại'
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                </td>
                            </tr>
                            <tr className='h-[65px]'>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    mật khẩu mới
                                </td>
                                <td>
                                    <input 
                                        type="password" 
                                        name='newPassword' 
                                        placeholder="Mật khẩu mới"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                        onChange={handleChange}
                                        value={formData.newPassword}
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
                                        name='confirmPassword' 
                                        placeholder="Nhập lại mật khẩu mới"
                                        className="w-full py-[6px] px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                        style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                        onChange={handleChange}
                                        value={formData.confirmPassword}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-[30%] text-[15px] font-[500] capitalize text-right pr-5">
                                    
                                </td>
                                <td>
                                    <span className='text-[12px] text-red-500'>{checkErr}</span>
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
        </div>
    );
}

export default Password;
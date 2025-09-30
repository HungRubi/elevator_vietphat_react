import { useState } from "react";
import { Button } from "./index";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
const ModalAddress = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name,
        phone: currentUser?.phone,
        address: currentUser?.address,
        specificAddress: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const [err, setErr] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === "") {
            setErr("Nhập họ tên của bạn");
            return;
        }

        if (formData.phone === "") {
            setErr("Nhập số điện thoại của bạn");
            return;
        }

        if (formData.address === "" && formData.specificAddress === "") {
            setErr("Nhập địa chỉ của bạn");
            return;
        }

        setErr(null);
        const combinedAddress = `${formData.specificAddress} ${formData.address}`;
        const formDataToSubmit = {
            name: formData.name,
            phone: formData.phone,
            address: combinedAddress
        };

        dispatch(actions.updateAddress(formDataToSubmit, currentUser?._id));
        setIsOpen(false); // ✅ chỉ đóng khi không lỗi
    };
    return (
        <>
            <button 
                className="ml-[2.5rem] capitalize text-blue-600 !cursor-pointer max-[665px]:!ml-0" 
                type="button"
                onClick={() => setIsOpen(true)}
            >
                thay đổi
            </button>

            <div 
                className={`fixed top-0 right-0 left-0 bottom-0 z-100 justify-center items-center bg-black/10  ${isOpen ? 'block' : 'hidden'}`}
            >
                <div className="w-full h-full relative">
                    <form onSubmit={handleSubmit}
                    className="w-[500px] flex-none bg-white rounded-[3px] shadow-md shadow-black/50 flex flex-col p-7.5 gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h5 className="text-[22px] capitalize">
                            địa chỉ mới
                        </h5>
                        <div className="w-full flex flex-col gap-5">
                            <div className="flex items-center gap-5">
                                <input 
                                    onChange={handleChange}
                                    value={formData.name}
                                    name="name"
                                    type="text" 
                                    placeholder="Họ và tên"
                                    className="w-full py-2 px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                />
                                <input 
                                    onChange={handleChange}
                                    value={formData.phone}
                                    name="phone"
                                    type="text" 
                                    placeholder="Số điện thoại"
                                    className="w-full py-2 px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                    style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                                />
                            </div>
                            <input 
                                onChange={handleChange}
                                value={formData.address}
                                name="address"
                                type="text" 
                                placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                                className="w-full py-2 px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                            />
                            <input 
                                onChange={handleChange}
                                value={formData.specificAddress}
                                name="specificAddress"
                                type="text" 
                                placeholder="Địa chỉ cụ thể"
                                className="w-full py-2 px-[15px] border border-[rgba(0,0,0,0.14)] rounded-[2px]"
                                style={{boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.02)'}}
                            />
                            <div className="my-2">
                                <span className="text-red-500 text-[12px]">
                                    {err}
                                </span>
                            </div>
                            <div className="flex justify-end gap-5">
                                <Button
                                    type="button"
                                    className="bg-transparent !text-gray-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    trở lại
                                </Button>
                                <Button type="submit">
                                    hoàn thành
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default ModalAddress;
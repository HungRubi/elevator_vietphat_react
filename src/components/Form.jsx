import { useEffect, useRef } from "react";
import { useState } from "react"
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Form = () => {
    const [status, setStatus] = useState("");
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_KEY,
            import.meta.env.VITE_TEMPLATE_KEY,
            form.current,
            import.meta.env.VITE_USER_PUBLIC_KEY,
        )
        .then((result) => {
                console.log(result)
                setStatus("1");
                form.current.reset();
            }
        ).catch((err) => {
            console.log(err)
            setStatus("2");
        })
    }
    useEffect(() => {
        if(status === "1"){
            toast.success("Chúng tôi đã nhận được lời nhắn của bạn ^^")
        }
        if(status === "2"){
            toast.error("Có lỗi gì rồi vui lòng kiểm tra lại thông tin!")
        }
        const timer = setTimeout(() => {
            setStatus("");
        }, 3000);
    
        return () => clearTimeout(timer);
    }, [status])
     
    return (
        <div className="w-[80%] m-auto mt-8 max-[1000px]:w-full max-[1000px]:px-[15px]" data-aos="fade-up">
            <div className="w-full bg-[#2f904b] h-10 leading-10 text-[16px] px-5 text-white">
                Để lại lời nhắn của bạn ở đây
            </div>
            <form ref={form} className="w-full bg-white" onSubmit={sendEmail}>
                <ul className="px-5 pt-5 pb-[5px] w-full">
                    <li className="w-full leading-8 flex mb-[14px]">
                        <input 
                        type="text" name="name" placeholder="* Họ và tên" required
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full h-[39px] px-2.5 text-[13px] outline-none" />
                    </li>
                    <li className="w-full leading-8 flex mb-[14px]">
                        <input 
                        type="text" name="email" placeholder="* Email (Chúng tôi sẽ liên hệ với bạn trong vòng 24h)" required
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full h-[39px] px-2.5 text-[13px] outline-none" />
                    </li>
                    <li className="w-full leading-8 flex mb-[14px]">
                        <input 
                        type="text" name="phone" placeholder="* Phone (Số điện thoại bạn đang sử dụng)" required
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full h-[39px] px-2.5 text-[13px] outline-none" />
                    </li>
                    <li className="w-full leading-8 flex mb-[14px]">
                        <input 
                        type="text" name="subject" placeholder="* Chủ đề"
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full h-[39px] px-2.5 text-[13px] outline-none" />
                    </li>
                    <li className="w-full leading-8 flex mb-[14px]">
                        <textarea
                        rows="5" 
                        type="text" name="message" placeholder="* Nội dung văn bản"
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full px-2.5 text-[13px] outline-none">
                        </textarea>
                    </li>
                    <li className="w-full leading-8 flex mb-[14px]">
                        <button type="submit"
                        className="text-center text-white bg-[#2f904b] w-full text-[15px]">
                            Send
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Form
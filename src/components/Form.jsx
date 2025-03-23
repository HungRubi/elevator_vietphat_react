const Form = () => {
    return (
        <div className="w-[80%] m-auto mt-8" data-aos="fade-up">
            <div className="w-full bg-[#2f904b] h-10 leading-10 text-[16px] px-5 text-white">
                Để lại lời nhắn của bạn ở đây
            </div>
            <form action="" className="w-full bg-white">
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
                        type="text" name="message" placeholder="* Nội dung văn bản" rows="5"
                        className="border border-[#eee] border-l-[3px] border-l-[#013e5a] w-full h-[39px] px-2.5 text-[13px] outline-none">
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
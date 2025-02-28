const NewsDetail = () => {
    return (
        <div className="w-full px-[10%] mt-8">
            <h1 className="text-[#333] text-[22px] pb-2.5">
                Chất lượng linh kiện - sản phẩm của công ty TNHH Việt Phát như nào?
            </h1>
            <hr className="my-[1rem] border-t border-t-[#0000008c] opacity-[0.25]"/>
            <p className="py-2 text-[16px] leading-8 text-justify">
            Công ty TNHH Thang Máy Việt Phát chuyên cung cấp các linh kiện 
            và phụ tùng thang máy chất lượng cao, đáp ứng mọi nhu cầu lắp đặt, 
            bảo trì và nâng cấp. Sản phẩm của chúng tôi bao gồm động cơ, cáp tải, 
            hệ thống điều khiển, cảm biến an toàn và nhiều linh kiện chính hãng khác. 
            Với cam kết về chất lượng và độ bền, Việt Phát luôn mang đến giải pháp tối ưu, 
            đảm bảo an toàn và vận hành êm ái cho thang máy. Đội ngũ kỹ thuật viên giàu kinh nghiệm 
            của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ khách hàng. 
            Việt Phát – đối tác tin cậy trong ngành thang máy tại Việt Nam.
            </p>
            <img src="/img/news/2.jpg" alt="" className="w-full mt-5" />
            <hr className="deliver_dashed opacity-[0.4] my-5"/>
            <p className="pb-2 text-[16px] leading-8 text-justify">
                Cập nhật lúc: <span className="text-blue-600">03/02/2025</span> <br />
                Người đăng: <span className="text-blue-600">Trần Việt</span>
            </p>
            <hr className="deliver_dashed opacity-[0.4] mt-2.5"/>

        </div>
    )
}

export default NewsDetail
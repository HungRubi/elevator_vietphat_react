import { NavLink } from "react-router-dom";
import icons from '../util/icons';

const { FaMapMarkerAlt, FaPhoneAlt, MdEmail, BsFacebook, FaYoutube } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      {/* Đối tác */}
      <div className="h-auto bg-cover bg-center bg-fixed flex justify-center"
        style={{ backgroundImage: "url('/img/partner/partner.jpg')" }}>
        <div className="w-[90%] max-w-[1200px] flex flex-col text-white text-3xl font-bold items-center justify-center gap-10 py-10 bg-opacity-50">
          <h2 className="uppercase text-2xl md:text-3xl text-center">đối tác và khách hàng</h2>
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <img key={i} src={`/img/partner/${i}.png`} alt={`partner-${i}`} className="h-12 md:h-16 object-contain" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer chính */}
      <div className="w-full flex flex-col items-center bg-[#051230] px-4">
        <p className="text-[15px] text-center text-[rgba(255,255,255,0.76)] mt-6 max-w-[700px]">
          Để biết thêm thông tin về sản phẩm hoặc bảng giá,
          vui lòng để lại email cho chúng tôi và chúng tôi
          sẽ liên hệ trong vòng 24 giờ.
        </p>

        <NavLink to="/contact">
          <button className="rounded-[8px] py-2 px-6 font-[550] uppercase text-[#ffffffcb] mt-4 border border-[#ffffffcb] hover:bg-[#2f904b] transition">
            contact now
          </button>
        </NavLink>

        {/* Địa chỉ - responsive cột */}
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-[#2f904b] gap-6">
          <div className="flex items-start gap-2 text-left w-full md:w-1/3">
            <FaMapMarkerAlt className="text-[#ffffffcb] size-5" />
            <NavLink
              className="text-[#ffffffcb] text-sm"
              title="địa chỉ"
              to={'https://www.google.com/maps/...'}>
              Address: Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam
            </NavLink>
          </div>

          <div className="flex items-start gap-2 justify-center w-full md:w-1/3">
            <FaPhoneAlt className="text-[#ffffffcb] size-5" />
            <NavLink
              className="text-[#ffffffcb] text-sm"
              title="Số điện thoại"
              to={'tel:0924113113'}>
              Phone: 0924113113
            </NavLink>
          </div>

          <div className="flex items-start gap-2 justify-end w-full md:w-1/3">
            <MdEmail className="text-[#ffffffcb] size-5" />
            <span className="text-[#ffffffcb] text-sm">
              Email: infor@phukienthangmay.vn
            </span>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div className="flex justify-center items-center gap-4 mt-6 mb-6 flex-wrap">
          <NavLink className="size-8 bg-white rounded-full flex items-center justify-center" to={'https://www.facebook.com/VietPhatelevator'}>
            <BsFacebook className="text-[#2564ee] size-6" />
          </NavLink>
          <NavLink className="size-8 bg-white rounded-full flex items-center justify-center" to={'https://www.youtube.com/@thangmayhybrid5438'}>
            <FaYoutube className="text-[#ec0d0d] size-5" />
          </NavLink>
          <NavLink className="size-8 rounded-full overflow-hidden" to="#">
            <img src="/img/footer/instagram.jpg" alt="instagram" className="h-8 object-contain" />
          </NavLink>
          <NavLink className="size-8 rounded-full overflow-hidden" to="#">
            <img src="/img/footer/twitter.png" alt="twitter" className="h-8 object-contain" />
          </NavLink>
        </div>

        {/* Chân bản quyền */}
        <div className="bg-[#2f904b] w-full text-center py-2 text-sm sm:text-[16px] text-[#ffffffde]">
          Design By ©HUYHUNG - 2024
        </div>
      </div>
    </div>
  );
};

export default Footer;

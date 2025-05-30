import { Form } from "../../components/index";
import icons from "../../util/icons";
import { NavLink } from "react-router-dom";

const { FaMapMarkerAlt, MdEmail, FaPhoneAlt } = icons;

const Contact = () => {
  return (
    <div className="mt-[75px] w-full mb-15">
      <div className="w-full px-4 sm:px-6 md:px-[10%]" data-aos="fade-up">
        <h1
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-[24px] text-[#2f904b] font-[600]"
        >
          Công ty TNHH Thang máy Việt Phát
        </h1>
        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-[18px] font-[600] text-[#0a0a0a] mt-1"
        >
          Chúng tôi rất mong chờ câu hỏi của bạn!
        </h2>
      </div>

      <Form className="!w-full" />

      <div className="w-full px-4 sm:px-6 md:px-[10%] mt-2.5" data-aos="fade-up">
        <p className="text-center py-[4px] leading-8">
          Chúng tôi sẽ phấn đấu phát triển bằng uy tín, tồn tại bằng chất lượng, hướng
          tới sự hài lòng của khách hàng và lấy sự tự giác làm kim chỉ nam để cung cấp
          cho khách hàng những dịch vụ toàn diện và chất lượng cao hơn.
        </p>

        <div className="mt-5 text-left">
          <div className="flex gap-2.5 justify-start items-center mt-3.5">
            <FaMapMarkerAlt className="text-[25px] text-[#2f904b]" />
            <NavLink to={""}>
              Address: Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam
            </NavLink>
          </div>

          <div className="flex gap-2.5 justify-start items-center mt-3.5">
            <MdEmail className="text-[25px] text-[#2f904b]" />
            <NavLink to={""}>
              Email: infor@phukienthangmay.vn
            </NavLink>
          </div>

          <div className="flex gap-2.5 justify-start items-center mt-3.5">
            <FaPhoneAlt className="text-[25px] text-[#2f904b]" />
            <NavLink to="tel:0924113113">
              Phone: 0924113113
            </NavLink>
          </div>
        </div>

        <div className="w-full h-[1px] deliver mt-5"></div>
      </div>
    </div>
  );
};

export default Contact;
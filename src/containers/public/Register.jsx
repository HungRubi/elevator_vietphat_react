import { NavLink, useNavigate } from "react-router-dom";
import { Footer } from "../../components/index";
import icons from '../../util/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';
import { toast } from "react-toastify";

const { FcGoogle, FaFacebook } = icons;

const Register = () => {
  const [errors, setErrors] = useState({});
  const { messageRegister, registerError } = useSelector(state => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    frist: '', last: '', email: '', city: '', street: '', day: '', month: '', year: '',
    account: '', password: '', confirm: '', phone: '',
  });

  const validateForm = () => {
    const newErrors = {};
    const { frist, last, email, phone, city, street, account, password, confirm } = formData;

    if (!frist.trim()) newErrors.frist = "Vui lòng nhập Họ.";
    if (!last.trim()) newErrors.last = "Vui lòng nhập Tên.";
    if (!email.trim()) newErrors.email = "Vui lòng nhập Email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email không hợp lệ.";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{9,11}$/.test(phone)) newErrors.phone = "Số điện thoại phải từ 9 đến 11 chữ số.";
    if (!city.trim()) newErrors.city = "Vui lòng nhập Tỉnh/Thành phố.";
    if (!street.trim()) newErrors.street = "Vui lòng nhập Đường.";
    if (!account.trim()) newErrors.account = "Vui lòng nhập tên tài khoản.";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    if (password !== confirm) newErrors.confirm = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(actions.register(formData));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (messageRegister) {
      toast.success(messageRegister);
    }
  }, [messageRegister, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/slider/background_login.png')" }}>
      <div className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-[700px] bg-white rounded shadow-md px-6 py-8">
          <div className="text-[1.8rem] text-center capitalize text-[#2f904b] font-semibold mb-6">
            Đăng Ký
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input onChange={handleChange} name="frist" placeholder="First Name" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.frist && <div className="text-red-500 text-xs mt-1">{errors.frist}</div>}
              </div>
              <div>
                <input onChange={handleChange} name="last" placeholder="Last Name" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.last && <div className="text-red-500 text-xs mt-1">{errors.last}</div>}
              </div>
              <div>
                <input onChange={handleChange} name="email" placeholder="Email" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>
              <div>
                <input onChange={handleChange} name="phone" placeholder="Phone" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
              </div>
              <div>
                <input onChange={handleChange} name="city" placeholder="City" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
              </div>
              <div>
                <input onChange={handleChange} name="street" placeholder="Street" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.street && <div className="text-red-500 text-xs mt-1">{errors.street}</div>}
              </div>
              <input onChange={handleChange} name="day" placeholder="Day" className="px-3 py-2 border border-gray-300 rounded w-full" />
              <input onChange={handleChange} name="month" placeholder="Month" className="px-3 py-2 border border-gray-300 rounded w-full" />
              <input onChange={handleChange} name="year" placeholder="Year" className="px-3 py-2 border border-gray-300 rounded w-full" />
              <div className="md:col-span-2">
                <input onChange={handleChange} name="account" placeholder="Account" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.account && <div className="text-red-500 text-xs mt-1">{errors.account}</div>}
              </div>
              <div>
                <input onChange={handleChange} type="password" name="password" placeholder="Password" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
              </div>
              <div>
                <input onChange={handleChange} type="password" name="confirm" placeholder="Confirm Password" className="px-3 py-2 border border-gray-300 rounded w-full" />
                {errors.confirm && <div className="text-red-500 text-xs mt-1">{errors.confirm}</div>}
              </div>
            </div>

            {registerError && <div className="text-red-500 text-sm mt-2">{registerError}</div>}

            <button type="submit" className="w-full mt-4 bg-[#2f904b] text-white py-3 rounded uppercase">
              ĐĂNG KÝ
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-4 text-gray-400 text-sm uppercase">hoặc</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 border border-gray-300 rounded py-2 flex justify-center items-center gap-2">
                <FaFacebook className="text-blue-600 text-xl" /> Facebook
              </button>
              <button className="flex-1 border border-gray-300 rounded py-2 flex justify-center items-center gap-2">
                <FcGoogle className="text-xl" /> Google
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
              Bạn đã có tài khoản?
              <NavLink to="/login" className="text-[#2f904b] ml-1">Đăng nhập</NavLink>
            </div>

            <div className="text-center text-sm text-gray-400 mt-2">
              <NavLink to="#" className="hover:underline">Bạn cần giúp đỡ?</NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

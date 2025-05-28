import { NavLink, useNavigate } from "react-router-dom";
import icons from '../../util/icons';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as actions from '../../store/actions';

const { FcGoogle, FaFacebook } = icons;

const Login = () => {
  const dispatch = useDispatch();
  const { message, loginError } = useSelector(state => state.app);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ account: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.login(formData));
  };

  useEffect(() => {
    if (message === "Login successful") {
      navigate("/");
    }
  }, [message, navigate]);

  return (
    <div
      className="w-full bg-cover bg-center flex flex-col items-center justify-start px-4 py-10"
      style={{ backgroundImage: "url('/img/slider/background_login.png')" }}
    >
      {/* FORM LOGIN */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white rounded-[4px] shadow-lg"
      >
        <div className="px-6 py-5">
          <div className="text-[1.5rem] lg:text-[1.8rem] text-center capitalize text-[#2f904b]">
            đăng nhập
          </div>
        </div>
        <div className="px-6 pb-8">
          <input
            type="text"
            name="account"
            placeholder="Nhập tài khoản của bạn"
            onChange={handleChange}
            className="w-full px-3 py-3 border border-[rgba(0,0,0,.14)] rounded-[2px] outline-none mt-5"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            className="w-full px-3 py-3 border border-[rgba(0,0,0,.14)] rounded-[2px] outline-none mt-6"
          />
          {loginError && (
            <p className="text-red-600 text-sm mt-3">Tài khoản mật khẩu không chính xác</p>
          )}
          <button
            type="submit"
            className="w-full h-[2.5rem] bg-[#2f904b] rounded-[2px] text-white uppercase mt-8 hover:opacity-100 opacity-90"
          >
            đăng nhập
          </button>
          <div className="w-full mt-2">
            <NavLink className="text-blue-600 text-xs">Quên mật khẩu</NavLink>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-[#dbdbdb]"></div>
            <span className="text-[#ccc] px-4 text-xs uppercase">hoặc</span>
            <div className="flex-1 h-px bg-[#dbdbdb]"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-[2px]">
              <FaFacebook className="text-[25px] text-blue-600" />
              Facebook
            </button>
            <button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-[2px]">
              <FcGoogle className="text-[25px]" />
              Google
            </button>
          </div>

          <div className="text-center text-sm text-[rgba(0,0,0,.26)] mt-6">
            Bạn chưa có tài khoản?
            <NavLink to="/register" className="text-[#2f904b] ml-1">
              Đăng ký
            </NavLink>
          </div>

          <div className="text-center text-sm text-gray-400 mt-2">
            <NavLink to="#" className="hover:underline">
              Bạn cần giúp đỡ?
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

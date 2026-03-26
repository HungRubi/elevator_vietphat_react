import { ToastContainer } from 'react-toastify';
import {
    Home, Public, Products, News, AboutUs, 
    Contact, ProductDetail, NewsDetail,
    VideoDetail, Page404,
    TuyenDung,
    TimKiem
} from './containers/public/';
import { Login, Register } from './containers/auth';
import { ProtectedRoute, ScrollToTop } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Account, Cart, Pay, PaymentReturn } from './containers/system'
import OrderSuccess from './containers/system/OrderSuccess';
import path from './util/path';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import { formatReduxMessage, messageLooksLikeError } from './util/toastMessage';
import { fetchHome } from "./store/slices/homeSlice";
import { logoutUser, resetMessageUser } from "./store/slices/userSlice";
import { clearMessage } from "./store/slices/uiSlice";
import { fetchSessionUser } from "./store/slices/authSlice";
import { registerSessionExpiredHandler, SESSION_EXPIRED_USER_MESSAGE } from "./util/sessionExpired";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionBootOnce = useRef(false);
  const { message, loginError, registerError } = useSelector((state) => state.ui);
  useSelector((state) => state.user);
  const {messageUser} = useSelector(state => state.user);
  /**
   * Toast từ Redux: phân loại success/error; reset message sau 1 tick để effect con (Đăng ký/…) kịp đọc state.
   */
  useEffect(() => {
      if (message) {
          const text =
              formatReduxMessage(message) ||
              (typeof message === 'object' ? 'Đã có lỗi xảy ra. Vui lòng thử lại.' : String(message));
          const authErr = Boolean(loginError || registerError);
          const asError = authErr || messageLooksLikeError(text);
          if (asError) {
              toast.error(text);
          } else {
              toast.success(text);
          }
          const t = setTimeout(() => dispatch(clearMessage()), 0);
          return () => clearTimeout(t);
      }
      return undefined;
    }, [message, loginError, registerError, dispatch]);

  useEffect(() => {
      if (!messageUser) return undefined;
      const text = typeof messageUser === 'string' ? messageUser : formatReduxMessage(messageUser);
      if (!text) {
          dispatch(resetMessageUser());
          return undefined;
      }
      if (messageLooksLikeError(text)) {
          toast.error(text);
      } else {
          toast.success(text);
      }
      const t = setTimeout(() => dispatch(resetMessageUser()), 0);
      return () => clearTimeout(t);
  }, [messageUser, dispatch]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'linear',
      once: false,
      delay: 200,
    });

    const handleScroll = () => {
      Aos.refresh();
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!sessionBootOnce.current) {
      sessionBootOnce.current = true;
      dispatch(fetchSessionUser());
    }
  }, [dispatch]);

  /** Hết phiên (401/403 token sau refresh): toast thân thiện + xóa phiên + về /login */
  useEffect(() => {
    registerSessionExpiredHandler(() => {
      toast.error(SESSION_EXPIRED_USER_MESSAGE);
      dispatch(logoutUser());
      navigate(path.LOGIN, { replace: true });
    });
    return () => registerSessionExpiredHandler(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path={path.LOGIN} element={<Login/>}/>
        <Route path={path.REGISTER} element={<Register/>}/>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={path.VIDEO} element={<VideoDetail/>}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail/>} key={location.pathname}/>
          <Route path={path.NEWS} element={<News />}/>
          <Route path={path.NEWS_DETAIL} element={<NewsDetail/>} key={location.pathname}/>
          <Route path={path.ACCOUNT} element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }/>
          <Route path={path.CART} element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }/>
          <Route path={path.PAY} element={
            <ProtectedRoute>
              <Pay />
            </ProtectedRoute>
          }/>
          <Route path={path.PAYMENT_RETURN} element={
            <ProtectedRoute>
              <PaymentReturn />
            </ProtectedRoute>
          }/>
          <Route path={path.ORDER_SUCCESS} element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }/>
          <Route path={path.ABOUTUS} element={<AboutUs />}/>
          <Route path={path.TIMKIEM} element={<TimKiem />}/>
          <Route path={path.TUYENDUNG} element={<TuyenDung />}/>
          <Route path={path.CONTACT} element={<Contact />}/>
          <Route path={path.PAGE404} element={<Page404 />}/>
          <Route path={path.STAR} element={<Home />}/>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
    </>
   
  )
}

export default App

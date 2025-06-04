import { ToastContainer } from 'react-toastify';
import {
    Home, Public, Products, News, AboutUs, 
    Contact, ProductDetail, NewsDetail,Login, 
    Register, VideoDetail, Page404,
    TuyenDung,
    TimKiem
} from './containers/public/';
import { ProtectedRoute } from './components';
import { Routes, Route } from 'react-router-dom';
import { Account, Cart, Pay } from './containers/system'
import path from './util/path';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions'
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import QrPaymentInfo from './containers/system/QrPaymentInfo';


function App() {
  const dispatch = useDispatch();
  const {currentUser, cartUser, productCart, orders, message, notification} = useSelector(state => state.app);
  const {messageUser} = useSelector(state => state.user);

  // Handle all messages in one useEffect
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(actions.resetMessage());
    }
    if (messageUser) {
      toast.success(messageUser);
      dispatch(actions.resetMessageUser());
    }
  }, [message, messageUser, dispatch]);

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
    dispatch(actions.getHome())
    if(currentUser) {
      dispatch(actions.setCurrentUser(currentUser, cartUser, productCart, orders, notification))
    }
  }, [dispatch, currentUser, cartUser, productCart, orders, notification]);

  return(
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={path.LOGIN} element={<Login/>}/>
          <Route path={path.REGISTER} element={<Register/>}/>
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
          <Route path={path.ABOUTUS} element={<AboutUs />}/>
          <Route path={path.TIMKIEM} element={<TimKiem />}/>
          <Route path={path.TUYENDUNG} element={<TuyenDung />}/>
          <Route path={path.CONTACT} element={<Contact />}/>
          <Route path={path.PAGE404} element={<Page404 />}/>
          <Route path={path.STAR} element={<Home />}/>
          <Route path="/payment-qr" element={<QrPaymentInfo />} />
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

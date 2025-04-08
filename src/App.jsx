import { ToastContainer } from 'react-toastify';
import {
    Home, Public, Products, News, AboutUs, 
    Contact, ProductDetail, NewsDetail,Login, 
    Register, VideoDetail, Page404
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



function App() {
  const {currentUser, cartUser, productCart} = useSelector(state => state.app);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'linear',
      once: false,
      delay: 200,
    });

    const handleScroll = () => {
        Aos.refresh(); // Cập nhật lại hiệu ứng khi cuộn
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome())
    dispatch(actions.setCurrentUser(currentUser, cartUser, productCart))
  }, [dispatch, currentUser, cartUser, productCart])

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
          <Route path={path.CONTACT} element={<Contact />}/>
          <Route path={path.PAGE404} element={<Page404/>}/>
          <Route path={path.STAR} element={<Home />}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
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

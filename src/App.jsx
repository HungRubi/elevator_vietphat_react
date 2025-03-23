import { ToastContainer } from 'react-toastify';
import {Home, Public, Products, News, AboutUs, Contact, ProductDetail, NewsDetail,Login, Register, VideoDetail} from './containers/public/';
import { Routes, Route } from 'react-router-dom';
import { Account, Cart, Pay } from './containers/system'
import path from './util/path';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions'
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
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
  }, [dispatch])
  return(
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/video/:slug"} element={<VideoDetail/>}/>

          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={"/products/detail/:slug"} element={<ProductDetail/>} key={location.pathname}/>

          <Route path={path.NEWS} element={<News />}/>
          <Route path={"/news/detail/:slug"} element={<NewsDetail/>} key={location.pathname}/>
          <Route path={"/account/*"} element={<Account />}/>
          <Route path={"/cart"} element={<Cart />}/>
          <Route path={"/pay"} element={<Pay />}/>
          <Route path={path.ABOUTUS} element={<AboutUs />}/>
          <Route path={path.CONTACT} element={<Contact />}/>
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

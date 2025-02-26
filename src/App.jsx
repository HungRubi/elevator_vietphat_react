import { ToastContainer } from 'react-toastify';
// import { useSelector, useDispatch } from 'react-redux';
import {Home, Public, Products, News, AboutUs, Contact} from './containers/public/';
import { Routes, Route } from 'react-router-dom';
import path from './util/path'
function App() {
  return(
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={path.NEWS} element={<News />}/>
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

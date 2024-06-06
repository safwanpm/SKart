
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import HomePg from './pages/User/HomePg';
import Login from './pages/Registration/Login';
import Forgot from './pages/Registration/Forgot';
import ChangePassword from './pages/Registration/ChangePassword';
import Reigister from './pages/Registration/Reigister';
import OtpVerify from './components/Registration/OtpVerify';
import OtpChangePwd from './components/Registration/OtpChangePwd';

import ViewProduct from './components/User/ViewProduct';
import ProductDetailsPg from './pages/User/ProductDetailsPg';
import ShowProduct from './components/User/ShowProduct';
import Cart from './components/User/Cart';
import Wishlist from './components/User/Wishlist';
import Landing from './components/Landing';
import ErrorPg from './pages/User/ErrorPg';
import Contact from './components/Contact';
import Dashboard from './pages/Admin/Dashboard';
import AddProduct from './components/Admin/AddProduct';
import AddHomeSlider from './components/Admin/AddHomeSlider';





function App() {
  return (
    <>
    < ToastContainer limit={1} position={'top-center'} autoClose ={2000}></ToastContainer>
      <BrowserRouter  >
        <Routes>
          <Route path='/' element={<HomePg></HomePg>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/forgot' element={<Forgot></Forgot>} />
          <Route path='/changePassword' element={<ChangePassword></ChangePassword>} />
          <Route path='/register' element={<Reigister></Reigister>} />
          <Route path='/landing' element={<Landing></Landing>} />
          <Route path='/otpverify' element={<OtpVerify></OtpVerify>} />
          <Route path='/otpChange' element={<OtpChangePwd></OtpChangePwd>} />
          {/* <Route path='/admin' element={<AdminSidebar></AdminSidebar>} /> */}
          <Route path='/viewProduct' element={<ViewProduct></ViewProduct>} />
          <Route path='/Product/:id' element={<ProductDetailsPg/>} />
          <Route path='/showProduct' element={<ShowProduct></ShowProduct>} />
          <Route path='/cart' element={<Cart></Cart>} />
          <Route path='/wishlist' element={<Wishlist></Wishlist>} />
          <Route path='/error' element={<ErrorPg></ErrorPg>} />
          <Route path='/contact' element={<Contact></Contact>} />
          <Route path='/admin' element={<Dashboard></Dashboard>} />
          <Route path='/admin/addProduct' element={<AddProduct></AddProduct>} />
          <Route path='/admin/addSlider' element={<AddHomeSlider></AddHomeSlider>} />

        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

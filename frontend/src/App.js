
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
import Category from './components/User/Category';
import Profile from './pages/User/Profile';
import CategoryPg from './pages/User/CategoryPg';
import Logos from './components/User/Logos';
import CheckOut from './components/User/CheckOut';
import AddAddress from './components/User/AddAddress';
import { Provider } from 'react-redux';
import AdminDashboard from './pages/Admin/Dashboard';





function App() {
  return (
    <>

      < ToastContainer limit={1} position={'top-center'} autoClose={2000}></ToastContainer>
      <BrowserRouter  >
        <Routes>


          {/* Registration */}

          <Route path='/home' element={<HomePg></HomePg>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/forgot' element={<Forgot></Forgot>} />
          <Route path='/changePassword' element={<ChangePassword></ChangePassword>} />
          <Route path='/register' element={<Reigister></Reigister>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/landing' element={<Landing></Landing>} />
          <Route path='/otpverify' element={<OtpVerify></OtpVerify>} />
          <Route path='/otpChange' element={<OtpChangePwd></OtpChangePwd>} />
          {/* <Route path='/admin' element={<AdminSidebar></AdminSidebar>} /> */}


          {/* User */}

          <Route path='/viewProduct' element={<ViewProduct></ViewProduct>} />
          <Route path='/Product/:id' element={<ProductDetailsPg />} />
          <Route path='/showProduct' element={<ShowProduct></ShowProduct>} />
          <Route path='/cart' element={<Cart></Cart>} />
          <Route path='/wishlist' element={<Wishlist></Wishlist>} />
          <Route path='/error' element={<ErrorPg></ErrorPg>} />
          <Route path='/contact' element={<Contact></Contact>} />
          <Route path='/category' element={<CategoryPg />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/addAddress' element={<AddAddress />} />


          {/* Addmin */}

          <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
          <Route path='/admin/addProduct' element={<AddProduct></AddProduct>} />
          <Route path='/admin/addSlider' element={<AddHomeSlider></AddHomeSlider>} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

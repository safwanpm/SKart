
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import HomePg from './pages/HomePg';
import Reigister from './pages/Reigister';
import OtpVerify from './components/OtpVerify';
import Home from './pages/Home';
import Forgot from './pages/Forgot';
import { ToastContainer } from 'react-toastify';
import ChangePassword from './pages/ChangePassword';
import OtpChangePswd from './components/OtpChangepswd';
import AdminSidebar from './components/Admin/AdminSidebar';
import ViewProduct from './components/ViewProduct';



function App() {
  return (
    <>
    < ToastContainer limit={1} position={'top-center'} autoClose ={2000}></ToastContainer>
      <BrowserRouter  >
        <Routes>
          <Route path='/' element={<HomePg></HomePg>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/forgot' element={<Forgot></Forgot>} />
          <Route path='/changePassword' element={<ChangePassword></ChangePassword>} />
          <Route path='/register' element={<Reigister></Reigister>} />
          <Route path='/landing' element={<Landing></Landing>} />
          <Route path='/home' element={<HomePg></HomePg>} />
          <Route path='/otpverify' element={<OtpVerify></OtpVerify>} />
          <Route path='/otpChange' element={<OtpChangePswd></OtpChangePswd>} />
          <Route path='/admin' element={<AdminSidebar></AdminSidebar>} />
          <Route path='/viewProduct' element={<ViewProduct></ViewProduct>} />

        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

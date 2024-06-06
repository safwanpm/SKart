import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/User/Navbar";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Register() {
  const inputRef = useRef(null);
  
  const navigate = useNavigate();


  useEffect(() => {
    inputRef.current.focus();
  }, []);
  

  const [data, setData] = useState({
    email: "",
    satus:""
  });

  const HandleData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const HandleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4005/register/forgot', data)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('email', res.data.data.email);
        console.log('emailresponse', res.data.data.email);
        toast.success(res.data.message); 
        navigate("/otpChange");
      })
      .catch((err) => {
        console.log('axios err', err);
        toast.error(err.response.data.message); 
      });
  };
  

 
  
  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
           
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                 ref={inputRef}
                  id="email"
                  onChange={HandleData}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
           
            <div className="">
              <button
                onClick={HandleSubmit}
                type="submit"
               className={'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;

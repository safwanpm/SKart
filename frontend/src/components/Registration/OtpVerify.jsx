import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../User/Navbar";

function OtpVerify() {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState("");
  const [data, setdata] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
  });
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:4005/register/view-details",
         { email: email })
      .then((res) => {
        setdata(res.data.data);
        console.log(res);
      });
  },[email]);

  const navigate = useNavigate();

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const inputLength = value.length;
    if (inputLength === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (inputLength === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    // Update OTP state
    setOtp((prevOtp) => {
      const newOtp = prevOtp.slice(0, index) + value + prevOtp.slice(index + 1);
      return newOtp;
    });
  };

  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4005/register/verify",  data )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate("/");
    
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
     <Navbar/>
      <div className="relative flex min-h-screen flex-col mb-40 justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-6 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email </p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {inputRefs.map((inputRef, index) => (
                      <div className="w-16 h-16" key={index}>
                        <input
                          required="true"
                          ref={inputRef}
                          maxLength={1}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                      {/* {error && <p className="text-red-500">{error}</p>} */}
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;

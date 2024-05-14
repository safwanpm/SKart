import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 50,
  p: 2,
};
function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const HandleData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  console.log(data);
  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4005/register/login", data)
      .then((res) => {
        console.log(res);

        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        
        
        window.location.reload();
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error(err.response.data.message);
      });
  };

  const [gdata, setgdata] = useState();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        setgdata(res.data);

        if (res.data) {
          axios
            .post("http://localhost:4005/register/glogin", res.data)
            .then((res) => {
              console.log(res);
              localStorage.setItem("email", res.data.data.email);
              localStorage.setItem("role", res.data.data.role);
              window.location.reload();
              navigate("/");
              toast.success(res.data.message);
            
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMainMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const HandleLogout = () => {
    localStorage.clear();
    window.location.reload();
    toast.success("Logout success");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      {/*Nav*/}
      <nav id="header" className="w-full z-30 top-0 py-1 lg:px-10  ">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>
          <input
            className="hidden"
            type="checkbox"
            id="menu-toggle"
            checked={isMenuOpen}
            onChange={toggleMenu}
          />

          <div className="order-1 md:order-2">
            <a
              className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href=""
            >
              <svg
                className="fill-current text-gray-800 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
              </svg>
              NORDICS
            </a>
          </div>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:flex md:items-center md:w-auto w-full order-3 md:order-1`}
            id="menu"
          >
            {/* <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-900 pt-4 md:pt-0">
                <li>
                  <svg
                    className="fill-current text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                
                </li>
              </ul>
            </nav> */}
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-900 pt-4 md:pt-0">
                <li>
                  <button
                    className="flex items-center space-x-2"
                    onClick={toggleMainMenu}
                  >
                    <svg
                      className="fill-current text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                    >
                      <title>menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    <span>Menu</span>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute bg-white border border-gray-200 px-5 py-5 top-14  ms-20 mx-5 my-5 left-0 z-10 w-80 h-auto">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Menu
                        </label>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Items
                        </label>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="order-2 md:order-3 flex items-center"
            id="nav-content"
          >
            {/*Modal part */}
            {!localStorage.role && (
              <>
                <div className="container">
                  <div className="row">
                    <div>
                      <button
                        onClick={handleOpen}
                        type="button"
                        className=" mt-6 text-gray-900 bg-white hover:bg-gray-900 border shadow-md hover:text-white focus:outline focus:ring-4
   focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Log in
                      </button>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          ></Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <div className="flex min-h-sm flex-1 flex-col justify-center px-6 py-12 lg:px-6  ">
                              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up to your account
                              </h2>
                              <button onClick={() => login()}>
                                Sign in with Google 🚀
                              </button>
                              ;
                              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6">
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Email address
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        onChange={HandleData}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center justify-between">
                                      <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Password
                                      </label>
                                      <div className="text-sm">
                                        <span
                                          href="#"
                                          className="font-semibold text-indigo-600 hover:text-indigo-500
                    flex  cursor-pointer"
                                          // onClick={handleShowPassword}
                                        >
                                          {/* {showPassword ? <p>Hide Password</p> : <p>Show Password</p>} */}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="mt-2">
                                      <input
                                        onChange={HandleData}
                                        id="password"
                                        name="password"
                                        // type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                  <div className="text-sm">
                                    <Link
                                      to={"/forgot"}
                                      className=" text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                      // Add your forgot password functionality here
                                    >
                                      Forgot Password?
                                    </Link>
                                  </div>
                                  <div className="flex gap-5">
                                    <button
                                      onClick={handleClose}
                                      type="submit"
                                      className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      Close
                                    </button>
                                    <button
                                      onClick={HandleSubmit}
                                      type="submit"
                                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      Sign Up
                                    </button>
                                  </div>
                                </form>
                                <p className="mt-10 text-center text-sm text-gray-500">
                                  Don't have account?{" "}
                                  <a
                                    href="/register"
                                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    Register Now
                                  </a>
                                </p>
                              </div>
                            </div>
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                            
                </div>
              </>
            )}
            {localStorage.role && (
              <>
                <a
                  onClick={toggleDropdown}
                  className="inline-block no-underline hover:text-black "
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <circle fill="none" cx={12} cy={7} r={3} />
                    <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                  </svg>
                </a>
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                    <circle cx="10.5" cy="18.5" r="1.5" />
                    <circle cx="17.5" cy="18.5" r="1.5" />
                  </svg>
                </a>

                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute right-10 mt-32 w-48 bg-white rounded-lg shadow-lg z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      View Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={HandleLogout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

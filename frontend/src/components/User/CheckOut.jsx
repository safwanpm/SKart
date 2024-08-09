
import React, { useEffect, useState } from "react";
import CheckOutPrdcts from "./CheckOutPrdcts";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CheckOut() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [data, setData] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post(`http://localhost:4005/user/viewAddress/${userId}`)
      .then((res) => {
        console.log("response from viewAddress", res);
        setData(res.data.data.address);
      })
      .catch((error) => {
        console.error("There was an error fetching the address:", error);
      });
  }, [userId]);

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    // Fetch cart items from the API instead of localStorage
    axios
      .post("http://localhost:4005/cart/viewCart", { userId: userId })
      .then((cartResponse) => {
        const productDetails = cartResponse.data.data; // Assuming the response contains the cart items
  
        const orderDetails = {
          userId,
          address: data[selectedAddress],
          products: productDetails,
        };
        console.log(orderDetails,'ordrdetails');
        // Proceed to place the order
        return axios.post("http://localhost:4005/user/ordered", orderDetails);
      })
      .then((orderResponse) => {
        console.log("Order placed successfully", orderResponse);
      
        
        toast.success(orderResponse.data.message)
        // Navigate to a success page or handle as needed
      })
      .catch((error) => {
        console.error("Error placing order", error);
        toast.error(error.response.data.message)
      });
  };
  

  return (
    <>
      <Navbar />
      <section className="px-20 bg-white antialiased dark:bg-gray-900">
        <form
        
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <ol className="px-20 items-center flex w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Cart
              </span>
            </li>
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Checkout
              </span>
            </li>
            <li className="flex shrink-0 items-center">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Order summary
            </li>
          </ol>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <CheckOutPrdcts />

                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $8,094.00
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $199
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      $8,392.00
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Payment
                </button>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  One or more items in your cart require an account.{" "}
                  <a
                    href="#"
                    title=""
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Sign in or create an account now.
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-8 px-10">
              <div className="space-y-4">
                <fieldset>
                  <legend className="font-semibold text-lg">
                    Your Address
                  </legend>
                  <>
                    {data.map((address, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          checked={selectedAddress === index}
                          onChange={() => handleAddressSelect(index)}
                          className="h-4 w-4 mt-1"
                          id={`address-${index}`}
                          name="address"
                        />
                        <label
                          htmlFor={`address-${index}`}
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          {address.name} 
                          <br />
                          {address.houseNo}
                          <br />
                          {address.steet}, {address.city}, {address.state} {address.pin}
                          <br />
                          {address.phone}
                        </label>
                      </div>
                    ))}
                  </>
                </fieldset>
                <div className="sm:col-span-2">
                 <Link
                  to="/addAddress"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                  Add new address
                </Link>
              </div>
              <div>
                <label
                  htmlFor="voucher"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Enter a gift card, voucher or promotional code{" "}
                </label>
                <div className="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required=""
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <button
                    onClick={handleProceedToPayment}
                    className="flex  w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <div className="text-sm">
                      <span>PayPal</span>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Connect your account
                      </p>
                    </div>
                  </button>
                  <div
                    className="flex  w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <button className="text-sm" onClick={handleProceedToPayment}>
                      <span>Google Pay</span>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Connect your account
                      </p>
                    </button>
                  </div>
                  <button
                    onClick={handleProceedToPayment}
                    className="flex  w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <div className="text-sm">
                      <span>Razer Pay</span>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Connect your account
                      </p>
                    </div>
                  </button>
                </div>
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Payment On Delivery
                  </button>
                  </div>
                  </div>
                
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default CheckOut;


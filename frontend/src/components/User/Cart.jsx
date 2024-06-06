import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOffer, setTotalOffer] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:4005/cart/viewCart/${userId}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        // Calculate total price and total offer
        let totalPrice = 0;
        let totalOffer = 0;
        res.data.data.forEach((item) => {
          totalPrice += item.productData.price;
          totalOffer += item.productData.offer;
        });
        setTotalPrice(totalPrice);
        setTotalOffer(totalOffer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIncrement = (productId) => {
    axios
      .post("http://localhost:4005/cart/increment", { productId, userId })
      .then((res) => {
        console.log(res);
        // Update the count locally
        setData((prevData) =>
          prevData.map((item) =>
            item.productId === productId
              ? { ...item, count: item.count + 1 }
              : item
          )
        );
        let totalPrice = 0;
        let totalOffer = 0;
        data.forEach((item) => {
          totalPrice += item.productData.price * item.count;
          totalOffer += item.productData.offer * item.count;
        });
        setTotalPrice(totalPrice);
        setTotalOffer(totalOffer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDecrement = (productId) => {
    axios
      .post("http://localhost:4005/cart/decrement", { productId, userId })
      .then((res) => {
        console.log(res);
        // Update the count locally, ensuring it doesn't go below 1
        setData((prevData) =>
          prevData.map((item) =>
            item.productId === productId
              ? { ...item, count: Math.max(item.count - 1, 1) } // Ensure count doesn't go below 1
              : item
          )
        );
  
        // Recalculate total price and total offer
        let totalPrice = 0;
        let totalOffer = 0;
        data.forEach((item) => {
          totalPrice += item.productData.price * item.count;
          totalOffer += item.productData.offer * item.count;
        });
        setTotalPrice(totalPrice);
        setTotalOffer(totalOffer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  

  const handleDelete = (productId) => {
    axios
      .post("http://localhost:4005/cart/delete", { productId, userId })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setData((prevData) =>
          prevData.filter((item) => item.productId !== productId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-gray-600">
              <li>
                <a href="/" className="block transition hover:text-gray-700">
                  <span className="sr-only"> Home </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </li>
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <a href="#" className="block transition hover:text-gray-700">
                  Shirts
                </a>
              </li>
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <a href="#" className="block transition hover:text-gray-700">
                  Plain Tee
                </a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {data.map((item) => (
                  <li key={item.productId} className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <img
                        src={`/uploads/${item.productData.images[0]}`}
                        alt={item.productData.name}
                        // className="w-20 h-20 m-2 rounded object-cover"
                        className="object-cover max-h-full max-w-full h-auto w-auto mx-auto  hover:shadow-xl"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {item.productname}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">{item.productData.price}</dd>
                        </div>
                        <div>
                          <dt className="inline">Offer:</dt>
                          <dd className="inline">{item.productData.offer ? item.productData.offer : 0}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div>
                        <label htmlFor="Quantity" className="sr-only">
                          Quantity
                        </label>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              handleDecrement(item.productData._id);
                            }}
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            id="Quantity"
                            value={item.count}
                            className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => {
                              handleIncrement(item.productData._id);
                            }}
                            type="button"
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => {
                          handleDelete(item.productData._id);
                        }}
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Total Products Price</dt>
                      <dd>£{totalPrice}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Total Offers</dt>
                      <dd>£{totalOffer}</dd>
                    </div>
                    <div className="flex justify-between font-bold">
                      <dt>Total Amount</dt>
                      <dd>£{totalPrice - totalOffer}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1.5 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7H9v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h2V6a1 1 0 112 0v3h2a1 1 0 110 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      £5
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;

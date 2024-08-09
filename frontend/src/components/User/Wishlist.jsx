import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:4005/cart/viewWishlist/${userId}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }, [userId]);
  const handleDelete = (productId) => {
    axios
      .post("http://localhost:4005/cart/deleteWishlist", { productId, userId })
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
      {loading ? (
         <div className="grid h-screen justify-center items-center place-content-center bg-white px-4 ">
         <h1 className="uppercase tracking-widest text-gray-500">
           <div className="rounded-md h-12 w-12 border-4 border-t-4 border-gray-800 animate-spin absolute" />
         </h1>
       </div>
        
      ) : data.length === 0 ? (
        <div className="pb-64 grid h-screen place-content-center bg-white px-4">
          <h1 className="uppercase tracking-widest text-gray-500">
            Your Wishlist is empty!
          </h1>
        </div>
      ) : (
        <div className="py-12">
          {/* Desktop Responsive Start */}
          <div className="hidden sm:flex flex-col justify-start items-center px-4 lg:px-10 2xl:px-20">
            <div className="w-full max-w-2xl flex flex-col justify-start items-start">
              <div className="flex flex-row justify-center items-end space-x-4">
                <h1 className="text-4xl font-semibold leading-9 text-gray-800 dark:text-white">
                  Favourites
                </h1>
                <p className="text-base leading-4 text-gray-600 dark:text-white pb-1">
                  ({data.length} Items)
                </p>
              </div>
              <table className="w-full mt-5 whitespace-nowrap">
                <tbody className="w-full text-left">
                  {data.map((item) => (
                    <tr key={item._id} className="border-gray-200 border-b">
                      <th>
                        <Link
                        to={`/product/${item.productData._id}`}
                        >
                          <img
                          className="my-2 p-8"
                          src={`/uploads/${item.productData.images[0]}`}
                          alt={item.productData.name}
                        />
                        </Link>
                        
                      </th>
                      <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6">
                        <p className="text-base leading-4 text-gray-800 dark:text-white">
                          {item.productData.name}
                        </p>
                      </th>
                      <th className="my-10 pl-10">
                        <p className="dark:text-white">${item.productData.price}</p>
                      </th>
                      <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6">
                        <a
                          href={`/product/${item.productData._id}`}
                          className="hover:underline text-base font-medium leading-none text-gray-800 dark:text-white focus:outline-none focus:underline"
                        >
                          View
                        </a>
                      </th>
                      <th className="my-10 pl-4 pr-4">
                        <button
                          className="text-gray-600 transition hover:text-red-600"
                          onClick={() => {
                            handleDelete(item.productData._id)
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
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Desktop Responsive End */}

          {/* Mobile Responsive Start */}
          <div className="flex justify-center items-center">
            <div className="sm:hidden flex flex-col justify-start items-start">
              <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
                <p className="text-4xl font-semibold leading-9 text-gray-800 dark:text-white">
                  Favourites
                </p>
                <p className="text-base leading-4 text-gray-600 pb-1">
                  ({data.length} Items)
                </p>
              </div>
              {data.map((item) => (
                <div key={item._id} className="border-gray-200 border-b pb-10">
                  <div className="px-4 flex flex-col justify-center items-center mt-10">
                    <div>
                      <img
                        src={`/uploads/${item.productData.images[0]}`}
                        alt={item.productData.name}
                      />
                    </div>
                  </div>
                  <div className="px-4 mt-6 flex w-full justify-center items-center">
                    <div>
                      <p className="w-36 text-base leading-6 text-gray-800 dark:text-white">
                        {item.productData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-semibold leading-4 text-gray-800 dark:text-white">
                        ${item.productData.price}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 mt-6 flex w-full justify-center items-center">
                    <div>
                      <a
                        href={`/product/${item.productData._id}`}
                        className=" w-36 text-base leading-6 hover:underline  font-medium  focus:outline-none focus:underline text-gray-800 dark:text-white"
                      >
                        View details
                      </a>
                    </div>
                    <div>
                      <button
                        className="pl-10 text-gray-600 transition hover:text-red-600"
                        onClick={() => {
                          handleDelete(item.productData._id)
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile Responsive End */}
        </div>
      )}
    </>
  );
}

export default Wishlist;

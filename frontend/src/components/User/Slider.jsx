import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Slider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4005/admin/viewSlider")
      .then((res) => {
        console.log("response from slider", res);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <>
        <div className="grid h-screen justify-center items-center place-content-center bg-white px-4 ">
          <h1 className="uppercase tracking-widest text-gray-500">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-gray-800 animate-spin absolute" />
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <main className="px-20">
        <div className="container mx-auto px-6">
          {data.length > 0 && (
            <>
              <div
                className="h-64 rounded-md overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(/uploads/${data[0].image})`,
                }}
              >
                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                  <div className="px-10 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">
                      Laptops
                    </h2>
                    <p className="mt-2 text-gray-400">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Tempore facere provident molestias ipsam sint voluptatum
                      pariatur.
                    </p>
                    <Link
                      className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                      to="/category"
                    >
                      <span>Shop Now</span>
                      <svg
                        className="h-5 w-5 mx-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:flex mt-8 md:-mx-4">
                <div
                  className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                  style={{
                    backgroundImage: `url(/uploads/${data[1].image})`,
                  }}
                >
                  <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                      <h2 className="text-2xl text-white font-semibold">
                        Mobiles
                      </h2>
                      <p className="mt-2 text-gray-400">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Tempore facere provident molestias ipsam sint
                        voluptatum pariatur.
                      </p>
                      <Link
                        className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                        to="/category"
                      >
                        <span>Shop Now</span>
                        <svg
                          className="h-5 w-5 mx-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
                  style={{
                    backgroundImage: `url(/uploads/${data[2].image})`,
                  }}
                >
                  <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                      <h2 className="text-2xl text-white font-semibold">
                        EarPhones
                      </h2>
                      <p className="mt-2 text-gray-400">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Tempore facere provident molestias ipsam sint
                        voluptatum pariatur.
                      </p>
                      <Link
                        className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                        to="/category"
                      >
                        <span>Shop Now</span>
                        <svg
                          className="h-5 w-5 mx-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Slider;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Popular() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4005/user/viewAllProducts")
      .then((res) => {
        console.log("response view hotel", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
              href="#"
            >
              Popular Products
            </a>
            <div className="lg:col-span-3 lg:py-8">
              <ul className="grid grid-cols-3 gap-4 ">
                {data.slice(0, 3).map((product, index) => (
                  <li key={index}>
                     
                    <Link to={`/product/${product._id}`} className="group block shadow-md p-4">
                      <img
                        src={`uploads/${product.images[1]}`}
                        alt={product.name}
                        className="aspect-square w-full rounded object-cover p-20"
                      />
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-700">${product.price}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Popular;



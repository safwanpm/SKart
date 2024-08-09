import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CheckOutPrdcts() {
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOffer, setTotalOffer] = useState(0);
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post("http://localhost:4005/cart/viewCart", { userId: userId })
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
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleDelete = (productId) => {
    // Handle delete logic here
  }

  return (
    <>
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="text-xl font-semibold">Your cart</h2>
        <ul className="flex flex-col divide-y dark:divide-gray-300">
          {data.map((item) => (
            <li className="flex flex-col py-2 sm:flex-row sm:justify-between" key={item.productId}>
              <div className="flex w-full space-x-2 sm:space-x-4">
                <Link to={`/product/${item.productData._id}`}>
                  <img
                    src={`/uploads/${item.productData.images[0]}`}
                    alt={item.productData.name}
                    className=" p-5 w-22 h-22 object-cover"
                  />
                </Link>
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {item.productData.name}
                      </h3>
                      <p className="text-sm dark:text-gray-600">Classic</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{item.productData.price}€</p>
                      <p className="text-sm line-through dark:text-gray-400">
                        {item.productData.offer}€
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x">
                    <button
                      onClick={() => handleDelete(item.productId)}
                      type="button"
                      className="flex items-right px-2 py-1 pl-0 space-x-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>Remove</span>
                    </button>
                    {/* <button
                      type="button"
                      className="flex items-center px-2 py-1 space-x-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533,0.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                      </svg>
                      <span>Add to favorites</span>
                    </button> */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* <div className="flex justify-between">
          <div>
            <p className="text-lg font-semibold">Total Price: {totalPrice}€</p>
            <p className="text-sm dark:text-gray-600">Total Offer: {totalOffer}€</p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default CheckOutPrdcts;

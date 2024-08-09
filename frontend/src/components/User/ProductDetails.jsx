import React, { useEffect, useState } from "react";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  deleteCart,
  fetchCart,
  setInCart,
  
} from "../../redux/CartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [mainPicture, setMainPicture] = useState(0);
  
  const [isInWishlist, setIsInWishlist] = useState(false);
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const inCart = useSelector((state) => state.cart.inCart);
  useEffect(() => {
    dispatch(fetchCart(userId));
    axios
      .get(`http://localhost:4005/user/viewProduct/${id}`)
      .then((res) => {
        setData(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });

    
    // Check if product is in wishlist
    axios
      .post("http://localhost:4005/cart/checkWishlist", {
        userId: userId,
        productId: id,
      })
      .then((res) => {
        setIsInWishlist(res.data.inWishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, dispatch,userId]);

  if (!data) {
    return (
      <div className="grid h-screen justify-center items-center place-content-center bg-white px-4 ">
        <h1 className="uppercase tracking-widest text-gray-500">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-gray-800 animate-spin absolute" />
        </h1>
      </div>
    );
  }

  const starsNumber = Math.floor(data.rating || 0);
  const isHalfStar = !Number.isInteger(data.rating);
  const emptyStars = 5 - Math.ceil(data.rating || 0);



  const handleAddToCart = (productId) => {
    dispatch(addCart({ userId, productId }))
        .then(() => {
            dispatch(setInCart({ productId, isInCart: true })); // Ensure this action is defined elsewhere
            toast.success('Added to cart');
        })
        .catch((error) => {
            console.error('Failed to add to cart:', error);
            toast.error('Failed to add to cart');
        });
};



  const handleDeleteCart = (productId) => {
    dispatch(deleteCart({ userId, productId }))
      .then(() => {
        dispatch(setInCart({ productId, isInCart: true   }));
        toast.success('Removed from cart');
      })
      .catch((error) => {
        console.error('Failed to remove from cart:', error);
        toast.error('Failed to remove from cart');
      });
  };
  const handleAddToWhislist = () => {
    if (role === "1") {
      const productDetails = {
        userId: userId,
        productId: data._id,
        email: email,
        productName: data.name,
      };

      axios
        .post("http://localhost:4005/cart/addWishlist", productDetails)
        .then((res) => {
          console.log("Product added to wishlist:", res.data);
          toast.success(res.data.message);
          setIsInWishlist(true);
        })
        .catch((err) => {
          console.error("Error adding product to wishlist:", err);
          toast.error(err.response.data.message);
        });
    } else {
      toast.warning(
        "You do not have permission to add items to the wishlist, Please Login"
      );
      Navigate("/login");
    }
  };
  const handleDeleteWishlist = (productId) => {
    axios
      .post("http://localhost:4005/cart/deleteWishlist", { productId, userId })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setIsInWishlist(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateAfterPrice = (price, offerPercent) => {
    const discount = (price * offerPercent) / 100;
    const afterPrice = Math.floor(price - discount); // Use Math.floor to remove decimal places
    return afterPrice.toString(); // Convert to string for display
  };

  return (
    <>
      <div className="mx-auto px-20 w-full max-w-7xl bg-white text-gray-700 ">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              {data && data.category ? (
                <Link
                  to="/category"
                  className="block transition hover:text-gray-700"
                >
                  {data.category.charAt(0).toUpperCase() +
                    data.category.slice(1).toLowerCase()}
                </Link>
              ) : (
                <Link
                  to="/category"
                  className="block transition hover:text-gray-700"
                >
                  Category
                </Link>
              )}
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
              <a href="" className="block transition hover:text-gray-700">
                {data.name}
              </a>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row">
          {/* PICTURES CONTAINER */}
          <div className="py-8 w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-auto h-56 sm:h-72 lg:h-full max-h-96 overflow-hidden">
              <img
                src={`/uploads/${data.images[mainPicture]}`}
                alt={`Product image ${mainPicture + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
            {/* Gallery */}
            <div className="mt-6 mx-auto">
              <ul className="grid grid-flow-col auto-cols-fr gap-7 ">
                {data.images.map((image, index) => (
                  <li
                    key={index}
                    className={`col-span-1 p-1 w-16 rounded border-2 ${
                      index === mainPicture
                        ? "border-yellow-600"
                        : "border-transparent"
                    }`}
                  >
                    <button
                      type="button"
                      className="block h-full rounded overflow-hidden"
                      onClick={() => setMainPicture(index)}
                    >
                      <img
                        src={`/uploads/${data.images[index + 0]}`}
                        alt={`Product image ${index + 1}`}
                        className="object-contain"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="lg:py-8 w-full lg:w-1/2 flex flex-col lg:border-l-2 border-gray-200">
            <div className="order-3 lg:order-1 pb-5 sm:px-6 lg:border-b-2 border-gray-200">
              <h1 className="hidden lg:block text-4xl text-gray-700 font-light tracking-wide">
                {data.name}
              </h1>
              <p className="mt-10 text-base text-gray-500">
                {data.description}
              </p>
              <ul className="my-5 flex flex-col space-y-2">
                <li className="inline-flex items-center space-x-2 text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                  <span className="text-sm font-semibold">Description:</span>
                  <span className="text-sm font-normal">
                    {data.description}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2 text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                  <span className="text-sm font-semibold">Brand:</span>
                  <span className="text-sm font-normal">{data.brand}</span>
                </li>
                <li className="inline-flex items-center space-x-2 text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                  <span className="text-sm font-semibold">Stock:</span>

                  {data.stock > 0 ? (
                    data.stock < 3 ? (
                      <span className="text-sm font-bold text-red-500">
                        Only {data.stock} left
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-green-500">
                        Available
                      </span>
                    )
                  ) : (
                    <span className="text-sm font-bold text-red-500">
                      Out of Stock
                    </span>
                  )}
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 py-8 sm:px-6 border-b-2 border-gray-200">
              <h1 className="mb-5 block lg:hidden text-3xl sm:text-4xl text-gray-700 font-light tracking-wide">
                {data.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <label htmlFor="quantity" className="sr-only">
                  Select the quantity
                </label>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="form-input py-1 pl-2 w-20 rounded border-2 border-gray-300 bg-gray-100 focus:border-yellow-600 focus:ring-0"
                />
              </div>
            </div>
            <div className="ms-2 text-left order-2 lg:order-3 pt-8 sm:px-6 flex flex-wrap lg:flex-nowrap justify-start items-start border-b-2 lg:border-none border-gray-200">
              <span className="text-3xl text-gray-500 font-medium">
                {data.offer && data.offer !== 0 ? (
                  <del className="font-light text-md">{data.price}</del>
                ) : null}
                <span className="px-2">
                  <span className="font-normal"></span>
                  {calculateAfterPrice(data.price, data.offer)}
                </span>
                {data.offer > 0 ? (
                  <span className="text-sm font-bold px-2 text-green-500">
                    {data.offer}% off
                  </span>
                ) : null}
              </span>
            </div>

            <div className="order-2 lg:order-3 pt-8 sm:px-6 flex flex-wrap lg:flex-nowrap justify-around items-center border-b-2 lg:border-none border-gray-200">
              {inCart ? (
                <button
                  type="button"
                  onClick={() => handleDeleteCart(id)}
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-red-500 text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-red-600"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddToCart(id)}
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-yellow-500 text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              )}
              {isInWishlist ? (
                <button
                  type="button"
                  onClick={() => handleDeleteWishlist(data._id)}
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-red-500 text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-red-600"
                >
                  Remove from Wishlist
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToWhislist}
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-yellow-500 text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-yellow-600"
                >
                  Add to Wishlist
                </button>
              )}
              <div className="m-2.5 flex items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(starsNumber)].map((star, index) => (
                    <span key={index} className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-yellow-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    </span>
                  ))}
                  {isHalfStar && (
                    <span className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-yellow-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
                      </svg>
                    </span>
                  )}
                  {[...Array(emptyStars)].map((star, index) => (
                    <span key={index} className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-yellow-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
                      </svg>
                    </span>
                  ))}
                </div>
                <a
                  href="#link"
                  className="ml-2 text-sm text-sky-400 font-medium tracking-wide hover:text-sky-500 hover:underline"
                >
                  {`${data.reviews || 0} reviews`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

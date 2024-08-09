
import React from "react";
import Navbar from "../User/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddHomeSlider() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    offer: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);

  const setRegister = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const validate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "Enter name";
    }
    if (!values.category) {
      error.category = "Select category";
    }
    if (!values.description) {
      error.description = "Enter description";
    }
    if (!values.price) {
      error.price = "Enter price";
    }
    if (!values.offer) {
      error.offer = "Enter offer";
    }
    if (!values.image) {
      error.image = "Upload image";
    }
    return error;
  };

  const validation = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (image) {
        const single = new FormData();
        single.append("image", image);

        axios
          .post("http://localhost:4005/admin/upload-slider", single)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("Error in POST request:", err);
          });
      }

      axios
        .post("http://localhost:4005/admin/addSliderProduct", data)
        .then((res) => {
          console.log("Response from POST request:", res);
          toast(res.data.message);
        })
        .catch((err) => {
          console.log("Error in POST request:", err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-8 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>
        <form className="space-y-4" onSubmit={validation}>
          <div className="grid grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium">
                Product Name
              </label>
              <input
                onChange={setRegister}
                type="text"
                id="productName"
                name="name"
                className="input-field"
                placeholder="Enter product name"
              />
            </div>
            {/* Product Description */}
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                onChange={setRegister}
                id="productDescription"
                name="description"
                className="input-field"
                rows="4"
                placeholder="Enter product description"
              ></textarea>
            </div>
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="input-field"
                onChange={setRegister}
                value={data.category}
              >
                <option value="">Select</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="earphone">Earphone</option>
              </select>
            </div>
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                onChange={setRegister}
                type="number"
                id="price"
                name="price"
                className="input-field"
                placeholder="Enter product price"
              />
            </div>
            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium">
                Stock
              </label>
              <input
                onChange={setRegister}
                type="number"
                id="stock"
                name="stock"
                className="input-field"
                placeholder="Enter product stock"
              />
            </div>
            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium">
                Brand
              </label>
              <input
                onChange={setRegister}
                type="text"
                id="brand"
                name="brand"
                className="input-field"
                placeholder="Enter product brand"
              />
            </div>
            {/* Offer */}
            <div>
              <label htmlFor="offer" className="block text-sm font-medium">
                Offer
              </label>
              <input
                onChange={setRegister}
                type="text"
                id="offer"
                name="offer"
                className="input-field"
                placeholder="Enter product offer"
              />
            </div>
            {/* Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Image
              </label>
              <input
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                  setData({ ...data, image: e.target.files[0].name });
                }}
                type="file"
                id="image"
                name="image"
                className="bg-black text-white"
              />
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddHomeSlider;

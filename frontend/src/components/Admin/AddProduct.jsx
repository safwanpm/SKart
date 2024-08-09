import React from "react";
import Navbar from "../User/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    // category: "",
    stock: "",
    brand: "",
    offer: "",
    images: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const setRegister = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
    console.log(data);
  };
  const [files, setfiles] = useState([]);
  const validate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "Enter name";
    }

    // if (!values.category) {
    //   error.category = "select category";
    // }
    if (!values.description) {
      error.description = "Enter description";
    }
    if (!values.price) {
      error.price = "Enter price";
    }
    if (!values.offer) {
      error.offer = "Enter offer";
    }
    if (!values.brand) {
      error.brand = "Enter brand";
    }

    if (!values.images) {
      error.images = "Upload image";
    }

    return error;
  };

  // const Updatevalidation = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(data));
  //   setIsSubmit(true);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     axios
  //       .put("http://localhost:4000/admin/update-hotel", data)
  //       .then((res) => {
  //         console.log(res);
  //         navigate("hotel/hotel_details");
  //         toast.success(res.data.message);
  //       })
  //       .catch((err) => {
  //         console.log("error ", err);
  //       });
  //   }
  // };


  const handleUpdate= ()=>{
    axios
          .post("http://localhost:4005/admin/upload-images", data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("Error in POST request:", err);
          });
  }
  const validation = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (files.length > 0) {
        const data = new FormData();

        files.forEach((files) => {
          data.append("files", files);
        });

        axios
          .post("http://localhost:4005/admin/upload-images", data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("Error in POST request:", err);
          });
      }
      // if (logo) {
      //   const single = new FormData();

      //   single.append("logo", logo);

      //   axios
      //     .post("http://localhost:4000/admin/upload-logo", single)
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log("Error in POST request:", err);
      //     });
      // }

      axios
        .post("http://localhost:4005/admin/addProduct", data)
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
              <label
                htmlFor="productName"
                className="block text-sm font-medium"
              >
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
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium"
              >
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
                className="input-field border p-2"
                placeholder="Enter product offer"
              />
            </div>
            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Images
              </label>
              <input
                multiple
                onChange={(e) => {
                  console.log(e.target.files);
                  setfiles([...e.target.files]);
                  setdata({
                    ...data,
                    images: [...e.target.files].map((file) => file.name),
                  });
                }}
                onClick={() => {
                  setFormErrors({ ...formErrors, images: "" });
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
            onClick={validation}
            className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;

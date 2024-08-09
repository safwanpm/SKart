import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function AddAddress() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const [data, setData] = useState({
    name: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
    houseNo: "",
    street: "",
  });

  const handleDetails = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
const navigate= useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4005/user/addAddress", { ...data, userId })
      .then((res) => {
        console.log(res, "response from addAddress");
        toast.success(res.data.message)
        navigate('/profile')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <section className="md:mx-40 px-20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                onChange={handleDetails}
                type="text"
                id="name"
                name="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Bonnie Green"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                State*
              </label>
              <select
                name="state"
                onChange={handleDetails}
                id="state"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                required
              >
                <option value="" selected disabled>
                  Select your state
                </option>
                <option value="AP">Andhra Pradesh</option>
              <option value="AR">Arunachal Pradesh</option>
              <option value="AS">Assam</option>
              <option value="BR">Bihar</option>
              <option value="CT">Chhattisgarh</option>
              <option value="GA">Goa</option>
              <option value="GJ">Gujarat</option>
              <option value="HR">Haryana</option>
              <option value="HP">Himachal Pradesh</option>
              <option value="JK">Jammu and Kashmir</option>
              <option value="JH">Jharkhand</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
              <option value="MZ">Mizoram</option>
              <option value="NL">Nagaland</option>
              <option value="OR">Odisha</option>
              <option value="PB">Punjab</option>
              <option value="RJ">Rajasthan</option>
              <option value="SK">Sikkim</option>
              <option value="TN">Tamil Nadu</option>
              <option value="TG">Telangana</option>
              <option value="TR">Tripura</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="UT">Uttarakhand</option>
              <option value="WB">West Bengal</option>
              <option value="AN">Andaman and Nicobar Islands</option>
              <option value="CH">Chandigarh</option>
              <option value="DN">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="LD">Lakshadweep</option>
              <option value="DL">Delhi</option>
              <option value="PY">Puducherry</option>
          
              </select>
            </div>
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                City*
              </label>
              <input
                onChange={handleDetails}
                name="city"
                type="text"
                id="city"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Pincode*
              </label>
              <input
                onChange={handleDetails}
                name="pincode"
                type="text"
                id="pincode"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Enter postal code"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                onChange={handleDetails}
                type="tel"
                id="phone"
                name="phone"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="123-456-7890"
                required
              />
            </div>

            <div>
              <label htmlFor="houseNo" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                House No./Area
              </label>
              <input
                onChange={handleDetails}
                type="text"
                id="houseNo"
                name="houseNo"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="1234 Main St"
                required
              />
            </div>
            <div>
              <label htmlFor="street" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Street
              </label>
              <input
                onChange={handleDetails}
                type="text"
                id="street"
                name="street"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="1234 Main St"
                required
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddAddress;

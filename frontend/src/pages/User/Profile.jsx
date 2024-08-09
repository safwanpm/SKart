// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/User/Navbar";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [addresses, setAddresses] = useState([]);

//   const userId = localStorage.getItem("userId");
//   useEffect(() => {
//     axios
//       .post(`http://localhost:4005/user/viewAddress/${userId}`)
//       .then((res) => {
//         console.log(res);
//         setAddresses(res.data.data.address);
//       });
//   }, []);
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleDeleteAddress = (id) => {
//     setAddresses(addresses.filter((address) => address.id !== id));
//   };

//   const handleEditAddress = (id) => {
//     const address = addresses.find((address) => address.id === id);
//     const newAddress = prompt("Edit address:", address.address);
//     if (newAddress) {
//       setAddresses(
//         addresses.map((addr) =>
//           addr.id === id ? { ...addr, address: newAddress } : addr
//         )
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="flex items-center justify-between px-6 py-4 bg-gray-200 border-b">
//             <h1 className="text-xl font-semibold text-gray-700">
//               User Dashboard
//             </h1>
//           </div>
//           <div className="flex">
//             {/* Sidebar Navigation */}
//             <nav className="w-1/4 bg-gray-100 p-4 space-y-2">
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "profile"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("profile")}
//               >
//                 Profile
//               </button>
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "orders"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("orders")}
//               >
//                 My Orders
//               </button>
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "address"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("address")}
//               >
//                 My Address
//               </button>
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "rewards"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("rewards")}
//               >
//                 Rewards
//               </button>
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "wallet"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("wallet")}
//               >
//                 Wallet
//               </button>
//               <button
//                 className={`w-full text-left px-3 py-2 rounded-md ${
//                   activeTab === "reviews"
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleTabChange("reviews")}
//               >
//                 Reviews
//               </button>
//               <button
//                 className="w-full text-left px-3 py-2 text-red-500 hover:text-red-700"
//                 onClick={() => alert("Logging out...")}
//               >
//                 Logout
//               </button>
//             </nav>
//             {/* Main Content */}
//             <div className="w-3/4 p-6">
//               {activeTab === "profile" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Profile Information
//                   </h2>
//                   <div className="flex items-center space-x-6 mt-4">
//                     <img
//                       className="w-24 h-24 rounded-full object-cover"
//                       src="https://via.placeholder.com/150"
//                       alt="Profile"
//                     />
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-800">
//                         John Doe
//                       </h3>
//                       <p className="text-gray-600">johndoe@example.com</p>
//                       <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "orders" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Order History
//                   </h2>
//                   <ul className="mt-4">
//                     <li className="flex justify-between py-2 border-b">
//                       <span>Order #1234</span>
//                       <span>$99.99</span>
//                     </li>
//                     <li className="flex justify-between py-2 border-b">
//                       <span>Order #5678</span>
//                       <span>$49.99</span>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               {activeTab === "address" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Shipping Addresses
//                   </h2>
//                   <ul className="mt-4 space-y-4">
//                     {addresses.map((address) => (
//                       <li
//                         key={address.id}
//                         className="flex justify-between items-center border p-4 rounded-md shadow-sm"
//                       >
//                         <p className="text-gray-600">{address.address}</p>
//                         <div className="flex space-x-2">
//                           <FaEdit
//                             className="mr-1 bg-white cursor-pointer"
//                             onClick={() => handleEditAddress(address.id)}
//                           ></FaEdit>

//                           <FaTrash
//                             className="mr-1 bg-white cursor-pointer"
//                             onClick={() => handleDeleteAddress(address.id)}
//                           ></FaTrash>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                   <Link
//                     to={"/addAddress"}
//                     className="mt-4 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Add Address
//                   </Link>
//                 </div>
//               )}
//               {activeTab === "rewards" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Rewards
//                   </h2>
//                   <div className="mt-4 grid grid-cols-2 gap-4">
//                     <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
//                       <h3 className="font-medium text-gray-800">
//                         Scratch Card #1
//                       </h3>
//                       <p className="text-gray-600">Win up to $10</p>
//                     </div>
//                     <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
//                       <h3 className="font-medium text-gray-800">
//                         Scratch Card #2
//                       </h3>
//                       <p className="text-gray-600">Win up to $20</p>
//                     </div>
//                     <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
//                       <h3 className="font-medium text-gray-800">
//                         Scratch Card #3
//                       </h3>
//                       <p className="text-gray-600">Win up to $50</p>
//                     </div>
//                     <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
//                       <h3 className="font-medium text-gray-800">
//                         Scratch Card #4
//                       </h3>
//                       <p className="text-gray-600">Win up to $100</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "wallet" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Wallet
//                   </h2>
//                   <p className="mt-2 text-gray-600">Wallet Balance: $200.00</p>
//                   <h3 className="mt-4 text-md font-semibold text-gray-800">
//                     Transaction History
//                   </h3>
//                   <ul className="mt-2">
//                     <li className="flex justify-between py-2 border-b">
//                       <span>Transaction #1</span>
//                       <span>+$50.00</span>
//                     </li>
//                     <li className="flex justify-between py-2 border-b">
//                       <span>Transaction #2</span>
//                       <span>-$25.00</span>
//                     </li>
//                     <li className="flex justify-between py-2 border-b">
//                       <span>Transaction #3</span>
//                       <span>+$75.00</span>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               {activeTab === "reviews" && (
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Reviews
//                   </h2>
//                   <ul className="mt-4">
//                     <li className="py-2 border-b">
//                       <p className="text-gray-600">
//                         Great product! Really loved it.
//                       </p>
//                     </li>
//                     <li className="py-2 border-b">
//                       <p className="text-gray-600">
//                         Fast delivery and excellent service.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import Navbar from "../../components/User/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [data, setdata] = useState([])
const navigate= useNavigate()
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post(`http://localhost:4005/user/viewProfile/${userId}`)
      .then((res) => {
        setAddresses(res.data.data.address);
        setdata(res.data.data)
      });
  }, [userId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const HandleLogout = () => {
    toast.success("Logout success");
    navigate('/home')
    localStorage.clear();
    
   
    
  };
  const handleDeleteAddress = (addressId) => {
    axios
      .post(`http://localhost:4005/user/deleteAddress/${userId}`, { addressId })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress(address.address);
  };

  const handleSaveAddress = (id) => {
    axios
      .post(`http://localhost:4005/user/editAddress`, {
        id,
        address: newAddress,
      })
      .then((res) => {
        setAddresses(
          addresses.map((addr) =>
            addr.id === id ? { ...addr, address: newAddress } : addr
          )
        );
        setEditingAddress(null);
        setNewAddress("");
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-semibold text-gray-700">
              User Dashboard
            </h1>
            
          </div>
          
          <div className="flex">
            {/* Sidebar Navigation */}
            <nav className="w-1/4 bg-gray-100 p-4 space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "profile"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("profile")}
              >
                Profile
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "orders"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("orders")}
              >
                My Orders
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "address"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("address")}
              >
                My Address
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "rewards"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("rewards")}
              >
                Rewards
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "wallet"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("wallet")}
              >
                Wallet
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "reviews"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-500 hover:text-white"
              }`}
                onClick={() => handleTabChange("reviews")}
              >
                Reviews
              </button>
              <button
                className="w-full text-left px-3 py-2 text-red-500 hover:text-red-700"
                onClick={() => HandleLogout()}
              >
                Logout
              </button>
            </nav>
            {/* Main Content */}
            <div className="w-3/4 p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Profile Information
                  </h2>
                  <div className="flex items-center space-x-6 mt-4">
                    <img
                      className="w-24 h-24 rounded-full object-cover"
                      src="https://via.placeholder.com/150"
                      alt="Profile"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                       {data.name}
                      </h3>
                      <p className="text-gray-600">{data.email}</p>
                      <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "orders" && (
          <div className="max-w-4xl mx-auto bg-white shadow-lg p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-semibold">Order Details</h2>
            <div>
              <div>Order Number: #HDB845</div>
              <div>Order Placement: 15th March, 2025</div>
            </div>
          </div>
          <div className="text-sm mt-4">
            <div>Your order will be with you soon</div>
          </div>
          <div className="mt-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Delivery Expected</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="flex items-center space-x-4">
                    <img
                      src="https://via.placeholder.com/50" // Placeholder image URL
                      alt="Mist Black Triblend"
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      Mist Black Triblend
                      <br />
                      Color: White Size: Medium
                    </div>
                  </td>
                  <td>Qty: 01</td>
                  <td>$120.00</td>
                  <td>23rd Dec, 2025</td>
                  <td className="flex space-x-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Track
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Cancel
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="flex items-center space-x-4">
                    <img
                      src="https://via.placeholder.com/50" // Placeholder image URL
                      alt="Trendy Black T-shirt"
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      Trendy Black T-shirt
                      <br />
                      Color: Black Size: Medium
                    </div>
                  </td>
                  <td>Qty: 01</td>
                  <td>$90.00</td>
                  <td>13th Dec, 2025</td>
                  <td className="flex space-x-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Track
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-right mt-2">
            <span className="text-lg font-semibold">Total: $210.00</span>
          </div>
        </div>
        
             
              )}
              {activeTab === "address" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Shipping Addresses
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {addresses.map((address) => (
                      <li
                        key={address._id}
                        className=" flex justify-between items-center border p-4 rounded-md shadow-sm"
                      >
                        {editingAddress && editingAddress._id === address._id ? (
                          <div className="flex-grow">
                            <input
                              className="w-full px-2 py-1 border rounded-md"
                              value={newAddress}
                              onChange={(e) => setNewAddress(e.target.value)}
                            />
                            <button
                              className="mt-2 px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                              onClick={() => handleSaveAddress(address._id)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <>
                            <div>
                              <p className="text-gray-600">{address.name}</p>
                              <p className="text-gray-600">
                                {address.houseNo} , {address.city} ,{" "}
                                {address.state} , {address.pin}
                              </p>
                              <p className="text-gray-600">{address.phone}</p>
                            </div>

                            <div className="flex space-x-2">
                              <FaEdit
                                className="mr-1 bg-white cursor-pointer"
                                onClick={() => handleEditAddress(address._id)}
                              />
                              <FaTrash
                                className="mr-1 bg-white cursor-pointer"
                                onClick={() => handleDeleteAddress(address._id)}
                              />
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* <Link
                    to={"/addAddress"}
                    className="mt-6 my-5 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Address
                  </Link> */}
                  <div className="sm:col-span-2 mt-4">
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
                </div>
              )}
              {activeTab === "rewards" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Rewards
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
                      <h3 className="font-medium text-gray-800">
                        Scratch Card #1
                      </h3>
                      <p className="text-gray-600">Win up to $10</p>
                    </div>
                    <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
                      <h3 className="font-medium text-gray-800">
                        Scratch Card #2
                      </h3>
                      <p className="text-gray-600">Win up to $20</p>
                    </div>
                    <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
                      <h3 className="font-medium text-gray-800">
                        Scratch Card #3
                      </h3>
                      <p className="text-gray-600">Win up to $50</p>
                    </div>
                    <div className="border p-4 rounded-md shadow-sm bg-yellow-100">
                      <h3 className="font-medium text-gray-800">
                        Scratch Card #4
                      </h3>
                      <p className="text-gray-600">Win up to $100</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "wallet" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Wallet
                  </h2>
                  <p className="mt-2 text-gray-600">Wallet Balance: $200.00</p>
                  <h3 className="mt-4 text-md font-semibold text-gray-800">
                    Transaction History
                  </h3>
                  <ul className="mt-2">
                    <li className="flex justify-between py-2 border-b">
                      <span>Transaction #1</span>
                      <span>+$50.00</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span>Transaction #2</span>
                      <span>-$25.00</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span>Transaction #3</span>
                      <span>+$75.00</span>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Reviews
                  </h2>
                  <ul className="mt-4">
                    <li className="py-2 border-b">
                      <p className="text-gray-600">
                        Great product! Really loved it.
                      </p>
                    </li>
                    <li className="py-2 border-b">
                      <p className="text-gray-600">
                        Fast delivery and excellent service.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

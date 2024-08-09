import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/User/Navbar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchSliders();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(
      "http://localhost:4005/user/viewAllProducts"
    );
    setProducts(response.data.data);
  };

  const fetchSliders = async () => {
    const response = await axios.get("http://localhost:4005/admin/viewSlider");
    setSliders(response.data.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4005/admin/viewUsers");
    setUsers(response.data.data);
  };
  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:4005/admin/viewOrders");
    console.log(response, "res from viewOrder");
    console.log(response.data.data.address, "res from viewOrderProducts");

    setOrders(response.data.data);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    toast.success("Logout success");
    navigate("/home");
    localStorage.clear();
  };

  const handleDeleteProduct = async (productId) => {
    await axios
      .get(`http://localhost:4005/admin/deleteProduct/${productId}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    fetchProducts();
  };

  const handleDeleteSlider = async (sliderId) => {
    await axios.delete(`http://localhost:4005/admin/sliders/${sliderId}`);
    toast.success("Slider deleted successfully");
    fetchSliders();
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:4005/admin/users/${userId}`);
    toast.success("User deleted successfully");
    fetchUsers();
  };
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:4005/admin/updateOrderStatus/${orderId}`,
        { status }
      );
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-semibold text-gray-700">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex">
            <nav className="w-1/4 bg-gray-100 p-4 space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "products"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("products")}
              >
                Products
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "sliders"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("sliders")}
              >
                Sliders
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "orders"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("orders")}
              >
                Orders
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "users"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("users")}
              >
                Users
              </button>
              <button
                className="w-full text-left px-3 py-2 text-red-500 hover:text-red-700"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </nav>
            <div className="w-3/4 p-6">
              {activeTab === "products" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Manage Products
                  </h2>
                  <Link
                    to="/admin/addProduct"
                    className="mt-4 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Product
                  </Link>
                  <ul className="mt-4">
                    {products.map((product) => (
                      <li
                        key={product._id}
                        className="flex justify-between py-2 border-b"
                      >
                        <span>{product.name}</span>
                        <div className="flex space-x-2">
                          <Link to={`/admin/editProduct/${product._id}`}>
                            <FaEdit className="mr-1 bg-white cursor-pointer" />
                          </Link>
                          <FaTrash
                            className="mr-1 bg-white cursor-pointer"
                            onClick={() => handleDeleteProduct(product._id)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "sliders" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Manage Sliders
                  </h2>
                  <Link
                    to="/admin/addSlider"
                    className="mt-4 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Slider
                  </Link>
                  <ul className="mt-4">
                    {sliders.map((slider) => (
                      <li
                        key={slider.id}
                        className="flex justify-between py-2 border-b"
                      >
                        <span>{slider.name}</span>
                        <div className="flex space-x-2">
                          <Link to={`/admin/editSlider/${slider.id}`}>
                            <FaEdit className="mr-1 bg-white cursor-pointer" />
                          </Link>
                          <FaTrash
                            className="mr-1 bg-white cursor-pointer"
                            onClick={() => handleDeleteSlider(slider.id)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "orders" && (
                // <div>
                //   <h2 className="text-lg font-semibold text-gray-800">
                //     Manage Orders
                //   </h2>
                //   <ul className="mt-4">
                //     {orders.map((order) => (
                //       <li
                //         key={order._id}
                //         className="flex justify-between py-2 border-b"
                //       >
                //         <div>
                //           <p>Order ID: {order._id}</p>
                //           <p>
                //             Date: {order.purchaseDate}
                //           </p>
                //           <p>Product ID: {order.products.productId}</p>
                //           <p>Price: ${order.totalPrice}</p>
                //           <p>Status: {order.status}</p>
                //         </div>
                //         <div className="flex space-x-2">
                //           <button
                //             className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                //             onClick={() =>
                //               handleUpdateOrderStatus(order._id, "shipped")
                //             }
                //           >
                //             Mark as Shipped
                //           </button>
                //           <button
                //             className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                //             onClick={() =>
                //               handleUpdateOrderStatus(order._id, "delivered")
                //             }
                //           >
                //             Mark as Delivered
                //           </button>
                //           <button
                //             className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                //             onClick={() =>
                //               handleUpdateOrderStatus(order._id, "canceled")
                //             }
                //           >
                //             Cancel Order
                //           </button>
                //         </div>
                //       </li>
                //     ))}
                //   </ul>
                // </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Manage Orders
                  </h2>
                  <ul className="mt-4">
                    {orders.map((order) => (
                      <li
                        key={order._id}
                        className="flex justify-between py-2 border-b"
                      >
                        <div>
                          <p>Order ID: {order._id}</p>
                          <p>Date: {order.purchaseDate}</p>
                          <p>Price: ${order.totalPrice}</p>
                          <p>Status: {order.status}</p>
                          {order.products.map((product) => (
                            <div  className="mt-2">
                              <p>{product.productName}</p>
                              <img
                              src={`/uploads/${product.productImage}`}
                              alt={product.productName}
                                className="w-16 h-16  p-4 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "shipped")
                            }
                          >
                            Mark as Shipped
                          </button>
                          <button
                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "delivered")
                            }
                          >
                            Mark as Delivered
                          </button>
                          <button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "canceled")
                            }
                          >
                            Cancel Order
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "users" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Manage Users
                  </h2>
                  <ul className="mt-4">
                    {users.map((user) => (
                      <li
                        key={user.id}
                        className="flex justify-between py-2 border-b"
                      >
                        <span>{user.name}</span>
                        <div className="flex space-x-2">
                          <Link to={`/admin/editUser/${user.id}`}>
                            <FaEdit className="mr-1 bg-white cursor-pointer" />
                          </Link>
                          <FaTrash
                            className="mr-1 bg-white cursor-pointer"
                            onClick={() => handleDeleteUser(user.id)}
                          />
                        </div>
                      </li>
                    ))}
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

export default AdminDashboard;

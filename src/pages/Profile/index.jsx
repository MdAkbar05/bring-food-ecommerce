import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orderSlice";

const Profile = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo?.user);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const googleUser = useAuth(); // Optional hook to get current user info
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    photoURL: "",
    role: "user",
  });

  useEffect(() => {
    if (googleUser) {
      setUser({
        username: googleUser?.displayName,
        email: googleUser?.email,
        photoURL: googleUser?.photoURL,
        role: googleUser?.email.endsWith("@gmail.com") ? "admin" : "user",
      });
    } else {
      setUser({
        username: userInfo?.username,
        email: userInfo?.email,
        photoURL: "",
        role: userInfo?.role,
      });
    }
  }, [googleUser]);

  const { orders } = useSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(fetchOrders());
    console.log(userInfo);
    // filter with logged user orders
    if (userInfo) {
      const filteredOrders = orders.filter(
        (order) => order?.customerName === userInfo?.username
      );
      setFilteredOrders(filteredOrders);
    } else {
      setFilteredOrders([]);
    }
  }, []);
  console.log(filteredOrders);

  return (
    <div className="container mx-auto h-screen bg-slate-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {user ? (
          <div className="flex items-center space-x-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.username?.slice(0, 1)}
                className="size-20  rounded-full border border-gray-200"
              />
            ) : null}
            <div>
              <h1 className="text-2xl font-bold text-gray-700 uppercase">
                {user.username}
              </h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Your Orders
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full text-left text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Shipping Address</th>
                <th className="px-4 py-2 border-b">Products</th>
                <th className="px-4 py-2 border-b">Total Amount</th>
                <th className="px-4 py-2 border-b">Order Status</th>
                <th className="px-4 py-2 border-b">Order Date</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {user &&
                filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-2 border-b">{order._id}</td>
                    <td className="px-4 py-2 border-b">{order.customerName}</td>
                    <td className="px-4 py-2 border-b">
                      {order.customerEmail}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {order.shippingAddress}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <ul>
                        {order.orderedProducts.map((product) => (
                          <li key={product._id}>
                            {product.productId.name} (x{product.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border-b">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b">{order.orderStatus}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <p className="text-center py-4 text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

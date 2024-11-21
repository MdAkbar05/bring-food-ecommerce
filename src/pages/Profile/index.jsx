import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});

  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(storedUserInfo);
  // Sample usage
  // Pass this data to the Profile component as props
  useEffect(() => {
    // To retrieve and log the data later
    setUser({
      displayName: storedUserInfo.displayName,
      email: storedUserInfo.email,
      photoURL: storedUserInfo.photoURL,
      createdAt: storedUserInfo.createdAt,
      lastLoginAt: storedUserInfo.lastLoginAt,
    });
    console.log(user);
  }, []);

  const orders = [
    {
      orderId: "12345",
      productName: "Wireless Mouse",
      quantity: 2,
      price: 25.99,
      orderDate: "2024-11-15",
    },
    {
      orderId: "67890",
      productName: "Gaming Keyboard",
      quantity: 1,
      price: 49.99,
      orderDate: "2024-11-20",
    },
  ];
  return (
    <div className="container mx-auto h-screen bg-slate-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {user ? (
          <div className="flex items-center space-x-6">
            <img
              src={user.photoURL}
              alt={`${user.displayName}'s profile`}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                {user.displayName}
              </h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">
                Joined: {new Date(Number(user.createdAt)).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Last Login:{" "}
                {new Date(Number(user.lastLoginAt)).toLocaleString()}
              </p>
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
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center py-4 text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

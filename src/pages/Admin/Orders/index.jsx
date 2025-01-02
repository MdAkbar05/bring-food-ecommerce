import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../../features/orderSlice";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { orders, isLoading, error } = useSelector(
    (state) => state.orderReducer
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    toast.success("Order status updated successfully");
  };
  // filter with search term
  const filteredOrders = orders.filter((order) => {
    return order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 ">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
      {filteredOrders?.map((order) => (
        <div key={order._id} className="mb-4">
          <h3 className=" font-semibold text-gray-500">
            Order ID: {order._id}
          </h3>
          <h3 className=" font-semibold">Customer: {order.customerName}</h3>
          <h3 className=" font-semibold text-red-600">
            Total: ${order.totalAmount}
          </h3>
          <h3 className=" font-medium italic">
            Address: {order.shippingAddress}
          </h3>
          <p>Status: {order.orderStatus}</p>
          <button
            onClick={() => handleUpdateOrderStatus(order._id, "Cancelled")}
            className="bg-red-500 text-white px-2 py-0.5 rounded mr-2"
          >
            Mark as Cancelled
          </button>
          <button
            onClick={() => handleUpdateOrderStatus(order._id, "Delivered")}
            className="bg-green-500 text-white px-2 py-0.5 rounded"
          >
            Mark as Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;

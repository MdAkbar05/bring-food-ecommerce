import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../features/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, totalCount, totalPrice } = useSelector(
    (state) => state.cartReducer
  );
  const userInfo = useSelector((state) => state.userReducer.userInfo.user);
  const [customerName, setCustomerName] = useState(userInfo?.username || "");
  const [customerEmail, setCustomerEmail] = useState(userInfo?.email || "");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleCheckout = () => {
    if (!userInfo) {
      return navigate("/login");
    }
    const orderData = {
      customerName: userInfo.username,
      customerEmail: userInfo.email,
      shippingAddress, // Replace with actual shipping address
      orderedProducts: item.map((itm) => ({
        productId: itm._id,
        quantity: itm.quantity,
      })),
      totalAmount: totalPrice,
    };

    dispatch(createOrder(orderData)).then(() => {
      navigate("/profile");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="customerName"
        >
          Name
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="customerEmail"
        >
          Email
        </label>
        <input
          type="email"
          id="customerEmail"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="shippingAddress"
        >
          Shipping Address
        </label>
        <input
          type="text"
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex flex-col justify-center items-start mb-4">
        <div className="pb-2">
          <span className="text-gray-600">Count: </span>
          {totalCount}
        </div>
        <div className="pb-2">
          <span className="text-gray-600">Price: </span>
          {totalPrice + "$"}
        </div>
      </div>
      <button
        className="w-full bg-red-500 text-white rounded-2xl py-2"
        onClick={handleCheckout}
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Checkout;

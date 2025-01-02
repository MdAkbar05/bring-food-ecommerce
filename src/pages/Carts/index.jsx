import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFoud";
import { changeQuantity, removeFromCart } from "../../features/cartSlice";

const CartPage = () => {
  const { item, totalPrice, totalCount } = useSelector(
    (state) => state.cartReducer
  );

  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(changeQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="font-sans container mx-auto px-4 py-8">
      <Title fontSize="24px" title={"Cart Page"} margin="2rem 0 1rem 2.8rem" />
      {item && item.length === 0 ? (
        <NotFound message="Cart Page is Empty" />
      ) : (
        <div className="flex">
          <ul className="rounded-lg border-[0.1px] border-gray-300 p-4">
            {item.map((itm) => (
              <li
                key={itm._id}
                className="flex py-2 justify-start items-center"
              >
                <div className="w-20 px-1.5">
                  <img
                    className="w-full h-16 rounded-full"
                    src={`/productImages/${itm.image}`}
                    alt={itm.name}
                  />
                </div>
                <div className="w-32 ml-6 font-semibold">
                  <Link to={`/food/${itm.id}`}>{itm.name}</Link>
                </div>
                <div className="w-32 text-center flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(itm._id, itm.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4">{itm.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(itm._id, itm.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <div className="w-32 text-center">
                  <span>{" " + itm.price + "$"}</span>
                </div>
                <div className="text-red-500 bg-gray-200 rounded-2xl hover:bg-gray-100 w-32 text-center">
                  <button onClick={() => handleRemove(itm._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout w-fit mx-auto px-32 rounded-lg border-[0.1px] border-gray-300 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-start">
              <div className="pb-2">
                <span className="text-gray-600">Count: </span>
                {totalCount}
              </div>
              <div className="pb-2">
                <span className="text-gray-600">Price: </span>
                {totalPrice + "$"}
              </div>
            </div>
            <Link
              className="w-56 text-center bg-red-500 text-white rounded-2xl"
              to="/checkout"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

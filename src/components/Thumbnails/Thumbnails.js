import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import { useDispatch } from "react-redux";
import { fetchFoodById } from "../../features/foodSlice";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
const Thumbnails = ({ foods }) => {
  const dispatch = useDispatch(); // For dispatching actions
  const navigate = useNavigate();
  return (
    <>
      <ul className="flex lg:flex-row sm:flex-col md:flex-row lg:flex-wrap md:flex-wrap items-center justify-center bg-slate-100 py-2">
        {foods?.map((food) => (
          <li
            className="bg-white py-2 px-3 sm:px-8 mx-4 my-3 sm:flex sm:flex-col sm:items-center sm:w-fit"
            key={food._id}
          >
            <img
              className="rounded w-full h-36"
              src={`/productImages/${food.image}`}
              alt={food.name}
              onClick={() => {
                dispatch(fetchFoodById(food._id));
                navigate(`/food`);
              }}
            />

            <div
              className="food-contents flex flex-col gap-0 justify-center items-start"
              style={{ width: "-webkit-fill-available" }}
            >
              <div className="flex w-full justify-between items-center text-base font-serif mt-2 ">
                <li className="">{food.name}</li>
              </div>

              <div className="flex w-full justify-between items-center">
                <div className="cookTime text-sm">
                  <span>&#x1F570;</span>
                  15-30m
                </div>
              </div>

              <div className="flex w-full justify-between items-center">
                <span className="text-red-400 font-bold text-lg">
                  {food.price}$
                </span>
                {/* add to cart  */}
                <button
                  className="bg-red-200 text-gray-900 font-medium rounded-md px-1.5 py-1 hover:bg-red-400 transition"
                  onClick={() => {
                    dispatch(addToCart(food));
                    toast.success("Added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Thumbnails;

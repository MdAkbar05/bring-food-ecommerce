import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/fooodService";
import StarRating from "../../components/StarRating/StarRating";
import Tag from "../../components/Tags/Tag";
import NotFound from "../../components/NotFoud";
import { addToCart } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodById } from "../../features/foodSlice";

const FoodPage = () => {
  const { food } = useSelector((state) => state.foodReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (food) {
      dispatch(addToCart(food));
      navigate("/cart");
    }
  };

  return (
    <div className="lg:flex sm:block font-sans">
      {!food ? (
        <NotFound message="Food Not Found" linkText="Back To Homepage" />
      ) : (
        <>
          <div className="left-section flex items-center justify-center lg:h-[100vh] sm:h-[50vh] lg:w-[55%] sm:w-full">
            <img
              className="lg:w-[450px] lg:h-[400px] sm:w-[250px] shadow-lg sm:h-[250px] rounded-3xl lg:p-2"
              src={`/productImages/${food.image}`}
              alt={food.name}
            />
          </div>
          <div className="right-section flex flex-col items-start justify-center lg:px-2 sm:px-10 lg:pr-48 lg:w-[45%]">
            <span className="name text-2xl font-semibold">{food.name}</span>

            {/* description */}
            <p className="description mt-4 text-sm text-gray-600">
              {food.description}
            </p>

            <div className="cookTime mt-3">
              <span>
                Time to cook about <strong>15-30m</strong>
              </span>
            </div>
            <div className="price text-base text-gray-500">
              Price{" "}
              <span className="lg:text-2xl sm:text-xl text-green-600">
                {" " + food.price + "$"}
              </span>
            </div>

            <button
              className="mt-4 lg:w-96 sm:w-72 text-center bg-red-600 text-white hover:bg-red-400 transition rounded-full p-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodPage;

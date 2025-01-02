import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoods, fetchFoodByCategory } from "../../features/foodSlice";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isLoading, error } = useSelector(
    (state) => state.foodReducer
  );

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center fontTitle">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 ">
        <div
          className="relative bg-white shadow-md rounded-xl p-4 overflow-hidden flexCenter cursor-pointer hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
          onClick={() => dispatch(fetchFoodByCategory("all"))}
        >
          <div className="absolute -inset-10 opacity-50 bg-cover bg-center filter blur-sm brightness-150 categoryBG"></div>
          <h2 className="relative text-xl font-medium mb-2 text-slate-800 fontSpecial">
            All
          </h2>
        </div>
        {categories.map((category) => (
          <div
            key={category}
            className="relative bg-white shadow-md rounded-xl p-4 overflow-hidden flexCenter cursor-pointer hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
            onClick={() => dispatch(fetchFoodByCategory(category))}
          >
            <div className="absolute -inset-10 opacity-50 bg-cover bg-center filter blur-sm brightness-150 categoryBG"></div>
            <h2 className="relative text-xl font-medium mb-2 text-slate-800 fontSpecial">
              {category}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

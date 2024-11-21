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
  const [food, setFood] = useState({});
  const singleFood = useSelector((state) => state.foodReducer.food);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (food && food.id) {
      dispatch(addToCart(food));
      navigate("/cart");
    }
  };

  useEffect(() => {
    dispatch(fetchFoodById(id)).then((res) => {
      if (res.type === "food/fetchFoodById/rejected") {
        getById(id).then(setFood);
      } else {
        setFood(singleFood);
      }
    });
  }, [id]);

  return (
    <div className="lg:flex sm:block font-sans">
      {!food ? (
        <NotFound message="Food Not Found" linkText="Back To Homepage" />
      ) : (
        <>
          <div className="left-section flex items-center justify-center lg:h-[100vh] sm:h-[50vh] lg:w-[55%] sm:w-full">
            <img
              className="lg:w-[450px] lg:h-[400px] sm:w-[250px] shadow-lg sm:h-[250px] rounded-3xl lg:p-2"
              src={`/foods/${food.imgUrl}`}
              alt={food.name}
            />
          </div>
          <div className="right-section flex flex-col items-start justify-center lg:px-2 sm:px-10 lg:pr-48 lg:w-[45%]">
            <div className="header w-full flex justify-between items-center">
              <span className="name text-2xl font-semibold">{food.name}</span>
              <span
                className={`favorite h-7 text-3xl ${
                  food.favorite ? "text-red-600" : "text-gray-700"
                }`}
              >
                &hearts;
              </span>
            </div>
            <div className="rating">
              <StarRating stars={food.stars} size={20} />
            </div>
            <div className="origins">
              {food.origins?.map((origin) => (
                <span
                  className="bg-blue-50 px-1 font-light text-blue-500 rounded-xl"
                  key={origin}
                >
                  {origin} ,
                </span>
              ))}
            </div>

            <div className="tags">
              {food.tags && (
                <Tag
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
            <div className="cookTime mt-3">
              <span>
                Time to cook about <strong>{food.cookTime}</strong>
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

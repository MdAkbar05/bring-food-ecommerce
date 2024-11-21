import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
const Thumbnails = ({ foods }) => {
  return (
    <>
      <ul className="flex lg:flex-row sm:flex-col md:flex-row lg:flex-wrap md:flex-wrap items-center justify-center bg-slate-100 py-2">
        {foods.map((food) => (
          <li
            className="bg-white py-2 px-3 sm:px-8 mx-4 my-3 sm:flex sm:flex-col sm:items-center sm:w-fit"
            key={food.id}
          >
            <Link to={`/food/${food.id}`}>
              <img
                className="rounded w-full h-36"
                src={`/foods/${food.imgUrl}`}
                alt={food.name}
              />
            </Link>
            <div
              className="food-contents flex flex-col gap-0 justify-center items-start"
              style={{ width: "-webkit-fill-available" }}
            >
              <div className="flex w-full justify-between items-center text-base font-serif mt-2 ">
                <li className="">{food.name}</li>
                <li
                  className={`favorite   h-5 ${
                    food.favorite ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  &hearts;
                </li>
              </div>

              <div className="rating">
                <StarRating stars={food.stars} />
              </div>
              <div className="flex w-full justify-between items-center">
                <div>
                  {food.origins.map((origin) => (
                    <span className="text-sm text-gray-500" key={origin}>
                      {" "}
                      {origin},
                    </span>
                  ))}
                </div>
                <div className="cookTime text-sm">
                  <span>&#x1F570;</span>
                  {food.cookTime}
                </div>
              </div>

              <div>
                <span className="text-red-400">{food.price}$</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Thumbnails;

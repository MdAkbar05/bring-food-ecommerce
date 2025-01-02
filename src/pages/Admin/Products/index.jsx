import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoods,
  createFood,
  updateFood,
  deleteFood,
} from "../../../features/foodSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { foods, isLoading, error } = useSelector((state) => state.foodReducer);
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentFoodId, setCurrentFoodId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  const handleCreateOrUpdateFood = () => {
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", foodData.price);
    formData.append("category", foodData.category);
    if (foodData.image) {
      formData.append("image", foodData.image);
    }

    if (isUpdating) {
      dispatch(updateFood({ id: currentFoodId, updatedFood: formData }));
    } else {
      dispatch(createFood(formData));
    }

    setFoodData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
    setIsUpdating(false);
    setCurrentFoodId(null);
  };

  const handleEditFood = (food) => {
    setFoodData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: null, // Reset image input
    });
    setIsUpdating(true);
    setCurrentFoodId(food._id);
  };

  const handleDeleteFood = (id) => {
    dispatch(deleteFood(id));
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 ">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={foodData.name}
          onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={foodData.description}
          onChange={(e) =>
            setFoodData({ ...foodData, description: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={foodData.price}
          onChange={(e) => setFoodData({ ...foodData, price: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={foodData.category}
          onChange={(e) =>
            setFoodData({ ...foodData, category: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="file"
          onChange={(e) =>
            setFoodData({ ...foodData, image: e.target.files[0] })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleCreateOrUpdateFood}
          className={`${
            isUpdating ? "bg-yellow-500" : "bg-blue-500"
          } text-white p-2 rounded`}
        >
          {isUpdating ? "Update Food" : "Create Food"}
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFoods.map((food) => (
          <div key={food._id} className="shadow-md p-1">
            <h3 className="text-xl font-semibold">{food.name}</h3>
            <button
              onClick={() => handleEditFood(food)}
              className="bg-yellow-500 text-white px-2 py-0.5 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteFood(food._id)}
              className="bg-red-500 text-white px-2 py-0.5 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;

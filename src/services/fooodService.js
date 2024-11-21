import axios from "axios";
import { sample_foods } from "../data";

export const getAll = async () => {
  return sample_foods;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("api/foods/search/" + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("api/foods/tags/");
};

export const getAllbyTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("api/foods/tag/" + tag);
};

export const getById = async (foodId) => {
  const sample_foods = await getAll();
  console.log("All Foods:", sample_foods); // Verify the structure of sample_foods
  console.log("Food ID to Find:", foodId); // Verify the value of foodId

  const data = sample_foods.find((food) => food.id === Number(foodId)); // If id is a number

  console.log("Filtered Food:", data); // Check if data is found
  if (!data) throw new Error("Food not found");

  return data;
};

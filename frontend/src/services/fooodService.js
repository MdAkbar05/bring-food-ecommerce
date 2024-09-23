import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("api/foods");
  return data;
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
  const { data } = await axios.get("api/foods/" + foodId);
  return data;
};

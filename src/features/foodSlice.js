import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sample_foods, sample_tags } from "../data";

// Async Thunk to fetch all foods from the backend
export const fetchAllFoods = createAsyncThunk(
  "food/fetchAllFoods",
  async () => {
    const response = await axios.get("http://localhost:5000/api/foods/");
    return response.data;
  }
);

// Async Thunk to search foods by term from the backend
export const searchFoods = createAsyncThunk(
  "food/searchFoods",
  async (searchTerm) => {
    const response = await axios.get(
      `http://localhost:5000/api/foods/search/${searchTerm}`
    );
    return response.data;
  }
);

// Async Thunk to fetch foods by tag from the backend
export const fetchFoodsByTag = createAsyncThunk(
  "food/fetchFoodsByTag",
  async (tag) => {
    const response = await axios.get(
      `http://localhost:5000/api/foods/tag/${tag}`
    );
    return response.data;
  }
);

// Async Thunk to fetch a single food by ID from the backend
export const fetchFoodById = createAsyncThunk(
  "food/fetchFoodById",
  async (foodId) => {
    const response = await axios.get(
      `http://localhost:5000/api/foods/${foodId}`
    );
    return response.data;
  }
);

// Async Thunk to fetch all tags from the backend
export const fetchAllTags = createAsyncThunk("food/fetchAllTags", async () => {
  const response = await axios.get("http://localhost:5000/api/foods/tags");
  return response.data;
});

// Initial state for the food slice
const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [], // Array to store fetched foods
    tags: [], // Array to store fetched tags
    food: [], // Array to store fetched
    status: "idle", // Status of the async actions (idle, loading, succeeded, failed)
    error: null, // Error message if an async action fails
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllFoods async thunk
      .addCase(fetchAllFoods.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.foods = action.payload; // Update the foods array with the fetched data
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.foods = sample_foods;
        state.status = "failed"; // Set status to failed when the request fails
        state.error = action.error.message; // Store the error message
      })

      // Handle searchFoods async thunk
      .addCase(searchFoods.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(searchFoods.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.foods = action.payload; // Update the foods array with the fetched data
      })
      .addCase(searchFoods.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request fails
        state.error = action.error.message; // Store the error message
      })

      // Handle fetchFoodsByTag async thunk
      .addCase(fetchFoodsByTag.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(fetchFoodsByTag.fulfilled, (state, action) => {
        console.log(action);
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.foods = action.payload;
        console.log(state.foods); // Update the foods array with the fetched data
      })
      .addCase(fetchFoodsByTag.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request fails
        state.error = action.error.message; // Store the error message
      })

      // Handle fetchFoodById async thunk
      .addCase(fetchFoodById.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.food = action.payload; // Update the foods array with the single fetched food
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request fails
        state.error = action.error.message; // Store the error message
      })

      // Handle fetchAllTags async thunk
      .addCase(fetchAllTags.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.tags = action.payload; // Update the tags array with the fetched data
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.tags = sample_tags; // Update the tags array with sample data if the request fails
        state.status = "failed"; // Set status to failed when the request fails
        state.error = action.error.message; // Store the error message
      });
  },
});

export default foodSlice.reducer;

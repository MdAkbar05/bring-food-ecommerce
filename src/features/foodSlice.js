import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sample_foods } from "../data";

const baseUrl = "http://localhost:5000/api/foods";

// Async Thunk to fetch all foods from the backend
export const fetchAllFoods = createAsyncThunk(
  "food/fetchAllFoods",
  async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      return sample_foods;
    }
  }
);

// Async thunk for creating a new food
export const createFood = createAsyncThunk(
  "foods/createFood",
  async (newFood, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl, newFood);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for updating a food
export const updateFood = createAsyncThunk(
  "foods/updateFood",
  async ({ id, updatedFood }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedFood);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for deleting a food
export const deleteFood = createAsyncThunk(
  "foods/deleteFood",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async Thunk to search foods by term from the backend
export const searchFoods = createAsyncThunk(
  "food/searchFoods",
  async ({ query, category }, { rejectWithValue }) => {
    try {
      // Build query string dynamically
      const queryString = new URLSearchParams({
        ...(query && { query }), // Add query if it exists
        ...(category && { category }), // Add category if it exists
      }).toString();

      const res = await axios.get(`${baseUrl}/search?${queryString}`);
      return res.data.payload; // Assuming `payload` contains the array of products
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to fetch a single food by ID from the backend
export const fetchFoodById = createAsyncThunk(
  "food/fetchFoodById",
  async (foodId) => {
    const response = await axios.get(`${baseUrl}/${foodId}`);
    return response.data;
  }
);

// Async Thunk to fetch a single food by ID from the backend
export const fetchFoodByCategory = createAsyncThunk(
  "food/fetchFoodByCategory",
  async (category) => {
    const response = await axios.get(`${baseUrl}/category/${category}`);

    return response.data;
  }
);

// Initial state for the food slice
const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [], // Array to store fetched foods
    food: [], // Array to store fetched
    searchResults: [], // Array to store search results
    categories: [], // Array to store unique categories
    isLoading: false, // Loading state to indicate if the request is pending
    error: null, // Error message if an async action fails
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer to handle the fetchAllFoods async action
      .addCase(fetchAllFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload;
        state.categories = [
          ...new Set(action.payload.map((food) => food.category)),
        ]; // Extract unique categories
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload;
      })

      // Reducer to handle the createFood async action
      .addCase(createFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods.push(action.payload);
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducer to handle the updateFood async action
      .addCase(updateFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.foods.findIndex(
          (food) => food._id === action.payload._id
        );
        if (index !== -1) {
          state.foods[index] = action.payload;
        }
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducer to handle the deleteFood async action
      .addCase(deleteFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = state.foods.filter(
          (food) => food._id !== action.meta.arg
        );
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducer to handle the searchFoods async action
      .addCase(searchFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload; // Store search results in searchResults state
      })
      .addCase(searchFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducer to handle the fetchFoodById async action
      .addCase(fetchFoodById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.food = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Reducer to handle the fetchFoodById async action
      .addCase(fetchFoodByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFoodByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoodByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;

import React, { useEffect, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tag from "../../components/Tags/Tag";
import NotFound from "../../components/NotFoud";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoods,
  fetchAllTags,
  fetchFoodsByTag,
} from "../../features/foodSlice";
import HeroSection from "./HeroSection";
import Features from "../Features";
import Testimonial from "../Testimonials";
import ContactForm from "../ContactForm";
const initalState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};
export const Home = () => {
  const { foods, tags, status, error } = useSelector(
    (state) => state.foodReducer
  );
  console.log(foods);

  const { searchTerm, tag } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, []);
  useEffect(() => {
    console.log(tag);
    if (tag === "All") {
      dispatch(fetchAllFoods()); // Fetch all foods if no tag is present
    } else if (tag === undefined) {
      dispatch(fetchAllFoods()); // Fetch all foods if no tag is present
    } else {
      dispatch(fetchFoodsByTag(tag)); // Fetch foods by tag if a tag is present
    }
    dispatch(fetchAllTags()); // Fetch all tags
  }, [searchTerm, tag, dispatch]);

  return (
    <>
      <main className="container mx-auto">
        <ToastContainer />
        <HeroSection />
        <h2 className="text-3xl font-bold text-center pt-6">
          Most Popular Foods
        </h2>
        <Tag tags={tags} />
        <Thumbnails foods={foods} />
        {foods.length === 0 && <NotFound linkText="Search Again" />}

        <Features />
        <Testimonial />
        <ContactForm />
      </main>
    </>
  );
};

export default Home;

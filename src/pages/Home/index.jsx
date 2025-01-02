import React, { useEffect, useState } from "react";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import HeroSection from "./HeroSection";
import Features from "../Features";
import Testimonial from "../Testimonials";
import ContactForm from "../ContactForm";
import Category from "../../components/Category";

export const Home = () => {
  const { foods } = useSelector((state) => state.foodReducer);

  const dispatch = useDispatch();

  return (
    <>
      <main className="container mx-auto bg-gray-50">
        <HeroSection />
        <Features />
        <Category />
        <Thumbnails foods={foods} />
        <Testimonial />
        <ContactForm />
      </main>
    </>
  );
};

export default Home;
